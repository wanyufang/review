<template>
  <div class="user">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin-top: 15px;" class="div-input">
      <el-input placeholder="请输入内容" v-model="userobj.query" class="input-with-select" @input.native="init">
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
    </div>
    <el-button type="success" class="btn">搜索</el-button>
    <!-- 表格主体 -->
    <el-table :data="userList" border style="width: 100%" class="bbox">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <el-switch active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button size="mini">编辑</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button size="mini" type="danger">删除</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="新增" placement="top">
            <el-button size="mini" type="success" @click="add">新增</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userobj.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 10px">
    </el-pagination>
  </div>
</template>

<script>
import { getAllUsers, addUser } from '@/api/user_index.js'
export default {
  data () {
    return {
      total: 0,
      status: true,
      userList: [],
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 2
      }
    }
  },
  methods: {
    //   点击新增
    add () {
        
    },
    //   当切换sizes下拉列表时触发
    handleSizeChange (val) {
      this.userobj.pagesize = val
      this.init()
    },
    //   当切换当前页码时触发
    handleCurrentChange (val) {
      // 1.修改参数
      this.userobj.pagenum = val
      // 2.重新请求
      this.init()
    },
    //   数据获取
    init () {
      getAllUsers(this.userobj)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.userList = res.data.data.users
            // 获取记录总数
            this.total = res.data.data.total
          } else if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg)
            this.$router.push({ name: 'login' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.div-input {
  width: 300px;
  display: inline-block;
}
.btn {
  margin-left: 20px;
}
.bbox {
  margin-top: 10px;
}
</style>
