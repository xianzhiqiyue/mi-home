<template>
  <div class="footer">
      <ul>
        <li :class="{'footer-action':navAction==1}">
         <i class="iconfont icon-home-o"  @click="$router.push('/')"></i>
          <span>首页</span> </li>
        <li  :class="{'footer-action':navAction==4}">
         <i class="iconfont icon-view-matrix-o"></i>
          <span>分类</span> 
        </li>
        <li  :class="{'footer-action':navAction==2}">
           <i class="iconfont icon-shopping-cart-o"  @click="$router.push('/shoppingcart')"></i>
          <span>购物车</span>
          </li>
        <li  :class="{'footer-action':navAction==3}">
         <i class="iconfont icon-user-o" @click="$router.push('/mine')"></i> 
          <span>我的</span>
          </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: "footerComponent",
  data() {
    return {
      navAction: 1
    };
  },
  mounted() {
    switch (this.$route.name) {
      case "home":
        this.navAction = 1;
        break;
      case "shoppingcart":
        this.navAction = 2;
        break;
      case "Mine":
        this.navAction = 3;
        break;
    }
  }
};
</script>

<style lang="scss" scoped>
$mi-color: rgb(245, 161, 6);
.footer {
  position: fixed;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 3.6rem;
  height: 0.6rem;
  font-size: 0.12rem;
  background-color: #fff;
}
.iconfont {
  font-size: 0.24rem;
}
.footer ul {
  display: flex;
  height: 0.6rem;
  align-items: center;
  justify-content: space-around;
}
.footer ul li {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.footer-action {
  color: $mi-color;
}
</style>
