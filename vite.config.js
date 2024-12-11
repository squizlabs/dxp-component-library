import { defineConfig } from 'vite';
import viteGlobImport from 'vite-plugin-sass-glob-import';
import path from 'path';

import { dxp } from './dxp/01_compilers/vite-plugins';

export default defineConfig(() => {
  return {
    publicDir: 'public',
    build: {
      rollupOptions: {
        input: {
          server: './src/entry-server.js',
          main: './src/scripts/main.js'
        },
        output: {
          dir: './dist',
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name][extname]'
        },
        external: ['glob']
      },
      outDir: 'dist',
      emptyOutDir: false
    },
    resolve: {
      alias: {
        '@global_components': path.resolve(
          __dirname,
          './src/global_components'
        ),
        '@dxp': path.resolve(__dirname, './dxp'),
        '@components': path.resolve(__dirname, './dxp/component-service'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@common-styles': path.resolve(__dirname, './src/styles/common'),
        '@scripts': path.resolve(__dirname, './src/scripts'),
        '@pages': path.resolve(__dirname, './src/html'),
        '@images': path.resolve(__dirname, './src/images')
      }
    },
    server: {
      open: true, // Opens the app in the browser when starting the dev server
      port: 4000,
      proxy: {
        // Proxy all API calls or specific routes to another local server
        '/cmp': {
          target: 'http://localhost:3000', // Component server URL
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/cmp/, '/r/')
        },
        '/api': {
          target: 'http://localhost:4000', // Your local server URL
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/src/data')
        },
        '/__dxp/cdp/setConsent': {
          target: 'http://localhost:4000', // Your local server URL
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(
              /\/__dxp\/cdp\/setConsent/,
              '/src/data/setConsent.json'
            )
        }
      }
    },
    plugins: [viteGlobImport(), dxp()],
    esbuild: {
      supported: {
        'top-level-await': true // browsers can handle top-level-await features
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern", "legacy"
        }
      }
    },
    test: {
      globals: true,
      environment: 'happy-dom' || 'node',
      coverage: {
        reporter: ['text-summary', 'html'],
        include: [
          'dxp/component-service/**/main.js',
          'dxp/component-service/**/js/**/*.js',
          'src/scripts/common/*.js'
        ],
        exclude: ['node_modules', 'tests', '**/*.test.js'],
        reportsDirectory: 'src/coverage',
        lines: 90,
        branches: 90,
        functions: 90,
        statements: 90
      }
    }
  };
});
