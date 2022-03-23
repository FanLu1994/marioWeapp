import * as api from "../http/api"

export function LikeMap(id:number) {
  api.addComment({
    map_id:id,
    like:true,
  }).then(res=>{
    console.log(res.data)
  }).catch(err=>{
    console.log(err)
  })
}

export function DislikeMap(id:number) {
  api.addComment({
    map_id:id,
    like:false,
  }).then(res=>{
    console.log(res.data)
  }).catch(err=>{
    console.log(err)
  })
}
