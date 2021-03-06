// 引入封装好的axios
import axios from '@/utils/myaxios.js'

// 获取所有用户数据
export const getAllUsers = (params) => {
  return axios({
    url: 'users',
    // get请求 用params接收数据
    params
  })
}

// 实现用户数据的新增
export const addUser = (data) =>{
  return axios({
    url: 'users',
    data
  })
}
