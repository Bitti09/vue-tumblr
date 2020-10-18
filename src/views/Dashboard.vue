<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <!-- Loading -->
    <div v-if="$apollo.queries.Dashboard.loading">Loading...</div>

    <!-- Error -->
    <div v-else-if="this.error" class="error apollo">
      <a-card style="width: 100%; padding-top: 10px; height: 100%">
        <a-alert type="error" message="An error occured" showIcon />
      </a-card>
    </div>
    <!-- Result -->
    <div v-else-if="!$apollo.queries.Dashboard.loading" class="result apollo">
      <a-affix :offsetTop="50">
        <a-card style="min-width: 100%; padding-top: 10px; height: 85px">
          <a-row>
            <a-col :span="6">
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
            <a-col :span="10" :offset="2">
              <a-pagination
                :showTotal="(total) => `Total ${total} Pages`"
                :pageSize="1"
                :current="$route.params.page * 1"
                :defaultCurrent="$route.params.page * 1 - 1"
                @change="onChange"
                showQuickJumper
                :total="51"
              />
            </a-col>
          </a-row>
        </a-card>
      </a-affix>
      <br />
      <a-row type="flex" justify="start" align="top">
        <span v-for="post in this.Dashboard" :key="post.index">
          <a-col :xl="10">
            <CardPics
              v-if="post.type === 'photo'"
              v-on:enlarge-text="test()"
              :picurl="post.photos['0'].original_size.url"
              :notecount="post.note_count"
              :piccount="post.photos.length"
              :liked="post.liked"
              :postid="post.id"
              :reblogkey="post.reblog_key"
              :blogname="post.blog_name"
              :summary="post.summary"
              :timestamp="post.timestamp"
              :video="0"
            />
            <CardPics
              v-if="post.type === 'video'"
              v-on:enlarge-text="test()"
              :picurl="post.thumbnail_url"
              :notecount="post.note_count"
              :piccount="1"
              :liked="post.liked"
              :postid="post.id"
              :reblogkey="post.reblog_key"
              :blogname="post.blog_name"
              :summary="post.summary"
              :timestamp="post.timestamp"
              :video="1"
              :videourl="post.video_url"
            />
          </a-col>
        </span>
      </a-row>
      <div v-if="this.Dashboard.length === 0">
        <a-alert variant="danger">No more liked Posts found</a-alert>
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
  data() {
    return {
      var1: {},
      error: 0,
      filter1: this.$route.params.filter,
      blog1: this.$route.params.User,
      page1: this.$route.params.page * 1,
      tstamp: "",
      Dashboard: {},
    };
  },
  methods: {
    test() {
      this.$apollo.queries.Dashboard.refetch();
    },
    roundnumber(value) {
      const val = Math.round(value);
      return val;
    },
    checkfilter() {
      if (this.$route.params.filter !== "all") {
        this.var1 = {
          num: (this.$route.params.page * 1 - 1) * 20,
          method: this.$route.params.filter,
        };
      }
      if (this.$route.params.filter === "all") {
        this.var1 = { num: (this.$route.params.page * 1 - 1) * 20 };
      }
    },
    onChange(pageNumber) {
      // eslint-disable-next-line
      // eslint-disable-next-line
      this.$router.push({
        name: this.name1,
        params: {
          page: pageNumber,
          filter: this.$route.params.filter,
          User: this.blog1,
        },
      });
    },
    onChange1() {
      // eslint-disable-next-line
      this.tstamp = this.Dashboard[this.Dashboard.length - 1].id;
    },
    onChangeFilter(data) {
      // eslint-disable-next-line
      console.log(data.target.value);
      this.$router.push({
        name: this.name1,
        params: {
          page: this.$route.params.page * 1,
          filter: data.target.value,
          User: this.blog1,
        },
      });
    },
  },
  apollo: {
    // Advanced query with parameters
    // The 'variables' method is watched by vue
    Dashboard: {
      query() {
        if (this.$route.params.filter !== "all") {
          return gql`
            query Dashboard($num: Int, $method: String) {
              Dashboard(offset: $num, type: $method) {
                id
                type
                id
                note_count
                liked
                reblog_key
                timestamp
                thumbnail_url
                blog_name
                video_url
                summary
                photos {
                  original_size {
                    url
                  }
                }
              }
            }
          `;
        } else if (this.$route.params.filter == "all") {
          return gql`
            query Dashboard($num: Int) {
              Dashboard(offset: $num) {
                id
                type
                id
                note_count
                liked
                reblog_key
                timestamp
                thumbnail_url
                blog_name
                summary
                photos {
                  original_size {
                    url
                  }
                }
              }
            }
          `;
        }
      },
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          num: (this.$route.params.page * 1 - 1) * 10,
          method: this.$route.params.filter,
        };
      },
      fetchPolicy: "network-only",
      // Variables: deep object watch
      deep: false,
      result({ data }) {
        this.Dashboard = data.Dashboard;
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
      loadingKey: "loadingQueriesCount",
      // watchLoading will be called whenever the loading state changes
    },
  },
  // eslint-disable-next-line
  mounted: function() {
    this.checkfilter();
  },
  watch: {
    // eslint-disable-next-line
    "$route.params": function(newVal, oldVal) {
      // eslint-disable-next-line
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      this.checkfilter();
      // eslint-disable-next-line
      console.log(this.$route.params);
    },
  },
  components: {
    CardPics,
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
