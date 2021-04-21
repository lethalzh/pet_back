<template>
  <div class="editGoods">
    <div class="editTite">
      <el-page-header content="详情页面" @back="goBack" />
    </div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="商品名">
        <el-input v-model="form.com_name" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="商品图片">
            <el-input v-model="form.com_imgs" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="2">
          <el-upload
            action="http://localhost:3000/other/upload/"
            list-type="picture-card"
            :file-list="[{url:form.com_imgs}]"
            :on-preview="handlePictureCardPreview"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.com_imgs" alt="">
          </el-dialog>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="商品价格">
            <el-input v-model="form.com_oldprice" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品折扣价">
            <el-input v-model="form.com_price" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="适用于">
            <el-select v-model="form.com_animal" placeholder="请选择">
              <el-option label="dog" value="dog" />
              <el-option label="cat" value="cat" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="库存">
            <el-input v-model="form.com_num" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="商品类别">
            <el-select v-model="form.com_product_type" placeholder="请选择" @change="getSele">
              <el-option
                v-for="item in navArr"
                :key="item.titel"
                :label="item.titel"
                :value="item.titel"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="商品细明类别">
            <el-select v-model="form.com_product_types" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="月销售">
            <el-input v-model="form.com_msales" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="margin-bottom: 30px;">
        <Tinymce ref="editor" v-model="form.com_synopsis" :height="360" />
      </el-form-item>
      <el-button v-if="flag" type="primary" class="bt" @click="addRow">添 加</el-button>
      <el-button v-else type="primary" class="bt" @click="editRow">修 改</el-button>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

import { editGoodRow, addGoodRow, getNavdata } from '@/api/goods.js'
export default {
  name: 'EditGoods',
  components: { Tinymce },
  data() {
    return {
      form: {
        com_animal: 'dog',
        com_authority: '',
        com_brand: '',
        com_description: '',
        com_imgs: '',
        com_material: '',
        com_msales: 0,
        com_name: '',
        com_num: '',
        com_oldprice: '',
        com_price: '',
        com_product_type: '主粮',
        com_product_types: '',
        com_specification: '',
        com_synopsis: ''
      },
      flag: true,
      navArr: [],
      types: [],
      value: '',
      dialogVisible: false
    }
  },
  created() {
    this.flag = this.$route.params.flag || false
    if (!this.flag) {
      this.form = this.$route.params.row || this.form
    }
    this.getNav()
  },
  methods: {
    editRow() {
      editGoodRow(this.form).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$router.push({ name: 'listgoods' })
      })
    },
    addRow() {
      addGoodRow(this.form).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$router.push({ name: 'listgoods' })
      })
    },
    getNav() {
      getNavdata(this.form.com_animal || 'dog').then(res => {
        this.navArr = res.data
        for (const i of this.navArr) {
          if (i.titel == this.form.com_product_type) { this.types = i.type }
        }
      })
    },
    handlePictureCardPreview(file) {
      this.form.com_imgs = addURL(flie.url)
      this.dialogVisible = true
    },
    goBack() {
      this.$router.go(-1)
    },
    getSele(val) {
      for (const i of this.navArr) {
        if (i.titel == val) { this.types = i.type }
        this.form.com_product_types = this.types[0].name
      }
    }
  }
}
</script>

<style scoped lang="scss">
.editGoods{
  width: 1200px;
  margin: 0 auto;
  .editTite{
    margin: 15px 0 15px 0 ;
  }
  .bt{
    margin-left: 545px;
  }

}
</style>
