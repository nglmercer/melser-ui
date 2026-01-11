---
title: MelserModal
---

# MelserModal

一个完全可访问、可定制的模态框组件，具有 ARIA 支持、键盘导航、焦点管理和用于内容自定义的灵活插槽。

## 主要特性

- ♿ **无障碍优先：** 完整的 ARIA 支持、键盘导航和焦点捕获。
- 🔒 **焦点管理：** 打开/关闭时自动捕获和恢复焦点。
- 🎭 **灵活插槽：** 完全可定制的内容，无预定义样式。
- 🌙 **背景控制：** 可配置的背景和模糊效果。
- ⌨️ **键盘支持：** Escape 关闭，Tab/Shift+Tab 导航。
- 🎯 **自动关闭：** `x` 属性可从任何元素关闭模态框。

## 基本示例

```html
<me-modal id="basic-modal" open>
  <div>
    <h2>模态框标题</h2>
    <p>这是模态框内容。您可以在这里放置任何 HTML。</p>
    <button x>×</button>
    <button>取消</button>
    <button>确认</button>
  </div>
</me-modal>
```

## 交互式演示

<div style="display: flex; flex-direction: column; gap: 1rem;">
  <button data-modal-open="basic-modal-zh" style="padding: 0.5rem 1rem; cursor: pointer;">打开基本模态框</button>
  
  <me-modal id="basic-modal-zh" aria-label="基本模态框示例">
    <div style="padding: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h2 style="margin: 0;">基本模态框</h2>
        <button x aria-label="关闭" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; padding: 0.5rem;">×</button>
      </div>
      <p>这是一个内容完全可定制的基本模态框。您可以通过点击 × 按钮、按 Escape 键或点击背景来关闭它。</p>
      <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem; justify-content: flex-end;">
        <button data-modal-close="basic-modal-zh">取消</button>
        <button data-modal-close="basic-modal-zh">确定</button>
      </div>
    </div>
  </me-modal>
</div>

### 自定义页眉

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-custom-header-zh" style="padding: 0.5rem 1rem; cursor: pointer;">自定义页眉</button>
</div>

<me-modal id="modal-custom-header-zh" aria-label="自定义页眉模态框">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; color: white;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2 style="margin: 0; font-size: 1.5rem;">自定义页眉</h2>
      <button x aria-label="关闭" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: white; padding: 0.5rem;">×</button>
    </div>
    <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">带渐变背景</p>
  </div>
  <div style="padding: 1.5rem;">
    <p>此模态框具有完全自定义的页眉，带有渐变样式。所有内容都是可定制的。</p>
  </div>
</me-modal>

### 无背景

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-no-backdrop-zh" style="padding: 0.5rem 1rem; cursor: pointer;">无背景</button>
</div>

<me-modal id="modal-no-backdrop-zh" show-backdrop="false" aria-label="无背景模态框">
  <div style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h2 style="margin: 0;">无背景</h2>
      <button x aria-label="关闭" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
    </div>
    <p>此模态框没有背景覆盖。您只能使用关闭按钮或 Escape 键来关闭它。</p>
  </div>
</me-modal>

### 防止点击背景关闭

<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <button data-modal-open="modal-no-backdrop-click-zh" style="padding: 0.5rem 1rem; cursor: pointer;">禁止背景点击</button>
</div>

<me-modal id="modal-no-backdrop-click-zh" close-on-backdrop-click="false" aria-label="防止背景点击关闭的模态框">
  <div style="padding: 1.5rem;">
    <h2 style="margin-top: 0;">确认操作</h2>
    <p>此模态框不能通过点击背景关闭。您必须使用按钮或 Escape 键。</p>
    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
      <button data-modal-close="modal-no-backdrop-click-zh">取消</button>
      <button data-modal-close="modal-no-backdrop-click-zh">确认</button>
    </div>
  </div>
</me-modal>

## 组件 API

### 属性

