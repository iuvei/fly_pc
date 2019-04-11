<template>
  <div class="top-up">
    <div class="reward">
      <h3>奖励说明：</h3>
      <p class="explain">下级充值<span>{{rewardData.needAmount}}</span>元，可领取奖励<span>{{rewardData.subAwardAmount}}</span>元。</p>
      <Table class="get-table" :columns="columns1" :data="rewardData.data"></Table>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { setTimeout } from 'timers';
export default {
    props: ["rewardData"],
    data() {
        return {
            subTopUp: "111",
            getReward: "22",
            data: [
                {
                    ACCOUNT: 'aaaaa111111111',
                    SUBAMOUNT: '111111'
                },
                {
                    ACCOUNT: 'aaaaa222222222',
                    SUBAMOUNT: '111111'
                },
                {
                    ACCOUNT: 'aaaaa333333333',
                    SUBAMOUNT: '111111'
                },
                {
                    ACCOUNT: 'aaaaa444444444',
                    SUBAMOUNT: '111111'
                },
                {
                    ACCOUNT: 'aaaaa5555555555',
                    SUBAMOUNT: '111111'
                },
                {
                    ACCOUNT: 'aaaaa66666666',
                    SUBAMOUNT: '111111'
                },
                {
                    ACCOUNT: 'aaaaa7777777777',
                    SUBAMOUNT: '111111'
                }
            ],
            columns1: [
                {
                    title: "下级账号",
                    key: "ACCOUNT"
                },
                {
                    title: "充值金额",
                    key: "SUBAMOUNT"
                },
                {
                    title: "操作",
                    key: "opertion",
                    render: (h, params) => {
                        return h(
                            "Button",
                            {
                                props: {
                                    type: "primary"
                                },
                                on: {
                                    click: () => {
                                        let sendData = {
                                          subusername: params.row.ACCOUNT,
                                          type: "subaward"
                                        }
                                        this.activityAward(sendData).then(res => {
                                          this.rewardData.data.splice(params.index, 1)
                                          if (res.code == 0) {
                                              this.$emit("_rewardData", this.rewardData)
                                          }
                                        })
                                    }
                                }
                            },
                            "领取"
                        );
                    }
                }
            ]
        };
    },
    methods: {
        ...mapActions(["activityAward"])
    }
};
</script>

<style scoped>
.top-up {
    background: #ffe97b;
    border-radius: 7px;
    padding: 10px;
}
.top-up .reward {
    background: #fffae0;
    padding: 10px;
}
.top-up .reward h3 {
    text-align: left;
}
.top-up .reward .explain {
    padding: 7px;
    text-align: left;
    background-color: #ffe49c;
}
.top-up .reward .explain span {
    color: #ff5e53;
}
.top-up .get-table {
    margin: 20px 0;
}
</style>
