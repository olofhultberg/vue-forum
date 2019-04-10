<template>
  <div>
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>
      <ThreadListItem v-for="thread in threads" :thread="thread" :key="thread['.key']"/>
    </div>
  </div>
</template>

<script>
import ThreadListItem from "./ThreadListItem";

export default {
  props: {
    threads: {
      required: true,
      type: Array
    }
  },
  components: {
    ThreadListItem
  }
};
</script>
