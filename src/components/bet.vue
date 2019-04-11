<template>
  <div class="bet_content" style="z-index:0">
    <!--签到modal组件-->
    <Modal v-model="modal3" width="800">
      <p slot="header" style="text-align:left">
        <span>签到</span>
      </p>
      <div style="text-align:center">
        <Tabs value="sign" v-if="activityList.length!==0">
          <TabPane :label="item.name" :name="item.id" v-for="(item,index) in activityList" :key="index">
            <!--签到modal-->
            <Sign v-if="item.id=='sign'" :list="item" @ok="getActivityList"></Sign>
            <Reward v-else-if="item.id=='betAward'" :list="item" @ok="getActivityList"></Reward>
            <top-up v-else-if="item.id=='subaward'" :rewardData="item" @_rewardData="_rewardData"></top-up>
          </TabPane>
        </Tabs>
        <div v-else>
          <p style="height: 50px;line-height: 50px;">此活动页面已关闭</p>
        </div>
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <!-- 签到入口 -->
    <div class="qiandao" v-if="showImg&&userDetail.type=='0'">
      <span class="super" v-if="num!=0">{{num}}</span>
      <span class="sign-close" v-else @click="closeImg"></span>
      <img src="../../static/img/qiandao.png" @click="showModal" />
    </div>
    <!-- 左边侧边栏 -->
    <div class="bet_left">
      <div class="nouvelle">
        <Announcement></Announcement>
      </div>
      <Aside></Aside>
    </div>
    <!-- 中间部分 -->
    <div class="bet_center" v-if="show">
      <UnRound></UnRound>
      <div class="bet_menu">
        <BetMenu></BetMenu>
      </div>
      <div class="shoppingTable" v-if="selectMode!=2">
        <ShoppingTable></ShoppingTable>
      </div>
      <div v-if="selectMode!=2">
        <Chase></Chase>
      </div>
    </div>
    <div class="bet_right" v-if="show">
      <BetCollapse></BetCollapse>
    </div>
  </div>
</template>

<script>
  import Aside from "./bet/aside.vue";
  import UnRound from "./bet/unRound.vue";
  import BetMenu from "./bet/menu.vue";
  import BetCollapse from "./bet/BetCollapse.vue";
  import ShoppingTable from "./bet/shoppingTable.vue";
  import Chase from "./bet/chase.vue";
  import Announcement from "./announcement.vue";
  import {
    mapState,
    mapActions
  } from "vuex";
  import Sign from "./Sign.vue";
  import Reward from "./Reward.vue";
  import topUp from "./topUp.vue";
  export default {
    name: "bet",
    activated() {
      if (!this.keepAlive) {
        this.show = false;
        setTimeout(() => {
          this.show = true;
        });
      }
      this.getActivityList();
    },
    created() {
      this.show = true;
      this.getActivityList();
    },
    data() {
      return {
        modal2: false,
        show: false,
        showImg: true,
        modal3: false,
        activityList: [],
        num: 0
      };
    },
    methods: {
      ...mapActions(["queryActivity", "getUserDetail"]),
      closeImg() {
        this.showImg = false;
      },
      getActivityList() {
        this.queryActivity().then(res => {
          if (res && res.length !== 0) {
            this.activityList = res;
            this.activityList = this.activityList.concat([]);
            this.num = 0;
            res.forEach(item => {
              if (!item.nowStatus) {
                this.num++;
              }
            });
          } else {
            this.showImg = false;
          }
        });
      },
      showModal() {
        this.modal3 = true;
        this.getActivityList();
      },
      _rewardData (data) {
        this.activityList.forEach((val, idx, arr) => {
          if (val.id == "subaward") {
            val = data
          }
        })
      }
    },
    computed: mapState(["classId", "keepAlive", "selectMode", "userDetail"]),
    components: {
      Aside,
      UnRound,
      BetMenu,
      ShoppingTable,
      Chase,
      BetCollapse,
      Announcement,
      Sign,
      Reward,
      topUp
    },
    watch: {
      subGameId(newId) {
        this.subGames({
          url: "/inter/ticket/subGames",
          data: newId
        });
      }
    }
  };
</script>

<style scoped>
  .bet_content {
    position: relative;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    top: 0;
    bottom: 0;
  }
  .bet_content .qiandao {
    position: fixed;
    right: 20px;
    bottom: 71.2px;
    z-index: 10;
  }
  .bet_content .qiandao .super {
    background: red;
  }
  .bet_content .qiandao .sign-close,
  .bet_content .qiandao .super {
    position: absolute;
    width: 24px;
    height: 24px;
    color: #fff;
    line-height: 24px;
    text-align: center;
    font-size: 14px;
    top: 29px;
    right: 2px;
    border-radius: 50%;
    cursor: pointer;
  }
  .bet_content .qiandao img {
    width: 180px;
    cursor: pointer;
    z-index: 9999;
  }
  .bet_content .bet_left {
    position: relative;
    background: #f3f3f3;
    border-left: 1px solid #b4b4b4;
    border-right: 1px solid #b4b4b4;
    width: 150px;
    box-sizing: border-box;
    height: 100%;
  }
  .bet_content .bet_right {
    position: absolute;
    background: #ececec;
    top: 0;
    left: 930.2px;
    width: 260px;
    overflow: auto;
    height: 100%;
  }
  .bet_content .bet_center {
    width: 780px;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 150px;
    bottom: 0px;
    overflow: auto;
    overflow-x: hidden;
    background: #ffffff;
  }
  .bet_content .nouvelle {
    width: 147px;
    height: auto;
    background: #ffffff;
    border-bottom: 1px solid #b4b4b4;
  }
  /*开奖详情*/
  /*开奖详情*/
</style>