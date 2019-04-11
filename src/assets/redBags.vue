<template>
  <div>
    <!-- 抢红包倒计时 -->
    <div class="red-bags" v-show="isCountDown">
      <div class="ready">
        <img @click="close" class="close" src="../../static/img/close.png" alt="">
        <img class="fortune" src="../../static/img/fortune.gif" alt="">
        <p>距红包雨还剩<span>{{redPacketTime}}</span>秒</p>
      </div>
    </div>
    <!-- 倒计时结束，红包雨出现 isStartRed -->
    <div class="mask-red-packet" v-show="isStartRed">
      <div ref="imgBox" id="start">
        <!-- <img class="small-bag" src="../../static/img/redbag.png"> -->
      </div>
    </div>
  </div>
</template>

<script>
import Redbags from '@/util'
import { mapState, mapActions } from 'vuex'
import iview from 'iview'
export default {
  data () {
    return {
      fortune: true,
      imgs: '',
      src: require('../../static/img/redbag.png')
    }
  },
  computed: {
    ...mapState(["isStartRed", "redPacketTime", "isCountDown", "redEndTime"])
  },
  methods: {
    ...mapActions(['startRed']),
    close () {
      this.fortune = false
    }
  },
  watch: {
    isStartRed (newVal) {
      if (newVal) {
        new Redbags
        let duration = this.redEndTime - this.redPacketTime;
        let endtimer = setInterval(() => {
          duration -= 1
          if (duration < 0) {
            clearInterval(endtimer)
            this.startRed(false)
            iview.Message.info({
              content: '红包抢完啦，下次再来！',
              duration: 10
            });
          }
        }, 1000)
      }
    }
  }
}
</script>

<style>
@keyframes rotateRedBag {
  0% {
    transform: rotate(0)
  }
  25% {
    transform: rotate(30deg)
  }
  50% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(30deg)
  }
}
.red-bags {
  z-index: 999;
  position: absolute;
  top: 100px;
  left: 30px;
}
.ready {
  position: relative;
}
.ready p {
  text-align: center;
  font-size: 18px;
}
.ready p span {
  font-size: 22px;
  color: #FE442B;
}
.ready .close {
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
.mask-red-packet {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, .7);
  z-index: 999;
}
#start {
  width: 60%;
  margin: 0 auto;
}
.small-bag{
  display: inline-block;
  width: 70px;
  height: 80px;
  cursor: pointer;
  animation: rotateRedBag 1s infinite;
  position: absolute;
}
</style>
