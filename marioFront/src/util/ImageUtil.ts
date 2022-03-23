
import gongzhu from "../asset/images/mairo/gongzhu.jpg"
import jump from "../asset/images/mairo/jump.jpg"
import kuba from "../asset/images/mairo/kuba.jpg"
import link from "../asset/images/mairo/link.jpg"
import link_1 from "../asset/images/mairo/link_1.jpg"
import lion from "../asset/images/mairo/lion.jpg"
import luyi_and_yun from "../asset/images/mairo/luyi_and_yun.jpg"
import luyi_jump from "../asset/images/mairo/luyi_jump.jpg"
import mario from "../asset/images/mairo/mario.jpg"
import mairo_and_yaoxi from "../asset/images/mairo/mario_and_yaoxi.jpg"
import meimei from "../asset/images/mairo/meimei.jpg"
import tanhuang from "../asset/images/mairo/tanhuang.jpg"
import wenhao from "../asset/images/mairo/wenhao.jpg"
import xiaohong from "../asset/images/mairo/xiaohong.jpg"
import xiaolan from "../asset/images/mairo/xiaolan.jpg"
import xiaolan_dun from "../asset/images/mairo/xiaolan_dun.jpg"
import yaoxi from "../asset/images/mairo/yaoxi.jpg"
import zhadan from "../asset/images/mairo/zhadan.jpg"


export function getRandomImage() {
  let imageList = [gongzhu,jump,kuba,link,link_1,lion,luyi_and_yun,luyi_jump,
  mario,mairo_and_yaoxi,meimei,tanhuang,wenhao,xiaohong,xiaolan,xiaolan_dun,yaoxi,zhadan]
  let image = imageList[Math.floor(Math.random()*10000)%imageList.length]
  return image
}
