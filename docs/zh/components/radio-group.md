---
title: MelserRadioGroup
---

# MelserRadioGroup

一个无障碍且可定制的单选按钮组组件，支持垂直/水平方向和验证。

## 基本示例

```html
<me-radio-group label="选择一个选项" name="option">
  <option value="option1" label="选项 1"></option>
  <option value="option2" label="选项 2"></option>
  <option value="option3" label="选项 3"></option>
</me-radio-group>
```

## 交互式演示

<me-radio-group 
  id="demo-basic" 
  label="基本单选" 
  name="demo-basic">

  <option value="option1" label="第一个选项"></option>
  <option value="option2" label="第二个选项"></option>
  <option value="option3" label="第三个选项"></option>
</me-radio-group>

<me-radio-group 
  id="demo-selected" 
  label="带有初始选择" 
  name="demo-selected"
  value="option2">

  <option value="option1" label="选项 A"></option>
  <option value="option2" label="选项 B"></option>
  <option value="option3" label="选项 C"></option>
</me-radio-group>

<me-radio-group 
  id="demo-disabled" 
  label="带有禁用选项" 
  name="demo-disabled"
  value="option1">

  <option value="option1" label="可用选项"></option>
  <option value="option2" label="不可用选项" disabled></option>
  <option value="option3" label="另一个可用选项"></option>
</me-radio-group>

<me-radio-group 
  id="demo-horizontal" 
  label="水平方向" 
  name="demo-horizontal"
  orientation="horizontal">

  <option value="yes" label="是"></option>
  <option value="no" label="否"></option>
  <option value="maybe" label="也许"></option>
</me-radio-group>

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 1rem;">
  <h4>颜色</h4>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
    <me-radio-group label="成功" color="success" name="color-success" value="1" orientation="horizontal">
      <option value="1" label="选项 1"></option>
      <option value="2" label="选项 2"></option>
    </me-radio-group>
    <me-radio-group label="警告" color="warning" name="color-warning" value="1" orientation="horizontal">
      <option value="1" label="选项 1"></option>
      <option value="2" label="选项 2"></option>
    </me-radio-group>
    <me-radio-group label="危险" color="danger" name="color-danger" value="1" orientation="horizontal">
      <option value="1" label="选项 1"></option>
      <option value="2" label="选项 2"></option>
    </me-radio-group>
  </div>
</div>

<me-radio-group 
  id="demo-required" 
  label="必填字段 *" 
  name="demo-required"
  required>

  <option value="yes" label="我接受条款"></option>
  <option value="no" label="我不接受条款"></option>
</me-radio-group>

<me-radio-group 
  id="demo-groups" 
  label="带有嵌套组" 
  name="demo-groups">

  <fieldset style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <legend style="padding: 0 0.5rem; font-weight: bold;">用户类型</legend>
    <option value="personal" label="个人" name="user-type"></option>
    <option value="business" label="企业" name="user-type"></option>
  </fieldset>
  
  <fieldset style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px;">
    <legend style="padding: 0 0.5rem; font-weight: bold;">经验水平</legend>
    <option value="beginner" label="初学者" name="experience"></option>
    <option value="intermediate" label="中级" name="experience"></option>
    <option value="advanced" label="高级" name="experience"></option>
  </fieldset>
</me-radio-group>

## HTML 结构

单选组组件可以通过两种方式使用：

### 方式 1：使用子元素

```html
<me-radio-group label="我的选择" name="my-selection">
  <option value="option1" label="第一个选项"></option>
  <option value="option2" label="第二个选项"></option>
  <option value="option3" label="第三个选项"></option>
</me-radio-group>
```

### 方式 2：使用传统选项

```html
<me-radio-group label="传统选择" name="traditional">
  <option value="option1">第一个选项</option>
  <option value="option2">第二个选项</option>
  <option value="option3">第三个选项</option>
</me-radio-group>
```

## 组属性

