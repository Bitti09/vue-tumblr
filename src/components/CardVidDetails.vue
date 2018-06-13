<template>
<div
style="width: 100%;max-width: 100%;max-height: 600px">
  <a-card>
        <d-player
        style="width: 100%;max-width: 100%;max-height: 600px;height: 600px"
         v-if="this.videotype !== 'youtube'"
        :options="options" >
    </d-player><br>
        <plyr
        v-if="this.videotype == 'youtube'"
        style="width: 100%;max-width: 100%;max-height: 600px;height: 600px" >
        <div class="plyr__video-embed">
        <iframe :src="this.vidSrc2" allowfullscreen ></iframe>
    </div>
</plyr>
<!-- <plyr-video :poster="imgSrc"  :videos="this.videos"/>-->
    <small class="text-muted">Video  1 of 1</small>
</a-card></br>
</div>
</template>
<style>
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
