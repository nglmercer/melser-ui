File Path: `file:///c:/Users/mm/Documents/WEB-SAMPLES/melser-ui/docs/zh/guide/aliases.md`
Total Lines: 121
Total Bytes: 5475
Showing lines 1 to 121
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: ---
2: title: 别名指南
3: ---
4:
5: # 别名指南
6:
7: Melser UI 使用 Design Tokens 系统，该系统通过别名（Aliases）将通用变量映射到特定组件的属性。这使得在整个应用程序中创建一致的主题变得容易。
8:
9: ## 别名系统的工作原理
10:
11: 别名系统包含三个层级：
12:
13: 1. **核心令牌 (Global Tokens)**: 基础值（例如 `#3b82f6`）。
14: 2. **语义别名 (Semantic Aliases)**: 描述用途的名称（例如 `--me-primary-color`）。
15: 3. **组件令牌 (Component Tokens)**: 特定于组件的变量（例如 `--me-button-bg`）。
16:
17: ## 常用语义别名
18:
19: 以下是最常用的全局别名，您可以覆盖它们以快速更改主题：
20:
21: ### 颜色（Colors）
22:
23: | 别名 | 默认值 | 描述 |
24: | -------------------- | ----------- | -------------------------- |
25: | `--me-primary` | `#3b82f6` | 主要操作颜色 |
26: | `--me-secondary` | `#6b7280` | 次要操作颜色 |
27: | `--me-success` | `#22c55e` | 成功状态颜色 |
28: | `--me-warning` | `#f59e0b` | 警告状态颜色 |
29: | `--me-danger` | `#ef4444` | 错误/危险状态颜色 |
30: | `--me-info` | `#3b82f6` | 信息状态颜色 |
31: | `--me-surface` | `#ffffff` | 组件背景颜色 |
32: | `--me-background` | `#f3f4f6` | 页面/应用背景颜色 |
33: | `--me-text-primary` | `#111827` | 主要文本颜色 |
34: | `--me-text-secondary`| `#6b7280` | 次要文本颜色 |
35:
36: ### 间距与布局（Spacing & Layout）
37:
38: | 别名 | 默认值 | 描述 |
39: | -------------------- | ----------- | -------------------------- |
40: | `--me-spacing-xs` | `0.25rem` | 极小间距 |
41: | `--me-spacing-sm` | `0.5rem` | 小间距 |
42: | `--me-spacing-md` | `1rem` | 中等间距 |
43: | `--me-spacing-lg` | `1.5rem` | 大间距 |
44: | `--me-spacing-xl` | `2rem` | 极大间距 |
45: | `--me-radius-sm` | `0.25rem` | 小圆角 |
46: | `--me-radius-md` | `0.375rem` | 中等圆角 |
47: | `--me-radius-lg` | `0.5rem` | 大圆角 |
48: | `--me-radius-full` | `9999px` | 全圆角（胶囊形） |
49:
50: ### 字体与排版（Typography）
51:
52: | 别名 | 默认值 | 描述 |
53: | -------------------- | ----------- | -------------------------- |
54: | `--me-font-sans` | `system-ui` | 无衬线字体栈 |
55: | `--me-font-mono` | `monospace` | 等宽字体栈 |
56: | `--me-text-xs` | `0.75rem` | 极小字号 |
57: | `--me-text-sm` | `0.875rem` | 小字号 |
58: | `--me-text-base` | `1rem` | 基础字号 |
59: | `--me-text-lg` | `1.125rem` | 大字号 |
60: | `--me-text-xl` | `1.25rem` | 加大字号 |
61:
62: ## 组件特定别名
63:
64: 每个组件都有一组特定的别名，这些别名通常继承自语义别名。
65:
66: ### 按钮 (Button)
67:
68: `css
69: :root {
70:   --me-button-padding-x: var(--me-spacing-md);
71:   --me-button-padding-y: var(--me-spacing-sm);
72:   --me-button-radius: var(--me-radius-md);
73:   --me-button-font-size: var(--me-text-sm);
74: }
75: `
76:
77: ### 输入框 (Input)
78:
79: `css
80: :root {
81:   --me-input-bg: var(--me-surface);
82:   --me-input-border: 1px solid var(--me-secondary);
83:   --me-input-radius: var(--me-radius-md);
84:   --me-input-height: 2.5rem;
85: }
86: `
87:
88: ## 自定义主题示例
89:
90: 要创建一个自定义主题（例如“深色模式”或“品牌主题”），您只需在 `:root` 或特定容器中覆盖这些别名。
91:
92: ### 全局深色主题
93:
94: `css
95: [data-theme="dark"] {
96:   --me-surface: #1f2937;
97:   --me-background: #111827;
98:   --me-text-primary: #f9fafb;
99:   --me-text-secondary: #9ca3af;
100:   --me-primary: #60a5fa; /* 较浅的蓝色以提高深色背景上的对比度 */
101: }
102: `
103:
104: ### 品牌主题
105:
106: `css
107: .brand-theme {
108:   --me-primary: #7c3aed; /* 紫色 */
109:   --me-radius-md: 0px;   /* 方形设计 */
110:   --me-font-sans: 'Inter', sans-serif;
111: }
112: `
113:
114: ## 实用工具类
115:
116: Melser UI 还提供了一些基于这些别名的实用工具类：
117:
118: - `.me-text-primary`
119: - `.me-bg-surface`
120: - `.me-p-md` (Padding medium)
121: - `.me-m-lg` (Margin large)
