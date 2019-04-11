<template>
  <div id="app" v-if="isRouterAlive">
    <Modal v-model="announcement" title="会员公告">
      <p>{{textContent}}</p>
      <div slot="footer">
        <Button @click="announcement=false" type="primary" size="default">确认</Button>
      </div>
    </Modal>
    <Layout>
      <Header v-if="!isLogin&&hide">
        <OffHeader></OffHeader>
      </Header>
      <Header v-if="isLogin&&hide">
        <OnHeader></OnHeader>
      </Header>
      <Content ref="con" @scroll.native="handleScroll">
        <keep-alive :include="['bet']">
          <router-view />
        </keep-alive>
      </Content>
      <Footer v-if="hide">
        <vFooter v-if="!isLogin"></vFooter>
        <lFooter v-if="isLogin"></lFooter>
      </Footer>
    </Layout>
    <!-- <red-bags></red-bags> -->
  </div>
</template>

<script>
  import {
    mapState,
    mapActions,
    mapMutations
  } from "vuex";
  import OffHeader from "./assets/header1.vue";
  import OnHeader from "./assets/header2.vue";
  import vFooter from "./assets/footer.vue";
  import lFooter from "./assets/loginFooter.vue";
  import redBags from './assets/redBags.vue'
  import baseUrl from "./gobal.js";
  import {
    bus
  } from "./bus.js";
  export default {
    created() {
      try {
        document.body.removeChild(document.getElementById("appLoading"));
      } catch (e) {}
      this.$Notice.config({
        top: 64,
        duration: 3
      });
      if (this.$router.history.current.name == "Game") {
        this.hide = false;
      } else {
        this.hide = true;
      }
      // console.log(this.$router.history.current.name,'666')
      if (this.$router.history.current.name != "register") {
        this.getUserDetail().then(res => {
          if (res.code == "666") {
            this.setIsLogin(false);
          } else {
            this.setIsLogin(true);
            this.websoket();
            if (window.location.pathname == "/") {
              this.$router.push({
                path: "/bet"
              });
            }
            if (this.$router.history.current.name == "bet") {
              if (this.userDetail.type == "0") {
                this.register({
                  platform: "gm_ibc"
                }).then(res => {
                  if (res.code == "0") {
                    this.getBalance_sb({
                      platform: "gm_ibc"
                    });
                    //						this.getUrl_sb({platform:"gm_ibc",mobile: "no",})
                  } else if (res.code == "1") {
                    //					this.$Notice.warning({
                    //					  title: '全民代理通知',
                    //					  desc: '注册失败，请联系客服!'
                    //				    });
                  }
                });
                //礼记
                //					this.register({platform:"lj_lj"}).then((res) => {
                //					if(res.code == '0'){
                //						this.getBalance_lj({platform:"lj_lj"})
                //						this.getUrl_lj({platform:"lj_lj",mobile: "no",})
                //					}else if(res.code=="1"){
                //					this.$Notice.warning({
                //					  title: '全民代理通知',
                //					  desc: '注册失败，请联系客服!'
                //				    });
                //					}
                //				})//vg
                this.register({
                  platform: "vg_vg"
                }).then(res => {
                  if (res.code == "0") {
                    this.getBalance_vg({
                      platform: "vg_vg"
                    });
                    //						this.getUrl_vg({platform:"vg_vg",mobile: "no",})
                  } else if (res.code == "1") {
                    //					this.$Notice.warning({
                    //					  title: '全民代理通知',
                    //					  desc: '注册失败，请联系客服!'
                    //				    });
                  }
                });
                //申博
                //				this.register({platform:"sb_sb"}).then((res) => {
                //					if(res.code == '0'){
                //						this.getBalance_vg({platform:"sb_sb"})
                ////						this.getUrl_vg({platform:"vg_vg",mobile: "no",})
                //					}else if(res.code=="1"){
                ////					this.$Notice.warning({
                ////					  title: '全民代理通知',
                ////					  desc: '注册失败，请联系客服!'
                ////				    });
                //					}
                //				})
                //非凡棋牌
                //				this.register({platform:"fl_fl"}).then((res) => {
                //					console.log(res)
                //					if(res.code == '0'){
                //						this.getBalance_fl({platform:"fl_fl"})
                ////						this.getUrl_vg({platform:"vg_vg",mobile: "no",})
                //					}else if(res.code=="1"){
                ////					this.$Notice.warning({
                ////					  title: '全民代理通知',
                ////					  desc: '注册失败，请联系客服!'
                ////				    });
                //					}
                //				})
              }
            }
          }
        });
      }
    },
    mounted() {
      bus.$on("scrollTop", scroll => {
        this.$refs.con.$el.scrollTop = scroll;
      });
    },
    data() {
      return {
        webSocket: null,
        isOnline: true,
        announcement: false,
        textContent: "",
        isRouterAlive: true,
        hide: false
      };
    },
    methods: {
      ...mapActions([
        "setIsLogin",
        "getUserDetail",
        "sendMessage",
        "queryMemberNoticeList",
        "register",
        "getBalance_sb",
        "getBalance_lj",
        "getBalance_vg",
        "getUrl_lj",
        "getBalance_fl",
        "startRed",
        "redPacketTime",
        "informTime",
        "redEndTime"
      ]),
      ...mapMutations(["setKeepAlive", "countDown"]),
      websoket() {
        let URL_1;
        URL_1 = baseUrl;
        let accord = window.location.protocol;
        let str = "wss:";
        if (accord == "https:") {
          URL_1 = baseUrl.slice(6);
          str = "wss:";
        } else if (accord == "http:") {
          URL_1 = baseUrl.slice(5);
          str = "ws:";
        }
        var websocket = new ReconnectingWebSocket(
          encodeURI(str + URL_1 + "/inter/notifys")
        );
        //				let websocket = new WebSocket(encodeURI(str + URL_1 + "/notify/" + this.userDetail.account));
        this.webSocket = websocket;
        websocket.onopen = function() {
          console.log("连接成功");
        };
        websocket.onerror = function() {};
        websocket.onclose = function() {
          console.log("退出成功");
        };
        websocket.onmessage = message => {
          this.sendMessage(message);
          let wsData = JSON.parse(message.data);
          if (
            wsData.messageType !== "3" &&
            wsData.messageType !== "10"
          ) {
            this.getUserDetail();
            this.$Notice.info({
              title: "全民代理通知",
              desc: wsData.content
            });
          } else if (wsData.messageType === "10") {
            this.queryMemberNoticeList("?notice_type=2&type=1");
            this.textContent = wsData.notice;
            this.announcement = true;
          }
          // 判断抢红包，开始倒计时
          if (wsData.type == "4") {
            // 触发这个action保存informTime
            this.informTime(wsData.informTime)
            // 触发这个action更新redPacketTime来计算倒计时
            this.redPacketTime(wsData.startTime)
          }
          // 判断时间已到，开始抢红包
          if (wsData.type == "5") {
            // 触发这个action通知已经开始抢红包了，开始抢红包
            this.startRed(true)
            this.redPacketTime(wsData.startTime)
            this.redEndTime(wsData.endTime)
          }
        };
      },
      //滚动事件
      handleScroll(e) {
        bus.$emit("onScroll", e.srcElement.scrollTop);
      }
    },
    name: "app",
    components: {
      OffHeader,
      OnHeader,
      vFooter,
      lFooter,
      redBags
    },
    computed: mapState(["isLogin", "userDetail", "message"]),
    watch: {
      $route(to, from) {
        if (to.path == "/" && this.isLogin) {
          this.webSocket.close();
        } else {}
        if (from.path == "/" && this.isLogin) {
          //沙巴
          if (this.userDetail.type == "0") {
            this.register({
              platform: "gm_ibc"
            }).then(res => {
              if (res.code == "0") {
                this.getBalance_sb({
                  platform: "gm_ibc"
                });
                //						this.getUrl_sb({platform:"gm_ibc",mobile: "no",})
              } else if (res.code == "1") {
                //					this.$Notice.warning({
                //					  title: '全民代理通知',
                //					  desc: '注册失败，请联系客服!'
                //				    });
              }
            });
            //礼记
            //						this.register({platform:"lj_lj"}).then((res) => {
            //					if(res.code == '0'){
            //						this.getBalance_lj({platform:"lj_lj"})
            //						this.getUrl_lj({platform:"lj_lj",mobile: "no",})
            //					}else if(res.code=="1"){
            //					this.$Notice.warning({
            //					  title: '全民代理通知',
            //					  desc: '注册失败，请联系客服!'
            //				    });
            //					}
            //				})//vg
            this.register({
              platform: "vg_vg"
            }).then(res => {
              if (res.code == "0") {
                this.getBalance_vg({
                  platform: "vg_vg"
                });
                //						this.getUrl_vg({platform:"vg_vg",mobile: "no",})
              } else if (res.code == "1") {
                //					this.$Notice.warning({
                //					  title: '全民代理通知',
                //					  desc: '注册失败，请联系客服!'
                //				    });
              }
            });
            //申博
            //				this.register({platform:"sb_sb"}).then((res) => {
            //					if(res.code == '0'){
            //						this.getBalance_vg({platform:"sb_sb"})
            ////						this.getUrl_vg({platform:"vg_vg",mobile: "no",})
            //					}else if(res.code=="1"){
            ////					this.$Notice.warning({
            ////					  title: '全民代理通知',
            ////					  desc: '注册失败，请联系客服!'
            ////				    });
            //					}
            //				})
          }
          this.setKeepAlive(false);
          this.websoket();
        } else {
          this.setKeepAlive(true);
        }
        new Promise(function(reslove, reject) {
          if (
            from.path == "/" &&
            to.path.indexOf("help") == -1 &&
            to.path != "/register"
          ) {
            reslove();
          }
        }).then(() => {
          bus.$emit("announce", true);
        });
        if (from.path !== "/account/lotteryreport") {
          sessionStorage.setItem("mark", 2);
          sessionStorage.setItem("mark2", 2);
        }
        // 登录
        if (to.path == "/bet" && from.path == "/") {
          this.websoket()
        }
      }
    }
  };
