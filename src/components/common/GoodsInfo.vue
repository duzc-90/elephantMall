<template>
    <div class="app-goods-info">
      <div class="goods-img">
        <router-link to="/">
          <img :src="goods.imgurl" alt="">
        </router-link>
      </div>
      <div class="goods-name">
        <router-link to="/">
        {{goods.name}}
        </router-link>
      </div>
      <div class="goods-price-sale">售价：¥{{goods.saleprice.toFixed(2)}}</div>
      <div class="goods-price">市场价：<del>¥{{goods.price.toFixed(2)}}</del></div>
      <div class="goods-price">总销量：{{goods.saleqty}}</div>
      <el-rate
        :value="goods.score/2"
        disabled
        allow-half
        show-score>
      </el-rate>
      <div class="btns">
        <el-button size="small">
          <img src="../../assets/images/goods/addCart.png"/>
          加入购物车
        </el-button>
        <el-button size="small">
          <img src="../../assets/images/goods/store.png"/>
          收藏
        </el-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'GoodsInfo',
  date () {
    return {}
  },
  props: {
    goods: {
      type: Object
    }
  }
}
</script>

<style scoped>
</style>
