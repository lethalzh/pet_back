<template>
  <div class="editAbout">
    <div class="editTite">
      <el-page-header content="详情页面" @back="goBack" />
    </div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="文章标题">
            <el-input v-model="form.Ac_title" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文章简介">
            <el-input v-model="form.Ac_content" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="所属种类">
            <el-select v-model="form.animal" placeholder="请选择" @change="changeStatus">
              <el-option label="dog" value="dog" />
              <el-option label="cat" value="cat" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="关联宠物状态">
            <el-select v-model="form.Abcon_id" placeholder="请选择">
              <el-option
                v-for="(type,i) of types"
                :key="i"
                :label="type.label"
                :value="type.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="封面图片">
            <el-input v-model="form.Ac_img" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="2">
          <el-upload
            action="http://localhost:3000/other/upload/"
            list-type="picture-card"
            :file-list="[{url:form.Ac_img}]"
            :on-preview="handlePictureCardPreview"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.Ac_img" alt="">
          </el-dialog>
        </el-col>
      </el-row>
      <el-form-item>
        <Tinymce ref="editor" v-model="form.Ac_body" :height="330" />
      </el-form-item>
      <el-button type="primary" class="bt" @click="editAbout">修 改</el-button>
    </el-form>
  </div>
</template>

<script>
import { editAboutItem } from '@/api/about.js'
import { addURL } from '@/utils/index.js'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'EditAbout',
  components: { Tinymce },
  data() {
    return {
      form: {
        A_title: '',
        Abcon_id: '',
        Ac_body: '',
        Ac_content: '',
        Ac_id: '',
        Ac_img: '',
        Ac_title: '',
        animal: ''
      },
      types: [],
      dotType: [
        {
          label: '刚到家',
          id: 1
        },
        {
          label: '2-3月龄',
          id: 2
        },
        {
          label: '4-5月龄',
          id: 3
        },
        {
          label: '6月龄-成年',
          id: 4
        },
        {
          label: '生病了',
          id: 5
        }
      ],
      catType: [
        {
          label: '刚到家',
          id: 6
        },
        {
          label: '2-3月龄',
          id: 7
        },
        {
          label: '4-5月龄',
          id: 8
        },
        {
          label: '6月龄-成年',
          id: 9
        },
        {
          label: '生病了',
          id: 10
        }
      ],
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
      this.form.Ac_img = addURL(file.url)
      this.dialogVisible = true
    },
    editAbout() {
      editAboutItem(this.form).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$router.push({ name: 'listabout' })
      })
    },
    changeStatus() {
      this.types = this.form.animal == 'dog' ? this.dotType : this.catType
      this.form.Abcon_id = this.types[0].id
    }
  }
}
</script>

<style scoped lang="scss">
  .editAbout{
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
