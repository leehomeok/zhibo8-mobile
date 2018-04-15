import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Flex , List} from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
const Item = Flex.Item
const Litem = List.Item;
const Brief = Litem.Brief;
class PicItem extends Component {
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
    console.log(this.props.params)
    let url= `http://localhost:3000/picture/${this.props.params.id}`
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

  render() {
    let {rank} = this.props
    let {imgTitle} = rank
    return (
      <div style={{
				backgroundColor:'#ccc'
			}}>
        <h2 className="center pic-title">{imgTitle}</h2>
        <div>
          {
            this.state.dataList.map((item,index) => {
              return (
                <div className="pic-list">
                  <img src={item.src} />
                  <p><span>{`${index + 1}`}</span>{`/${this.state.dataList.length}`}</p>
                </div>
              )
            })
          }
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PicItem);