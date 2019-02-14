<template>
  <div class="app-goods-detail">
    <div class="pos">
      <div>您当前的位置：</div>
      <el-breadcrumb size="small" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>test</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="detail">
      <div class="pic">
        <div class="md">
          <div class="inner">
            <img :src="imgurl"/>
          </div>
          <div class="marker" @mousemove="mirrorMove($event)"></div>
          <div class="mirror" :style="mirrorStyle"></div>
          <div class="bigimg">
            <img :src="imgurl" :style="bigStyle"/>
          </div>
        </div>
        <div class="sm">
          <div class="inner">
            <div v-for="item in picList" :key="item.id" @mouseover="smhover(item.imgurl)">
              <img :src="item.imgurl"/>
            </div>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="title">{{detailInfo.name}}</div>
        <div class="detailinfo">
          <p>销售价：<span class="p">¥{{detailInfo.saleprice}}</span></p>
          <p>市场价：<del>¥{{detailInfo.price}}</del></p>
          <div class="score">
            <div>顾客评分：</div>
            <div>
              <el-rate
                :value="detailInfo.score/2"
                disabled
                allow-half
                show-score>
              </el-rate>
            </div>
          </div>
          <p>库存：{{detailInfo.qty}}</p>
          <p>商家：{{detailInfo.sname}}</p>
          <p>商家联系方式：{{detailInfo.phone}}</p>
        </div>
        <div class="current">
          <div class="qty">
            购买数量：<el-input-number size="mini" v-model="num" :min="1" :max="9999999"></el-input-number>
          </div>
          <img src="http://127.0.0.1:3000/img/order/buy.jpg" alt="">
          <img src="http://127.0.0.1:3000/img/order/cartadd.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodsDetail',
  data () {
    return {
      mirrorStyle: {
        top: '200px',
        left: '200px'
      },
      bigStyle: {
        'margin-left': '0px',
        'margin-top': '0px'
      },
      detailInfo: {},
      picList: [],
      detailPicList: [],
      imgurl: '',
      num: 1
    }
  },
  created: function () {
    let gid = this.$route.params.gid
    console.log(gid)
    this.$http.get('/getGoodsById?gid=' + gid).then(result => {
      if (result.resultCode === result.SUCCESS) {
        this.detailInfo = result.data
        this.picList = result.data.picList
        this.detailPicList = result.data.detailPicList
        this.imgurl = this.picList[0].imgurl
        console.log(this.detailInfo)
      }
    })
  },
  methods: {
    mirrorMove (e) {
      let x = e.offsetX
      let y = e.offsetY
      if (x < 75) {
        x = 75
      } else if (x > 405) {
        x = 405
      }
      if (y < 75) {
        y = 75
      } else if (y > 405) {
        y = 405
      }
      this.bigStyle['margin-left'] = '-' + ((x - 75) * 1.8) + 'px'
      this.bigStyle['margin-top'] = '-' + ((y - 75) * 1.8) + 'px'
      this.mirrorStyle.top = (y - 65) + 'px'
      this.mirrorStyle.left = (x - 65) + 'px'
    },
    smhover (url) {
      this.imgurl = url
    }
  }
}
</script>
<style scoped>
</style>
