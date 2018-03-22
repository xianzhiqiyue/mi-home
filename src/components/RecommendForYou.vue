<template>
  <div class="RecommendForYou">
      <h3>为您推荐</h3>
      <ul class="RecommendForYou-main">
          <li v-for="item in recommend" :key="item.key" @click="Redirection(item.href)">
              <img :src="item.src" alt="#">
              <div>{{item.heading}}</div>
              <div><span class="currentPrice">{{item.currentPrice}}</span><span class="purchasePrice" v-if="item.purchasePrice">{{item.purchasePrice}}</span></div>
          </li>
      </ul>

  </div>
</template>

<script>
export default {
  name: "RecommendForYou",
  data() {
    return {
      recommend: []
    };
  },
  methods: {
    Redirection(id) {
      this.$router.push({
        path: id
      });
      location.reload();
    }
  },
  created() {
    this.axios
      .get("/static/server/RecomendForYou.json")
      .then(res => {
        res.data.recomendforyou.forEach(element => {
          this.recommend.push(element);
        });
      })
      .then(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
$mi-color: rgb(245, 161, 6);
.RecommendForYou {
  background-color: #fff;
  h3 {
    padding: 0 15px;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }
}
.RecommendForYou-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 49%;
    img {
      width: 100%;
      height: auto;
    }
    div {
      padding: 0 15px;
      line-height: 30px;
    }
  }
}
.purchasePrice {
  text-decoration: line-through;
  font-size: 14px;
  color: #aaa;
}
.currentPrice {
  color: $mi-color;
  margin-right: 10px;
}
</style>
