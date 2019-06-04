<template>
  <div>
    <div class="forum-listing">
      <div class="forum-details">
        <router-link
          class="text-xlarge"
          :to="{name: 'Forum', params: {id: forum['.key']}}"
        >
          {{forum.name}}
        </router-link>
        <p>{{forum.description}}</p>
      </div>
      <div class="threads-count">
        <p><span class="count">{{threadCount}}</span>
          {{threadCount === 1 ? 'thread' : 'threads'}}</p>
      </div>
      <div class="last-thread">
        <!-- TODO: implement later -->
      </div>

    </div>
  </div>
</template>

<script>
import { countObjectProperties } from "@/utils";

export default {
  props: {
    forum: {
      required: true,
      type: Object
    }
  },

  computed: {
    threadCount() {
      return countObjectProperties(this.forum.threads);
    }
  }
};
</script>

<style>
.forum-wrapped {
  width: 100%;
}
</style>