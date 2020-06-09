<template>
  <div id="app">
    <videoCut
      :video_options="video_options"
      :video_offset_ms="video_offset_ms"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      video_options: {
        width: 900,
        height: 600,
        src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
      },
      video_offset_ms: {
        start_ms: 10000,
        end_ms: 50000
      },
      start_time_ms: 5000
    };
  },
  components: {}
};
</script>

<style>
</style>
