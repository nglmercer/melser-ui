---
title: 组件概览
---

# 组件概览

Melser UI 包含了广泛的现代且无障碍的 Web 组件。所有组件均使用 Lit 构建，并遵循 Web 开发最佳实践。

## 可用组件列表

### 表单和数据输入

#### 文本输入

- **[MelserTextInput (文本输入)](./text-input)** - 带有验证和状态的文本字段
- **[MelserTextarea (文本区域)](./textarea)** - 多行文本区域
- **[MelserPasswordInput (密码输入)](./password-input)** - 带有可见性切换的密码字段
- **[MelserNumberInput (数字输入)](./number-input)** - 带有增量控制的数字字段

#### 选择器

- **[MelserSelect (选择器)](./select)** - 简单的下拉选择器
- **[MelserMultiSelect (多选)](./multi-select)** - 带有搜索功能的多选组件
- **[MelserCombobox (组合框)](./combobox)** - 带有自动完成功能的组合框
- **[MelserCheckbox (复选框)](./checkbox)** - 复选框
- **[MelserRadioGroup (单选组)](./radio-group)** - 单选按钮组

#### 专用输入

- **[MelserFileUpload (文件上传)](./file-upload)** - 带有拖放功能的文件上传
- **[MelserDatePicker (日期选择器)](./date-picker)** - 日期选择器
- **[MelserTimePicker (时间选择器)](./time-picker)** - 时间选择器
- **[MelserColorPicker (颜色选择器)](./color-picker)** - 颜色选择器
- **[MelserRating (评分)](./rating)** - 星级评分
- **[MelserOtpInput (OTP 输入)](./otp-input)** - OTP 代码输入
- **[MelserTagsInput (标签输入)](./tags-input)** - 标签输入

#### 范围控制

- **[MelserRange (范围)](./range)** - 范围滑块
- **[MelserDualRange (双范围)](./dual-range)** - 带有两个值（最小-最大）的滑块

#### 特殊控制

- **[MelserSwitch (开关)](./switch)** - 切换开关

#### 数据展示

- **[DataTable (数据表格)](./data-table)** - 带有分页和排序功能的高级数据表格

## 组件使用示例

所有组件遵循相同的使用模式：

```html
<!-- 基本组件 -->
<me-checkbox label="简单选项"></me-checkbox>

<!-- 带有属性 -->
<base-input label="用户名" placeholder="输入您的用户名" required minlength="3">
</base-input>

<!-- 带有事件 -->
<button id="submit-btn" variant="primary" disabled>保存</button>
```

```javascript
// 监听事件
const button = document.getElementById("submit-btn");
button?.addEventListener("click", (event) => {
  console.log("按钮被点击:", event);
});
```

## 通用特性

### 共享属性

所有组件共享以下属性：

| 属性       | 类型      | 描述           |
| ---------- | --------- | -------------- |
| `disabled` | `boolean` | 禁用交互       |
| `required` | `boolean` | 标记为必填字段 |
| `value`    | `string`  | 组件值         |
| `name`     | `string`  | 表单名称       |

### 通用事件

| 事件     | 描述             |
| -------- | ---------------- |
| `input`  | 当值更改时触发   |
| `change` | 当更改确认时触发 |
| `focus`  | 当获得焦点时触发 |
| `blur`   | 当失去焦点时触发 |

### 视觉状态

- **Normal (正常)** - 默认状态
- **Hover (悬停)** - 鼠标悬停时
- **Focus (聚焦)** - 获得焦点时（键盘）
- **Disabled (禁用)** - 禁用状态
- **Error (错误)** - 错误/验证失败状态

## 浏览器兼容性

| 浏览器  | 最低版本 |
| ------- | -------- |
| Chrome  | 88+      |
| Firefox | 89+      |
| Safari  | 14.1+    |
| Edge    | 88+      |

## 交互式示例

您可以在此处实时测试一些组件：

### 表单示例

```html
<form id="demo-form">
  <base-input
    label="邮箱"
    type="email"
    placeholder="you@email.com"
    id="email-input"
    required
  >
  </base-input>

  <me-password-input
    label="密码"
    placeholder="最少 8 个字符"
    minlength="8"
    id="password-input"
    required
  >
  </me-password-input>

  <me-checkbox label="记住我" id="remember-checkbox"> </me-checkbox>

  <button variant="primary" type="submit" id="submit-btn">登录</button>
</form>
```

### 组件实战演示

<base-input id="demo-name" label="姓名" placeholder="此处输入您的姓名"></base-input>

<me-select id="demo-select" label="选择一个选项">
  <option value="option1">选项 1</option>
  <option value="option2">选项 2</option>
  <option value="option3">选项 3</option>
</me-select>

<me-rating id="demo-rating" label="评价此服务" max="5"></me-rating>

<button  id="demo-form-btn" variant="outline" type="submit">测试表单</button >

<div id="demo-result" style="margin-top: 1rem; padding: 0.5rem; background: #f5f5f5; border-radius: 4px; display: none;">
  <strong>表单值:</strong>
  <div id="demo-values"></div>
</div>

## 无障碍性

Melser UI 的所有组件在设计时都考虑了无障碍性：

- 适当的 **ARIA 标签**
- 完整的 **键盘导航**
- 正确的 **焦点管理**
- **屏幕阅读器** 兼容性
- **高对比度** 支持

## 定制

组件使用 **CSS 自定义属性** 以便于定制：

```css
button {
  --me-primary-color: #3b82f6;
  --me-border-radius: 6px;
  --me-padding: 8px 16px;
}
```

可以查看 [别名指南](../guide/aliases) 以获取更多配置详情。

## 下一步

- [详细安装](../guide/installation)
- [定制主题](../guide/aliases)
- [特定组件指南](./checkbox)
