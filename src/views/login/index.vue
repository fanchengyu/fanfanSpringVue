<template>
  <div class="main_login_page">
    <div class="login_page_title">
      <div>
        范范和乐乐的窝窝<img src="/img/icons/jhz.jpg">
      </div>
    </div>
    <div class="login_page_content">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="NAME" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="pass_word">
          <el-input v-model="ruleForm.pass_word" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { loginSystem } from '../../api/user'
export default {
  name: 'Login',
  data: function() {
    return {
      ruleForm: {
        name: '',
        pass_word: ''
      },
      rules: {}
    }
  },
  methods: {

    submitForm() {
      loginSystem(this.ruleForm).then(res => {
        this.$message({
          type: 'success',
          message: res.message
        })
        this.$router.push({
          name: 'Home'
        })
      }).catch(e => {
        console.log(e)
      })
    },
    resetForm(formName) {
      this.$refs.ruleForm.resetFields()
    }
  }
}

</script>
<style lang="scss">
@import '../../style/variables.scss';
.main_login_page{
  height:100%;
    background: url(/img/icons/bj2.jpg);
    background-size:cover;
  .login_page_title{
    height:30%;
    &>div:first-child{
      margin-left:12%;
      padding-top:4%;
      font-size:40px;
      font-weight: 700;
      font-style: italic;
      color:$common-color;
      display:flex;
      align-items: center;
      &>img:first-child{
        margin-left:20px;
        //width:45px;
        height:45px;
        border-radius:50%;
      }
    }
  }
  .login_page_content{
    height:70%;
    display:flex;
    justify-content: center;
    //align-items: center;
   .demo-ruleForm{
    width:500px;
    height:300px;
     display:flex;
     flex-direction: column;
   justify-content: center;
//align-items: center;
  }
  }

}

</style>
