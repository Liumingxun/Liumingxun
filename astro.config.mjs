import { defineConfig } from 'astro/config';
import { resolve } from 'node:path'

import sitemap from '@astrojs/sitemap'
import tailwindcss from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    devToolbar: {
        enabled: false
    },
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
    integrations: [
        tailwindcss(),
        sitemap()
    ],
    redirects: {
    },
    build: {
        redirects: false,
        format: 'file'
    },
    site: 'https://blog.luoming.space',
    vite: {
        server: {
            proxy: {
                '/uploads': 'http://localhost:6337'
            }
        },
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
