---
title: MelserTagsInput
---

# MelserTagsInput

一个标签输入组件，用于添加、编辑和删除标签，具有自动完成和自定义验证功能。

## 基本示例

```html
<me-tags-input placeholder="添加标签..." label="标签"> </me-tags-input>
```

## 交互式演示

<me-tags-input 
  id="demo-basic" 
  placeholder="输入并按 Enter"
  label="基本标签">
</me-tags-input>

<me-tags-input 
  id="demo-readonly" 
  value="JavaScript, React, Vue"
  readonly
  label="只读标签">
</me-tags-input>

<me-tags-input 
  id="demo-disabled" 
  value="HTML, CSS, JavaScript"
  disabled
  label="禁用标签">
</me-tags-input>

<h3>颜色</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-tags-input label="成功" color="success" value="tag1, tag2"></me-tags-input>
  <me-tags-input label="警告" color="warning" value="tag3, tag4"></me-tags-input>
  <me-tags-input label="危险" color="danger" value="tag5, tag6"></me-tags-input>
</div>

## 属性

| 属性                | 类型                                              | 默认值          | 描述                       |
| :------------------ | :------------------------------------------------ | :-------------- | :------------------------- |
| `value`             | `string`                                          | `''`            | 当前标签（逗号分隔）       |
| `placeholder`       | `string`                                          | `'Add tag...''` | 占位符文本                 |
| `disabled`          | `boolean`                                         | `false`         | 禁用交互                   |
| `readonly`          | `boolean`                                         | `false`         | 只读                       |
| `name`              | `string`                                          | `''`            | 表单名称                   |
| `label`             | `string`                                          | `''`            | 可见组件标签               |
| `maxTags`           | `number`                                          | `undefined`     | 最大标签数量               |
| `minLength`         | `number`                                          | `1`             | 最小标签长度               |
| `maxLength`         | `number`                                          | `50`            | 最大标签长度               |
| `allowDuplicates`   | `boolean`                                         | `false`         | 允许重复标签               |
| `delimiter`         | `string`                                          | `','`           | 值的定界符                 |
| `removeOnBackspace` | `boolean`                                         | `true`          | 使用退格键删除最后一个标签 |
| `color`             | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`     | 状态的配色方案。           |

## 事件

| 事件         | 描述                   |
| :----------- | :--------------------- |
| `change`     | 当标签更改时触发       |
| `tag-add`    | 当添加标签时触发       |
| `tag-remove` | 当移除标签时触发       |
| `input`      | 当在输入框中输入时触发 |
| `focus`      | 当获得焦点时触发       |
| `blur`       | 当失去焦点时触发       |

## 用法示例

### 技能输入

```html
<me-tags-input
  placeholder="添加您的技能..."
  label="技术技能"
  max-tags="10"
  min-length="2"
>
</me-tags-input>
```

### 产品类别

```html
<me-tags-input
  placeholder="产品类别"
  label="类别"
  max-tags="5"
  allow-duplicates="false"
>
</me-tags-input>
```

### 带验证的标签

```html
<me-tags-input
  placeholder="标签（最少 3 个字符）"
  label="带验证的标签"
  min-length="3"
  max-length="20"
>
</me-tags-input>
```

## 表单集成

### 文章表单

```html
<form id="article-form">
  <h3>发布文章</h3>

  <me-tags-input
    name="tags"
    placeholder="文章标签..."
    label="标签"
    max-tags="8"
    min-length="2"
    required
  >
  </me-tags-input>

  <button type="submit">发布文章</button>
</form>
```

```javascript
document.getElementById("article-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log("Tags:", formData.get("tags"));
});
```

## 表单演示

<me-playground-form id="tags-playground" schema-name="tags-input" title="发布文章" description="内容标记和验证。">
  <div style="margin-bottom: 1.5rem;">
    <base-input 
      label="文章标题"
      name="title"
      required>
    </base-input>
  </div>
  
  <div style="margin-bottom: 1.5rem;">
    <me-tags-input 
      name="tags"
      placeholder="文章标签..."
      label="标签"
      max-tags="8"
      min-length="2">
    </me-tags-input>
  </div>
  
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

```css
me-tags-input {
  --me-tags-input-bg: #ffffff;
  --me-tags-input-border: 1px solid #d1d5db;
  --me-tags-input-border-radius: 8px;
  --me-tags-input-padding: 8px 12px;
  --me-tags-input-font-size: 14px;
  --me-tag-bg: #3b82f6;
  --me-tag-color: #ffffff;
  --me-tag-border-radius: 16px;
  --me-tag-padding: 4px 8px;
  --me-tag-margin: 4px;
  --me-tag-remove-bg: #1e40af;
  --me-tag-remove-hover: #1e3a8a;
  --me-input-placeholder-color: #9ca3af;
  --me-input-focus-border: #3b82f6;
  --me-disabled-bg: #f9fafb;
  --me-disabled-color: #6b7280;
}
```

## 无障碍性

MelserTagsInput 组件包括：

- **键盘导航**：Tab 导航，Enter 添加，Backspace 移除
- **屏幕阅读器支持**：宣布标签和操作
- **焦点可见**：清晰的焦点指示器
- **高对比度**：兼容高对比度模式
- **ARIA 属性**：角色和状态适当
