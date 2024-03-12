import { defineConfig } from 'astro/config';
import { resolve } from 'node:path'
import ViteCompression from 'vite-plugin-compression'

import tailwindcss from "@astrojs/tailwind";
import node from '@astrojs/node'

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
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
    site: 'https://blog.luoming.space',
    vite: {
        server: {
            proxy: {
                '/uploads': 'http://localhost:6337'
            }
        },
        plugins: [ViteCompression()],
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
