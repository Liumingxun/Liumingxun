---
title: 什么是 Emmet？
description: Emmet 是一个前端开发中非常实用的代码生成工具，它使用类似 CSS 选择器的语法，帮助开发者快速生成 HTML 和 CSS 代码片段，提高编码效率。
tags:
  - Emmet
  - Web
createAt: 2024-11-06T14:37:00.000Z
updateAt: 2026-01-30T17:55:42.150Z
hash: 48e0addd575d471b
---

# Emmet

你一定知道 `document.querySelector()` 的参数是什么，它通常是 `.class`、`#id`，或者更复杂的 CSS 选择器。在前端开发中，CSS 选择器是一种强大的工具，它让我们能够快速定位和操作 DOM 元素。
但你有没有想过，这种类似 CSS 选择器的语法，还能用来生成 HTML 和 CSS 代码呢？如果你曾经在编辑器中输入过 `!`，敲下回车，一瞬间生成完整的 HTML 基础结构，或者仅仅输入 `div` 按下 Tab，就得到了 `<div></div>`，恭喜你！你已经在使用 Emmet，只不过可能还没发现它的名字。接下来，我们就一起深入了解这个神奇的工具！

## 熟悉的表达式

### CSS 选择器？Emmet 缩写！

正如前文所说，`div⭾` 可以直接生成一个 `<div></div>` 标签，当然我们也可以丰富一下这个表达式：`div.card.primary#recommended-products⭾` 这样将会生成如下片段：

```html
<div class="card primary" id="recommended-products"></div>
```

这里我们添加了 class 和 id 属性，所以生成的片段也带有 class 和 id 属性，在这个例子中，你甚至可以在 JavaScript 使用 `document.querySelector('div.card.primary#recommended-products')` 找到这个元素！

