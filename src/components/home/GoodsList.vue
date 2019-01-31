<template>
    <div class="app-goods-list">
      <div class="pos">
        <div>您当前的位置：</div>
        <el-breadcrumb size="small" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in cidList" :key="item" :to="'/goodslist?cid='+item">{{getCName(item)}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{getCName(this.lastbdc)}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main">
        <div class="side">
          <div class="category">
            <div class="category-inner">
              <div class="title">{{cidList.length >= 2 ? getCName(this.lastbdc) : categoryList.name}}</div>
              <div class="subtitle" v-for="item in categoryList.children" :key="item.id">
                <div class="t">
                  <router-link :to="'/goodslist?cid='+handleLastbdc()+'-'+item.id">{{item.name}}</router-link>
                </div>
                <div class="inner" v-if="item.children!=undefined">
                  <div  v-for="ctg in item.children" :key="ctg.id">
                    <router-link :to="'/goodslist?cid='+lastbdc+'-'+item.id+'-'+ctg.id">{{ctg.name}}</router-link>
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
              <div v-for="item in conditionList" :key="item.id" :class="{'active': cdtIndex == item.id}" @click="changeCdt(item.id)">{{item.name}}</div>
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
              <el-button type="primary" size="small" @click="handleSort('saleqty')">销量 <i :class="{'el-icon-sort':qtyFlag == 1,'el-icon-sort-down':qtyFlag == 0,'el-icon-sort-up':qtyFlag == 2}"></i></el-button>
            </div>
            <div>
              <el-button type="primary" size="small" @click="handleSort('score')">评分 <i :class="{'el-icon-sort':scoreFlag == 1,'el-icon-sort-down':scoreFlag == 0,'el-icon-sort-up':scoreFlag == 2}"></i></el-button>
            </div>
            <div>
              <el-button type="primary" size="small" @click="handleSort('price')">价格 <i :class="{'el-icon-sort':priceFlag == 1,'el-icon-sort-down':priceFlag == 0,'el-icon-sort-up':priceFlag == 2}"></i></el-button>
            </div>
          </div>
          <div class="goods-list">
            <div v-for="item in goodsList" :key="item.id">
              <goods-info :goods="item"></goods-info>
            </div>
          </div>
          <div class="pager">
            <el-pagination
              background
              :page-size="pageSize"
              :current-page="pageNo"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import GoodsInfo from '../common/GoodsInfo'
export default {
  name: 'goods-list',
  components: {
    GoodsInfo
  },
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
      conditionList: [
        {
          id: '1',
          name: '不限'
        }, {
          id: '2',
          name: '<1000'
        }, {
          id: '3',
          name: '1000-3000'
        }, {
          id: '4',
          name: '3000-8000'
        }, {
          id: '5',
          name: '>8000'
        }
      ],
      conditionMap: {
        '1': '不限',
        '2': '<1000',
        '3': '1000-3000',
        '4': '3000-8000',
        '5': '>8000'
      },
      cdtIndex: 0,
      lastbdc: '',
      goodsList: [],
      pageNo: 1,
      pageSize: 9,
      total: 9,
      qtyFlag: 1,
      priceFlag: 1,
      scoreFlag: 1,
      sortCol: ''
    }
  },
  created: function () {
    this.init()
    this.queryGoodsList(this.lastbdc)
  },
  methods: {
    getCName (str) {
      let arr = str.split('-')
      return this.categoryName[arr[arr.length - 1]]
    },
    changeCdt (index) {
      this.cdtIndex = index
    },
    handleLastbdc () {
      let arr = this.lastbdc.split('-')
      if (arr.length >= 3) {
        return arr[0] + '-' + arr[1]
      } else {
        return this.lastbdc
      }
    },
    init () {
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
      this.lastbdc = temparr.pop()
      this.cidList = temparr
      this.categoryName = this.commonMemory.categoryName
    },
    queryGoodsList (cid) {
      let myflag = 1
      if (this.sortCol === 'price') {
        myflag = this.priceFlag
      } else if (this.sortCol === 'score') {
        myflag = this.scoreFlag
      } else if (this.sortCol === 'saleqty') {
        myflag = this.qtyFlag
      }
      this.$http.get('/getGoodsWithCondition', {
        params: {cid: cid, orderby: this.sortCol, orderbyflag: myflag}
      }).then(result => {
        if (result.resultCode === result.SUCCESS) {
          this.goodsList = result.data
          // this.total = this.goodsList.length
        }
      })
    },
    handleSort (type) {
      this.sortCol = type
      if (type === 'price') {
        this.scoreFlag = 1
        this.qtyFlag = 1
        this.priceFlag++
        if (this.priceFlag >= 3) {
          this.priceFlag = 0
        }
      } else if (type === 'score') {
        this.priceFlag = 1
        this.qtyFlag = 1
        this.scoreFlag++
        if (this.scoreFlag >= 3) {
          this.scoreFlag = 0
        }
      } else if (type === 'saleqty') {
        this.priceFlag = 1
        this.scoreFlag = 1
        this.qtyFlag++
        if (this.qtyFlag >= 3) {
          this.qtyFlag = 0
        }
      }
    }
  },
  watch: {
    '$route': function () {
      this.init()
    }
  }
}
</script>
<style scoped>
    .app-goods-list {
    }
</style>
