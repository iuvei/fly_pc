import { fetch } from './services/fetch'
import store from "./vuex/store"
import iview from 'iview'
export default class RedClick {
  constructor() {
    this.box = document.getElementById("start");
    this.timer = null;
    this.redTimer = null;
    this.createRedPacketRain();
  }
  // 红包点击事件
  handleClickRed(el) {
    let _this = this
    el.addEventListener('click', async () => {
      await fetch('post', 'redPacket').then(res => {
        if (res.code == 0) {
          iview.Message.success(`${res.data}`);
        }
        console.log(this)
      })
    })
  }
  // 创建红包
  createRedPacket() {
    let _this = this;
    let newRedNode = document.createElement("img");
    newRedNode.src = "../static/img/redbag.png";
    newRedNode.className = "small-bag";
    newRedNode.style.top = this.getRandom(0, 20) + "px";
    newRedNode.style.left = this.getRandom(100, window.innerWidth - 170) + "px";
    this.box.appendChild(newRedNode);
    this.handleClickRed(newRedNode);
    this.redTimer = setInterval(() => {
      let top = newRedNode.offsetTop;
      newRedNode.style.top = top + 3 + "px";
      // 当红包移动超出屏幕可视区域，移除节点
      if (top > window.innerHeight) {
        _this.box.removeChild(newRedNode);
      }
    }, 17)
  }
  // 动态创建红包
  createRedPacketRain() {
    let _this = this
    this.timer = setInterval(() => {
      _this.createRedPacket();
      console.log(`state`, store.state.isStartRed);
      if (!store.state.isStartRed) {
        clearInterval(_this.timer);
        _this.box.innerHTML = "";
      }
    }, 300);
  }
  // 获取min~max之间随机数
  getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