[JS Bin](https://jsbin.com/fokorefiru/1/edit?console,output)

### 让我们来搭积木！

按照这个思路，我们思考一下如何写一个有标签的输入框：

- 我们可以使用 form 元素包裹整个片段：`form`
- 使用 `>` 表示子元素，那么 `form` 下的一个 `label` 元素表示为： `form>label`
- 使用 `[key=value]` 的形式表示元素属性，那么 `label` 元素具有 `for="name"` 的属性表示为： `label[for=name]`
- 使用 `{textContent}` 的形式表示元素包含的文本内容，那么有文本的 label 元素可以表示为：`label{Your name}`
- 使用 `+` 表示同级元素，目前也就是与 `label` 同级，那么与 label 同级 id 为 name 的 input 元素表示为：`label+input#name`
- 一些元素具有变种，可以使用 `:` 指示元素具体的属性，例如：一个提交按钮可以表示为：`input:s` 或是 `input:submit`

综合上方的知识点，我们可以构造出这样的一个 Emmet 表达式：`form>label[for=name]{Your name}+input#name+input:s[value=Submit]` ，它的展开是这样的：

```html
<form action="">
  <label for="name">Your name</label>
  <input type="text" id="name" />
  <input type="submit" value="Submit" />
</form>
```

[JS Bin](https://jsbin.com/xatimiz/edit?html,output)

### 来点 Emmet 戏法，怎么样？

多次使用 `>` 操作符可能使当前元素位置变得很深，这时可以使用 `^` 操作符将会爬升我们在树中的层级，并改变上下文。想象一下，我们需要一个 header，包含一个 logo、几个导航项还有一个登录按钮，利用 `^` 怎么写出一个合理的表达式生成这个结构？

- 需要一个 `header` 标签，不必多说：`header`
- 使用 `div` 包含一个 `img` 展示所需 logo，当然我们可以加上 class 控制样式：`header>div>img.logo`
- 此时我们就需要上升一层添加 nav 标签，使这个结构合理：`header>div>img.logo^nav`
- `nav` 标签中需要一个 `ul` ，我们暂时添加两个 `li` 作为子项：`header>div>img.logo^nav>ul>li{1}+li{2}`
- 此时，我们正处在 `ul` 内部，也就是需要上升两层到 header 标签添加 button 会让结构更加合理：`header>div>img.logo^nav>ul>li{1}+li{2}^^button{Login}`

emmmmm，这个表达式目前就有些复杂且难以构建了，不过我们先来看看表达式展开后：

```html
<header>
  <div><img src="https://picsum.photos/100" alt="" class="logo" /></div>
  <nav>
    <ul>
      <li>1</li>
      <li>2</li>
    </ul>
  </nav>
  <button>Login</button>
</header>
```

[JS Bin](https://jsbin.com/ziqasuh/2/edit?html,output)

那么还有什么办法优化一下这个表达式逻辑吗？你好，有的！header 标签中一共有三块元素：`div>img.logo` 、`nav>ul>li` 以及 `button` 。使用 `()` 分组语法我们可以将这个表达式优化成这样：`header>(div>img.logo)+(nav>ul>li{1}+li{2})+button{Login}` ，没有 `^` 我们不再需要查层数，做好分组便能构建一个具有复杂层级的 DOM 结构。

如果……我是说如果，如果我们的 `nav>ul` 下有 100 个子项我们应该怎么办，总不能真的 `+` 100 个子项吧？当然面对这种情况，Emmet 也有解决办法，可以使用 `*` 操作符来表示当前元素重复次数，如果有五项 `li` ，那我们可以将表达式写为：`nav>ul>li{$}*5` 。`$` 代表序号，`$$$` 多个一起使用时可以左侧补 0 对齐。在这个例子中则可使用表达式：`header>(div>img.logo)+(nav>ul>li{$$}*5)+button{Login}`

[JS Bin](https://jsbin.com/ziqasuh/6/edit?html,output)

如果你在构建模板时还想到了要给 nav 子项添加 class 控制样式等，你可能会写成这样：`nav>ul>li.item{$}*5` 。如果你想的话，这里还有一种办法帮助你偷个懒：Emmet 会隐式地推断你所需的标签，例如：在 `ul` 或 `ol` 中你不提供子元素的标签类型，它则会帮你补全为 `li` 元素；或是在 `table` 中你不提供子元素标签类型，则会帮你补全为 `tr` 元素；亦或是在普通的块级元素上下文时补全为 `div` ，在行级元素则补全为 `span` ，等等此类。所以，也可以使用 `header>(div>img.logo)+(nav>ul>.item{$$}*5)+button{Login}` 来优化表达式。

## 更多支持

### 这里是占位符，只是占位符。

Emmet 还提供了 `lorem` 生成器，如果你在写 HTML 模板时需要一段文字来验证文章排版是否正确或是其他什么需要一段话的场景，都可以使用 `lorem` 这个生成器。最简单的用法： `p>lorem` ，他会生成一段大概 30 词长的段落。展开后可能是这样：

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt veritatis
  molestias deserunt nam voluptatem omnis delectus. Perferendis velit illum
  eaque ea quisquam labore molestias dolore, asperiores voluptas, placeat,
  reprehenderit praesentium!
</p>
```

或者在 `lorem` 后加数字，这将会控制 lorem 生成的文本词数。同时我们也可使用 `*` 语法重复元素，例如：`p*3>lorem6` 。展开后可能是这样：

```html
<p>Lorem ipsum dolor sit amet, consectetur.</p>
<p>Accusamus ullam deleniti est asperiores maxime?</p>
<p>Minima, incidunt totam possimus aspernatur dolorem.</p>
```

或是更复杂一点的生成？例如：`ol>lorem10.step*3` ，不要着急输入到编辑器看效果，思考一下输出的片段是什么。

[JS Bin](https://jsbin.com/qifogiy/2/edit?html,output)

### 配合其他前端组件库

Emmet 没有预定义可用的标签名称，在编辑器中输入的任何单词都可以被转换成标签：`div⭾` → `<div></div>` 、`foo⭾` → `<foo></foo>` ……所以，我们也可以使用它扩展出我们所需要的组件标签：`el-button[type=info]{Info}⭾` → `<el-button type="info">Info</el-button>` 或者你需要扩展更多细节：`el-input[v-model=input type=password show-password]⭾` → `<el-input v-model="input" type="password" show-password=""></el-input>`。

### CSS 属性？当然支持！

Emmet 不止对于生成模板有帮助，实际上，它在 CSS 编码中也为你做过贡献。CSS 中的补全来的就比较简单粗暴，它支持模糊搜索，大家所熟知的 `bgc` 、`mt` 、`m10` 等等这些都是 Emmet 所提供的缩写。对于十六进制颜色值也有支持，一个、两个、三个字符的扩展规则如下：

- `#1` &rightarrow; `#111111`
- `#e0` &rightarrow; `#e0e0e0`
- `#fc0` &rightarrow; `#ffcc00`

当然还有重要的 `!important` 修饰符，你可以在属性声明添加 `!` 后缀，这条属性就会被转换成高优先级形式，例如：`m10e!` 转换成 `margin: 10em !important;` 。

---

## Wrapping up

话说回来，上文所举例的例子实际上都有些复杂且不实用，在实际开发中可能并不会一次性构建出如此长的 Emmet 表达式，使用简短的表达式快速扩展出需要的内容可能才是此类工具的最佳实践。
