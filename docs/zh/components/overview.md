---
title: 组件概览
---

# 组件概览

Melser UI 包含各种现代且可访问的 Web 组件。所有组件均使用 Lit 构建，并遵循 Web 开发最佳实践。

## 可用组件列表

### 表单和数据输入

#### 文本输入

- **[MelserTextInput](./text-input)** - 带验证和状态的文本字段
- **[MelserTextarea](./textarea)** - 多行文本区域
- **[MelserPasswordInput](./password-input)** - 带可见性切换的密码字段
- **[MelserNumberInput](./number-input)** - 带增量控制的数字字段

#### 选择器

- **[MelserSelect](./select)** - 简单的下拉选择器
- **[MelserMultiSelect](./multi-select)** - 带搜索的多选器
- **[MelserCombobox](./combobox)** - 带自动完成的组合框
- **[MelserCheckbox](./checkbox)** - 复选框
- **[MelserRadioGroup](./radio-group)** - 单选按钮组

#### 专用输入

- **[MelserFileUpload](./file-upload)** - 带拖放的文件上传
- **[MelserDatePicker](./date-picker)** - 日期选择器
- **[MelserTimePicker](./time-picker)** - 时间选择器
- **[MelserColorPicker](./color-picker)** - 颜色选择器
- **[MelserRating](./rating)** - 星级评分
- **[MelserOtpInput](./otp-input)** - OTP 代码输入
- **[MelserTagsInput](./tags-input)** - 标签输入

#### 范围控制

- **[MelserRange](./range)** - 范围滑块
- **[MelserDualRange](./dual-range)** - 双值滑块（最小-最大）

#### 特殊控制

- **[MelserSwitch](./switch)** - 切换开关

#### 数据显示

- **[DataTable](./data-table)** - 带分页和排序的高级数据表

## 组件使用示例

所有组件都遵循相同的使用模式：

```html
<!-- 基本组件 -->
<me-checkbox label="简单选项"></me-checkbox>

<!-- 带属性 -->
<base-input label="用户名" placeholder="输入您的用户名" required minlength="3">
</base-input>

<!-- 带事件 -->
<button id="submit-btn" variant="primary" disabled>保存</button>
```

```javascript
// 监听事件
const button = document.getElementById("submit-btn");
button?.addEventListener("click", (event) => {
  console.log("按钮被点击：", event);
});
```

## 通用特性

### 共享属性

所有组件都共享这些属性：

| 属性       | 类型      | 描述           |
| ---------- | --------- | -------------- |
| `disabled` | `boolean` | 禁用交互       |
| `required` | `boolean` | 标记为必填字段 |
| `value`    | `string`  | 组件值         |
| `name`     | `string`  | 表单名称       |

### 通用事件

| 事件     | 描述           |
| -------- | -------------- |
| `input`  | 当值改变时触发 |
| `change` | 确认更改时触发 |
| `focus`  | 获得焦点时触发 |
| `blur`   | 失去焦点时触发 |

### 视觉状态

- **Normal** - 默认状态
- **Hover** - 鼠标悬停时
- **Focus** - 获得焦点时（键盘）
- **Disabled** - 禁用状态
- **Error** - 错误/验证失败状态

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
    label="电子邮箱"
    type="email"
    placeholder="you@email.com"
    id="email-input"
    required
  >
  </base-input>

  <me-password-input
    label="密码"
    placeholder="主要 8 个字符"
    minlength="8"
    id="password-input"
    required
  >
  </me-password-input>

  <me-checkbox label="记住我" id="remember-checkbox"> </me-checkbox>

  <button variant="primary" type="submit" id="submit-btn">登录</button>
</form>
```

### 组件演示

<base-input id="demo-name" label="姓名" placeholder="您的姓名"></base-input>

<me-select id="demo-select" label="选择一个选项">
  <option value="option1">选项 1</option>
  <option value="option2">选项 2</option>
  <option value="option3">选项 3</option>
</me-select>

<me-rating id="demo-rating" label="评价此服务" max="5"></me-rating>

<button  id="demo-form-btn" variant="outline" type="submit">测试表单</button >

<div id="demo-result" style="margin-top: 1rem; padding: 0.5rem; background: #f5f5f5; border-radius: 4px; display: none;">
  <strong>表单值：</strong>
  <div id="demo-values"></div>
</div>

## 无障碍性

所有 Melser UI 组件在设计时都考虑了无障碍性：

- 适当的 **ARIA labels**
- 完整的 **键盘导航**
- 正确的 **焦点管理**
- **屏幕阅读器** 兼容性
- **高对比度** 支持

## 自定义

组件使用 **CSS 自定义属性** 以便轻松定制：

```css
button {
  --me-primary-color: #3b82f6;
  --me-border-radius: 6px;
  --me-padding: 8px 16px;
}
```

查看 [别名指南](../guide/aliases) 了解更多配置详情。

## 下一步

- [详细安装](../guide/installation)
- [自定义主题](../guide/aliases)
- [特定组件指南](./checkbox)
