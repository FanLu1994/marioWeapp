import { Component } from 'react'
import { View} from '@tarojs/components'
import './index.less'
import {AtButton, AtForm, AtInput} from "taro-ui";
import {navigateBack} from '@tarojs/taro'

export default class Add extends Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      value:0,
    }
  }

  handleClick = (value)=>{
    console.log(this.state)
    this.setState({
      current:value
    })
  }

  handleChange = ()=>{
    console.log("change")
  }

  onSubmit = ()=>{
    console.log("submit")
  }

  onReset = async () => {
    console.log("reset")
    await navigateBack({
      delta: 1
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
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='value'
            title='文本'
            type='text'
            placeholder='单行文本'
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
          <AtButton formType='submit'>提交</AtButton>
          <AtButton formType='reset'>取消</AtButton>
        </AtForm>
      </View>
    )
  }
}
