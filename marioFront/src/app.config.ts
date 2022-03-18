export default {
  pages: [
    'pages/index/index', // 第一项代表首页
    'pages/my/My',
  ],
  tabBar: {
    color: 'black',
    selectedColor:'black',
    backgroundColor:'white',
    borderStyle:'white',
    list:[
      {
        pagePath: 'pages/index/index',
        text:'首页',
        iconPath:'asset/images/rank.png',
        selectedIconPath:'asset/images/rank_select.png'
      },
      {
        pagePath: 'pages/my/My',
        text:'我的',
        iconPath:'asset/images/my.png',
        selectedIconPath:'asset/images/my_select.png'
      }
    ],
    position:'bottom',
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
