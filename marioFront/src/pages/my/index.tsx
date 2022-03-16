import { Component } from 'react'
import {Text, View} from '@tarojs/components'
import './index.less'

export default class My extends Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      count:1,
    }
  }

  Add = ()=>{
    console.log(this.state)
    this.setState({
      count:this.state.count+1
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
        <Text>
          我的
        </Text>
      </View>
    )
  }
}
