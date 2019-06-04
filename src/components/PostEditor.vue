<template>
  <div>
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          class="form-input"
          v-model="text"
        >
          </textarea>
      </div>
      <div class="form-actions">
        <button
          @click.prevent="cancel"
          class="btn btn-ghost"
        >Cancel</button>
        <button class="btn-blue">{{isUpdate ? 'Update' : 'Submit post'}}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    threadId: {
      required: false
    },
    post: {
      type: Object,
      validator: obj => {
        const isKeyValid = typeof obj[".key"] === "string";
        const isTextValid = typeof obj.text === "string";
        const valid = isKeyValid && isTextValid;

        if (!isKeyValid) {
          console.error("🤪 oops, post object needs a .key attribute..");
        }
        if (!isTextValid) {
          console.error(
            "🤪 Woohhhoo!!??, post object needs a text attribute.."
          );
        }
        return valid;
      }
    }
  },

  data() {
    return {
      text: this.post ? this.post.text : ""
    };
  },

  computed: {
    isUpdate() {
      return !!this.post;
    }
  },

  methods: {
    save() {
      (this.isUpdate ? this.update() : this.create()).then(post => {
        this.$emit("save", { post });
      });
    },

    cancel() {
      this.$emit("cancel");
    },

    create() {
      const post = {
        text: this.text,
        threadId: this.threadId
      };

      this.text = "";

      return this.$store.dispatch("createPost", post);
    },

    update() {
      const payload = {
        id: this.post[".key"],
        text: this.text
      };
      return this.$store.dispatch("updatePost", payload);
    }
  }
};
</script>
