<template>
  <div id="app" class="app-main">
    <div class="header">
      <div class="l">
        <img src="./assets/images/home/logo.png" alt="">
      </div>
      <div class="r">
        <div class="r-item">
          <div><router-link to="/">我的账户</router-link></div>
          <div>|</div>
          <div><router-link to="/">我的订单</router-link></div>
          <div>|</div>
          <div><router-link to="/">申请开店</router-link></div>
          <div>|</div>
          <div><router-link to="/">商家管理</router-link></div>
          <div>|</div>
          <div><router-link to="/">使用帮助</router-link><i class="el-icon-question"></i></div>
        </div>
        <div class="r-item">
          <div>[</div>
          <a><router-link to="/">登录</router-link></a>
          <div>|</div>
          <router-link to="/" class="registe">免费注册</router-link>
          <div>]</div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
