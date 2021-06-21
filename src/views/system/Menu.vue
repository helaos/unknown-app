<template>
  <div>
    <!-- 表头按钮 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据表 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      stripe
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="perms" label="权限编码">
      </el-table-column>
      <el-table-column prop="icon" label="图标"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.type === 0">目录</el-tag>
          <el-tag size="small" type="success" v-else-if="scope.row.type === 1">菜单</el-tag>
          <el-tag size="small" type="info" v-else>按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="菜单URL"></el-table-column>
      <el-table-column prop="component" label="菜单组件"></el-table-column>
      <el-table-column prop="order" label="排序"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag size="small" type="success" v-if="scope.row.status === 1">正常</el-tag>
          <el-tag size="small" type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small">编辑</el-button>
          <el-button type="danger" @click="s(scope)" plain size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->

  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableData1: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        hasChildren: true
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 1rem;
}
</style>
