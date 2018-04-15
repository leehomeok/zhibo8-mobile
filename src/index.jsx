import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
//import store from './store';

import App from './components/App';
import Stage1 from './components/Stage1';
import Stage2 from './components/Stage2';
import Stage3 from './components/Stage3';
import Video from './pages/Video';
import Home from './pages/Home';
import Data from './pages/Data';
import News from './pages/News';
import EndGame from './pages/EndGame';
import NBA from './pages/NBA';
import Picture from './pages/Picture';
import PicItem from './pages/PicItem'
import Rank from './pages/Rank';
import ListView from './pages/ListView';
import FootTabBar from './components/FootTabBar';
import './index.less';

const store = createStore(reducer, applyMiddleware(thunk));

Date.prototype.format = function(fmt){ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="s1" component={Stage1} />
        <Route path="s2" component={Stage2} />
        <Route path="s3" component={Stage3} />

        <Route path="home" component={Home} />
        <Route path="end-game" component={EndGame} />
        <Route path="nba" component={NBA} />
        <Route path="rank" component={Rank} />
        <Route path="pic" component={Picture} />
        <Route path="pic-item/:id" component={PicItem} />
      </Route>

      <Route path="/data" component={Data} />
      <Route path="/news" component={News} />
      <Route path="/video" component={Video} />
      <Route path="/list" component={ListView} />
    </Router>
</Provider>
, document.getElementById('example'));