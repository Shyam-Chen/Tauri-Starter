import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { internalIPv4 } from 'private-ip-address';
import envify from 'process-envify';
import tailwindColors from 'tailwindcss/colors';
import { presetIcons, presetTypography, presetUno, presetWebFonts } from 'unocss';
import { transformerDirectives } from 'unocss';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';
import vueRoutes from 'vite-plugin-vue-routes';

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM!);
const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => ({
  define: envify({
    API_URL: mobile ? `http://${internalIPv4()}:3000` : process.env.API_URL || '',
  }),
  plugins: [
    vue(),
    vueRoutes(),
    unocss({
      presets: [
        presetUno(),
        presetTypography(),
        presetIcons(),
        presetWebFonts({
          fonts: {
            sans: ['Roboto:400,500,600,700,800'],
            mono: ['Roboto Mono:400,500,600,700,800'],
          },
        }),
      ],
      transformers: [transformerDirectives({ enforce: 'pre' })],
      theme: {
        colors: {
          primary: tailwindColors.indigo,
          secondary: tailwindColors.neutral,
          success: tailwindColors.emerald,
          danger: tailwindColors.rose,
          warning: tailwindColors.amber,
          info: tailwindColors.sky,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src'),
      mock: resolve(__dirname, '../mock/src/routes'),
    },
    mainFields: ['module'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  clearScreen: false,
  server: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3000',
        ws: true,
      },
    },
    port: 1420,
    strictPort: true,
    host: mobile ? host : false,
    hmr: mobile ? { protocol: 'ws', host, port: 1430 } : undefined,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
}));
