## 前端截取视频 片段插件 基于vue videoJS 支持跳转指定毫秒

## Install
```shell
cnpm install vue-video-cut -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import videoCut from 'vue-video-cut'

Vue.use(videoCut)
```


## 使用
``` bash
<videoCut :video_options="video_options" :video_offset_ms="video_offset_ms"/>

video_options: {
  width: 100,
  height: 200,
  src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
},
video_offset_ms: {
  start_ms: 20000, #开始时间 毫秒
  end_ms: 50000 #结束时间 毫秒
}
start_time_ms: 1000 #跳转到指定帧 start_time_ms 和 video_offset_ms 不能同时使用

  
```

