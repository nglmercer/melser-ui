---
title: MelserOtpInput
---

# MelserOtpInput

一个用于双因素验证的 OTP（一次性密码）输入组件，具有自动完成和自动验证功能。

## 基本示例

```html
<me-otp-input length="6" label="验证码"> </me-otp-input>
```

## 交互式演示

<me-otp-input 
  id="demo-basic" 
  length="6"
  label="6 位代码">
</me-otp-input>

<me-otp-input 
  id="demo-numeric" 
  length="4"
  numeric-only
  label="4 位数字代码">
</me-otp-input>

<me-otp-input 
  id="demo-disabled" 
  length="6"
  disabled
  label="禁用的 OTP"
  value="123456">
</me-otp-input>

<h3>颜色</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-otp-input length="4" label="成功" color="success" value="1234"></me-otp-input>
  <me-otp-input length="4" label="警告" color="warning" value="5678"></me-otp-input>
  <me-otp-input length="4" label="危险" color="danger" value="9012"></me-otp-input>
</div>

## 属性

| 属性            | 类型                                              | 默认值      | 描述               |
| :-------------- | :------------------------------------------------ | :---------- | :----------------- |
| `length`        | `number`                                          | `6`         | 代码位数           |
| `value`         | `string`                                          | `''`        | 当前 OTP 值        |
| `disabled`      | `boolean`                                         | `false`     | 禁用交互           |
| `readonly`      | `boolean`                                         | `false`     | 只读               |
| `name`          | `string`                                          | `''`        | 表单名称           |
| `label`         | `string`                                          | `''`        | 可见组件标签       |
| `placeholder`   | `string`                                          | `'•'`       | 占位符字符         |
| `numericOnly`   | `boolean`                                         | `false`     | 仅允许数字         |
| `autoFocus`     | `boolean`                                         | `true`      | 加载时自动聚焦     |
| `caseSensitive` | `boolean`                                         | `false`     | 区分大小写         |
| `allowedChars`  | `string`                                          | `''`        | 允许的字符 (regex) |
| `color`         | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 状态的配色方案。   |

## 事件

| 事件       | 描述             |
| :--------- | :--------------- |
| `input`    | 当值更改时触发   |
| `complete` | 当代码完成时触发 |
| `paste`    | 当粘贴内容时触发 |
| `focus`    | 当获得焦点时触发 |
| `blur`     | 当失去焦点时触发 |

## 用法示例

### 短信验证码

```html
<me-otp-input
  length="6"
  numeric-only
  label="短信验证码"
  hint="请输入发送到您手机的 6 位验证码"
>
</me-otp-input>
```

### 身份验证器应用代码

```html
<me-otp-input
  length="6"
  numeric-only
  label="身份验证器代码"
  hint="请使用您的身份验证应用"
>
</me-otp-input>
```

### 字母数字代码

```html
<me-otp-input length="8" label="恢复代码" hint="8 位字母数字代码">
</me-otp-input>
```

## 表单集成

### 验证表单

```html
<form id="verification-form">
  <h3>双因素验证</h3>

  <me-otp-input
    name="otpCode"
    length="6"
    numeric-only
    label="验证码"
    hint="我们已向您的邮箱发送了验证码"
  >
  </me-otp-input>

  <button type="submit">验证</button>
</form>
```

```javascript
document.getElementById("verification-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("OTP:", formData.get("otpCode"));
});
```

## 表单演示

<me-playground-form id="otp-playground" schema-name="otp-input" title="2FA 验证" description="代码验证和安全性。">
  <div style="margin-bottom: 1.5rem;">
    <base-input 
      label="邮箱"
      type="email"
      value="user@example.com"
      disabled>
    </base-input>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-otp-input 
      name="otpCode"
      length="6"
      numeric-only
      label="验证码"
      hint="我们已向您的邮箱发送了验证码">
    </me-otp-input>
  </div>
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

```css
me-otp-input {
  --me-otp-input-width: 50px;
  --me-otp-input-height: 50px;
  --me-otp-input-gap: 8px;
  --me-otp-input-font-size: 18px;
  --me-otp-input-border: 2px solid #d1d5db;
  --me-otp-input-border-radius: 8px;
  --me-otp-input-focus-border: #3b82f6;
  --me-otp-input-bg: #ffffff;
  --me-otp-input-disabled-bg: #f9fafb;
  --me-otp-input-disabled-border: #e5e7eb;
}
```

## 无障碍性

- **键盘导航**：在字段之间 Tab 切换，箭头键，退格键
- **屏幕阅读器支持**：宣布位置和值
- **焦点可见**：清晰的焦点指示器
- **自动聚焦**：自动跳转到下一个字段
- **高对比度**：兼容高对比度模式
