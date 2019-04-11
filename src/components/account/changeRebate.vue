<template>
  <div id="_rebate">
    <div>
      <Select v-model="types" style="width:200px" @on-change="query(1)">
          <Option v-for="(item,index) of kindList" :value="item.classId" :key="index">{{item.className}}</Option>
        </Select>
      <p class="instruction">说明：设置赚取差价的时候，每个模式设置不能超过该账户的最高赔率，否则会出现会员盈利负数。（例如：赔率1.992设置赚取大于0.992时，例如赚取1，会出现-0.008）</p>
    </div>
    <div>
      <p class="_button" v-if="!show">
        <Button @click.native="change" type="primary">修改</Button>
      </p>
      <p class="_button" v-else>
        <Button @click.native="confirm" type="primary">确认</Button>
        <Button @click.native="cancel">取消</Button>
      </p>
      <Table :columns="columns" :data="datas"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="memberModel.length" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapGetters,
    mapMutations
  } from "vuex";
  export default {
    data() {
      return {
        types: "1",
        //动态展示输入框
        show: false,
        baseModelList: [],
        //储存修改彩类id
        rows: [],
        //储存修改的彩类
        arr: [],
        page: 1,
        columns: [{
            title: "种类",
            key: "subGameName"
          },
          {
            title: "赔率",
            // key:'ownOdd',
            render: (h, params) => {
              return h(
                "div", {
                  style: {
                    // fontSize: "14px",
                    "word-wrap": "break-word",
                    // "text-align": "center"
                  }
                },
                Number(params.row.ownOdd)
              );
            }
          },
          {
            title: "A模式",
            key: "A_rebate",
            render: (h, params) => {
              if (this.show) {
                return h("InputNumber", {
                  props: {
                    min: 0,
                    value: Number(params.row.oddsModela)
                  },
                  on: {
                    "on-change": num => {
                      // console.log(num)
                      if (num !== Number(params.row.oddsModela)) {
                        if (!this.rows.includes(params.row.id)) {
                          params.row.oddsModela = String(num);
                          this.rows.push(params.row.id);
                          this.arr.push(params.row);
                        } else {
                          console.log(this.rows.indexOf(params.row.id));
                          this.arr[this.rows.indexOf(params.row.id)][
                            "oddsModela"
                          ] = String(num);
                        }
                      }
                      // this.changeMemberModel({
                      //   index: params.index,
                      //   model: "oddsModela",
                      //   data: String(num)
                      // });
                      // console.log(this.memberModel);
                    }
                  }
                });
              } else {
                return h("span", {
                  domProps: {
                    innerHTML: params.row.oddsModela
                  }
                });
              }
            }
          },
          {
            title: "B模式",
            key: "B_rebate",
            render: (h, params) => {
              if (this.show) {
                return h("InputNumber", {
                  props: {
                    min: 0,
                    value: Number(params.row.oddsModelb)
                  },
                  on: {
                    "on-change": num => {
                      if (num !== Number(params.row.oddsModelb)) {
                        if (!this.rows.includes(params.row.id)) {
                          params.row.oddsModelb = String(num);
                          this.rows.push(params.row.id);
                          this.arr.push(params.row);
                        } else {
                          this.arr[this.rows.indexOf(params.row.id)][
                            "oddsModelb"
                          ] = String(num);
                        }
                      }
                      // this.changeMemberModel({
                      //   index: params.index,
                      //   model: "oddsModelb",
                      //   data: String(num)
                      // });
                      //  console.log(this.memberModel)
                    }
                  }
                });
              } else {
                return h("span", {
                  domProps: {
                    innerHTML: params.row.oddsModelb
                  }
                });
              }
            }
          },
          {
            title: "C模式",
            key: "C_rebate",
            render: (h, params) => {
              if (this.show) {
                return h("InputNumber", {
                  props: {
                    min: 0,
                    value: Number(params.row.oddsModelc)
                  },
                  on: {
                    "on-change": num => {
                      if (num !== Number(params.row.oddsModelc)) {
                        if (!this.rows.includes(params.row.id)) {
                          params.row.oddsModelc = String(num);
                          this.rows.push(params.row.id);
                          this.arr.push(params.row);
                        } else {
                          this.arr[this.rows.indexOf(params.row.id)][
                            "oddsModelc"
                          ] = String(num);
                        }
                      }
                      // this.changeMemberModel({
                      //   index: params.index,
                      //   model: "oddsModelc",
                      //   data: String(num)
                      // });
                      //  console.log(this.memberModel)
                    }
                  }
                });
              } else {
                return h("span", {
                  domProps: {
                    innerHTML: params.row.oddsModelc
                  }
                });
              }
            }
          },
          {
            title: "D模式",
            key: "D_rebate",
            render: (h, params) => {
              if (this.show) {
                return h("InputNumber", {
                  props: {
                    min: 0,
                    value: Number(params.row.oddsModeld)
                  },
                  on: {
                    "on-change": num => {
                      if (num !== Number(params.row.oddsModeld)) {
                        if (!this.rows.includes(params.row.id)) {
                          console.log(this.rows)
                          params.row.oddsModeld = String(num);
                          this.rows.push(params.row.id);
                          this.arr.push(params.row);
                        } else {
                          this.arr[this.rows.indexOf(params.row.id)][
                            "oddsModeld"
                          ] = String(num);
                        }
                      }
                      // this.changeMemberModel({
                      //   index: params.index,
                      //   model: "oddsModeld",
                      //   data: String(num)
                      // });
                      //  console.log(this.memberModel)
                    }
                  }
                });
              } else {
                return h("span", {
                  domProps: {
                    innerHTML: params.row.oddsModeld
                  }
                });
              }
            }
          }
        ],
        datas: [{
          subGameName: "重庆时时彩"
        }]
      };
    },
    created() {
      this.init();
    },
    methods: {
      ...mapActions("account", ["queryMemberModel", "updateMemberModel"]),
      ...mapActions(["getKind"]),
      ...mapMutations("account", ["changeMemberModel"]),
      // 初始化
      init() {
        if (this.kindList.length == 0) {
          this.getKind();
        }
        this.query(1);
      },
      query(page) {
        this.queryMemberModel(`/${this.types}`).then(res => {
          // console.log(this.memberModel_p);
          // console.log(this.memberModel.length);
          this.datas = this.memberModel_p[page - 1];
        });
      },
      change() {
        this.show = true;
      },
      cancel() {
        this.arr = [];
        this.rows = [];
        this.query(this.page);
        this.show = false;
      },
      changePage(page) {
        this.query(page);
        // this.datas = this.memberModel_p[page - 1];
        this.page = page;
      },
      //确认
      confirm() {
        this.updateMemberModel({
          baseModelList: this.arr
        }).then(res => {
          if (res.code === 0) {
            this.$Message.success(res.msg);
            this.show = false;
            this.arr = [];
            this.rows = [];
          } else {
            this.$Message.warning(res.msg);
            this.query(this.page);
          }
        });
      }
    },
    computed: {
      ...mapState("account", ["memberModel"]),
      ...mapState(["kindList", "GameList"]),
      ...mapGetters("account", ["memberModel_p"])
    },
    watch: {}
  };
</script>

<style>
  .instruction {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .ivu-table-expanded-cell {
    padding: 0 !important;
  }
  .ivu-table-expanded-cell .ivu-table-wrapper {
    border: 0;
  }
  ._button {
    text-align: right;
    margin-bottom: 10px;
  }
  ._button button {
    margin-left: 20px;
  }
</style>
