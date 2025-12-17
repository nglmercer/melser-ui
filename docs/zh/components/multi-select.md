---
title: MelserMultiSelect
---

# MelserMultiSelect

一个具有芯片、搜索、批量选择和过滤选项的高级多选组件。

## 基本示例

```html
<me-multi-select label="选择多个选项" placeholder="选择您需要的选项">
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
</me-multi-select>
```

## 交互式演示

<me-multi-select 
  id="demo-basic" 
  label="基本技术栈" 
  placeholder="选择技术">

  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="node">Node.js</option>
  <option value="python">Python</option>
</me-multi-select>

<me-multi-select 
  id="demo-selected" 
  label="带有初始值" 
  placeholder="选择框架"
  value="react,node">

  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
</me-multi-select>

<me-multi-select 
  id="demo-search" 
  label="带有搜索" 
  placeholder="搜索技术..."
  searchable
  max-selections="5">

  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="node">Node.js</option>
  <option value="python">Python</option>
  <option value="java">Java</option>
  <option value="csharp">C#</option>
  <option value="php">PHP</option>
  <option value="ruby">Ruby</option>
</me-multi-select>

<me-multi-select 
  id="demo-limits" 
  label="带有包含限制" 
  placeholder="最多 3 项"
  max-selections="3"
  show-counter>

  <option value="frontend">前端</option>
  <option value="backend">后端</option>
  <option value="fullstack">全栈</option>
  <option value="mobile">移动端</option>
  <option value="devops">运维</option>
  <option value="uiux">UI/UX</option>
</me-multi-select>

<h3>颜色</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-multi-select label="成功" color="success" placeholder="成功" value="opt1">
    <option value="opt1">选项 1</option>
  </me-multi-select>
  <me-multi-select label="警告" color="warning" placeholder="警告" value="opt2">
    <option value="opt2">选项 2</option>
  </me-multi-select>
  <me-multi-select label="危险" color="danger" placeholder="危险" value="opt3">
    <option value="opt3">选项 3</option>
  </me-multi-select>
</div>

## 属性

| 属性             | 类型                                              | 默认值      | 描述                      |
| :--------------- | :------------------------------------------------ | :---------- | :------------------------ |
| `searchable`     | `boolean`                                         | `false`     | 启用选项搜索              |
| `clearable`      | `boolean`                                         | `false`     | 允许清除所有选择          |
| `disabled`       | `boolean`                                         | `false`     | 禁用交互                  |
| `required`       | `boolean`                                         | `false`     | 表单必填字段              |
| `max-selections` | `number`                                          | `undefined` | 最大选择数量              |
| `min-selections` | `number`                                          | `undefined` | 最小选择数量              |
| `show-counter`   | `boolean`                                         | `false`     | 显示选择计数器            |
| `select-all`     | `boolean`                                         | `false`     | 显示“全选”选项            |
| `placeholder`    | `string`                                          | `''`        | 无选择时的文本            |
| `label`          | `string`                                          | `''`        | 可见字段标签              |
| `name`           | `string`                                          | `''`        | 表单名称                  |
| `value`          | `string`                                          | `''`        | 选中的值（逗号分隔）      |
| `options`        | `SelectOption[]`                                  | `[]`        | 选项数组（slot 的替代品） |
| `color`          | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 状态的配色方案。          |

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

| 事件           | 描述               |
| :------------- | :----------------- |
| `change`       | 当选择更改时触发   |
| `search`       | 搜索期间触发       |
| `select-all`   | 全选时触发         |
| `clear-all`    | 清除所有选择时触发 |
| `max-reached`  | 达到最大限制时触发 |
| `min-reached`  | 达到最小限制时触发 |
| `item-added`   | 添加项目时触发     |
| `item-removed` | 移除项目时触发     |

## 用法示例

### 带搜索和限制的多选

