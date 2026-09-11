---
title: 使用 snippet 魔法初始化 frontmatter
description: 新增文章一定要敲一条 cli 命令吗？本文用编辑器 snippet 代替命令行初始化 frontmatter，顺带谈谈为什么我需要的是片段而非模板，以及 snippet 与 template 的区别。
tags:
  - 尤里卡
  - snippet
createAt: 2026-08-30T11:57:17.000+08:00
updateAt: 2026-09-11T22:10:17.000+08:00
hash: 66ccff
---

# 使用 snippet 魔法初始化 frontmatter

有些博客框架新增文章的方式是 `./cli new-post [title]` 这种，我觉得有些难以理解，至少这样很不优雅。

我需要打开终端、输入命令，然后回到编辑器、再找到生成的那个文件，随后才开始写。这一套动作和写东西非常不融洽，相当于把写东西添加了外部依赖作为准备步骤。

至于为什么需要这条命令，大概的原因是需要初始化 frontmatter。博客框架们通常依赖这些元数据将其处理后完成归档列表索引等等工作，我完全理解这个命令想提供的便利，只是我觉得它没那么好用。

如果我来实现这个功能，我的方案是不实现。

## 不实现

frontmatter 初始化这件事，本质上是「往一个固定结构里填空」，而这正好是编辑器早就做得很好的事：模板、片段这类能力。

比如 VSCode 的 [snippet 功能](https://code.visualstudio.com/docs/editing/userdefinedsnippets)：设置一个 prefix，补全时它就会展开成你期望的片段，还支持多个 tabstop 依次跳转、placeholder、候选项选择等等。

举例子，此片段来自于 [shirone 样板站使用指引](https://shirone.mysqil.com/posts/guide/)：

```yaml
---
title: Exploring Material 3 Expressive Design
published: 2026-08-26
updated: 2026-08-27
publishedAt: 2026-08-26T10:00:00+08:00
updatedAt: 2026-08-27T09:30:00+08:00
pinned: true
description: A deep dive into dynamic HCT color science and fluid transitions in Shirone.
image: ./cover.webp
tags: [M3E, Design, Frontend]
category: Guides
draft: false
comment: true
---
```

如果靠命令行初始化，传递这些值几乎只能是逐一指定参数，需要指定的字段一多，命令会长得没法看。

如果换成 snippet，配置文件丢在 `snippets/markdown.json`：

```json snippets/markdown.json
{
  "frontmatter": {
    "prefix": "!",
    "body": [
      "---",
      "title: ${TM_FILENAME/.md$//}",
      "published: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      "updated: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE",
      "publishedAt: $CURRENT_YEAR-$CURRENT_MONTH-${CURRENT_DATE}T${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}${CURRENT_TIMEZONE_OFFSET}",
      "updatedAt: $CURRENT_YEAR-$CURRENT_MONTH-${CURRENT_DATE}T${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}${CURRENT_TIMEZONE_OFFSET}",
      "description: $1",
      "pinned: ${2|true,false|}",
      "draft: ${3|true,false|}",
      "comment: ${4|true,false|}",
      "image: $5",
      "category: $6",
      "tags: [$7]",
      "---",
      "",
      "$0"
    ]
  }
}
```

加个简短的说明：

- 在 markdown 文件里输入 `!` 触发补全，其余交给编辑器。
- `published` / `publishedAt` / `updated` / `updatedAt` 使用变量预填充了。
- `pinned` / `draft` / `comment` 使用了候选项。
- `$0` 标记最后收尾的位置。
- `title` 使用了替换语法，实现去掉 `.md` 扩展名的功能。
- 如果使用 VSCode 编辑或者查看的话还会看到特别的语法高亮。

> 话说我也是第一次**真正**配置了 snippet，试用了一下，真的好用！

## 不一样

顺带一提，我准备将博客迁移到某一数字花园的框架上，没想好具体实现。数字花园方案通常依赖本地文本编辑器实现文章管理，所以大家貌似也都配合 Obsidian 使用，我也一样。

随后，在写另一篇文章的时候也用到了 `<ruby></ruby>` 这个标签用来标注注音或字符注释，我用来中英对照想来也不算是违背语义。总之，这个标签需要很长的声明，一个完整的使用样例：

```html
<ruby>汉<rp>(</rp><rt>han</rt><rp>)</rp>字<rp>(</rp><rt>zi</rt><rp>)</rp></ruby>
```

展示为<ruby>汉<rp>(</rp><rt>han</rt><rp>)</rp>字<rp>(</rp><rt>zi</rt><rp>)</rp></ruby> ，看起来竟然有几分专业😆。

我自然不是很想每次都这样打一长串。于是去翻了一下 Obsidian 的插件仓库，最开始发现了官方插件「模板」，乍一看应该是我需要的功能，但实际上它确实只是模板，似乎叫做「文件模板」更合适：它不支持 tabstop，也不支持自定义变量等等功能。

于是在第三方插件中又搜了一次 template，结果前几个也不是我期望的功能。接着扫到的就是名为 [Text Snippets](https://github.com/arianakhit/text-snippets-obsidian) 的[插件](obsidian://show-plugin?id=text-snippets-obsidian)。那一刻突然一切都想通了：我需要的就是这样的 <ruby>片段<rp>(</rp><rt>snippet</rt><rp>)</rp></ruby> 功能，而不是 <ruby>模板<rp>(</rp><rt>template</rt><rp>)</rp></ruby> 功能。这也正好成了本篇文章的引题。

那么，snippet 和 template 到底怎么不一样？

template 主要生成预定义的框架结构，更宏观：数据驱动的前端框架会把静态部分称作 `template`，一些框架干脆叫自己模板引擎。

snippet 则针对需要填空的小片段，更局部：编辑器内置的 `for (...) {...}`、`try {..} catch {...}` 就是典型例子。

emmm……苦思冥想的例子，说实话我也有点描述不清，混着叫问题应该也不大，如果知道自己要的是哪一种，搜索时会更轻松点吧！

## 不升华

如果写作需要一个工具，那工具应当融进写作里，而不是中断写作去操作工具。新增文章这件事，不需要一条命令，只需要一个 snippet。
