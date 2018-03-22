import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Phone from "./views/Phone.vue";
import Commodity from "./views/Commodity.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/phone",
      name: "phone",
      component: Phone
    },
    {
      path: "/commodity/:id",
      name: "Commodity",
      component: Commodity,
      props: true
    }
  ]
});
