import { Component } from 'react'
import { View} from '@tarojs/components'
import './index.less'
import {AtList, AtListItem, AtTabBar} from "taro-ui";

export default class My extends Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      current:0,
      mapList:[1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10],
    }
  }

  handleClick = (value)=>{
    console.log(this.state)
    this.setState({
      current:value
    })
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <AtTabBar
          backgroundColor='#F6C900'
          tabList={[
            { title: '我点赞的', text: 8 },
            { title: '我的上传' }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />

        <AtList>
          {this.state.mapList.map((item,index)=>{
            return (
              <AtListItem
                className={'mapItem'}
                key={index}
                title={item+''}
                arrow='right'
                thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
              />
            )
          })}
        </AtList>
      </View>
    )
  }
}
