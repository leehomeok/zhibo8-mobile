import React, {Component} from 'react'
import {Link,hashHistory} from 'react-router';
import { TabBar } from 'antd-mobile';
import Home from '../pages/Home'
import Data from '../pages/Data';
import News from '../pages/News';
import Video from '../pages/Video';
const homeIcon ={
  width: '22px',
  height: '22px',
  background: 'url(../src/assets/images/home.svg) center center /  21px 21px no-repeat' 
}

class FootTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      hidden: false,  // Foottab是否隐藏
      fullScreen: true,
    };
  }

  renderContent(pageText) {
  }
  
  handleOnPress (state, route) {
    this.setState({
      selectedTab: state,
    });
    hashHistory.push(route)
  }

  render() {
    return (
        <div className="foot">
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="首页"
              key="Home"
              icon={<div style={homeIcon}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(../src/assets/images/home_active.svg) center center /  21px 21px no-repeat' }}
              />
              }
              selected={this.state.selectedTab === 0}
              badge={1}
              onPress={() => {
                this.handleOnPress(0, '/')
              }}
              data-seed="logId">
              {this.renderContent('Home')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(../src/assets/images/video.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(../src/assets/images/video_active.svg) center center /  21px 21px no-repeat' }}
                />
              }
              title="视频"
              key="Video"
              badge={'new'}
              selected={this.state.selectedTab === 1}
              onPress={() => {
                this.handleOnPress(1, '/video')
              }}
              data-seed="logId1"
            >
              {this.renderContent('Video')}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(../src/assets/images/news.svg) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(../src/assets/images/news_active.svg) center center /  21px 21px no-repeat' }}
                />
              }
              title="新闻"
              key="News"
              dot
              selected={this.state.selectedTab === 2}
              onPress={() => {
                this.handleOnPress(2, '/news')
              }}
            >
              {this.renderContent('News')}
            </TabBar.Item>
            <TabBar.Item
              icon={{ uri: '../src/assets/images/data.svg' }}
              selectedIcon={{ uri: '../src/assets/images/data_active.svg' }}
              title="数据"
              key="Data"
              selected={this.state.selectedTab === 3}
              onPress={() => {
                this.handleOnPress(3, '/data')
              }}
            >
              {this.renderContent('Data')}
            </TabBar.Item>
          </TabBar>
        </div>
    );
  }
}

export default FootTabBar;