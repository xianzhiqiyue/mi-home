<template>
  <div class="home">
    <HeaderComponent></HeaderComponent>
    <RecommendComponent></RecommendComponent>
    <FooterComponent></FooterComponent>
  </div>
</template>


<script>
import RecommendComponent from "@/components/recommendComponent.vue";
import HeaderComponent from "@/components/headerComponent.vue";
import FooterComponent from "@/components/footerComponent.vue";

export default {
  name: "carrousel",
  data() {
    return {};
  },
  components: {
    RecommendComponent,
    HeaderComponent,
    FooterComponent
  }
};
</script>


<style lang="scss">

</style>

