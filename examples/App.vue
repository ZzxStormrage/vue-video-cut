<template>
  <div id="app">
    <videoCut :video_options="video_options" :video_offset_ms="video_offset_ms"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      video_options: {
        src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
     },
     video_offset_ms: {
       start_ms: 20000,
       end_ms: 50000,
     }
    }
  },
  components: {
    
  }
}
</script>

<style>

</style>
