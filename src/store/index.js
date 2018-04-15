// 引入createStore创建store，引入applyMiddleware 来使用中间件
import {createStore,combineReducers, applyMiddleware, compose} from 'redux'
import {createLogger} from 'redux-logger'
// 安装redux-devtools-extension的可视化工具。
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from '../reducers'
import thunk from 'redux-thunk';

// 使用日志打印方法， collapsed让action折叠，看着舒服。
const loggerMiddleware = createLogger({
    collapsed: true
});
let store =createStore(
    reducer,
		applyMiddleware(thunk),
		composeWithDevTools()
);
/*
function configureStore(history, initialState) {
  const store = createStore(
    reducer,
    initialState,
    compose(
			applyMiddleware(thunk, ...debugware),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
*/

export default store;

