import { defineConfig } from 'astro/config';
import { resolve } from 'node:path'
import compress from 'vite-plugin-compression2'

import tailwindcss from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    server: {
        port: 4322, // dev server port
    },
    image: {
        remotePatterns: [
            {
                protocol: 'http'
            },
            {
                protocol: 'https'
            }
        ]
    },
    redirects: {
        '/': '/blogs',
        '/blogs/python-debounce-throttle': {
            status: 301,
            destination: '/blogs/python-debounce-throttle-1'
        },
    },
    integrations: [
        tailwindcss()
    ],
    site: 'https://blog.luoming.space',
    vite: {
        server: {
            proxy: {
                '/uploads': 'http://localhost:6337'
            }
        },
        plugins: [compress()],
        resolve: {
            alias: {
                '@': resolve(process.cwd(), './src')
            }
        },
        optimizeDeps: {
            allowNodeBuiltins: true
        }
    }
});
