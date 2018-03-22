<template>
  <div class="footer">
      <ul>
        <li>
         <i class="iconfont icon-home-o"></i>
          <span>首页</span> </li>
        <li>
         <i class="iconfont icon-view-matrix-o"></i>
          <span>分类</span> 
        </li>
        <li>
           <i class="iconfont icon-shopping-cart-o"></i>
          <span>购物车</span>
          </li>
        <li>
         <i class="iconfont icon-user-o"></i> 
          <span>我的</span>
          </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: "footerComponent",
  data() {
    return {};
  }
};
</script>

<style lang="scss" >
$mi-color: rgb(245, 161, 6);
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 0.12rem;
  background-color: #fff;
}
.iconfont {
  font-size: 0.24rem;
}
.footer ul {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.footer ul li {
  height: 0.5rem;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.footer-action {
  color: $mi-color;
}
</style>
