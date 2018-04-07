<template>
  <div class="recommend">
    <swiper :options="swiperOption">
      <swiper-slide v-for="slide in recommend_swiper" :key="slide.id"><img v-lazy="slide.src" alt="#"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <ul class="inquiry">
      <li v-for="slide in recommend_inquiry" :key="slide.id"><img v-lazy="slide.src" alt="#"></li>
    </ul>
    <div class="hot-sale">
      <div class="hot-sale-top">
        <div class="hot-sale-left">
         <a ><img v-lazy="recommend_hotSale[0]" alt="#"></a>
         </div>
        <div class="hot-sale-right">
          <a ><img v-lazy="recommend_hotSale[1]" alt="#"></a>
          <a><img v-lazy="recommend_hotSale[2]" alt="#"></a>
        </div>
      </div>
      <a class="hot-sale-bottom" ><img v-lazy="recommend_hotSale[3]" alt="#"></a>
    </div>
    <div class="flash-sale">
      <h3>小米闪购</h3>
        <ul class="flash-sale-main">
          <li v-for="flashSale in recommend_flashSale" :key="flashSale.id" @click="Redirection(flashSale.href)">
            <img v-lazy="flashSale.src" alt="#">
            <p class="flash-sale-price"><span>{{flashSale.currentPrice}}</span><span>{{flashSale.purchasePrice}}</span>
            </p>
          </li>
        </ul> 
    </div>
    <div class="daily-selection">
      <h3><img v-lazy="recommend_dailySelection.title" alt=""></h3>
      <ul class="daily-selection-main">
          <li v-for="dailySelection in recommend_dailySelection.main" :key="dailySelection.id" @click="Redirection(dailySelection.href)">
            <img v-lazy="dailySelection.src" alt="#">
             <p class="daily-selection-price"><span>{{dailySelection.heading}}</span>
             <p class="daily-selection-price"><span>{{dailySelection.resume}}</span>
             <p class="daily-selection-price"><span>{{dailySelection.currentPrice}}</span>
            </p>
          </li>
        </ul> 
    </div>
  </div>
</template>


<script>
export default {
  name: "recommendComponent",
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 5000 //5秒切换一次
        },
        pagination: {
          el: ".swiper-pagination"
        }
      },
      recommend_swiper: [],
      recommend_inquiry: [],
      recommend_hotSale: [],
      recommend_new1Sale: "",
      recommend_new2Sale: "",
      recommend_new3Sale: "",
      recommend_flashSale: [],
      recommend_dailySelection: []
    };
  },
  methods: {
    Redirection(id) {
      this.$router.push({
        path: id
      });
    }
  },
  created() {
    this.axios
      .get("/static/server/recommend.json")
      .then(res => {
        res.data.recommend_hotSale.forEach(sale => {
          this.recommend_hotSale.push(sale.src);
        });
        this.recommend_swiper = res.data.recommend_swiper;
        this.recommend_inquiry = res.data.recommend_inquiry;
        this.recommend_flashSale = res.data.recommend_flashSale;
        this.recommend_dailySelection = res.data.recommend_dailySelection;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>


<style lang="scss" scoped>
$mi-color: rgb(245, 161, 6);
.recommend {
  overflow: auto;
}
.swiper-container {
  height: 1.8rem;
  width: 100%;
  img {
    width: 100%;
    height: auto;
  }
}
.inquiry {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  width: 100%;
  li img {
    width: 100%;
    height: 100%;
  }
}

.hot-sale {
  display: flex;
  flex-direction: column;
}
.hot-sale-top {
  display: flex;
  flex-direction: row;
}
.hot-sale-left {
  flex-shrink: 1;
  flex-grow: 1;
  width: 50%;
  img {
    width: 100%;
    height: auto;
  }
}
.hot-sale-right {
  flex-grow: 1;
  flex-shrink: 1;
  width: 49.7%;
  margin-left: 0.03rem;
  display: flex;
  flex-direction: column;
  a {
    height: 50%;
    img {
      width: 100%;
      height: auto;
    }
  }
}
.hot-sale-bottom {
  img {
    width: 100%;
    height: auto;
  }
}

.flash-sale {
  height: 1.6rem;
  h3 {
    margin-left: 0.1rem;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.16rem;
    font-weight: bolder;
    color: $mi-color;
    text-align: left;
  }
}

.flash-sale-main {
  display: flex;
  padding: 0 0.03rem;
  overflow: auto;
  li {
    height: 1.2rem;
    margin: 0 0.03rem;
    img {
      height: 1rem;
      width: auto;
    }
    span:first-child {
      color: #f20;
    }
    span:nth-child(2) {
      text-decoration: line-through;
    }
  }
}

.flash-sale-price {
  display: flex;
  justify-content: space-around;
}

.daily-selection {
  h3 {
    img {
      width: 100%;
      height: auto;
    }
  }
}
.daily-selection-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 49.6%;
    text-align: left;
    img {
      width: 100%;
      height: auto;
    }
    p {
      padding: 0 0.05rem;
    }
    p:nth-child(2) {
      font-size: 0.14rem;
      font-weight: 600;
    }
    p:nth-child(3) {
      font-size: 0.12rem;
    }
    p:nth-child(4) {
      font-size: 0.14rem;
      color: #f20;
    }
  }
}
</style>

