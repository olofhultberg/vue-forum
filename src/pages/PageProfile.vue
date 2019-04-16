<template>
  <div>

    <div class="flex-grid">

      <!-- <UserProfileCard
        :user="this.user"
        :userPostCount="userPostCount"
        :userThreadCount="userThreadCount"
      /> -->

      <UserProfileCardEditor
        :user="this.user"
        :userPostCount="userPostCount"
        :userThreadCount="userThreadCount"
      />

      <div class="col-7 push-top">

        <div class="profile-header">
          <span class="text-lead">
            Joker's recent activity
          </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr>
        <PostList :posts="userPosts" />
      </div>
    </div>
  </div>

  </div>
</template>

<script>
import PostList from "@/components/PostList";
import UserProfileCard from "@/components/UserProfileCard";
import UserProfileCardEditor from "@/components/UserProfileCardEditor";
import { mapGetters } from "vuex";
import { countObjectProperties } from "@/utils";

export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },
  computed: {
    ...mapGetters({
      user: "authUser"
    }),

    userPostCount() {
      return countObjectProperties(this.user.posts);
    },

    userThreadCount() {
      return countObjectProperties(this.user.threads);
    },

    userPosts() {
      if (this.user.posts) {
        return Object.values(this.$store.state.posts).filter(
          post => post.userId === this.user[".key"]
        );
      }
      // If no posts we will return empty array
      return [];
    }
  }
};
</script>
