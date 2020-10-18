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
      @click="show(postid.toString())"
    />
    <modal v-if="video" height="60%" :name="postid.toString()">
      <d-player
        style="width: 100%; height: 100%"
        v-if="this.videotype !== 'youtube'"
        :options="options1"
      ></d-player>
    </modal>
    <template class="ant-card-actions" slot="actions">
      <li style="width: 33%">
        <a-icon v-if="!video" type="picture" />
        <a-icon v-if="video" type="video-camera" />
        {{ piccount }}
      </li>
      <li style="width: 33%">
        <a-icon type="message" />
        {{ notecount }}
      </li>
      <li style="width: 33%">
        <router-link :to="vars">
          <a-icon type="caret-right" />Details
        </router-link>
      </li>
    </template>
    <ul class="time ant-card-actions">
      <li style="width: 70%">
        <a-icon type="clock-circle-o" />
        Posted {{ this.timen1 }}
      </li>
      <li style="width: 30%">
        <a-icon v-if="this.liked" @click="checklike()" type="heart" />
        <a-icon v-if="!this.liked" @click="checklike()" type="heart-o" />
      </li>
    </ul>
    <div v-if="summary" style="height: 6rem">
      <p>{{ summary }}</p>
    </div>
    <div v-if="!summary" style="height: 6rem">
      <p>No Summary</p>
    </div>
  </a-card>
</template>
<style scoped>
.time {
  margin-top: -24px;
  margin-left: -24px;
  margin-right: -24px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}
</style>
<script>
import POST_LIKE from "../graphql/BlogPostsLike.gql";
import POST_DISLIKE from "../graphql/BlogPostsDisLike.gql";

export default {
  props: [
    "picurl",
    "notecount",
    "piccount",
    "liked",
    "postid",
    "blogname",
    "var1",
    "summary",
    "reblogkey",
    "timestamp",
    "video",
    "videourl",
  ],
  data() {
    return {
      timen1: this.$moment(this.timestamp * 1000).fromNow(),
    };
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
    vars() {
      var x = {
        name: "PostDetail",
        params: { Postid: this.postid, User: this.blogname, page: 1 },
      };
      return x;
    },
    vars2() {
      var x = {
        name: "BlogPosts",
        params: { User: this.blogname, page: "1", filter: "all" },
      };
      return x;
    },
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
        //console.log("liked");
        this.dislikepost();
        this.$emit("enlarge-text");
      }
      if (this.liked == false) {
        //console.log("not liked");
        this.likepost();
        this.$emit("enlarge-text");
      }
    },
    dislikepost() {
      const id = this.postid * 1;
      const reblog_key = this.reblogkey;
      try {
        this.$apollo.mutate({
          mutation: POST_DISLIKE,
          variables: {
            id,
            reblog_key,
          },
          optimisticResponse: {
            __typename: "Mutation",
            UnlikePost: {
              __typename: "Like",
              reblog_key,
              id,
            },
          },
        });
      } catch (e) {
        //console.error(e);
        //this.label = label
      }
    },
    likepost() {
      const id = this.postid * 1;
      const reblog_key = this.reblogkey;
      try {
        this.$apollo.mutate({
          mutation: POST_LIKE,
          variables: {
            id,
            reblog_key,
          },
          optimisticResponse: {
            __typename: "Mutation",
            LikePost: {
              __typename: "Like",
              reblog_key,
              id,
            },
          },
        });
      } catch (e) {
        //console.error(e);
        //this.label = label
      }
    },
    refresh1() {
      //console.log(this.$parent);
    },
  },
};
</script>
