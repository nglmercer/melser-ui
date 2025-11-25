import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'dist-web', // Separate output for the demo web
        // No 'lib' config here, so it builds index.html as an app
    }
})
