<template>
  <div class="turnpoint">
    <Tabs :value="bindName">
      <TabPane v-if="userDetail.hierarchy!='0'" label="转点下级" name="sub" class="sub item">
        <h3>
          温馨提示：
          <span>此转点功能可以给指定的下级转点！</span>
        </h3>
        <Form ref="subForm" :model="subForm" :rules="subRules" :label-width="100" class="item-form">
          <FormItem label="支付方式：" prop="dealType">
            <RadioGroup v-model="subForm.dealType">
              <Radio :label="0">微信</Radio>
              <Radio :label="1">支付宝</Radio>
              <!-- <Radio :label="2">银行卡</Radio> -->
            </RadioGroup>
          </FormItem>
          <FormItem label="转点金额：" prop="subMoney">
            <InputNumber :min="1" v-model="subForm.subMoney" placeholder="请输入转点金额" style="width: 100%;"></InputNumber>
          </FormItem>
          <FormItem label="下级账号：" prop="subAccount">
            <Input type="text" v-model="subForm.subAccount" placeholder="请输入下级账号"></Input>
          </FormItem>
          <!-- <FormItem label="资金密码：" prop="subPwd">
                  <Input type="password" v-model="subForm.subPwd" placeholder="请输入资金密码"></Input>
                </FormItem> -->
          <FormItem style="text-align:center;">
            <Button type="primary" class="submint-btn" @click="toSub('subForm')">确认</Button>
          </FormItem>
        </Form>
      </TabPane>
      <TabPane v-if="userDetail.hierarchy!='1'" label="转点上级" name="sup" class="sup item">
        <h3>
          温馨提示：
          <span>此转点功能当前账号需要向上级申请！</span>
        </h3>
        <Form ref="supForm" :model="supForm" :rules="supRules" :label-width="100" class="item-form">
          <FormItem label="支付方式：" prop="dealType">
            <RadioGroup v-model="supForm.dealType">
              <Radio :label="0">微信</Radio>
              <Radio :label="1">支付宝</Radio>
              <!-- <Radio :label="2">银行卡</Radio> -->
            </RadioGroup>
          </FormItem>
          <FormItem :min="1" label="申请金额：" prop="supMoney">
            <InputNumber v-model="supForm.supMoney" placeholder="请输入申请金额" style="width: 100%;"></InputNumber>
          </FormItem>
          <FormItem label="资金密码：" prop="supPwd">
            <Input v-model="supForm.supPwd" type="password" placeholder="请输入真实姓名" style="width: 100%;"></Input>
          </FormItem>
          <FormItem label="真实姓名：" prop="realname">
            <Input v-model="supForm.realname" placeholder="请输入真实姓名" style="width: 100%;"></Input>
          </FormItem>
          <FormItem label="转账账号：" prop="paynum">
            <Input v-model="supForm.paynum" placeholder="请输入转账账号" style="width: 100%;"></Input>
          </FormItem>
          <FormItem style="text-align:center;">
            <Button type="success" class="submint-btn" @click="applySup('supForm', 0)">充值</Button>
            <Button type="error" class="submint-btn" @click="applySup('supForm', 1)">提现</Button>
            <!-- <Button type="primary" @click="applySup('supForm')">申请</Button> -->
          </FormItem>
        </Form>
      </TabPane>
      <TabPane v-if="userDetail.hierarchy!='0'" label="转点审核" name="audit" class="audit item">
        <h3>
          温馨提示：
          <span>审核下级像上级的转点申请！</span>
        </h3>
        <Form class="item-form" :label-width="100" v-for="(item, index) in subApplyList" :key="index">
          <FormItem label="下级账号：" style="margin-bottom: 10px;">
            <span>{{item.account}}</span>
          </FormItem>
          <FormItem label="真实姓名：" style="margin-bottom: 10px;">
            <span>{{item.realname}}</span>
          </FormItem>
          <FormItem label="转账账号：" style="margin-bottom: 10px;">
            <span>{{item.paynum}}</span>
          </FormItem>
          <FormItem label="转点金额：" style="margin-bottom: 10px;">
            <span>{{item.amount}}元</span>
          </FormItem>
          <FormItem label="转点方式：" style="margin-bottom: 10px;">
            <span>{{(item.type=='0')?'充值':(item.type=='1'&&'提现')}}</span>
          </FormItem>
          <FormItem label="支付方式：" style="margin-bottom: 10px;">
            <span>{{(item.dealType=='0')?'微信':(item.dealType=='1'?'支付宝':(item.dealType=='2'&&'银行卡'))}}</span>
          </FormItem>
          <FormItem v-if="payWay" :label="(item.dealType=='0')?'微信账号：':(item.dealType=='1'?'支付宝账号：':(item.dealType=='2'&&(payWay=false)))" style="margin-bottom: 10px;">
            <span>
                    {{(item.dealType=='0')?(item.vx?item.vx:'暂未绑定'):(item.dealType=='1'&&(item.aliPay?item.aliPay:'暂未绑定'))}}
                  </span>
          </FormItem>
          <FormItem label="申请时间：" style="margin-bottom: 10px;">
            <span>{{item.applytime.slice(0, -2)}}</span>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="audit(item)">审核</Button>
          </FormItem>
        </Form>
        <p class="check-null" v-if="checkNull">当前暂无转点审核任务！</p>
      </TabPane>
    </Tabs>
    <Modal v-model="isShowModel" title="审核" :mask-closable="false" @on-ok="operation('pass')" @on-cancel="operation('noPass')" ok-text="通过" cancel-text="不通过">
      <Form :label-width="100">
        <FormItem label="下级账号：">
          <p>{{auditAccount}}</p>
        </FormItem>
        <!-- <FormItem label="资金密码：">
          <Input v-model="auditPwd" placeholder="请输入资金密码"></Input>
        </FormItem> -->
      </Form>
    </Modal>
  </div>
