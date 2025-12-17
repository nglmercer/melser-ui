---
title: MelserFileUpload
---

# MelserFileUpload

一个高级文件上传组件，具有拖放、预览、类型验证和上传进度功能。

## 基本示例

```html
<me-file-upload label="上传文件" accept="image/*,application/pdf">
</me-file-upload>
```

## 交互式演示

<me-file-upload 
  id="demo-basic" 
  label="基本文件上传" 
  accept="image/*,application/pdf"
  max-files="3">
</me-file-upload>

<me-file-upload 
  id="demo-dropzone" 
  label="拖放区域" 
  drag-drop
  accept="image/*"
  max-size="5MB">
</me-file-upload>

<me-file-upload 
  id="demo-multiple" 
  label="多个文件" 
  accept="*/*"
  max-files="10"
  multiple
  show-preview>
</me-file-upload>

<h3>颜色</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-file-upload label="成功" color="success" accept="image/*"></me-file-upload>
  <me-file-upload label="警告" color="warning" accept="image/*"></me-file-upload>
  <me-file-upload label="危险" color="danger" accept="image/*"></me-file-upload>
</div>

## 属性

| 属性           | 类型                                              | 默认值      | 描述               |
| :------------- | :------------------------------------------------ | :---------- | :----------------- |
| `accept`       | `string`                                          | `''`        | 接受的文件类型     |
| `multiple`     | `boolean`                                         | `false`     | 允许选择多个文件   |
| `max-files`    | `number`                                          | `undefined` | 最大文件数         |
| `max-size`     | `string`                                          | `undefined` | 单个文件的最大大小 |
| `min-size`     | `string`                                          | `undefined` | 单个文件的最小大小 |
| `color`        | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | 配色方案           |
| `required`     | `boolean`                                         | `false`     | 表单必填字段       |
| `disabled`     | `boolean`                                         | `false`     | 禁用交互           |
| `drag-drop`    | `boolean`                                         | `false`     | 启用拖放           |
| `show-preview` | `boolean`                                         | `false`     | 显示预览           |
| `crop`         | `boolean`                                         | `false`     | 允许裁剪图片       |
| `auto-upload`  | `boolean`                                         | `false`     | 自动上传           |
| `url`          | `string`                                          | `''`        | 文件上传的 URL     |
| `label`        | `string`                                          | `''`        | 可见组件标签       |
| `name`         | `string`                                          | `''`        | 表单名称           |

## 事件

| 事件              | 描述             |
| :---------------- | :--------------- |
| `change`          | 当文件选择时触发 |
| `file-added`      | 当文件添加时触发 |
| `file-removed`    | 当文件移除时触发 |
| `upload-progress` | 上传期间触发     |
| `upload-complete` | 上传完成时触发   |
| `upload-error`    | 上传出错时触发   |

## 用法示例

### 带预览的图片上传

```html
<me-file-upload
  label="个人头像"
  name="profilePhoto"
  accept="image/*"
  max-files="1"
  show-preview
  crop
  required
  hint="仅限 JPG, PNG 图片。最大 2MB"
>
</me-file-upload>
```

### 带自动保存的上传

```html
<me-file-upload
  label="附件"
  name="attachments"
  accept="*/*"
  multiple
  auto-upload
  url="/api/upload"
  show-progress
>
</me-file-upload>
```

### 自定义验证的上传

```html
<me-file-upload
  label="证书"
  name="certificate"
  accept="application/pdf"
  max-size="5MB"
  required
  custom-validation="validateCertificate"
>
</me-file-upload>
```

## 表单集成

```html
<form id="registration-form">
  <me-file-upload
    label="身份证件 *"
    name="idDocument"
    accept=".pdf,.jpg,.png"
    max-files="1"
    required
    show-preview
  >
  </me-file-upload>

  <me-file-upload
    label="作品集 (拖放)"
    name="portfolio"
    accept="*/*"
    multiple
    max-files="5"
    drag-drop
  >
  </me-file-upload>

  <button type="submit">提交</button>
</form>
```

```javascript
document.getElementById("registration-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // 文件在 formData 中可用
  console.log("Document:", formData.get("idDocument"));
});
```

## 表单演示

<me-playground-form id="file-upload-playground" schema-name="file-upload" title="文件上传" description="带验证的文件上传示例。">
<div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
  <h4>📁 文件上传示例</h4>
  
  <me-file-upload 
    label="选择图片"
    name="demoImage"
    accept="image/*"
    max-files="1"
    max-size="3MB"
    show-preview>
  </me-file-upload>
</div>

<div style="border: 1px solid #e5e7eb; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
  <h4>📎 多个文件 (拖放)</h4>
  
  <me-file-upload 
    label="拖放文件到此处"
    name="demoFiles"
    accept="*/*"
    multiple
    max-files="5"
    max-size="10MB"
    drag-drop
    show-preview>
  </me-file-upload>
</div>
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

```css
me-file-upload {
  --me-upload-border: 2px dashed #d1d5db;
  --me-upload-border-hover: 2px dashed #3b82f6;
  --me-upload-bg: #f9fafb;
  --me-upload-text-color: #6b7280;
  --me-upload-focus-color: #3b82f6;
  --me-upload-error-color: #ef4444;
  --me-upload-preview-bg: #ffffff;
  --me-upload-progress-fill: #3b82f6;
}
```

## 无障碍性

- **键盘导航**：Tab、Enter、Space 可打开选择器。
- **屏幕阅读器**：宣布状态、错误和选中的文件。
- **ARIA**：拖放区域和按钮的正确标签。
