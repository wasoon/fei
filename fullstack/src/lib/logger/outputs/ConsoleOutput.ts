import { LogOutput, LogEntry, LogLevel } from '../types';

/**
 * Console输出器 - 将日志输出到浏览器控制台
 */
export class ConsoleOutput implements LogOutput {
  /**
   * 根据日志等级获取对应的控制台方法
   * @param level 日志等级
   * @returns 控制台方法
   */
  private getConsoleMethod(level: LogLevel): (...args: any[]) => void {
    switch (level) {
      case LogLevel.VERBOSE:
        return console.log;
      case LogLevel.INFO:
        return console.info;
      case LogLevel.WARNING:
        return console.warn;
      case LogLevel.ERROR:
        return console.error;
      default:
        return console.log;
    }
  }

  /**
   * 格式化日志条目
   * @param entry 日志条目
   * @returns 格式化后的日志字符串
   */
  private formatLogEntry(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const levelName = LogLevel[entry.level];
    return `[${timestamp}] [${levelName}] ${entry.message}`;
  }

  /**
   * 输出日志到控制台
   * @param entry 日志条目
   */
  public log(entry: LogEntry): void {
    const consoleMethod = this.getConsoleMethod(entry.level);
    const formattedMessage = this.formatLogEntry(entry);
    
    if (entry.data) {
      consoleMethod(formattedMessage, entry.data);
    } else {
      consoleMethod(formattedMessage);
    }
  }
}