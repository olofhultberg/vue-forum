<template>
  <div>
    <div v-if="thread && user" class="thread">
      <div>
        <p>
          <router-link :to="{name: 'ThreadShow', params: {id: thread['.key']}}">{{thread.title}}</router-link>
        </p>
        <p class="text-faded text-xsmall">
          By
          <a href="#">{{user.name}}</a>
          ,
          <AppDate :timeStamp="thread.publishedAt" />.
        </p>
      </div>

      <div class="activity">
        <p class="replies-count">{{repliesCount}} replies</p>

        <!-- <img
          class="avatar-medium"
          src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png"
          alt
        >-->
        <!-- <div>
          <p class="text-xsmall">
            <a href="#">Bruce Wayne</a>
          </p>
          <p class="text-xsmall text-faded">2 hours ago</p>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { countObjectProperties } from "@/utils";

export default {
  props: {
    thread: {
      required: true,
      type: Object
    }
  },
  computed: {
    repliesCount() {
      return this.$store.getters.repliesCount(this.thread[".key"]);
    },
    user() {
      return this.$store.state.users[this.thread.userId];
    }
  }
};
</script>
