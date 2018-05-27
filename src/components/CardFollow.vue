<template>
  <a-card
      style="width: 15rem;min-height:200.312px"
>
  <a-card-meta
    :title="blog_name"
    :description="this.timen1">
    <a-avatar slot="avatar" :src="this.avatar" />
  </a-card-meta>
        <ul class="ant-card-actions" slot="actions">
    <li style="width: 25%;">
        <a-icon type="heart" /><span v-if="likes"> {{likes}}</span><span v-if="!likes">?</span>
    </li>
        <li style="width: 25%;">
            <a-icon type="message"/>
            <span v-if="followers"> {{followers}}</span>
            <span v-if="!followers">?</span>
    </li>
            <li style="width: 25%;">
      <router-link
      :to="{
        name: 'BlogPosts',
        params: { User: blog_name , page: '0', filter: 'all' }}">
      <a-button size="small" content="Blog Posts" icon="left arrow" label-position="right" />
    </router-link>
            </li>
                        <li style="width: 25%;">
                <router-link
    v-if="publicfollow"
    :to="{
      name: 'BlogLikes',
      params: { User: $route.params.User , page: '0', filter: 'all' }}">
    <a-button
    primary
    basic
    size="small"
    content="View them"
    icon="right arrow"
    label-position="right" />
   </router-link>
               </li>
    </ul>
    <span v-if="title" style="height: 6rem">
      <p>
{{title}}
</p>
    </span>
    <span v-if="!title" style="height: 6rem">
      <p>
...
</p>
    </span>
  </a-card>
</template>
<style>
.ant-card-body {
  min-height: 150px;
}
</style>
<script>
export default {
  props: [
    'likes',
    'title',
    'followers',
    'liked',
    'blog_name',
    'summary',
    'timestamp',
    'publicfollow',
  ],
  data() {
    return {
      avatar: `https://api.tumblr.com/v2/blog/${
        this.blog_name
      }.tumblr.com/avatar/40`,
      timen1: this.$moment(this.timestamp * 1000).fromNow(),
    };
  },
};
</script>
