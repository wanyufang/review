import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
//   先获取token值
  let mytoken = localStorage.getItem('wanyufang')
  //   判断 当有token值的时候 加上请求头
  if (mytoken) {
    config.headers.Authorization = mytoken
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 暴露
export default axios
