// 引入axios
import axios from '@/utils/myaxios.js'

// 登录
export const login = (data) => {
  // axios({}) 返回一个promise对象
  return axios({
    // 设置url路径
    url: 'login',
    // post请求方式
    method: 'post',
    // post请求方式用data传递数据
    data
  })
}
