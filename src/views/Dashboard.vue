<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/Dashboard.gql')"
      :variables="this.var1"
      fetchPolicy="cache-first">
    <template slot-scope="{ result: { loading, error, data } }">
       <!-- Loading -->
       <div v-if="loading" class="loading apollo">Loading...</div>
       <!-- Error -->
       <div v-else-if="error" class="error apollo">
         <a-alert show variant="danger">An error occured</a-alert>
       </div>
       <!-- Result -->
       <div v-else-if="data"  v-on="onChange1(data)" class="result apollo">
                     <a-affix :offsetTop="50" >
    <a-card style="width: 100%;padding-top: 10px; height: 85px">
    <a-pagination
      :showTotal="total => `Total ${total} Pages`"
      :pageSize="1"
      :current="$route.params.page * 1"
      :defaultCurrent="$route.params.page * 1-1"
      @change="onChange "
      showQuickJumper
      :total="101" /></a-card></a-affix><br>
    <a-row type="flex" justify="start" align="top">
      <span v-for="post in data.Dashboard"  :key="post.index">
          <a-col :xl="10" >
<CardPics v-if="post.type ==='photo'"
        :picurl="post.photos['0'].original_size.url"
        :notecount="post.note_count"
        :piccount="post.photos.length"
        :liked="post.liked"
        :postid="post.id"
        :blog_name="post.blog_name"
        :summary="post.summary"
        :timestamp="post.timestamp"
        :video="0" />
<CardPics v-if="post.type ==='video'"
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
      </span>
  </a-row>
              <div v-if="data.Dashboard.length === 0" >
        <a-alert variant="danger">No more liked Posts found</a-alert>
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
  data() {
    return {
      var1: {},
      filter1: this.$route.params.filter,
      blog1: this.$route.params.User,
      page1: this.$route.params.page * 1,
      tstamp: ""
    };
  },
  methods: {
    roundnumber(value) {
      const val = Math.round(value);
      return val;
    },
    checkfilter() {
      if (this.$route.params.filter !== "all") {
        this.var1 = {
          num: (this.$route.params.page * 1 - 1) * 10,
          method: this.$route.params.filter
        };
      }
      if (this.$route.params.filter === "all") {
        this.var1 = { num: (this.$route.params.page * 1 - 1) * 10 };
      }
    },
    onChange(pageNumber) {
      // eslint-disable-next-line
      console.log('Page: ', pageNumber);
      // eslint-disable-next-line
      this.$router.push({
        name: this.name1,
        params: {
          page: pageNumber,
          filter: this.filter1,
          User: this.blog1
        }
      });
    },
    onChange1(data) {
      // eslint-disable-next-line
      console.log(data.Dashboard[data.Dashboard.length - 1].timestamp);
      this.tstamp = data.Dashboard[data.Dashboard.length - 1].id;
    }
  },
  // eslint-disable-next-line
  mounted: function() {
    this.checkfilter();
  },
  watch: {
    // eslint-disable-next-line
    '$route.params': function(newVal, oldVal) {
      // eslint-disable-next-line
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      this.checkfilter();
      // eslint-disable-next-line
      console.log(this.$route.params);
    }
  },
  components: {
    CardPics
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
