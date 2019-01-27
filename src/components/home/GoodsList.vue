<template>
    <div class="app-goods-list">
      <div class="pos">
        <div>您当前的位置：</div>
        <el-breadcrumb size="small" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in cidList" :key="item" to="/goodslist?cid=">{{getCName(item)}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main">
        <div class="side">
          <div class="category">
            <div class="category-inner">
              <div class="title">{{categoryList.name}}</div>
              <div class="subtitle" v-for="item in categoryList.children" :key="item.id">
                <div class="t">{{item.name}}</div>
                <div class="inner" v-if="item.children!=undefined">
                  <div  v-for="ctg in item.children" :key="ctg.id">
                    {{ctg.name}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="recommend">
            <div class="badge">推荐</div>
            <div class="inner">
              <div class="item" v-for="item in rcmdList" :key="item.id">
                <div>
                  <img :src="item.src" alt="">
                </div>
                <div>
                  <p>{{item.title}}</p>
                  <span class="n">¥{{item.sprice.toFixed(2)}}</span><span class="o"><del>¥{{item.mprice.toFixed(2)}}</del></span>
                </div>
              </div>
            </div>
          </div>
          <div class="condition">
            <div class="p">
              <div>价格：</div>
              <div v-for="(item,i) in conditionList" :key="i" :class="{'active': cdtIndex == i}" @click="changeCdt(i)">{{item}}</div>
            </div>
            <div class="in">
              <el-input size="mini" class="w"></el-input><span> -</span>
              <el-input size="mini" class="w"></el-input>
              <el-button size="mini" type="primary">确定</el-button>
            </div>
          </div>
          <div class="sort">
            <div>排序：</div>
            <div>
              <el-button type="primary" size="small">销量 <i class="el-icon-sort"></i></el-button>
            </div>
            <div>
              <el-button type="primary" size="small">评分 <i class="el-icon-sort-down"></i></el-button>
            </div>
            <div>
              <el-button type="primary" size="small">价格 <i class="el-icon-sort-up"></i></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'goods-list',
  data () {
    return {
      rcmdList: [
        {
          id: 1,
          src: 'http://127.0.0.1:3000/img/goods/rcmd.jpg',
          title: '陆羽会精选：2014老漫洒普洱茶饼（生）360g/饼',
          sprice: 1906,
          mprice: 2380
        },
        {
          id: 2,
          src: 'http://127.0.0.1:3000/img/goods/rcmd.jpg',
          title: '陆羽会精选：2014麻黑普洱茶饼（生）360g/饼',
          sprice: 1056,
          mprice: 1320
        }
      ],
      categoryid: '',
      cidList: [],
      categoryName: {},
      categoryList: {},
      conditionList: ['不限', '<1000', '1000-3000', '3000-8000', '>8000'],
      cdtIndex: 0
    }
  },
  created: function () {
    let cid = this.$route.query.cid
    let arr = cid.split('-')
    let temp = ''
    let temparr = []
    for (let item of arr) {
      temp += item
      temparr.push(temp)
      temp += '-'
    }
    let list = this.commonMemory.category
    if (arr.length === 1) {
      for (let ctg of list) {
        if (arr[0] * 1 === ctg.id) {
          this.categoryList = ctg
          break
        }
      }
    } else {
      let tempobj = {}
      for (let ctg of list) {
        if (arr[0] * 1 === ctg.id) {
          tempobj = ctg
          break
        }
      }
      for (let ctg1 of tempobj.children) {
        if (arr[1] * 1 === ctg1.id) {
          this.categoryList = ctg1
          break
        }
      }
    }
    this.categoryid = arr[arr.length - 1]
    this.cidList = temparr
    this.categoryName = this.commonMemory.categoryName
  },
  methods: {
    getCName (str) {
      let arr = str.split('-')
      return this.categoryName[arr[arr.length - 1]]
    },
    changeCdt (index) {
      this.cdtIndex = index
    }
  }
}
</script>
<style scoped>
    .app-goods-list {
    }
</style>
