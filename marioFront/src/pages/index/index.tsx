import { Component } from 'react'
import { Text,View} from '@tarojs/components'
import {navigateTo} from '@tarojs/taro'
import './index.less'
import {AtFab, AtList, AtListItem, AtTabBar} from "taro-ui";


export default class Index extends Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      current:0,
      mapList:[1,2,3,4,5,6,7,8,9,10],
    }
  }

  handleClick = (value)=>{
    console.log(this.state)
    this.setState({
      current:value
    })
  }

  GotoAdd = ()=>{
    console.log("???")
    navigateTo({
      url: 'pages/add/Add'
    }).then(r=>{
      console.log(r)
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


        <AtList>
          {this.state.mapList.map((item)=>{
            return (
              <AtListItem
                className={'mapItem'}
                key={item}
                title={item+''}
                thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
              />
            )
          })}


          {/*<AtListItem*/}
          {/*  title='标题文字'*/}
          {/*  note='描述信息'*/}
          {/*  arrow='right'*/}
          {/*  thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'*/}
          {/*/>*/}
          {/*<AtListItem*/}
          {/*  title='标题文字'*/}
          {/*  note='描述信息'*/}
          {/*  extraText='详细信息'*/}
          {/*  arrow='right'*/}
          {/*  thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'*/}
          {/*/>*/}
        </AtList>

      </View>
    )
  }
}
