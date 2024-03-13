import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { internalIpV4 } from 'internal-ip';
import { defineConfig } from 'vite';
import vueRoutes from 'vite-plugin-vue-routes';
import tailwindColors from 'tailwindcss/colors';
import { presetIcons, presetUno, transformerDirectives } from 'unocss';
import unocss from 'unocss/vite';
import envify from 'process-envify';

// @ts-expect-error process is a nodejs global
const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  define: envify({
    API_URL: mobile ? 'http://0.0.0.0:3000' : process.env.API_URL || '',
  }),
  plugins: [
    vue(),
    vueRoutes(),
    unocss({
      presets: [presetUno(), presetIcons()],
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
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
      mock: path.resolve(__dirname, '../mock/src/routes'),
    },
    mainFields: ['module'],
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        ws: true,
      },
    },
    port: 1420,
    strictPort: true,
    host: mobile ? '0.0.0.0' : false,
    hmr: mobile
      ? {
          protocol: 'ws',
          host: await internalIpV4(),
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
}));
