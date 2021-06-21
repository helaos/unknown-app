<template>
  <div class="user-center">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="userForm.imageUrl" :src="userForm.imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <el-form class="user-info-form" :rules="rules" ref="userForm" :model="userForm" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="旧密码" prop="password">
        <el-input v-model="userForm.password" placeholder="旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="userForm.newPassowrd" placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确认修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserCenter',
  data () {
    return {
      userForm: {
        username: '',
        // 旧密码
        password: '',
        // 新密码
        newPassowrd: '',
        // 用户头像地址
        imageUrl: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {



    /** 图片处理相关 */
    handleAvatarSuccess (res, file) {
      // 处理图片上传并返回URL
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式！')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB！')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
/* 布局 */
.user-center {
  height: 80%;
  display: flex;
  justify-content:space-evenly;
  align-items: center;
}

/* 头像 */
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 15rem;
  height: 15rem;
  box-shadow: 3px 12px 12px rgb(70 68 68 / 30%);
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 15rem;
  height: 15rem;
  line-height: 15rem;
  text-align: center;
}
.avatar {
  width: 15rem;
  height: 15rem;
  display: block;
}

/* 信息 */
.user-info-form {
  width: 25rem;
}
</style>
