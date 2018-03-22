<template>
  <div id="app">
      <transition :name="transitionName">
         <router-view class="child-view"></router-view>
      </transition> 
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      transitionName: "slide-left",
      nowUrl: "/"
    };
  },
  methods: {},
  watch: {
    $route(to, from) {
      if (to.path == "/") {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    }
  }
};
</script>


<style lang="scss">
$mi-color: rgb(245, 161, 6);
html,
body,
#app {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3c3c3c;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}


.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  margin-bottom: 0.5rem;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
