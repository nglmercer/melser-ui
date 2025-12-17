---
title: MelserTextarea
---

# MelserTextarea

一个高级文本区域组件，具有自动调整大小、字符计数器和验证。

## 基本示例

```html
<me-textarea label="评论" placeholder="在这里写下您的评论..."> </me-textarea>
```

## 交互式演示

<me-textarea 
  id="demo-basic" 
  label="评论" 
  placeholder="写点什么...">
</me-textarea>

<me-textarea 
  id="demo-resizable" 
  label="可调整大小区域" 
  placeholder="您可以改变大小..."
  resizable>
</me-textarea>

<me-textarea 
  id="demo-counter" 
  label="带计数器 (最多 500)" 
  placeholder="写下您的留言..."
  maxlength="500"
  show-counter>
</me-textarea>

<me-textarea 
  id="demo-fixed" 
  label="固定高度" 
  placeholder="此区域无法调整大小"
  rows="4"
  resize="none">
</me-textarea>

## 属性

| 属性           | 类型      | 默认值      | 描述                                            |
| -------------- | --------- | ----------- | ----------------------------------------------- |
| `rows`         | `number`  | `4`         | 可见行数                                        |
| `cols`         | `number`  | `undefined` | 可见列数                                        |
| `resize`       | `string`  | `'both'`    | 调整大小方向 (none, horizontal, vertical, both) |
| `resizable`    | `boolean` | `true`      | 允许调整大小                                    |
| `maxlength`    | `number`  | `undefined` | 允许的最大长度                                  |
| `minlength`    | `number`  | `undefined` | 允许的最小长度                                  |
| `show-counter` | `boolean` | `false`     | 显示字符计数器                                  |
| `auto-resize`  | `boolean` | `false`     | 自动调整大小                                    |
| `label`        | `string`  | `''`        | 可见字段标签                                    |
| `placeholder`  | `string`  | `''`        | 占位符文本                                      |
| `value`        | `string`  | `''`        | 字段值                                          |
| `disabled`     | `boolean` | `false`     | 禁用交互                                        |
| `readonly`     | `boolean` | `false`     | 只读                                            |
| `required`     | `boolean` | `false`     | 表单必填字段                                    |
| `wrap`         | `string`  | `'soft'`    | 换行方式 (soft, hard)                           |

## 事件

| 事件      | 描述                         |
| --------- | ---------------------------- |
| `input`   | 当值更改时触发（实时）       |
| `change`  | 当更改确认时触发（失去焦点） |
| `focus`   | 当获得焦点时触发             |
| `blur`    | 当失去焦点时触发             |
| `keydown` | 当按下键时触发               |
| `keyup`   | 当释放键时触发               |

## 用法示例

### 自动调整大小的文本区域

```html
<me-textarea
  label="详细描述"
  placeholder="描述您的产品或服务..."
  auto-resize
  rows="3"
  maxlength="1000"
  show-counter
  hint="根据内容自动调整"
>
</me-textarea>
```

### 带验证的文本区域

```html
<me-textarea
  label="产品评论 *"
  placeholder="分享您的体验..."
  required
  minlength="50"
  maxlength="500"
  show-counter
  hint="最少 50 个字符，最多 500 个"
>
</me-textarea>
```

### 只读文本区域

```html
<me-textarea label="条款和条件" value="这些是条款和条件..." readonly rows="6">
</me-textarea>
```

### 自定义样式的文本区域

```html
<me-textarea
  label="私人评论"
  placeholder="仅对管理员可见..."
  class="private-comment"
  maxlength="200"
>
</me-textarea>
```

## 表单集成

### 联系表单

```html
<form id="contact-form">
  <me-textarea
    label="留言 *"
    name="message"
    required
    minlength="10"
    maxlength="1000"
    show-counter
    placeholder="在此写下您的留言..."
    auto-resize
  >
  </me-textarea>

  <me-textarea
    label="附加信息"
    name="additionalInfo"
    rows="4"
    placeholder="您认为相关的任何额外信息"
  >
  </me-textarea>

  <button type="submit" variant="primary">发送留言</button>
</form>
```

