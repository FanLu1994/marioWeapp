import { Component } from 'react'
import { View} from '@tarojs/components'
import './index.less'
import {AtButton, AtForm, AtInput, AtTextarea, AtToast} from "taro-ui";
import * as api from "../../http/api"

export default class Add extends Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      value:'',
      mapId:'',
      comment:'',
      toast:'',
      toastShow:false
    }
  }

  handleClick = (value)=>{
    console.log(this.state)
    this.setState({
      current:value
    })
  }

  onToastClose(){
    this.setState({
      toast:'',
      toastShow:false,
    })
  }


  handleMapIdChange = (value)=>{
    this.setState({
      mapId:value,
    })
    return value
  }

  handleCommentChange = (value,event)=> {
    console.log(value)
    this.setState({
      comment:event.detail.value
    })
  }


  onSubmit = ()=>{
    console.log(this.state.mapId)
    console.log(this.state.comment)
    if(this.state.mapId==='' || this.state.comment===''){
      this.setState({
          toast:'请先填写完整！',
          toastShow:true,
      })
      return
    }

    api.addMap({
      map_id:this.state.mapId,
      comment:this.state.comment
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
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
        <AtToast isOpened={this.state.toastShow}
                 text={this.state.toast}
                 onClose={this.onToastClose.bind(this)}
                 icon="{icon}"/>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='value'
            title='地图ID'
            type='text'
            value={this.state.mapId}
            onChange={this.handleMapIdChange.bind(this)}
          />

          <AtTextarea
            value={this.state.comment}
            onChange={this.handleCommentChange.bind(this)}
            maxLength={200}
            focus={true}
            placeholder='这图好在哪？'
          />
          <AtButton className={'my-button add-button'} type='primary' size='small' formType='submit'>添加</AtButton>
          <AtButton  className={'my-button'} size='small' formType='reset'>重置</AtButton>
        </AtForm>
      </View>
    )
  }
}
