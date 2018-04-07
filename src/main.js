import Vue from "vue";
import App from "./App.vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueLazyload from 'vue-lazyload'
import VueAxios from "vue-axios";
import ls from "store2";
import "swiper/dist/css/swiper.css";
import "./config/rem.js";
import "./scss/init.scss";
import { mapActions } from "vuex";


Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'assets/error.png',
  loading: 'assets/loading.gif',
  attempt: 1
})
// or with options
Vue.use(VueAwesomeSwiper /* { default global options } */ );
Vue.use(VueAxios, axios);
Vue.prototype.$ls = ls;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  methods: {
    ...mapActions(["changeCommodities", "loginIn"])
  },
  created() {
    if (this.$ls.has("commodities")) {
      this.changeCommodities(this.$ls("commodities"));
    }
    if (this.$ls.has("user_info")) {
      this.loginIn(this.$ls("user_info"));
    }
  },
  render: h => h(App)
}).$mount("#app");