```javascript
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = form.querySelector('[name="message"]')?.value || "";
    const additionalInfo =
      form.querySelector('[name="additionalInfo"]')?.value || "";

    if (message.length < 10) {
      alert("留言必须至少包含 10 个字符");
      return;
    }

    console.log("表单数据:", { message, additionalInfo });
    alert("留言发送成功！");
  });
}
```

## 表单演示

<me-playground-form id="textarea-playground" schema-name="textarea" title="联系表单" description="留言和附加评论。">
  <div style="margin-bottom: 1rem;">
    <me-textarea 
      label="留言 *"
      name="message"
      required
      minlength="10"
      maxlength="500"
      show-counter
      placeholder="在此写下您的留言..."
      auto-resize>
    </me-textarea>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-textarea 
      label="附加评论"
      name="additionalInfo"
      rows="4"
      placeholder="可选的额外信息...">
    </me-textarea>
  </div>
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

```css
me-textarea {
  --me-textarea-min-height: 100px;
  --me-textarea-padding: 12px;
  --me-textarea-border: 1px solid #d1d5db;
  --me-textarea-border-radius: 6px;
  --me-textarea-focus-border: #3b82f6;
  --me-textarea-resize-handle-size: 8px;
  --me-textarea-counter-color: #6b7280;
  --me-textarea-counter-font-size: 12px;
}
```

### 定制示例

```html
<style>
  .custom-textarea {
    --me-textarea-focus-border: #10b981;
    --me-textarea-border-radius: 12px;
  }

  .compact-textarea {
    --me-textarea-min-height: 80px;
    --me-textarea-padding: 8px;
  }

  .fancy-textarea {
    --me-textarea-border: 2px solid #8b5cf6;
    --me-textarea-focus-border: #7c3aed;
    --me-textarea-border-radius: 16px;
  }
</style>

<div class="custom-textarea" style="margin-bottom: 1rem;">
  <me-textarea label="自定义文本区域" placeholder="自定义样式"> </me-textarea>
</div>

<div class="compact-textarea" style="margin-bottom: 1rem;">
  <me-textarea label="紧凑文本区域" placeholder="更小" rows="3"> </me-textarea>
</div>

<div class="fancy-textarea">
  <me-textarea
    label="花式文本区域"
    placeholder="带有紫色边框"
    value="看起来很棒！"
  >
  </me-textarea>
</div>
```

<h3>颜色</h3>
<div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;">
  <me-textarea label="成功文本区域" color="success" placeholder="正确" value="有效内容"></me-textarea>
  <me-textarea label="警告文本区域" color="warning" placeholder="警告" value="需要审查的内容"></me-textarea>
  <me-textarea label="危险文本区域" color="danger" placeholder="错误" value="无效内容"></me-textarea>
</div>

## 高级功能

### 动态自动调整大小

```javascript
const textarea = document.querySelector("me-textarea[auto-resize]");
if (textarea) {
  textarea.addEventListener("input", (e) => {
    // 组件会自动处理自动调整大小
    console.log("高度已调整:", textarea.style.height);
  });
}
```

### 自定义调整大小

```html
<!-- 仅垂直 -->
<me-textarea resize="vertical" label="仅高度可调">
  <!-- 仅水平 -->
  <me-textarea resize="horizontal" label="仅宽度可调">
    <!-- 不可调整 -->
    <me-textarea resize="none" label="固定大小"></me-textarea></me-textarea
></me-textarea>
```

## 无障碍性

MelserTextarea 组件包括：

- **关联标签**：标签和文本区域之间的语义关系
- **可访问的计数器**：屏幕阅读器的字符信息
- **键盘导航**：Tab, Enter (换行), Shift+Enter
- **焦点状态**：清晰的视觉指示器
- **可访问的调整大小**：键盘处理
