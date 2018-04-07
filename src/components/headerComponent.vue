<template>
  <div class="header">
      <section class="search">
        <span class="header-logo">MI</span>
        <span class="header-search" @click="$router.push('/search')"><i class="iconfont icon-search-o"></i> 搜索商品名称</span>
        <span v-if="user_info.state" class="hearder-login" @click="$router.push('/mine')"><i class="iconfont icon-user-o"></i> </span>
         <span v-else class="hearder-login" @click="$router.push('/loginin')"><i class="iconfont icon-user-o"></i> </span>
      </section>
      <nav class="nav-wrap">
        <ul class="topNav">
          <li v-for="(nav,index) in navData" :key="nav.id" ><span :class="{'nav-active':nav.isActive}" @click="activeChange(index)">{{nav.name}}</span></li>
        </ul>
      </nav>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "headerComponent",
  data() {
    return {
      navData: []
    };
  },
  computed: {
    ...mapState(["user_info"])
  },
  methods: {
    activeChange(index) {
      for (let i = 0; i < this.navData.length; i++) {
        if (i !== index) {
          this.$set(this.navData[i], "isActive", false);
        } else {
          this.$set(this.navData[i], "isActive", true);
        }
      }
    }
  },
  created() {
    this.axios
      .get("/static/server/home.json")
      .then(res => {
        this.navData = res.data.nav_name;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>


<style lang="scss" scoped>
$mi-color: rgb(245, 161, 6);
.header {
  position: fixed;
  width: 3.6rem;
  height: 0.8rem;
  left: 0;
  top: 0;
  background-color: #f2f2f2;
  z-index: 99;
}
.search {
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.header-logo {
  width: 0.5rem;
  font-size: 0.2rem;
  font-weight: bolder;
  color: $mi-color;
}
.header-search {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0.05rem;
  width: 2.6rem;
  height: 0.3rem;
  font-size: 0.14rem;
  background-color: #fff;
  border-radius: 0.02rem;
  border: solid 0.01rem #ccc;
  outline: none;
}
.icon-search-o {
  font-size: 0.2rem;
}
.icon-user-o {
  font-size: 0.25rem;
}
.hearder-login {
  width: 0.4rem;
  text-align: center;
}

.nav-wrap {
  overflow: auto;
}
.nav-wrap::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.topNav {
  display: flex;
  width: auto;
  white-space: nowrap;
}
.topNav li {
  padding: 0 0.14rem;
  font-size: 0.12rem;
}
.topNav span {
  display: inline-block;
  padding: 0.03rem 0 0.09rem;
}
.nav-active {
  color: $mi-color;
  border-bottom: solid 0.02rem $mi-color;
}
</style>

