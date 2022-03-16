import { Component } from 'react'
import { View} from '@tarojs/components'
import './index.less'
import {AtTabBar} from "taro-ui";


export default class Index extends Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      current:1,
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
            { title: '最爱地图', text: 8 },
            { title: '最近上传' },
            { title: '最孬地图', dot: true }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}
