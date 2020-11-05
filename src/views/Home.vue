<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
        <!-- Loading -->
        <div v-if="$apollo.queries.UserLikes.loading">Loading...</div>
        <!-- Error -->
        <div v-else-if="error" class="error apollo">
          <a-card      style="width: 100%;padding-top: 10px; height: 100%">
     <a-alert
      type="error"
      :message="error.message"
      showIcon
    /></a-card>
        </div>

        <!-- Result -->
        <div v-else-if="this.UserLikes"   class="result apollo">
                      <a-affix :offsetTop="50" >
    <a-card style="width: 100%;padding-top: 10px; height: 85px">
      <a-pagination       :showTotal="total => `Total ${total} Pages`"
      :pageSize="1"
      :current="$route.params.page * 1"
      :defaultCurrent="$route.params.page * 1-1"
      @change="onChange"
      showQuickJumper
      :total="roundnumber( this.UserLikes.liked_count/10)" />

      </a-card>
                      </a-affix><br>
                    <a-card style="width: 100%">
                      <br>
You <a-icon type="heart" />
     {{this.UserLikes.liked_count}} Posts<br>
                    </a-card><br>
        <div v-if="this.UserLikes.liked_posts.length > 0" >
    <a-row type="flex" justify="start" align="top">
             <div   v-for="post in this.UserLikes.liked_posts"  :key="post.index">
                         <a-col :xl="10" >
             <!-- Pic Cards -->
     <CardPics v-if="post.photos"
             :picurl="post.photos['0'].original_size.url"
             :notecount="post.note_count * 1"
             :piccount="post.photos.length * 1"
             :liked="post.liked"
             :postid="post.id"
             :blogname="post.blog_name"
             :summary="post.summary"
             :timestamp="post.timestamp" />
             <CardPics v-if="post.thumbnail_url"
                     :picurl="post.thumbnail_url"
                     :notecount="post.note_count"
                     :video="1"
                     :liked="post.liked"
                     :postid="post.id"
                     :blogname="post.blog_name"
                     :summary="post.summary"
                     :timestamp="post.timestamp" />
                         </a-col>
                   </div>
    </a-row>
          </div>
      <div v-if="this.UserLikes.liked_posts.length === 0" >
        <a-alert
      type="error"
      message="No more liked Posts found"
      showIcon
    />
</div>
</div>
    <!-- No result -->
    <div v-else class="no-result apollo">No result :(</div>
  </div>
</template>
<script>
import CardPics from "../components/CardPics.vue";
import gql from "graphql-tag";

export default {
  methods: {
    roundnumber(value) {
      const val = Math.round(value);
      return val;
    },
    onChange(pageNumber) {
      // eslint-disable-next-line
      console.log("Page: ", pageNumber);
      if (pageNumber === 1) {
        this.tstamp = 0;
      }
      this.$router.push({
        name: this.name1,
        params: {
          page: pageNumber,
          tstamp: this.tstamp
        }
      });
    }
  },
  components: {
    CardPics
  },
  data() {
    return {
      tstamp: "0",
      UserLikes: {},
      error: 0,
      filter1: this.$route.params.filter,
      blog1: this.$route.params.User
    };
  },
  apollo: {
    // Advanced query with parameters
    // The 'variables' method is watched by vue
    UserLikes: {
      query: gql`
        query UserLikes($num: Int, $method: String, $limit: Int) {
          UserLikes(num: $num, method: $method, limit: $limit) {
            liked_posts {
              blog_name
              note_count
              post_url
              thumbnail_url
              id
              liked
              summary
              timestamp
              photos {
                original_size {
                  url
                }
              }
            }
            liked_count
          }
        }
      `,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          num: (this.$route.params.page * 1 - 1) * 10,
          limit: 10,
          method: "offset"
        };
      },
      fetchPolicy: "network-only",
      // Variables: deep object watch
      deep: false,
      result({ data }) {
        this.UserLikes = data.UserLikes;
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
      loadingKey: "loadingQueriesCount"
      // watchLoading will be called whenever the loading state changes
    }
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
