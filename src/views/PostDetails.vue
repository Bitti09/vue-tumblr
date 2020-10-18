<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <!-- Loading -->
    <div v-if="$apollo.queries.BlogPosts.loading" class="loading apollo">
      {{ this.BlogPosts }}
    </div>
    <!-- Error -->
    <div v-else-if="this.error" class="error apollo">
      <a-card style="width: 100%; padding-top: 10px; height: 100%">
        <a-alert type="error" message="An error occured" showIcon />
      </a-card>
    </div>
    <!-- Result -->
    <div
      v-else-if="this.BlogPosts"
      class="result apollo"
      style="padding-top: 38px"
    >
      <a-card
        style="width: 100%; margin-top: 10px"
        :title="this.BlogPosts.blog.title"
      >
        <a-row
          type="flex"
          justify="start"
          align="top"
          style="
            width: 105.7%;
            margin-top: -24px;
            left: -32px;
            position: relative;
          "
        >
          <a-card style="width: 50%; height: 140.233px" title="Post Summary:">
            <span v-if="this.BlogPosts.posts['0'].summary">{{
              this.BlogPosts.posts["0"].summary
            }}</span>
            <span v-else>No Summary</span>
          </a-card>
          <a-card style="width: 50%; height: 140.233px" title="Posted  on:">
            <span>{{
              this.BlogPosts.posts["0"].timestamp | moment("DD.MM.YYYY HH:MM")
            }}</span>
            <br />
            <span>~ {{ tago(this.BlogPosts.posts["0"].timestamp) }}</span>
          </a-card>
        </a-row>
        <br />
        <a-card
          style="
            width: 105.7%;
            margin-top: 0px;
            left: -32px;
            position: relative;
          "
          title="Post Caption:"
        >
          <p
            v-if="this.BlogPosts.posts['0'].caption"
            v-html="this.BlogPosts.posts['0'].caption"
          ></p>
          <p v-else>No Caption</p>
        </a-card>
      </a-card>
      <br />
      <a-row type="flex" justify="start" align="top">
        <!-- Pic Cards -->
        <div v-if="this.BlogPosts.posts['0'].photos">
          <span
            v-for="(post, index) in this.BlogPosts.posts['0'].photos"
            :key="post.index"
          >
            <a-col :xl="6">
              <CardPicDetails
                :img-src="post.original_size.url"
                :index1="index"
                :index2="piccount()"
              ></CardPicDetails>
            </a-col>
          </span>
        </div>
      </a-row>
      <!-- Vid Cards -->
      <div v-if="this.BlogPosts.posts['0'].thumbnail_url">
        <CardVidDetails
          :img-src="this.BlogPosts.posts['0'].thumbnail_url"
          :vid-src="this.BlogPosts.posts['0'].video_url"
          :videotype="this.BlogPosts.posts['0'].video_type"
          :vidSrc2="this.BlogPosts.posts['0'].permalink_url"
        ></CardVidDetails>
      </div>
      <br />
      <!-- Tag Cards -->
      <CardTagDetails
        v-if="this.BlogPosts.posts['0'].tags"
        :tags="this.BlogPosts.posts['0'].tags"
      ></CardTagDetails>
      <br />
      <CardNoteDetails
        v-if="this.BlogPosts.posts['0'].notes"
        :notes="this.BlogPosts.posts['0'].notes"
        :reblogid="this.BlogPosts.posts['0'].reblogged_root_id"
        :reblogname="this.BlogPosts.posts['0'].reblogged_root_name"
      ></CardNoteDetails>
    </div>
    <!-- No result -->
    <div v-else class="no-result apollo">No result :(</div>
  </div>
</template>
<script>
import CardVidDetails from "../components/CardVidDetails.vue";
import CardTagDetails from "../components/CardTagDetails.vue";
import CardPicDetails from "../components/CardPicDetails.vue";
import CardNoteDetails from "../components/CardNoteDetails.vue";
import gql from "graphql-tag";

export default {
  data() {
    props: ["name"];
    return {
      BlogPosts: {},
      blog1: this.$route.params.User,
      page1: this.$route.params.page * 1 - 1,
      blogname: this.$route.params.User,
      error: 0,
    };
  },
  methods: {
    roundnumber(value) {
      const val = Math.round(value);
      return val;
    },
    tago(value) {
      const val = this.$moment(value * 1000).fromNow();
      return val;
    },
    piccount() {
      const val = this.BlogPosts.posts["0"].photos.length;
      return val;
    },
  },
  components: {
    CardVidDetails,
    CardPicDetails,
    CardTagDetails,
    CardNoteDetails,
  },
  apollo: {
    // Advanced query with parameters
    // The 'variables' method is watched by vue
    BlogPosts: {
      query: gql`
        query BlogPosts(
          $blogname: String
          $id_string: String
          $notes_info: Boolean
          $reblog_info: Boolean
        ) {
          BlogPosts(
            blog_name: $blogname
            id_string: $id_string
            notes_info: $notes_info
            reblog_info: $reblog_info
          ) {
            blog {
              title
            }
            posts {
              summary
              post_url
              thumbnail_url
              video_url
              tags
              timestamp
              liked
              caption
              id_string
              id
              reblog_key
              video_type
              permalink_url
              source_title
              reblogged_root_id
              reblogged_root_name
              notes {
                type
                timestamp
                blog_name
                followed
                blog_uuid
              }
              photos {
                original_size {
                  height
                  width
                  url
                }
              }
            }
          }
        }
      `,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          blogname: this.$route.params.User,
          id_string: this.$route.params.Postid,
          notes_info: true,
          reblog_info: true,
        };
      },
      fetchPolicy: "network-only",
      // Variables: deep object watch
      deep: false,
      result({ data }) {
        this.BlogPosts = data.BlogPosts;
      },
      // We use a custom update callback because
      // the field names don't match
      // By default, the 'pingMessage' attribute
      // would be used on the 'data' result object
      // Here we know the result is in the 'ping' attribute
      // considering the way the apollo server works
      // Optional result hook
      // Error handling
      error(error) {
        // eslint-disable-next-line
        console.error("We've got an error!", error);
        this.error = 1;
      },
      // Loading state
      // loadingKey is the name of the data property
      // that will be incremented when the query is loading
      // and decremented when it no longer is.
      loadingKey: "loadingQueriesCount",
      // watchLoading will be called whenever the loading state changes
    },
  },
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
