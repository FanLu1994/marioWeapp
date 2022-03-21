import Taro from '@tarojs/taro'


// export const baseUrl = "http://110.42.182.92:9090"
export const baseUrl = "http://localhost:9090"


function baseOptions(url,params,method:keyof Taro.request.method = 'GET'){
  const option:Taro.request.Option = {
    url: baseUrl + url,
    data: params,
    method:method,
    header: {
      'Content-Type':'application/json',
      'Authorization':Taro.getStorageSync('token'),
    },
    mode:'cors',
    credentials:'omit',
    cache:'default',
  };
  return Taro.request(option);
}

export function post(url,params){
  return baseOptions(url,params,"POST")
}


export function get(url,params){
  return baseOptions(url,params)
}
