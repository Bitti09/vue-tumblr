<template>
  <a-card style="width: 100%" title="Source / Likes / Reblogs">
    Source:
    <router-link v-if="reblogname" :to="vars">
      <a-tag color="green">
        <a-icon type="pushpin" />
        {{ reblogname }}
      </a-tag> </router-link
    ><span v-if="!reblogname"
      ><a-tag color="red"><a-icon type="pushpin" /> No Source </a-tag></span
    >
    <br /><br />
    Likes / Reblogs:<br />
    <span v-for="note in notes" :key="note.index">
      <router-link v-if="note.type == 'like'" :to="varslike(note)">
        <a-tag color="red">
          <a-icon type="heart" />
          {{ note.blog_name }}
        </a-tag>
      </router-link>
      <router-link v-if="note.type == 'reblog'" :to="varslike(note)">
        <a-tag color="blue">
          <a-icon type="link" />
          {{ note.blog_name }}
        </a-tag>
      </router-link>
    </span>
  </a-card>
</template>
<style scoped></style>
<script>
export default {
  props: ["notes", "reblogid", "reblogname"],
  computed: {
    vars() {
      var x = {
        name: "BlogPosts",
        params: { User: this.reblogname, page: "1", filter: "all" },
      };
      return x;
    },
  },
  methods: {
    varslike(note) {
      const val = {
        name: "BlogPosts",
        params: { User: note.blog_name, page: "1", filter: "all" },
      };
      return val;
    },
  },
};
</script>
