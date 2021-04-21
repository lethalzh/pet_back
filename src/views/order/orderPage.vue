<template>
  <div class="orderPage">
    <div style="margin-top: 15px;">
      <el-col :span="3" :offset="4">
        <el-input v-model="search" />
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="getOrderList">搜索</el-button>
      </el-col>
      <el-col :span="6">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
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
      style="width: 100%;text-align: center;"
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      :data="list"
    >
      <el-table-column
        prop="o_id"
        label="订单号"
        width="180"
      />
      <el-table-column
        prop="u_id"
        label="收货人id"
        width="180"
      />
      <el-table-column
        prop="o_createDate"
        align="center"
        label="创建时间"
      />
      <el-table-column
        prop="o_finishDate"
        label="完成时间"
      />
      <el-table-column
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag :type="TagType[parseInt(scope.row.o_status)+1]">{{ lable[parseInt(scope.row.o_status)+1] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="o_totalPrice"
        label="总价格"
      />
      <el-table-column
        prop="o_deli"
        label="货运方式"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <!--            <el-button-->
          <!--              @click.native.prevent="deleteRow( scope.row.o_id)"-->
          <!--              type="text"-->
          <!--              size="small">-->
          <!--              移除-->
          <!--            </el-button>-->
          <el-button
            v-if="scope.row.o_status==1"
            type="text"
            size="small"
            @click.native.prevent="SendOrder(scope.row)"
          >
            发货
          </el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="editOrder(scope.row)"
          >
            查看详细
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order'
export default {
  name: 'OrderPage',
  data() {
    return {
      list: [],
      listLoading: false,
      page: 1,
      total: 0,
      search: '',
      TagType: ['info', '', '', 'warning', 'success'],
      lable: ['未付款', '', '已付款', '未收货', '已完成']
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      this.listLoading = true
      getOrderList({ page: this.page, search: this.search }).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    editOrder(row) {
      this.$router.push({ name: 'editorder', params: { row: row }})
    },
    handleCurrentChange(val) {
      this.page = val
      this.getOrderList()
    },
    SendOrder(row) {
      editOrderItem(row.o_id).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.getOrderList()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.orderPage{
  td{
    text-align: center;
  }
  .el-pagination{
    text-align: center;
  }
  .el-table{

  }
}
</style>
