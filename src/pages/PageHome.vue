<template>
  <div class="col-full">
    <h1>Welcome to the forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import CategoryList from "@/components/CategoryList";

export default {
  computed: {
    categories() {
      return Object.values(this.$store.state.categories);
    }
  },

  methods: {
    ...mapActions(['fetchAllCategories', 'fetchForums'])

    
  },

  components: {
    CategoryList
  },

  created() {
    this.fetchAllCategories()
      .then(categories => {
        categories.forEach(category => this.fetchForums({ids: Object.keys(category.forums)}))
      })
  },

  
};
</script>
