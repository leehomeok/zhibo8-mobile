import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
const Item = Flex.Item
class NBA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      teamList: [],
      statuslist: [],
      title: [],
      isLoading: true
    };
  }
  componentDidMount() {
    this.getData()
  }

  getData () {
    fetch('http://localhost:3000/NBA',{
      method: 'GET'
    }).then((res)=>{
      return res.text()
    }).then((res)=>{
      let result = JSON.parse(res)      
      let {title, teammatch, statuslist, list} = result
      // console.log(result)
      this.setState({
        dataList: list,
        teamList: teammatch,
        title: title,
        statuslist: statuslist,
        isLoading: false
      })
    })
  }
  

  render() {
    return (
      <ul style={{
        backgroundColor: '#fff',
        marginTop: '-14px'
      }}>
        {
          this.state.dataList.map(day => {
            return (
              <li>
                <p>{day.title}</p>
                {day.tr.map(item => {
                  return (
                    <a href={item.m_link1url} className="unlink">
                      <Flex>
                        <Item className="center" >
                          {new Date(item.time).format('hh:mm')}
                        </Item>
                        <Item className="center" >
                          <img src={item.player1logo} /> 
                          <p>{item.player1}</p>
                        </Item>
                        <Item className="center" >
                          {item.score}
                        </Item>
                        <Item className="center" >
                          <img src={item.player2logo} /> 
                          <p>{item.player2}</p>
                        </Item>
                      </Flex>
                    </a>
                  )
                })}
              </li>
            )
          })
        }
      </ul>
    )
  }
}
export default NBA;