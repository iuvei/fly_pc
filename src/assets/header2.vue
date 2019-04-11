<template>
  <div id="navbar2">
    <!-- 充值 -->
    <Modal
      v-model="recharge"
      title="充值"
      :transition-names="['ease', 'fade']"
      class-name="charge"
      :styles="{width:750+'px'}"
      @on-visible-change="make"
    >
      <Steps :current="step">
        <Step title="选择充值方式" content></Step>
        <Step title="填写充值信息" content></Step>
        <Step title="前往充值" content></Step>
        <Step title="等待上级审核" content></Step>
      </Steps>
      <div v-if="show_recharge_module" class="recharge_module">
        <Form ref="formInline" :label-width="200" :model="{recharge_account}">
          <FormItem label="选择充值方式：" :required="true">
            <RadioGroup v-model="recharge_type" >
              <Radio v-for="(item,index) in chargeType" :label="item.mode" :key="index">
                <img
                  style="width: 126px; height: 36px; border: 1px solid lightgrey; border-radius: 3px;"  
                  :src="item.src"
                  :alt="item.type"
                  :title="item.type"
                >
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="请填写充值金额：" :required="true">
            <Row>
              <Col span="12">
                <InputNumber ref="inputNumber" :max="5000" :min="10" v-model="in_money"></InputNumber>&nbsp;&nbsp;元
              </Col>
            </Row>
            <Row>
              <span style="color:rgba(0, 0, 0, 0.43)">单笔下线10，单笔上线5000</span>
            </Row>
          </FormItem>
          <FormItem
            :label="`请填写${_type(recharge_type)}账号：`"
            prop="recharge_account"
            :rules="{trigger:'blur',message:'请输入账号',required:true}"
          >
            <Row>
              <Col span="12">
                <Input v-model="recharge_account" type="text"/>
              </Col>
            </Row>
          </FormItem>
          <FormItem :label="`请填写${_type(recharge_type)}实名认证姓名：`" :required="true">
            <Row>
              <Col span="12">
                <Input v-model="recharge_realName" type="text"/>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12">
                <Button type="info" size="large" @click="recharge_submit">下一步</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
      <div v-else class="recharge_module">
        <p class="_item">
          <Row>
            <Col>
              <h3>转账信息</h3>
            </Col>
          </Row>
        </p>
        <p class="_item">
          <Row>
            <Col span="3">
              <span>充值金额：</span>
            </Col>
            <Col span="16">
              <span>{{in_money}} 元</span>
            </Col>
          </Row>
        </p>

        <p class="_item">
          <Row>
            <Col span="3">
              <span>账户信息：</span>
            </Col>
            <Col span="16">
              <span>{{userDetail.account}}</span>
            </Col>
          </Row>
        </p>

        <p class="_item">
          <Row>
            <Col span="3">
              <span>充值时间：</span>
            </Col>
            <Col span="16">
              <span>{{timeFormate(new Date())+' '+_time(new Date())}}</span>
            </Col>
          </Row>
        </p>

        <p class="_item">
          <Row>
            <Col span="3">
              <span>认证姓名：</span>
            </Col>
            <Col span="16">
              <span>{{recharge_realName}}</span>
            </Col>
          </Row>
        </p>

        <p class="_item">
          <Row>
            <Col span="3">
              <span>转账方式：</span>
            </Col>
            <Col span="16">
              <span>{{_type(recharge_type)}}</span>
            </Col>
          </Row>
        </p>

        <p class="_item"  v-if="recharge_type!=='2'">
          <Row>
            <Col span="3">
              <span>上级{{_type(recharge_type)}}：</span>
            </Col>

            <Col span="19">
              <span
               
                style="display:block;min-height:20px"
              >{{orderDetail[type_account(recharge_type)]}}</span>
              <!-- <Select v-else v-model="bank_account" style="width:300px">
                <Option
                  v-for="item in orderDetail[type_account(recharge_type)]"
                  :value="item.bankAccount"
                  :key="item.id"
                >{{ item.bankName }}</Option>
              </Select> -->
            </Col>

            <Col span="5">
              <Button
                class="btn"
                @click="copy()"
                type="info"
                :data-clipboard-text="orderDetail[type_account(recharge_type)]"
              >复制</Button>
             
            </Col>
          </Row>
        </p>
        <p class="_item" v-else>
          <Row>
             <Col span="3">
              <span>上级{{_type(recharge_type)}}</span>
            </Col>
          </Row>
          <Row  v-for="item in orderDetail[type_account(recharge_type)]">
            <Col  span="19">
                <span
              
                style="display:block;min-height:20px"
              >{{item.bankName}}：{{item.bankAccount}}</span>
            </Col>
             <Col span="5">
             <Button
                class="btn"
                @click="copy()"
                type="info"
                :data-clipboard-text="item.bankAccount"
              >复制</Button>
            </Col>

          </Row>



        </p>
        <Row>
          <Col span="6" offset="9">
            <Button @click="recharge_apply" type="info" size="large" :long="true">提交申请</Button>
          </Col>
        </Row>
        <p class="_item" style="margin-top:20px">
          <Row>
            <Col>
              <span style="color:rgba(0, 0, 0, 0.43)">温馨提示：请联系上级{{_type(recharge_type)}}完成充值。</span>
            </Col>
          </Row>
        </p>
      </div>
      <div slot="footer"></div>
    </Modal>


    <!-- 提现 -->
    <Modal
      v-model="withdraw"
      class-name="withdraw"
      width="700"
      title="提现"
      @on-visible-change="reveal"
    >
      <Form ref="formValidate" :label-width="200" :model="{withdraw_name}">
        <FormItem label="提示信息：">
          <!-- <div v-html="DrawCondition.tip"></div> -->
          <p>为了加快入款和出款速度，请务必于转账后再提交资料！</p>
        </FormItem>
        <FormItem label="消费比例：">
          <p>提现需达投注量
            <Tag color="#d2eafb">
              <span style="color:#108ee9">{{DrawCondition.memberConsumeNeed}}</span>
            </Tag>已达投注量
            <Tag color="#d2eafb">
              <span style="color:#108ee9">{{DrawCondition.memberConsume}}</span>
            </Tag>
          </p>
        </FormItem>
        <FormItem label="账户金额：">
          <span>{{Number(DrawCondition.accountBalance).toFixed(2)}}</span>
        </FormItem>
        <FormItem label="提现账号：" :required="true">
          <Row>
            <Col span="19">
              <Select v-model="selectBank">
                <Option v-for="(item,index) in bankList" :value="index" :key="index">{{item.name}}</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="提现金额：" :required="true">
          <Row>
            <Col span="12">
              <div>
                <InputNumber
                  v-model="withdrawMoney"
                  @on-change="NumberToChinese(withdrawMoney)"
                  :max="DrawCondition.drawDegreeTimes"
                  :min="DrawCondition.drawFloorTimes"
                ></InputNumber>
                <span>{{text}}</span>
              </div>
            </Col>
          </Row>
          <Row>
            <span
              style="color:rgba(0,0,0,.43)"
            >您本次最高提现{{DrawCondition.drawDegreeTimes}}元，最低提现{{DrawCondition.drawFloorTimes}}元</span>
          </Row>
        </FormItem>
        <!-- <FormItem label="免收手续费次数：">
          <span>{{DrawCondition.newNoCharges}}</span>
        </FormItem>
        <FormItem label="扣手续费：">
          <span>{{DrawCondition.chargesPoint===0?'免收':DrawCondition.chargesPoint}}</span>
        </FormItem>-->
        <FormItem
          label="认证姓名："
          prop="withdraw_name"
          :rules="{required: true, message:'请输入真实姓名', trigger: 'blur'}"
        >
          <Row>
            <Col span="19">
              <Input v-model="withdraw_name" type="text"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button @click="withdrawSubmit()" type="primary">提交申请</Button>
        </FormItem>
      </Form>

      <div slot="footer"></div>
    </Modal>
    <div class="logo_box nav_left">
      <img src="../../static/img/logo2.png" />
    </div>
    <div class="nav_center">
      <Menu mode="horizontal" ref="me" :active-name="activeName" @on-select="changeRouter">
        <MenuItem name="0"> 投注大厅
        </MenuItem>
        <MenuItem name="1"> 走势图
        </MenuItem>
        <MenuItem name="2"> 我的投注
        </MenuItem>
        <MenuItem name="3"> 个人报表
        </MenuItem>
        <MenuItem name="4" v-if="userDetail.type=='0'"> 用户中心
        </MenuItem>
        <MenuItem name="5"> 优惠活动
        </MenuItem>
        <MenuItem name="6"> 帮助中心
        </MenuItem>
      </Menu>

    </div>
    <!-- 账户基本信息 -->
    <div :class="userDetail.type=='0'?'nav_right member':'nav_right tourist'">
      <Poptip trigger="hover" placement="bottom-end">
        <div :class="'avatar '+'sprite-icon-'+iconClass"></div>
        <div slot="title">点击更换头像</div>
        <div slot="content">
          <div style="width: 352px;display: flex;justify-content: space-around;flex-wrap: wrap;">
            <div class="" v-for="item in spriteIconList" :key="item" :class="'avatar-list '+'sprite-icon-'+item" @click="changeIconClass(item)"></div>
          </div>
        </div>
      </Poptip>
      <div style="width:51px;height:100%;color: #fff;font-size: 14px;line-height: 64px;margin-left: 10px;">
        <div style="height: 50%;line-height: 44px;">{{userDetail.type=='0'?userDetail.account:'游客'}}</div>
        <Poptip trigger="hover" placement="bottom">
          <div style="height: 50%;line-height: 20px;">{{userDetail.accountBalance.toFixed(2)}}</div>
          <div slot="title" style="color: rgba(0,0,0,.65);display: flex;align-items: center;">
            <Button v-if="userDetail.type=='0'" type="ghost" size="small" @click="amountConversion">
              <Icon type="loop"></Icon>
              <span style="margin-left: 4px;">额度转换</span>
            </Button>
            <div style="width:10px"></div>
            <Button type="ghost" size="small" @click="getAllAmount">
              <Icon type="refresh"></Icon>
              <span style="margin-left:4px;">刷新</span>
            </Button>
          </div>
          <div slot="content" style="color: rgba(0,0,0,.65)">
            <div>
              <span>中心钱包：</span>
              <span>{{userDetail.accountBalance.toFixed(2)}}元</span>
            </div>
            <div v-if="userDetail.type=='0'" style="height: 1px;background:#dddee1;margin: 2px 0;"></div>
            <div v-if="userDetail.type=='0'">
              <span>沙巴钱包：</span>
              <span>{{balance_sb}}元</span>
            </div>
            <div v-if="userDetail.type=='0'">
              <span>利记钱包：</span>
              <span>{{balance_lj}}元</span>
            </div>
            <div v-if="userDetail.type=='0'">
              <span>VG钱包：</span>
              <span>{{balance_vg}}元</span>
            </div>
          </div>
        </Poptip>
      </div>
      <div style="height:100%;" class="btnBox">
        <Button :disabled="userDetail.hierarchy=='1'" @click="charge()" v-if="userDetail.type=='0'" class="recharge">充值</Button>
        <Button :disabled="userDetail.hierarchy=='1'" @click="_withdraw()" v-if="userDetail.type=='0'" class="cash">提现</Button>
        <!-- <Button @click="amountConversion" v-if="userDetail.type=='0'" class="transformation">额度转换</Button> -->
        <Button class="signout" @click="onSignOut">退出</Button>
      </div>
      <a :href="helpServiceUrl" target="_blank" class="call" style="display: flex;align-items: center;margin-left: 8px;width:80px;">
        <img src="../../static/img/kefu.png" style="width: 24px;height: 24px;" />
        <span style="font-size: 14px;color: #FFFFFF;margin-left: 4px;">客服</span>
      </a>
    </div>
  </div>
