---
title: 开始使用
---

# 开始使用

Melser UI 是一组使用 Lit 构建的现代 Web 组件。本指南将帮助您快速上手。

## 安装

```bash
npm install melser-ui
```

## 基本用法

### 导入组件

您可以导入单个组件或整个库：

```typescript
// 导入特定组件
import "melser-ui/components/me-checkbox.js";

// 导入整个库
import "melser-ui";
```

### 在 HTML 中使用

导入后，您可以在 HTML 中直接使用这些组件：

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Melser UI 示例</title>
  </head>
  <body>
    <h1>Melser UI 示例</h1>

    <!-- 使用复选框组件 -->
    <me-checkbox label="我接受条款" checked> </me-checkbox>

    <!-- 使用文本输入组件 -->
    <base-input label="姓名" placeholder="输入您的姓名"> </base-input>
  </body>
</html>
```

## 兼容性验证

### 有效的 HTML 标签

组件使用带前缀的标签名以避免冲突：

- ✅ `me-checkbox` - 有效
- ✅ `base-input` - 有效
- ✅ `me-color-picker` - 有效
- ❌ `checkbox` - 可能冲突

### TypeScript 和导入

```typescript
// 正确类型
import type { MelserCheckbox, MelserTextInput } from "melser-ui/types";

// 带类型使用
const checkbox = document.querySelector("me-checkbox") as MelserCheckbox;
const input = document.querySelector("base-input") as MelserTextInput;
```
