---
title: MelserSelect
---

# MelserSelect

一个现代且无障碍的下拉选择器组件，具有搜索、分组和多项定制选项。

## 基本示例

```html
<me-select label="选择一个选项" placeholder="选择一个选项">
  <option value="option1">选项 1</option>
  <option value="option2">选项 2</option>
  <option value="option3">选项 3</option>
</me-select>
```

## 交互式演示

<me-select 
  id="demo-basic" 
  label="基本选择器" 
  placeholder="选择一个选项">

  <option value="">选择一个选项</option>
  <option value="es">西班牙</option>
  <option value="mx">墨西哥</option>
  <option value="ar">阿根廷</option>
  <option value="co">哥伦比亚</option>
  <option value="pe">秘鲁</option>
</me-select>

<me-select 
  id="demo-groups" 
  label="带分组" 
  placeholder="选择一个国家">

  <optgroup label="欧洲">
    <option value="es">西班牙</option>
    <option value="fr">法国</option>
    <option value="de">德国</option>
  </optgroup>
  <optgroup label="美洲">
    <option value="mx">墨西哥</option>
    <option value="ar">阿根廷</option>
    <option value="co">哥伦比亚</option>
  </optgroup>
</me-select>

<me-select 
  id="demo-selected" 
  label="带有初始值" 
  value="mx"
  placeholder="预选国家">

  <option value="">选择一个国家</option>
  <option value="es">西班牙</option>
  <option value="mx" selected>墨西哥</option>
  <option value="ar">阿根廷</option>
</me-select>

<me-select 
  id="demo-disabled" 
  label="禁用" 
  value="co"
  disabled>

  <option value="">选择一个选项</option>
  <option value="es">西班牙</option>
  <option value="mx">墨西哥</option>
  <option value="co" selected>哥伦比亚</option>
</me-select>

<me-select 
  id="demo-search" 
  label="带有搜索" 
  searchable
  placeholder="搜索一个国家...">

  <option value="es">西班牙</option>
  <option value="mx">墨西哥</option>
  <option value="ar">阿根廷</option>
  <option value="co">哥伦比亚</option>
  <option value="pe">秘鲁</option>
  <option value="cl">智利</option>
  <option value="uy">乌拉圭</option>
</me-select>

<h3>颜色</h3>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
  <me-select label="成功" color="success" value="1" placeholder="成功">
    <option value="1">选项 1</option>
  </me-select>
  <me-select label="警告" color="warning" value="1" placeholder="警告">
    <option value="1">选项 1</option>
  </me-select>
  <me-select label="危险" color="danger" value="1" placeholder="危险">
    <option value="1">选项 1</option>
  </me-select>
</div>

## 属性

| 属性          | 类型             | 默认值  | 描述                      |
| ------------- | ---------------- | ------- | ------------------------- |
| `searchable`  | `boolean`        | `false` | 启用选项搜索              |
| `clearable`   | `boolean`        | `false` | 允许清除选择              |
| `disabled`    | `boolean`        | `false` | 禁用交互                  |
| `required`    | `boolean`        | `false` | 表单必填字段              |
| `multiple`    | `boolean`        | `false` | 允许选择多个选项          |
| `placeholder` | `string`         | `''`    | 无选择时的文本            |
| `label`       | `string`         | `''`    | 可见字段标签              |
| `name`        | `string`         | `''`    | 表单名称                  |
| `value`       | `string`         | `''`    | 选中的值                  |
| `options`     | `SelectOption[]` | `[]`    | 选项数组（slot 的替代品） |

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

| 事件     | 描述                           |
| -------- | ------------------------------ |
| `change` | 当选择更改时触发               |
| `search` | 在搜索期间触发（仅限可搜索）   |
| `clear`  | 当清除选择时触发（仅限可清除） |
| `focus`  | 当获得焦点时触发               |
| `blur`   | 当失去焦点时触发               |
| `open`   | 当下拉菜单打开时触发           |
| `close`  | 当下拉菜单关闭时触发           |

## 用法示例

### 带搜索的选择器

```html
<me-select
  label="国家（带搜索）"
  searchable
  placeholder="输入以搜索..."
  clearable
>
  <option value="">所有国家</option>
  <option value="es">西班牙</option>
  <option value="mx">墨西哥</option>
  <option value="ar">阿根廷</option>
  <option value="co">哥伦比亚</option>
  <option value="pe">秘鲁</option>
  <option value="cl">智利</option>
</me-select>
```

