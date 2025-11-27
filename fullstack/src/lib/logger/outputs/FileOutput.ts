import { LogOutput, LogEntry, LogLevel } from '../types';

/**
 * 文件输出器 - 模拟将日志写入文件
 * 注意：在浏览器环境中实际无法直接写入文件，这里使用模拟方法
 */
export class FileOutput implements LogOutput {
  private filePath: string;

  /**
   * 构造函数
   * @param filePath 文件路径
   */
  constructor(filePath: string = 'app.log') {
    this.filePath = filePath;
  }

  /**
   * 模拟文件写入方法
   * @param filePath 文件路径
   * @param buffer 要写入的数据
   */
  private nativeFileWriteSync(filePath: string, buffer: string): void {
    // 在实际环境中，这会是真正的文件I/O操作
    // 目前在浏览器环境中，我们只能模拟这个行为
    console.log(`[File IO] ${filePath}: ${buffer}`);
  }

  /**
   * 格式化日志条目为文件格式
   * @param entry 日志条目
   * @returns 格式化后的日志字符串
   */
  private formatLogEntryForFile(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const levelName = LogLevel[entry.level]; // 使用LogLevel枚举的反向映射获取等级名称
    
    let logLine = `[${timestamp}] [${levelName}] ${entry.message}`;
    
    // 如果有附加数据，将其序列化为JSON添加到日志行
    if (entry.data) {
      try {
        logLine += ` - ${JSON.stringify(entry.data)}`;
      } catch (error) {
        logLine += ` - [无法序列化数据: ${error.message}]`;
      }
    }
    
    return logLine;
  }

  /**
   * 输出日志到文件
   * @param entry 日志条目
   */
  public log(entry: LogEntry): void {
    const formattedLog = this.formatLogEntryForFile(entry);
    this.nativeFileWriteSync(this.filePath, formattedLog);
  }
}