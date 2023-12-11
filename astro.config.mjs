import { defineConfig } from 'astro/config';
import { resolve } from 'node:path'

import tailwindcss from "@astrojs/tailwind";
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwindcss({
            config: {
                applyBaseStyles: false
            }
        })
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