```html
<me-multi-select
  label="技术技能 *"
  name="skills"
  required
  searchable
  show-counter
  max-selections="5"
  placeholder="最多选择 5 项技能"
>
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
</me-multi-select>
```

### 带验证的多选

```html
<me-multi-select
  label="兴趣 (最少 2, 最多 5)"
  name="interests"
  min-selections="2"
  max-selections="5"
  show-counter
  select-all
  required
  error="请至少选择 2 个兴趣"
>
  <option value="sports">运动</option>
  <option value="music">音乐</option>
  <option value="reading">阅读</option>
  <option value="travel">旅行</option>
</me-multi-select>
```

### 分组多选

```html
<me-multi-select label="按类别分类的技术" searchable placeholder="选择技术">
  <optgroup label="前端">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="javascript">JavaScript</option>
  </optgroup>
  <optgroup label="后端">
    <option value="node">Node.js</option>
    <option value="python">Python</option>
    <option value="java">Java</option>
  </optgroup>
</me-multi-select>
```

## 表单集成

```html
<form id="profile-form">
  <me-multi-select
    label="您掌握的技术 *"
    name="technologies"
    required
    searchable
    show-counter
    max-selections="10"
    placeholder="选择技术"
  >
    <optgroup label="语言">
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
    </optgroup>
    <optgroup label="框架">
      <option value="react">React</option>
      <option value="vue">Vue.js</option>
    </optgroup>
  </me-multi-select>

  <me-multi-select label="您使用的语言" name="languages" show-counter>
    <option value="spanish">西班牙语 (母语)</option>
    <option value="english">英语</option>
    <option value="french">法语</option>
  </me-multi-select>

  <button type="submit">保存个人资料</button>
</form>
```

## 表单演示

<me-playground-form id="multi-select-playground" schema-name="multi-select" title="技能选择" description="选择您最喜欢的技术。">
  <div style="margin-bottom: 1rem;">
    <me-multi-select 
      label="爱好 (最少 2, 最多 4) *"
      name="hobbies"
      required
      min-selections="2"
      max-selections="4"
      show-counter
      select-all
      placeholder="选择您的爱好">
      <option value="sports">🏃‍♂️ 运动</option>
      <option value="music">🎵 音乐</option>
      <option value="reading">📚 阅读</option>
      <option value="travel">✈️ 旅行</option>
      <option value="cooking">🍳 烹饪</option>
      <option value="gaming">🎮 游戏</option>
      <option value="art">🎨 艺术</option>
      <option value="photography">📸 摄影</option>
    </me-multi-select>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-multi-select 
      label="最喜欢的科目"
      name="subjects"
      searchable
      placeholder="搜索科目..."
      show-counter
      max-selections="6">
      <optgroup label="科学">
        <option value="math">📐 数学</option>
        <option value="physics">⚛️ 物理</option>
        <option value="chemistry">🧪 化学</option>
        <option value="biology">🧬 生物</option>
      </optgroup>
      <optgroup label="人文">
        <option value="history">📜 历史</option>
        <option value="literature">📖 文学</option>
        <option value="philosophy">🤔 哲学</option>
        <option value="languages">🗣️ 语言</option>
      </optgroup>
    </me-multi-select>
  </div>
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

```css
me-multi-select {
  --me-multi-select-chip-bg: #e5e7eb;
  --me-multi-select-chip-color: #374151;
  --me-multi-select-chip-hover-bg: #d1d5db;
  --me-multi-select-chip-remove-color: #6b7280;
  --me-multi-select-dropdown-bg: #ffffff;
  --me-multi-select-counter-color: #6b7280;
  --me-multi-select-counter-font-size: 12px;
  --me-multi-select-max-indicator-color: #f59e0b;
}
```

## 无障碍性

- **键盘导航**：方向键、Enter、Space、Escape
- **屏幕阅读器公告**：宣布选择更改
- **ARIA**：完全标签化
- **可访问的芯片**：清晰的移除控件
