<template>
  <el-table
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column
      type="selection"
      width="55"
    />
    <el-table-column
      label="序号"
      type="index"
      width="50"
    />
    <el-table-column
      prop="id"
      label="ID"
      width="120"
      sortable
    />
    <el-table-column
      prop="name"
      label="用户名"
      width="120"
    />
    <el-table-column
      prop="number"
      label="编号"
    />
    <el-table-column
      prop="sex"
      label="性别"
      width="120"
    />
    <el-table-column
      prop="create_date"
      label="创建时间"
      width="120"
    />
    <el-table-column
      prop="finish_date"
      label="完成时间"
    />
    <el-table-column
      prop="weight"
      label="体重"
      width="120"
    />
    <el-table-column
      prop="length"
      label="长度"
      width="120"
    />
    <el-table-column
      prop="class_id"
      label="班级"
    />
    <el-table-column
      prop="pass_word"
      label="密码"
    />
  </el-table>
</template>
<script>
import { getAllInfo } from '../../api/user'
import moment from 'moment'
export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getAllInfo().then(res => {
        res.items.forEach(eve => {
          eve.create_date = eve.create_date ? moment(eve.create_date).format('YYYY-MM-DD') : '暂无'
          eve.finish_date = eve.finish_date ? moment(eve.finish_date).format('YYYY-MM-DD') : '暂无'
        })
        this.tableData = res.items
      }).finally(x => {

      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style>

</style>
