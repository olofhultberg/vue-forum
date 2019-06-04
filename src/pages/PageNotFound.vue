<template>
  <div :class="$style.centered" class="col-full">
    <h1 :class="$style.headingLarge">Not found</h1>
    <p :class="$style.textLarge">Oops, we could´nt find what you were looking for. Why don´t you
      <router-link :to="{name: 'Home'}">go home instead</router-link>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style module>
.headingLarge {
  font-size: 100px;
}
.textLarge {
  font-size: 50px;
  font-weight: 100;
}
.centered {
  text-align: center;
}
</style>
