---
title: MelserRating
---

# MelserRating

一个基于 SVG 的星级评分组件，支持小数精度（半星、精确小数）、验证和完整的 CSS 定制。

## 基本示例

```html
<me-rating label="评价此服务" max="5"> </me-rating>
```

## 交互式演示

<me-rating
  id="demo-basic"
  label="标准评分"
  max="5">
</me-rating>

<me-rating
  id="demo-precision"
  label="带有半星"
  max="5"
  precision="0.5">
</me-rating>

<me-rating
  id="demo-exact"
  label="精确评分"
  max="10"
  value="7.3"
  precision="0.1">
</me-rating>

<me-rating
  id="demo-disabled"
  label="禁用"
  max="5"
  value="3.5"
  disabled>
</me-rating>

## 属性

| 属性        | 类型      | 默认值  | 描述                         |
| :---------- | :-------- | :------ | :--------------------------- |
| `value`     | `number`  | `0`     | 当前数字评分值。             |
| `max`       | `number`  | `5`     | 显示的总星星数。             |
| `min`       | `number`  | `0`     | 允许的最小值。               |
| `precision` | `number`  | `1`     | 选择粒度 (1, 0.5, 0.1 等)。  |
| `label`     | `string`  | `''`    | 可见字段标签。               |
| `disabled`  | `boolean` | `false` | 禁用交互。                   |
| `readonly`  | `boolean` | `false` | 只读模式（用于显示平均值）。 |
| `required`  | `boolean` | `false` | 在表单中标记为必填。         |

## 事件

| 事件     | 描述                                       |
| :------- | :----------------------------------------- |
| `change` | 当用户点击并确认评分时触发。               |
| `input`  | 在交互过程中触发（可选，取决于基础实现）。 |

## 用法示例

### 半星评分

允许选择 3.5 或 4.5 等值，将 `precision` 属性设置为 `0.5`。

```html
<me-rating label="服务质量" name="serviceQuality" max="5" precision="0.5">
</me-rating>
```

### 1 到 10 评分与小数精度

对于科学案例或精确平均值（例如 8.7），使用更精细的精度。

```html
<me-rating label="精确评分" max="10" precision="0.1" value="8.7"> </me-rating>
```

## 通过 CSS 定制

### 可用变量

| 变量                  | 默认值                      | 描述                           |
| :-------------------- | :-------------------------- | :----------------------------- |
| `--star-size`         | `1.5rem`                    | 每个星星的大小（宽度和高度）。 |
| `--star-color-filled` | `#fbbf24`                   | 活动星星的颜色（黄色/金色）。  |
| `--star-color-empty`  | `var(--me-border, #e5e7eb)` | 非活动星星的背景颜色。         |

### 样式示例

```css
/* 大型绿色星星的自定义类 */
.rating-success {
  --star-size: 2.5rem;
  --star-color-filled: #10b981; /* 翡翠绿 */
  --star-color-empty: #d1fae5;
}

/* 深色主题类 */
.rating-dark {
  --star-color-filled: #8b5cf6; /* 紫罗兰色 */
  --star-color-empty: #374151; /* 深灰色 */
}
```

```html
<me-rating class="rating-success" label="成功"></me-rating>
<me-rating class="rating-dark" label="深色主题"></me-rating>
```

## 表单集成

```html
<me-playground-form
  id="rating-playground"
  schema-name="rating"
  title="反馈调查"
  description="服务评价。"
>
  <div style="margin-bottom: 1rem;">
    <me-rating label="总体体验" name="rating" required max="5" precision="0.5">
    </me-rating>
  </div>
</me-playground-form>
```

## 无障碍性

- 支持基本导航。
- 使用不依赖外部字体的可伸缩 SVG。
- 点击区域是完整的星星容器，提高了触摸设备上的可用性。
