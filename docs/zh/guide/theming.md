# 主题与设计令牌 (Theming & Design Tokens)

Melser UI 使用强大的“设计即数据”令牌系统，允许在整个库中进行类型安全、动态的样式设置。该系统建立在三层分类法（Primitives, Semantic, Component）之上，并支持自动切换暗黑模式。

## 概览

- **设计令牌 (Design Tokens)**：定义在 `src/theme/tokens.ts` 中，代表所有颜色、间距、排版等的单一事实来源。
- **访问器 (`Var`)**：一个类型安全的工具，用于在您的 Lit 组件中访问有效的 CSS 变量（例如 `Var.color.primary`）。
- **主题切换 (Theme Switching)**：一个运行时 API (`setTheme`)，用于即时在明亮和暗黑模式之间切换。

## 用法

### 1. 在组件中使用令牌

不要硬编码颜色，而是使用库导出的 `Var` 对象。这确保您的组件自动适应主题更改。

```typescript
import { css, LitElement } from "lit";
import { Var } from "melser-ui"; // 或相对路径

export class MyComponent extends LitElement {
  static styles = css`
    :host {
      background-color: ${Var.color.bg.default};
      color: ${Var.color.text.primary};
      padding: ${Var.spacing.padding.input.default};
      border: 1px solid ${Var.color.border.default};
    }
  `;
}
```

### 2. 组件特定变量

为了获得最大的灵活性，`MelserBaseInput` 和其他核心组件生成它们自己的 CSS 变量，这些变量映射回全局令牌。这允许您在不破坏全局主题的情况下覆盖特定组件的样式。

```css
/* 仅在本地覆盖 base-input 的背景 */
base-input {
  --base-input-bg: red;
}
```

### 3. 通过 API 切换主题

您可以使用 `setTheme` 动态切换全局主题：

```typescript
import { setTheme } from "melser-ui";

// 切换到暗黑模式
setTheme("dark");

// 切换到明亮模式
setTheme("light");
```

这是通过将所选方案的正确 CSS 变量值注入文档根目录来运作的。

## 架构

该系统定义在 `src/theme/tokens.ts` 中：

- **第 1 层 (调色板/Primitives)**：原始十六进制代码（例如 `palette.blue.500`）。
- **第 2 层 (语义/Semantic)**：映射到调色板的有意义的名称（例如 `color.primary` -> `palette.blue.700`）。
- **第 3 层 (组件/Component)**：特定组件覆盖（例如 `input.bg`）。

当调用 `setTheme('dark')` 时，系统会重新映射语义层以使用适合暗黑模式的调色板颜色，从而立即更新整个 UI。
