<template>
  <div class="userPage">
    <div style="margin-top: 15px;">
      <el-col :span="3" :offset="4">
        <el-input v-model="search" />
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="getUserinfo">搜索</el-button>
      </el-col>
      <el-col :span="6">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :page-size="8"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </div>
    <el-table
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%;text-align: center"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      :data="list"
    >
      <el-table-column
        prop="u_id"
        label="用户id"
      />
      <el-table-column
        prop="u_name"
        label="用户名"
      />
      <el-table-column
        prop="u_icon"
        label="头像"
      >
        <template slot-scope="scope">
          <img :src="scope.row.u_icon" class="img">
        </template>
      </el-table-column>
      <el-table-column
        prop="u_phone"
        label="手机号"
      />
      <el-table-column
        prop="u_sex"
        label="性别"
      >
        <template slot-scope="scope">
          <el-tag>{{ sexs[parseInt(scope.row.u_sex)-1] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="u_address"
        label="地址"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            @click="setRowData(scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="deleteUserItem(scope.row.u_id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList, deleteUserItem } from '@/api/user.js'
export default {
  name: 'UserPage',
  data() {
    return {
      list: [],
      listLoading: false,
      sexs: ['男', '女', '保密'],
      page: 1,
      total: 0,
      search: ''
    }
  },
  created() {
    this.getUserinfo()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
    },
    getUserinfo() {
      getUserList({ page: this.page, search: this.search }).then(res => {
        this.total = res.total
        this.list = res.data
      })
    },
    deleteUserItem(id) {
      deleteUserItem(id).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getUserinfo()
      })
    },
    setRowData(row) {
      this.$router.push({ name: 'edituser', params: { row: row }})
    }
  }
}
</script>

<style scoped lang="scss">
.userPage{
    .img{
      width: 60px;
    }
  .el-pagination{
    text-align: center;
  }
}
</style>
