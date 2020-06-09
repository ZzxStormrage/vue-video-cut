<template>
  <div class="video-cut-wrap">
    <video id="previewVideoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from 'video.js'
import './video_offset'
import 'video.js/dist/video-js.css'
import '../assets/custom-video.scss'
// import './video_watermark.js'
// import './video_watermark.scss'

export default {
  name: 'VideoCut',
  props: {
    video_options: {
      type: Object,
      default() {
        return {}
      }
    },
    start_time_ms: {
      type: Number,
      default() {
        return 0
      }
    },
    video_offset_ms: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      player: null,
      options: {
        autoplay: false, // 自动播放
        controls: true, // 是否显示控制栏
        sourceOrder: true,
        notSupportedMessage: '此视频暂无法播放', //无法播放时显示的信息
        height: '',
        width: '',
        language: 'zh',
        source: [
          {
            type: 'video/mp4',
            src: ''
          }
        ],
        // fluid: false,
        poster: '',
        featuresPlaybackRate: false,
        playbackRates: [0.7, 1, 1.5, 2, 3],
        controlBar: {
          // 配置控制栏
          timeDivider: true, // 时间分割线
          durationDisplay: true, // 总时间
          progressControl: true, // 进度条
          customControlSpacer: false, // 未知
          fullscreenToggle: true, // 全屏
          remainingTimeDisplay: false
        }
      },
      status_loading: true,
      video_error: false
    }
  },
  computed: {
    // updata_num() {
    //   return this.$store.state.updata_unmebr
    // }
  },
  watch: {

  },
  methods: {
    videoInit() {
      const self = this

      var video_options = JSON.parse(JSON.stringify(self.video_options))
      self.options.width = video_options.width
      self.options.height = video_options.height

      self.player = videojs('previewVideoPlayer', self.options, function onPlayerReady() {
        self.player.load()
        self.player.reset()
        // this.volume(0)
        self.player.src([
          {
            type: 'video/mp4',
            src: video_options.src
          }
        ])

        if (self.start_time_ms > 0) {
          var s = self.start_time_ms / 1000
          this.currentTime(s)
        }

        // 视频error
        this.on('error', function() {
          self.video_error = true
          self.setError()
        })
        this.on('timeupdate', function() {
          const curTime = this.currentTime()
          
          if (curTime > 60) {
            self.videoOffset()
          }
        })
      })
    },
    videoOffset() {
      if (this.player) {
        var start_ms = this.video_offset_ms.start_ms / 1000
        var end_ms = this.video_offset_ms.end_ms / 1000

        this.player.offset({
          start: start_ms || 0,
          end: end_ms || 0,
          restart_beginning: true ///视频结束时是否应转到开头
        })
      }
    },
    // setWatermark() {
    //   var imgUrl = require('@/assets/img/watermark.png')
    //   this.player.watermark({
    //     image: imgUrl,
    //     fadeTime: null
    //   })
    // },
    setError() {
      var dom = document.querySelector('.vjs-modal-dialog-content')
      var str =
        '<div class="h-100 d-flex justify-content-center align-items-center"><i class="iconfont iconcuowutishi fz-30px fc-c mr-10px"></i>糟糕，视频播放出错！请刷新页面重试或者换个视频看看</div>'
      dom.innerHTML = str
    },
    videoPause() {
      var previewVideoModel = document.getElementById('previewVideoModel')
      document.onkeyup = (e) => {
        if (e.keyCode === 32) {
          if (previewVideoModel) {
            console.log(previewVideoModel)
            var isPaused = this.player.paused()
            isPaused ? this.player.play() : this.player.pause()
          }
        }
      }
    }
  },
  created() {},
  mounted() {
    this.videoInit()
    this.videoOffset()
    this.videoPause()
    // this.setWatermark()
  },
  beforeDestroy() {
    if (this.player) {
      this.videoPause = null
      this.player.dispose()
    }
  }
}
</script>
