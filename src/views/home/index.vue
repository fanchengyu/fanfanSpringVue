<template>
  <div style="width：100%">
    <el-row class=" grid-content" style="padding:30px">
      <el-col :span="4"> <el-button type="primary" icon="el-icon-plus" @click="addFormShow">新增</el-button></el-col>
    </el-row>
    <el-row class="grid-content bg-purple">
      <el-table
        :data="tableData"
        style="width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
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
          width="120"
        />
        <el-table-column
          prop="weight"
          label="体重"
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
        <el-table-column label="操作" width="160">
          <template v-slot="{$index,row}">
            <el-button
              size="mini"
              @click="handleEdit($index, row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-drawer
      style="width:100%"
      title="我是标题"
      :visible.sync="formDialog"
      :with-header="false"
    >
      <el-form ref="form" :model="form" label-width="80px" style="padding:30px;width:100%">
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.number" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex" size="medium">
            <el-radio-button label="男" />
            <el-radio-button label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="form.create_date"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="完成时间">
          <el-date-picker
            v-model="form.finish_date"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="重量">
          <el-input v-model="form.weight" />
        </el-form-item>
        <el-form-item label="长度">
          <el-input v-model="form.length" />
        </el-form-item>
        <el-form-item label="班级">
          <el-radio-group v-model="form.class_id" size="medium">
            <el-radio-button :label="1" />
            <el-radio-button :label="2" />
            <el-radio-button :label="3" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pass_word" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>

</template>
<script>
import { getAllInfo, deleteInfo, addUserInfo, editUserInfo } from '../../api/user'
import moment from 'moment'
export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      tableData: [],
      form: {
        name: '',
        number: '',
        sex: '男',
        create_date: '',
        finish_date: '',
        weight: '',
        length: '',
        class_id: 2,
        pass_word: ''

      },
      formDialog: false,
      addOrEdit: 'add',
      editId: ''
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
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteInfo(id).then(res => {
          this.$message.success('删除成功')
          this.initData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addFormShow() {
      this.addOrEdit = 'add'
      this.formDialog = true
    },
    onSubmit() {
      //
      this.formDialog = false
      if (this.addOrEdit === 'add') {
        addUserInfo(this.form).then(res => {
          this.$message.success('添加成功')
          this.initData()
        }).catch(e => {
        //
        })
      } else {
        const body = Object.assign({
          id: this.editId
        }, this.form)
        editUserInfo(body).then(res => {
          this.$message.success('编辑成功')
          this.initData()
        }).catch(e => {
        //
        })
      }
    },
    onCancel() {
      //
      this.formDialog = false
    },
    handleEdit(index, row) {
      this.editId = row.id
      this.addOrEdit = 'edit'
      this.formDialog = true
      Object.keys(this.form).forEach(each => {
        this.form[each] = row[each]
      })
    }
  }
}
</script>

<style>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
</style>
