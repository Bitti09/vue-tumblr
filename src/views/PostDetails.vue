<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/PostDetails.gql')"
      :variables="{
        blogname: this.$route.params.User,
        postid: this.$route.params.Postid,
        filter: this.$route.params.filter,
        notes_info: true,reblog_info: true}"
                  fetchPolicy="cache-first"
>
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>
        <!-- Error -->
        <div v-else-if="error" class="error apollo">
          <b-alert show variant="danger"><icon name="ban"></icon>An error occured</b-alert>
        </div>
        <!-- Result -->
        <div v-else-if="data" class="result apollo" style="padding-top: 38px">
          <a-card style="width: 100%" :title="data.BlogPosts.blog.title">
                    <a-row type="flex" justify="start" align="top" style="padding-top: 15px">
          <a-card
          v-if="data.BlogPosts.posts['0'].summary"
      style="width: 50%;height: 140.233px"
          title="Post Summary:">
            <span>    {{data.BlogPosts.posts['0'].summary}}
</span>
          </a-card>
          <a-card
      style="width: 50%;height: 140.233px"
          title="Posted  on:">
            <span>{{ data.BlogPosts.posts['0'].timestamp | moment("DD.MM.YYYY HH:MM") }}</span><br>
            <span>~ {{ tago(data.BlogPosts.posts['0'].timestamp) }}</span>
          </a-card></a-row>
                    <a-card
          v-if="data.BlogPosts.posts['0'].caption"
      style="width: 100%"
          title="Post Caption:">
            <p v-html="data.BlogPosts.posts['0'].caption"></p>
          </a-card>
</a-card><br>
    <a-row type="flex" justify="start" align="top">
          <!-- Pic Cards -->
           <div
           v-for="(post, index) in data.BlogPosts.posts['0'].photos"
           v-if="!data.BlogPosts.posts['0'].thumbnail_url"
           :key="post.index">
             <CardPicDetails
                         :img-src="post.original_size.url"
                         :index2="data.BlogPosts.posts['0'].photos.length"
                         :index1="index">
             </CardPicDetails>
</div>
    </a-row>
<!-- Vid Cards -->
<CardVidDetails v-if="data.BlogPosts.posts['0'].thumbnail_url"
            :img-src="data.BlogPosts.posts['0'].thumbnail_url"
            :vid-src="data.BlogPosts.posts['0'].video_url">
</CardVidDetails><br>
<!-- Tag Cards -->
<CardTagDetails v-if="data.BlogPosts.posts['0'].tags"
            :tags="data.BlogPosts.posts['0'].tags">
</CardTagDetails><br>
<CardNoteDetails v-if="data.BlogPosts.posts['0'].notes"
            :notes="data.BlogPosts.posts['0'].notes"
            :reblogid="data.BlogPosts.posts['0'].reblogged_root_id"
            :reblogname="data.BlogPosts.posts['0'].reblogged_root_name">
</CardNoteDetails>
</div>
    <!-- No result -->
    <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
import CardVidDetails from "../components/CardVidDetails.vue";
import CardTagDetails from "../components/CardTagDetails.vue";
import CardPicDetails from "../components/CardPicDetails.vue";
import CardNoteDetails from "../components/CardNoteDetails.vue";

export default {
  methods: {
    roundnumber(value) {
      const val = Math.round(value);
      return val;
    },
    tago(value) {
      const val = this.$moment(value * 1000).fromNow();
      return val;
    }
  },
  components: {
    CardVidDetails,
    CardPicDetails,
    CardTagDetails,
    CardNoteDetails
  }
};
</script>

<style scoped>
.form,
.input,
.apollo,
.message {
  padding: 12px;
}
.card-body {
  padding: 0;
}
.card-body2 {
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}
.input {
  font-family: inherit;
  font-size: inherit;
  border: solid 2px #ccc;
  border-radius: 3px;
}
.card-footer2 {
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}
.card-img-top {
  max-width: 25rem;
  max-height: 15rem;
  height: 15rem;
}
.error {
  color: red;
}
</style>
