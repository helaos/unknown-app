<template>
  <div>
    <!-- 表头按钮 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      stripe
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" align="center" width="150">
      </el-table-column>
      <el-table-column prop="perms" label="权限编码" align="center" width="150">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="图标"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column prop="type" label="类型" align="center" width="80">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.type === 0">目录</el-tag>
          <el-tag size="small" type="success" v-else-if="scope.row.type === 1">菜单</el-tag>
          <el-tag size="small" type="info" v-else>按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="path"
        label="菜单URL"
        align="center"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="component"
        label="菜单组件"
        align="center"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="order"
        label="排序"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="80">
        <template slot-scope="scope">
          <el-tag size="small" type="success" v-if="scope.row.status === 1"
            >正常</el-tag
          >
          <el-tag size="small" type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="143">
        <template slot-scope="scope">
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
                style="margin-left: 0.2rem"
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

    <!-- 弹窗 -->
    <el-dialog
      title="新增"
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
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="editForm.parentId" placeholder="请选择上级菜单">
            <template>
              <div v-for="item in tableData" :key="item.id">
                <el-option
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
                <template>
                  <div v-for="child in item.children" :key="child.id">
                    <el-option
                      :key="child.id"
                      :label="child.name"
                      :value="child.id"
                    >
                      <span>{{ "-" + child.name }}</span>
                    </el-option>
                  </div>
                </template>
              </div>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单名称" prop="name" label-width="100px">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="权限编码" prop="perms" label-width="100px">
          <el-input v-model="editForm.perms" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="图标" prop="icon" label-width="100px">
          <el-input v-model="editForm.icon" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="菜单URL" prop="path" label-width="100px">
          <el-input v-model="editForm.path" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="菜单组件" prop="component" label-width="100px">
          <el-input v-model="editForm.component" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type" label-width="100px">
          <el-radio-group v-model="editForm.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态" prop="status" label-width="100px">
          <el-radio-group v-model="editForm.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序" prop="order" label-width="100px">
          <el-input-number
            v-model="editForm.order"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('editForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuList, addMenu, updateMenu, getMenuInfo, removeMenu } from '@/api/system/menu'
export default {
  name: 'Menu',
  data () {
    return {
      dialogVisible: false,
      editForm: {
        order: 0
      },
      editFormRules: {
        parentId: [
          { required: true, message: '请选择上级菜单', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        perms: [
          { required: true, message: '请输入权限编码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ],
        order: [
          { required: true, message: '请填入排序号', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  created () {
    this.getMenuTree()
  },
  methods: {
    getMenuTree () {
      getMenuList().then(res => {
        this.tableData = res.data.data.menuList
      })
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editForm.id) {
            updateMenu(this.editForm).then(res => {
              this.$message({
                showClose: true,
                message: '编辑成功！',
                onClose: () => {
                  this.getMenuTree()
                }
              })
              this.dialogVisible = false
            })
          } else {
            addMenu(this.editForm).then(res => {
              this.$message({
                showClose: true,
                message: '创建成功！',
                onClose: () => {
                  this.getMenuTree()
                }
              })
              this.dialogVisible = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    editHandle (id) {
      getMenuInfo(id).then(res => {
        this.editForm = res.data.data

        this.dialogVisible = true
      })
    },

    handleClose () {
      this.resetForm('editForm')
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
      this.editForm = {
        order: 0
      }
    },

    delHandle (id) {
      removeMenu(id).then(res => {
        this.$message({
          showClose: true,
          message: '删除成功！',
          onClose: () => {
            this.getMenuTree()
          }
        })
      })
    },

  }
}
</script>

<style scoped>
</style>
