<template>
  <div class="commodity">
    <div class="main" :class="{'main-block':selectItemActive}">
      <div class="top">
        <div class="img-wrap"><img v-lazy="commodity.src" alt=""></div>
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
        <div class="select" @click="openSelectItem">
          <div >
            已选<span>{{select_version.version}}</span><span>{{select_color}}</span>
            </div><i class="iconfont icon-forward-o" ></i>
          </div>
        <div class="address">
          <div>送至<span>北京市 东城区</span><span>有现货</span></div><i class="iconfont icon-forward-o"></i></div>
        <div class="return">支持七天无理由退货</div>
      </div>
      <div class="comment">
        <h3><span>用户评价(35563)</span><span>满意度<i class="iconfont icon-forward-o"></i></span></h3>
        <div class="comment-title">
          <div class="user-wrap">
            <span class="user-avatar"><img v-lazy="first_comment.avatarUrl" alt=""></span>
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
        <transition name="fadedis">
          <ul v-if="main">
            <li v-for="item in commodity.discription" :key="item"><img v-lazy="item" alt=""></li>
          </ul>
        </transition>
        <transition name="fadedis">
          <ul v-if="!main">
            <li v-for="paramet in commodity.parameter" :key="paramet"><img v-lazy="paramet" alt=""></li>
          </ul>
        </transition>
      </div>
      <RecommendForYou>
      </RecommendForYou>
      
    </div>
    <div class="footer">
        <ul>
          <li @click="$router.push('/')">
          <i class="iconfont icon-home-o"></i>
            <span>首页</span> </li>
          <li>
          <i class="iconfont icon-shopping-cart-o"  @click="$router.push('/shoppingcart')"></i>
            <span>购物车</span> 
          </li>
          <li class="jion-shopping-cart0" @click="openSelectItem">
            <span>加入购物车</span>
          </li>
        </ul>
      </div>
      <transition name="fade">
      <div class="select-item" v-if="selectItemActive" >
        <div class="select-item-wrap">
          <div class="select-item-title">
            <div class="img-wrap"> <img v-lazy="commodity.src" alt="#"></div>
            <div class="select-title-main">￥<span>{{select_version.price}}</span>
              <br>
              <span>{{select_version.version}}</span></div>
            <div @click="closeSelectItem"><i class="iconfont icon-close-o"></i></div>
          </div>
          <div class="select-item-main">
            <div class="select-version">
              <h4>版本</h4>
              <ul class="select-version-item">
                <li v-for="(item,index) in commodity.specifications.versions" :class="{'select-atcive':index===versionStyleActive}" :key="item.id" @click="selectVersion(item,index)">
                  <span>{{item.version}}</span><span>{{item.price}}</span></li>
              </ul>
            </div>
            <div class="select-color">
              <h4>颜色</h4>
              <ul class="select-color-item">
                <li v-for="(item,index) in commodity.specifications.colors"  :class="{'select-atcive':index===colorStyleActive}" :key="item.id" @click="selectColor(item,index)">{{item}}</li>
              </ul>
            </div>
            <div class="select-numer">
              <h4>购买数量</h4>
              <div class="select-numer-main"><button  @click="sub"><i class="iconfont icon-minus-o"></i></button><label>{{selcetNumber}}</label><button @click="add"><i class="iconfont icon-add-o"></i></button></div>
            </div>
          </div>
          <button class="jion-shopping-cart" @click="goBuy">加入购物车</button>
        </div>
      </div>
      </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import RecommendForYou from "@/components/RecommendForYou.vue";
