import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
// Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { defineConfig, Plugin } from 'vite'
import styleImport from 'vite-plugin-style-import'
import checker from 'vite-plugin-checker'
export default defineConfig((config) => {
  const { mode } = config
  setEnv(mode)

  // 共享配置
  return {
    base: process.env.VITE_PUBLIC_PATH,
    plugins: [
      vue(),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => `vant/es/${name}/style/less`,
          },
        ],
      }),
      legacy(),
      removePolyfileLegacyStrict(),
      checker({
        typescript: true,
        vueTsc: true,
        eslint: {
          files: ['./src'],
          extensions: ['.ts', '.vue'],
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            'popover-border-radius': '0',
          },
        },
      },
    },
    resolve: {
      alias: [
        { find: /^~/, replacement: '' },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
    },
    build: {
      terserOptions: {
        compress: {
          // Used to delete console in production environment
          drop_console: process.env.VITE_DROP_CONSOLE === 'yes',
        },
      },
    },
    server: {
      host: '0.0.0.0',
    },
  }
})

/**
 *  将环境变量设置到process.env 上
 * @param mode  模式
 */
function setEnv(mode: string) {
  const envFiles = [/** mode file */ `.env.${mode}`]

  for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file))
    for (const k in envConfig) {
      process.env[k] = envConfig[k]
    }
  }
}

// 移除 polyfill 的 use strict，修复在ios10 老设备上的不兼容。
function removePolyfileLegacyStrict(): Plugin {
  return {
    name: 'vite-plugin-remove-strict-polyfills-legacy',
    apply: 'build',
    generateBundle(opt, bundle) {
      for (const accessPath in bundle) {
        if (Object.prototype.hasOwnProperty.call(bundle, accessPath)) {
          const obj = bundle[accessPath]
          if (obj.type === 'chunk' && obj.name === 'polyfills-legacy') {
            obj.code = obj.code.replace(/"use strict";/, '')
          }
        }
      }
    },
  }
}
