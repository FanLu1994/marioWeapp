import { Component } from 'react'
import { Text,View,Image} from '@tarojs/components'
import './index.less'
import {AtAvatar, AtFab, AtFloatLayout, AtList, AtTabBar} from "taro-ui";
import Add from "../add/add";
import * as api from "../../http/api"
import {getRandomImage} from "../../util/ImageUtil";
import like from "../../asset/images/like.png"
import like_active from "../../asset/images/like_active.png"
import hate from "../../asset/images/hate.png"
import hate_active from "../../asset/images/hate_active.png"


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

  LikeMap = (id:number)=>{
    api.addComment({
      map_id:id,
      like:true,
    }).then(res=>{
      console.log(res.data)
      this.FetchMapList(this.state.value)
    }).catch(err=>{
      console.log(err)
    })
  }

  DislikeMap = (id:number)=>{
    api.addComment({
      map_id:id,
      like:false,
    }).then(res=>{
      console.log(res.data)
      this.FetchMapList(this.state.value)
    }).catch(err=>{
      console.log(err)
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

  getLikedSrc(isLike){
    if(isLike){
      return like_active
    }
    return like
  }

  getHateSrc(isHate){
    console.log(isHate)
    if(isHate){
      return hate_active
    }
    return hate
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
              <View className={"list-item"} key={item.map_id}>
                <View className={"list-item-left"}>
                  <View className={"map-info"}>
                    <View className={"map-image"}>
                      <AtAvatar circle image={getRandomImage()}/>
                    </View>
                    <View className={"map-id"}>
                      {item.map_id}
                    </View>
                  </View>
                  <View className={"map-comment"}>
                    推荐语：{item.comment}
                  </View>
                </View>
                <View className={"list-item-right"}>
                  <View className={"like-button"} onClick={this.LikeMap.bind(this,item.id)}>
                    <Image src={this.getLikedSrc(item.like===1)} className={"operation-icon"}/>
                  </View>
                  <View className={"hate-button"} onClick={this.DislikeMap.bind(this,item.id)}>
                    <Image src={this.getHateSrc(item.like===2)} className={"operation-icon"}/>
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
