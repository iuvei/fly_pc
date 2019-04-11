<template>
  <div class="members">
    <!-- 日工资设置 -->
    <Modal v-model="modal2" width="700" class="modal2">
      <p slot="header" style="text-align:center">
        <span>日工资设置</span>
      </p>
      <div>
        <div>
          <Button type="ghost" @click="addRow1">新增</Button>
        </div>
        <div>
          <div class="tabel_title" style="display: flex; height: 62px; border: 1px solid #e9e9e9; padding-left: 8px; padding-right: 8px; align-items: center; border-radius: 4px 4px 0 0; margin-top: 10px;">
            <div style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
              <span>当前工资契约</span>
              <div>
                <Button type="primary" @click="sign1" style="margin-right: 10px;">
                      <Icon type="edit"></Icon>
                      <span style="margin-left: 5px;">签约</span>
                    </Button>
                <Button type="ghost" style="float: right" @click="refresh1">
                      <Icon type="refresh"></Icon> 刷新
                    </Button>
              </div>
            </div>
          </div>
          <Table border :columns="columns3" :data="data3"></Table>
        </div>
        <div style="border: 1px solid rgb(221, 221, 221); margin-top: 2rem; border-radius: 4px; padding: 1rem 0.6rem;">
          <p style="border-bottom: 1px solid rgb(221, 221, 221); padding-bottom: 0.5rem;">填写规则：日量从上往下递增，不可以等于；日工资是正整数</p>
          <p style="border-bottom: 1px solid rgb(221, 221, 221); padding-bottom: 0.5rem; margin-top: 0.5rem;">日量为
            <span style="color: rgb(252, 91, 107);">{{maxList.amountStart}}</span>元;固定日工资上限为
            <span style="color: rgb(252, 91, 107);">{{maxList.wages}}</span>元</p>
          <p style="margin-top: 0.5rem;">日工资有效人数为
            <span style="color: rgb(252, 91, 107);"> {{maxList.peopleStart}} </span>人</p>
        </div>
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <!-- 日分红设置 -->
    <Modal v-model="modal3" width="700" class="modal2">
      <p slot="header" style="text-align:center">
        <span>日分红设置</span>
      </p>
      <div>
        <div>
          <Button type="ghost" @click="addRow2">新增</Button>
        </div>
        <div>
          <div class="tabel_title" style="display: flex; height: 62px; border: 1px solid #e9e9e9; padding-left: 8px; align-items: center;border-radius: 4px 4px 0 0; margin-top: 10px;">
            <div style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
              <span>当前工资契约</span>
              <div>
                <Button type="primary" @click="sign2" style="margin-right: 10px;">
                    <Icon type="edit"></Icon>
                    <span style="margin-left: 5px;">签约</span>
                  </Button>
                <Button type="ghost" style="float: right" @click="refresh2">
                    <Icon type="refresh"></Icon> 刷新
                  </Button>
              </div>
            </div>
          </div>
          <Table border :columns="columns4" :data="data4"></Table>
        </div>
        <div style="border: 1px solid rgb(221, 221, 221); margin-top: 2rem; border-radius: 4px; padding: 1rem 0.6rem;">
          <p style="border-bottom: 1px solid rgb(221, 221, 221); padding-bottom: 0.5rem;">填写规则：日量从上往下递增，不可以等于；日工资是正整数且分红最多保留两位小数</p>
          <p style="border-bottom: 1px solid rgb(221, 221, 221); padding-bottom: 0.5rem; margin-top: 0.5rem;">日量为
            <span style="color: rgb(252, 91, 107);">{{maxList.amountStart}}</span>元;分红为
            <span style="color: rgb(252, 91, 107);">{{maxList.wages}}</span>%
          </p>
          <p style="margin-top: 0.5rem;">有效人数为
            <span style="color: rgb(252, 91, 107);"> {{maxList.peopleStart}} </span>人
          </p>
        </div>
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <!-- 团队返水 -->
    <Modal class="mode3" v-model="moda3" width="400" class-name="model_b">
      <p slot="header" style="color:#000000;text-align:center">
        <span>团队返水</span>
      </p>
      <div style="width: 250px;margin: 0 auto;">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="110">
          <FormItem :label="this.maxpei">
            <Select ref="mode3" v-model="formItem.select" @on-change="peiChange(formItem.select)">
                  <Option v-for="(item, index) in selectList" :key="'Option'+index" :value="item">{{item}}</Option>
                </Select>
          </FormItem>
          <!-- <FormItem  v-show="peiA" label="配额1" prop="">
                  <Input type="text"  v-model="formItem.pei1"></Input>
                </FormItem>
                <FormItem v-show="peiB" label="配额2" prop="">
                  <Input type="text" v-model="formItem.pei2"></Input>
                </FormItem>
                <FormItem v-show="peiC" label="配额3" prop="">
                  <Input type="text" v-model="formItem.pei3" ></Input>
                </FormItem> -->
        </Form>
      </div>
      <div slot="footer">
        <Button @click="moda3=false">取消</Button>
        <Button type="primary" @click="TeamRebet()">保存</Button>
      </div>
    </Modal>
    <!-- 新增会员 -->
    <Modal v-model="moda2" width="600">
      <p slot="header" style="color:#000000;text-align:center">
        <span>新增会员</span>
      </p>
      <div style="width: 340px;margin: 0 auto;">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
          <FormItem label="会员身份" prop="gender">
            <RadioGroup v-model="formCustom.gender">
              <Radio label="0" name="sf" checked="checked">会员</Radio>
              <Radio label='1' name="sf" value="1">代理</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="会员账号" prop="passwd">
            <Input type="text" v-model="formCustom.passwd"></Input>
          </FormItem>
          <FormItem label="账号密码" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck"></Input>
          </FormItem>
          <FormItem label="会员名称" prop="age">
            <Input type="text" v-model="formCustom.age"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">新增</Button>
            <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">撤销</Button>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <!--<Button @click="moda2=false">取消</Button>-->
        <!--<Button type="primary">保存</Button>-->
      </div>
    </Modal>
    <!-- 下级用户详情 -->
    <Modal class="mode1" v-model="modal" width="1100" class-name="model_a" :transfer='false'>
      <p slot="header" style="color:#000000;text-align:center">
        <span>账号详情</span>
      </p>
      <div style="text-align:center">
        <Table :border="showBorder" :columns="columns2" :data="baseMembersList"></Table>
        <!-- <Table :border="showBorder" :columns="tableColumns1" :data="InfoEditlistRebateList"></Table> -->
      </div>
      <div slot="footer">
        <!--<Button >关闭</Button>-->
        <!--</Row>-->
      </div>
    </Modal>
    <!-- 当前用户详情 -->
    <Modal class="mode4" v-model="moda4" width="800" class-name="model_a" :transfer='false' :disabled-hover="true" @on-visible-change="queryOwner">
      <p slot="header" style="color:#000000;text-align:center">
        <span>当前账号详情</span>
      </p>
      <div style="text-align:center;">
        <section class="form_1">
          <div class="mode4_div">
            <div class="d">
              <span>用户账号：</span>
              <i>{{userDetail.account}}</i>
            </div>
            <div class="d">
              <span>用户昵称：</span>
              <i>{{userDetail.nickName}}</i>
            </div>
          </div>
          <div class="mode4_div">
            <div class="d">
              <span>账户余额：</span>
              <i>{{userDetail.accountBalance}}</i>
            </div>
            <div class="d">
              <span>账户等级：</span>
              <i>{{hierarchy}}</i>
            </div>
          </div>
        </section>
        <section class="form_1">
          <div class="mode4_div">
            <div class="d">
              <span>返点：</span>
              <i>{{userDetail.rebatePoint}}</i>
            </div>
            <div class="d" v-show="userDetail.code&&userDetail.hierarchy!=='0'">
              <span>邀请码：</span>
              <i>{{userDetail.code}}</i>
            </div>
          </div>
        </section>
        <section class="form_2">
          <div class="mode4_div">
            <span class="mode4_span">QQ:</span>
            <Input v-model="valueQQ" size="large" :placeholder='userDetail.qq' style="width: 150px" />
          </div>
          <div class="mode4_div">
            <span class="mode4_span">微信:</span>
            <Input v-model="valueWechat" size="large" :placeholder="userDetail.vx" style="width: 150px" />
          </div>
          <div class="mode4_div">
            <span class="mode4_span">电话:</span>
            <Input v-model="valueTel" size="large" :placeholder="userDetail.phone" style="width: 150px" />
          </div>
        </section>
      </div>
      <div slot="footer">
        <Button type="primary" @click="_updateOwnInfo">修改</Button>
      </div>
      <!-- <Table :columns="p_columns" :data="p_data"></Table> -->
    </Modal>
    <!-- 返水编辑 -->
    <Modal class="rebate_mode" v-model="rebate_form" width="600" :transfer='false' :disabled-hover="true">
      <div slot="header">
        <h3>返水编辑</h3>
      </div>
      <div>
        <Form>
          <FormItem label="最高返点：" :label-width="80">
            <Input type="text" placeholder="Username" v-model="max_rebate">
            </Input>
          </FormItem>
          <Row>
            <Col span="7">
            <FormItem label="模式A(%)：" :label-width="80">
              <InputNumber :min="0" v-model="mode.rebate_A"></InputNumber>
              </Input>
            </FormItem>
            </Col>
            <Col span="4">
            <FormItem>
              <span> 返点差：{{D_rebate.D_A}}</span>
            </FormItem>
            </Col>
            <Col span="7" offset="2">
            <FormItem label="模式B(%)：" :label-width="80">
              <InputNumber v-model="mode.rebate_B"></InputNumber>
              </Input>
            </FormItem>
            </Col>
            <Col span="4">
            <FormItem>
              <span> 返点差：{{D_rebate.D_B}}</span>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="7">
            <FormItem label="模式C(%)：" :label-width="80">
              <InputNumber v-model="mode.rebate_C"></InputNumber>
              </Input>
            </FormItem>
            </Col>
            <Col span="4">
            <FormItem>
              <span> 返点差：{{D_rebate.D_C}}</span>
            </FormItem>
            </Col>
            <Col span="7" offset="2">
            <FormItem label="模式D(%)：" :label-width="80">
              <InputNumber v-model="mode.rebate_D"></InputNumber>
              </Input>
            </FormItem>
            </Col>
            <Col span="4">
            <FormItem>
              <span> 返点差：{{D_rebate.D_D}}</span>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
    <div class="tableTitle">
      <!--<Row>-->
      <Col span="15">
      <div>
        <p>当前查询账号：{{this.Account}} 上次更新时间：{{this.newTime}}</p>
        <p style="margin-top: 6px;">
          <!--<Icon type="ios-home-outline" style="font-weight: 900;margin-right: 6px;"></Icon><span style="font-weight: 900;">{{this.Account}}</span>-->
          <Breadcrumb separator=">">
            <BreadcrumbItem v-for="(item,index) in accountList" :key="'BreadcrumbItem'+index">
              <span class="select_span" @click="queryAgentMember(item)">
                    <Icon v-if="index==0" type="ios-home-outline"></Icon>
                    <Icon v-if="index>0" type="android-person"></Icon>
                    <span>{{item}}</span>
              </span>
            </BreadcrumbItem>
          </Breadcrumb>
        </p>
      </div>
      </Col>
      <Col span="9">
      <div>
        <Input v-model="childAccount" placeholder="输入会员账号查询" style="width: 200px"></Input>
        <Button type="primary" @click="search()">查询</Button>
        <Button @click="search()">
              <Icon type="refresh"></Icon>
              刷新
            </Button>
        <Button v-if="show_add" type="primary" @click="moda2=true">新增</Button>
      </div>
      </Col>
      <!--</Row>-->
    </div>
    <Table class="table_a" :border="showBorder" :stripe="showStripe" :show-header="showHeader" :height="fixedHeader ? 250 : ''" :size="tableSize" :data="queryAgentMemberdataList" :columns="tableColumns3"></Table>
  </div>
