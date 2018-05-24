<template>
 <div id="app">
<a-layout>
   <a-layout-header :style="{ position: 'fixed', width: '100%' }">
    <a-menu
    @click="indexnew"
        theme="dark"
        mode="horizontal"
        :selectedKeys="['']"
        :defaultSelectedKeys="['index']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="dash">Home
</a-menu-item>
        <a-menu-item key="index">Likes</a-menu-item>
<a-menu-item key="follow">
Followed
</a-menu-item>
  <a-sub-menu>
    <span slot="title">Filter</span>
      <a-menu-item key="filteroff">No Filter</a-menu-item>
      <a-menu-item key="filterpic">Pics only</a-menu-item>
      <a-menu-item key="filtervid">Video only</a-menu-item>
  </a-sub-menu>

</a-menu>
    </a-layout-header>
    <a-layout-content :style="{marginTop: '90px'}">
    <router-view/>
        </a-layout-content>

        </a-layout>

  </div>
</template>

<style >
.ant-layout-header {
  z-index: 1;
}
.ant-layout-content {
  z-index: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script>
export default {
  data() {
    return {
      user: "",
      page1: this.$route.params.page * 1,
      name1: this.$route.name,
      filter1: this.$route.params.filter,
      blog1: this.$route.params.User
    };
  },
  methods: {
    onSubmit() {
      // eslint-disable-next-line
      console.log(this);
      this.$router.push({
        name: "BlogPosts",
        params: {
          filter: "all",
          page: 0,
          User: this.user
        }
      });
      this.user = "";
    },
    indexnew({ item, key, keyPath }) {
      // eslint-disable-next-line
      console.log({ item, key, keyPath });
      switch (key) {
        default:
          this.page1 = 0;
          this.$router.push({
            name: "Dashboard",
            params: {
              page: 0,
              filter: "all"
            }
          });
          break;
        case "dash":
          this.page1 = 0;
          this.$router.push({
            name: "Dashboard",
            params: {
              page: 0,
              filter: "all"
            }
          });
          break;
        case "index":
          this.page1 = 0;
          this.$router.push({
            name: "Home",
            params: {
              page: 0
            }
          });
          break;
        case "prev":
          if (this.page1 > 0) {
            this.page1 -= 1;
            this.$router.push({
              name: this.name1,
              params: {
                page: this.page1,
                filter: this.filter1,
                User: this.blog1
              }
            });
          }
          break;
        case "start":
          this.page1 = 0;
          this.$router.push({
            name: this.name1,
            params: {
              page: 0,
              filter: this.filter1,
              User: this.blog1
            }
          });
          break;
        case "next":
          // eslint-disable-next-line
          this.page1 += 1;
          this.$router.push({
            name: this.name1,
            params: {
              page: this.page1,
              filter: this.filter1,
              User: this.blog1
            }
          });
          break;
        case "follow":
          this.page1 = 0;
          // eslint-disable-next-line
          console.log(item.selectedKeys);
          item.selectedKeys.length = 0;
          // eslint-disable-next-line
          console.log(item.selectedKeys);
          this.$router.push({
            name: "Following",
            params: {
              page: 0
            }
          });
          break;
        // filters
        case "filteroff":
          this.$router.push({
            name: this.$route.name,
            params: {
              User: this.$route.params.User,
              page: this.$route.params.page * 1,
              filter: "video"
            }
          });
          break;
        case "filterpic":
          this.$router.push({
            name: this.$route.name,
            params: {
              User: this.$route.params.User,
              page: this.$route.params.page * 1,
              filter: "photo"
            }
          });
          break;
        case "filtervid":
          // eslint-disable-next-line
          console.log(this.$route.name);
          this.$router.push({
            name: this.$route.name,
            params: {
              User: this.$route.params.User,
              page: this.$route.params.page * 1,
              filter: "video"
            }
          });
          break;
      }
    },
    keymonitor(event) {
      // eslint-disable-next-line
      if (event.key === 'Enter') {
      }
    }
  },
  // eslint-disable-next-line
  mounted: function() {
    if (!this.$route.params.filter) {
      this.filter1 = "all";
    }
    if (this.$route.params.filter) {
      this.filter1 = this.$route.params.filter;
    }
  },
  watch: {
    // eslint-disable-next-line
    $route: function(newVal, oldVal) {
      // eslint-disable-next-line
      this.page1 = this.$route.params.page * 1;
      this.name1 = this.$route.name;
      if (!this.$route.params.filter) {
        this.filter1 = "all";
      }
      if (this.$route.params.filter) {
        this.filter1 = this.$route.params.filter;
      }
      this.blog1 = this.$route.params.User;
    }
  }
};
</script>