</template>

<script>
import { bus } from "../bus.js";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "0",
      paths: [
        "/bet",
        "/chart",
        "/mybet",
        "/report",
        "/account",
        "/activity",
        "/help"
      ],
      visible: false,
      spriteIconList: [
        "1",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "17",
        "18",
        "19",
        "2",
        "20",
        "3",
        "4",
        "6",
        "9"
      ],
      iconClass: "1",
      recharge: false,
      type: "0",
      formValidate: {
        assertPassword: "",
        bank: "",
        name: ""
      },
      // ruleValidate: {
      //   assertPassword: [
      //     {
      //       required: true,
      //       trigger: "change",
      //       message: "资金密码不能为空"
      //     }
      //   ]
      // },
      Bank: [],
      threeBank: [],
      value1: 0,
      value2: 0,
      text: "123",
      //        chnNumChar:["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],
      //        chnUnitSection:["","万","亿","万亿","亿亿"],
      //        chnUnitChar:["","拾","佰","仟"],
      unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
      maxMoney: "",
      minMoney: "",
      select: "1",
      //选择银行的信息
      bankMessage: "",
      //当前步骤
      step: 1,
      //是否展示充值订单
      show: true,
      //是否首存优惠
      firstDeposit: true,
      bankType: "",
      notice: false,
      pamentShow: false,
      chargeFinish: false,
      threeBankType: "",
      redirection: true,
      withdraw: false,
      withdrawMoney: 0,
      //三方充值文本提示
      textTip: "正在跳转中",
      //      balance:'',
      helpServiceUrl: "",
      bankEntrance: "",
      //三方实际充值金额
      realAmount: "",
      //a标签路径
      href: "#",
      //展示跳转银行充值的a标签
      showA: false,
      showOrder:false,
      productName:'',
      orderAmount:'',
      orderNo:"",
      href:'',



       in_money: 10,
      chargeType: [
        {
          type: "支付宝转账",
          src: "../../static/img/alipay.png",
          mode: "1"
        },
        {
          type: "微信转账",
          src: "../../static/img/weixin.png",
          mode: "0"
        },
        {
          type: "银行转账",
          src: "../../static/img/banks.png",
          mode: "2"
        }
      ],
      recharge_type: "1",
      recharge_account: "",
      recharge_realName: "",
      show_recharge_module: true,
      orderDetail: {},
      selectBank: 0,
      bank_account: "",
      withdraw_name:'',
      bankList:[]
    };
  },
  created() {},
  mounted() {
    this.$watch(
      "formValidate",
      newValue => {
        if (newValue.name !== "") {
          this.showA = true;
        } else {
          this.showA = false;
        }
      },
      { deep: true }
    );
    if (this.userDetail.avatar) {
      this.iconClass = this.userDetail.avatar;
    }
    //  	this.$axios({
    //        method: 'get',
    //        url:'/collect/helpService',
    //      }).then(function (data) {
    //        that.link=data.data.data
    //      }).catch(function (error) {
    //        console.log(error)
    //      })

    this.getHelpServiceUrl().then(res => {
      if (res.code == "0") {
        this.helpServiceUrl = res.data;
      }
    });
    bus.$on("show", () => {
      this.charge();
    });
    bus.$on("report", () => {
      let that = this;
      new Promise(function(reslove, reject) {
        that.activeName = "3";
        reslove();
      }).then(function() {
        that.changeRouter("3");
        that.routingReset();
      });
    });
    bus.$on("returnLotteryReporter", () => {
      this.activeName = "4";
      this.$refs.me.currentActiveName = this.activeName;
    });
    this.routingReset();
  },
  methods: {
    ...mapActions([
      "signOut",
      "getUserDetail",
      "queryIncome",
      "queryDrawCondition",
      "initState",
      "getBalance",
      "getHelpServiceUrl",
      "saveDiy",
      "touchsuper",
      "applyPoint"
    ]),
    ...mapActions("account", ["memberIfBind"]),
    //提现模态框显隐时的回调函数
    reveal(display) {
      console.log(this.bankList);
      let that = this;
      that.$refs["formValidate"].resetFields();
      if (display === true) {
        that.queryDrawCondition().then(function(res) {
          if (res.code === 0) {
            that.withdrawMoney = that.DrawCondition.drawFloorTimes;
            that.NumberToChinese(that.withdrawMoney);
           that.bankList=that.createBankList();
            that.$nextTick(()=>{
               that.selectBank=0;
            })
          
          }
        });
      }
    },

    //充值模态框显隐时的回调函数
    make(display) {
      if (display === true) {
        this.show_recharge_module = true;
        this.recharge_account = "";
        this.recharge_realName = "";
      }
    },

    recharge_submit() {
      this.$refs.formInline.validate(valid => {
        if (valid) {
          //  var reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
          if (this.in_money === "") {
            this.$Message.warning("请输入金额");
          } else {
            this.touchsuper().then(res => {
              let data;
              if (res.code === "0") {
                this.step = 2;
                this.show_recharge_module = false;
                this.orderDetail = res;
              } else if (res.code != "0") {
                this.$Message.warning(res.message);
              }
            });
          }
        }
      });
    },

    timeFormate(now) {
      let year = new Date(now).getFullYear();
      let month = new Date(now).getMonth() + 1;
      let date = new Date(now).getDate();
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      return year + "-" + month + "-" + date;
    },
    _time(now) {
      let hour = new Date(now).getHours();
      let min = new Date(now).getMinutes();
      let sec = new Date(now).getSeconds();
      if (hour < 10) hour = "0" + hour;
      if (min < 10) min = "0" + min;
      if (sec < 10) sec = "0" + sec;
      return hour + ":" + min + ":" + sec;
    },
    recharge_apply() {
      this.applyPoint({
        amount: this.in_money,
        realname: this.recharge_realName,
        //充值为0   提现为1
        type: "0",
        //微信为0，支付宝为1
        dealType: this.recharge_type,
        paynum: this.recharge_account
      }).then(res => {
        if (res.code === 1) {
          // this.$dialog.toast({ mes: res.data, timeout: 1500 });
          this.$Message.warning(res.data);
        } else if (res.code === 0) {
          this.$Message.success({
            content: res.data,
            onClose: () => {
              this.recharge = false;
              this.$router.push("/account/cashflow");
            }
          });
        }
      });
    },
    //选择三方充值方式
    selectThreeBanks(index) {
      this.threeMaxMoney = this.threeBank[index].gatherMax;
      this.threeMinMoney = this.threeBank[index].gatherMin;
      this.threeBank[index].gatherMin == 0
        ? (this.value2 = 1)
        : (this.value2 = Math.ceil(this.threeBank[index].gatherMin));
      this.NumberToChinese(this.value2);
    },
    amountConversion() {
      bus.$emit("show_amount");
    },
    toDx(n) {
      switch (n) {
        case "0":
          return "零";
        case "1":
          return "壹";
        case "2":
          return "贰";
        case "3":
          return "叁";
        case "4":
          return "肆";
        case "5":
          return "伍";
        case "6":
          return "陆";
        case "7":
          return "柒";
        case "8":
          return "捌";
        case "9":
          return "玖";
      }
    },
    // 转换算法主函数
    NumberToChinese(m) {
      m *= 100;
      m += "";
      var length = m.length;
      var result = "";
      for (var i = 0; i < length; i++) {
        if (i == 2) {
          result = "元" + result;
        } else if (i == 6) {
          result = "万" + result;
        }
        if (m.charAt(length - i - 1) == 0) {
          if (i != 0 && i != 1) {
            if (
              result.charAt(0) != "零" &&
              result.charAt(0) != "元" &&
              result.charAt(0) != "万"
            ) {
              result = "零" + result;
            }
          }
          continue;
        }
        result =
          this.toDx(m.charAt(length - i - 1)) +
          this.unit[this.unit.length - i - 1] +
          result;
      }
      result += result.charAt(result.length - 1) == "元" ? "整" : "";
      this.text = result;
    },
    //四舍五入
    round(num) {
      // num=num.toFixed(0);
      // this.$refs.input1.currentValue=num;
      // this.$refs.input2.currentValue=num;
      // this.value1=Number(num);
      // this.value2=Number(num);
      this.NumberToChinese(num);
    },
    //首存优惠选择
    selectFirstDeposit(option) {
      if (option === "0") {
        this.firstDeposit = false;
      } else {
        this.firstDeposit = true;
      }
    },

    //充值银行
    charge() {
      let that = this;
      that.recharge = true;
      that.type = "0";
      that.queryIncome();
    },

    //复制文本
    copy() {
      let clipboard = new Clipboard(".btn");
      clipboard.on("success", e => {
        this.$Message.success("复制成功");
        clipboard.destroy();
      });
    },
    //进入充值
    enterCharge() {
      window.open(this.bankEntrance);
    },

    //提现
    _withdraw() {
      let that = this;
      that.withdraw = true;
    },
    getAllAmount() {
      this.getUserDetail();
      this.getBalance({ platform: "gm_ibc" });
    },
    //提现提交
    withdrawSubmit(name) {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          //  var reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
          if (this.withdrawMoney === "") {
            this.$Message.warning("请输入金额");
          } else {
            this.applyPoint({
              amount: this.withdrawMoney,
              realname: this.withdraw_name,
              //充值为0   提现为1
              type:'1',
              //微信为0，支付宝为1
              dealType: this.bankList[this.selectBank].dealType,
              paynum: this.bankList[this.selectBank].account
            }).then(res => {
              if (res.code === 1) {
                // this.$dialog.toast({ mes: res.data, timeout: 1500 });
                this.$Message.warning(res.data);
              } else if (res.code === 0) {
                this.$Message.success({
            content: res.data,
            onClose: () => {
              this.withdraw = false;
              this.$router.push("/account/cashflow");
            }
          });
              }
            });
          }
        }
      });
    },
    routingReset() {
      let path = this.$router.history.current.path;
      this.paths.forEach((item, index) => {
        let reg = new RegExp(item, "g");
        if (reg.test(path)) {
          this.activeName = String(index);
          this.$nextTick(() => {
            this.$refs.me.currentActiveName = this.activeName;
          });
          return false;
        }
      });
    },
    onSignOut() {
      this.signOut().then(res => {
        this.initState();
        if (res.code == "0") {
          this.$router.push({
            path: "/"
          });
        }
      });
    },
    changeIconClass(index) {
      this.iconClass = index;
      this.saveDiy({ avatar: index });
    },
    changeRouter(name) {
      if (this.paths[name] == "/account") {
        this.memberIfBind().then(res => {
          if (res.code == "1") {
            this.$router.push({
              path: "/oneBank"
            });
          } else if (res.code == "0") {
            this.$router.push({
              path: this.paths[name]
            });
          }
        });
      } else {
        this.$router.push({
          path: this.paths[name]
        });
      }
    },
    leave() {
      this.visible = false;
    },
    enter() {
      this.visible = true;
    },
        createBankList() {
      let arr = Array.of();
      // console.log(typeof this.DrawCondition.bankList,this.userDetail)
      if (typeof this.DrawCondition.bankList === "object") {
        for (let item of this.DrawCondition.bankList) {
          arr.push({
            name: `${item.bankname} （${item.bankaccount.slice(-4)}）`,
            account: item.bankaccount,
            dealType: "2"
          });
        }
      }
      this.userDetail.aliPay &&
        arr.push({
          name: "支付宝",
          account: this.userDetail.aliPay,
          dealType: "1"
        });
      this.userDetail.vx &&
        arr.push({ name: "微信", account: this.userDetail.vx, dealType: "0" });
      return arr;
    }
  },
  computed: {
    ...mapState([
      "userDetail",
      "Income",
      "DrawCondition",
      "balance_vg",
      "balance_lj",
      "balance_sb"
    ]),
    ...mapState("account", ["companyBankAccountList", "saveMemberBankList"]),
     _type(index) {
      return index => {
        switch (index) {
          case "0":
            return "微信";
          case "1":
            return "支付宝";
          case "2":
            return "银行卡";
        }
      };
    },
    type_account(index) {
      return index => {
        switch (index) {
          case "0":
            return "WX";
          case "1":
            return "aliPay";
          case "2":
            return "bank";
        }
      };
    },

  },
};
</script>
<style scoped>
#navbar2 .ivu-menu-horizontal.ivu-menu-light:after {
  content: "";
  display: none;
}
#navbar2 .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
#navbar2 .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover,
#navbar2 .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active,
#navbar2 .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
  color: rgb(255, 219, 74) !important;
  border-bottom: none;
}
#navbar2 {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  margin: 0 auto;
}
#navbar2 .nav_left {
  float: left;
}
#navbar2 .nav_center {
  float: left;
}
#navbar2 .nav_right.member {
  float: left;
  width: 460px;
  height: 100%;
  display: flex;
  align-items: center;
}
#navbar2 .nav_right.tourist {
  margin-left: 40px;
  padding-left: 80px;
  float: right;
  width: 380px;
  height: 100%;
  display: flex;
  align-items: center;
}
#navbar2 .nav_right .avatar-list {
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  background-image: url(../../static/img/sprite.png);
  background-size: 64px 1100px;
}
#navbar2 .nav_right .ivu-poptip {
  display: flex;
}
#navbar2 .nav_right .ivu-poptip .ivu-poptip-inner {
  z-index: 901;
}
#navbar2 .nav_right .avatar {
  width: 44.8px;
  height: 44.8px;
  border-radius: 50%;
  background-image: url(../../static/img/sprite.png);
  background-size: 44.8px 770px;
}
#navbar2 .nav_center .ivu-menu {
  height: 64px;
  background: none;
  color: #fff;
}
#navbar2 .nav_center .ivu-menu li {
  color: #fff;
}
#navbar2 .nav_center .ivu-menu .ivu-menu-item-active,
#navbar2 .nav_center .ivu-menu .ivu-menu-item-selected {
  color: #2d8cf0;
}
#navbar2 .nav_center .ivu-menu .ivu-menu-item {
  padding: 0 16px !important;
}
#navbar2 .nav_center .ivu-menu li:hover {
  color: #2d8cf0;
}
#navbar2 .logo_box {
  /*margin-left: 50px;*/
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#navbar2 .logo_box img {
  display: inline-block;
  height: 45px;
  width: 120px;
  margin-right: 10px;
  border: none;
}
#navbar2 .btnBox {
  /*	width: 280px;*/
  margin-left: 30px;
}
#navbar2 .nav_right.tourist .btnBox {
  margin-left: 50px;
}
#navbar2 .btnBox .recharge {
  background: rgb(33, 196, 71);
  color: white;
  border-color: rgb(33, 196, 71);
  padding: 0 10px;
  font-size: 12px;
  border-radius: 4px;
  height: 22px;
  margin: 2px;
}
#navbar2 .btnBox .transformation {
  background: #ff6926;
  color: white;
  border-color: rgb(33, 196, 71);
  padding: 0 10px;
  font-size: 12px;
  border-radius: 4px;
  height: 22px;
  margin: 2px;
  border: none;
}
#navbar2 .btnBox .cash {
  background: #ffdb4a;
  border-color: #ffdb4a;
  padding: 0 10px;
  font-size: 12px;
  border-radius: 4px;
  height: 22px;
  margin: 2px;
}
#navbar2 .btnBox .cash:hover {
  background: #ffffff;
  border-color: #2b85e4;
}
#navbar2 .btnBox .signout {
  color: #f04134;
  background-color: #f7f7f7;
  border-color: #d9d9d9;
  padding: 0 10px;
  font-size: 12px;
  border-radius: 4px;
  height: 22px;
  margin: 2px;
}
#navbar2 .btnBox .signout:hover {
  color: #f7f7f7;
  background-color: #f04134;
  border-color: #f04134;
}
.sprite-icon-1.avatar {
  background-position: 0 -48px;
}
.sprite-icon-1 {
  background-position: 0 -69px;
}
.sprite-icon-10 {
  background-position: 0 -552px;
}
.sprite-icon-11 {
  background-position: 0 -138px;
}
.sprite-icon-12 {
  background-position: 0 -207px;
}
.sprite-icon-13 {
  background-position: 0 -276px;
}
.sprite-icon-14 {
  background-position: 0 -345px;
}
.sprite-icon-15 {
  background-position: 0 -414px;
}
.sprite-icon-17 {
  background-position: 0 -483px;
}
.sprite-icon-18 {
  background-position: 0 0;
}
.sprite-icon-19 {
  background-position: 0 -621.6px;
}
.sprite-icon-2 {
  background-position: 0 -690px;
}
.sprite-icon-20 {
  background-position: 0 -759px;
}
.sprite-icon-3 {
  background-position: 0 -828.4px;
}
.sprite-icon-4 {
  background-position: 0 -897.4px;
}
.sprite-icon-6 {
  background-position: 0 -966.6px;
}
.sprite-icon-9 {
  background-position: 0 -1035.6px;
}
.sprite-icon-10.avatar {
  background-position: 0 -387px;
}
.sprite-icon-11.avatar {
  background-position: 0 -97px;
}
.sprite-icon-12.avatar {
  background-position: 0 -145px;
}
.sprite-icon-13.avatar {
  background-position: 0 -193px;
}
.sprite-icon-14.avatar {
  background-position: 0 -242px;
}
.sprite-icon-15.avatar {
  background-position: 0 -290px;
}
.sprite-icon-17.avatar {
  background-position: 0 -339px;
}
.sprite-icon-18.avatar {
  background-position: 0 0;
}
.sprite-icon-19.avatar {
  background-position: 0 -436px;
}
.sprite-icon-2.avatar {
  background-position: 0 -483.4px;
}
.sprite-icon-20.avatar {
  background-position: 0 -531.4px;
}
.sprite-icon-3.avatar {
  background-position: 0 -580px;
}
.sprite-icon-4.avatar {
  background-position: 0 -628px;
}
.sprite-icon-6.avatar {
  background-position: 0 -677px;
}
.sprite-icon-9.avatar {
  background-position: 0 -725px;
}
.ivu-modal-header-inner {
  font-weight: normal;
}
.charge .ivu-modal-content {
  min-height: 606px;
}
.charge .ivu-modal-footer {
  padding: 0;
  border-top: 0;
  text-align: left;
}
.warm_tip {
  margin-left: 25%;
  margin-bottom: 12px;
}
.chargePage .ivu-form-item:nth-child(2) {
  margin-bottom: 0;
}
.chargePage .ivu-form-item:nth-child(3) {
  margin-bottom: 0;
}
#payment .ivu-form-item:last-child {
  margin-bottom: 0;
}
.ivu-modal-confirm-head {
  height: 0;
}
.threeBank .ivu-form-item:nth-child(2) {
  margin-bottom: 0;
}
.dotting {
  display: inline-block;
  min-width: 2px;
  min-height: 2px;
  box-shadow: 2px 0 currentColor, 6px 0 currentColor, 10px 0 currentColor; /* for IE9+, ..., 3个点 */
  animation: dot 4s infinite step-start both; /* for IE10+, ... */
}
.dotting:before {
  content: "...";
} /* for IE8. 若无需兼容IE8, 此行以及下一行删除*/
.dotting::before {
  content: "";
} /* for IE9+ 覆盖 IE8 */
:root .dotting {
  margin-right: 8px;
} /* for IE9+,FF,CH,OP,SF 占据空间*/
@keyframes dot {
  25% {
    box-shadow: none;
  } /* 0个点 */
  50% {
    box-shadow: 2px 0 currentColor;
  } /* 1个点 */
  75% {
    box-shadow: 2px 0 currentColor, 6px 0 currentColor; /* 2个点 */
  }
}
.charge .ivu-tabs {
  height: 515px;
  overflow-y: auto;
}
.withdraw .ivu-modal-footer {
  border-top: 0;
}
.withdraw .ivu-form-item:nth-child(5) {
  margin-bottom: 0;
}
.ivu-radio-group {
  display: flex !important;
  flex-wrap: wrap;
}
.ivu-radio-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.recharge_module {
  margin-top: 30px;
}
.recharge_module ._item {
  margin-bottom: 20px;
  margin-left: 70px;
}
._item .ivu-row{
  margin-bottom: 20px;
}
</style>
