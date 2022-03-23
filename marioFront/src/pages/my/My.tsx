import { Component } from 'react'
import {Image, View} from '@tarojs/components'
import './index.less'
import {AtAvatar, AtList, AtTabBar} from "taro-ui";
import * as api from '../../http/api'
import like from "../../asset/images/like.png";
import hate from "../../asset/images/hate.png";
import {getRandomImage} from "../../util/ImageUtil";
import {DislikeMap, LikeMap} from "../../util/Comment";

export default class My extends Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      current:0,
      mapList:[],
    }
  }

  handleClick = (value)=>{
    switch (value){
      case 0:
        this.fectchMyLikeList()
        break
      case 1:
        this.fectchMyUploadList()
        break
      default:
        break
    }
  }

  fectchMyLikeList(){
    api.getLikeList().then(res=>{
      console.log(res)
      this.setState({
        mapList:res.data.data
      })
    }).catch(err=>{
      console.log(err)
    })
  }

  fectchMyUploadList(){
    api.getUploadList().then(res=>{
      console.log(res)
      this.setState({
        mapList:res.data.data
      })
    }).catch(err=>{
      console.log(err)
    })
  }

  componentWillMount () {
    this.fectchMyLikeList()
  }

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
          {this.state.mapList.map((item)=>{
            return (
              <View className={"list-item"} key={item.mapId}>
                <View className={"list-item-left"}>
                  <view className={"map-info"}>
                    <view className={"map-image"}>
                      <AtAvatar circle image={getRandomImage()}/>
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
                  <View className={"like-button"} onClick={LikeMap.bind(this,item.ID)}>
                    <Image src={like} className={"operation-icon"}/>
                  </View>
                  <View className={"hate-button"} onClick={DislikeMap.bind(this,item.ID)}>
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
