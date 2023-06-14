---
title: "How to resolve path alias"
description: "In Vite project, how can I make the IDE recognize the abbreviated path?"
pubDate: "Jun 06 2023"
heroImage: "/lime-s.svg"
---

项目配置使用了Vite 4.1.4，部分文件使用ts，使用路径缩写时IDE会提示找不到模块

![](/cant_find_module.png)
![](/cant_find_module_2.png)

但实际上项目可以运行，也就是说vite可以解析路径，vite配置如下：

```js
import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

想了想可能是tsconfig的原因，于是写了以下配置，解决：

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "sourceMap": true,
      "baseUrl": ".",
      "paths": {
          "@/*": ["src/*"],
      }
  },
  "exclude": [
    "node_modules"
  ]
}
```

~~还是没太弄懂tsconfig~~

<span style="background-color: black; color: black;" class="hover-show">
治标可耻但有用
</span>
<style>
    .hover-show:hover {
        background-color: transparent;
    }
</style>