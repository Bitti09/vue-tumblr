<template>
<div>
  <a-card  style="width: 60%;max-width: 100%;">
              <plyr-video :poster="imgSrc"  :videos="this.videos"/>
    <small class="text-muted">Video  1 of 1</small>
</a-card>
</div>
</template>
<style scoped>
</style>
<script>
export default {
  props: ["img-src", "vid-src"],
  data() {
    return {
      videos: [{ src: this.vidSrc, format: "mp4" }]
    };
  }
};
</script>
