<template>

  <dir>
    <ForumListItem
      v-for="forum in forums"
      :forum="forum"
      :key="forum['.key']"
    />
  </dir>

</template>
<script>
import ForumListItem from "@/components/ForumListItem";

export default {
  components: {
    ForumListItem
  },

  props: {
    forums: {
      required: true,
      type: Array
    }
  }
};
</script>

