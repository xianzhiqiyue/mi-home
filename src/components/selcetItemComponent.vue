<template>
  
  <div class="select-item">
      <button class="shopping-cart">加入购物车</button>
      <div class="select-numer">
        <button><i class="iconfont icon-minus-o"></i></button><label>1</label><button><i class="iconfont icon-add-o"></i></button>
      </div>
      <div class="select-version">
        <h4>版本</h4>
        <ul class="select-version-item">
          <li v-for="item in commodity.specifications.versions" :key="item.key">{{item.version}}</li>
        </ul>
      </div>
      <div class="select-color">
        <h4>颜色</h4>
        <ul class="select-color-item">
          <li v-for="item in commodity.specifications.color" :key="item.key">{{item}}</li>
        </ul>
      </div>
      <div class="select-title">
        <div class="img-wrap"> <img :src="commodity.src" alt="#"></div>
        <div class="select-title-main">￥<span>{{select_version.price}}</span>
        <br>
          <span>{{select_version.version}}</span></div>
        <div><i class="iconfont icon-close-o"></i></div>
      </div>
    </div>
</template>

<script>
export default {
  name: "selectItemComponent",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.select-item {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  height: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;
}
.select-title {
  display: flex;
  justify-content: space-between;
  position: fixed;
}
.img-wrap {
  width: 100px;
}
.select-title-main {
  color: $mi-color;
  margin: 0 10px;
  span:first-child {
    font-size: 26px;
  }
  span:last-child {
    color: #000;
  }
}
</style>