export default {
  name: "Commodity",
  data() {
    return {
      comment: {},
      first_comment: {},
      commodity: {},
      select_version: {},
      versionStyleActive: 0,
      select_color: "",
      colorStyleActive: 0,
      main: true,
      selectItemActive: false,
      selcetNumber: 1,
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
    ...mapState(["commodities"]),
    simpleScore() {
      return this.score[this.comment.comments[0].score - 1];
    }
  },
  created() {
    /* 
    this.$ls(false); */
    this.fetchData();
    window.scrollTo(0, 0);
  },
  watch: {
    $route() {
      this.fetchData();
    }
  },
  methods: {
    ...mapActions(["changeCommodities"]),
    //加入购物车
    goBuy() {
      //判断购物车里是否有这个品种，有的话数量+1
      if (this.commodities.hasOwnProperty(this.select_version.NO)) {
        this.selcetNumber += this.commodities[this.select_version.NO].number;
      }
      //将version里的NO，本来应该写成ID才对！拿出来用作键名
      const com = Object.assign({}, this.select_version);
      com.color = this.select_color;
      com.number = this.selcetNumber;
      com.heading = this.commodity.heading;
      const data = {};
      data[com.NO] = com;
      this.changeCommodities(Object.assign({}, this.commodities, data));
      /* console.log(data);
      console.log(this.commodities);
      console.log(this.$ls()); */
      //初始化
      this.fetchData();
      this.selcetNumber = 1;
      //关闭版本选择栏
      this.closeSelectItem();
    },
    //切换下面的描述面板
    discriptChangeFalse() {
      this.main = false;
    },
    discriptChangeTrue() {
      this.main = true;
    },
    //加载页面时候取数据
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
            _this.select_color = commodity.data.specifications.colors[0];
          })
        )
        .catch(err => {
          console.log(err);
        });
    },
    selectVersion(version, index) {
      this.select_version = version;
      this.versionStyleActive = index;
    },
    //切换选择版本里面的激活class
    selectColor(color, index) {
      this.select_color = color;
      this.colorStyleActive = index;
    },
    closeSelectItem() {
      this.selectItemActive = false;
    },
    openSelectItem() {
      this.selectItemActive = true;
    },
    sub(e) {
      if (this.selcetNumber > 1) {
        this.selcetNumber--;
      }
    },
    add(e) {
      this.selcetNumber++;
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
.main {
  overflow: auto;
  height: 100%;
  margin-bottom: 0.6rem;
}
.main-block {
  height: 6.4rem;
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
  top: 0.1rem;
  padding: 0.03rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}
.icon-back-o {
  left: 0.1rem;
}
.icon-share-o {
  right: 0.1rem;
}
.title,
.detailed,
.comment {
  padding: 0.1rem 0.15rem;
  background-color: #fff;
}
.title {
  margin-bottom: 0.05rem;
  h2 {
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.18rem;
  }
}
.miaosu {
  font-size: 0.12rem;
}
.salePromotions {
  color: #f20;
  margin-right: 0.1rem;
}
.currentPrice {
  font-size: 0.26rem;
  font-weight: bolder;
  color: $mi-color;
  margin: 0.08rem 0;
}
.detailed {
  color: #999;
  font-size: 0.12rem;
  line-height: 0.3rem;
  margin-bottom: 0.1rem;
  span {
    color: #000;
    margin-left: 0.14rem;
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
  margin-left: 0.38rem;
}
.icon-forward-o {
  vertical-align: middle;
}
.comment {
  margin-bottom: 0.1rem;
  h3 {
    display: flex;
    justify-content: space-between;
    font-size: 0.12rem;
    line-height: 0.3rem;
    margin-bottom: 0.1rem;
    .iconfont {
      font-size: 0.14rem;
      margin-left: 0.05rem;
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
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 0.2rem;
  }
}
.user-name-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 0.2rem;
  font-size: 0.12rem;
}
.comment-time {
  color: #aaa;
}
.comment-simple {
  color: $mi-color;
}
.discript {
  background-color: #fff;
  margin-bottom: 0.1rem;
  img {
    width: 100%;
    height: auto;
  }
}
.discript-title {
  display: flex;
  line-height: 0.4rem;
  span {
    width: 50%;
    font-size: 0.13rem;
    text-align: center;
  }
}
.isActive {
  color: $mi-color;
}
.fadedis-enter-active,
.fadedis-leave-active {
  transition: opacity 0.5s;
}
.fadedis-enter,
.fadedis-leave-to {
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
  background-color: #fff;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.fade-enter-active {
  transition: transform 1s;
}
.fade-enter {
  transform: translate(0, 4.6rem);
}

.select-item-wrap {
  height: 4.6rem;
  position: absolute;
  bottom: 0;
  .jion-shopping-cart {
    border: none;
    background-color: $mi-color;
    width: 100%;
    height: 0.5rem;
    color: #fff;
  }
}
.select-item-title {
  display: flex;
  padding: 0.12rem;
  .img-wrap {
    width: 1rem;
  }
}
.select-title-main {
  color: $mi-color;
  margin: 0 0.1rem;
  width: 2rem;
  span:first-child {
    font-size: 0.26rem;
  }
  span:last-child {
    color: #000;
  }
}
.select-item-main {
  height: 2.85rem;
  padding: 0.12rem;
  overflow: auto;
  font-size: 0.13rem;
}
.select-version,
.select-color,
.select-numer {
  margin-bottom: 0.3rem;
  h4 {
    line-height: 0.4rem;
  }
}
.select-version-item {
  li {
    padding: 0.07rem 0.1rem;
    border: solid 0.01rem #f2f2f2;
    margin-bottom: 0.08rem;
    display: flex;
    justify-content: space-between;
  }
  .version-atcive {
    color: $mi-color;
    border: solid 0.01rem $mi-color;
  }
  .select-atcive {
    color: $mi-color;
    border: solid 0.01rem $mi-color;
  }
}

.select-color-item {
  display: flex;
  li {
    padding: 0.07rem 0.15rem;
    border: solid 0.01rem #f2f2f2;
    margin-right: 0.08rem;
  }
  .select-atcive {
    color: $mi-color;
    border: solid 0.01rem $mi-color;
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
  border: solid 0.01rem #eee;
  button {
    border: none;
    width: 0.3rem;
    height: 100%;
    background-color: #f5f5f5;
  }
  button:focus {
    outline: 0;
  }
  .iconfont {
    font-size: 0.2rem;
    font-weight: bold;
    color: #333;
  }
  .disabled {
    color: #aaa;
  }
  label {
    display: inline-block;
    text-align: center;
    width: 0.4rem;
    font-size: 0.16rem;
  }
}

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
  .jion-shopping-cart0 {
    color: #fff;
    background-color: $mi-color;
    width: 2.2rem;
    font-size: 0.16rem;
  }
}
.footer ul li {
  width: 0.7rem;
  height: 0.6rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}
</style>
