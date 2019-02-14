<template>
    <div class="app-goods">
      <div class="goods-img">
        <router-link :to="'/goodsdetail/'+goods.id">
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
    </div>
</template>

<script>
export default {
  name: 'goods',
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
    .app-goods {
    }
</style>
