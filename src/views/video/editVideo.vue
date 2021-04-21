<template>
  <div class="addVideo">
    <div class="editTite">
      <el-page-header content="详情页面" @back="goBack" />
    </div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="视频名">
            <el-input v-model="form.v_name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="视频地址">
            <el-input v-model="form.v_url" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="视频所属">
            <el-select v-model="form.animal" placeholder="请选择" @change="changeStatus">
              <el-option label="dog" value="dog" />
              <el-option label="cat" value="cat" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="视频类型">
            <el-select v-model="form.v_type" placeholder="请选择">
              <el-option
                v-for="(type,i) of types"
                :key="i"
                :label="type"
                :value="type"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="封面图片">
            <el-input v-model="form.v_img" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="2">
          <el-upload
            action="http://localhost:3000/other/upload/"
            list-type="picture-card"
            :file-list="[{url:form.v_img}]"
            :on-preview="handlePictureCardPreview"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.v_img" alt="">
          </el-dialog>
        </el-col>
      </el-row>
      <el-button type="primary" class="bt" @click="editVideo">修 改</el-button>
    </el-form>
  </div>
</template>

<script>
import { addVideoItem } from '@/api/video.js'
import { addURL } from '@/utils/index.js'
export default {
  name: 'EditVideo',
  data() {
    return {
      form: {
        v_name: '',
        v_img: '',
        v_type: '奇异玩具',
        animal: 'dog',
        v_url: ''
      },
      catType: ['奇异玩具', '居家出行', '吃货必备', '精致入厕'],
      dotType: ['奇异玩具', '居家出行', '吃货必备', '潮流出行'],
      types: [],
      dialogVisible: false
    }
  },
  created() {
    this.form = this.$route.params.row || this.form
    this.types = this.form.animal == 'dog' ? this.dotType : this.catType
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    handlePictureCardPreview(file) {
      this.form.v_img = addURL(file.url)
      this.dialogVisible = true
    },
    addVideo() {
      addVideoItem(this.form).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$router.push({ name: 'listvideo' })
      })
    },
    editVideo() {
      editVideoItem(this.from).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$router.push({ name: 'listvideo' })
      })
    },
    changeStatus() {
      this.types = this.form.animal == 'dog' ? this.dotType : this.catType
      this.form.v_type = this.types[0]
    }
  }
}
</script>

<style scoped lang="scss">
  .addVideo{
    width: 1200px;
    margin: 0 auto;
    .el-form{
      margin-left: 200px;
    }
    .editTite{
      margin: 15px 0 15px 0 ;
    }
    .bt{
      margin-left: 245px;
    }

  }
</style>