| 属性                   | 类型                              | 默认值       | 描述                                             |
| ---------------------- | --------------------------------- | ------------- | ---------------------------------------------------- |
| `open`                 | `boolean`                         | `false`       | 模态框当前是否打开。                           |
| `closeOnBackdropClick` | `boolean`                         | `true`        | 是否可以通过点击背景关闭模态框。                 |
| `closeOnEscape`        | `boolean`                         | `true`        | 是否可以通过按 Escape 键关闭模态框。               |
| `trapFocus`            | `boolean`                         | `true`        | 是否在模态框内捕获焦点。                         |
| `ariaLabel`            | `string \| null`                  | `null`        | 模态框的 ARIA 标签（用于屏幕阅读器）。           |
| `ariaDescribedby`      | `string \| null`                  | `null`        | ARIA 描述元素 ID。                                  |
| `showBackdrop`         | `boolean`                         | `true`        | 是否显示背景覆盖。                               |
| `centered`             | `boolean`                         | `true`        | 是否垂直居中模态框。                             |
| `containerClass`       | `string \| undefined`             | `undefined`   | 模态框容器的自定义类。                           |

### 特殊属性：`x`

`x` 属性可以添加到模态框内的任何元素以作为关闭按钮：

```html
<button x>×</button>
<span x>关闭</span>
<div x role="button" tabindex="0">关闭</div>
```

点击任何具有 `x` 属性的元素将自动关闭模态框。

### Shadow Parts (用于高级 CSS)

使用 `::part(name)` 在不使用变量的情况下设置内部元素的样式。

| Part            | 描述                       |
| --------------- | -------------------------- |
| `backdrop`      | 背景覆盖元素。             |
| `modal`         | 主模态框容器。             |

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

### 1. 基本结构

模态框完全可定制，没有预定义样式：

```html
<me-modal id="my-modal">
  <!-- 完全自定义的内容 -->
  <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 500px;">
    <header style="display: flex; justify-content: space-between; align-items: center;">
      <h2>自定义标题</h2>
      <button x aria-label="关闭">×</button>
    </header>
    <main style="margin: 1.5rem 0;">
      <p>模态框内容...</p>
    </main>
    <footer style="display: flex; gap: 0.5rem; justify-content: flex-end;">
      <button>取消</button>
      <button>确认</button>
    </footer>
  </div>
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
  <div style="padding: 1.5rem;">
    <h2>自定义样式模态框</h2>
    <p>此模态框使用自定义 CSS 变量来设置背景。</p>
    <button x>×</button>
  </div>
</me-modal>
```

### 3. 精细定制 (Shadow Parts)

对于变量无法覆盖的更改，请使用 `::part`：

```css
/* 自定义背景样式 */
me-modal::part(backdrop) {
  background: rgba(255, 0, 0, 0.2);
  backdrop-filter: blur(8px);
}

/* 自定义模态框包装器 */
me-modal::part(modal) {
  max-width: 800px;
}
```

### 4. 使用 `x` 属性

`x` 属性允许从任何元素关闭模态框：

```html
<me-modal>
  <div style="padding: 1.5rem;">
    <!-- 带 × 的关闭按钮 -->
    <button x style="float: right; background: none; border: none; font-size: 1.5rem;">×</button>
    
    <h2>标题</h2>
    <p>内容...</p>
    
    <!-- 带文本的关闭按钮 -->
    <button x>关闭</button>
    
    <!-- 任何元素都可以关闭模态框 -->
    <div x role="button" tabindex="0" style="cursor: pointer; padding: 0.5rem; background: #f0f0f0;">
      点击关闭
    </div>
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
  <div style="padding: 1.5rem;">
    <h2>删除项目</h2>
    <p id="delete-desc">您确定要删除此项目吗？此操作无法撤消。</p>
    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
      <button data-modal-close="delete-modal">取消</button>
      <button data-modal-close="delete-modal">删除</button>
    </div>
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

**带有 `x` 属性的按钮未关闭模态框：**

确保带有 `x` 属性的元素在模态框内：

```html
<me-modal>
  <div>
    <button x>×</button>  <!-- 这将起作用 -->
  </div>
</me-modal>
```

**模态框内容对于屏幕来说太高：**

为模态框容器添加溢出：

```css
.modal-content {
  max-height: 70vh;
  overflow-y: auto;
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

1. **始终提供标题** 或 `aria-label` 以确保无障碍性
2. **使用描述性 ARIA 标签** 当标题不能完全解释模态框的用途时
3. **提供清晰的操作按钮** 用于关闭或确认
4. **考虑 `before-close` 事件** 用于未保存更改的警告
5. **测试键盘导航** 以确保所有交互元素都可访问
6. **保持模态框专注于** 单个任务或操作
7. **使用** `x` **属性** 用于关闭元素，而不是添加手动事件监听器
8. **为带有** `x` **属性的关闭按钮添加** `aria-label`，当使用 × 等符号时
