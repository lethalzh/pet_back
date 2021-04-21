<template>
  <div class="goodsPage">
    <!--      <el-button type="primary" class="bt" @click="setRowData({},true)">添加商品</el-button>-->
    <div style="margin-top: 15px;">
      <el-col :span="3" :offset="4">
        <el-input v-model="search" />
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="getGoodList">搜索</el-button>
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
        prop="com_id"
        label="商品号"
      />
      <el-table-column
        prop="com_name"
        label="商品名"
      />
      <el-table-column
        prop="com_imgs"
        label="商品图片"
      >
        <template slot-scope="scope">
          <img :src="scope.row.com_imgs" class="img">
        </template>
      </el-table-column>
      <el-table-column
        prop="com_oldprice"
        label="商品价格"
      />
      <el-table-column
        prop="com_price"
        label="商品折扣价"
      />
      <el-table-column
        prop="com_product_type"
        label="商品类别"
      />
      <el-table-column
        prop="com_product_types"
        label="商品细明类别"
      />
      <el-table-column
        prop="com_msales"
        label="月销售"
      />
      <el-table-column
        prop="com_num"
        label="库存"
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
            @click="deleteRow(scope.row.com_id)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getGoodList, delectGoodRow } from '@/api/goods.js'
export default {
  name: 'GoodsPage',
  data() {
    return {
      list: [],
      listLoading: false,
      page: 1,
      total: 0,
      search: '',
      rowData: {}
    }
  },
  created() {
    this.getGoodList()
  },
  methods: {
    getGoodList() {
      this.listLoading = true
      getGoodList({ page: this.page, search: this.search }).then(response => {
        console.log(response.data, '--------------')
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.getGoodList()
    },
    setRowData(data = {}, flag = false) {
      // this.rowData=data
      this.$router.push({ name: 'editgoods', params: { row: data, flag: flag }})
    },
    deleteRow(cid) {
      delectGoodRow(cid).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.getGoodList()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.goodsPage{
  .img{
    width: 60px;
  }
  .el-pagination{
    margin-top: 15px;
    text-align: center;
  }
  .bt{
    margin: 10px 20px 10px;
  }
}
</style>
