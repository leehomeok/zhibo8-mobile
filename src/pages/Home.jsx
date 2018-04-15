import React, { Component } from 'react';
import {  Icon,Carousel, WhiteSpace, WingBlank, Flex} from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import { classNames } from 'classnames';
let Item = Flex.Item
class Home extends Component {
  state = {
    imgHeight: 176,
    slideIndex: 0,
    data: []
  }
     
  componentDidMount () {
    this.getBanner()
    this.getNews()
  }
  componentWillReceiveProps (nextProps) {
    // console.log(nextProps)
    // this.forceUpdate()
  }
  getBanner () {
    fetch('http://localhost:3000/getImg', {
      method: 'GET'
    }).then((res)=>{
      return res.text()
    }).then((res)=>{
      // console.log(res)
      let result = JSON.parse(res)
      if (result.code==200) {
        this.setState({
          data: result.data
        })
      }
    })
  }
  getNews() {
    this.props.actions.get_news()
  }
  renderSituation (item) {
    if (item.situation) {
      return item.situation
    } else {
      return <img className="team-logo-sm" src="../src/assets/images/clock.png" />
    }
  }

  renderNews (news) {
    let data = []
    news.forEach(item => {
      data.push(
        <Flex className="home-flex-item">
          <Item className="center">
           {item.sTime}
          </Item>
          <Item className="center">
            {item.hostLogo ?<img className="team-logo-sm" src={item.hostLogo ? item.hostLogo.replace('//duihui.qiumibao.com', '../src/assets/images') : ''} />: '' }
            <p className="font-sm">{item.hostTeam}</p> 
          </Item>
          <Item className="font-sm center">
            {item.score}
          </Item>
          <Item className="center">
           {item.guestLogo? <img className="team-logo-sm" src={item.guestLogo.replace('//duihui.qiumibao.com', '../src/assets/images') || ''} /> :''} 
            <p className="font-sm">{item.guestTeam}</p> 
          </Item>
          <Item className="center">
            {this.renderSituation(item)}
          </Item>
        </Flex>
      )
    })
    return data
  }

  render() {
    let { rank, actions  } = this.props;
    let { news } = rank;
    // console.log(news)
    return (
      <div>
        <Carousel
          autoplay={true}
          autoplayInterval={3000}
          infinite={true}
          selectedIndex={this.slideIndex}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({slideIndex: index})}
        >
          { this.state.data.map((val,index) => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val.src}
                alt={val.title}
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
              <p>{val.title}</p>
            </a>
          ))}
        </Carousel>

        <div>
          {
            (news && news.length) ? this.renderNews(news) : ''
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rank: state.rank
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