| 属性          | 类型             | 默认值       | 描述                        |
| ------------- | ---------------- | ------------ | --------------------------- |
| `orientation` | `string`         | `'vertical'` | 方向 (vertical, horizontal) |
| `name`        | `string`         | `''`         | 表单名称                    |
| `value`       | `string`         | `''`         | 选中的值                    |
| `disabled`    | `boolean`        | `false`      | 禁用整个组                  |
| `required`    | `boolean`        | `false`      | 表单必填字段                |
| `label`       | `string`         | `''`         | 可见组标签                  |
| `options`     | `SelectOption[]` | `[]`         | 选项数组（slot 的替代品）   |

### 类型定义

#### SelectOption

```typescript
interface SelectOption {
  label: string;
  value: string;
  group?: string;
  disabled?: boolean;
  [key: string]: unknown;
}
```

## 单个单选属性

| 属性       | 类型      | 默认值  | 描述           |
| ---------- | --------- | ------- | -------------- |
| `value`    | `string`  | -       | 选项值         |
| `label`    | `string`  | `''`    | 标签文本       |
| `checked`  | `boolean` | `false` | 选项被选中     |
| `disabled` | `boolean` | `false` | 选项被禁用     |
| `name`     | `string`  | `''`    | 组名称（可选） |

## 事件

| 事件      | 描述             |
| --------- | ---------------- |
| `change`  | 当选择更改时触发 |
| `focus`   | 当获得焦点时触发 |
| `blur`    | 当失去焦点时触发 |
| `invalid` | 当验证失败时触发 |

## 用法示例

### 水平单选组

```html
<me-radio-group
  label="您是否同意？"
  name="agreement"
  orientation="horizontal"
  required
>
  <option value="yes" label="是"></option>
  <option value="no" label="否"></option>
  <option value="na" label="不适用"></option>
</me-radio-group>
```

### 带有验证的单选组

```html
<me-radio-group
  label="支付方式 *"
  name="paymentMethod"
  required
  error="您必须选择一种支付方式"
>
  <option value="credit" label="信用卡"></option>
  <option value="debit" label="借记卡"></option>
  <option value="paypal" label="PayPal"></option>
  <option value="transfer" label="银行转账"></option>
</me-radio-group>
```

### 带有嵌套组的单选组

```html
<me-radio-group label="通知设置" name="notifications">
  <fieldset
    style="border: 1px solid #d1d5db; padding: 1rem; border-radius: 6px;"
  >
    <legend>邮件</legend>
    <option value="email-all" name="email" label="所有通知"></option>
    <option value="email-important" name="email" label="仅重要通知"></option>
    <option value="email-none" name="email" label="无"></option>
  </fieldset>

  <fieldset
    style="border: 1px solid #d1d5db; padding: 1rem; border-radius: 6px; margin-top: 1rem;"
  >
    <legend>短信</legend>
    <option value="sms-all" name="sms" label="所有通知"></option>
    <option value="sms-important" name="sms" label="仅紧急通知"></option>
    <option value="sms-none" name="sms" label="无"></option>
  </fieldset>
</me-radio-group>
```

### 带有“其他”选项的单选组

```html
<me-radio-group label="您是如何听说我们的？" name="referral" required>
  <option value="google" label="Google / 搜索"></option>
  <option value="social" label="社交媒体"></option>
  <option value="friend" label="朋友推荐"></option>
  <option value="advertisement" label="广告"></option>
  <option value="other" label="其他"></option>
</me-radio-group>
```

## 表单集成

### 个人资料设置表单

```html
<form id="profile-form">
  <me-radio-group
    label="订阅计划 *"
    name="plan"
    required
    orientation="vertical"
  >
    <option value="basic" label="基础计划 - 免费"></option>
    <option value="pro" label="专业计划 - €9.99/月"></option>
    <option value="enterprise" label="企业计划 - €29.99/月"></option>
  </me-radio-group>

  <me-radio-group label="通知频率" name="frequency" orientation="horizontal">
    <option value="immediate" label="立即"></option>
    <option value="daily" label="每日"></option>
    <option value="weekly" label="每周"></option>
    <option value="never" label="从不"></option>
  </me-radio-group>

  <me-radio-group label="主题偏好" name="theme">
    <option value="light" label="浅色"></option>
    <option value="dark" label="深色"></option>
    <option value="auto" label="自动 (跟随系统)"></option>
  </me-radio-group>

  <button type="submit" variant="primary">保存设置</button>
</form>
```

