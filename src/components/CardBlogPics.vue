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
<a-icon v-if="!video" type="picture" />
<a-icon v-if="video" type="video-camera" />
{{piccount}}

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
  ]
};
</script>
