<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/UserFollowing.gql')"
      :variables="this.var1"
                  fetchPolicy="cache-first"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">
          <b-alert show variant="danger">An error occured</b-alert>
        </div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">

    <a-row type="flex" justify="start" align="top">
        <div  v-for="post in data.UserFollowing.blogs"  :key="post.index">
                    <a-col    >
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
              <div v-if="data.UserFollowing.blogs.length === 0" >
                            <a-alert
      type="error"
      message="No more followed Users found"
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
import CardFollow from "../components/CardFollow.vue";

export default {
  data() {
    return {
      var1: {
        num: this.$route.params.page * 20
      }
    };
  },
  methods: {
    roundnumber(value) {
      const val = Math.round(value);
      return val;
    },
    checkfilter() {
      if (this.$route.params.filter !== "all") {
        this.var1 = { num: this.$route.params.page * 20 };
      }
      if (this.$route.params.filter === "all") {
        this.var1 = { num: this.$route.params.page * 20 };
      }
    }
  },
  mounted() {
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
    CardFollow
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
