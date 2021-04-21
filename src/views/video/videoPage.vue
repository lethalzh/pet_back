<template>
  <div class="videoPage">
    <div style="margin-top: 15px;">
      <el-col :span="3" :offset="4">
        <el-input v-model="search" />
      </el-col>
      <el-col :span="3">
        <el-button type="primary">搜索</el-button>
      </el-col>
      <el-col :span="6">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :page-size="9"
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
        prop="v_id"
        label="视频号"
      />
      <el-table-column
        prop="v_name"
        label="视频名"
      />
      <el-table-column
        prop="v_img"
        label="封面图片"
      >
        <template slot-scope="scope">
          <img :src="scope.row.v_img" class="img">
        </template>
      </el-table-column>
      <el-table-column
        prop="v_type"
        label="视频类型"
      />
      <el-table-column
        prop="animal"
        label="视频所属"
      />
      <el-table-column
        prop="v_url"
        label="视频地址"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            @click="editRow(scope.row)"
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="deleteRow(scope.row.v_id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getVideoList, deleteVideoItem } from '@/api/video.js'
export default {
  name: 'VideoPage',
  data() {
    return {
      list: [],
      listLoading: false,
      page: 1,
      total: 0,
      search: ''
    }
  },
  created() {
    this.getVideoList()
  },
  methods: {
    getVideoList() {
      this.listLoading = true
      getVideoList({ page: this.page, search: this.search }).then(response => {
        console.log(response.data, '--------------')
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    deleteRow(id) {
      deleteVideoItem(id).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getVideoList()
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.getVideoList()
    },
    editRow(row) {
      this.$router.push({ name: 'editvideo', params: { row: row }})
    }
  }
}
</script>

<style scoped lang="scss">
  .videoPage {
    .img {
      width: 90px;
    }
  }
</style>
