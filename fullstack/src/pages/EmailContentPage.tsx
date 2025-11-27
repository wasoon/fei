import React from 'react';
import { X, Star, Cloud, Share2, Users, Download, Printer, MoreHorizontal } from 'lucide-react';

const EmailContentPage: React.FC = () => {
  // 邮件内容数据
  const emailData = {
    title: '全栈程序员考试任务',
    content: {
      introduction: `综合任务内容（整体预期耗时约 8 小时）
本考试由以下两项主要任务组成:
1. TypeScript 日志系统架构设计（Logger）
2. 单页面线上图书系统开发（Redux）
你需完成所有内容。`,
      
      task1: {
        title: '任务一：设计并实现 Logger 日志系统（TypeScript）',
        description: '请为一套 TypeScript Web 应用设计一个 Logger（日志记录器）类。',
        functionalRequirements: [
          '提供统一接口用于写入日志',
          '支持四种日志等级：verbose、info、warning、error',
          '假设只会记录字符串或可序列化为字符串的数据',
          '日志现阶段输出至 console',
          '架构需具备 未来扩展至写入文件 的可能性'
        ],
        developmentRequirements: [
          '部分实现即可',
          '无需完整文件 I/O，可使用模拟方法，例如：',
          'function NativeFileWriteSync(filePath, buffer) {',
          '  console.log(\'File IO ${filePath}] ${buffer}\')',
          '}',
          '避免第三方库',
          '需展示你设计 class 模块的能力，而不是包装现成 logger 工具。',
          '代码结构需可维护',
          '必须分文件',
          '不可将所有内容写在同一个文件中',
          '提供文档说明',
          '包括：',
          'logger 使用示例',
          '设计理念',
          '如何支持未来扩展'
        ]
      },
      
      task2: {
        title: '任务二：开发线上图书系统（单页面应用 SPA）',
        description: '某书店老板希望上线网上卖书平台，你需开发一个前端应用页面。',
        mainPageRequirements: [
          '书名',
          '价格',
          '分类',
          '删除按钮',
          '顶部必须有 添加书籍 按钮'
        ],
        functionalRequirements: [
          {
            title: '新增书籍 Popup',
            details: [
              '需要弹窗输入:',
              '书名',
              '价格',
              '分类',
              '描述',
              '提交后需加入书籍列表。'
            ]
          },
          {
            title: '点击书籍 → 编辑书籍 Popup',
            details: [
              '弹窗需允许:',
              '修改书名、价格、分类、描述',
              '保存后更新主页面',
              '提供删除按钮以移除该书籍'
            ]
          },
          {
            title: '无需后端',
            details: [
              '所有书籍数据保存在 前端数组 中。'
            ]
          }
        ],
        bonusItems: [
          'checkbox 批量删除',
          'Sort By 排序功能',
          '部署至 GitHub Pages',
          '任何能展示额外实力的功能'
        ],
        technicalRequirements: [
          '必须使用 TypeScript',
          '必须使用 Redux',
          {
            title: '评分重点:',
            details: [
              '功能完整性',
              '代码结构',
              '可维护性',
              '效率'
            ]
          }
        ],
        submission: {
          email: 'mdn.fushan.china.office@gmail.com',
          requirements: [
            'GitHub 代码仓库链接',
            '完成全部任务的总耗时'
          ]
        }
      }
    }
  };

  // 渲染列表项
  const renderListItems = (items: string[]) => {
    return items.map((item, index) => {
      // 检查是否是代码块的开始或结束
      if (item.includes('function') || item.includes('{') || item.includes('}')) {
        return (
          <div 
            key={index} 
            className="bg-gray-100 px-4 py-2 my-2 rounded font-mono text-sm whitespace-pre"
          >
            {item}
          </div>
        );
      }
      return (
        <li key={index} className="mb-1.5 list-disc ml-6">
          {item}
        </li>
      );
    });
  };

  // 渲染带标题的功能需求
  const renderFeatureRequirement = (req: { title: string; details: string[] }, index: number) => {
    return (
      <div key={index} className="mb-4">
        <p className="font-medium">{req.title}</p>
        <ul className="mt-2">
          {req.details.map((detail, detailIndex) => (
            <li key={detailIndex} className="mb-1.5 list-disc ml-6">
              {detail}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // 处理关闭按钮点击
  const handleClose = () => {
    // 在实际应用中，这里会导航回邮箱列表页面
    console.log('关闭邮件');
  };

  // 处理操作按钮点击
  const handleAction = (action: string) => {
    console.log(`执行操作: ${action}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-[90%] max-w-[800px] max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col">
        {/* 邮件头部 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-800 truncate max-w-[40%]">
            {emailData.title}
          </h1>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleAction('收藏')} 
              className="p-2 rounded hover:bg-gray-100 text-gray-600"
              aria-label="收藏"
            >
              <Star size={18} />
            </button>
            
            <button 
              onClick={() => handleAction('保存到云盘')} 
              className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50 text-gray-600 flex items-center gap-1.5"
            >
              <Cloud size={16} />
              <span>保存到云盘</span>
            </button>
            
            <button 
              onClick={() => handleAction('分享')} 
              className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50 text-gray-600 flex items-center gap-1.5"
            >
              <Share2 size={16} />
              <span>分享</span>
            </button>
            
            <button 
              onClick={() => handleAction('协作')} 
              className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50 text-gray-600 flex items-center gap-1.5"
            >
              <Users size={16} />
              <span>协作</span>
            </button>
            
            <button 
              onClick={() => handleAction('下载')} 
              className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50 text-gray-600 flex items-center gap-1.5"
            >
              <Download size={16} />
              <span>下载</span>
            </button>
            
            <button 
              onClick={() => handleAction('打印')} 
              className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50 text-gray-600 flex items-center gap-1.5"
            >
              <Printer size={16} />
              <span>打印</span>
            </button>
            
            <button 
              onClick={() => handleAction('更多')} 
              className="p-2 rounded hover:bg-gray-100 text-gray-600"
              aria-label="更多选项"
            >
              <MoreHorizontal size={18} />
            </button>
            
            <button 
              onClick={handleClose} 
              className="p-2 rounded hover:bg-gray-100 text-gray-600 ml-1"
              aria-label="关闭"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        {/* 邮件正文 */}
        <div className="flex-1 p-5 overflow-y-auto text-gray-800">
          <div className="space-y-4">
            {/* 介绍部分 */}
            <div className="whitespace-pre-line">
              {emailData.content.introduction}
            </div>
            
            {/* 任务一 */}
            <div>
              <h2 className="text-lg font-semibold mb-2">{emailData.content.task1.title}</h2>
              <p className="mb-3">{emailData.content.task1.description}</p>
              
              <p className="font-medium mt-4 mb-2">功能要求：</p>
              <ul>
                {renderListItems(emailData.content.task1.functionalRequirements)}
              </ul>
              
              <p className="font-medium mt-4 mb-2">开发要求：</p>
              <ul>
                {renderListItems(emailData.content.task1.developmentRequirements)}
              </ul>
            </div>
            
            {/* 任务二 */}
            <div>
              <h2 className="text-lg font-semibold mb-2">{emailData.content.task2.title}</h2>
              <p className="mb-3">{emailData.content.task2.description}</p>
              
              <p className="font-medium mt-4 mb-2">主页面需显示：</p>
              <ul>
                {renderListItems(emailData.content.task2.mainPageRequirements)}
              </ul>
              
              <p className="font-medium mt-4 mb-2">功能要求：</p>
              {emailData.content.task2.functionalRequirements.map(renderFeatureRequirement)}
              
              <p className="font-medium mt-4 mb-2">加分项（可选）：</p>
              <ul>
                {renderListItems(emailData.content.task2.bonusItems)}
              </ul>
              
              <p className="font-medium mt-4 mb-2">技术要求：</p>
              <ul>
                {renderListItems(
                  emailData.content.task2.technicalRequirements
                    .filter(req => typeof req === 'string') as string[]
                )}
                
                {/* 评分重点 */}
                {emailData.content.task2.technicalRequirements
                  .filter(req => typeof req === 'object')
                  .map((req, index) => {
                    const objReq = req as { title: string; details: string[] };
                    return (
                      <li key={index} className="mb-1.5 list-disc ml-6">
                        <p className="font-medium">{objReq.title}</p>
                        <ul className="mt-2">
                          {objReq.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="mb-1.5 list-disc ml-6">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
              </ul>
              
              <p className="font-medium mt-4 mb-2">提交方式</p>
              <p className="mb-2">请将以下内容电邮至:</p>
              <p className="text-blue-600 mb-2">{emailData.content.task2.submission.email}</p>
              <p className="mb-2">需提交:</p>
              <ul>
                {renderListItems(emailData.content.task2.submission.requirements)}
              </ul>
            </div>
            
            {/* 页脚信息 */}
            <div className="text-sm text-gray-500 mt-8">
              <p>第 3 页/共 3 页 937 个字</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailContentPage;