import { Component } from 'react'
import './app.less'
import 'taro-ui/dist/style/index.scss'
import taro from '@tarojs/taro'
import * as api from './http/api'

class App extends Component {

  componentDidMount () {
    api.login({
      username:"xiamu",
      password:"1234",
    }).then(async res=>{
      if(res.data.code===200){
        taro.setStorageSync('token',res.data.data.token)
        await taro.showToast({
          title: "登录成功",
          duration: 3000,
          icon:'success'
        })
      }else{
        await taro.showToast({
          title: "登录失败",
          duration: 3000,
          icon:'none'
        })
      }
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
