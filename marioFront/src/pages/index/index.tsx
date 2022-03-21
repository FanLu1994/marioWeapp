import { Component } from 'react'
import { Text,View} from '@tarojs/components'
import './index.less'
import {AtFab, AtFloatLayout, AtList, AtListItem, AtTabBar} from "taro-ui";
import Add from "../add/add";
import * as api from "../../http/api"


export default class Index extends Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      current:0,
      mapList:[],
      isOpenFloatLayout:false,
      type:{
        recentUpload:0,
        like:1,
        dislike:2
      }
    }
  }

  handleClick = (value)=>{
    switch (value){
      case 0:
        this.FetchMapList(this.state.type.like)
        break
      case 1:
        this.FetchMapList(this.state.type.recentUpload)
        break
      case 2:
        this.FetchMapList(this.state.type.dislike)
        break
      default:
        break
    }
    this.setState({
      current:value
    })
  }

  handleClose = ()=>{
    console.log("close float layout")
    this.setState({
      isOpenFloatLayout:false,
    })
  }

  GotoAdd = ()=>{
    this.setState({
      isOpenFloatLayout:true,
    })
  }

  FetchMapList = (type)=>{
    api.getRank({
      type:type
    }).then(res=>{
      console.log(res.data.data)
      this.setState({
        mapList:res.data.data
      })
    }).catch(err=>{
      console.log(err)
    })
  }

  componentWillMount () {
    this.FetchMapList(this.state.type['like'])
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className={'container'}>
        <AtTabBar
          className={'header'}
          backgroundColor='#F6C900'
          tabList={[
            { title: '最爱地图' },
            { title: '最近上传' },
            { title: '最孬地图' }
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />

        <View className={'float_button_wrapper'}>
          <AtFab onClick={this.GotoAdd.bind(this)}>
            <Text className='float_button at-fab__icon at-icon at-icon-add'/>
          </AtFab>
        </View>

        <AtFloatLayout isOpened={this.state.isOpenFloatLayout} title="上传地图" onClose={this.handleClose.bind(this)}>
          <Add/>
        </AtFloatLayout>


        <AtList className={'map-list'}>
          {this.state.mapList.map((item)=>{
            return (
              <View>
                <AtListItem
                  className={'mapItem'}
                  key={item}
                  title={item.mapId}
                  thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                />
                <View>

                </View>
              </View>
            )
          })}

        </AtList>

      </View>
    )
  }
}
