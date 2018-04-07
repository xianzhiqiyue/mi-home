import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Phone from "./views/Phone.vue";
import Commodity from "./views/Commodity.vue";
import ShoppingCart from "./views/ShoppingCart.vue";
import LoginIn from "./views/LoginIn.vue";
import Search from "./views/Search.vue";
import Mine from "./views/Mine.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/phone",
      name: "phone",
      component: Phone
    },
    {
      path: "/commodity/:id",
      name: "commodity",
      component: Commodity,
      props: true
    },
    {
      path: "/shoppingcart",
      name: "shoppingcart",
      component: ShoppingCart
    },
    {
      path: "/loginin",
      name: "loginin",
      component: LoginIn
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/mine",
      name: "Mine",
      component: Mine
    }
  ]
});
