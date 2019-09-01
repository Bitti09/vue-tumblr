<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <!-- Loading -->
    <div v-if="$apollo.queries.BlogPosts.loading" class="loading apollo">
      Loading...
    </div>
    <!-- Error -->
    <div v-else-if="this.error" class="error apollo">
      <a-card style="width: 100%;padding-top: 10px; height: 100%">
        <a-alert type="error" message="An error occured" showIcon />
      </a-card>
    </div>
    <!-- Result -->
    <div v-else-if="this.BlogPosts" class="result apollo">
      <a-affix :offsetTop="50">
        <a-card style="min-width: 100%;padding-top: 10px; height: 85px">
          <a-row>
            <a-col :span="8">
              <a-radio-group
                @change="onChangeFilter"
                :defaultValue="$route.params.filter"
              >
                <a-radio-button value="all">All</a-radio-button>
                <a-radio-button value="photo">Photos only</a-radio-button>
                <a-radio-button value="video">Video only</a-radio-button>
                <a-radio-button value="d" disabled>Answers only</a-radio-button>
              </a-radio-group>
            </a-col>
            <a-col :span="12" :offset="-1">
              <a-pagination
                :showTotal="total => `Total ${total} Pages`"
                :pageSize="1"
                :current="$route.params.page * 1"
                :defaultCurrent="$route.params.page * 1 - 1"
                @change="onChange"
                showQuickJumper
                :total="
                  roundnumber(
                    this.BlogPosts.total_posts / 20,
                    this.BlogPosts.total_posts
                  )
                "
              />
            </a-col>
          </a-row>
        </a-card>
      </a-affix>
      <a-card style="width: 100%, marginTop: '54px">
        <a-card style="width: 100%" :title="this.BlogPosts.blog.title"></a-card>
        <a-row type="flex" justify="start" align="top">
          <a-card style="width: 20%;height: 189.233px" title="Blog Name:">
            <span>{{ this.BlogPosts.blog.name }}</span>
          </a-card>
          <a-card
            style="width: 20%;height: 189.233px"
            title="Last Updated  on:"
          >
            <span>
              {{ this.BlogPosts.blog.updated | moment("DD.MM.YYYY HH:MM") }}
            </span>
            <br />
            <span>~ {{ tago(this.BlogPosts.blog.updated) }}</span>
          </a-card>
          <a-card
            style="width: 20%;height: 189.233px"
            title="Total No of Posts:"
          >
            <span>{{ this.BlogPosts.total_posts }}</span>
            <br />
            ( ~ {{ roundnumber(this.BlogPosts.total_posts / 20, 0) }} Pages )
            <br />
          </a-card>
          <a-card
            style="width: 40%;height: 189.233px"
            :title="blogshare(this.BlogPosts.blog.name)"
          >
            <span v-if="this.BlogPosts.blog.share_likes">
              <router-link :to="vars">
                <a-alert message="YES, view them" type="success" showIcon />
              </router-link>
            </span>
            <br />
            <span v-if="!this.BlogPosts.blog.share_likes">
              <a-alert type="error" message="NO" showIcon></a-alert>
            </span>
            <br />
          </a-card>
        </a-row>
        <a-card
          v-if="this.BlogPosts.blog.description"
          style="width: 100%"
          title="Blog Description:"
        >
          <span v-html="this.BlogPosts.blog.description"></span>
        </a-card>
      </a-card>
      <br />
      <a-row type="flex" justify="start" align="top">
        <div v-for="(post, index) in test11(this.BlogPosts.posts)" :key="index">
          <a-col :xl="10">
            <CardBlogPics
              v-if="post.type === 'photo' && post.photos[0]"
              v-on:enlarge-text="test()"
              :picurl="post.photos['0'].original_size.url"
              :notecount="post.note_count"
              :piccount="post.photos.length"
              :liked="post.liked"
              :postid="post.id"
              :var1="var11"
              :reblogkey="post.reblog_key"
              :blogname="post.blog_name"
              :summary="post.summary"
              :timestamp="post.timestamp"
              :video="0"
            />
            <CardBlogPics
              v-if="post.type === 'video' && UrlExists(post.video_url)"
              v-on:enlarge-text="test()"
              :picurl="post.thumbnail_url"
              :notecount="post.note_count"
              :piccount="1"
              :liked="post.liked"
              :postid="post.id"
              :var1="var11"
              :reblogkey="post.reblog_key"
              :blogname="post.blog_name"
              :summary="post.summary"
              :timestamp="post.timestamp"
              :video="1"
              :videourl="post.video_url"
            />
          </a-col>
        </div>
      </a-row>
      <div v-if="this.BlogPosts.posts.length === 0">
        <a-alert
          v-if="this.$route.params.filter == 'all'"
          type="error"
          message="No more liked Posts found"
          showIcon
        />
        <a-alert
          v-if="this.$route.params.filter !== 'all'"
          type="error"
          message="No more liked Posts found for the current active filter"
          showIcon
        />
      </div>
    </div>
    <!-- No result -->
    <div v-else class="no-result apollo">No result :(</div>
  </div>
</template>
<script>
import CardBlogPics from "../components/CardBlogPics.vue";
import _ from "lodash";
import gql from "graphql-tag";

export default {
  data() {
    return {
      filter1: this.$route.params.filter,
      blog1: this.$route.params.User,
      page1: this.$route.params.page * 1,
      num1: 0,
      BlogPosts: {},
      error: 0,
      loading: 0,
      filter: this.$route.params.filter,
      blogname: this.$route.params.User,
      var1: {
        num: (this.$route.params.page * 1 - 1) * 20,
        blogname: this.$route.params.User
      },
      errormsg: `${this.$route.params.User} has no public liked Posts`,
      successmsg1: `${this.$route.params.User} has public liked Posts `,
      successmsg2:
        "Note: currently you can only see the recent 1000 Posts via this Site",
      successmsg3: `GoTo ${this.$route.params.User} 's liked Posts`
    };
  },
  methods: {
    test() {
      // console.log(this.$apollo.queries.BlogPosts.refetch());
    },
    UrlExists(url) {
      // eslint-disable-next-line
      console.log(url);
      var http = new XMLHttpRequest();
      http.open("HEAD", url, false);
      http.send();
      // eslint-disable-next-line
      console.log(http.status);
      if (http.status != 404 && http.status != 403) {
        return true;
      } else {
        return false;
      }
    },
    onChangeFilter(data) {
      // eslint-disable-next-line
      console.log(data.target.value);
      this.$router.push({
        name: this.name1,
        params: {
          page: 1 * 1,
          filter: data.target.value,
          User: this.$route.params.User
        }
      });
    },
    checkfilter() {
      if (this.$route.params.filter !== "all") {
        this.var1 = {
          num: (this.$route.params.page * 1 - 1) * 20,
          filter: this.$route.params.filter,
          blogname: this.$route.params.User
        };
      }
      if (this.$route.params.filter === "all") {
        this.var1 = {
          num: (this.$route.params.page * 1 - 1) * 20,
          blogname: this.$route.params.User
        };
      }
    },
    onChange(pageNumber) {
      // eslint-disable-next-line
      this.$router.push({
        name: this.name1,
        params: {
          page: pageNumber,
          filter: this.$route.params.filter,
          User: this.$route.params.User
        }
      });
    },
    roundnumber(value, value2) {
      const val = Math.ceil(value);
      return val;
    },
    tago(value) {
      const val = this.$moment(value * 1000).fromNow();
      return val;
    },
    blogshare(value) {
      const val = value + "\n\n liked Posts are public ?";
      return val;
    },
    test11(value) {
      const val = _.sortBy(value, "timestamp").reverse();
      return val;
    }
  },
  // eslint-disable-next-line
  mounted: function() {
    this.checkfilter();
  },
  apollo: {
    // Advanced query with parameters
    // The 'variables' method is watched by vue
    BlogPosts: {
      query() {
        if (this.$route.params.filter !== "all") {
          return gql`
            query BlogPosts($blogname: String!, $num: Int!, $filter: String) {
              BlogPosts(blog_name: $blogname, offset: $num, type: $filter) {
                blog {
                  description
                  title
                  name
                  total_posts
                  updated
                  is_nsfw
                  share_likes
                  is_adult
                  followers
                  likes
                }
                posts {
                  post_url
                  caption
                  blog_name
                  summary
                  type
                  note_count
                  liked
                  reblog_key
                  timestamp
                  thumbnail_url
                  video_url
                  id
                  photos {
                    original_size {
                      url
                    }
                  }
                }
                total_posts
              }
            }
          `;
        } else if (this.$route.params.filter === "all") {
          return gql`
            query BlogPosts($blogname: String!, $num: Int!) {
              BlogPosts(blog_name: $blogname, offset: $num) {
                blog {
                  description
                  title
                  name
                  total_posts
                  updated
                  is_nsfw
                  share_likes
                  is_adult
                  followers
                  likes
                }
                posts {
                  post_url
                  caption
                  blog_name
                  summary
                  type
                  note_count
                  liked
                  reblog_key
                  timestamp
                  thumbnail_url
                  video_url
                  id
                  photos {
                    original_size {
                      url
                    }
                  }
                }
                total_posts
              }
            }
          `;
        }
      },
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          blogname: this.$route.params.User,
          num: (this.$route.params.page * 1 - 1) * 20,
          filter: this.$route.params.filter
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
      //error(error) {
      //  console.error("We've got an error!", error);
      //},
      // Loading state
      // loadingKey is the name of the data property
      // that will be incremented when the query is loading
      // and decremented when it no longer is.
      loadingKey: "loadingQueriesCount"
      // watchLoading will be called whenever the loading state changes
    }
  },
  computed: {
    vars() {
      var x = {
        name: "BlogLikes",
        params: {
          User: this.$route.params.User,
          page: "1",
          tstamp: "0",
          filter: "all"
        }
      };
      return x;
    },
    var11() {
      var var1 = {
        num: (this.$route.params.page * 1 - 1) * 10,
        blogname: this.$route.params.User
      };
      return var1;
    },
    pagenum() {
      return this.$route.params.page * 1 - 1;
    }
  },
  watch: {
    // eslint-disable-next-line
    "$route.params": function(newVal, oldVal) {
      this.checkfilter();
    }
  },
  components: {
    CardBlogPics
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
