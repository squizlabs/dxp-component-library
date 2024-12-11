import eslintRecommended from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

export default [
  eslintRecommended.configs.recommended,
  {
    files: ['dxp/component-service/**/*.js', 'src/scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        fetch: 'readonly',
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        URL: 'readonly',
        localStorage: 'readonly',
        setTimeout: 'readonly'
      }
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@global_components', './src/global_components'],
            ['@dxp', './dxp'],
            ['@components', './dxp/component-service'],
            ['@styles', './src/styles']
          ],
          extensions: ['.js', '.scss']
        }
      }
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      'no-console': 'off',
      semi: ['warn', 'always'],
      'import/no-unresolved': 'warn'
    }
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      '**/*.test.js',
      'vite.config.js',
      '*.js',
      'dxp/01_compilers/*.js',
      'src/entry-server.js'
    ]
  }
];
