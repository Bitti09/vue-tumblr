<template>
<div style="width: 70%;max-width: 100%">
  <a-card  >
        <d-player v-if="this.videotype !== 'youtube'"
        :options="options" >
    </d-player><br>
        <plyr v-if="this.videotype == 'youtube'">
        <div class="plyr__video-embed">
        <iframe :src="this.vidSrc2" allowfullscreen ></iframe>
    </div>
</plyr>
              <!-- <plyr-video :poster="imgSrc"  :videos="this.videos"/>-->
    <small class="text-muted">Video  1 of 1</small>
</a-card>
</div>
</template>
<style scoped>
</style>
<script>
export default {
  props: ["img-src", "vid-src", "videotype", "vidSrc2"],
  data() {
    return {
              options: {
      video: { url: this.vidSrc, pic: this.imgSrc }
              }
    };
  }
};
</script>
