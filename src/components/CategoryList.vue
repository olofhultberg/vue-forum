<template>
  <div>

    <CategoryListItem
      v-for="category in categories"
      :category="category"
      :key="category['.key']"
    />

  </div>
</template>

<script>
import CategoryListItem from "@/components/CategoryListItem";

export default {
  components: {
    CategoryListItem
  },
  props: {
    categories: {
      required: true,
      type: Array
    }
  }
};
</script>
<style>
.forum-wrapped {
  width: 100%;
}
</style>
