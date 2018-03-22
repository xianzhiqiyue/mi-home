<template>
  <div class="commodity">
    <div class="top">
      <div class="img-wrap"><img :src="commodity.src" alt=""></div>
      <span><i class="iconfont icon-back-o" @click="$router.go(-1)"></i></span>
      <span><i class="iconfont icon-share-o"></i></span>
    </div>
    <div class="title">
      <h2>{{commodity.heading}}</h2>
      <div class="miaosu"><span class="salePromotions">{{commodity.salePromotions}}</span>
        <span class="resume">{{commodity.resume}}</span>
      </div>
      <div class="currentPrice"><span>{{commodity.currentPrice}}</span></div>
    </div>
    <div class="detailed">
      <div class="select">
        <div> 已选<span>{{select_version.version}}</span><span>{{select_color}}</span></div><i class="iconfont icon-forward-o"></i></div>
      <div class="address">
        <div>送至<span>北京市 东城区</span><span>有现货</span></div><i class="iconfont icon-forward-o"></i></div>
      <div class="return">支持七天无理由退货</div>
    </div>
    <div class="comment">
      <h3><span>用户评价(35563)</span><span>满意度<i class="iconfont icon-forward-o"></i></span></h3>
      <div class="comment-title">
        <div class="user-wrap">
          <span class="user-avatar"><img :src="first_comment.avatarUrl" alt=""></span>
          <span class="user-name-wrap"><span class="user-name">{{ first_comment.id}}</span><span class="comment-time">{{ first_comment.time}}</span></span>
        </div>
        <span class="comment-simple"><i class="iconfont" :class="simpleScore"></i></span>
      </div>
      <div class="comment-main">{{first_comment.comment}}</div>
    </div>
    <div class="discript">
      <div class="discript-title">
        <span :class="{isActive:main}" @click="discriptChangeTrue">概述</span>
        <span :class="{isActive:!main}" @click="discriptChangeFalse">参数</span>
      </div>
      <transition name="fade">
        <ul v-if="main">
          <li v-for="item in commodity.discription" :key="item"><img :src="item" alt=""></li>
        </ul>
      </transition>
      <transition name="fade">
        <ul v-if="!main">
          <li v-for="paramet in commodity.parameter" :key="paramet"><img :src="paramet" alt=""></li>
        </ul>
      </transition>
    </div>
    <RecommendForYou>
    </RecommendForYou>
    <div class="select-item">
      <div class="select-item-wrap">
        <div class="select-item-title">
          <div class="img-wrap"> <img :src="commodity.src" alt="#"></div>
          <div class="select-title-main">￥<span>{{select_version.price}}</span>
            <br>
            <span>{{select_version.version}}</span></div>
          <div><i class="iconfont icon-close-o"></i></div>
        </div>
        <div class="select-item-main">
          <div class="select-version">
            <h4>版本</h4>
            <ul class="select-version-item">
              <li v-for="item in commodity.specifications.versions" :key="item.key">
                <span>{{item.version}}</span><span>{{item.price}}</span></li>
            </ul>
          </div>
          <div class="select-color">
            <h4>颜色</h4>
            <ul class="select-color-item">
              <li v-for="item in commodity.specifications.color" :key="item.key">{{item}}</li>
            </ul>
          </div>
          <div class="select-numer">
            <h4>购买数量</h4>
            <div class="select-numer-main"><button disabled="disabled" class="disabled"><i class="iconfont icon-minus-o"></i></button><label>1</label><button><i class="iconfont icon-add-o"></i></button></div>
            
          </div>
        </div>
        <button class="jion-shopping-cart">加入购物车</button>
      </div>
    </div>
  </div>
</template>

