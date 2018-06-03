<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/UserLikes.gql')"
      :variables="{
        num: (this.$route.params.page * 1 - 1) *10,
        limit: '10',
        method: 'offset' }"
      >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

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
        <div v-else-if="data"   class="result apollo">
                      <a-affix :offsetTop="50" >
    <a-card style="width: 100%;padding-top: 10px; height: 85px">
                      <a-pagination       :showTotal="total => `Total ${total} Pages`"
      :pageSize="1"
      :current="$route.params.page * 1"
      :defaultCurrent="$route.params.page * 1-1"
      @change="onChange"
      showQuickJumper
      :total="roundnumber( data.UserLikes.liked_count/10)" /></a-card></a-affix><br>
                    <a-card style="width: 100%">
                      <br>
You <a-icon type="heart" />
     {{data.UserLikes.liked_count}} Posts<br>
                    </a-card><br>
        <div v-if="data.UserLikes.liked_posts.length > 0" >
    <a-row type="flex" justify="start" align="top">
             <div   v-for="post in data.UserLikes.liked_posts"  :key="post.index">
                         <a-col :xl="10" >

             <!-- Pic Cards -->
     <CardPics v-if="post.photos"
             :picurl="post.photos['0'].original_size.url"
             :notecount="post.note_count * 1"
             :piccount="post.photos.length * 1"
             :liked="post.liked"
             :postid="post.id"
             :blog_name="post.blog_name"
             :summary="post.summary"
             :timestamp="post.timestamp" />
             <CardPics v-if="post.thumbnail_url"
                     :picurl="post.thumbnail_url"
                     :notecount="post.note_count"
                     :video="1"
                     :liked="post.liked"
                     :postid="post.id"
                     :blog_name="post.blog_name"
                     :summary="post.summary"
                     :timestamp="post.timestamp" />
                         </a-col>
                   </div>
    </a-row>
          </div>
      <div v-if="data.UserLikes.liked_posts.length === 0" >
                                                    <a-alert
      type="error"
      message="No more liked Posts found"
      showIcon
    />
</div>
</div>
    <!-- No result -->
    <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
import CardPics from "../components/CardPics.vue";

export default {
  methods: {
    roundnumber(value) {
      const val = Math.round(value);
      return val;
    },
    onChange(pageNumber) {
      // eslint-disable-next-line
      console.log('Page: ', pageNumber);
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
      filter1: this.$route.params.filter,
      blog1: this.$route.params.User
    };
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