</template>
<script>
  import {
    mapActions,
    mapState
  } from 'vuex';
  export default {
    data() {
      return {
        subForm: {
          dealType: 0,
          subMoney: null,
          subAccount: '',
          subPwd: ''
        },
        subRules: {
          subAccount: [{
            required: true,
            message: '请输入下级账号',
            trigger: 'blur'
          }],
          subPwd: [{
            required: true,
            message: '请输入资金密码',
            trigger: 'blur'
          }]
        },
        supForm: {
          dealType: 0,
          supMoney: null,
          supPwd: '',
          realname: '',
          paynum: ''
        },
        supRules: {
          supPwd: [{
            required: true,
            message: '请输入资金密码',
            trigger: 'blur'
          }],
          realname: [{
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur'
          }],
          paynum: [{
            required: true,
            message: '请输入申请账号',
            trigger: 'blur'
          }]
        },
        checkNull: false,
        subApplyList: [],
        isShowModel: false,
        auditAccount: '',
        auditPwd: '',
        id: '',
        payWay: true,
        auditTitle: '',
        operationItem: {
          applytime: ''
        }
      }
    },
    computed: {
      ...mapState(['userDetail']),
      bindName() {
        if (this.userDetail.hierarchy == '2' || this.userDetail.hierarchy == '1') {
          return 'sub'
        } else if (this.userDetail.hierarchy == '0') {
          return 'sup'
        }
        return
      }
    },
    created() {
      this.auditApply()
    },
    methods: {
      ...mapActions('account', ['superToSub', 'applyPoint', 'queryApplyPoint', 'disposeApplyPoint']),
      toSub(name) {
        if (this.subForm.subMoney == null || this.subForm.subMoney == '') {
          this.$Message.warning('请输入转点金额！')
          return false
        }
        this.$refs[name].validate(valid => {
          if (valid) {
            this.submitSub()
          }
        })
      },
      submitSub() {
        let params = {
          'dealType': this.subForm.dealType,
          'amount': this.subForm.subMoney,
          // 'tradePassword': hex_md5(this.subForm.subPwd),
          'subname': this.subForm.subAccount
        }
        this.superToSub(params).then(res => {
          if (res.code == 0) {
            this.$Message.success(res.data)
            this.subForm = {
              dealType: 0,
              subMoney: null,
              subAccount: ''
            }
          } else {
            this.$Message.error(res.data)
          }
        })
      },
      applySup(name, type) {
        if (this.supForm.supMoney == null || this.supForm.supMoney == '') {
          this.$Message.warning('请输入转点金额！')
          return false
        }
        this.$refs[name].validate(valid => {
          if (valid) {
            this.submitSup(type)
          }
        })
      },
      submitSup(type) {
        let params = {
          'amount': this.supForm.supMoney,
          'dealType': this.supForm.dealType,
          'paynum': this.supForm.paynum,
          'realname': this.supForm.realname,
          'type': type,
          'tradePassword': hex_md5(this.supForm.supPwd)
        }
        this.applyPoint(params).then(res => {
          if (res.code == 0) {
            this.$Message.success(res.data)
            this.supForm = {
              dealType: 0,
              supMoney: null,
              supPwd: ''
            }
          } else {
            this.$Message.error(res.data)
          }
        })
      },
      auditApply() {
        this.queryApplyPoint().then(res => {
          this.subApplyList = res
          this.subApplyList.forEach(val, index, arr => {
            if (val.type == '0') {
              val.type = '充值'
            } else if (val.type == '1') {
              val.type = '提现'
            }
          })
          if (res.length == 0) {
            this.checkNull = true
          }
        })
      },
      audit(item) {
        this.isShowModel = true
        this.operationItem = item
        this.auditAccount = item.account
        this.id = item.id
        if (item.type == '0') {
          this.auditTitle = '充值'
        } else if (item.type == '1') {
          this.auditTitle = '提现'
        }
      },
      operation(type) {
        // if (this.auditPwd == '') {
        //   this.$Message.warning('请输入资金密码！')
        //   return false
        // }
        let status;
        type == 'pass' ? status = 0 : status = 2;
        this.disposeApplyPoint({
          'id': this.id,
          'status': status,
          'subname': this.auditAccount,
        }).then(res => {
          if (res.code == 0) {
            this.$Message.success(res.data)
            this.auditApply()
          } else {
            this.$Message.error(res.data)
          }
        })
      },
      trade_type(index) {
        if (index == '0') {
          return '微信'
        } else if (index == '1') {
          return '支付宝'
        } else if (index == '2') {
          return '银行卡'
        }
      }
    }
  }
</script>

<style>
  .turnpoint {
    width: 800px;
    margin: 0 auto;
    padding: 10px;
    background: #f5f5f5;
  }
  .turnpoint .item {
    padding: 10px 20px;
  }
  .turnpoint .item .item-form {
    margin-top: 20px;
  }
  .turnpoint .item .check-null {
    text-align: center;
    margin-top: 30px;
  }
  /* .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
          height: 120px;
          margin-top: -16px;
        }
        .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
          background: #fff;
          padding: 16px;
        }
        .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
          border-color: transparent;
        }
        .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
          border-color: #fff;
        } */
</style>
