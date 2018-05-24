<template>
  <a-card style="width: 100%" title="Likes / Reblogs" >
<span v-for="note in notes" :key="note.index">

  <router-link
  v-if="note.type == 'like'"
    :to="{
      name: 'BlogPosts',
      params: { User: note.blog_name , page: '0', filter: 'all' }}">
    <a-tag color="red">
        <a-icon type="heart" />
{{note.blog_name}}
</a-tag>
</router-link>
      <router-link
      v-if="note.type == 'reblog'"
        :to="{
          name: 'BlogPosts',
          params: { User: note.blog_name , page: '0', filter: 'all' }}">
              <a-tag color="blue">
  <a-icon type="link" />
{{note.blog_name}}
</a-tag>
</router-link>
</span>
</a-card>
</template>
<style scoped>
</style>
<script>
export default {
  props: ["notes"]
};
</script>
