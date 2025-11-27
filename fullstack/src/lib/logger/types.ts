// 日志等级枚举
export enum LogLevel {
  VERBOSE = 0,
  INFO = 1,
  WARNING = 2,
  ERROR = 3,
}

// 日志条目接口
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: any;
}

// 日志输出器接口
export interface LogOutput {
  log(entry: LogEntry): void;
}

// Logger配置接口
export interface LoggerConfig {
  minLevel: LogLevel;
  outputs: LogOutput[];
}