---
title: 什么是响应式网页设计？
description: 响应式 Web 设计（Responsive Web Design）是一种设计和开发方法，旨在使网站能够适应不同设备和屏幕尺寸，从而提供最佳的用户体验。通过使用流式布局、弹性图片和媒体查询等技术，响应式设计确保网站在桌面、平板和移动设备上都能良好显示。
tags:
  - Web
  - 响应式设计
createAt: 2026-01-31T03:14:00.000Z
updateAt: 2026-02-01T10:06:56.597Z
hash: 3b9000425f846acb
---

# 响应式网页设计 / 自适应网页设计

响应式 Web 设计（Responsive Web Design）指的是允许 Web 页面适应不同屏幕宽度因素等，进行布局和外观的调整的一系列实践。它使网站能够自动适应不同设备的屏幕，提供最佳的浏览体验。

> [!NOTE] 关于副标题
> 话说虽然我也觉得“Responsive Web Design”直译为“响应式网页设计”没什么错误，但是确实不能体现到这种设计的实际作用，在 [web.dev][webdev] 中它被译为了“自适应网页设计”，这个译名明显更加见名知意。

## 基本原理

通常地说，你可以采用两种方式实现响应式设计，也就是**桌面优先**和**移动优先**。所谓桌面优先，就是从宽屏幕开始设计页面，然后随着视口变得越来越小，逐步调整布局和样式以适应较小的屏幕；而移动优先则是从窄屏幕开始设计页面，然后随着视口变得越来越大，逐步添加更多的布局和样式以适应较大的屏幕。常见的设计系统如 Bootstrap 和 Tailwind CSS 都采用了**移动优先**的设计理念。

我们可以这样理解移动优先，在窄屏幕上通常就是采用流式布局，也就是在一列中将**块级元素**从上到下的排列下来，我们可能不需要增加太多的样式就可以得到满意的页面；当遇到比它大一点的屏幕，有更多空间去设计更复杂的布局时，我们可以利用**媒体查询**来启用更多的样式进而实现我们需要的页面效果。

### 媒体查询

[媒体查询][media-query]允许我们根据设备的特性（如屏幕宽度、高度、朝向等）来应用不同的样式规则。通过媒体查询，我们就可以为不同的设备和屏幕尺寸设计专门的布局和样式，从而实现响应式设计。基本语法也很简单：

```css
@media media-type and (media-feature) {
  /* … */
}
```

`media-type` 指的是显示设备的类别，可使用的有：`print`、`screen` 和 `all`，分别指代打印预览、屏幕显示和所有设备。媒体类型是可选的，如果不指定则隐式使用 `all`。

`media-feature` 描述了用户代理、输出设备或环境的特定特征，例如屏幕的宽度或分辨率。一个媒体查询可以包含多个 `media-feature`，并使用逻辑运算符 `and`、`or` 和 `not` 进行组合。例如，仅当设备为屏幕类型且视口宽度在 `30rem` 到 `50rem` 之间时：

```css
@media screen and (min-width: 30rem) and (max-width: 50rem) {
  /* … */
}
```

除了使用 `min-` 和 `max-` 前缀来指定范围外，我们也可以采用更简洁的[范围语法][range-syntax]运算符 `<=` 和 `>=`。 例如，下面的媒体查询与上面的例子是等价的：

```css
@media screen and (30rem <= width <= 50rem) {
  /* … */
}
```

### 常见断点

浏览器会默认设置根元素字体 `1rem` 大小为 `16px`，在移动优先的前提下，我们通常会使用如下的[断点][breakpoints]，并且**浏览器总会使用更加合适的媒体查询**下的样式：

| Breakpoint | Minimum width  | CSS                             |
| ---------- | -------------- | ------------------------------- |
| **`sm`**   | 40rem (640px)  | `@media (width >= 40rem) { … }` |
| **`md`**   | 48rem (768px)  | `@media (width >= 48rem) { … }` |
| **`lg`**   | 64rem (1024px) | `@media (width >= 64rem) { … }` |
| **`xl`**   | 80rem (1280px) | `@media (width >= 80rem) { … }` |
| **`2xl`**  | 96rem (1536px) | `@media (width >= 96rem) { … }` |

<iframe height="300" style="width: 100%;" scrolling="no" title="Responsive Web Design" src="https://codepen.io/liumingxun/embed/MYgymzN?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/liumingxun/pen/MYgymzN">
  Responsive Web Design</a> by Liumingxun (<a href="https://codepen.io/liumingxun">@liumingxun</a>)
  on <a href="https://codepen.io">CodePen</a>.
      </iframe>

