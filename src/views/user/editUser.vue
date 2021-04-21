<template>
  <div class="editUser">
    <div class="editTite">
      <el-page-header content="详情页面" @back="goBack" />
    </div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户名">
            <el-input v-model="form.u_name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/other/upload/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="form.u_icon" :src="form.u_icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="手机号">
            <el-input v-model="form.u_phone" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地址">
            <el-input v-model="form.u_address" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="性别">
            <el-radio-group v-model="form.u_sex">
              <el-radio :label="1" :value="1">男</el-radio>
              <el-radio :label="2" :value="2">女</el-radio>
              <el-radio :label="3" :value="3">保密</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button type="primary" class="bt" @click="editRow">修改</el-button>
    </el-form>
  </div>
</template>

<script>
import { editUserItem } from '@/api/user.js'
import { addURL } from '@/utils/index.js'
export default {
  name: 'EditUser',
  data() {
    return {
      form: {}
    }
  },
  created() {
    this.form = this.$route.params.row || this.form
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    handleAvatarSuccess(file) {
      this.form.u_icon = addURL(file.url)
    },
    editRow() {
      editUserItem(this.form).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$router.push({ name: 'listuser' })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .editUser{
    width: 1200px;
    margin: 0 auto;
    .editTite{
      margin: 15px 0 15px 0 ;
    }
    .bt{
      margin-left: 545px;
    }
    img{
      width: 90px;
      height: 90px;
      border-radius: 45px;
    }
  }
</style>
