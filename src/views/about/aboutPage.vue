<template>
  <div class="aboutPage">
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
          :page-size="6"
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
        prop="Ac_id"
        label="文章id"
      />
      <el-table-column
        prop="A_title"
        label="宠物状态"
      />
      <el-table-column
        prop="Ac_img"
        label="封面图片"
      >
        <template slot-scope="scope">
          <img :src="scope.row.Ac_img" class="img">
        </template>
      </el-table-column>
      <el-table-column
        prop="Ac_title"
        label="文章标题"
      />
      <el-table-column
        prop="Ac_content"
        label="文章简介"
      >
        <template slot-scope="scope">
          <span class="ellip">{{ scope.row.Ac_content }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="Ac_see"
        label="阅读数"
      />
      <el-table-column
        prop="animal"
        label="所属类"
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
            @click="deleteRow(scope.row.Ac_id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAboutList, deleteAboutItem } from '@/api/about.js'

export default {
  name: 'AboutPage',
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
    this.getAboutList()
  },
  methods: {
    getAboutList() {
      this.listLoading = true
      getAboutList({ page: this.page, search: this.search }).then(response => {
        console.log(response.data, '--------------')
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    deleteRow(id) {
      deleteAboutItem(id).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getAboutList()
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.getAboutList()
    },
    editRow(row) {
      this.$router.push({ name: 'editabout', params: { row: row }})
    }
  }
}
</script>

<style scoped lang="scss">
  .aboutPage {
    .img {
      width: 90px;
    }
    .ellip{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }
  }

</style>
