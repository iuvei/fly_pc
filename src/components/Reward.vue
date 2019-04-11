<template>
	<div class="betAward" id="betAward">
		<div class="img">
			<div class="container">
				<div class="main">
					<p><span>当投注额大于</span><strong style="color: red;margin: 0 1px;">{{amount}}</strong>元<span>时可获得奖励，现在您的投注额为</span>
						<strong v-if="betAmount*1<amount*1" style="color: red;margin: 0 1px;">{{betAmount}}</strong>
						<strong style="color: green;margin: 0 1px;" v-else>{{betAmount}}</strong>元。
						<span>满足条件后可领取</span>
						<strong style="color: green;margin: 0 1px;" >{{awardAmount}}</strong>元。
					</p>
					<div style="margin: 10px 0;">
						<Progress :percent="percent">
						</Progress>
					</div>
					<div>
						<span v-if="betAmount*1<amount*1">还差{{amount*1-betAmount*1}}元即可领取丰厚奖励，赶快去投注吧！</span>
						<span v-else>您已满足领取奖励的条件，赶快领取您的奖励吧！</span>
					</div>
					<div style="margin: 10px 0;">
						<Button type="success" :loading="loading" v-if="betAmount*1>=amount*1&&!list.nowStatus" @click="receiveReward">可领取</Button>
						<!--<Button type="success" v-if="true" @click="receiveReward">可领取</Button>-->
						<Button disabled v-else-if="betAmount*1>=amount*1&&list.nowStatus">已领取</Button>
						<Button v-else disabled>未达成</Button>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	export default {
		data() {
			return {
				percent: 20,
				amount: 0,
				betAmount: 0,
				awardAmount: 0,
				loading: false,
			}
		},
		props: ["list"],
		created() {
			this.awardAmount = this.list.awardAmount;
			this.betAmount = this.list.betAmount;
			this.amount = this.list.amount;
			this.percent = (this.betAmount / this.amount) * 100;
			this.percent = Math.round(this.percent * 100) / 100;

		},
		methods: {
			...mapActions([
				"getBetAwardAmount",
				"getUserDetail"
			]),
			receiveReward() {
				this.loading = true;
				this.getBetAwardAmount().then((res) => {
					if(res.code == 0) {
						this.loading = false;
						this.getUserDetail();
						this.list.nowStatus = true;
						this.$emit("ok")
					}else{
						this.loading = false;
						this.$Message.error(res.msg);
					}
				})
			}
		},
		watch: {
			list() {
				this.awardAmount = this.list.awardAmount;
				this.betAmount = this.list.betAmount;
				this.amount = this.list.amount;
				this.percent = (this.betAmount / this.amount) * 100;
				this.percent = Math.round(this.percent * 100) / 100;
			},
			percent() {
				if(this.percent > 100) {
					this.percent = 100;
				}

			}
		}
	}
</script>

<style>
	#betAward {
		padding: 10px 15px 0;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
	}
	
	#betAward .ivu-progress {
		height: 30px;
	}
	
	#betAward .ivu-progress-inner,
	.ivu-progress-outer {
		height: 100%;
	}
	
	#betAward .ivu-progress-bg {
		height: 100% !important;
	}
	
	#betAward .img {
		text-align: center;
	}
	
	#betAward .img .container {
		width: 100%;
		background: #ffe97b;
		border-radius: 7px;
		overflow: hidden;
	}
	
	#betAward .img .container .main {
		margin: 10px;
		background: #fffae0;
		overflow: hidden;
		font-size: 12px;
		border-radius: 7px;
	}
	
	#betAward .img .container .main p {
		margin: 10px;
		padding: 7px;
		background: #ffe49c;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: flex-start;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		border-radius: 5px;
	}
	
	#betAward .img .container .main .betAward_btn:active {
		box-shadow: -3px -3px 1px #5e2100;
	}
</style>