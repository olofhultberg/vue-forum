<template>
  <div
    id="app"
    class="push-top"
  >
    <TheNavbar />
    <div class="container push-top">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";

export default {
  components: {
    TheNavbar
  }
};
</script>


