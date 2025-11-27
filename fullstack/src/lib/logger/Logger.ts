import { LogLevel, LogEntry, LogOutput, LoggerConfig } from './types';
import { ConsoleOutput } from './outputs/ConsoleOutput';

/**
 * Logger类 - 提供统一的日志记录接口
 */
export class Logger {
  private config: LoggerConfig;

  /**
   * 构造函数
   * @param config Logger配置
   */
  constructor(config?: Partial<LoggerConfig>) {
    // 默认配置
    this.config = {
      minLevel: LogLevel.INFO,
      outputs: [new ConsoleOutput()],
      ...config,
    };
  }

  /**
   * 检查日志等级是否应该被记录
   * @param level 日志等级
   * @returns 是否应该记录
   */
  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.minLevel;
  }

  /**
   * 创建日志条目
   * @param level 日志等级
   * @param message 日志消息
   * @param data 附加数据
   * @returns 日志条目
   */
  private createLogEntry(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      timestamp: new Date(),
      data,
    };
  }

  /**
   * 记录日志到所有输出器
   * @param entry 日志条目
   */
  private logToOutputs(entry: LogEntry): void {
    this.config.outputs.forEach(output => {
      try {
        output.log(entry);
      } catch (error) {
        // 防止一个输出器的错误影响其他输出器
        console.error(`Failed to log to output: ${error.message}`);
      }
    });
  }

  /**
   * 记录verbose级别的日志
   * @param message 日志消息
   * @param data 附加数据
   */
  public verbose(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.VERBOSE)) {
      const entry = this.createLogEntry(LogLevel.VERBOSE, message, data);
      this.logToOutputs(entry);
    }
  }

  /**
   * 记录info级别的日志
   * @param message 日志消息
   * @param data 附加数据
   */
  public info(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      const entry = this.createLogEntry(LogLevel.INFO, message, data);
      this.logToOutputs(entry);
    }
  }

  /**
   * 记录warning级别的日志
   * @param message 日志消息
   * @param data 附加数据
   */
  public warning(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.WARNING)) {
      const entry = this.createLogEntry(LogLevel.WARNING, message, data);
      this.logToOutputs(entry);
    }
  }

  /**
   * 记录error级别的日志
   * @param message 日志消息
   * @param data 附加数据
   */
  public error(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      const entry = this.createLogEntry(LogLevel.ERROR, message, data);
      this.logToOutputs(entry);
    }
  }

  /**
   * 更新Logger配置
   * @param config 新的配置
   */
  public updateConfig(config: Partial<LoggerConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };
  }
}