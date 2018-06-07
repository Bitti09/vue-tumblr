<template>
<a-card
  hoverable
    style="width: 20rem">
  <img
    alt="example"
    v-img:name
    :src="picurl"
    slot="cover"
    style="height: 15rem"/>
    <ul class="ant-card-actions" slot="actions">
    <li v-if="!video" style="width: 25%;">
<a-icon   type="picture" /> {{piccount}}
</li>
    <li  v-else  style="width: 25%;">
<a-icon  type="video-camera" /> 1
</li>
        <li style="width: 25%;">
          <a-icon v-if="this.liked" @click="checklike()" type="heart" />
                    <a-icon v-if="!this.liked" @click="checklike()" type="heart-o" />
        </li>
    <li style="width: 25%;">
              <router-link
        :to="vardetail">
          <a-icon type="caret-right" /> Details
              </router-link>
              </li>
    <li style="width: 25%;">
            <router-link
      :to="varblog">
         <a-icon type="caret-right" /> Blog
            </router-link>
            </li>
  </ul>
    <a-card-meta
    :title="blogname"
    :description="this.time1">
        <a-avatar slot="avatar" :src="this.avatar" />
  </a-card-meta><br>
      <div v-if="summary" style="height: 6rem">
    <span style="overflow-wrap: break-word;">{{summary}}
</span>
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

import POST_LIKE from '../graphql/BlogPostsLike.gql'
import POST_DISLIKE from '../graphql/BlogPostsDisLike.gql'

export default {
  props: [
    "picurl",
    "notecount",
    "piccount",
    "liked",
    "postid",
    "reblogkey",
    "blogname",
    "summary",
    "timestamp",
    "video"
  ],
  data() {
    return {
      avatar: `https://api.tumblr.com/v2/blog/${
        this.blogname
      }.tumblr.com/avatar/128`,
      time1: ""
    };
  },
      methods: {
      checklike()
      {
        if (this.liked == true)
{        console.log("liked")
this.dislikepost()
this.$emit('enlarge-text')

}
        if (this.liked == false)
{        console.log("not liked")
this.likepost()
this.$emit('enlarge-text')
}

      },
   		dislikepost () {
        const id = this.postid*1
        const reblog_key = this.reblogkey
        const var1 = this.var1
				try {
					this.$apollo.mutate({
						mutation: POST_DISLIKE,
						variables: {
              id,
              reblog_key,
						},
						optimisticResponse: {
							__typename: 'Mutation',
							UnlikePost: {
								__typename: 'Like',
                reblog_key,
                id
							},
						},
					})
				} catch (e) {
					console.error(e)
					//this.label = label
        }
      },   
		likepost () {
        const id = this.postid*1
        const reblog_key = this.reblogkey
        const var1 = this.var1
				try {
					this.$apollo.mutate({
						mutation: POST_LIKE,
						variables: {
              id,
              reblog_key,
						},
						optimisticResponse: {
							__typename: 'Mutation',
							LikePost: {
								__typename: 'Like',
                reblog_key,
                id
							},
						},
					})
				} catch (e) {
					console.error(e)
					//this.label = label
        }
      },
      refresh1()
      {     
console.log(this.$parent)}
		},
  computed: {
    vardetail() {
      var x = {
        name: "PostDetail",
        params: { Postid: this.postid, User: this.blogname, page: "1" }
      };
      return x;
    },
    varblog() {
      var x = {
        name: "BlogPosts",
        params: { User: this.blogname, page: "1", filter: "all" }
      };
      return x;
    }
  },
  mounted() {
    this.time1 = this.$moment(this.timestamp * 1000).fromNow();
  }
};
</script>
