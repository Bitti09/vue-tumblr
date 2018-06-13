<template>
<div
style="width: 100%;max-width: 100%;max-height: 600px">
  <a-card>
        <d-player
        style="width: 100%;max-width: 100%;max-height: 600px;height: 600px"
         v-if="this.videotype !== 'youtube'"
        :options="options" >
    </d-player><br>
     <iframe width="100%" height="500px" frameborder="0" webkitAllowFullScreen
mozallowfullscreen allowFullScreen   :src="vidurl"></iframe><!-- <plyr-video :poster="imgSrc"  :videos="this.videos"/>-->
    <small class="text-muted">Video  1 of 1</small>
</a-card></br>
</div>
</template>
<style>
.plyr--full-ui .plyr__video-embed iframe {
  height: 400px !important;
}
</style>
<script>
export default {
  props: ["img-src", "vid-src", "videotype", "vidSrc2"],
  data() {
    return {
      options: {
        video: { url: this.vidSrc, pic: this.imgSrc }
      },
      x: this.vidSrc2
        .replace(/\/$/, "")
        .split("=")
        .pop()
    };
  },
  computed: {
    vidurl() {
      if (this.vidSrc2) {
        var x = this.vidSrc2
          .replace(/\/$/, "")
          .split("=")
          .pop();
        var y = "https://www.youtube.com/embed/" + x;
        return y;
      }
    }
  }
};
</script>
