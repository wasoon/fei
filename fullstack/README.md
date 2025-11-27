# 全栈程序员考试任务实现

本项目实现了邮件中提到的两个任务：Logger 日志系统设计和线上图书系统开发。

## 项目结构

```
src/
├── components/       #  React 组件
│   ├── BookForm.tsx  # 书籍表单组件
│   ├── BookItem.tsx  # 书籍项组件
│   └── Empty.tsx     # 空状态组件
├── lib/              # 工具库
│   └── logger/       # Logger 日志系统
│       ├── outputs/  # 日志输出器
│       ├── Logger.ts # Logger 核心类
│       ├── index.ts  # Logger 入口和文档
│       └── types.ts  # 类型定义
├── pages/            # 页面组件
│   ├── Home.tsx      # 图书系统主页
│   └── EmailContentPage.tsx # 邮件内容页面
├── store/            # Redux 状态管理
│   ├── actions.ts    # Action 创建函数
│   ├── index.ts      # Store 配置
│   ├── reducer.ts    # Reducer 函数
│   └── types.ts      # 类型定义
├── App.tsx           # 应用入口组件
├── main.tsx          # 应用启动文件
└── index.css         # 全局样式
```

## 任务一：Logger 日志系统

### 功能特点
- 支持四种日志等级：verbose、info、warning、error
- 提供统一的日志记录接口
- 采用可扩展的架构设计，支持多种输出方式
- 当前实现了Console输出和模拟File输出
- 支持日志等级过滤

### 使用示例
```typescript
import { logger, Logger, LogLevel, ConsoleOutput, FileOutput } from '@/lib/logger';

// 使用默认Logger实例
logger.info('应用启动成功');
logger.error('发生错误', { errorCode: 500 });

// 创建自定义Logger实例
const customLogger = new Logger({
  minLevel: LogLevel.VERBOSE,
  outputs: [new ConsoleOutput(), new FileOutput('app.log')]
});

// 记录不同等级的日志
customLogger.verbose('详细信息');
customLogger.info('一般信息');
customLogger.warning('警告信息');
customLogger.error('错误信息');
```

## 任务二：线上图书系统

### 功能特点
- 书籍列表展示（书名、价格、分类、描述）
- 新增书籍功能
- 编辑书籍功能
- 删除书籍功能
- 批量删除功能
- 按书名和价格排序功能
- 响应式设计，适配不同屏幕尺寸

### 使用方法
1. 点击"添加书籍"按钮添加新书籍
2. 点击书籍项进入编辑模式
3. 勾选复选框选择书籍，可进行批量删除
4. 使用排序按钮按书名或价格排序书籍列表

## 技术栈
- React 18+
- TypeScript
- Redux
- Tailwind CSS
- React Router

## 安装和运行

1. 安装依赖
```bash
npm install
# 或
pnpm install
```

2. 运行开发服务器
```bash
npm run dev
# 或
pnpm dev
```

3. 构建生产版本
```bash
npm run build
# 或
pnpm build
```

## 部署到 GitHub Pages

1. 构建项目
```bash
npm run build
```

2. 部署到 GitHub Pages（可使用 gh-pages 工具）
```bash
npm install -g gh-pages
gh-pages -d dist
```