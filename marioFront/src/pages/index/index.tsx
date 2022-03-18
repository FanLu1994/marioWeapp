import { Component } from 'react'
import { Text,View} from '@tarojs/components'
import './index.less'
import {AtFab, AtFloatLayout, AtList, AtListItem, AtTabBar} from "taro-ui";
import Add from "../add/add";


export default class Index extends Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      current:0,
      mapList:[1,2,3,4,5,6,7,8,9,10],
      isOpenFloatLayout:false,
    }
  }

  handleClick = (value)=>{
    console.log(this.state)
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
    console.log("???")
    this.setState({
      isOpenFloatLayout:true,
    })
    // navigateTo({
    //   url: 'pages/add/Add'
    // }).then(r=>{
    //   console.log(r)
    // })
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


        <AtList>
          {this.state.mapList.map((item)=>{
            return (
              <View>
                <AtListItem
                  className={'mapItem'}
                  key={item}
                  title={item+''}
                  thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                />
              </View>
            )
          })}

        </AtList>

      </View>
    )
  }
}
