---
title: MelserModal
---

# MelserModal

一个完全可访问、可定制的模态框组件，具有 ARIA 支持、键盘导航、焦点管理和用于内容自定义的灵活插槽。

## 主要特性

- 🎨 **多种尺寸变体：** `sm`、`md`、`lg`、`xl` 和全屏选项。
- ♿ **无障碍优先：** 完整的 ARIA 支持、键盘导航和焦点捕获。
- 🔒 **焦点管理：** 打开/关闭时自动捕获和恢复焦点。
- 🎭 **灵活插槽：** 可自定义的页眉、标题、正文和操作按钮。
- 🌙 **背景控制：** 可配置的背景和模糊效果。
- ⌨️ **键盘支持：** Escape 关闭，Tab/Shift+Tab 导航。

## 基本示例

```html
<me-modal open>
  <span slot="title">模态框标题</span>
  <p>这是模态框内容。您可以在这里放置任何 HTML。</p>
  <div slot="actions">
    <button>取消</button>
    <button>确认</button>
  </div>
</me-modal>
```

## 交互式演示

<div style="display: flex; flex-direction: column; gap: 1rem;">
  <button data-modal-open="basic-modal-zh" style="padding: 0.5rem 1rem; cursor: pointer;">打开基本模态框</button>
  
  <me-modal id="basic-modal-zh" aria-label="基本模态框示例">
    <span slot="title">基本模态框</span>
    <p>这是一个具有默认设置的基本模态框。您可以通过点击背景、按 Escape 键或点击 X 按钮来关闭它。</p>
    <div slot="actions">
      <button data-modal-close="basic-modal-zh">取消</button>
      <button data-modal-close="basic-modal-zh">确定</button>
    </div>
  </me-modal>
</div>

### 尺寸变体

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-sm-zh" style="padding: 0.5rem 1rem; cursor: pointer;">小</button>
  <button data-modal-open="modal-md-zh" style="padding: 0.5rem 1rem; cursor: pointer;">中</button>
  <button data-modal-open="modal-lg-zh" style="padding: 0.5rem 1rem; cursor: pointer;">大</button>
  <button data-modal-open="modal-xl-zh" style="padding: 0.5rem 1rem; cursor: pointer;">特大</button>
  <button data-modal-open="modal-full-zh" style="padding: 0.5rem 1rem; cursor: pointer;">全屏</button>
</div>

<me-modal id="modal-sm-zh" size="sm" aria-label="小模态框">
  <span slot="title">小模态框</span>
  <p>尺寸：sm (400px)</p>
  <div slot="actions">
    <button data-modal-close="modal-sm-zh">关闭</button>
  </div>
</me-modal>

<me-modal id="modal-md-zh" size="md" aria-label="中模态框">
  <span slot="title">中模态框</span>
  <p>尺寸：md (500px)</p>
  <div slot="actions">
    <button data-modal-close="modal-md-zh">关闭</button>
  </div>
</me-modal>

<me-modal id="modal-lg-zh" size="lg" aria-label="大模态框">
  <span slot="title">大模态框</span>
  <p>尺寸：lg (700px)</p>
  <div slot="actions">
    <button data-modal-close="modal-lg-zh">关闭</button>
  </div>
</me-modal>

<me-modal id="modal-xl-zh" size="xl" aria-label="特大模态框">
  <span slot="title">特大模态框</span>
  <p>尺寸：xl (900px)</p>
  <div slot="actions">
    <button data-modal-close="modal-xl-zh">关闭</button>
  </div>
</me-modal>

<me-modal id="modal-full-zh" size="full" aria-label="全屏模态框">
  <span slot="title">全屏模态框</span>
  <p>尺寸：full (95vw)</p>
  <div slot="actions">
    <button data-modal-close="modal-full-zh">关闭</button>
  </div>
</me-modal>

### 自定义页眉

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-custom-header-zh" style="padding: 0.5rem 1rem; cursor: pointer;">自定义页眉</button>
</div>

<me-modal id="modal-custom-header-zh" aria-label="自定义页眉模态框">
  <div slot="header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; color: white;">
    <h2 style="margin: 0; font-size: 1.5rem;">自定义页眉</h2>
    <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">带渐变背景</p>
  </div>
  <p>此模态框具有完全自定义的页眉，带有渐变样式。</p>
  <div slot="actions">
    <button data-modal-close="modal-custom-header-zh">关闭</button>
  </div>
</me-modal>

### 无背景

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-no-backdrop-zh" style="padding: 0.5rem 1rem; cursor: pointer;">无背景</button>
</div>

<me-modal id="modal-no-backdrop-zh" show-backdrop="false" aria-label="无背景模态框">
  <span slot="title">无背景</span>
  <p>此模态框没有背景覆盖。您只能使用关闭按钮或 Escape 键来关闭它。</p>
  <div slot="actions">
    <button data-modal-close="modal-no-backdrop-zh">关闭</button>
  </div>
