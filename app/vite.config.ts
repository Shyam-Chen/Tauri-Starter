import { resolve } from 'node:path';
import { networkInterfaces } from 'node:os';
import vue from '@vitejs/plugin-vue';
import { internalIpV4 } from 'internal-ip';
import { defineConfig } from 'vite';
import vueRoutes from 'vite-plugin-vue-routes';
import tailwindColors from 'tailwindcss/colors';
import { presetIcons, presetUno, transformerDirectives } from 'unocss';
import unocss from 'unocss/vite';
import envify from 'process-envify';

const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM!);

const ipv4Address = Object.values(networkInterfaces())
  .flatMap((nInterface) => nInterface ?? [])
  .filter(
    (detail) =>
      detail && detail.address && detail.family === 'IPv4' && detail.address !== '127.0.0.1',
  )[0].address;

export default defineConfig(async () => ({
  define: envify({
    API_URL: mobile ? `http://${ipv4Address}:3000` : process.env.API_URL || '',
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
      '~': resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src'),
      mock: resolve(__dirname, '../mock/src/routes'),
    },
    mainFields: ['module'],
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
    host: mobile ? '0.0.0.0' : false,
    hmr: mobile ? { protocol: 'ws', host: await internalIpV4(), port: 1421 } : undefined,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
}));
