/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src/assets')
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      },
      {
        find: '@i18n',
        replacement: path.resolve(__dirname, 'src/i18n')
      },
      {
        find: '@layouts',
        replacement: path.resolve(__dirname, 'src/layouts')
      },
      {
        find: '@routes',
        replacement: path.resolve(__dirname, 'src/routes')
      },
      {
        find: '@themes',
        replacement: path.resolve(__dirname, 'src/themes')
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/utils')
      },
      {
        find: '@views',
        replacement: path.resolve(__dirname, 'src/views')
      }
    ]
  }
})
