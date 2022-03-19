
import {get,post} from "./request";


export const login = (params)=>post('/user/login',params)
export const register = (params)=>post('/user/register',params)
