<template>
  <div id="register">
    <div>
      <!-- <img src="../../static/img/register_m5_logo.png" alt=""> -->
      <img class="logo2-img" src="../../static/img/logo2.png" alt="">
    </div>
    <div class="register_nav">
      <div class="register_nav_img">
        <img src="../../static/img/login_banner.jpg" alt="">
      </div>
      <div class="register_nav_form">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" label-position="top">
          <FormItem label="账号" prop="account">
            <Input type="text" v-model="formCustom.account"></Input>
          </FormItem>
          <!-- <FormItem label="昵称" prop="name">
              <Input type="text" v-model="formCustom.name"></Input>
            </FormItem> -->
          <FormItem label="密码" prop="password">
            <Input type="password" v-model="formCustom.password"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="confirmPassword">
            <Input type="password" v-model="formCustom.confirmPassword"></Input>
          </FormItem>
          <FormItem label="邀请码" prop="zcCode">
            <Input type="text" v-model="formCustom.zcCode" @on-change="changeCode"></Input>
          </FormItem>
          <FormItem :label-width="0" prop="validateCode" class="validateCode_inp">
            <Input type="text" placeholder="请输入验证码" v-model="formCustom.validateCode" style="width: 142px;"></Input>
            <div id="validateCode" :style="validateCode" @click="updatevValidateCode"></div>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')" long>注册</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapState,
    mapActions
  } from "vuex";
	import baseUrl from '../gobal.js'
  export default {
    data() {
      const account = (rule, value, callback) => {
        let regs = /^[a-zA-Z][a-zA-Z0-9_]{5,16}$/;
        if (value === '') {
          callback(new Error('账号不能为空!'));
        } else if (!regs.test(value)) {
          callback(new Error('账号必须包含数字和字母,长度在6-16之间!'));
        } else {
          callback();
        }
      };
      const password = (rule, value, callback) => {
        let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
        if (value === '') {
          callback(new Error('密码不能为空!'));
        } else if (!reg.test(value)) {
          callback(new Error('密码为6-20位，至少包含数字和字母'));
        } else {
          callback();
        }
      };
      const confirmPassword = (rule, value, callback) => {
        if (value !== this.formCustom.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      };
      const zcCode = (rule, value, callback) => {
        let reg = /^\d{6}$/
        console.log(value)
        if (value == null || value == "") {
          callback(new Error('邀请码不能为空!'));
        } else if (!reg.test(value)) {
          callback(new Error('邀请码为6位数字'))
        } else {
          callback()
        }
      };
      return {
        formCustom: {
          account: '',
          name: '',
          password: '',
          confirmPassword: '',
          zcCode: null,
          validateCode: ''
        },
        validateCode: {
          "background": ""
        },
        ruleCustom: {
          account: [{
            validator: account,
            trigger: 'blur',
            required: true
          }],
          name: [{
            trigger: 'blur',
            required: true,
            message: '请填写用户昵称'
          }],
          password: [{
            validator: password,
            trigger: 'blur',
            required: true
          }],
          confirmPassword: [{
            validator: confirmPassword,
            trigger: 'blur',
            required: true
          }],
          validateCode: [{
							trigger: 'blur'
						},
						{
							validator(rule, value, callback, source, options) {
								var errors = [];
								let reg = /^[0-9]{4}$/;
								if (value === '' || !reg.test(value)) {
									callback(new Error('请填写4位数字验证码'));
								}
								callback(errors);
							}
						}
					]
          // zcCode:[
          //   { validator: zcCode, trigger: 'blur', required: true }
          // ]
        }
      }
    },
    created() {
      this.setIsLogin(false)
			this.updatevValidateCode()
    },
    methods: {
      ...mapActions(['registerMember', 'setIsLogin']),
      register() {
        let windLocation = window.location.href;
        let urlId = windLocation.substring(windLocation.indexOf("register") + 9, windLocation.length);
        if (urlId == "" || urlId == null || urlId == undefined) {
          urlId = "ff80808162232b920162327de2270133";
        }
        let md5_pwd = hex_md5(this.formCustom.password);
        let params = {
          'memberAccount': this.formCustom.account,
          'password': md5_pwd,
          'memberName': this.formCustom.name,
          'promoteId': urlId,
          'way': '1',
          'invitationCode': this.formCustom.zcCode + "", // 注册码,
          'verificationCode': this.formCustom.validateCode
        };
        this.registerMember(params).then((res) => {
          if (res.code === 0) {
            this.$Message.success(res.msg);
            this.$router.replace({
              path: '/'
            })
          } else if (res.code != 0) {
            this.$Message.error(res.msg);
            this.formCustom.account = '';
            this.formCustom.name = '';
            this.formCustom.password = '';
            this.formCustom.zcCode = '';
          }
        })
      },
      updatevValidateCode() {
				let timestamp = Date.parse(new Date());
				this.validateCode = {
					"background": "url(" + baseUrl + "/inter/user/validateCode?" + timestamp + ") 45% 100%"
				}
			},
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.register()
          } else {
            this.$Message.error('填写必填参数!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      changeCode() {
        console.log(this.formCustom.password)
      }
    }
  }
</script>
<style>
  .validateCode_inp .ivu-form-item-content {
    display: flex;
  }
  #validateCode {
		display: inline-block;
		width: 110px;
		height: 32px;
		vertical-align: middle;
		line-height: normal;
	}
  #register {
    width: 1000px;
    overflow: hidden;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 71.2px;
    margin: 0 auto;
    overflow: hidden;
    font-size: 12px;
    background: #ececec;
    padding: 50px 8px;
    box-sizing: border-box;
  }
  .logo2-img {
    display: inline-block;
    width: 156px;
    height: 75px;
  }
  .register_nav {
    display: flex;
    align-items: center;
    height: 460px;
    /*border: 1px solid #1c2438;*/
    border-radius: 7px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: #d7d7d7 0px 0px 3px 3px;
  }
  .register_nav_img {
    width: 603px;
    height: 278px;
    float: left;
  }
  .register_nav_form {
    float: left;
    width: 260px;
    height: 380px;
    padding: 5px 10px;
    box-sizing: border-box;
  }
</style>
