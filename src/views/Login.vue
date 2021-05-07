<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7" >
      <div class="login-title">
        <h2>欢迎来到Unknown App管理系统</h2>
        <el-image :src="require('@/assets/images/CallMe.jpg')" style="width: 200px"></el-image>
        <p>微信 scpcrow</p>
        <p>有事扫二维码联系，谢谢！</p>
      </div>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :xl="6" :lg="7">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item style="width: 380px;" label="验证码" prop="code">
          <el-input v-model="loginForm.code" style="width: 172px; float: left;"></el-input>
          <el-image class="captcha-img" :src="captchaImg" @click="getCaptcha"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">立即创建</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '长度为 5 个字符', trigger: 'blur' }
        ]
      },
      // 验证码图片
      captchaImg: null
    };
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.loginForm).then(res => {
            // 获取用户的jwt
            const jwt = res.headers['authorization']
            // 将jwt存入vuex中
            this.$store.commit('SET_TOKEN', jwt)
            // 登录跳转
            this.$router.push('/')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getCaptcha() {
      this.$axios.get('/captcha').then(res => {
        console.log(res.data.data.captchaImg);
        this.loginForm.then = res.data.data.token
        this.captchaImg = res.data.data.captchaImg
      })
    }
  }
}
</script>

<style scoped>


.el-row {
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #fafafa;
  background-image: url('./../assets/images/grunge_wall.png');
}

.el-divider {
  height: 28vh;
  background: white;
}

.captcha-img {
  float: left;
  margin-left: .5em;
  border-radius: 4px;
}
</style>
