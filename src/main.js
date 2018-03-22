import Vue from "vue";
import App from "./App.vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import "swiper/dist/css/swiper.css";
import "./config/rem.js";
import "./scss/init.scss";

Vue.use(VueAwesomeSwiper /* { default global options } */);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
