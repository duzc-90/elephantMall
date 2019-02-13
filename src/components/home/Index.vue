<template>
  <div>
    <div class="app-index">
      <div class="main">
        <div class="carousel">
          <el-carousel>
            <el-carousel-item v-if="bannerList.length>0" v-for="item in bannerList" :key="'key0-'+item.seq" :label="item.title">
              <img :src="item.src" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!--侧边栏一些消息-->
      <div class="side">
        <div class="news">
          <div class="news-title">
            <div>Shop资讯</div>
            <div>
              <router-link to="/">
                更多...
              </router-link>
            </div>
          </div>
          <ul class="news-info">
            <li><a href="javascript:;">端午节—以茶配粽更传统！</a></li>
            <li><a href="javascript:;">什么东西越来越值钱？</a></li>
            <li><a href="javascript:;">茶粽一味：端午粽情 采花茶意</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="app-index">
      <!--信息展示的主题部分-->
      <div class="main">
        <div class="category">
          <div class="category-title">
            <div class="th">商品分类</div>
            <a class="link" href="javascript:;">全部商品分类</a>
          </div>
          <div class="category-info" v-for="item in categoryList" :key="'key1-'+item.id">
            <div class="l th">
              <router-link :to="'/goodslist?cid='+item.id">
                <span>{{item.name}}</span>
              </router-link>
            </div>
            <div class="r">
              <div v-for="c in item.children" :key="'key2-'+c.id">
                <router-link :to="'/goodslist?cid='+item.id+'-'+c.id">
                {{c.name}}
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="goods-new">
          <div class="title th">最新商品<span class="desc">New Product</span></div>
          <div class="main">
            <goods v-for="item in goods_new" :goods="item" :key="'key3-'+item.id"></goods>
          </div>
        </div>
        <div class="goods-category" v-for="item in categoryList" :key="'key4-'+item.id">
          <div class="title">
            <div class="l">{{item.name}}</div>
            <div class="r">
              <div class="ctg" v-for="c in item.children" :key="'key5-'+c.id">
                <router-link to="/">
                {{c.name}}
                </router-link>
              </div>
              <div>
                <router-link to="/">
                更多商品...
                </router-link>
              </div>
            </div>
          </div>
          <div class="goods-info">
            <goods v-for="gl in goodsMap[item.id]" :goods="gl" :key="'key6-'+item.id+'-'+gl.id"></goods>
          </div>
        </div>
      </div>
      <!--侧边栏一些消息-->
      <div class="side">
        <div class="news">
          <div class="news-title">
            <div>团购商品</div>
            <div>
              <router-link to="/">
                更多...
              </router-link>
            </div>
          </div>
        </div>
        <div class="news">
          <div class="news-title">
            <div>限时抢购</div>
            <div></div>
          </div>
        </div>
        <div class="news">
          <div class="news-title">
            <div>热卖商品</div>
            <div></div>
          </div>
          <div class="goods-hot">
            <div class="hot-inner" v-for="item in goods_new" :key="'key7-'+item.id">
              <div class="img">
                <router-link to="/">
                  <img :src="item.imgurl" alt="">
                </router-link>
              </div>
              <div>
                <router-link to="/">
                {{item.name}}
                </router-link>
              </div>
              <div class="p">¥{{item.saleprice.toFixed(2)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Goods from '../common/Goods'
export default {
  name: 'index',
  components: {
    Goods
  },
  data () {
    return {
      bannerList: [],
      categoryList: [],
      goods_new: [],
      goodsMap: {}
    }
  },
  created: function () {
    this.$http.get('/getBanners').then(result => {
      this.bannerList = result
    })
    this.$http.get('/getCategory').then(result => {
      if (result.resultCode === result.SUCCESS) {
        this.categoryList = result.data
      }
    })
    this.$http.get('/getGoodsNew').then(result => {
      if (result.resultCode === result.SUCCESS) {
        this.goods_new = result.data
      }
    })
    this.$http.get('/getGoodsByCategoryId').then(result => {
      if (result.resultCode === result.SUCCESS) {
        this.goodsMap = result.data
      }
    })
  }
}
</script>

<style scoped>
    .app-index {
    }
</style>
