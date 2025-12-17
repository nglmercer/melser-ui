---
title: 使用 @/ 别名
---

# 使用 @/ 别名进行导入/导出

本页演示如何使用 Vite 中配置的 `@/` 别名来避免相对路径的问题。

## 别名配置

项目配置了以下别名：

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@/': './src/',
    '@/components': './src/components/',
    '@/core': './src/core/',
    '@/styles': './src/styles/',
    '@/types': './src/types/',
    '@/utils': './src/utils/'
  }
}
```

## 使用别名的导入/导出示例

### 正确导入 ✅

```typescript
// ✅ 使用 @/ 别名 - 推荐
import { MelserBaseInput } from "@/core/base-input";
import { registerComponents } from "@/utils/registration";
import type { MelserComponent } from "@/types";

// ✅ 特定组件导入
import { MelserCheckbox } from "@/components/me-checkbox";
import { MelserTextInput } from "@/components/base-input";
import { MelserButton } from "@/components/button ";

// ✅ 样式导入
import "@/styles/theme.css";
import "@/components/me-checkbox.css";
```

### 相对路径（避免） ❌

```typescript
// ❌ 相对路径 - 可能导致问题
import { MelserBaseInput } from "../core/base-input";
import { registerComponents } from "../../utils/registration";
import type { MelserComponent } from "../types";

// ❌ 深层嵌套路径
import { MelserCheckbox } from "../../../src/components/me-checkbox";
```

## 组件使用示例

### 文件：`src/components/me-form.ts`

```typescript
// ✅ 别名导入
import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { MelserBaseInput } from "@/core/base-input";
import { registerComponents } from "@/utils/registration";
import type { MelserFormData } from "@/types";

// ✅ 导入其他组件
import "@/components/base-input";
import "@/components/me-checkbox";
import "@/components/button ";

@customElement("me-form")
export class MelserForm extends LitElement {
  // ✅ 使用带别名的类型
  private formData: MelserFormData = {};

  // ✅ 使用带别名的基类方法
  private handleInput(event: Event) {
    const target = event.target as MelserBaseInput;
    this.formData[target.name] = target.value;
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <base-input
          name="email"
          label="电子邮箱"
          @input=${this.handleInput}
          required
        >
        </base-input>

        <me-checkbox
          name="terms"
          label="我接受条款"
          @change=${this.handleInput}
          required
        >
        </me-checkbox>

        <button type="submit" variant="primary">提交</button>
      </form>
    `;
  }

  private async handleSubmit(event: Event) {
    event.preventDefault();

    // ✅ 使用带别名的工具函数
    const isValid = await this.validateForm();

    if (isValid) {
      // ✅ 发出自定义事件
      this.dispatchEvent(
        new CustomEvent("form-submit", {
          detail: this.formData,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private async validateForm(): Promise<boolean> {
    // ✅ 验证逻辑
    return Object.keys(this.formData).length > 0;
  }

  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 400px;
    }
  `;
}
```

## Utils 使用示例

### 文件：`src/utils/helpers.ts`

```typescript
// ✅ 带别名的导出
export interface HelperConfig {
  validateEmail(email: string): boolean;
  formatPhone(phone: string): string;
  sanitizeInput(input: string): string;
}

// ✅ 辅助函数
export const helpers: HelperConfig = {
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  formatPhone(phone: string): string {
    // 移除非数字字符
    const cleaned = phone.replace(/\D/g, "");

    // 应用格式 (XXX) XXX-XXXX
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phone;
  },

  sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, "");
  },
};
```

## 使用 @/ 别名的优势

1. **更清晰的路径**：`@/components/me-checkbox` vs `../../../src/components/me-checkbox`
2. **更少的错误**：无需计算目录层级
3. **更容易重构**：如果移动文件，只需更改配置
4. **更好的 IntelliSense**：IDE 可以更好地解析别名
5. **一致性**：所有导入都使用相同的模式

## TypeScript 配置

为了让 TypeScript 识别别名，您需要更新 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/core/*": ["./src/core/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/types/*": ["./src/types/*"],
      "@/utils/*": ["./src/utils/*"]
    }
  }
}
```

## 最佳实践

1. ✅ **始终使用别名**进行项目导入
2. ✅ **使用绝对路径**导入外部库（例如 `lit`，`vite`）
3. ❌ **避免相对路径**，如 `../` 或 `./`
4. ✅ **按类型分组导入**（组件，utils，类型）
5. ✅ **使用具体导入**而不是 `import *`