### 带验证的选择器

```html
<me-select
  label="文档类型 *"
  required
  placeholder="选择类型"
  error="您必须选择文档类型"
>
  <option value="">选择类型</option>
  <option value="dni">身份证</option>
  <option value="passport">护照</option>
  <option value="license">驾驶证</option>
  <option value="other">其他</option>
</me-select>
```

### 分组选择器

```html
<me-select label="城市" placeholder="选择城市">
  <optgroup label="西班牙">
    <option value="madrid">马德里</option>
    <option value="barcelona">巴塞罗那</option>
    <option value="valencia">瓦伦西亚</option>
  </optgroup>
  <optgroup label="墨西哥">
    <option value="cdmx">墨西哥城</option>
    <option value="guadalajara">瓜达拉哈拉</option>
    <option value="monterrey">蒙特雷</option>
  </optgroup>
</me-select>
```

### 多选选择器

```html
<me-select label="技能" multiple placeholder="选择相关技能">
  <option value="javascript">JavaScript</option>
  <option value="typescript">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue.js</option>
  <option value="angular">Angular</option>
  <option value="node">Node.js</option>
  <option value="python">Python</option>
</me-select>
```

## 表单集成

### 注册表单

```html
<form id="registration-select-form">
  <me-select
    label="居住国 *"
    name="country"
    required
    placeholder="选择您的国家"
  >
    <optgroup label="欧洲">
      <option value="es">西班牙</option>
      <option value="fr">法国</option>
      <option value="de">德国</option>
    </optgroup>
    <optgroup label="美洲">
      <option value="mx">墨西哥</option>
      <option value="ar">阿根廷</option>
      <option value="co">哥伦比亚</option>
      <option value="pe">秘鲁</option>
    </optgroup>
  </me-select>

  <me-select label="城市" name="city" placeholder="选择城市">
    <!-- 基于国家的动态选项 -->
  </me-select>

  <me-select label="账户类型" name="accountType" searchable clearable>
    <option value="">选择类型</option>
    <option value="personal">个人账户</option>
    <option value="business">企业账户</option>
    <option value="student">学生账户</option>
  </me-select>

  <button type="submit" variant="primary">完成注册</button>
</form>
```

```javascript
const form = document.getElementById("registration-select-form");
if (form) {
  const countrySelect = form.querySelector('[name="country"]');
  const citySelect = form.querySelector('[name="city"]');

  // 根据国家更新城市
  if (countrySelect && citySelect) {
    countrySelect.addEventListener("change", (e) => {
      const country = e.target.value;
      updateCities(citySelect, country);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.country) {
      alert("请选择您的国家");
      return;
    }

    console.log("表单数据:", data);
    alert("注册完成！");
  });
}

function updateCities(citySelect, country) {
  const cities = {
    es: [
      { value: "madrid", label: "马德里" },
      { value: "barcelona", label: "巴塞罗那" },
      { value: "valencia", label: "瓦伦西亚" },
    ],
    mx: [
      { value: "cdmx", label: "墨西哥城" },
      { value: "guadalajara", label: "瓜达拉哈拉" },
      { value: "monterrey", label: "蒙特雷" },
    ],
  };

  // 清除当前选项
  citySelect.innerHTML = '<option value="">选择城市</option>';

  // 添加新选项
  if (cities[country]) {
    cities[country].forEach((city) => {
      const option = document.createElement("option");
      option.value = city.value;
      option.textContent = city.label;
      citySelect.appendChild(option);
    });
  }
}
```

## 表单演示

<me-playground-form id="select-playground" schema-name="select" title="选择表单" description="带有验证的交互式示例。">
  <div style="margin-bottom: 1rem;">
    <me-select 
      label="国家 *"
      name="country"
      required
      placeholder="选择您的国家">
      <optgroup label="欧洲">
        <option value="es">西班牙</option>
        <option value="fr">法国</option>
        <option value="de">德国</option>
      </optgroup>
      <optgroup label="美洲">
        <option value="mx">墨西哥</option>
        <option value="ar">阿根廷</option>
        <option value="co">哥伦比亚</option>
        <option value="pe">秘鲁</option>
      </optgroup>
    </me-select>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-select 
      label="城市"
      name="city"
      placeholder="选择城市">
      <option value="">请先选择国家</option>
    </me-select>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <me-select 
      label="性别"
      name="gender"
      searchable
      clearable>
      <option value="">不愿透露</option>
      <option value="male">男性</option>
      <option value="female">女性</option>
      <option value="other">其他</option>
    </me-select>
  </div>
