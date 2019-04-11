<template>
	<div class="lmp_bet">
		<Modal class-name="vertical-center-modal" v-model="show" width="600" title="投注明细" @on-ok="ok"
        @on-cancel="cancel" :mask-closable="false" :loading="true">
        <div style="width: 560px;max-height: 330px;overflow: auto;">
        	<Table stripe :columns="columns" :data="orderList" no-data-text="无注单"></Table>
        </div>
			
		</Modal>
		<div v-if="classId=='3'">
		<ul class="game_info" v-if="showId!=='zh'">
			<li v-for="(item1,index1) in dataList">
				<div class="game_title">
					<h3>{{item1.title}}</h3></div>
				<ul class="groupList">
					<li :class="isNaN(item2.name)?'lg25 clearfix':'lg20 clearfix'" v-for="(item2,index2) in item1.groups">
						<span style="cursor: pointer;" :class="isNaN(item2.name)?'btn_nan':'btn_num'">{{item2.name}}</span>
						<span style="cursor: pointer;">{{twoGameOddList[item2.key]?twoGameOddList[item2.key]:'--'}}</span>
						<input :name="item1.title" min="1" type="text" maxlength="7" v-model="item2.amount" @focus="focus(index1,index2)" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')" @blur="checkNumber(index1,index2)">
					</li>
				</ul>
			</li>
		</ul>
		<ul class="game_info" v-if="showId==='zh'">
			<li v-for="(item1,index1) in dataList" v-if="index1==0">
				<div class="game_title">
					<h3>{{item1.title}}</h3></div>
				<ul class="groupList">
					<li :class="isNaN(item2.name)?'lg25 clearfix':'lg20 clearfix'" v-for="(item2,index2) in item1.groups">
						<span style="cursor: pointer;" :class="isNaN(item2.name)?'btn_nan':'btn_num'">{{item2.name}}</span>
						<span style="cursor: pointer;">{{twoGameOddList[item2.key]?twoGameOddList[item2.key]:'--'}}</span>
						<input :name="item1.title" min="1" type="text" maxlength="7" v-model="item2.amount" @focus="focus(index1,index2)" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')" @blur="checkNumber(index1,index2)">
					</li>
				</ul>
			</li>
			<li class="cloum" v-for="(item1,index1) in dataList" v-if="index1>0&&index1<=5">
				<div class="game_title">
					<h3>{{item1.title}}</h3></div>
				<ul class="groupList">
					<li :class="isNaN(item2.name)?'lg25 clearfix':'lg20 clearfix'" v-for="(item2,index2) in item1.groups">
						<span style="cursor: pointer;" :class="isNaN(item2.name)?'btn_nan':'btn_num'">{{item2.name}}</span>
						<span style="cursor: pointer;">{{twoGameOddList[item2.key]?twoGameOddList[item2.key]:'--'}}</span>
						<input :name="item1.title" min="1" type="text" maxlength="7" v-model="item2.amount" @focus="focus(index1,index2)" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')" @blur="checkNumber(index1,index2)">
					</li>
				</ul>
			</li>
			<li v-for="(item1,index1) in dataList" v-if="index1>5">
				<div class="game_title">
					<h3>{{item1.title}}</h3></div>
				<ul class="groupList">
					<li :class="isNaN(item2.name)?'lg25 clearfix':'lg20 clearfix'" v-for="(item2,index2) in item1.groups">
						<span style="cursor: pointer;" :class="isNaN(item2.name)?'btn_nan':'btn_num'">{{item2.name}}</span>
						<span style="cursor: pointer;">{{twoGameOddList[item2.key]?twoGameOddList[item2.key]:'--'}}</span>
						<input :name="item1.title" min="1" type="text" maxlength="7" v-model="item2.amount" @focus="focus(index1,index2)" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')" @blur="checkNumber(index1,index2)">
					</li>
				</ul>
			</li>
		</ul>
		</div>
		<div v-else-if="classId=='6'">
		<ul class="game_info" v-if="showId==='lmp'">
			<li v-for="(item1,index1) in dataList" v-if="index1==0">
				<div class="game_title">
					<h3>{{item1.title}}</h3></div>
				<ul class="groupList">
					<li :class="isNaN(item2.name)?'lg25 clearfix':'lg20 clearfix'" v-for="(item2,index2) in item1.groups">
						<span style="cursor: pointer;" :class="isNaN(item2.name)?'btn_nan':'btn_num'">{{item2.name}}</span>
						<span style="cursor: pointer;">{{twoGameOddList[item2.key]?twoGameOddList[item2.key]:'--'}}</span>
						<input :name="item1.title" min="1" type="text" maxlength="7" v-model="item2.amount" @focus="focus(index1,index2)" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')" @blur="checkNumber(index1,index2)">
					</li>
				</ul>
			</li>
			<li class="cloum" v-for="(item1,index1) in dataList" v-if="index1>0">
				<div class="game_title">
					<h3>{{item1.title}}</h3></div>
				<ul class="groupList">
					<li :class="isNaN(item2.name)?'lg25 clearfix':'lg20 clearfix'" v-for="(item2,index2) in item1.groups">
						<span style="cursor: pointer;" :class="isNaN(item2.name)?'btn_nan':'btn_num'">{{item2.name}}</span>
						<span style="cursor: pointer;">{{twoGameOddList[item2.key]?twoGameOddList[item2.key]:'--'}}</span>
						<input :name="item1.title" min="1" type="text" maxlength="7" v-model="item2.amount" @focus="focus(index1,index2)" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')" @blur="checkNumber(index1,index2)">
					</li>
				</ul>
			</li>
		</ul>
		<ul class="game_info" v-if="showId==='1T10'">
			<li class="cloum" v-for="(item1,index1) in dataList" >
				<div class="game_title">
					<h3>{{item1.title}}</h3></div>
				<ul class="groupList">
					<li :class="isNaN(item2.name)?'lg25 clearfix':'lg20 clearfix'" v-for="(item2,index2) in item1.groups">
						<span style="cursor: pointer;" :class="'btn_nan p'+(index2+1)">{{item2.name}}</span>
						<span style="cursor: pointer;">{{twoGameOddList[item2.key]?twoGameOddList[item2.key]:'--'}}</span>
						<input :name="item1.title" min="1" type="text" maxlength="7" v-model="item2.amount" @focus="focus(index1,index2)" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')" @blur="checkNumber(index1,index2)">
					</li>
				</ul>
			</li>
		</ul>
		<ul class="game_info" v-if="showId==='gyzh'">
			<li  v-for="(item1,index1) in dataList" >
				<div class="game_title">
					<h3>{{item1.title}}</h3></div>
				<ul class="groupList">
					<li :class="isNaN(item2.name)?'lg25 clearfix':'lg20 clearfix'" v-for="(item2,index2) in item1.groups">
						<span style="cursor: pointer;" :class="isNaN(item2.name)?'btn_nan':'btn_num'">{{item2.name}}</span>
						<span style="cursor: pointer;">{{twoGameOddList[item2.key]?twoGameOddList[item2.key]:'--'}}</span>
						<input :name="item1.title" min="1" type="text" maxlength="7" v-model="item2.amount" @focus="focus(index1,index2)" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')" @blur="checkNumber(index1,index2)">
					</li>
				</ul>
			</li>
		</ul>
		</div>
		<div>
			<div class="btn-bet">
				<Checkbox v-model="iSpreinstall">预设金额</Checkbox>
				<input min="1" type="text" maxlength="7" v-model="preinstallAmount"  onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'')" @blur="checkNumber2">
				<Button type="success" @click="addOrder" :disabled="twoGameOddList==''">确定</Button>
				<Button type="error" @click="clearStyle">重置</Button>
			</div>
		</div>
	</div>

