
<template>
<div class="home">
<el-row display="margin-top:10px">
<el-input v-model="input" placeholder="请输入书名" style="display:inline-table; width: 30%; float:left"></el-input>
<el-button type="primary" @click="addBook()" style="float:left; margin: 2px;">新增</el-button>
</el-row>
<el-row>
<el-table :data="bookList"  highlight-current-row style="width: 100%" border >
<el-table-column prop="id" label="编号" min-width="100" >
<template slot-scope="scope"> {{ scope.row.pk }} </template>
</el-table-column>
<el-table-column prop="book_name" label="书名" min-width="100">
<template slot-scope="scope"> {{ scope.row.fields.book_name }} </template>
</el-table-column>
<el-table-column prop="add_time" label="添加时间" min-width="100">
<template slot-scope="scope"> {{ scope.row.fields.add_time }} </template>

</el-table-column>

<el-table-column label="操作" width="160">
   <template slot-scope="scope">
    <el-button size="mini" type="primary" plain @click = "delete_book(scope.row.pk)">删除</el-button>
   </template>
   </el-table-column>
</el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      input: '',
      bookList: []
    }
  },
  mounted: function () {
    this.showBooks()
  },
  methods: {

    delete_book(id){
      alert(id)
      this.$http.get('http://127.0.0.1:8000/backend/delete_book?id=' + id)
        .then((response) => {
          var res = JSON.parse(response.bodyText)
          if (res.error_num === 0) {
            this.showBooks()
          } else {
            this.$message.error('删除书籍失败，请重试')
            console.log(res['msg'])
          }
        })
    },
    addBook () {
      this.$http.get('http://127.0.0.1:8000/backend/add_book?book_name=' + this.input)
        .then((response) => {
          var res = JSON.parse(response.bodyText)
          if (res.error_num === 0) {
            this.showBooks()
          } else {
            this.$message.error('新增书籍失败，请重试')
            console.log(res['msg'])
          }
        })
    },
    showBooks () {
      this.$http.get('http://127.0.0.1:8000/backend/show_books')
        .then((response) => {
          var res = JSON.parse(response.bodyText)
          console.log(res)
          if (res.error_num === 0) {
            this.bookList = res['list']
          } else {
            this.$message.error('查询书籍失败')
            console.log(res['msg'])
          }
        })
    }
  }
}
</script>
<style>
 .el-table .warning-row {
   background: oldlace;
   }
  .el-table .success-row {
    background: #f0f9eb;
    }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  h1, h2 {
    font-weight: normal;
  }

  ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.el-table__body tr.current-row>td{
  background-color: #69A8EA !important;
  color: #fff;
}
</style>