```javascript
const form = document.getElementById("profile-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.plan) {
      alert("请选择一个订阅计划");
      return;
    }

    console.log("个人资料设置:", data);

    let planDescription = "";
    switch (data.plan) {
      case "basic":
        planDescription = "基础计划 (免费)";
        break;
      case "pro":
        planDescription = "专业计划 (€9.99/月)";
        break;
      case "enterprise":
        planDescription = "企业计划 (€29.99/月)";
        break;
    }

    alert(`设置保存成功！\n计划: ${planDescription}`);
  });
}
```

## 表单演示

<me-playground-form id="radio-playground" schema-name="radio" title="满意度调查" description="带有验证的单选问题。">
  <div style="margin-bottom: 1.5rem;">
    <me-radio-group 
      label="您喜欢这个组件吗？ *"
      name="opinion"
      required
      orientation="horizontal">
      <option value="love_it" label="很喜欢！"></option>
      <option value="like_it" label="喜欢"></option>
      <option value="acceptable" label="还可以"></option>
      <option value="dislike_it" label="不喜欢"></option>
    </me-radio-group>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-radio-group 
      label="Web 组件经验水平"
      name="experience"
      orientation="vertical">
      <option value="beginner" label="🟢 初学者 - 第一次使用"></option>
      <option value="intermediate" label="🟡 中级 - 有一定经验"></option>
      <option value="advanced" label="🔴 高级 - 专家"></option>
    </me-radio-group>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-radio-group 
      label="使用偏好"
      name="preference"
      orientation="horizontal">
      <option value="code" label="💻 代码"></option>
      <option value="visual" label="🎨 可视化界面"></option>
      <option value="both" label="⚖️ 两者"></option>
    </me-radio-group>
  </div>
</me-playground-form>

<div id="radio-result" style="margin-top: 1rem; padding: 1rem; background: #f3f4f6; border-radius: 6px; display: none;">
  <strong>调查结果:</strong>
  <div id="radio-details"></div>
</div>

## 通过 CSS 定制

### CSS 变量

```css
me-radio-group {
  --me-radio-size: 20px;
  --me-radio-color: #3b82f6;
  --me-radio-border-color: #d1d5db;
  --me-radio-focus-color: #2563eb;
  --me-radio-disabled-opacity: 0.5;
  --me-radio-label-color: #374151;
  --me-radio-label-font-size: 14px;
  --me-radio-spacing: 8px;
  --me-radio-group-gap: 12px;
}
```

## 高级功能

### 动态单选组

```javascript
const radioGroup = document.querySelector("me-radio-group");
if (radioGroup) {
  // 动态添加选项
  function addOption(value, label) {
    const radio = document.createElement("me-radio");
    radio.value = value;
    radio.label = label;
    radioGroup.appendChild(radio);
  }

  // 移除选项
  function removeOption(value) {
    const radio = radioGroup.querySelector(`me-radio[value="${value}"]`);
    if (radio) {
      radio.remove();
    }
  }

  // 获取所有选项
  function getOptions() {
    return Array.from(radioGroup.querySelectorAll("me-radio"));
  }
}
```

## 无障碍性

MelserRadioGroup 组件包括：

- **键盘导航**：箭头键、Tab、Space、Enter
- **屏幕阅读器公告**：宣布选择和更改
- **ARIA 组**：适当的 role="radiogroup"
- **焦点管理**：清晰的视觉指示器
- **禁用状态**：正确宣布

## 最佳实践

1. **始终包含标签** 用于整个组
2. **使用水平方向** 用于少量选项 (2-3)
3. **使用垂直方向** 用于许多选项
4. **逻辑地分组相关选项**
5. **包含验证** 用于必填字段
6. **提供即时反馈** 给用户
7. **考虑选项顺序** 按相关性/频率
