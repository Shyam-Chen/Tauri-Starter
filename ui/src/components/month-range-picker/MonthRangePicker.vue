<script lang="ts" setup>
import { nextTick, ref, computed, reactive, watch } from 'vue';
import { useLocale } from 'vue-localer';
import { onClickOutside } from '@vueuse/core';
import * as d from 'date-fns';

import Fade from '../fade/Fade.vue';
import TextField from '../text-field/TextField.vue';
import useScrollParent from '../../composables/scroll-parent/useScrollParent';

const startValueModel = defineModel<string>('startValue', { default: '' });
const endValueModel = defineModel<string>('endValue', { default: '' });

const props = withDefaults(
  defineProps<{
    minMonth?: string | Date;
    maxMonth?: string | Date;
    format?: string;
  }>(),
  {
    minMonth: undefined,
    maxMonth: undefined,
    format: 'yyyy-MM',
  },
);

const emit = defineEmits<{
  (evt: 'change', { startMonth, endMonth }: { startMonth: string; endMonth: string }): void;
}>();

const locale = useLocale();

const target = ref<HTMLDivElement>();
const input = ref<typeof TextField>();
const picker = ref<HTMLDivElement>();

// prettier-ignore
const months = computed(
  () =>
    locale.value?.months || [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec',
    ],
);

const flux = reactive({
  showDatePicker: false,
  direction: '' as 'down' | 'up' | '',
  resizePanel() {
    const rect = input.value?.$el.querySelector('.TextField-Input').getBoundingClientRect();

    if (picker.value) {
      picker.value.style.left = `${rect.left}px`;

      const center = window.innerHeight / 2;

      if (rect.top > center) {
        picker.value.style.top = `${rect.top}px`;
        flux.direction = 'up';
      } else {
        picker.value.style.top = `${rect.bottom}px`;
        flux.direction = 'down';
      }
    }
  },
  openPicker() {
    flux.showDatePicker = true;

    if (endValueModel.value) {
      flux.currentMoment = new Date(endValueModel.value);
    } else {
      flux.currentMoment = new Date();
    }

    nextTick(() => {
      flux.resizePanel();
    });
  },

  showWeeks: false,
  showYears: false,
  showMonths: true,

  now: new Date(),
  currentMoment: new Date(),

  yearRange: [] as number[],
  year: null as null | number,

  selectedRange: [] as string[],

  decrement() {
    if (flux.showMonths) {
      flux.currentMoment = d.sub(flux.currentMoment, { years: 1 });
    }

    if (flux.showYears) {
      // const moment = flux.currentMoment.subtract(16, 'Y');
      // flux.yearRange = range(moment.year() - 5, moment.year() + 10);
    }
  },
  increment() {
    if (flux.showMonths) {
      flux.currentMoment = d.add(flux.currentMoment, { years: 1 });
    }

    if (flux.showYears) {
      // const moment = flux.currentMoment.add(16, 'Y');
      // flux.yearRange = range(moment.year() - 5, moment.year() + 10);
    }
  },
  selectYear(val: number) {
    flux.showYears = false;
    flux.showMonths = true;
    flux.year = val;

    flux.currentMoment = d.setYear(flux.currentMoment, val);
  },
  selectMonth(month: number) {
    flux.currentMoment = d.setMonth(flux.currentMoment, month);

    const value = d.format(flux.currentMoment, props.format);

    if (props.minMonth && d.format(new Date(props.minMonth), props.format) > value) return;
    if (props.maxMonth && d.format(new Date(props.maxMonth), props.format) < value) return;

    if (flux.selectedRange.length === 0) {
      flux.selectedRange = [value];
    } else if (flux.selectedRange.length === 1) {
      flux.selectedRange = [...flux.selectedRange, value];
    } else if (flux.selectedRange.length === 2) {
      flux.selectedRange = [value];
    }

    const [startMonth, endMonth] = flux.selectedRange.sort();

    startValueModel.value = startMonth || '';
    endValueModel.value = endMonth || '';
    emit('change', { startMonth, endMonth });
  },
});

const rangeValue = computed(() => {
  if (startValueModel.value && !endValueModel.value) return startValueModel.value;

  if (startValueModel.value && endValueModel.value) {
    return `${startValueModel.value} ~ ${endValueModel.value}`;
  }

  return '';
});

