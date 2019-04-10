<template>
  <div class="forum-list forum-wrapped">

    <h2 class="list-title">

      <router-link :to="{name: 'Category', params: {id: category['.key']}}">
        {{ category.name }}
      </router-link>
    </h2>

    <ForumList :forums="categoryForums" />

  </div>
</template>

<script>
import ForumList from "@/components/ForumList";
import sourceData from "@/data";

export default {
  components: {
    ForumList
  },
  props: {
    category: {
      required: true,
      type: Object
    }
  },
  computed: {
    categoryForums() {
      return Object.values(sourceData.forums).filter(
        forum => forum.categoryId === this.category[".key"]
      );
    }
  }
};
</script>

<style>
.forum-wrapped {
  width: 100%;
}
</style>
