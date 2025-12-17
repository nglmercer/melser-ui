---
title: MelserSwitch
---

# MelserSwitch

一个现代且无障碍的开关/切换组件，用于激活/停用选项，具有平滑的动画和清晰的视觉状态。

## 基本示例

```html
<me-switch label="启用通知" checked> </me-switch>
```

## 交互式演示

<me-switch
  id="demo-basic"
  label="基本开关">
</me-switch>

<me-switch
  id="demo-checked"
  label="默认开启"
  checked>
</me-switch>

<me-switch
  id="demo-disabled"
  label="禁用开关"
  disabled
  checked>
</me-switch>

<me-switch
  id="demo-sizes"
  label="不同尺寸">
</me-switch>

<div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
  <me-switch size="sm" label="小"></me-switch>
  <me-switch size="md" label="中"></me-switch>
  <me-switch size="lg" label="大"></me-switch>
</div>

<me-switch
  id="demo-colors"
  label="不同颜色">
</me-switch>

<div style="margin: 1rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
  <me-switch color="primary" label="主要" checked></me-switch>
  <me-switch color="success" label="成功" checked></me-switch>
  <me-switch color="warning" label="警告" checked></me-switch>
  <me-switch color="danger" label="危险" checked></me-switch>
</div>

<me-switch
  id="demo-text"
  label="带自定义文本"
  checked-text="开"
  unchecked-text="关">
</me-switch>

## 属性

| 属性             | 类型      | 默认值      | 描述                             |
| :--------------- | :-------- | :---------- | :------------------------------- |
| `checked`        | `boolean` | `false`     | 激活/非激活状态                  |
| `disabled`       | `boolean` | `false`     | 禁用交互                         |
| `size`           | `string`  | `'md'`      | 开关尺寸 (sm, md, lg)            |
| `color`          | `string`  | `'primary'` | 开关颜色 (primary, success, etc) |
| `checked-text`   | `string`  | `''`        | 激活时显示的文本                 |
| `unchecked-text` | `string`  | `''`        | 非激活时显示的文本               |
| `label`          | `string`  | `''`        | 可见的开关标签                   |
| `name`           | `string`  | `''`        | 表单名称                         |
| `value`          | `string`  | `'on'`      | 激活时的值                       |
| `required`       | `boolean` | `false`     | 表单必填字段                     |
| `loading`        | `boolean` | `false`     | 加载状态                         |

## 事件

| 事件     | 描述                 |
| :------- | :------------------- |
| `change` | 当状态更改时触发     |
| `focus`  | 当组件获得焦点时触发 |
| `blur`   | 当组件失去焦点时触发 |
| `input`  | 在交互期间触发       |

## 用法示例

### 基本设置开关

```html
<me-switch label="启用深色模式" checked> </me-switch>
```

### 带验证的开关

```html
<me-switch
  label="我接受服务条款 *"
  name="acceptTerms"
  required
  error="您必须接受条款才能继续"
>
</me-switch>
```

### 带有加载状态的开关

```html
<me-switch label="同步到云端" loading disabled> </me-switch>
```

### 带有自定义文本的开关

```html
<me-switch
  label="服务器状态"
  checked-text="运行中"
  unchecked-text="停止"
  color="success"
>
</me-switch>
```

## 表单集成

### 个人资料设置表单

```html
<form id="settings-form">
  <div
    style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;"
  >
    <h4>🔔 通知偏好</h4>

    <me-switch label="邮件通知" name="emailNotifications" checked> </me-switch>

    <me-switch label="推送通知" name="pushNotifications" checked> </me-switch>

    <me-switch label="营销通知" name="marketingNotifications"> </me-switch>
  </div>

  <button type="submit">保存设置</button>
</form>
```

```javascript
document.getElementById("settings-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // 处理设置
});
```

## 演示

<me-playground-form id="switch-playground" schema-name="switch" title="设置" description="带有开关和 Zod 验证的配置示例。">
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>⚡ 快速设置</h4>

<me-switch
    label="启用高级功能"
    name="premium">
</me-switch>

<me-switch
    label="开发者模式"
    name="dev">
</me-switch>

<me-switch
    label="自动保存"
    name="autosave"
    checked>
</me-switch>

  </div>
  
  <div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <h4>🎮 游戏选项</h4>

<me-switch
    label="启用声音"
    name="sound"
    checked
    color="success">
</me-switch>

<me-switch
    label="背景音乐"
    name="music"
    checked
    color="primary">
</me-switch>

<me-switch
    label="震动"
    name="vibration"
    color="warning">
</me-switch>

<me-switch
    label="游戏通知"
    name="gameNotifications"
    checked
    color="primary">
</me-switch>

  </div>
</me-playground-form>

## CSS 定制

### CSS 变量

```css
me-switch {
  --me-switch-width: 44px;
  --me-switch-height: 24px;
  --me-switch-thumb-size: 20px;
  --me-switch-bg-off: #e5e7eb;
  --me-switch-bg-on: #3b82f6;
  --me-switch-thumb-bg: #ffffff;
  --me-switch-border-radius: 12px;
  --me-switch-transition: all 0.2s ease;
  --me-switch-focus-ring: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
```

### 自定义尺寸

```html
<style>
  .custom-switch-sizes {
    --me-switch-width-sm: 32px;
    --me-switch-height-sm: 18px;
    --me-switch-thumb-size-sm: 14px;

    --me-switch-width-lg: 60px;
    --me-switch-height-lg: 32px;
    --me-switch-thumb-size-lg: 28px;
  }

  .dark-theme-switch {
    --me-switch-bg-off: #374151;
    --me-switch-bg-on: #8b5cf6;
    --me-switch-thumb-bg: #f9fafb;
  }

  .minimal-switch {
    --me-switch-transition: all 0.1s ease;
    --me-switch-border-radius: 2px;
  }
</style>

<div class="custom-switch-sizes" style="margin-bottom: 1rem;">
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <me-switch size="sm" label="小自定义"></me-switch>
    <me-switch size="md" label="中正常"></me-switch>
    <me-switch size="lg" label="大自定义"></me-switch>
  </div>
</div>

<div class="dark-theme-switch" style="margin-bottom: 1rem;">
  <me-switch label="深色主题开关" checked color="primary"> </me-switch>
</div>

<div class="minimal-switch">
  <me-switch label="极简开关" checked> </me-switch>
</div>
```

## 高级功能

### 互联开关

```javascript
const switches = document.querySelectorAll("me-switch");
switches.forEach((switchEl) => {
  switchEl.addEventListener("change", (e) => {
    // 处理开关之间的依赖关系
    if (switchEl.name === "premium" && e.target.checked) {
      enablePremiumFeatures();
    }
  });
});
```

## 无障碍性

- **键盘导航**：Tab, Space, Enter 工作正常。
- **屏幕阅读器公告**：状态更改会被宣布。
- **ARIA 属性**：role="switch", aria-checked, aria-disabled。
- **焦点管理**：清晰的视觉指示器。
- **无障碍状态**：禁用和加载状态会被正确宣布。