</template>

<script>
	import { mapState, mapActions } from "vuex";
	export default {
		props: ["dataList","classId","showId","kindId"],
		created() {
			this.dataList.forEach((item1) => {
				item1.groups.forEach((item2) => {
					item2.amount = '';
					item2.title = item1.title
				})
			})
		},
		data() {
			return {
				show: false,
				loading:false,
				columns: [{
						title: '号码',
						key: 'number'
					},
					{
						title: '赔率',
						key: 'odd'
					},
					{
                        title: '金额',
						key: 'amount',
                        width: 150,
                        align: 'center',
                        
                        render: (h, params) => {
                            return h('div', [
                                h('InputNumber', {
                                	props:{
                                		value:this.orderList[params.index].amount*1,
                                		max:1000000,
                                		min:1
                                		
                                	},
                                    on: {
                                        'on-blur': () => {
                                        	this.orderList[params.index].amount = event.target.value*1;
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '操作',
						key: 'oper',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                        	this.orderList.splice(params.index,1)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
				],
				iSpreinstall:true,
				preinstallAmount: '',
				orderList:[]

			}
		},
		computed: {
			
			...mapState("bet", ["twoGameOddList"]),
			...mapState(["awarPeriod"]),
		},
		methods: {
			...mapActions("bet", [
				"lmpbet"
			]),
			...mapActions([
				"getUserDetail"
			]),
			clearStyle(){
				this.orderList = [];
				this.dataList.forEach((item1) => {
				item1.groups.forEach((item2) => {
					item2.amount = '';
					item2.title = item1.title
				})
			})
			},
			checkNumber2(){
				if(event.target.value==''){
					return false
				}else{
					if(event.target.value*1<=0){
						event.target.value = 1
					}
					event.target.value = event.target.value*1;
					this.preinstallAmount = event.target.value*1
				}
			},
			checkNumber(index1,index2){
				if(event.target.value==''){
					return false
				}else{
					if(event.target.value*1<=0){
						event.target.value = 1
					}
					this.dataList[index1].groups[index2].amount = event.target.value*1;
					event.target.value = event.target.value*1
				}
			},
			addOrder() {
				let newNumbers = [];
				this.orderList = [];
				this.dataList.forEach((item1) => {
					item1.groups.forEach((item2) => {
						if(item2.amount !== '') {
							newNumbers.push(item2)
						}
					})
				})
				if(newNumbers.length == 0) {
					this.$Notice.error({
						title: '全民代理通知',
						desc: '请至少选择一个号码！'
					});
					return false
				} else {
                 newNumbers.forEach((item)=>{
                 	let obj = {};
                 	if(item.title=='总和-龙虎和'){
                 		obj.number = item.name;
                 	}else{
                 		obj.number = item.title+' '+item.name;
                 	}
                 	obj.odd = this.twoGameOddList[item.key];
                 	obj.amount = item.amount;
                 	obj.key = item.key;
                 	this.orderList.push(obj)
                 })
				}
				this.show = true;
				this.dataList.forEach((item1) => {
					item1.groups.forEach((item2) => {
						item2.amount = ''
						item2.title = item1.title
					})
				})
			},
			focus(index1,index2) {
				if(this.iSpreinstall){
					if(this.dataList[index1].groups[index2].amount == '') {
					event.target.value = this.preinstallAmount;
					this.dataList[index1].groups[index2].amount = this.preinstallAmount;
				}
				}
				
			},
			ok(){
				if(this.orderList.length==0){
					this.$Notice.error({
						title: '全民代理通知',
						desc: '注单为空！',
					});
					this.show = false;
					return false;
				}
				let params = {};
				params.lotteryId = this.kindId;
				params.orderFrom = "1";
				params.periodNo = this.awarPeriod;
				params.bets = [];
				this.orderList.forEach((item)=>{
					let obj = {};
					obj.amount = item.amount*1;
					obj.content = item.key.split('_')[1];
					obj.gameId = item.key.split('_')[0]
					params.bets.push(obj)
				})
				this.lmpbet(params).then((res)=>{
					if(res.code==0){
						this.show = false;
						this.getUserDetail();
						this.$Message.success('下注成功');
					}else{
						this.show = false;
						this.$Message.error(res.msg);
					}
				})
			},
			cancel(){
			}
		},
		watch: {
			dataList() {
				this.dataList.forEach((item1) => {
					item1.groups.forEach((item2) => {
						item2.amount = ''
						item2.title = item1.title
					})
				})
			}
		}
	}
</script>

<style>
	.vertical-center-modal {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.vertical-center-modal .ivu-modal {
		top: 0;
	}
	
	.lmp_bet .game_title {
		border-top: none;
		background: #E4E4E4!important;
		padding: 5px 20px;
	}
	
	.lmp_bet .game_title h3 {
		position: relative;
		font-size: 14px;
	}
	.cloum{
		width: 20%;
		display: inline-block;
	}
	.cloum .groupList{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.cloum .groupList .clearfix{
		width: 100% !important;
	}
	.cloum .groupList .clearfix{
		display: flex;
		justify-content: space-around;
	}
	
	.lmp_bet .cloum .btn_num,.lmp_bet .cloum .btn_nan{
		border-radius: 50%;
		width: 24px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		margin-top: -2px;
		margin: 0 5% 0 0;
		color: #fff;
		background-color: #666666;
		float: left;
		font-size: 14px;
	}
	.lmp_bet .ivu-checkbox-input{
		width: 100% !important;
		height: 100% !important; 
	}
	.lmp_bet .cloum .btn_nan{
		border-radius: 3px;
	}
	.game_title h3 {
		color: #8C8C8C;
	}
	
	.lmp_bet .game_title h3:before {
		content: "";
		width: 0;
		height: 0;
		border-width: 10px 10px 0;
		border-style: solid;
		border-color: #eff6ff transparent transparent;
		position: absolute;
		bottom: -12px;
		left: 10px;
	}
	
	.lmp_bet .game_title h3:before {
		border-color: #E4E4E4 transparent transparent!important;
	}
	
	.game_info li span:nth-child(2) {
		color: #BD4700!important;
		font-size: 14px;
		width: 45px;
	}
   .p1 {
    background-color: #e6de00!important;
   }
   .p2 {
    background-color: #0092dd!important;
   }
   .p3 {
    background-color: #4b4b4b!important;
   }
   .p4 {
    background-color: #ff7600!important;
   }
   .p5 {
    background-color: #17e2e5!important;
   }
   .p6 {
    background-color: #5234ff!important;
   }
   .p7 {
    background-color: #bfbfbf!important;
   }
   .p8 {
    background-color: #ff2600!important;
   }
   .p9 {
    background-color: #780b00!important;
   }
   .p10 {
    background-color: #07bf00!important;
   }
	.lmp_bet .btn_num {
		border-radius: 50%;
		width: 24px;
		height: 24px;
		line-height: 24px;
		text-align: center;
		margin-top: -2px;
		margin: 0 5% 0 0;
		color: #fff;
		background-color: #666666;
		float: left;
		font-size: 14px;
	}
	
	.lmp_bet .btn_nan {
		width: 50px;
		border-radius: 5px;
		text-align: center;
		height: 20px;
		line-height: 20px;
		margin-top: 1px;
		margin: 0 5% 0 0;
		color: #fff;
		background-color: #666666;
		float: left;
		font-size: 14px;
	}
	
	.groupList {
		display: flex;
		flex-wrap: wrap;
	}
	
	.groupList .clearfix.lg25 {
		width: 25%;
	}
	
	.groupList .clearfix.lg20 {
		width: 20%;
	}
	
	.groupList .clearfix {
		margin-top: 10px;
		margin-bottom: 5px;
		display: flex;
		justify-content: center;
		width: 20%;
		float: left;
	}
	
	.groupList .clearfix input {
		border-radius: 3px;
		border: 1px solid #ddd;
		width: 50px;
	}
	
	.btn-bet {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 15px 130px;
		color: #666;
		border-top: 1px solid #ccc;
	}
	
	.btn-bet .ivu-btn {
		width: 100px;
	}
	
	.btn-bet input {
		border-radius: 3px;
		border: 1px solid #ddd;
		width: 120px;
		height: 30px;
	}
</style>