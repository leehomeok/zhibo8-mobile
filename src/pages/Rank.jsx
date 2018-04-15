import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import { classNames } from 'classnames';
const Item = Flex.Item
class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      teamList: [],
      statuslist: [],
      league: 'NBA',
      isLoading: true,
      leagueList: [
        {id:1, cname:"NBA", name: "NBA", top: 0, bottom: 0, active: true},  
        {id:8, cname:"英超",name:"yingchao",top:4,bottom:3},
        {id:7, cname:"西甲",name:"xijia",top:4,bottom:3},
        {id:13,cname:"意甲",name:"yijia",top:3,bottom:3},
        {id:9, cname:"德甲",name:"dejia",top:4,bottom:3},
        {id:16,cname:"法甲",name:"fajia",top:3,bottom:3},
        {id:51,cname:"中超",name:"zhongchao",top:3,bottom:2},
      ]
    };
  }
  componentDidMount() {
    this.getData(this.state.league)
  }

  getData (league) {
    let url = league === 'NBA' ?
    `https://dc.qiumibao.com/shuju/public/index.php?_url=/data/index&league=${league}&tab=排行&type=排行&year=[year]&random=${Math.random}` :
    `https://dc.qiumibao.com/shuju/public/index.php?_url=/data/index&league=${league}&tab=积分榜&year=[year]`
    fetch(url,{
      method: 'GET'
    }).then((res)=>{
      return res.text()
    }).then((res)=>{
      let result = JSON.parse(res)
      // console.log(result)
      if (league=== 'NBA') {
        let {data, items, show_img, redirect} = result
        this.setState({
          dataList: data,
          league: league,
          isLoading: false
        })
      } else {
        let {data, items, show_img, redirect, color} = result
        this.setState({
          dataList: data,
          league: league,
          isLoading: false
        })
      }
    })
  }
  handleLeagueChange(item) {
    let id = item.id
    let league = ''
    let leagueList = [...this.state.leagueList]
    leagueList.forEach(item => {
      if (item.active) {
        item.active = false
      }
      if (item.id === id) {
        item.active = true
        league = item.cname
      }
    })
    this.setState({
      leagueList: leagueList
    })
    this.getData(league, leagueList)
  }
  goTeamDetail() {

  }
  renderNBA (dataList) {
    let tb= dataList.map(data => {
      return (
        <table  className="rank-table"
          style={{ width:'100%' }}>
          <tr>
            <th>{data.title}排名</th>
            <th>球队</th>
            <th>胜</th>
            <th>负</th>
            <th>胜率</th>
            <th>胜差</th>
            <th>近况</th>
          </tr>
          {
            data.list.map(team => {
              return (
                <tr>
                  <td className="center">{team.排名}</td>
                  <td className="t_name">
                    <a className="team-link" onClick={ this.goTeamDetail.bind(this, team) }>
                      <img className="rank-team-logo fl" width="24" height="24" src={team.球队图标.replace('http://duihui.qiumibao.com', '../src/assets/images')} />
                      <span className="rank-team">{team.球队}</span>
                    </a>
                  </td>
                  <td>{team.胜}</td>
                  <td>{team.负}</td>
                  <td>{team.胜率}</td>
                  <td>{team.胜差}</td>
                  <td><span>{team.近况}</span></td>
                </tr>
              )
            })
          }
        </table>
      )
    })
    return tb
  }
  renderFootball (list) {
    let tb= 
      <table  className="rank-table"   style={{ width:'100%' }}>
        <tr>
          <th>排名</th>
          <th>球队</th>
          <th>场次</th>
          <th>胜</th>
          <th>平</th>
          <th>负</th>
          <th>进/失球</th>
          <th>积分</th>
        </tr>
        {
          list.map(team => {
            return (
              <tr>
                <td className="center">{team.排名}</td>
                <td className="t_name">
                  <a className="team-link" onClick={ this.goTeamDetail.bind(this, team) }>
                    <img className="rank-team-logo fl" width="24" height="24" src={team.球队图标.replace('http://duihui.qiumibao.com', '../src/assets/images')} />
                    <span className="rank-team">{team.球队}</span>
                  </a>
                </td>
                <td>{team.场次}</td>
                <td>{team.胜}</td>
                <td>{team.平}</td>
                <td>{team.负}</td>
                <td>{team['进/失球']}</td>
                <td><span>{team.积分}</span></td>
              </tr>
            )
          })
        }
      </table>
    return tb
  }
  renderLeagueTab (leagueList) {
  }


  render() {
    return (
      <div>
        <Flex style={{ padding: '5px'}}>
          {
            this.state.leagueList.map(item => {
              return (
                <Item style={{ color: item.active ? '#26a2ff' : '#333' }} 
                  onClick={this.handleLeagueChange.bind(this, item)}>
                  {item.cname}
                </Item>
              )
            })
          }
        </Flex>        
        {
          this.state.league === 'NBA' ? 
            this.renderNBA(this.state.dataList) :
            this.renderFootball(this.state.dataList)
        }
      </div>
    )
  }
}
export default Rank;