import React, { Component } from 'react';
import { hashHistory,Link } from 'react-router';
import { Flex , List} from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
const Item = Flex.Item
const Litem = List.Item;
const Brief = Litem.Brief;
class Picture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      isLoading: true
    };
  }
  componentDidMount() {
    this.getData()
  }

  getData() {
    let url= 'http://localhost:3000/pictures'
    fetch(url,{
      method: 'GET'
    }).then((res)=>{
      return res.text()
    }).then((res)=>{
      let result = JSON.parse(res)
      console.log(result)
      let {data} = result
      this.setState({
        dataList: data,
        isLoading: false
      })      
    })
  }
  
  changeAndGo (title, id){

  }

  render() {

    return (
      <div>
        <p style={{
          paddingLeft: '10px'
        }}>图集</p>
        <List>
          {
            this.state.dataList.map(item => {
              return (
                <Litem
                  className="pic-item"
                  thumb={item.src}
                  multipleLine
                  onClick={ () => 
                  {
                    this.props.actions.update_title(item.title)
                    hashHistory.push(`/pic-item/${item.id}`)
                  }}
                >
                  {item.title}
                  <Brief>{item.date}</Brief>
                </Litem>
              )
            })
          }
        </List>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  rank: state.rank
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Picture);