<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/BlogLikes.gql')"
      :variables="{
        num: this.$route.params.tstamp,
        blogname: this.$route.params.User,
        method: 'before',
      }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">
             <a-alert
      type="error"
      message="An error occured. Maybe the User has hidden his liked posts."
      showIcon
    />
        </div>
        <!-- Result -->
        <div v-else-if="data" v-on="onChange1(data)" class="result apollo">
            <a-affix :offsetTop="50" >
    <a-card style="width: 100%;padding-top: 10px; height: 85px">
            <a-pagination       :showTotal="total => `Total ${total} Pages`"
              showQuickJumper
      :pageSize="1"
      :defaultCurrent="$route.params.page * 1"
      @change="onChange"
      :total="roundnumber( data.BlogLikes.liked_count/20)" />
          </a-card></a-affix>

                              <a-card style="width: 100%">
"{{$route.params.User}}" <a-icon type="heart" />
     {{data.BlogLikes.liked_count}} Posts<br>
     ( ~ {{roundnumber( data.BlogLikes.liked_count/20)}} Pages )
                    </a-card> <br>
    <a-row type="flex" justify="start" align="top">

 <div  v-for="post in data.BlogLikes.liked_posts"  :key="post.index">
   <!-- Pic Cards -->
<CardPics v-if="post.photos"
   :picurl="post.photos['0'].original_size.url"
   :notecount="post.note_count"
   :piccount="post.photos.length"
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
        </div>
    </a-row>
              <div v-if="data.BlogLikes.liked_posts.length === 0" >
        <b-alert show variant="danger">No more liked Posts found</b-alert>
</div>
</div>
    <!-- No result -->
    <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import CardPics from '../components/CardPics.vue';

export default {
  data() {
    return {
      filter1: this.$route.params.filter,
      blog1: this.$route.params.User,
      page1: this.$route.params.page * 1,
      blogname: this.$route.params.User,
      tstamp: '0',
    };
  },
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
          filter: this.filter1,
          User: this.blog1,
          tstamp: this.tstamp,
        },
      });
    },
    onChange1(data) {
      console.log(
        '1:',
        data.BlogLikes.liked_posts[data.BlogLikes.liked_posts.length - 1]
          .timestamp
      );
      console.log('2:', this.tstamp);
      if (
        this.tstamp !=
        data.BlogLikes.liked_posts[data.BlogLikes.liked_posts.length - 1]
          .timestamp
      ) {
        // eslint-disable-next-line
        console.log(
          data.BlogLikes.liked_posts[data.BlogLikes.liked_posts.length - 1]
            .timestamp
        );
        this.tstamp =
          data.BlogLikes.liked_posts[
            data.BlogLikes.liked_posts.length - 1
          ].timestamp;
      }
    },
  },
  // eslint-disable-next-line
  mounted: function() {},
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
