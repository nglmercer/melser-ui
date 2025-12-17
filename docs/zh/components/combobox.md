---
title: MelserCombobox
---

# MelserCombobox

一个带有自动完成、高级搜索、动态选项和增强用户体验的组合框组件。

## 基本示例

```html
<me-combobox label="选择一个国家" placeholder="输入以搜索...">
  <option value="es">西班牙</option>
  <option value="mx">墨西哥</option>
  <option value="ar">阿根廷</option>
  <option value="co">哥伦比亚</option>
</me-combobox>
```

## 交互式演示

<me-combobox 
  id="demo-basic" 
  label="基本国家选择" 
  placeholder="输入以搜索...">

  <option value="es">西班牙</option>
  <option value="mx">墨西哥</option>
  <option value="ar">阿根廷</option>
  <option value="co">哥伦比亚</option>
  <option value="pe">秘鲁</option>
  <option value="cl">智利</option>
  <option value="uy">乌拉圭</option>
  <option value="ec">厄瓜多尔</option>
</me-combobox>

<me-combobox 
  id="demo-async" 
  label="带有动态数据" 
  placeholder="搜索城市..."
  async-data
  min-length="2">

  <!-- 选项将动态加载 -->
</me-combobox>

<me-combobox 
  id="demo-highlight" 
  label="带有高亮显示" 
  placeholder="搜索框架..."
  highlight-matches>

  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="svelte">Svelte</option>
</me-combobox>

<h3>颜色</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-combobox label="成功" color="success" value="es" placeholder="成功">
     <option value="es">西班牙</option>
  </me-combobox>
  <me-combobox label="警告" color="warning" value="mx" placeholder="警告">
     <option value="mx">墨西哥</option>
  </me-combobox>
  <me-combobox label="危险" color="danger" value="ar" placeholder="危险">
     <option value="ar">阿根廷</option>
  </me-combobox>
</div>

## 属性

| 属性                | 类型                                              | 默认值      | 描述                 |
| :------------------ | :------------------------------------------------ | :---------- | :------------------- |
| `min-length`        | `number`                                          | `0`         | 搜索所需的最小字符数 |
| `max-results`       | `number`                                          | `10`        | 最大结果数           |
| `async-data`        | `boolean`                                         | `false`     | 异步加载数据         |
| `highlight-matches` | `boolean`                                         | `false`     | 高亮显示匹配项       |
| `allow-free-text`   | `boolean`                                         | `false`     | 允许选择自由文本     |
| `debounce-time`     | `number`                                          | `300`       | 等待时间 (毫秒)      |
| `placeholder`       | `string`                                          | `''`        | 占位符文本           |
| `label`             | `string`                                          | `''`        | 可见的字段标签       |
| `name`              | `string`                                          | `''`        | 表单名称             |
| `value`             | `string`                                          | `''`        | 选中的值             |
| `options`           | `SelectOption[]`                                  | `[]`        | 选项数组             |
| `color`             | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 颜色变体             |
| `disabled`          | `boolean`                                         | `false`     | 禁用交互             |
| `required`          | `boolean`                                         | `false`     | 表单必填字段         |

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

## 事件

| 事件                | 描述                   |
| :------------------ | :--------------------- |
| `input`             | 在字段中输入时触发     |
| `change`            | 选择选项时触发         |
| `search`            | 开始搜索时触发         |
| `async-data-loaded` | 异步数据加载完成时触发 |

## 用法示例

### 异步加载

```html
<me-combobox
  label="搜索用户"
  placeholder="输入姓名..."
  async-data
  min-length="2"
>
</me-combobox>
```

```javascript
const combobox = document.querySelector("me-combobox[async-data]");
combobox.addEventListener("search", async (e) => {
  const term = e.detail.term;
  if (term.length < 2) return;

  const response = await fetch(`/api/users?q=${term}`);
  const users = await response.json();

  // 更新选项的假设辅助函数
  updateComboboxOptions(combobox, users);
});
```

### 自由文本

允许用户输入列表中不存在的值。

```html
<me-combobox label="类别" allow-free-text placeholder="选择或创建...">
  <option value="tech">科技</option>
  <option value="science">科学</option>
</me-combobox>
```

## 表单集成

```html
<form id="message-form">
  <me-combobox
    label="收件人 *"
    name="recipient"
    required
    placeholder="搜索用户..."
  >
    <option value="id1">用户 1</option>
    <option value="id2">用户 2</option>
  </me-combobox>

  <button type="submit">发送</button>
</form>
```

## 表单演示

<me-playground-form id="combobox-playground" schema-name="combobox" title="开发调查" description="自动完成和验证示例。">
  <div style="margin-bottom: 1rem;">
    <me-combobox 
      label="编程语言"
      name="language"
      placeholder="搜索语言..."
      highlight-matches
      min-length="2"
      max-results="20">
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
    </me-combobox>
  </div>
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

```css
me-combobox {
  --me-combobox-dropdown-bg: #ffffff;
  --me-combobox-option-hover-bg: #f3f4f6;
  --me-combobox-option-selected-bg: #3b82f6;
  --me-combobox-option-selected-color: #ffffff;
  --me-combobox-highlight-bg: #fef3c7;
  --me-combobox-highlight-color: #92400e;
}
```

## 无障碍性

- **键盘导航**：箭头键、回车键、Esc 键、Tab 键。
- **ARIA**：使用 `role="combobox"`, `aria-expanded`, `aria-controls`。
- **屏幕阅读器**：宣布状态更改和选中的选项。
