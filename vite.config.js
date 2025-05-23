import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'app.js', // Название для JS-файла
        assetFileNames: (assetInfo) => {
          // Проверяем тип ассета (CSS) и задаем ему новое имя
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'app.css'; // Название для CSS
          }
          return assetInfo.name; // Оставляем имя другим ассетам
        },
      },
    },
  },
})