</template>
<script>
  import {
    mapActions,
    mapState
  } from "vuex";
  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        let regs = /^[a-zA-Z][a-zA-Z0-9_]{5,16}$/;
        if (value === "") {
          callback(new Error("账号名称不能为空!"));
        } else {
          if (!regs.test(value)) {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField(
              "请输入6-16位包含数字和字母的账号!"
            );
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
        if (value === "") {
          callback(new Error("密码不能为空!"));
        } else if (!reg.test(value)) {
          callback(new Error("请输入6-20位包含数字和字母的密码!"));
        } else {
          callback();
        }
      };
      const validateAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请输入你的账号名称!"));
        } else {
          callback();
        }
      };
      return {
        show_add: false,
        //模式
        model: "A",
        hierarchy: "",
        valueQQ: "",
        valueWechat: "",
        valueTel: "",
        accountList: [],
        acc: [],
        baseMembershierarchy: "",
        baseLotteryAccount: "",
        baseLotteryClassId: "",
        TeamRebetAccount: "",
        ClassIdList: {
          1: "福体彩",
          2: "六合彩",
          3: "时时彩",
          4: "快三",
          5: "11选5",
          6: "北京赛车"
        },
        statusList: {
          0: "正常",
          1: "禁止登入",
          2: "黑名单",
          4: "返回限制降点"
        },
        typeList: {
          0: "会员",
          1: "代理"
        },
        InfoEditlistRebateList: [],
        baseMembersList: [],
        queryAgentMemberdataList: [],
        Sselect: "",
        childName: "",
        maxpei: "",
        minRp: "",
        minp: "",
        rebatePoint: "",
        selectList: [],
        maxWages: 0,
        newTime: "",
        childAccount: "",
        signAccount: "",
        Account: "",
        accountName: "",
        formCustom: {
          gender: "0",
          passwd: "",
          passwdCheck: "",
          age: ""
        },
        ruleCustom: {
          passwd: [{
            validator: validatePass,
            trigger: "blur",
            required: true
          }],
          passwdCheck: [{
            validator: validatePassCheck,
            trigger: "blur",
            required: true
          }],
          age: [{
            validator: validateAge,
            trigger: "blur",
            required: true
          }],
          gender: [{
            required: true,
            message: "请选择会员身份",
            trigger: "change"
          }]
        },
        formItem: {
          // pei1: "",
          // pei2: "",
          // pei3: "",
          select: "5.5"
        },
        columns2: [{
            title: "账号",
            key: "account"
            //            width: 100
          },
          {
            title: "身份",
            key: "hierarchy",
            //            width: 150,
            align: "center",
            render: (h, params) => {
              if (this.baseMembershierarchy === "代理") {
                return h(
                  "span", {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      // float: "left",
                      width: 50,
                      lineHeight: "24px",
                      textAlign: "center"
                    }
                  },
                  this.baseMembershierarchy
                );
              } else if (this.baseMembershierarchy !== "代理") {
                return h(
                  "div", {
                    style: {
                      display: "flex",
                      alignItems: "center"
                    }
                  }, [
                    h(
                      "span", {
                        props: {
                          type: "primary",
                          size: "small"
                        },
                        style: {
                          display: "block",
                          marginRight: "5px",
                          // float: "left",
                          // width: '50px',
                          // height: "24px",
                          flexShrink: "0"
                        }
                      },
                      this.baseMembershierarchy
                    ),
                    h(
                      "Button", {
                        props: {
                          type: "primary",
                          size: "small"
                        },
                        style: {
                          marginRight: "5px"
                          // float: "left",
                          // width: 50
                        },
                        on: {
                          click: () => {
                            this.MemberAgent(params.row, "1");
                          }
                        }
                      },
                      "转为代理"
                    )
                  ]
                );
              }
            }
          },
          {
            title: "状态",
            key: "status",
            width: 80
          },
          {
            title: "建立时间",
            width: 150,
            key: "createTime"
          },
          {
            title: "最后登录时间",
            key: "lastLoginTime",
            width: 150
          },
          {
            title: "登录次数",
            key: "loginTimes",
            width: 70
          },
          {
            title: "模式",
            width: 100,
            render: (h, params) => {
              return h(
                "div", {
                  style: {
                    display: "flex",
                    "justify-content": "space-between"
                  }
                }, [
                  h(
                    "Select", {
                      style: {
                        marginRight: "10px"
                      },
                      props: {
                        value: this.model
                      },
                      on: {
                        "on-change": num => {
                          this.model = num;
                        }
                      }
                    }, [
                      h("Option", {
                        props: {
                          value: "A",
                          label: "A"
                        }
                      }),
                      h("Option", {
                        props: {
                          value: "B",
                          label: "B"
                        }
                      }),
                      h("Option", {
                        props: {
                          value: "C",
                          label: "C"
                        }
                      }),
                      h("Option", {
                        props: {
                          value: "D",
                          label: "D"
                        }
                      })
                    ]
                  )
                  // h('Button',{
                  //   attrs:{
                  //     type:'primary'
                  //   },
                  //   on:{
                  //     click:()=>{
                  //        this.MemberAgent(params.row,'2');
                  //     }
                  //   }
                  // },'修改')
                ]
              );
            }
          },
          {
            title: "返点",
            width: 170,
            render: (h, params) => {
              return h('div', [
                h("InputNumber", {
                  props: {
                    value: this.repbatePoint
                  },
                  on: {
                    "on-change": val => {
                      console.log(val);
                      this.repbatePoint = val;
                    }
                  }
                }),
                h('span', {
                  style: {
                    fontSize: '.3rem'
                  }
                }, this.range)
              ])
            }
          },
          {
            title: " ",
            render: (h, params) => {
              return h(
                "Button", {
                  attrs: {
                    type: "primary"
                  },
                  on: {
                    click: () => {
                      this.MemberAgent(params.row, "2");
                    }
                  }
                },
                "修改"
              );
            }
          }
        ],
        range: '',
        standbyArray: [],
        modal2: false,
        modal3: false,
        modal: false,
        moda2: false,
        moda3: false,
        moda4: false,
        peiA: true,
        peiB: true,
        peiC: true,
        visible: false,
        maxRebatePoint: "",
        Point: "",
        showBorder: true,
        showStripe: false,
        showHeader: true,
        showIndex: false,
        showCheckbox: false,
        fixedHeader: false,
        tableSize: "default",
        data3: [],
        data4: [],
        maxList: {},
        columns4: [{
          title: "日量≧（元）",
          key: "amountStart",
          render: (h, params) => {
            params.row = this.standbyArray[params.index];
            return h("Input", {
                props: {
                  value: params.row.amountStart
                },
                on: {
                  "on-blur": event => {
                    event.target.value = this.zhengze(event.target.value);
                    //                                    	event.target.value = event.target.value.replace(/[^\d]/g,'')
                    params.row.amountStart = event.target.value;
                  }
                }
              },
              "修改"
            );
          }
        }],
        range: '',
        standbyArray: [],
        modal2: false,
        modal3: false,
        modal: false,
        moda2: false,
        moda3: false,
        moda4: false,
        peiA: true,
        peiB: true,
        peiC: true,
        visible: false,
        maxRebatePoint: "",
        Point: "",
        showBorder: true,
        showStripe: false,
        showHeader: true,
        showIndex: false,
        showCheckbox: false,
        fixedHeader: false,
        tableSize: "default",
        data3: [],
        data4: [],
        maxList: {},
        _userDetail: {},
        rebatePoint: "",
        columns4: [{
            title: "日量≧（元）",
            key: "amountStart",
            render: (h, params) => {
              params.row = this.standbyArray[params.index];
              return h("Input", {
                props: {
                  value: params.row.amountStart
                },
                on: {
                  "on-blur": event => {
                    event.target.value = this.zhengze(event.target.value);
                    //                                    	event.target.value = event.target.value.replace(/[^\d]/g,'')
                    params.row.amountStart = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "活跃人数（人）",
            key: "peopleStart",
            render: (h, params) => {
              params.row = this.standbyArray[params.index];
              return h("Input", {
                props: {
                  value: params.row.peopleStart
                },
                on: {
                  "on-blur": event => {
                    event.target.value = this.zhengze(event.target.value);
                    params.row.peopleStart = event.target.value;
                  }
                }
              })
            }
          },
          {
            title: "亏损金额（元）",
            key: "lossStart",
            render: (h, params) => {
              params.row = this.standbyArray[params.index];
              return h("Input", {
                props: {
                  value: params.row.lossStart
                },
                on: {
                  "on-blur": event => {
                    event.target.value = this.zhengze(event.target.value);
                    params.row.lossStart = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "分红(%)",
            key: "wages",
            width: 150,
            align: "center",
            render: (h, params) => {
              params.row = this.standbyArray[params.index];
              return h("Input", {
                props: {
                  value: params.row.wages
                },
                on: {
                  "on-blur": event => {
                    var res = event.target.value.match(
                      /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,1000})?$/
                    );
                    if (res) {
                      let index = event.target.value.indexOf(".");
                      index != -1 ?
                        (event.target.value = event.target.value.slice(
                          0,
                          index + 3
                        )) :
                        null;
                    } else {
                      event.target.value = "";
                    }
                    params.row.wages = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "操作",
            key: "address",
            render: (h, params) => {
              return h(
                "Poptip", {
                  props: {
                    confirm: "confirm",
                    title: "你确定要删除吗？"
                  },
                  on: {
                    "on-ok": () => {
                      this.data4.splice(params.index, 1);
                    },
                    "on-cancel": () => {}
                  }
                }, [
                  h(
                    "Button", {
                      props: {
                        type: "ghost"
                      },
                      on: {
                        click: () => {}
                      }
                    },
                    "删除"
                  )
                ]
              );
            }
          }
        ],
        columns3: [{
            title: "日量≧（元）",
            key: "amountStart",
            render: (h, params) => {
              params.row = this.standbyArray[params.index];
              return h("Input", {
                props: {
                  value: params.row.amountStart
                },
                on: {
                  "on-blur": event => {
                    event.target.value = this.zhengze(event.target.value);
                    params.row.amountStart = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "活跃人数（人）",
            key: "peopleStart",
            render: (h, params) => {
              params.row = this.standbyArray[params.index];
              return h("Input", {
                props: {
                  value: params.row.peopleStart
                },
                on: {
                  "on-blur": event => {
                    event.target.value = this.zhengze(event.target.value);
                    params.row.peopleStart = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "亏损金额（元）",
            key: "lossStart",
            render: (h, params) => {
              params.row = this.standbyArray[params.index];
              return h("Input", {
                props: {
                  value: params.row.lossStart
                },
                on: {
                  "on-blur": event => {
                    event.target.value = this.zhengze(event.target.value);
                    params.row.lossStart = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "日工资",
            key: "wages",
            width: 150,
            align: "center",
            render: (h, params) => {
              params.row = this.standbyArray[params.index];
              return h("Input", {
                props: {
                  value: params.row.wages
                },
                on: {
                  "on-blur": event => {
                    event.target.value = this.zhengze(event.target.value);
                    params.row.wages = event.target.value;
                  }
                }
              });
            }
          },
          {
            title: "操作",
            key: "address",
            render: (h, params) => {
              return h(
                "Poptip", {
                  props: {
                    confirm: "confirm",
                    title: "你确定要删除吗？"
                  },
                  on: {
                    "on-ok": () => {
                      this.data3.splice(params.index, 1);
                    },
                    "on-cancel": () => {}
                  }
                }, [
                  h(
                    "Button", {
                      props: {
                        type: "ghost"
                      },
                      on: {
                        click: () => {}
                      }
                    },
                    "删除"
                  )
                ]
              );
            }
          }
        ],
        p_columns: [{
            title: "彩类",
            key: "lottery_types"
          },
          {
            title: "返点",
            key: "rebate"
          },
          {
            title: "模式A返点差",
            key: "A_rebate"
          },
          {
            title: "模式B返点差",
            key: "B_rebate"
          },
          {
            title: "模式C返点差",
            key: "C_rebate"
          },
          {
            title: "模式D返点差",
            key: "D_rebate"
          },
          {
            title: "操作",
            key: "operate",
            render: (h, params) => {
              return h("Button", {
                on: {
                  click: () => {
                    this.rebateForm_show(params.row);
                  }
                },
                domProps: {
                  innerHTML: "修改"
                }
              });
            }
          }
        ],
        p_data: [],
        rebate_form: false,
        //返点值（A,B,C,D）
        max_rebate: "",
        mode: {
          rebate_A: 0,
          rebate_B: 0,
          rebate_C: 0,
          rebate_D: 0
        },
        //返点差值（A,B,C,D）
        D_rebate: {
          D_A: "",
          D_B: "",
          D_C: "",
          D_D: ""
        },
        repbatePoint: ""
      }
    },
    created() {
      this.search();
    },
    // mounted() {
    //   this._userDetail = this.userDetail
    //   console.log(`_userDetails`, this._userDetail)
    // },
    methods: {
      ...mapActions("account", [
        "queryAgentMemberInfo",
        "agentRegisterMember",
        "queryMemberInfoEdit",
        "queryTeamQutaType",
        "updateTeamRebet",
        "updateMemberAgent",
        "queryMemberWages",
        "updateMemberWages",
        "updateOwnInfo",
        "queryOwnRebate"
      ]),
      ...mapActions(["getUserDetail"]),
      time() {
        var date = new Date();
        var n = date.getFullYear();
        var y = date.getMonth() + 1;
        if (y < 10) {
          y = "0" + y;
        }
        var t = date.getDate();
        if (t < 10) {
          t = "0" + t;
        }
        var h = date.getHours();
        if (h < 10) {
          h = "0" + h;
        }
        var m = date.getMinutes();
        if (m < 10) {
          m = "0" + m;
        }
        var mi = date.getSeconds();
        if (mi < 10) {
          mi = "0" + mi;
        }
        //        $('.loginRecord_time').html(n+"-"+y+"-"+t+" "+h+":"+m+":"+mi);
        this.newTime = n + "-" + y + "-" + t + " " + h + ":" + m + ":" + mi;
      },
      timestampToTime(timestamp) {
        var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10 ?
            "0" + (date.getMonth() + 1) :
            date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        var hh = date.getHours() + ":";
        var mm = date.getMinutes() + ":";
        var ss = date.getSeconds();
        return Y + M + D + hh + mm + ss;
      },
      formt(time) {
        let da = new Date(time.valueOf());
        let year = da.getFullYear();
        let month = da.getMonth() + 1;
        let date = da.getDate();
        return [year, month, date].join("-");
      },
      zhengze(value) {
        var res = value.match(/[^\d]/);
        if (res) {
          value = res.input.slice(0, res.index);
        }
        return value;
      },
      //代理会员查询
      search(acc) {
        this.time();
        if (acc) {
          this.Account = acc;
        } else if (this.childAccount === "") {
          this.Account = this.userDetail.account;
          if (this.accountList.indexOf(this.userDetail.account) == -1) {
            this.accountList.push(this.userDetail.account);
          }
        } else {
          this.Account = this.childAccount;
        }
        //        console.log(this.Account);
        let data = {
          memberAccount: this.Account,
          sort: "1",
          type: "1" // 1-账号排序,2-余额排序，3-建立时间排序，4-最后登录时间排序})
        };
        this.queryAgentMemberInfo(data).then(res => {
          this.queryAgentMemberdataList = this.queryAgentMemberInfoList;
          this.show_add = res.data[0].hierarchy !== "0" ? true : false;
          //          console.log(this.queryAgentMemberdataList);
          this.queryAgentMemberdataList.forEach(item => {
            //            console.log(item.createTime.length);
            this.acc.push(item.account);
            if (item.lastLoginTime === null) {
              item.lastLoginTime = item.createTime;
            }
            if (item.childAmount === null) {
              item.childAmount = "0";
            }
            item.create_Time = item.createTime.slice(0, 19);
            item.last_LoginTime = item.lastLoginTime.slice(0, 19);
          });
        });
        //        console.log(this.acc,'123')
      },
      // 新增会员
      newMember() {
        let md5_pwd = hex_md5(this.formCustom.passwdCheck);
        let data = {
          memberType: this.formCustom.gender,
          password: md5_pwd,
          addMemberAccount: this.formCustom.passwd,
          name: this.formCustom.age,
          way: "1"
        };
        this.agentRegisterMember(data).then(res => {
          if (res.code === 0) {
            this.$Message.success(res.msg);
            this.moda2 = false;
            this.search();
          } else if (res.code === 1) {
            this.$Message.error(res.msg);
          }
        });
      },
      sign1() {
        let flag = true;
        this.data3 = this.standbyArray;
        this.data3.forEach((item, index) => {
          if (
            item.amountStart == "" ||
            item.peopleStart == "" ||
            item.lossStart == "" ||
            item.wages == ""
          ) {
            flag = false;
            this.$Notice.warning({
              title: "福彩官方通知",
              desc: "请将签约条件填写完整"
            });
            return false;
          }
          if (index > 0) {
            if (item.amountStart * 1 > this.data3[index - 1].amountStart * 1) {} else {
              flag = false;
              this.$Notice.warning({
                title: "福彩官方通知",
                desc: "日量从上往下递增，不可以等于"
              });
              return false;
            }
          }
          if (item.wages > this.maxWages) {
            flag = false;
            this.$Notice.warning({
              title: "福彩官方通知",
              desc: "日工资不能大于" + this.maxWages + "元"
            });
            return false;
          }
        });
        if (!flag) {
          return false;
        }
        this.data3.forEach(item => {
          item.memberAccount = this.signAccount;
          item.wagesType = "1";
        });
        let data = {
          memberAccount: this.signAccount,
          wagesType: "1",
          syWageslist: this.data3
        };
        this.updateMemberWages(data).then(res => {
          if (res.code == 0) {
            this.$Message.success("签约成功");
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      sign2() {
        let flag = true;
        this.data4 = this.standbyArray;
        this.data4.forEach((item, index) => {
          if (
            item.amountStart == "" ||
            item.peopleStart == "" ||
            item.lossStart == "" ||
            item.wages == ""
          ) {
            flag = false;
            this.$Notice.warning({
              title: "福彩官方通知",
              desc: "请将签约条件填写完整"
            });
            return false;
          }
          if (index > 0) {
            if (item.amountStart * 1 > this.data4[index - 1].amountStart * 1) {} else {
              flag = false;
              this.$Notice.warning({
                title: "福彩官方通知",
                desc: "日量从上往下递增，不可以等于"
              });
              return false;
            }
          }
          if (item.wages > this.maxWages) {
            flag = false;
            this.$Notice.warning({
              title: "福彩官方通知",
              desc: "分红不能大于" + this.maxWages + "%"
            });
            return false;
          }
        });
        if (!flag) {
          return false;
        }
        this.data4.forEach(item => {
          item.memberAccount = this.signAccount;
          item.wagesType = "2";
        });
        let data = {
          memberAccount: this.signAccount,
          wagesType: "2",
          syWageslist: this.data4
        };
        this.updateMemberWages(data).then(res => {
          if (res.code == 0) {
            this.$Message.success("签约成功");
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      // 查询会员详情
      MemberInfoEdit(accName) {
        if (this.userDetail.qq == null || this.userDetail.qq == "") {
          this.userDetail.qq = "您还没有填写QQ资料信息";
        }
        if (this.userDetail.vx == null || this.userDetail.vx == "") {
          this.userDetail.vx = "您还没有填写微信资料信息";
        }
        if (this.userDetail.phone == null || this.userDetail.phone == "") {
          this.userDetail.phone = "您还没有绑定号码";
        }
        if (accName === this.userDetail.account) {
          // console.log(`this.Account`, this.Account)
          this.moda4 = true;
          if (this.userDetail.hierarchy == "0") {
            this.hierarchy = "会员";
          } else {
            this.hierarchy = this.userDetail.hierarchy + "级代理";
          }
        } else {
          this.childName = accName;
          let data = this.childName;
          this.queryMemberInfoEdit(data).then(res => {
            if (res.code == 1) {
              this.$Message.error(`${res.msg}`)
            } else {
              this.modal = true;
              this.range = ` ${res.data.minRebet} ~ ${res.data.maxRebet}`
              this.model = res.data.baseMembers.memberModel;
              this.InfoEditlistRebateList = this.InfoEditlistRebate;
              this.repbatePoint = res.data.baseMembers.rebatePoint;
              this.baseMembersList = [this.baseMembers];
              this.InfoEditlistRebateList.forEach(item => {
                item.baseLotteryClassName = this.ClassIdList[
                  item.baseLotteryClassId
                ];
              });
              if (this.baseMembersList[0].hierarchy == "0") {
                this.baseMembershierarchy = "会员";
              } else {
                this.baseMembershierarchy = "代理";
              }
              if (this.baseMembersList[0].status == "0") {
                this.baseMembersList[0].status = "正常";
              } else if (this.baseMembersList[0].status == "1") {
                this.baseMembersList[0].status = "禁止登入";
              } else if (this.baseMembersList[0].status == "2") {
                this.baseMembersList[0].status = "黑名单";
              } else if (this.baseMembersList[0].status == "4") {
                this.baseMembersList[0].status = "返回限制降点";
              }
              if (this.baseMembersList[0].lastLoginTime == null) {
                this.baseMembersList[0].lastLoginTime = this.baseMembersList[0].createTime;
              }
              this.baseMembersList[0].createTime = this.timestampToTime(
                this.baseMembersList[0].createTime
              );
              this.baseMembersList[0].lastLoginTime = this.timestampToTime(
                this.baseMembersList[0].lastLoginTime
              );
            }
          });
        }
      },
      // 查询配额
      TeamQutaType(acc, id) {
        // console.log(acc, id);
        this.TeamRebetAccount = acc;
        this.baseLotteryClassId = id;
        let data = {
          account: acc,
          type: id
        };
        this.selectList = [];
        // console.log(this.formItem.select,'1')
        this.queryTeamQutaType(data).then(res => {
          //          console.log(this.baseLotteryClass);
          //          console.log(this.listRebate);
          // console.log(res, "000000");
          this.maxpei = "反水(最高" + res.data.maxRebate + ")";
          this.minRP = res.data.minRebate;
          this.Point = res.data.rebatePoint;
          this.minp = res.data.maxRebate;
          this.formItem.select = res.data.rebatePoint.toFixed(1);
          this.rebatePoint = res.data.rebatePoint.toFixed(1);
          this.$nextTick(function() {
            this.selectList = d.reverse();
            this.formItem.select = this.selectList[
              this.selectList.indexOf(res.data.rebatePoint.toFixed(1))
            ];
          });
          for (var i = this.minRP * 10, d = []; i <= this.minp * 10; i++) {
            let p = (i / 10).toFixed(1);
            d.push(p);
            if (this.baseMembersList[0].hierarchy == "0") {
              this.baseMembershierarchy = "会员";
            } else {
              this.baseMembershierarchy = this.baseMembershierarchy + "代理";
            }
            if (this.baseMembersList[0].status == "0") {
              this.baseMembersList[0].status = "正常";
            } else if (this.baseMembersList[0].status == "1") {
              this.baseMembersList[0].status = "禁止登入";
            } else if (this.baseMembersList[0].status == "2") {
              this.baseMembersList[0].status = "黑名单";
            } else if (this.baseMembersList[0].status == "4") {
              this.baseMembersList[0].status = "返回限制降点";
            }
            this.selectList = d;
          }
        });
      },
      // 修改反水配额
      TeamRebet() {
        console.log(this.formItem.select, this.baseLotteryClassId);
        let data = {
          account: this.TeamRebetAccount,
          childRebet: this.formItem.select + "",
          // 'teamQuota1': this.formItem.pei1+"",
          // 'teamQuota2': this.formItem.pei2+"",
          // 'teamQuota3': this.formItem.pei3+"",
          type: this.baseLotteryClassId // 彩种 1-福体彩 3-时时彩 4-快三 5 - 11选5  6-赛车
        };
        this.updateTeamRebet(data).then(res => {
          if (res.code === 0) {
            this.$Message.success(res.msg);
            this.moda3 = false;
            this.MemberInfoEdit(this.childName);
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      // 转为代理
      MemberAgent(row, type) {
        let agent;
        if (type === "1") {
          agent = "1";
        } else {
          agent = "";
        }
        let data = {
          memberAccount: row.account,
          isAgent: agent,
          memberModel: this.model,
          repbatePoint: Number(this.repbatePoint).toFixed(2)
        };
        this.updateMemberAgent(data).then(res => {
          if (res.code === 0) {
            this.$Message.success(res.msg);
            this.MemberInfoEdit(row.account);
          } else {
            this.$Message.error(res.msg);
          }
        });
      },
      handleSubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.newMember();
          } else {
            this.$Message.error("请填写正确的必填参数!");
          }
        });
      },
      addRow1() {
        let row = {
          amountStart: "",
          peopleStart: "",
          lossStart: "",
          wages: ""
        };
        this.data3.push(row);
        this.standbyArray = this.data3;
      },
      addRow2() {
        let row = {
          amountStart: "",
          peopleStart: "",
          lossStart: "",
          wages: ""
        };
        this.data4.push(row);
        this.standbyArray = this.data4;
      },
      queryAgentMember(account) {
        let end = this.accountList.indexOf(account);
        this.accountList = this.accountList.slice(0, end + 1);
        this.search(account);
      },
      refresh1() {
        this.queryMemberWages("/" + this.signAccount + "/" + "1").then(res => {
          if (res.data.wagesList) {
            this.data3 = res.data.wagesList;
            this.standbyArray = this.data3;
          } else {
            this.data3 = [];
            this.standbyArray = [];
          }
        });
      },
      refresh2() {
        this.queryMemberWages("/" + this.signAccount + "/" + "2").then(res => {
          if (res.data.wagesList) {
            this.data4 = res.data.wagesList;
            this.standbyArray = this.data4;
          } else {
            this.data4 = [];
            this.standbyArray = [];
          }
        });
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      peiChange(name) {
        let that = this;
        if (name <= 0.2) {
          that.peiA = false;
          that.peiB = false;
          that.peiC = false;
        } else if (name > 0.2) {
          if (name < that.maxRebatePoint - 0.2) {
            that.peiA = false;
            that.peiB = false;
            that.peiC = false;
          } else if (name == that.maxRebatePoint - 0.2) {
            that.peiA = false;
            that.peiB = false;
            that.peiC = true;
          } else if (name == that.maxRebatePoint - 0.1) {
            that.peiA = false;
            that.peiB = true;
            that.peiC = true;
          } else if (name == that.maxRebatePoint) {
            that.peiA = true;
            that.peiB = true;
            that.peiC = true;
          }
        }
      },
      _updateOwnInfo() {
        let that = this;
        let regQQ = /^[1-9][0-9]{4,9}$/;
        let regVX = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
        let regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
        if (this.valueQQ == "" && this.valueWechat == "" && this.valueTel == "") {
          this.$Message.error("您没有做任何修改！");
        } else if (this.valueQQ == "") {
          this.valueQQ = this.userDetail.qq;
        } else if (this.valueQQ != "" && regQQ.test(this.valueQQ) == false) {
          this.$Message.error(
            "您输入的QQ号码格式不对，QQ号码一般为不能以0开头的5-10位的数字组成！"
          );
        } else if (this.valueWechat == "") {
          this.valueWechat = this.userDetail.vx;
        } else if (
          this.valueWechat != "" &&
          regVX.test(this.valueWechat) == false
        ) {
          this.$Message.error(
            "您输入的微信号格式不对，只能6—20个字母、数字、下划线和减号，必须以字母开头（不区分大小写），不支持设置中文"
          );
        } else if (this.valueTel == "") {
          this.valueTel = this.userDetail.phone;
        } else if (this.valueTel != "" && regPhone.test(this.valueTel) == false) {
          this.$Message.error("您输入的电话号格式不对，只能1开头11位的数字组成");
        } else {
          let data = {
            qq: this.valueQQ,
            vx: this.valueWechat,
            phone: this.valueTel
          };
          this.updateOwnInfo(data).then(res => {
            if (res.code == 0) {
              this.$Message.info(res.msg);
              this.valueQQ = "";
              this.valueWechat = "";
              this.valueTel = "";
              this.getUserDetail();
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      },
      queryOwner(status) {
        // this.getUserDetail();
        console.log(`queryOwner`)
        if (status) {
          // console.log(`kindList`, this.kindList);
          this.queryOwnRebate().then(res => {
            if (res.code == 0) {
              if (this.p_data.length === 0) {
                console.log(`kindList`, this.kindList)
                for (let [index, item] of res.data.entries()) {
                  // console.log([index, item])
                  for (let item2 of this.kindList) {
                    if (item.baseLotteryClassId === item2.classId) {
                      this.p_data.push({
                        lottery_types: item2.className,
                        rebate: item.rebatePoint,
                        A_rebate: item.rebatePoint - item.modelA,
                        B_rebate: item.rebatePoint - item.modelB,
                        C_rebate: item.rebatePoint - item.modelC,
                        D_rebate: item.rebatePoint - item.modelD
                      });
                    }
                    console.log(`item2`, item2)
                  }
                }
              }
            }
          });
        }
      },
      rebateForm_show(params) {
        console.log(params);
        this.mode.rebate_A = params.rebate - params.A_rebate;
        this.mode.rebate_B = params.rebate - params.B_rebate;
        this.mode.rebate_C = params.rebate - params.C_rebate;
        this.mode.rebate_D = params.rebate - params.D_rebate;
        this.D_rebate.D_A = params.rebate - this.mode.rebate_A;
        this.D_rebate.D_B = params.rebate - this.mode.rebate_B;
        this.D_rebate.D_C = params.rebate - this.mode.rebate_C;
        this.D_rebate.D_D = params.rebate - this.mode.rebate_D;
        this.max_rebate = params.rebate;
        this.rebate_form = true;
      }
    },
    computed: {
      ...mapState(["userDetail", "kindList"]),
      ...mapState("account", ["queryAgentMemberInfoList"]),
      ...mapState("account", ["InfoEditlistRebate", "baseMembers"]),
      ...mapState("account", ["baseLotteryClass", "listRebate", "ownRebate"]),
      ...mapState("account", [
        "updateTeamRebetList",
        "updateMemberAgentList",
        "updateOwnInfoList"
      ]),
      tableColumns3() {
        let columns = [];
        if (this.showCheckbox) {
          columns.push({
            type: "selection",
            //              width: 60,
            align: "center"
          });
        }
        if (this.showIndex) {
          columns.push({
            type: "index",
            //              width: 60,
            align: "center"
          });
        }
        columns.push({
          title: "会员账号",
          //          key: 'account',
          sortable: true,
          render: (h, params) => {
            if (params.row.account === this.Account) {
              //                color = '#495060'
            }
            return h(
              "Span", {
                props: {
                  type: "text"
                },
                style: {
                  color: "#4ca5e9",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    if (this.accountList.indexOf(params.row.account) == -1) {
                      this.accountList.push(params.row.account);
                    }
                    this.search(params.row.account);
                  }
                }
              },
              params.row.account
            );
          }
        });
        columns.push({
          title: "账号名称",
          key: "name"
        });
        columns.push({
          title: "彩票钱包余额",
          key: "accountBalance",
          sortable: true
        });
        columns.push({
          title: "团队人数",
          key: "childCount"
        });
        columns.push({
          title: "注册时间",
          key: "create_Time",
          sortable: true,
          width: 200
        });
        columns.push({
          title: "最后登录时间",
          key: "last_LoginTime",
          sortable: true,
          width: 150
        });
        columns.push({
          title: "下级总额",
          key: "childAmount"
        });
        columns.push({
          title: "操作",
          width: 180,
          //          key: 'hierarchy',
          render: (h, params) => {
            // console.log(params)
            // console.log(params.index,'9')
            // 判断查询是会员详情还是下级
            // if (params.index === 0) {
            //   console.log(params)
            //   if (params.row.account != this.userDetail.account) {
            //     return false;
            //   }
            // }
            return h("div", [
              h(
                "Button", {
                  props: {
                    //            	size:'small',
                    type: "ghost"
                  },
                  on: {
                    click: () => {
                      this.MemberInfoEdit(params.row.account);
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        });
        return columns;
      },
      tableColumns1() {
        let columns1 = [];
        if (this.showCheckbox) {
          columns1.push({
            type: "selection",
            //              width: 60,
            align: "center"
          });
        }
        if (this.showIndex) {
          columns1.push({
            type: "index",
            //              width: 60,
            align: "center"
          });
        }
        columns1.push({
          title: "彩种",
          key: "baseLotteryClassName"
        });
        columns1.push({
          title: "返水(%)",
          key: "rebatePoint"
        });
        columns1.push({
          title: "修改",
          //          key: 'hierarchy',
          render: (h, params) => {
            this.baseLotteryAccount = params.row.account;
            this.baseLotteryClassId = params.row.baseLotteryClassId;
            return h(
              "Button", {
                props: {
                  type: "ghost"
                },
                on: {
                  click: () => {
                    this.moda3 = true;
                    this.TeamQutaType(
                      this.baseLotteryAccount,
                      params.row.baseLotteryClassId
                    );
                  }
                }
              },
              "详情配置"
            );
          }
        });
        return columns1;
      }
    },
    watch: {
      moda3() {
        this.handleReset("formCustom");
      },
      moda2() {
        this.handleReset("formCustom");
      },
      userDetail() {
        this.search();
      },
      mode: {
        handler: function(newValue) {
          this.D_rebate.D_A = this.max_rebate - newValue.rebate_A;
          this.D_rebate.D_B = this.max_rebate - newValue.rebate_B;
          this.D_rebate.D_C = this.max_rebate - newValue.rebate_C;
          this.D_rebate.D_D = this.max_rebate - newValue.rebate_D;
        },
        deep: true
      }
    }
  };
</script>
<style>
  .members .select_span:hover {
    color: rgb(76, 165, 233);
  }
  .members .tableTitle {
    border-radius: 6px 6px 0 0;
    padding: 16px 0;
    padding-left: 8px;
    padding-right: 8px;
    height: 94px;
    border: 1px solid #dddee1;
    border-bottom: none;
  }
  .members .table_a .ivu-table-body .ivu-table-row td:nth-child(8) .ivu-table-cell {
    padding: 0 !important;
  }
  .members .table_a .ivu-table-body .ivu-table-row td:nth-child(8) .ivu-table-cell div {
    width: 100%;
    display: flex !important;
    justify-content: space-around;
  }
  .form_1,
  .form_2 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .mode4_div {
    display: flex;
    align-items: center;
    /* width: 100%; */
    /* margin: 15px auto; */
  }
  .mode4_div>.d {
    /* width: 50%; */
    /* float: left; */
    text-align: center;
    margin-right: 30px;
  }
  .mode4_div span {
    display: inline-block;
    width: 100px;
    font-size: 16px;
  }
  .mode4_div .mode4_span {
    display: inline-block;
    width: 60px;
    font-size: 14px;
  }
</style>
