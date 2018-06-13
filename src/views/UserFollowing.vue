<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
        <!-- Loading -->
        <div v-if="$apollo.queries.UserFollowing.loading">Loading...</div>
        <!-- Error -->
        <div v-else-if="this.error" class="error apollo">
        <a-card
        style="width: 100%;padding-top: 10px; height: 100%">
         <a-alert
        type="error"
        message="An error occured"
        showIcon/>
    </a-card>          </div>
        <!-- Result -->
        <div v-else-if="this.UserFollowing" class="result apollo" style="padding-top: 5px;">
                                <a-affix :offsetTop="50" >
    <a-card style="width: 100%;padding-top: 10px; height: 80px">
                      <a-pagination       :showTotal="total => `Total ${total} Pages`"
      :pageSize="1"
      :current="$route.params.page * 1"
      :defaultCurrent="$route.params.page * 1-1"
      @change="onChange"
      showQuickJumper
      :total="roundnumber( this.UserFollowing.total_blogs/10)" /></a-card></a-affix>
    <a-row type="flex" justify="start" align="top" style="padding-top: 20px;">
        <div  v-for="post in this.UserFollowing.blogs"  :key="post.index">
              <a-col>
<CardFollow
        :title="post.title"
        :followers="post.followers"
        :likes="post.liked"
        :publicfollow="post.share_likes"
        :postid="post.id"
        :blog_name="post.name"
        :summary="post.description"
        :timestamp="post.updated" />
                    </a-col>
      </div>
    </a-row>
              <div v-if="this.UserFollowing.blogs.length === 0" >
                            <a-alert
      type="error"
      message="No more followed Users found"
      showIcon
    />
</div>
</div>
    <!-- No result -->
    <div v-else class="no-result apollo">No result :(</div>
  </div>
</template>
<style scoped>
.ant-card-body {
  min-height: 150px !important;
  max-height: 150px !important;
}
p {
  margin-top: 6px !important;
}
</style>
<script>
import CardFollow from "../components/CardFollow.vue";
import gql from "graphql-tag";

export default {
  data() {
    return {
      error: 0,
      UserFollowing: {}
    };
  },
  methods: {
    roundnumber(value) {
      const val = Math.round(value);
      return val;
    },
    checkfilter() {
      if (this.$route.params.filter !== "all") {
        this.var1 = { num: (this.$route.params.page * 1 - 1) * 10 };
      }
      if (this.$route.params.filter === "all") {
        this.var1 = { num: (this.$route.params.page * 1 - 1) * 10 };
      }
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
  mounted() {
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
    }
  },
  components: {
    CardFollow
  },
  apollo: {
    // Advanced query with parameters
    // The 'variables' method is watched by vue
    UserFollowing: {
      query: gql`
        query UserFollowing($num: Int) {
          UserFollowing(offset: $num) {
            total_blogs
            blogs {
              title
              name
              likes
              share_likes
              followers
              updated
              description
            }
          }
        }
      `,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          num: (this.$route.params.page * 1 - 1) * 10
        };
      },
      fetchPolicy: "network-only",
      // Variables: deep object watch
      deep: false,
      result({ data }) {
        this.UserFollowing = data.UserFollowing;
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
