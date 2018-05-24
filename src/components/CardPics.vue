<template>
<a-card
  hoverable
    style="width: 20rem"
>
  <img
    alt="example"
    v-img:name
    :src="picurl"
    slot="cover"
    style="height: 15rem"

  />
    <ul class="ant-card-actions" slot="actions">
    <li style="width: 25%;">
<a-icon type="picture" /> {{piccount}}
</li>
        <li style="width: 25%;">
          <a-icon type="message" /> {{notecount}}
        </li>
    <li style="width: 25%;">
              <router-link
        :to="{
          name: 'PostDetail',
          params: { Postid: this.postid, User: this.blog_name , page: '0'}}">
          <a-icon type="caret-right" /> Details
              </router-link>
              </li>
    <li style="width: 25%;">
            <router-link
      :to="{
        name: 'BlogPosts',
        params: { User: blog_name , page: '0', filter: 'all' }}">
         <a-icon type="caret-right" /> Blog
            </router-link>
            </li>
  </ul>
    <a-card-meta
    :title="blog_name"
    :description="this.time1"
   >
        <a-avatar slot="avatar" :src="this.avatar" />
  </a-card-meta><br>
      <div v-if="summary" style="height: 6rem">
    <p > {{summary}}
</p>
  </div>
  <div v-if="!summary" style="height: 6rem">
    <p>
...
</p>
  </div>
  </a-card>
</template>
<style scoped>
</style>
<script>
export default {
  props: [
    "picurl",
    "notecount",
    "piccount",
    "liked",
    "postid",
    "blog_name",
    "summary",
    "timestamp",
    "video"
  ],
  data() {
    return {
      avatar: `https://api.tumblr.com/v2/blog/${
        this.blog_name
      }.tumblr.com/avatar/128`,
      time1: ""
    };
  },
  mounted() {
    this.time1 = this.$moment(this.timestamp * 1000).fromNow();
  }
};
</script>
