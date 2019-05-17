<template>
  <div class="col-full">
    <div class="col-large push-top">
      <!-- <h1>{{ thread.title }}
        <router-link
          :to="{name: 'ThreadEdit', id: 'this.id'}"
          class="btn-green btn-small"
          tag="button"
        >
          Edit Thread
        </router-link>
      </h1>
      <p>
        By <a
          href="#"
          class="link-unstyled"
        >{{user.name}}</a>,
        <AppDate :timeStamp="thread.publishedAt" />.
        <span
          style="float:right; margin-top: 2px;"
          class="hide-mobile text-faded text-small"
        >{{repliesCount}} replies by {{contributorsCount}} contributors</span>
      </p>
      <PostList :posts="posts" />
      <PostEditor :threadId="id" /> -->

    </div>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostEditor from "@/components/PostEditor";
import firebase from "firebase";

export default {
  components: {
    PostList,
    PostEditor
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },

  computed: {
    posts() {
      const postIds = Object.values(this.thread.posts);
      return Object.values(this.$store.state.posts).filter(post =>
        postIds.includes(post[".key"])
      );
    },

    user() {
      return this.$store.state.users[this.thread.userId];
    },

    repliesCount() {
      return this.$store.getters.repliesCount(this.thread[".key"]);
    },

    contributorsCount() {
      // find the replies
      const replies = Object.keys(this.thread.posts)
        .filter(postId => postId !== this.thread.firstPostId)
        .map(postId => this.$store.state.posts[postId]);

      // get the user id
      const userIds = replies.map(post => post.userId);
      // count the unique ids
      return userIds.filter((item, index) => index === userIds.indexOf(item))
        .length;
    },

    thread() {
      return this.$store.state.threads[this.id];
    }
  },

  created() {
    console.log("🚌.. running (created lifecycle)..", this.id);

    firebase
      .database()
      .ref("threads")
      .child(this.id)
      .on("value", snapshot => {
        const thread = snapshot.val();

        this.$store.commit("setThread", {
          threadId: "",
          thread: { ...thread, ".key": snapshot.key }
        });
      });
  }
};
</script>
