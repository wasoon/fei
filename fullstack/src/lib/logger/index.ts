// Logger系统主入口

// 导出核心类型
export * from './types';

// 导出Logger类
export { Logger } from './Logger';

// 导出输出器
export { ConsoleOutput } from './outputs/ConsoleOutput';
export { FileOutput } from './outputs/FileOutput';

// 创建默认Logger实例，方便直接使用
import { Logger } from './Logger';
import { LogLevel } from './types';

// 默认Logger实例
export const logger = new Logger({
  minLevel: LogLevel.VERBOSE, // 修改为VERBOSE级别，以便在演示中能看到所有日志
});

/**
 * Logger使用示例
 * 
 * 1. 基本使用
 * logger.info('应用启动');
 * logger.error('发生错误', { errorCode: 500 });
 * 
 * 2. 创建自定义Logger实例
 * const customLogger = new Logger({
 *   minLevel: LogLevel.VERBOSE,
 *   outputs: [new ConsoleOutput(), new FileOutput('custom.log')]
 * });
 * 
 * 3. 记录不同等级的日志
 * logger.verbose('详细信息'); // 默认输出，因为minLevel已设置为VERBOSE
 * logger.info('一般信息');
 * logger.warning('警告信息');
 * logger.error('错误信息');
 * 
 * 4. 架构设计理念
 * - 采用组合模式，通过LogOutput接口支持多种输出方式
 * - 实现了最小知识原则，用户只需与Logger类交互
 * - 遵循开闭原则，可扩展新的输出方式而无需修改核心代码
 * - 通过配置实现灵活的日志等级控制
 * 
 * 5. 未来扩展
 * - 可以添加新的LogOutput实现，如网络输出、数据库输出等
 * - 可以增强Logger类的功能，如添加日志格式定制、条件过滤等
 * - 在Node.js环境中，可以实现真正的文件写入功能
 */