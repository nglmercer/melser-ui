import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@/core': fileURLToPath(new URL('./src/core', import.meta.url)),
            '@/styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
            '@/types': fileURLToPath(new URL('./src/types', import.meta.url)),
            '@/utils': fileURLToPath(new URL('./src/utils', import.meta.url))
        }
    }
})