import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [dts({ rollupTypes: true })],
    build: {
        lib: {
            entry: 'src/index.ts',
            fileName: 'index',
            formats: ['es']
        },
        rollupOptions: {
            // Externalize deps that shouldn't be bundled
            // external: /^lit/,
        }
    }
})
