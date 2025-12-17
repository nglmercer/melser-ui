---
title: MelserPasswordInput
---

# MelserPasswordInput

带有可见性切换、强度验证和安全仪表盘的密码输入组件。

## 基本示例

```html
<me-password-input label="密码" placeholder="创建一个安全密码">
</me-password-input>
```

## 交互式演示

<me-password-input 
  id="demo-basic" 
  label="密码" 
  placeholder="输入您的密码">
</me-password-input>

<me-password-input 
  id="demo-strength" 
  label="带有强度计" 
  placeholder="输入以测试"
  strength-meter
  minlength="8">
</me-password-input>

<me-password-input 
  id="demo-visible" 
  label="默认可见" 
  placeholder="可见密码"
  show-password
  value="visible123">
</me-password-input>

<me-password-input 
  id="demo-disabled" 
  label="禁用" 
  placeholder="不可编辑"
  disabled
  value="secret123">
</me-password-input>

<h3>颜色</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-password-input label="成功" color="success" value="Password123" strength-meter></me-password-input>
  <me-password-input label="警告" color="warning" value="weak" strength-meter></me-password-input>
  <me-password-input label="危险" color="danger" value="bad" strength-meter></me-password-input>
</div>

## 属性

| 属性              | 类型                                              | 默认值                                        | 描述                |
| :---------------- | :------------------------------------------------ | :-------------------------------------------- | :------------------ |
| `show-toggle`     | `boolean`                                         | `true`                                        | 显示/隐藏可见性按钮 |
| `strength-meter`  | `boolean`                                         | `false`                                       | 显示强度计          |
| `minlength`       | `number`                                          | `undefined`                                   | 最小所需长度        |
| `maxlength`       | `number`                                          | `undefined`                                   | 最大允许长度        |
| `show-password`   | `boolean`                                         | `false`                                       | 初始可见性状态      |
| `strength-levels` | `array`                                           | `['weak', 'medium', 'strong', 'very strong']` | 强度级别            |
| `label`           | `string`                                          | `''`                                          | 可见字段标签        |
| `placeholder`     | `string`                                          | `''`                                          | 占位符文本          |
| `value`           | `string`                                          | `''`                                          | 字段值              |
| `color`           | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`                                   | 状态的配色方案。    |
| `disabled`        | `boolean`                                         | `false`                                       | 禁用交互            |
| `required`        | `boolean`                                         | `false`                                       | 表单必填字段        |

## 事件

| 事件                | 描述               |
| :------------------ | :----------------- |
| `input`             | 当值更改时触发     |
| `change`            | 当更改确认时触发   |
| `toggle-visibility` | 当切换可见性时触发 |
| `strength-change`   | 当强度更改时触发   |
| `focus`             | 当获得焦点时触发   |
| `blur`              | 当失去焦点时触发   |

## 用法示例

### 带有强度验证的密码

```html
<me-password-input
  label="新密码 *"
  placeholder="最少 8 个字符"
  minlength="8"
  maxlength="50"
  strength-meter
  show-toggle
  required
  hint="必须包含大写字母、数字和符号"
>
</me-password-input>
```

### 带有特定要求的密码

```html
<me-password-input
  label="安全密码 *"
  required
  minlength="12"
  strength-meter
  placeholder="至少 12 个字符"
  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}"
  error="密码必须至少包含 12 个字符，包括大写字母、数字和符号"
>
</me-password-input>
```

## 表单集成

### 注册表单

```html
<form id="register-form">
  <me-password-input
    label="密码 *"
    name="password"
    required
    minlength="8"
    strength-meter
    show-toggle
    placeholder="创建一个安全密码"
  >
  </me-password-input>

  <me-password-input
    label="确认密码 *"
    name="confirmPassword"
    required
    minlength="8"
    show-toggle
    placeholder="重复您的密码"
  >
  </me-password-input>

  <button type="submit">注册</button>
</form>
```

```javascript
document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // 在此处验证密码匹配
});
```

## 表单演示

<me-playground-form id="password-playground" schema-name="password-input" title="更改密码" description="强度和匹配验证。">
  <div style="margin-bottom: 1rem;">
    <me-password-input 
      label="当前密码 *"
      name="currentPassword"
      required
      placeholder="您的当前密码">
    </me-password-input>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-password-input 
      label="新密码 *"
      name="confirmPassword"
      required
      minlength="8"
      strength-meter
      show-toggle
      placeholder="新密码">
    </me-password-input>
  </div>
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

```css
me-password-input {
  --me-password-toggle-size: 20px;
  --me-password-strength-weak: #ef4444;
  --me-password-strength-medium: #f59e0b;
  --me-password-strength-strong: #10b981;
  --me-password-strength-very-strong: #059669;
  --me-password-meter-height: 4px;
  --me-password-meter-radius: 2px;
}
```

## 高级功能

### 自定义强度验证

```javascript
const passwordInput = document.querySelector("me-password-input");
if (passwordInput) {
  passwordInput.addEventListener("strength-change", (e) => {
    const { strength, score } = e.detail;

    switch (score) {
      case 0:
      case 1:
        console.log("⚠️ 密码非常弱");
        break;
      case 2:
        console.log("⚠️ 密码弱");
        break;
      case 3:
        console.log("✅ 密码可接受");
        break;
      case 4:
        console.log("🔒 密码强");
        break;
    }
  });
}
```

## 无障碍性

- **无障碍切换**：带有适当 aria-label 的按钮。
- **强度计**：由屏幕阅读器宣布。
- **语义验证**：可访问的错误消息。
- **键盘导航**：Tab 和 Enter 工作正常。
