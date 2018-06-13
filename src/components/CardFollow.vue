<template>
  <a-card
      style="width: 15rem;max-height:200.312px;min-height:200.312px">
  <a-card-meta
    :title="blog_name"
    :description="this.timen1">
    <a-avatar slot="avatar" :src="this.avatar" />
  </a-card-meta>
        <ul class="ant-card-actions" slot="actions">
        <li style="width: 100%;">
      <router-link
      :to="varblog">
      Blog Posts
      <a-icon type="caret-right"  color="grey" />
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
<style scoped>
.ant-card-body {
  min-height: 155px !important;
  max-height: 155px !important;
}
.ant-card-actions {
  min-height: 46px !important;
  max-height: 46px !important;
  position: absolute;
  bottom: 0;
  width: 100%;
}
p {
  margin-top: 6px !important;
}
</style>
<script>
export default {
  props: [
    "likes",
    "title",
    "followers",
    "liked",
    "blog_name",
    "summary",
    "timestamp",
    "publicfollow"
  ],
  data() {
    return {
      avatar: `https://api.tumblr.com/v2/blog/${
        this.blog_name
      }.tumblr.com/avatar/40`,
      timen1: this.$moment(this.timestamp * 1000).fromNow()
    };
  },
  computed: {
    varblog() {
      var x = {
        name: "BlogPosts",
        params: { User: this.blog_name, page: "1", filter: "all" }
      };
      return x;
    }
  }
};
</script>
