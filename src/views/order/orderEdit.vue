<template>
  <div>

    <div class="orderEdit">
      <div class="editTite">
        <el-page-header content="订单详情" @back="goBack" />
      </div>
      <el-steps :space="200" :active="sta" finish-status="success">
        <el-step v-for="(i,j) of lable" :key="j" :title="i" />
      </el-steps>
      <el-form ref="form" :model="form">
        <el-form-item label="订单号">
          <el-input v-model="form.o_id" disabled />
        </el-form-item>
        <el-form-item label="用户Id">
          <el-input v-model="form.u_id" disabled />
        </el-form-item>
        <el-form-item label="订单总金额">
          <el-input v-model="form.o_totalPrice" disabled />
        </el-form-item>
        <el-form-item label="邮递渠道">
          <el-input v-model="form.o_deli" disabled />
        </el-form-item>
        <el-row>
          <el-col :span="4" :offset="1">
            <el-form-item label="订单创建时间">
              <el-date-picker v-model="form.o_createDate" type="date" placeholder="选择日期" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item label="发货时间">
              <el-date-picker v-model="form.o_sendDate" type="date" placeholder="选择日期" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-form-item label="完成时间">
              <el-date-picker v-model="form.o_finishDate" type="date" placeholder="选择日期" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-table
            v-loading="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%;text-align: center"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            :data="comList"
          >
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
              prop="s_num"
              label="购买数量"
            />
            <el-table-column
              prop="com_oldprice"
              label="商品价格"
            />
            <el-table-column
              prop="com_price"
              label="折扣价格"
            />
          </el-table>
        </el-form-item>
        <el-form-item v-if="sta==1">
          <el-button type="primary" @click="onSubmit">发货</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import { editOrderItem, getOrderCom } from '@/api/order'
export default {
  name: 'OrderEdit',
  data() {
    return {
      form: {
        a_id: null,
        o_createDate: '',
        o_deli: '',
        o_finishDate: null,
        o_id: '',
        o_sendDate: null,
        o_status: '',
        o_totalPrice: '',
        u_id: ''
      },
      sta: null,
      comList: [],
      listLoading: true,
      lable: ['未付款', '已付款', '未收货', '已完成']
    }
  },
  created() {
    this.form = this.$route.params.row || this.form
    this.sta = this.form.o_status < 0 ? 0 : parseInt(this.form.o_status)
    this.getOrderCom()
  },
  methods: {
    onSubmit() {
      editOrderItem(this.form.o_id).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.$router.push({ name: 'listorder' })
      })
    },
    getOrderCom() {
      console.log(this.form.o_id, 'id')
      getOrderCom({ oid: this.form.o_id }).then(res => {
        this.comList = res.data
        this.listLoading = false
        console.log(this.comList, '----------')
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.orderEdit{
  width: 700px;
  margin: 0 auto;
  .editTite{
    margin: 15px 0 15px 0 ;
  }
  .img{
    width: 60px;
  }
  .el-form{
    width: 700px;

  }
  .el-input{
    margin-left: 20px;
    width: 150px;
  }
  .el-button{
    margin-left: 250px;
  }
  .el-date-picker{
    width: 100px;
  }
}
</style>
