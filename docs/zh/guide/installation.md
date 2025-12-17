---
title: 安装
---

# 安装

本指南涵盖了在您的项目中安装和配置 Melser UI 的所有方法。

##先决条件

- Node.js 16+
- 支持 ES 模块的现代项目
- 支持 Custom Elements and Shadow DOM 的浏览器

## 安装方法

### NPM

```bash
# 安装完整库
npm install melser-ui

# 或安装单个组件
npm install melser-ui components
```

### Yarn

```bash
yarn add melser-ui
```

### CDN

您也可以直接通过 CDN 使用 Melser UI：

```html
<!-- 使用 ESM.sh -->
<script type="module">
  import "https://esm.sh/melser-ui";
</script>

<!-- 或使用 Skypack -->
<script type="module">
  import "https://cdn.skypack.dev/melser-ui";
</script>
```

## 项目配置

### Vite

如果您使用 Vite，请确保您的 `vite.config.ts` 配置正确：

```typescript
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2019", // Custom Elements 所需
  },
  optimizeDeps: {
    include: ["melser-ui"],
  },
});
```

### Webpack

对于 Webpack 5：

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
```

## 导入组件

### 完整导入

```typescript
// 导入所有组件
import "melser-ui";

// 或导入类型
import type { MelserComponent } from "melser-ui/types";
```

### 单独导入

```typescript
// 导入特定组件
import "melser-ui/components/me-checkbox.js";
import "melser-ui/components/base-input.js";

// 如果您只使用少量组件，这会更高效
```

### 捆绑导入

```typescript
// 捆绑导入以获得更好的 tree-shaking
import {
  MelserCheckbox,
  MelserTextInput,
  MelserButton,
} from "melser-ui/components";

// 如有必要，手动注册
import { registerComponents } from "melser-ui/utils/registration";

registerComponents({
  "me-checkbox": MelserCheckbox,
  "base-input": MelserTextInput,
});
```

## TypeScript 配置

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "types": ["vite/client"]
  }
}
```

### 类型声明

```typescript
// src/global.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    "me-checkbox": HTMLElement; // 建议使用 'HTMLElement' 或特定接口，而不是 'any'
    "base-input": HTMLElement;
    // 在此处添加其他组件。
    // 所有组件都有类型；避免使用 'any'，因为这违背了 TypeScript 的初衷。
  }
}
```

> **注意**：虽然 `any` 看起来很方便，但 Melser UI 为其所有组件和实用程序（例如 `InputData`，`TableColumn`）导出了强类型。使用 `any` 被认为是不好的做法。请始终使用导出的类型以获得更好的类型安全性和自动完成功能。

## 完整项目示例

### package.json

```json
{
  "name": "my-melser-project",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "melser-ui": "^1.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "typescript": "^5.0.0"
  }
}
```

### index.html

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Melser UI 应用示例</title>
  </head>
  <body>
    <div id="app">
      <me-checkbox id="accept" label="我接受条款"></me-checkbox>
      <button id="submit" variant="primary">提交</button>
    </div>

    <script type="module">
      import "melser-ui";

      const submitBtn = document.getElementById("submit");
      const checkbox = document.getElementById("accept");

      submitBtn?.addEventListener("click", () => {
        if (checkbox?.checked) {
          alert("表单已提交！");
        } else {
          alert("请接受条款");
        }
      });
    </script>
  </body>
</html>
```

## 故障排除

### 错误："Custom element with name '...' has already been used"

```javascript
// 确保不要多次注册同一个组件
// 在您的应用程序中仅导入组件一次
```

### 组件未渲染

```javascript
// 验证组件是否正确导入
import "melser-ui/components/me-checkbox.js";

// 并且自定义元素可用
console.log(customElements.get("me-checkbox")); // 应该存在
```

### 样式未应用

```css
/* 确保包含基础样式 */
@import "melser-ui/styles/theme.css";

/* 或导入特定样式 */
@import "melser-ui/styles/components/checkbox.css";
```

## 验证

要验证一切是否正常工作：

```javascript
// 在浏览器控制台中
console.log("Melser UI loaded:", !!window.customElements.get("me-checkbox"));
```

如果一切正常，您应该在控制台中看到 `true`。
