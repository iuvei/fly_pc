<template>
  <div id="subRecWith">
    <Modal v-model="showDetail" title="订单详情" @on-cancel="cancel" @on-ok="confirm('0')" :closable="false">
      <ul class="orderDetail">
        <li>
          <h3>{{tradeType}}信息</h3>
        </li>
        <li>{{tradeType}}金额：{{Number(details.amount).toFixed(2)}}&nbsp;元</li>
        <li>账户信息：{{details.account}}</li>
        <li>{{tradeType}}时间：{{details.applytime?details.applytime.slice(0,-2):''}}</li>
        <!-- <li>认证姓名：{{details.realname}}</li> -->
        <li>{{tradeType}}方式：{{dealType(details.dealType)}}转账</li>
      </ul>
      <ul class="orderDetail_bottom">
        <li>
          <h3>{{dealType(details.dealType)}}账户信息</h3>
        </li>
        <li>姓名：{{details.realname}}</li>
        <li>账号：{{details.paynum}}</li>
        <li>Tips：为了加快入款和出款速度，请务必于转账后再提交资料！</li>
      </ul>
    </Modal>
    <Tabs value="name1">
      <TabPane :label="rechargeLabel" name="name1">
        <div>
          <ul class="pay-way" v-if="rechargeList.length!==0">
            <li class="way-item" v-for="(item, index) in rechargeList" :key="index">
              <div>
                <span class="name">{{item.account}}</span>
                <span class="money">(￥{{item.amount}})</span>
              </div>
              <Button @click="open(item)" type="info">详情</Button>
            </li>
          </ul>
          <div v-else>
            <p style="color:#666;text-align:center;font-size: 14px;">--暂无申请--</p>
          </div>
        </div>
      </TabPane>
      <TabPane :label="withdrawLabel" name="name2">
        <div>
          <ul class="pay-way" v-if="withdrawList.length!==0">
            <li class="way-item" v-for="(item, index) in withdrawList" :key="index">
              <div>
                <span class="name">{{item.account}}</span>
                <span class="money">(￥{{item.amount}})</span>
              </div>
              <Button @click="open(item)" type="info">详情</Button>
            </li>
          </ul>
          <div v-else>
            <p style="color:#666;text-align:center;font-size: 14px;">--暂无申请--</p>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      rechargeLabel: h => {
        return h("div", [
          h("span", "充值"),
          h("Badge", {
            props: {
              count: this.rechargeList.length
            },
            style: {
              display: this.rechargeList.length === 0 ? "none" : "inline-block"
            }
          })
        ]);
      },
      withdrawLabel: h => {
        return h("div", [
          h("span", "提现"),
          h("Badge", {
            props: {
              count: this.withdrawList.length
            },
            style: {
              display: this.withdrawList.length === 0 ? "none" : "inline-block"
            }
          })
        ]);
      },
      showDetail: false,
      details: [],
      type: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["queryApplyPoint", "disposeApplyPoint", "superToSub"]),
    init() {
      this.queryApplyPoint();
    },
    open(obj) {
      this.showDetail = true;
      this.details = obj;
    },
    cancel() {
      this.$Modal.confirm({
        title: "订单取消",
        content: "<p>是否取消订单？</p>",
        loading: true,
        onOk: () => {
          this.type = "2";
          this.submit();
        }
      });
    },
    submit() {
      this.disposeApplyPoint({
        subname: this.details.account,
        id: this.details.id,
        status: this.type
      }).then(res => {
        if (res.code === 0) {
          this.$Modal.remove();
          this.init();
          this.$Message.success({
            content: res.data
          });
        } else if (res.code === 1) {
          this.$Message.warning({
            content: res.data
          });
        }
      });
    },
    confirm(type) {
      this.type = type;
      this.submit();
    }
  },
  computed: {
    ...mapState(["points"]),
    ...mapGetters(["rechargeList", "withdrawList"]),
    dealType(type) {
      return type => {
        switch (type) {
          case "0":
            return "微信";
          case "1":
            return "支付宝";
          case "2":
            return "银行卡";
        }
      };
    },
    tradeType(){
      if(this.details.length!==0){
        switch(this.details.type){
          case '0':
          return '充值';
          case '1':
          return '提现'
        }
      }

    }
  }
};
</script>

<style scoped>
#subRecWith {
  width: 800px;
  margin: 0 auto;
  padding: 10px;
  background: #f5f5f5;
}
.pay-way .way-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pay-way .status {
  color: rgb(230, 68, 43);
}
.pay-way .money {
  color: rgb(230, 68, 43);
}
.orderDetail li {
  margin-bottom: 20px;
}
.orderDetail_bottom {
  margin-top: 30px;
}
.orderDetail_bottom li {
  margin-bottom: 20px;
}
</style>
