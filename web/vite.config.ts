import path from 'node:path'
import process from 'node:process'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        '@libs': `${path.resolve(__dirname, 'libs')}/`,
        '@type': `${path.resolve(__dirname, 'types')}/`,
      },
    },

    envDir: './.env',

    server: {
      proxy: {
        '/bilibilisleep': {
          target: env.VITE_REQ_BASE_URL,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
        ],
        dts: true,
        dirs: [
          './src/composables',
        ],
        vueTemplate: true,
      }),
      Components({
        dts: true,
      }),
      UnoCSS(),
      Vue(),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  }
})