<script>
import RecommendForYou from "@/components/RecommendForYou.vue";
export default {
  name: "Commodity",
  data() {
    return {
      comment: {},
      first_comment: {},
      commodity: {},
      select_version: {},
      select_color: {},
      main: true,
      score: [
        "icon-unsatisfy-o",
        "icon-unsatisfy-o",
        "icon-usually-o",
        "icon-usually-o",
        "icon-satisfy-o"
      ],
      discriptTitle: 1
    };
  },
  components: {
    RecommendForYou
  },
  computed: {
    simpleScore() {
      return this.score[this.comment.comments[0].score - 1];
    }
  },
  created() {
    this.fetchData();
    window.scrollTo(0, 0);
  },
  watch: {
    $route() {
      this.fetchData();
    }
  },
  methods: {
    discriptChangeFalse() {
      this.main = false;
    },
    discriptChangeTrue() {
      this.main = true;
    },
    fetchData() {
      let _this = this;
      function getCommodity(id) {
        return _this.axios.get(`/static/server/commodity/${id}.json`);
      }
      function getComment(id) {
        return _this.axios.get(`/static/server/comment/comment${id}.json`);
      }
      _this.axios
        .all([
          getCommodity(this.$route.params.id),
          getComment(this.$route.params.id)
        ])
        .then(
          _this.axios.spread(function(commodity, comment) {
            _this.commodity = Object.assign(
              {},
              _this.commodity,
              commodity.data
            );
            _this.comment = Object.assign({}, _this.comment, comment.data);
            _this.first_comment = Object.assign(
              {},
              _this.first_comment,
              comment.data.comments[0]
            );
            _this.select_version = Object.assign(
              {},
              _this.select_version,
              commodity.data.specifications.versions[0]
            );
            _this.select_color = commodity.data.specifications.color[0];
          })
        )
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
$mi-color: rgb(245, 161, 6);
.commodity {
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: #f1f1f1;
}
.top {
  position: relative;
}
.img-wrap {
  img {
    width: 100%;
    height: auto;
  }
}
.icon-back-o,
.icon-share-o {
  position: absolute;
  top: 10px;
  padding: 3px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}
.icon-back-o {
  left: 10px;
}
.icon-share-o {
  right: 10px;
}
.title,
.detailed,
.comment {
  padding: 10px 15px;
  background-color: #fff;
}
.title {
  margin-bottom: 5px;
  h2 {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
  }
}
.miaosu {
  font-size: 12px;
}
.salePromotions {
  color: #f20;
  margin-right: 10px;
}
.currentPrice {
  font-size: 26px;
  font-weight: bolder;
  color: $mi-color;
  margin: 8px 0;
}
.detailed {
  color: #999;
  font-size: 12px;
  line-height: 30px;
  margin-bottom: 10px;
  span {
    color: #000;
    margin-left: 14px;
  }
}
.select,
.address {
  display: flex;
  justify-content: space-between;
}
.address {
  span:last-child {
    color: $mi-color;
  }
}
.return {
  margin-left: 38px;
}
.icon-forward-o {
  vertical-align: middle;
}
.comment {
  margin-bottom: 10px;
  h3 {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 30px;
    margin-bottom: 10px;
    .iconfont {
      font-size: 14px;
      margin-left: 5px;
    }
  }
}
.comment-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-wrap,
.user-name-wrap {
  display: flex;
}
.user-avatar {
  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
}
.user-name-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
  font-size: 12px;
}
.comment-time {
  color: #aaa;
}
.comment-simple {
  color: $mi-color;
}
.discript {
  background-color: #fff;
  margin-bottom: 10px;
  img {
    width: 100%;
    height: auto;
  }
}
.discript-title {
  display: flex;
  line-height: 40px;
  span {
    width: 50%;
    font-size: 13px;
    text-align: center;
  }
}
.isActive {
  color: $mi-color;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.select-version-title {
  display: flex;
  .img-wrap {
    width: 20%;
  }
  img {
    width: 100%;
    height: auto;
  }
}
.select-item {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  height: 100%;
  z-index: 100;
}
.select-item-wrap {
  height: 460px;
  position: absolute;
  bottom: 0;
  .jion-shopping-cart {
    border: none;
    background-color: $mi-color;
    width: 100%;
    height: 50px;
    color: #fff;
  }
}
.select-item-title {
  display: flex;
  padding: 12px;
  .img-wrap {
    width: 100px;
  }
}
.select-title-main {
  color: $mi-color;
  margin: 0 10px;
  width: 200px;
  span:first-child {
    font-size: 26px;
  }
  span:last-child {
    color: #000;
  }
}
.select-item-main {
  height: 285px;
  padding: 12px;
  overflow: auto;
  font-size: 13px;
}
.select-version,
.select-color,
.select-numer {
  margin-bottom: 30px;
  h4 {
    line-height: 30px;
  }
}
.select-version-item {
  li {
    padding: 7px 10px;
    border: solid 1px #f2f2f2;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
  }
  .version-atcive {
    color: $mi-color;
    border: solid 1px $mi-color;
  }
}
.select-atcive {
  color: $mi-color;
  border: solid 1px $mi-color;
}
.select-color-item {
  display: flex;
  li {
    padding: 7px 15px;
    border: solid 1px #f2f2f2;
    margin-right: 8px;
  }
}
.select-numer {
  display: flex;
  justify-content: space-between;
}
.select-numer-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px #eee;
  button {
    border: none;
    width: 30px;
    height: 30px;
    background-color: #f5f5f5;
  }
  .iconfont {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
  .disabled {
    color: #aaa;
  }
  label {
    display: inline-block;
    text-align: center;
    width: 40px;
    font-size: 16px;
  }
}
</style>
