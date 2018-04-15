import React from 'react';
import { hashHistory } from 'react-router';
import { NavBar, Drawer, Tabs } from 'antd-mobile';
import FootTabBar from './FootTabBar';
import Home from '../pages/Home';
import Data from '../pages/Data';
import EndGame from '../pages/EndGame';
import NBA from '../pages/NBA';
import Picture from '../pages/Picture';
import Rank from '../pages/Rank';
const tabs = [
  { title: '新闻', sub: '1', url: '/home' },
  { title: '完赛', sub: '2', url: '/end-game' },
  { title: 'NBA', sub: '3' , url: '/nba'},
  { title: '积分榜', sub: '4', url: '/rank' },
  { title: '图集', sub: '5', url: '/pic' }
];

const styles = { 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  height: '150px', 
  backgroundColor: '#fff'
}
let bodyHeight = document.body.clientHeight
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '直播吧',
      open: false,
    };
  }
  render() {
    // console.log(this.props.route, this.props.params, this.props.routeParams);
    return (
      <div className="container">
        <NavBar
          className="zhibo-style" 
          mode="light"
          onLeftClick={() => hashHistory.goBack()}
          rightContent={<b onClick={() => this.setState({ open: true })}>...</b>}
        >
          <span style={{position: "relative", display: "inlineBlock"}}>{this.state.title}
            <b style={{position:"absolute", bottom:2}}>⑧</b>
          </span>
        </NavBar>

        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { 
            hashHistory.push(tabs[index].url)
            // console.log('onChange', index, tab); 
          }}
          onTabClick={(tab, index) => { 
            //console.log('onTabClick', index, tab); 
          }}
        >
        </Tabs>

        <div style={{ position: 'relative',height:(bodyHeight - 90)+'px' }}>
          <Drawer
            position="left"
            sidebar='side content'
            sidebarStyle={{ backgroundColor: '#fff' }}
            open={this.state.open}
            onOpenChange={() => this.setState({ open: !this.state.open })}
          >
            {this.props && this.props.children && React.cloneElement(this.props.children, {
              changeTitle: title => this.setState({ title })
            }) || 'no content'}
          </Drawer>
        </div>

      </div>
    );
  }
}
