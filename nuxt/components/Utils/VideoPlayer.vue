<!-- Video.js player -->
<!-- Not working server side -->
<template>
  <video ref="videoPlayer" class="video-js"></video>
</template>

<script>
import videojs from "video.js";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      // this.player.log("onPlayerReady", this);
    });
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<!-- Basic HTML video player -->
<!-- <template>
  <div>
    <video autoplay muted loop :src="videoUrl"></video>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  videoUrl: {
    type: String,
    required: true,
  },
});
</script> -->
