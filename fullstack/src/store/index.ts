import { createStore } from 'redux';
import { bookReducer } from './reducer';

// 创建Redux Store
export const store = createStore(
  bookReducer,
  // 启用Redux DevTools扩展
  // @ts-expect-error - Redux DevTools扩展在某些环境中可能不存在
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 导出RootState类型
export type RootState = ReturnType<typeof store.getState>;
// 导出AppDispatch类型
export type AppDispatch = typeof store.dispatch;