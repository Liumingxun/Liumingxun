import { defineConfig } from 'astro/config';
import { resolve } from 'node:path'

import tailwindcss from "@astrojs/tailwind";
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
    image: {
        domains: [
            // 'blog.luoming.space',
            // 'cdn.jsdelivr.net',
            // 'localhost'
        ]
    },
    redirects: {
        '/': '/blogs'
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