</me-modal>

### 防止点击背景关闭

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-no-backdrop-click-zh" style="padding: 0.5rem 1rem; cursor: pointer;">禁止背景点击</button>
</div>

<me-modal id="modal-no-backdrop-click-zh" close-on-backdrop-click="false" aria-label="防止背景点击关闭的模态框">
  <span slot="title">确认操作</span>
  <p>此模态框不能通过点击背景关闭。您必须使用按钮或 Escape 键。</p>
  <div slot="actions">
    <button data-modal-close="modal-no-backdrop-click-zh">取消</button>
    <button data-modal-close="modal-no-backdrop-click-zh">确认</button>
  </div>
</me-modal>

## 组件 API

### 属性

| 属性                   | 类型                              | 默认值       | 描述                                             |
| ---------------------- | --------------------------------- | ------------- | ---------------------------------------------------- |
| `open`                 | `boolean`                         | `false`       | 模态框当前是否打开。                           |
| `size`                 | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`    | 模态框尺寸变体。                                 |
| `closeOnBackdropClick` | `boolean`                         | `true`        | 是否可以通过点击背景关闭模态框。                 |
| `closeOnEscape`        | `boolean`                         | `true`        | 是否可以通过按 Escape 键关闭模态框。               |
| `showCloseButton`      | `boolean`                         | `true`        | 是否在页眉中显示关闭按钮。                       |
| `trapFocus`            | `boolean`                         | `true`        | 是否在模态框内捕获焦点。                         |
| `ariaLabel`            | `string \| null`                  | `null`        | 模态框的 ARIA 标签（用于屏幕阅读器）。           |
| `ariaDescribedby`      | `string \| null`                  | `null`        | ARIA 描述元素 ID。                                  |
| `showBackdrop`         | `boolean`                         | `true`        | 是否显示背景覆盖。                               |
| `centered`             | `boolean`                         | `true`        | 是否垂直居中模态框。                             |
| `containerClass`       | `string \| undefined`             | `undefined`   | 模态框容器的自定义类。                           |

### Shadow Parts (用于高级 CSS)

使用 `::part(name)` 在不使用变量的情况下设置内部元素的样式。

| Part            | 描述                       |
| --------------- | -------------------------- |
| `backdrop`      | 背景覆盖元素。             |
| `modal`         | 主模态框容器。             |
| `header`        | 页眉部分。                 |
| `title`         | 页眉中的标题元素。         |
| `close-button`  | 页眉中的关闭按钮。         |
| `body`          | 主内容/正文部分。          |
| `footer`        | 页脚/操作按钮部分。        |

### 事件

| 事件         | 详情 (`e.detail`) | 描述                          |
| ------------- | ----------------- | ----------------------------- |
| `open`        | `{ modal }`       | 模态框打开时触发。            |
| `close`       | `{ modal }`       | 模态框关闭时触发。            |
| `before-close`| `{ modal }`       | 模态框关闭前触发（可阻止）。   |

### 公共方法

| 方法      | 描述                    |
| --------- | ----------------------- |
| `openModal()`| 打开模态框。          |
| `close()`   | 关闭模态框。          |
| `toggle()`  | 切换模态框的打开/关闭状态。 |

## 定制指南

### 1. 尺寸变体

从五个预定义的尺寸选项中选择：

```html
<!-- 小 (400px) -->
<me-modal size="sm">
  <span slot="title">小模态框</span>
  <p>内容在这里...</p>
</me-modal>

<!-- 中 (500px) - 默认 -->
<me-modal size="md">
  <span slot="title">中模态框</span>
  <p>内容在这里...</p>
</me-modal>

<!-- 大 (700px) -->
<me-modal size="lg">
  <span slot="title">大模态框</span>
  <p>内容在这里...</p>
</me-modal>

<!-- 特大 (900px) -->
<me-modal size="xl">
  <span slot="title">特大模态框</span>
  <p>内容在这里...</p>
</me-modal>

<!-- 全屏 (95vw) -->
<me-modal size="full">
  <span slot="title">全屏模态框</span>
  <p>内容在这里...</p>
</me-modal>
```

### 2. 通过 CSS 定制 (变量)

覆盖主题变量以进行自定义样式：

```css
/* 在您的全局样式表或父组件中 */
.my-custom-modal {
  /* 背景样式 */
  --me-modal-backdrop-bg: rgba(0, 0, 0, 0.7);
  --me-modal-backdrop-blur: 4px;
  
  /* 模态框样式 */
  --me-modal-bg: #ffffff;
  --me-modal-border-color: #e0e0e0;
  --me-modal-radius: 12px;
  --me-modal-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  /* 尺寸 */
  --me-modal-width: 600px;
  --me-modal-max-width: 90vw;
  --me-modal-max-height: 85vh;
}
```

```html
<me-modal class="my-custom-modal">
  <span slot="title">自定义样式模态框</span>
  <p>此模态框使用自定义 CSS 变量。</p>