watch(
  () => flux.showDatePicker,
  (val) => {
    if (!val && flux.selectedRange.length === 1) {
      const date = flux.selectedRange[0];
      flux.selectedRange = [date, date];
      startValueModel.value = date;
      endValueModel.value = date;
    }
  },
);

onClickOutside(target, () => {
  flux.showDatePicker = false;
});

useScrollParent(
  computed(() => picker.value),
  () => {
    if (flux.showDatePicker) flux.resizePanel();
  },
);

function monthDisabled(index: number) {
  const currentMonth = d.format(new Date(d.getYear(flux.currentMoment), index), props.format);
  const minMonth = props.minMonth && d.format(new Date(props.minMonth), props.format);
  const maxMonth = props.maxMonth && d.format(new Date(props.maxMonth), props.format);

  if (minMonth && maxMonth) {
    return minMonth > currentMonth || maxMonth < currentMonth;
  } else if (minMonth) {
    return minMonth > currentMonth;
  } else if (maxMonth) {
    return maxMonth < currentMonth;
  }

  return false;
}
</script>

<template>
  <div ref="target" class="w-full">
    <TextField
      ref="input"
      v-bind="$attrs"
      :value="rangeValue"
      append="i-material-symbols-calendar-month-outline-rounded"
      readonly
      @focus="flux.openPicker"
      @append="flux.openPicker"
    >
      <slot></slot>
    </TextField>

    <Fade>
      <div
        v-if="flux.showDatePicker"
        ref="picker"
        class="fixed z-101 p-2 shadow-lg rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700"
        :class="{
          'DatePicker-DatePane-PlacementBottom': flux.direction === 'down',
          'DatePicker-DatePane-PlacementTop': flux.direction === 'up',
        }"
      >
        <div class="flex justify-between items-center mb-1">
          <div
            class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 p-2 rounded-full"
            @click="flux.decrement"
          >
            <div class="i-fa-chevron-left w-3 h-3"></div>
          </div>

          <div v-if="flux.showYears">{{ flux.yearRange[0] }} ~ {{ flux.yearRange[15] }}</div>

          <div v-if="flux.showMonths">
            {{ d.format(flux.currentMoment, 'yyyy') }}
          </div>

          <div
            class="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 p-2 rounded-full"
            @click="flux.increment"
          >
            <div class="i-fa-chevron-right w-3 h-3"></div>
          </div>
        </div>

        <div v-show="flux.showYears" class="grid grid-cols-4 gap-1 text-center w-48">
          <div
            v-for="year in flux.yearRange"
            :key="year"
            :value="year"
            class="flex justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-sm cursor-pointer"
            :class="{
              'text-white bg-blue-400 important:hover:bg-blue-500': year === d.getYear(flux.now),
            }"
            @click="flux.selectYear(year)"
          >
            {{ year }}
          </div>
        </div>

        <template v-if="flux.showMonths">
          <div class="grid grid-cols-3 gap-1 text-center w-48">
            <div
              v-for="(month, index) in months"
              :key="month"
              :value="index"
              class="flex justify-center items-center hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-sm cursor-pointer"
              :class="{
                'ring-1 ring-primary-500':
                  index === d.getMonth(flux.now) &&
                  d.getYear(flux.currentMoment) === d.getYear(flux.now),
                'text-slate-300 dark:text-slate-600 !cursor-not-allowed': monthDisabled(index),
                'text-white bg-primary-600 important:hover:bg-primary-700':
                  (startValueModel &&
                    index === d.getMonth(new Date(startValueModel)) &&
                    d.getYear(flux.currentMoment) === d.getYear(new Date(startValueModel))) ||
                  (startValueModel &&
                    endValueModel &&
                    startValueModel <=
                      d.format(new Date(d.getYear(flux.currentMoment), index), props.format) &&
                    d.format(new Date(d.getYear(flux.currentMoment), index), props.format) <=
                      endValueModel),
              }"
              @click="flux.selectMonth(index)"
            >
              {{ month }}
            </div>
          </div>

          <slot name="panel"></slot>
        </template>
      </div>
    </Fade>
  </div>
</template>

<style lang="scss" scoped>
.DatePicker-DatePane-PlacementBottom {
  transform: translateY(0.5rem);
}

.DatePicker-DatePane-PlacementTop {
  transform: translateY(-0.5rem) translateY(-100%);
}
</style>
