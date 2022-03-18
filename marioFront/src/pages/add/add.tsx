import { Component } from 'react'
import { View} from '@tarojs/components'
import './index.less'
import {AtButton, AtForm, AtInput, AtTextarea} from "taro-ui";

export default class Add extends Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
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
    console.log("???????????????")
  }

  onReset = async () => {
    console.log("reset")
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className={'add_form'}>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='value'
            title='地图名'
            type='text'
            placeholder='单行文本'
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
          <AtInput
            name='value'
            title='地图ID'
            type='text'
            placeholder='单行文本'
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />

          <AtTextarea
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            maxLength={200}
            placeholder='这图好在哪？'
          />
          <AtButton className={'my-button add-button'} type='primary' size='small' formType='submit'>添加</AtButton>
          <AtButton  className={'my-button'} size='small' formType='reset'>重置</AtButton>
        </AtForm>
      </View>
    )
  }
}
