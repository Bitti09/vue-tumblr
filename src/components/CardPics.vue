<template>
  <a-card hoverable style="width: 20rem">
    <img
      v-if="!video"
      alt="example"
      v-img:name
      :src="picurl"
      slot="cover"
      style="height: 15rem"
    />
    <img
      v-else
      alt="example"
      :src="picurl"
      slot="cover"
      style="height: 15rem"
      @click="show(postid1)"
    />
    <modal v-if="video" height="60%" :name="postid1">
      <d-player
        style="width: 100%; height: 100%"
        :options="options1"
      ></d-player>
    </modal>
    <template class="ant-card-actions" slot="actions">
      <li v-if="!video" style="width: 25%">
        <a-icon type="picture" />
        {{ piccount }}
      </li>
      <li v-else style="width: 25%"><a-icon type="video-camera" />1</li>
      <li style="width: 25%">
        <a-icon v-if="this.liked" @click="checklike()" type="heart" />
        <a-icon v-if="!this.liked" @click="checklike()" type="heart-o" />
      </li>
      <li style="width: 25%">
        <router-link :to="vardetail">
          <a-icon type="caret-right" />Details
        </router-link>
      </li>
      <li style="width: 25%">
        <router-link :to="varblog">
          <a-icon type="caret-right" />Blog
        </router-link>
      </li>
    </template>
    <a-card-meta :title="blogname" :description="this.time1">
      <a-avatar slot="avatar" :src="this.avatar" />
    </a-card-meta>
    <br />
    <div v-if="summary" style="height: 6rem">
      <span style="overflow-wrap: break-word">{{ summary }}</span>
    </div>
    <div v-if="!summary" style="height: 6rem">
      <p>...</p>
    </div>
  </a-card>
</template>
<style scoped></style>
<script>
import POST_LIKE from "../graphql/BlogPostsLike.gql";
import POST_DISLIKE from "../graphql/BlogPostsDisLike.gql";

export default {
  props: [
    "picurl",
    "notecount",
    "piccount",
    "liked",
    "postid1",
    "reblogkey",
    "blogname",
    "summary",
    "timestamp",
    "video",
    "videourl",
  ],
  data() {
    return {
      avatar: `https://api.tumblr.com/v2/blog/${this.blogname}.tumblr.com/avatar/128`,
      time1: "",
    };
  },
  methods: {
    show(id) {
      this.$modal.show(id);
    },
    hide(id) {
      this.$modal.hide(id);
    },
    checklike() {
      if (this.liked == true) {
        // eslint-disable-next-line
        console.log("liked");
        this.dislikepost();
        this.$emit("enlarge-text");
      }
      if (this.liked == false) {
        // eslint-disable-next-line
        console.log("not liked");
        this.likepost();
        this.$emit("enlarge-text");
      }
    },
    refresh1() {
      // eslint-disable-next-line
      console.log(this.$parent);
    },
  },
  computed: {
    options1() {
      var video = {
        url: this.videourl,
      };
      var options = {
        video: video,
      };
      return options;
    },
    vardetail() {
      var x = {
        name: "PostDetail",
        params: { Postid: this.postid1, User: this.blogname, page: "1" },
      };
      return x;
    },
    varblog() {
      var x = {
        name: "BlogPosts",
        params: { User: this.blogname, page: "1", filter: "all" },
      };
      return x;
    },
  },
  mounted() {
    this.time1 = this.$moment(this.timestamp * 1000).fromNow();
  },
};
</script>