</me-modal>
```

### 3. 精细定制 (Shadow Parts)

对于变量无法覆盖的更改，请使用 `::part`：

```css
/* 自定义页眉样式 */
me-modal::part(header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom: none;
  padding: 2rem;
}

me-modal::part(title) {
  color: white;
  font-size: 1.75rem;
  font-weight: 700;
}

/* 自定义关闭按钮 */
me-modal::part(close-button) {
  color: white;
  opacity: 0.8;
}

me-modal::part(close-button):hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.2);
}

/* 自定义正文样式 */
me-modal::part(body) {
  background: #f8f9fa;
  color: #333;
}

/* 自定义页脚样式 */
me-modal::part(footer) {
  background: #f0f0f0;
  border-top: 2px solid #e0e0e0;
}
```

### 4. 使用插槽

模态框提供灵活的插槽用于内容自定义：

```html
<me-modal>
  <!-- 带有标题插槽的默认页眉 -->
  <span slot="title">模态框标题</span>
  
  <!-- 或完全自定义的页眉 -->
  <div slot="header">
    <img src="logo.png" alt="Logo" style="height: 32px;">
    <h2>自定义页眉</h2>
  </div>
  
  <!-- 默认正文插槽（不需要插槽名称） -->
  <p>这是主要内容。</p>
  
  <!-- 操作页脚插槽 -->
  <div slot="actions">
    <button>取消</button>
    <button>确认</button>
  </div>
</me-modal>
```

## 事件处理

监听模态框事件以实现自定义行为：

```javascript
const modal = document.getElementById('my-modal');

// 监听打开事件
modal.addEventListener('open', (e) => {
  console.log('模态框已打开', e.detail);
  // 加载数据、聚焦元素等
});

// 监听关闭事件
modal.addEventListener('close', (e) => {
  console.log('模态框已关闭', e.detail);
  // 清理、保存状态等
});

// 阻止关闭（例如，未保存的更改）
modal.addEventListener('before-close', (e) => {
  if (hasUnsavedChanges) {
    e.preventDefault(); // 阻止模态框关闭
    alert('请先保存您的更改！');
  }
});
```

## 无障碍性

模态框包含全面的无障碍功能：

- **ARIA 属性：** `role="dialog"`、`aria-modal="true"`、`aria-label`、`aria-describedby`
- **键盘导航：** Escape 关闭，Tab/Shift+Tab 导航
- **焦点管理：** 自动捕获和恢复焦点
- **屏幕阅读器支持：** 适当的标签和描述
- **减少动画：** 尊重 `prefers-reduced-motion` 偏好

### 自定义 ARIA 标签

```html
<me-modal aria-label="删除确认" aria-describedby="delete-desc">
  <span slot="title">删除项目</span>
  <p id="delete-desc">您确定要删除此项目吗？此操作无法撤消。</p>
  <div slot="actions">
    <button>取消</button>
    <button>删除</button>
  </div>
</me-modal>
```

## 故障排除

**点击背景时模态框未关闭：**

检查 `closeOnBackdropClick` 是否设置为 `false`：

```html
<me-modal close-on-backdrop-click="false">
  <!-- 模态框内容 -->
</me-modal>
```

**焦点未在模态框中捕获：**

确保 `trapFocus` 已启用（默认为 `true`）：

```html
<me-modal trap-focus="true">
  <!-- 模态框内容 -->
</me-modal>
```

**模态框内容对于屏幕来说太高：**

模态框正文具有 `overflow-y: auto` 用于滚动。调整最大高度：

```css
me-modal::part(body) {
  max-height: 70vh;
}
```

**慢速设备上的动画问题：**

模态框尊重 `prefers-reduced-motion`。您也可以禁用过渡：

```css
me-modal::part(backdrop),
me-modal::part(modal) {
  transition: none !important;
}
```

**模态框在移动设备上不可见：**

模态框具有响应式样式。确保设置了 viewport meta 标签：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 最佳实践

1. **始终提供标题** 使用 `title` 插槽或 `aria-label` 以确保无障碍性
2. **使用描述性 ARIA 标签** 当标题不能完全解释模态框的用途时
3. **提供清晰的操作按钮** 在页脚插槽中
4. **考虑 `before-close` 事件** 用于未保存更改的警告
5. **测试键盘导航** 以确保所有交互元素都可访问
6. **保持模态框专注于** 单个任务或操作
7. **使用适当的尺寸** - `sm` 用于确认，`md` 用于表单，`lg` 用于复杂内容
