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
            <img src="http://127.0.0.1:3000/img/goods/tea.jpg"/>
          </div>
          <div class="marker" @mousemove="mirrorMove($event)">
            <div class="mirror" :style="mirrorStyle"></div>
          </div>
        </div>
        <div class="sm">
          <div class="inner">
            <div>
              <img src="http://127.0.0.1:3000/img/goods/tea.jpg"/>
            </div>
            <div>
              <img src="http://127.0.0.1:3000/img/goods/tea.jpg"/>
            </div>
            <div>
              <img src="http://127.0.0.1:3000/img/goods/tea.jpg"/>
            </div>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="title">风景_古人山水（3）50-50</div>
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
      }
    }
  },
  methods: {
    mirrorMove (e) {
      let x = e.offsetX
      let y = e.offsetY
      this.mirrorStyle.top = y + 'px'
      this.mirrorStyle.left = x + 'px'
    }
  }
}
</script>
<style scoped>
</style>
