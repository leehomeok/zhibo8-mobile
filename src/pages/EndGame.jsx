import React, { Component } from 'react';
import { ListView,Flex } from 'antd-mobile';
import {getScrollTop, getScrollHeight, getWindowHeight} from '../utils'
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
const Item = Flex.Item
const suffix = '.png'
class EndGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      date: new Date().format('yyyy-MM-dd'),
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
    };
  }

  componentDidMount() {
    let amContent = document.querySelectorAll('.am-drawer-content')[0]

    this.getData();
    amContent.onscroll = () => {
      let scrollHeight = amContent.scrollHeight
      let scrollTop = amContent.scrollTop
      let clientHeight = amContent.clientHeight
      if(scrollHeight - scrollTop == clientHeight){
        this.loadMore()
      }
    }
  }

  getData () {
    fetch('https://m.zhibo8.cc/json/record/'+ this.state.date +'.htm',{
      method: 'GET'
    }).then((res)=>{
      return res.text()
    }).then((res)=>{
      let result = JSON.parse(res)
      let {date,list} = result
      let oldData = this.state.dataList

      this.setState({
        dataList: oldData.concat(result),
        isLoading: false
      })
    })
  }

  /* 
  // for Redux
  componentWillReceiveProps(nextProps) {
     if (nextProps.dataSource !== this.props.dataSource) {
       this.setState({
         dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
       });
     }
   }
  */

  loadMore = () => {
    if (this.state.isLoading) {
      return;
    }
    console.log('reach end');
    let yestoday = +new Date(this.state.date) - 3600*24*1000
    this.setState({
      isLoading: true,
      date: new Date(yestoday).format('yyyy-MM-dd')
    });
    this.getData()
  }

  render() {
     return (
      <ul>
        {
          this.state.dataList.map(item => {
            return (
              <li>
                <p>{item.date_str}</p>
                {
                  item.list.map(it => {
                    return (
                      <Flex>
                        <Item className="center" style={{flex:2}}>
                          <img className="team-logo-sm" src={it.type==='basketball' ? `../src/assets/images/nba/${it.home_logo}.png` : `../src/assets/images/zuqiu/${it.home_logo}.png`} />
                          <p>{it.home_team}</p>
                        </Item>
                        <Item className="center" style={{flex:5}}>
                          <p className="font-sm">
                            {it.news_title}
                          </p>
                        </Item>
                        <Item className="center" style={{flex:2}}>
                          <img className="team-logo-sm" src={it.type==='basketball' ? `../src/assets/images/nba/${it.visit_logo}.png` : `../src/assets/images/zuqiu/${it.visit_logo}.png`} />
                          <p>{it.visit_team}</p>
                        </Item>
                      </Flex>
                    )
                  })
                }
              </li>
            )
          })
        }
      </ul>
    );
  }
}


export default EndGame;