点击缩放选项或是打开新的标签页[查看这个实验][responsive-codepen]，并通过调整预览窗口宽度理解基于**桌面优先**和**移动优先**不同的断点效果，记得切换成左侧或右侧预览的布局。

## viewport

viewport（视口）是用户在设备屏幕上看到的网页内容区域，视口之外的内容在滚动进入视野之前不会在屏幕上显示。在移动设备上，由于并非所有网页都针对小屏幕进行了适配，浏览器在渲染页面时通常会先使用一个较宽的[布局视口][layout-viewport]进行排版，然后再将渲染结果按比例缩放以适配设备屏幕宽度。这种通过调整坐标体系与缩放关系来适配显示区域的机制，在概念上与 SVG 中的 viewBox 有一定相似之处。

然而，对于使用了媒体查询以及针对移动页面优化的网页而言，这种机制并不理想，例如，若布局视口宽度为 980px，那么针对 640px 或更小宽度的屏幕设计的样式规则将无法生效，因为媒体查询条件将不再满足。

如果你决定使用响应式设计，则需要告诉浏览器不要进行这一默认行为。为此，可以在网页的 `<head>` 中添加 `<meta>` 标签：

```html
<meta name="viewport" content="width=device-width,initial-scale=1" />
```

这个标签告诉移动端浏览器，它们应该将布局视口的宽度设为设备的 CSS 像素宽度，并且页面在加载时不进行额外缩放。下图是一个对比示例，其中左侧没有使用 meta 标签，右侧使用了 meta 标签：

![左侧没有使用 meta 标签，右侧使用了 meta 标签][viewport-diff-example]

除了上述常用设置，`viewport` 还支持以下属性：

- `width`：设置布局视口宽度，`device-width` 表示使用设备屏幕宽度。
- `height`：设置布局视口高度，也可以设置 `device-height`。
- `initial-scale`：设置页面初始缩放比例，通常设为 1。
- `minimum-scale`：设置允许的最小缩放比例。
- `maximum-scale`：设置允许的最大缩放比例。
- `user-scalable`：设为 `no` 可阻止用户缩放页面。

需要注意的是，`width` 与 `height` 的取值会影响视口单位（如 `vw` 和 `vh`）的计算结果，因为视口单位是以布局视口为基准进行计算的。例如，如果视口宽度 `width` 为 `1800px` ，那么 `10vw` 就等于 `180px`，`vh` 的计算方式与其相同。

## 布局设计

这部分还有点复杂，涉及到一些 UI 设计相关的知识，恰巧也是我不擅长的领域，所以这里就简单通过 AI 总结一些常见的布局设计模式，方便你在设计响应式页面时参考。

> - **单栏布局（Single Column Layout）**：适用于移动设备，所有内容垂直排列，用户通过滚动浏览内容。
> - **双栏布局（Two Column Layout）**：适用于平板设备，主内容栏和侧边栏并排显示，侧边栏通常用于导航或辅助信息。
> - **三栏布局（Three Column Layout）**：适用于桌面设备，主内容栏居中，左右两侧为侧边栏，提供更多的导航和信息展示空间。
> - **网格布局（Grid Layout）**：利用 CSS Grid 或 Flexbox 创建灵活的网格系统，根据屏幕大小调整列数和行数，实现复杂的布局需求。
> - **卡片布局（Card Layout）**：将内容分割成独立的卡片，适用于展示多种类型的信息，如产品列表、博客文章等，卡片数量和排列方式根据屏幕大小调整。
> - **响应式导航（Responsive Navigation）**：在小屏幕上使用汉堡菜单或折叠菜单，在大屏幕上显示完整的导航栏，确保用户能够方便地访问网站的各个部分。

## wrap-up

非常感谢你阅读到这里！同时也非常惭愧在没有大量实践下写了这篇教程，不过我确实迫切希望对本站进行一次响应式布局优化，所以在阅读了一些资料后进行了部分总结。希望本文能帮助你更好地理解响应式设计的概念和应用，如果你有任何问题或想法，欢迎通过任何可以找到我的渠道和我交流捏！

to be continued...

[media-query]: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using#syntax
[range-syntax]: https://caniuse.com/css-media-range-syntax
[breakpoints]: https://tailwindcss.com/docs/responsive-design#overview
[webdev]: https://web.dev/learn/design/welcome?hl=zh-cn
[layout-viewport]: https://developer.mozilla.org/en-US/docs/Glossary/Layout_viewport
[responsive-codepen]: https://codepen.io/liumingxun/pen/MYgymzN?editors=0100
[viewport-diff-example]: https://web.dev/static/learn/design/intro/image/images-two-mobile-phones-6d335a19e1c9c_1440.png?hl=zh-cn '左侧没有使用 meta 标签，右侧使用了 meta 标签'
