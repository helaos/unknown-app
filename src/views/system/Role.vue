<template>
  <div>
    <!-- 表头按钮 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="searchForm.name"
          placeholder="名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="obtainRoleList">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-popconfirm
          title="这是确定要批量删除吗？"
          confirmButtonType="primary"
          cancelButtonType="text"
          confirm-button-text="好的"
          cancel-button-text="不用了"
          icon="el-icon-question"
          icon-color="red"
          @confirm="delHandle(null)"
        >
          <el-button slot="reference" type="danger" :disabled="delBtnStatus">
            批量删除
          </el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>

    <!-- 主体 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>

      <el-table-column prop="name" label="名称" align="center" width="120">
      </el-table-column>
      <el-table-column
        prop="code"
        label="唯一编码"
        width="250"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="描述"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="80">
        <template slot-scope="scope">
          <el-tag size="small" type="success" v-if="scope.row.status === 1"
            >正常</el-tag
          >
          <el-tag size="small" type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="permHandle(scope.row.id)"
            plain
            size="small"
            >分配权限</el-button
          >
          <el-button
            type="primary"
            @click="editHandle(scope.row.id)"
            plain
            size="small"
            >编辑</el-button
          >
          <template>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              confirmButtonType="primary"
              cancelButtonType="text"
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-question"
              icon-color="red"
              @confirm="delHandle(scope.row.id)"
            >
              <el-button
                style="margin-left: 0.6rem"
                slot="reference"
                type="danger"
                plain
                size="small"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>

    <!-- 弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="38%"
      :before-close="handleClose"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editForm"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="唯一编码" prop="code" label-width="100px">
          <el-input v-model="editForm.perms" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="remark" label-width="100px">
          <el-input v-model="editForm.icon" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status" label-width="100px">
          <el-radio-group v-model="editForm.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 弹窗 -->
    <el-dialog
      title="分配权限"
      :visible.sync="permDialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <el-form :model="permForm">
        <el-tree
          :data="permTreeData"
          show-checkbox
          node-key="id"
          :props="defaultProps"
        >
        </el-tree>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, addRole, updateRole, getRoleInfo, removeRole } from '@/api/system/role'
import { getMenuList } from '@/api/system/menu'
export default {
  name: 'Role',
  data () {
    return {
      searchForm: {},
      editForm: {},
      delBtnStatus: true,
      tableData: [{
        id: 1,
        name: '王小虎',
        code: 'sys:role',
        remark: '上海市普陀区金沙江路 1518 弄',
        status: 1
      }, {
        id: 2,
        name: '王小虎',
        code: 'sys:admin',
        remark: '上海市普陀区金沙江路 1518 弄',
        status: 0
      }],
      total: 0,
      size: 10,
      current: 1,
      dialogVisible: false,
      permDialogVisible: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入角色姓名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入唯一编码', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
      multipleSelection: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      permForm: {},
      permTreeData: []
    }
  },
  created() {
    this.obtainRoleList()
    // getMenuList.then(res => {
    //   this.permTreeData = res.data.data.menuList
    // })
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val

      this.delBtnStatus = val.length === 0
    },

    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.size = val
      this.obtainRoleList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.total = val
      this.obtainRoleList()
    },

    handleClose () {
      this.resetForm('editForm')
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
      this.editForm = {}
    },

    obtainRoleList () {
      getRoleList(this.searchForm.name, this.current, this.size).then(res => {
        this.tableData = res.data.data.roleList
        this.size = res.data.data.size
        this.current = res.data.data.current
        this.total = res.data.data.total
      })
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editForm.id) {
            //TODO:马上写
            updateRole(this.editForm).then(res => {
              this.$message({
                showClose: true,
                message: '恭喜你，操作成功！',
                onClose: () => {
                  this.getMenuTree()
                }
              })
              this.dialogVisible = false
            })
          } else {
            //TODO:马上写
            addRole(this.editForm).then(res => {

            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    editHandle (id) {
      getRoleInfo(id).then(res => {
        this.editForm = res.data.data

        this.dialogVisible = true
      })
    },

    delHandle (id) {

      var ids = []

      if (id) {
        ids.push(id)
      } else {
        this.multipleSelection.forEach(row => {
          ids.push(row.id)
        })
      }

      console.log(ids)

      removeRole(ids).then(res => {
        this.$message({
          showClose: true,
          message: '恭喜你，操作成功！',
          onClose: () => {
            this.obtainRoleList()
          }
        })
      })
    },
    permHandle (id) {
      this.permDialogVisible = true
    }
  }
}
</script>

<style scoped>
.el-pagination {
  float: right;
  margin-top: 2rem;
}
</style>
