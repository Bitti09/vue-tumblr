<template>
  <div class="apollo-example" >
    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/BlogPosts.gql')"
      :variables="this.var1"
                  fetchPolicy="cache-first"
            >
      <template slot-scope="{ result: { loading, error, data } }" >
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>
        <!-- Error -->
        <div v-else-if="error" class="error apollo">
          <b-alert show variant="danger">An error occured</b-alert>
        </div>
        <!-- Result -->
        <div v-else-if="data" class="result apollo" >
  <a-affix :offsetTop="50" >
    <a-card style="min-width: 100%;padding-top: 10px; height: 85px">

  <a-pagination
  v-if="$route.params.filter == 'all' "
       :showTotal="total => `Total ${total} Pages`"
      :pageSize="1"
      :current="$route.params.page * 1"
      :defaultCurrent="$route.params.page * 1-1"
      @change="onChange"
      showQuickJumper
      :total="roundnumber( data.BlogPosts.blog.total_posts/10)" />
          </a-card>
</a-affix>
          <a-card style="width: 100%, marginTop: '54px">
                      <a-card
          style="width: 100%"
          :title="data.BlogPosts.blog.title">
          </a-card>
        <a-row type="flex" justify="start" align="top">
           <a-card
      style="width: 20%;height: 189.233px"
          title="Blog Name:">
          <span>{{data.BlogPosts.blog.name}}</span>
          </a-card>
          <a-card
      style="width: 20%;height: 189.233px"
          title="Last Updated  on:">
          <span>{{ data.BlogPosts.blog.updated | moment("DD.MM.YYYY HH:MM") }}</span><br>
          <span>~ {{ tago(data.BlogPosts.blog.updated) }}</span>
          </a-card>
          <a-card
      style="width: 20%;height: 189.233px"
          title="Total No of Posts:">
          <span>{{ data.BlogPosts.blog.total_posts}}</span><br>
          ( ~ {{roundnumber( data.BlogPosts.blog.total_posts/10)}} Pages )

               <span v-if="data.BlogPosts.blog.total_posts > 1000">
       (currently only the 2000 recent Posts can be viewed on this page)
     </span>
               <a-alert v-if="$route.params.filter != 'all'" type="error"
      message="Page Numbers  aren't acurate due to active filtering" showIcon></a-alert>

          </a-card>
                    <a-card
      style="width: 40%;height: 189.233px"
          :title="blogshare(data.BlogPosts.blog.name)">
          <span v-if="data.BlogPosts.blog.share_likes">
         <router-link
           :to="{
             name: 'BlogLikes',
             params: { User: $route.params.User , page: '0', tstamp: '0',filter: 'all' }}">
     <a-alert
      message="YES, view them"
      type="success"
      showIcon/>
          </router-link>
    </span><br>
          <span v-if="!data.BlogPosts.blog.share_likes">
            <a-alert
      type="error"
      message="NO"
      showIcon
    ></a-alert></span><br>

          </a-card>
        </a-row>
      <a-card
      v-if="data.BlogPosts.blog.description"
      style="width: 100%"
          title="Blog Description:">
          <span v-html="data.BlogPosts.blog.description"></span>
          </a-card>
</a-card>
<br>
    <a-row type="flex" justify="start" align="top">
        <div  v-for="(post, index) in test11(data.BlogPosts.posts)" :key="index">
                    <a-col :xl="10" >
<CardBlogPics v-if="post.type ==='photo'"
        :picurl="post.photos['0'].original_size.url"
        :notecount="post.note_count"
        :piccount="post.photos.length"
        :liked="post.liked"
        :postid="post.id"
        :blog_name="post.blog_name"
        :summary="post.summary"
        :timestamp="post.timestamp"
        :video="0" />
        <CardBlogPics v-if="post.type ==='video' && post.thumbnail_url"
                :picurl="post.thumbnail_url"
                :notecount="post.note_count"
                :piccount="1"
                :liked="post.liked"
                :postid="post.id"
                :blog_name="post.blog_name"
                :summary="post.summary"
                :timestamp="post.timestamp"
                :video="1" />
                    </a-col>
      </div>
    </a-row>
              <div v-if="data.BlogPosts.posts.length === 0" >
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
import CardBlogPics from "../components/CardBlogPics.vue";
import _ from "lodash";
export default {
  data() {
    return {
      filter1: this.$route.params.filter,
      blog1: this.$route.params.User,
      page1: this.$route.params.page * 1,
      blogname: this.$route.params.User,
      var1: {
        num: (this.$route.params.page * 1 - 1) * 10,
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
    checkfilter() {
      if (this.$route.params.filter !== "all") {
        this.var1 = {
          num: (this.$route.params.page * 1 - 1) * 10,
          filter: this.$route.params.filter,
          blogname: this.$route.params.User
        };
      }
      if (this.$route.params.filter === "all") {
        this.var1 = {
          num: (this.$route.params.page * 1 - 1) * 10,
          blogname: this.$route.params.User
        };
      }
    },
    onChange(pageNumber) {
      // eslint-disable-next-line
      console.log('Page: ', pageNumber);
      this.$router.push({
        name: this.name1,
        params: {
          page: pageNumber,
          filter: this.filter1,
          User: this.blog1
        }
      });
    },
    roundnumber(value) {
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
  computed: {
    pagenum() {
      return this.$route.params.page * 1 - 1;
    }
  },
  watch: {
    // eslint-disable-next-line
    '$route.params': function(newVal, oldVal) {
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
