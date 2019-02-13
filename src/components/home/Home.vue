<template>
    <div class="app-home">
      <div class="header">
        <div class="header-inner">
          <div class="nav">
            <div class="active" @click="home">首页</div>
            <div>商品分类</div>
          </div>
          <div class="cart">
            <div>
              <img src="../../assets/images/home/cart.png" alt="">
            </div>
            <div>购物车<span class="num">0</span>件</div>
            <div class="pay">去结算</div>
          </div>
        </div>
      </div>
      <div class="search">
        <div class="search-inner">
          <div>
            <el-cascader size="small"
              :options="categoryList"
              v-model="selectedOptions"
               @change="handleChange">
            </el-cascader>
          </div>
          <div>
            <el-input placeholder="请输入关键词" size="small">
              <div slot="append" class="btn">商品搜索</div>
            </el-input>
          </div>
          <div>
            热门搜索：华为手机|小米8
          </div>
        </div>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
      <div class="footer">
        <p class="links">
          <span>北京宗易汇网络科技有限公司 &nbsp;版权所有&nbsp;保留所有权利&nbsp;京ICP备15061705号-3</span>
        </p>
        <p class="links">
          <span>社会信用代码：911101083303521997 &nbsp;食品经营许可证编号：JY11108071215650</span>
        </p>
        <p class="links">
          <span>地址：北京市海淀区四道口路大钟寺怡和8号院7号楼&nbsp;电话：（010）82518900</span>
        </p>
        <p class="links">
          <span><img src="/upload/image/20170911/20170911161712_82845.png" alt=""></span>
          <a target="_blank" href="javascript:;">京公网安备 11010802024395号</a>
        </p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      categoryList: [],
      selectedOptions: []
    }
  },
  created: function () {
    this.$http.get('/getCategoryE').then(result => {
      if (result.resultCode === result.SUCCESS) {
        this.categoryList = result.data
      }
    })
  },
  methods: {
    handleChange (val) {
      this.$router.push('/goodslist?cid=' + val.join('-'))
    },
    home () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .search-inner >>> .el-input-group__append{
    background-color: #FFAF00;
    color: #ffffff;
  }
</style>
