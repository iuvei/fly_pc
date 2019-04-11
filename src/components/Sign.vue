<template>
	<div id="sign">
		<div class="img">
			<div class="container">
				<div class="main">
					<p>累计签到，可获得的积分逐日递增。</p>
					<div id="timeLine">
						<div id="timeLineItem" v-for="(item,index) in dataList">
							<div class="_main">
								<div :class="index<=dayNumbers-1?'_sign ok':'_sign'">{{index>dayNumbers-1?'+'+item.integral:''}}</div>
								<span v-if="index!=6"></span>
							</div>
							<div class="_tip">{{item.day}}</div>
						</div>
					</div> <button :class="!disabled?'sign_btn':'sign_btn2'" @click="goSign">{{!disabled?'签到':'已签到'}}</button></div>
			</div>
		</div>
		<div class="betAward" style="display: none;">
			<p>当投注额大于时可获得奖励，现在您的投注额为</p>
		</div>
	</div>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		data() {
			return {
				dataList: [{
						day: "第1天",
						integral: 0,
					},
					{
						day: "第2天",
						integral: 0,
					},
					{
						day: "第3天",
						integral: 0,
					},
					{
						day: "第4天",
						integral: 0,
					},
					{
						day: "第5天",
						integral: 0,
					},
					{
						day: "第6天",
						integral: 0,
					},
					{
						day: "第7天",
						integral: 0,
					},
				],
				dayNumbers: 1,
				disabled: false,
			}
		},
		created() {
			this.getDayNum()
		},
		props: ["list"],
		methods: {
			...mapActions([
				"queryActivity",
				"signTime",
				"getUserDetail"
			]),
			getDayNum() {
				this.dayNumbers = this.list.signRecord.length - 6;
				this.disabled = this.list.nowStatus;
				this.dataList.forEach((item2, index2) => {
					item2.integral = this.list.signAmount.split(",")[index2]
				})
			},
			goSign() {
				if (this.disabled) {
					return false;
				}
				this.signTime().then((res) => {
					if (res.code == 0) {
						this.getDayNum()
						this.getUserDetail()
						this.$emit("ok")
					} else {
						this.$Message.error(res.msg);
					}
				})
			}
		},
		watch: {
			list() {
				this.getDayNum()
			}
		}
	}
</script>

<style>
	#sign {
		padding: 10px 15px 0;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
	}
	#sign .img {
		text-align: center;
	}
	#sign .img .container {
		width: 100%;
		background: #ffe97b;
		border-radius: 7px;
		overflow: hidden;
	}
	#sign .img .container .main {
		margin: 10px;
		background: #fffae0;
		overflow: hidden;
		font-size: 12px;
		border-radius: 7px;
	}
	#sign .img .container .main p {
		margin: 10px;
		padding: 7px;
		background: #ffe49c;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		border-radius: 5px;
	}
	#timeLine {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
	}
	#timeLineItem ._main {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	#timeLineItem ._tip {
		text-align: left;
		padding-left: 2px;
	}
	#timeLineItem ._main ._sign {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #fff;
		line-height: 40px;
		border: 2px solid #ffb764;
		font-size: 16px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
	}
	#timeLineItem ._main ._sign.ok {
		background-image: url(../../static/img/dui.png);
		background-size: 100% 100%;
	}
	#sign .img .container .main .sign_btn2 {
		background: #c4c4c4;
		color: #fff;
		-webkit-box-shadow: none;
		box-shadow: none;
	}
	#timeLineItem ._main span {
		display: inline-block;
		width: 20px;
		height: 5px;
		background: #ffe97b;
	}
	#sign .img .container .main .sign_btn,
	#sign .img .container .main button {
		outline: none;
		padding: 10px 25px;
		border: 0;
		background: #fe9d28;
		margin: 15px 0;
		color: #5e2100;
		font-weight: 900;
		font-size: 15px;
		-webkit-box-shadow: 3px 3px 1px #5e2100;
		box-shadow: 3px 3px 1px #5e2100;
		border-radius: 10%;
	}
	#sign .img .container .main .sign_btn:active {
		box-shadow: -3px -3px 1px #5e2100;
	}
</style>