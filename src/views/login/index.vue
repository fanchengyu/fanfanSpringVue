<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="NAME" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass_word">
        <el-input v-model="ruleForm.pass_word" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function() {
    return {
      ruleForm: {
        pass: 'name',
        checkPass: 'pass_word'
      },
      rules: {}
    }
  },
  methods: {
    submitForm() {
      //
    },
    resetForm(formName) {
      this.$refs.ruleForm.resetFields()
    }
  }
}

</script>
<style lang="scss">

</style>
