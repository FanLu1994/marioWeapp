import { Component } from 'react'
import { Text,View,Image} from '@tarojs/components'
import './index.less'
import {AtAvatar, AtFab, AtFloatLayout, AtIcon, AtList, AtTabBar} from "taro-ui";
import Add from "../add/add";
import * as api from "../../http/api"
import mario from "../../asset/images/mairo/mario.jpg"
import like from "../../asset/images/like.png"
import hate from "../../asset/images/hate.png"


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
              <View className={"list-item"} key={item.mapId}>
                <View className={"list-item-left"}>
                  <view className={"map-info"}>
                    <view className={"map-image"}>
                      <AtAvatar circle image={mario}/>
                    </view>
                    <View className={"map-id"}>
                      {item.mapId}
                    </View>
                  </view>
                  <view className={"map-comment"}>
                    推荐语：{item.comment}
                  </view>
                </View>
                <View className={"list-item-right"}>
                  <View className={"like-button"}>
                    <Image src={like} className={"operation-icon"}/>
                  </View>
                  <View className={"hate-button"}>
                    <Image src={hate} className={"operation-icon"}/>
                  </View>
                </View>
              </View>
            )
          })}

        </AtList>

      </View>
    )
  }
}
