<template>
    <div class="forum-wrapped">
      <div class="col-full">
          <div class="forum-header">
              <div class="forum-details">
                  <h1>{{forum.name}}</h1>
                  <p class="text-lead">{{forum.description}}</p>
              </div>
              <a href="new-thread.html" class="btn-green btn-small">Start a thread</a>
          </div>
      </div>

      <div class="col-full">
            <div class="category-item">
            
            </div>
        </div>

      <div class="col-full push-top" >
        <ThreadList :threads="threads"/>
      </div>

  </div>
</template>

<script>
import ThreadList from "@/components/ThreadList";
import sourceData from "@/data";

export default {
  components: {
    ThreadList
  },

  props: {
    id: {
      required: true,
      type: String
    }
  },

  computed: {
    forum() {
      return sourceData.forums[this.id];
    },

    threads() {
      const th = Object.values(sourceData.threads).filter(
        thread => thread.forumId === this.id
      );

      console.log(th);
      return th;
    }
  }
};
</script>

<style>
.forum-wrapped {
  width: 100%;
}
</style>