</me-playground-form>

## 通过 CSS 定制

### CSS 变量

```css
me-select {
  --me-select-width: 100%;
  --me-select-height: 40px;
  --me-select-padding: 8px 40px 8px 12px;
  --me-select-border: 1px solid #d1d5db;
  --me-select-border-radius: 6px;
  --me-select-focus-border: #3b82f6;
  --me-select-dropdown-bg: #ffffff;
  --me-select-dropdown-border: #d1d5db;
  --me-select-option-hover-bg: #f3f4f6;
  --me-select-option-selected-bg: #3b82f6;
  --me-select-option-selected-color: #ffffff;
}
```

### 定制示例

```html
<style>
  .custom-select {
    --me-select-focus-border: #10b981;
    --me-select-option-selected-bg: #10b981;
    --me-select-border-radius: 12px;
  }

  .compact-select {
    --me-select-height: 32px;
    --me-select-padding: 4px 32px 4px 8px;
  }

  .dark-select {
    --me-select-border: 1px solid #374151;
    --me-select-bg: #1f2937;
    --me-select-color: #f9fafb;
    --me-select-focus-border: #8b5cf6;
    --me-select-dropdown-bg: #1f2937;
    --me-select-option-hover-bg: #374151;
  }
</style>

<div class="custom-select" style="margin-bottom: 1rem;">
  <me-select label="自定义选择器" value="option2">
    <option value="option1">选项 1</option>
    <option value="option2">选项 2</option>
    <option value="option3">选项 3</option>
  </me-select>
</div>

<div class="compact-select" style="margin-bottom: 1rem;">
  <me-select label="紧凑选择器" value="es">
    <option value="es">西班牙</option>
    <option value="mx">墨西哥</option>
    <option value="ar">阿根廷</option>
  </me-select>
</div>

<div class="dark-select">
  <me-select label="深色主题" value="fr">
    <option value="fr">法国</option>
    <option value="de">德国</option>
    <option value="it">意大利</option>
  </me-select>
</div>
```

## 高级功能

### 自定义搜索

```javascript
const searchableSelect = document.querySelector("me-select[searchable]");
if (searchableSelect) {
  searchableSelect.addEventListener("search", (e) => {
    const searchTerm = e.detail.term;

    // 根据搜索词筛选选项
    filterOptions(searchableSelect, searchTerm);
  });
}

function filterOptions(select, term) {
  const options = select.querySelectorAll("option");
  options.forEach((option) => {
    const matches = option.textContent
      .toLowerCase()
      .includes(term.toLowerCase());
    option.style.display = matches ? "block" : "none";
  });
}
```

### 动态加载选项

```javascript
const select = document.querySelector("me-select");
if (select) {
  // 模拟数据加载
  loadDynamicOptions(select);
}

async function loadDynamicOptions(select) {
  try {
    // 模拟 API 调用
    const response = await fetch("/api/countries");
    const countries = await response.json();

    // 清除现有选项
    select.innerHTML = '<option value="">选择国家</option>';

    // 添加新选项
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.code;
      option.textContent = country.name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("加载选项出错:", error);
  }
}
```

## 无障碍性

MelserSelect 组件包括：

- **键盘导航**：方向键、Enter、Escape 可用
- **屏幕阅读器公告**：选择更改会被宣布
- **焦点管理**：清晰的视觉指示器
- **ARIA 属性**：aria-expanded, aria-controls, aria-activedescendant
- **无障碍分组**：optgroup 被正确宣布

## 最佳实践

1. **始终包含占位符** 针对无选择的情况
2. **使用逻辑分组** 组织相关选项
3. **启用搜索** 当选项较多时
4. **包含验证** 针对必填字段
5. **提供即时反馈** 给用户
6. **考虑顺序** 按相关性排列选项
7. **使用 clearable** 在可能需要清除的情况下
