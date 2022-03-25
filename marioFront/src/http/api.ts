
import {get,post} from "./request";


export const login = (params)=>post('/user/login',params)
export const register = (params)=>post('/user/register',params)

export const addMap = (params)=>post('/map/add',params)
export const addComment = (params)=>post('/map/addmapcomment',params)
export const cancleMapComment = (params)=>post('/map/canclemapcomment',params)
export const getRank = (params)=>get('/map/getrank',params)

export const getUploadList = (params={})=>get('/map/uploadlist',params)
export const getLikeList = (params= {})=>get('/map/likelist',params)