</script>

<style scoped="scoped">
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body,
  #app {
    height: 100%;
    width: 100%;
  }
  #app .ivu-layout {
    width: 100%;
    height: 100%;
    background: #ffffff;
    overflow: auto;
  }
  #app .ivu-layout-header {
    min-width: 1200px;
    background: linear-gradient(0, #272a32 0, #4b4e58 100%) !important;
  }
  #app .ivu-layout-footer {
    height: 71.2px;
    background: linear-gradient(0, #272a32 0, #4b4e58 100%) !important;
    padding: 0 !important;
  }
  #app .ivu-layout-content {
    min-width: 1200px;
    height: 100%;
    overflow-x: hidden;
    background: #ececec;
  }
  /*.el-header,.el-footer{
  		padding: 0;
  		margin: 0;
  		height: 64px !important;
  		background: linear-gradient(0,#272a32 0,#4b4e58 100%)!important;
  	}
  	.el-menu{
  		background: linear-gradient(0,#272a32 0,#4b4e58 100%)!important;
  	}
  	.el-main{
  		flex: 1;
  		margin: 0 ;
  		padding: 0;
  		position: relative;
  		background: #ececec;
  	}
  	 .el-carousel__arrow{
  	 	font-size: 48px;
  		display: block;
  		width: 58px !important;
  		height:58px !important;
  		margin: 0 5%;
  	}
  	.el-carousel{
  		height: 350px;
  	}
  	.el-carousel__container{
  		height: 100%;
  	}*/
</style>