<template>
	<div class="unRound">
		<Layout>
			<Header style="height: 34px;padding:0 16px;">
				<div style="float: left;">
					<span class="highlight" style="margin-right: 12px;">{{gameConfig[kindId].gameName}}</span>
          <span style="margin-right: 12px;">第{{awarPeriod2}}期</span>
            <span class="highlight">
              <span v-if="!show&&awarPeriod2">开奖中<span class="dotting_2"></span>
            </span>
            <span v-if="show&&awarPeriod2">开奖结果</span>
					</span>
					<span style="margin-right: 12px;" v-if="!awarPeriod2">没有上一期</span>	
				</div>
				<div style="float: right;"><span class="highlight">今日输赢：</span><span>{{allRealAmount}}</span></div>
			</Header>
			<Content v-if="classId =='2'" class="hk6_">
				<div class="ant-row-flex ant-row-flex-middle clock-container-middle">
					<div class="ant-col-18 col-with-gutter-16 sum-detail" v-if="classId!='6'">
						<div class="ant-row title">开奖号码</div>
						<div class="ant-row-flex ant-row-flex-center row-with-gutter-16" style="padding-top: 8px; padding-bottom: 9px;">
							<div class="col-with-gutter-16" v-for="(item,index) in awardNum">
								<div :class="'sum-item1'" :style="{background:num_color[item]}">
									<div v-if="item!='?'">
									<p :style="{height: '30px',lineHeight: '30px',fontSize: '30px'}" >{{item}}</p>
									<p style="height: 20px;line-height: 18px;font-size: 18px;">{{num_type[item]}}</p>
								 </div>
								 <div v-if="item =='?'">
									<p style="height: 50px;line-height: 50px;font-size: 50px;background: linear-gradient(0, #710000 0, #540404 0, #b00e11 45%, red 100%);">{{item}}</p>
								 </div>
								</div>
							</div>
							<!--<div class="col-with-gutter-16">
								<div :class="'sum-item1'" :style="{background:num_color['30']}">
									<div>
									<p :style="{height: '30px',lineHeight: '30px',fontSize: '30px'}" >30</p>
									<p style="height: 20px;line-height: 18px;font-size: 18px;">羊</p>
								 </div>
								</div>
							</div>
							<div class="col-with-gutter-16">
								<div :class="'sum-item1'" :style="{background:num_color['30']}">
									<div>
									<p :style="{height: '30px',lineHeight: '30px',fontSize: '30px'}" >30</p>
									<p style="height: 20px;line-height: 18px;font-size: 18px;">羊</p>
								 </div>
								</div>
							</div>
							<div class="col-with-gutter-16">
								<div :class="'sum-item1'" :style="{background:num_color['30']}">
									<div>
									<p :style="{height: '30px',lineHeight: '30px',fontSize: '30px'}" >30</p>
									<p style="height: 20px;line-height: 18px;font-size: 18px;">羊</p>
								 </div>
								</div>
							</div>
							<div class="col-with-gutter-16">
								<div :class="'sum-item1'" :style="{background:num_color['30']}">
									<div>
									<p :style="{height: '30px',lineHeight: '30px',fontSize: '30px'}" >30</p>
									<p style="height: 20px;line-height: 18px;font-size: 18px;">羊</p>
								 </div>
								</div>
							</div>
							<div class="col-with-gutter-16">
								<div :class="'sum-item1'" :style="{background:num_color['30']}">
									<div>
									<p :style="{height: '30px',lineHeight: '30px',fontSize: '30px'}" >30</p>
									<p style="height: 20px;line-height: 18px;font-size: 18px;">羊</p>
								 </div>
								</div>
							</div>
							<div class="col-with-gutter-16">
								<div :class="'sum-item1'" :style="{background:num_color['49']}">
									<div>
									<p :style="{height: '30px',lineHeight: '30px',fontSize: '30px'}" >49</p>
									<p style="height: 20px;line-height: 18px;font-size: 18px;">{{num_type['49']}}</p>
								 </div>
								</div>
							</div>-->
						</div>
					</div>
					<div class="ant-col-7 " style="padding: 0px 16px 0px 8px;flex: 1;">
						<div class="ant-row title">
							当前期数：
							<span style="color: rgba(0, 0, 0, 0.65);">{{awarPeriod1}}</span></div>
						<div style="position: relative;padding:12px;">
							<p class="clock-count">{{timeTxts?timeTxts:'00:00'}}</p>
							<div style="position: absolute;bottom: 2px;right: 0;" @click="changeClass">
								<Icon :type="volumeIcon" style="font-size: 18px;"></Icon>
							</div>
						</div>

					</div>
				</div>
			</Content>
			<Content v-else-if="classId =='6'" class="pk10_">
				<div class="ant-row-flex ant-row-flex-middle clock-container-middle">
					<div>
					<div  class="pk10-num" >
						<div v-for="(item,index) in gameConfig[kindId]['labels']" :key="index" class="list-complete-item">
							<p style="text-align: center; margin-bottom: 10px;margin-right: 7px;">{{item}}</p>
							<span :class="'n'+awardNum[index]*1" data-num="2">{{awardNum[index]*1}}</span>
						</div>
					 </div>
					<div style="padding: 0 10px;display: flex;justify-content: space-around;">
						<span style="width: 50px;height: 26px;text-align: center;line-height: 26px;" v-for="item in showPk10">{{item}}</span>
					</div>
					</div>
					<div class="ant-col-7 " style="padding: 0px 16px 0px 8px;flex: 1;border-left: 2px solid #FFFFFF">
						<div class="ant-row title">
							当前期数：
							<span style="color: rgba(0, 0, 0, 0.65);">{{awarPeriod1}}</span></div>
						<div style="position: relative;padding:12px;">
							<p class="clock-count">{{timeTxts?timeTxts:'00:00'}}</p>
							<div style="position: absolute;bottom: 2px;right: 0;" @click="changeClass">
								<Icon :type="volumeIcon" style="font-size: 18px;"></Icon>
							</div>
						</div>
					</div>
				</div>
			</Content>
			<Content v-else>
				<div class="ant-row-flex ant-row-flex-middle clock-container-middle">
					<div class="ant-col-10 col-with-gutter-16" :style="classId == '6'?{width:'71%'}:{width:'42%'}">
						<div class="ant-row-flex ant-row-flex-space-around">
							<div v-for="(item,index) in gameConfig[kindId]['labels']">
								<div>
									<p style="text-align: center; margin-bottom: 10px;">{{item}}</p>
									<div class="result-number-item">
										<ul v-if="['1','3','4'].indexOf(classId)!=-1" :class="activeClass" :style="activeClass=='result-number-list active'&&actived?{'transform':'translateY('+((-awardNum[index]*40)-40)+'px)'}:''">
											<li>?</li>
											<li>0</li>
											<li>1</li>
											<li>2</li>
											<li>3</li>
											<li>4</li>
											<li>5</li>
											<li>6</li>
											<li>7</li>
											<li>8</li>
											<li>9</li>
											<li>?</li>
										</ul>
										<ul v-if="['5','6'].indexOf(classId)!=-1" :class="activeClass" :style="activeClass=='result-number-list active'&&actived?{'transform':'translateY('+(-awardNum[index]*40)+'px)'}:''">
											<li>?</li>
											<li>01</li>
											<li>02</li>
											<li>03</li>
											<li>04</li>
											<li>05</li>
											<li>06</li>
											<li>07</li>
											<li>08</li>
											<li>09</li>
											<li>10</li>
											<li>11</li>
											<li>?</li>
										</ul>
									</div>
									<div class="result-number-shadow"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="ant-col-7 col-with-gutter-16 sum-detail" v-if="classId!='6'">
						<div class="ant-row title">{{this.ballNum == 3?'三球总和':'五球总和'}}</div>
						<div class="ant-row-flex ant-row-flex-center row-with-gutter-16" style="padding-top: 8px; padding-bottom: 9px;">
							<div class="col-with-gutter-16">
								<div :class="'sum-item lg '+bsClass ">{{this.ballSumText}}</div>
							</div>
							<div class="col-with-gutter-16">
								<div :class="'sum-item '+bsClass">{{this.ballBS}}</div>
							</div>
							<div class="col-with-gutter-16">
								<div :class="'sum-item '+oeClass">{{this.ballOE}}</div>
							</div>
							<div class="col-with-gutter-16">
								<div :class="'sum-item '+tdClass">{{this.ballTD}}</div>
							</div>
						</div>
					</div>
					<div class="ant-col-7 " style="padding: 0px 16px 0px 8px;flex: 1;">
						<div class="ant-row title">
							当前期数：
							<span style="color: rgba(0, 0, 0, 0.65);">{{awarPeriod1}}</span></div>
						<div style="position: relative;">
							<p class="clock-count">{{timeTxts?timeTxts:'00:00'}}</p>
							<div style="position: absolute;bottom: 2px;right: 0;" @click="changeClass">
								<Icon :type="volumeIcon" style="font-size: 18px;"></Icon>
							</div>
						</div>
					</div>
				</div>
			</Content>
			<Footer style="height: 38px;padding: 0 16px;">
				<div class="selectMode">
					<span>选号玩法</span>
					<a :class="selectMode=='0'?'routine active':'routine'" @click="onSelectMode(0)">常规</a>
					<a :class="selectMode=='1'?'optional active':'optional'" @click="onSelectMode(1)" v-if="classId == '3'">任选</a>
					<a :class="selectMode=='2'?'optional active':'lmp_span'" @click="onSelectMode(2)"  v-if="classId == '3'||classId == '6'">两面盘</a>
				</div>
				<div style="float: right;">
					<span>今日已开</span>
					<span style="color:#ffdb4a;">{{alreadyOther}}</span>
					<span>期，</span>
					<span>剩余</span>
					<span style="color:#e47169;">{{unopened}}</span>
					<span>期</span>
				</div>
			</Footer>
		</Layout>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import gameConfig from "../../../static/js/gameConfig.js";
const AudioContext = new (window.AudioContext || window.webkitAudioContext)();
var oscillator = AudioContext.createOscillator();
var gainNode = AudioContext.createGain();
oscillator.connect(gainNode);
gainNode.connect(AudioContext.destination);
oscillator.type = "triangle";
oscillator.frequency.value = 796.0;
gainNode.gain.setValueAtTime(0, AudioContext.currentTime);
oscillator.start(AudioContext.currentTime);
export default {
  created() {
    this.obtainWinsDragon();
    this.judgeAnimal();
    if (this.userDetail.account) {
      this.getTodayAndWin();
    }

    //			setTimeout(()=>{
    //				this.awardNum = ["40", "33", "04", "43", "25","07","29"]
    //			},3000)
  },
  activated() {
    this.active();
    if (this.userDetail.account) {
      this.getTodayAndWin();
    }
    this.obtainWinsDragon();
  },
  data() {
    return {
      num_color: num_color,
      volumeIcon: "android-volume-up",
      activeClass: "result-number-list",
      awardNum: [],
      actived: false,
      periodNoAll: 1200,
      awarPeriod1: "",
      awarPeriod2: "",
      gameConfig: gameConfig,
      ballNum: 3,
      ballSum: 0,
      ballSumText: "?",
      ballBS: "?",
      ballOE: "?",
      ballTD: "?",
      tdClass: "alpha",
      bsClass: "alpha",
      oeClass: "alpha",
      show: false,
      unopened: null,
      alreadyOther: null,
      allRealAmount: 0,
      num_type: {},
      timer: null,
      showPk10: ["-", "-", "-", "-", "-", "-", "-", "-"]
    };
  },
  methods: {
    ...mapActions([
      "getWinsDragon",
      "setSelectMode",
      "updateAwarPeriod",
      "queryMemberReport"
    ]),
    ...mapActions("bet", ["setShowCheckBox"]),
    changeClass() {
      this.volumeIcon == "android-volume-up"
        ? (this.volumeIcon = "android-volume-off")
        : (this.volumeIcon = "android-volume-up");
    },
    onSelectMode(val) {
      this.setShowCheckBox(false);
      this.setSelectMode(val);
    },
    Time(now) {
      let self = this;
      let year = new Date(now).getFullYear();
      let month = new Date(now).getMonth() + 1;
      let date = new Date(now).getDate();
      let hours = new Date(now).getHours();
      let minutes = new Date(now).getMinutes();
      let seconds = new Date(now).getSeconds();
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      self.nowTime = hours + ":" + minutes + ":" + seconds;
      return year + "-" + month + "-" + date;
    },
    obtainWinsDragon() {
      this.getWinsDragon("/" + this.kindId).then(res => {
        if (res.data.winList.length < 2) {
          this.awarPeriod1 = res.data.winList[0].awarPeriod;
          this.awarPeriod2 = null;
          this.awardNum = ["?", "?", "?", "?", "?", "?", "?"];
          return false;
        } else {
          this.awarPeriod2 = res.data.winList[1].awarPeriod;
          this.awarPeriod1 = res.data.winList[0].awarPeriod;
        }
        this.updateAwardPeriod();
        if (this.winList[1].awardNum != null) {
          if (this.classId == "6") {
            clearInterval(this.timer);
            this.awardNum = this.winList[1].awardNum.split(",");
            this.getPk10Show();
          } else {
            this.show = true;
            this.awardNum = this.winList[1].awardNum.split(",");
          }
          this.sumOfballs();
          this.activeClass = "result-number-list active";
          setTimeout(() => {
            this.actived = true;
          }, 100);
        } else {
          this.show = false;
          if (this.classId == "1") {
            this.awardNum = ["?", "?", "?"];
          } else if (this.classId == "2") {
            this.awardNum = ["?", "?", "?", "?", "?", "?", "?"];
          } else if (this.classId == "3") {
            this.awardNum = ["?", "?", "?", "?", "?"];
          } else if (this.classId == "4") {
            this.awardNum = ["?", "?", "?"];
          } else if (this.classId == "5") {
            this.awardNum = ["?", "?", "?", "?", "?"];
          }
          if (this.classId == "6") {
            this.awardNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
            this.showPk10 = ["-", "-", "-", "-", "-", "-", "-", "-"];
            this.shuffle();
          }

          this.ballSum = 0;
          this.ballSumText = "?";
          this.ballBS = "?";
          this.ballOE = "?";
          this.ballTD = "?";
          this.tdClass = "alpha";
          this.bsClass = "alpha";
          this.oeClass = "alpha";
        }
      });
    },
    getPk10Show() {
      this.showPk10[0] = this.awardNum[0] * 1 + this.awardNum[1] * 1;
      if (this.showPk10[0] < 12) {
        this.showPk10[1] = "小";
      } else {
        this.showPk10[1] = "大";
      }
      if (this.showPk10[0] % 2 == 0) {
        this.showPk10[2] = "双";
      } else {
        this.showPk10[2] = "单";
      }
      this.awardNum[0] * 1 > this.awardNum[9] * 1
        ? (this.showPk10[3] = "龙")
        : (this.showPk10[3] = "虎");
      this.awardNum[1] * 1 > this.awardNum[8] * 1
        ? (this.showPk10[4] = "龙")
        : (this.showPk10[4] = "虎");
      this.awardNum[2] * 1 > this.awardNum[7] * 1
        ? (this.showPk10[5] = "龙")
        : (this.showPk10[5] = "虎");
      this.awardNum[3] * 1 > this.awardNum[6] * 1
        ? (this.showPk10[6] = "龙")
        : (this.showPk10[6] = "虎");
      this.awardNum[4] * 1 > this.awardNum[5] * 1
        ? (this.showPk10[7] = "龙")
        : (this.showPk10[7] = "虎");
    },
    updateAwardPeriod() {
      let periodNoAll = this.gameConfig[this.kindId].periodNoAll + "";
      let start = periodNoAll.length;
      let end = this.winList[0].awarPeriod.length;
      let num;
     
      let count = 0
      if (this.winList[1].awardNum == null) {
        count = 1
      }

        if (
          this.kindId == "fc3d" ||
          this.kindId == "pl3" ||
          this.kindId == "hk6"
        ) {
          this.alreadyOther = 0;
          this.unopened = 1;
          return false;
        }
      // console.log(moment("2019-02-12 09:30:00")- moment("2019-02-11 23:50:00")) 
          if (this.kindId == "bjpk10") {
            let nextTime = moment(this.winsDragonData.data.nextTime);
            let nowPeriod =
              (nextTime.hour() * 60 + nextTime.minute() - 580-10) / 20 - count;
            let restPeriod = periodNoAll - nowPeriod;
            this.alreadyOther = nowPeriod;
            this.unopened = restPeriod;
            return false;
          } else if (this.kindId == "azpk10") {
            let nextTime = moment(this.winsDragonData.data.nextTime);
            let nowPeriod =
              (nextTime.hour() * 60 * 60 +
                nextTime.minute() * 60 +
                nextTime.second()
                ) /
              90-count;
            let restPeriod = periodNoAll - nowPeriod;
            this.alreadyOther = nowPeriod;
            this.unopened = restPeriod;
            return false;
          } else if (this.kindId == "speed") {
            let nextTime = moment(this.winsDragonData.data.nextTime);
            let nowPeriod =
              (nextTime.hour() * 60 * 60 +
                nextTime.minute() * 60 +
                nextTime.second() -
                12600) /
              180-count;
            let restPeriod = periodNoAll - nowPeriod;
            this.alreadyOther = nowPeriod;
            this.unopened = restPeriod;
            return false;
          } else if (this.kindId == "klft") {
            let nextTime = moment(this.winsDragonData.data.nextTime);
            let nowPeriod =
              (nextTime.hour() * 60 * 60 +
                nextTime.minute() * 60 +
                nextTime.second() - 10800 
                ) /
              60-count;
            let restPeriod = periodNoAll - nowPeriod;
            this.alreadyOther = nowPeriod;
            this.unopened = restPeriod;
            return false;
          } else if (this.kindId == "azssc") {
            let nextTime = moment(this.winsDragonData.data.nextTime);
            let nowPeriod = (nextTime.hour() * 60 + nextTime.minute() - 240)-count;
            let restPeriod = periodNoAll - nowPeriod;
            this.alreadyOther = nowPeriod;
            this.unopened = restPeriod;
            return false;
          } else if (this.kindId == "xylhc") {
            let nextTime = moment(this.winsDragonData.data.nextTime);
            let nowPeriod = (nextTime.hour() * 60 + nextTime.minute()) / 5-count;
            let restPeriod = periodNoAll - nowPeriod;
            this.alreadyOther = nowPeriod;
            this.unopened = restPeriod;
            return false;
          }else if (this.kindId == "m55pk10 ") {
            let nextTime = moment(this.winsDragonData.data.nextTime);
            let nowPeriod = (nextTime.hour() * 60 + nextTime.minute() -240) / 5-count;
            let restPeriod = periodNoAll - nowPeriod;
            this.alreadyOther = nowPeriod;
            this.unopened = restPeriod;
            return false;
        }
        num = this.winList[0].awarPeriod.slice(end - start, end);
        this.alreadyOther = num - 1;
        this.unopened = periodNoAll - this.alreadyOther;
      
      
    },
    active() {
      if (this.classId == "1") {
        this.awardNum = ["?", "?", "?"];
      } else if (this.classId == "2") {
        this.awardNum = ["?", "?", "?", "?", "?", "?", "?"];
      } else if (this.classId == "3") {
        this.awardNum = ["?", "?", "?", "?", "?"];
      } else if (this.classId == "4") {
        this.awardNum = ["?", "?", "?"];
      } else if (this.classId == "5") {
        this.awardNum = ["?", "?", "?", "?", "?"];
      } else if (this.classId == "6") {
        this.awardNum = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        this.showPk10 = ["-", "-", "-", "-", "-", "-", "-", "-"];
        this.shuffle();
      }

      this.actived = false;
      this.activeClass = "result-number-list";
    },
    timeFormat(time) {
      let hours = moment.duration(time).hours(),
        minutes = moment.duration(time).minutes(),
        seconds = moment.duration(time).seconds();
      hours.toString().length < 2 ? (hours = 0 + "" + hours) : (hours = hours);
      minutes.toString().length < 2
        ? (minutes = 0 + "" + minutes)
        : (minutes = minutes);
      seconds.toString().length < 2
        ? (seconds = 0 + "" + seconds)
        : (seconds = seconds);
      return minutes + ":" + seconds;
    },
    createChasePeriod(period, offset, periodNoAll, kindId) {
      let kindIdAry = ["bjpk10", "azssc", "xylhc", "speed", "azpk10", "klft"];
      if (kindIdAry.indexOf(this.kindId) != -1) {
        return parseInt(period) + offset + "";
      } else {
        if (kindId == "fc3d" || kindId == "pl3" || kindId == "hk6") {
          var digit = period.length - 4;
          // 当前期号的日期
          var periodTime = period.substr(0, 4);
          // 转化为moment型，方便后面计算
          var momentTime = moment(periodTime, "YYYY");
          var nowPeriodString = period.substr(4, digit);
          // 当前期号
          var nowPeriod = parseInt(period.substr(4, digit));
          // 目标期号
          var targetPeriod = nowPeriod + offset;
          var targetTime = void 0;
          if (targetPeriod > periodNoAll) {
            targetPeriod -= periodNoAll;
            targetTime = momentTime.add(1, "y").format("YYYY");
          } else {
            targetTime = periodTime;
          }
          var targetPeriodString = targetPeriod + "";
          return targetTime + targetPeriodString.padStart(digit, "0");
        } else {
          var digit = period.length - 8;
          // 当前期号的日期
          var periodTime = period.substr(0, 8);
          // 转化为moment型，方便后面计算
          var momentTime = moment(periodTime, "YYYYMMDD");
          var nowPeriodString = period.substr(8, digit);
          // 当前期号
          var nowPeriod = parseInt(period.substr(8, digit));
          // 目标期号
          var targetPeriod = nowPeriod + offset;
          var targetTime = void 0;
          if (targetPeriod > periodNoAll) {
            targetPeriod -= periodNoAll;
            targetTime = momentTime.add(1, "d").format("YYYYMMDD");
          } else {
            targetTime = periodTime;
          }
          var targetPeriodString = targetPeriod + "";
          return targetTime + targetPeriodString.padStart(digit, "0");
        }
      }
    },
    autoPlay() {
      gainNode.gain.setValueAtTime(0, AudioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, AudioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        AudioContext.currentTime + 1
      );
    },
    judgeAnimal() {
      let names = [
        "鼠",
        "牛",
        "虎",
        "兔",
        "龙",
        "蛇",
        "马",
        "羊",
        "猴",
        "鸡",
        "狗",
        "猪"
      ];
      let obj = {};
      let labels = Array(12);
      let year = new Date().getFullYear();
      let animal = (year % 12) + 8;
      let number_arr = new Array(12);
      for (var i = 0; i < 12; i++) {
        if (i == animal) {
          let first_number = 1;
          let item = [
            String(first_number),
            String(first_number + 12),
            String(first_number + 24),
            String(first_number + 36),
            String(first_number + 48)
					];
          labels.fill(item, i, i + 1);
        } else {
          let first_number = i < animal ? animal - i + 1 : 13 - (i - animal);

          let item = [
            String(first_number),
            String(first_number + 12),
            String(first_number + 24),
            String(first_number + 36)
          ];
          labels.fill(item, i, i + 1);
        }
      }
      labels.forEach((item1, index1) => {
        item1.forEach(item2 => {
          obj[item2] = names[index1];
        });
      });
      for (var key in obj) {
        if (key * 1 < 10) {
          obj["0" + key] = obj[key];
        }
      }
			this.num_type = obj;
    },
    getTodayAndWin() {
      let data = {
        account: this.userDetail.account,
        baseLotteryId: this.kindId,
        endTime: this.Time(new Date()),
        startTime: this.Time(new Date())
      };
      this.queryMemberReport(data).then(res => {
        if (res.data.length != 0) {
          this.allRealAmount = res.data[0].allRealAmount;
        } else {
          this.allRealAmount = 0;
        }
      });
    },
    shuffle() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.awardNum = _.shuffle(this.awardNum);
      }, 100);
    },
    sumOfballs() {
      const {
        numbers,
        max,
        min,
        labels,
        needLeftPad,
        periodDigit
      } = this.gameConfig[this.kindId];
      this.ballNum = numbers;
      let resultArray = [],
        showNumbers = [],
        animationList = [];
      if (this.awardNum) {
        resultArray = this.awardNum;
        this.ballSum = resultArray.reduce(
          (prev, item) => (prev += parseInt(item)),
          0
        );
        this.ballSumText = this.ballSum + "";
        const firstNumber = parseInt(resultArray[0]);
        const lastNumber = parseInt(resultArray[resultArray.length - 1]);
        const sumMax = numbers * max,
          sumMin = numbers * min;
        const sumMiddle = Math.ceil((sumMax - sumMin) / 2 + sumMin);
        if (firstNumber > lastNumber) {
          this.ballTD = "龙";
        } else if (firstNumber < lastNumber) {
          this.ballTD = "虎";
          this.tdClass = "beta";
        } else {
          this.ballTD = "和";
          this.tdClass = "gama";
        }

        if (this.ballSum % 2 === 0) {
          this.ballOE = "双";
          this.oeClass = "beta";
        } else {
          this.ballOE = "单";
        }

        if (this.ballSum >= sumMiddle) {
          this.ballBS = "大";
          this.bsClass = "beta";
        } else {
          this.ballBS = "小";
        }
      }
    }
  },
  computed: {
    ...mapState([
      "awarPeriod",
      "prevAwarPeriod",
      "classId",
      "kindId",
      "winList",
      "kindList",
      "gamePlayList",
      "subGameId",
      "message",
      "timeTxts",
      "seconds",
      "userDetail",
      "selectMode",
      "betDataList",
      "winsDragonData"
    ]),
    ...mapState("bet", ["gamePlayList"])
  },
  watch: {
    timeTxts(newtimes) {
      if (this.seconds == 0) {
        this.show = false;
        this.ballSum = 0;
        this.ballSumText = "?";
        this.ballBS = "?";
        this.ballOE = "?";
        this.ballTD = "?";
        this.tdClass = "alpha";
        this.bsClass = "alpha";
        this.oeClass = "alpha";
        this.awarPeriod2 = this.awarPeriod1;
        this.awarPeriod1 = this.createChasePeriod(
          this.awarPeriod1,
          1,
          1200,
          this.kindId
        );
        this.updateAwarPeriod(this.awarPeriod1);
        this.active();
        if (this.$router.history.current.path == "/bet") {
          this.$Notice.info({
            title: "全民代理通知",
            desc:
              gameConfig[this.kindId].gameName +
              " 期号已更新,投注时请确认您的期号。"
          });
        }
      }
      if (
        this.seconds < 6000 &&
        this.seconds > 0 &&
        this.volumeIcon == "android-volume-up" &&
        this.$router.history.current.path == "/bet"
      ) {
        this.autoPlay();
      } else {
        gainNode.gain.setValueAtTime(0, AudioContext.currentTime);
      }
    },
    kindId() {
      clearInterval(this.timer);
      this.active();
      this.obtainWinsDragon();
      this.ballNum = this.gameConfig[this.kindId].numbers;
      if (this.kindList.length != 0) {
        this.kindList.forEach(item1 => {
          if (item1.classId == this.classId) {
            item1.kindList.forEach(item2 => {
              if (item2.kindId == this.kindId) {
                this.periodNoAll = item2.periodNoAll;
                return false;
              }
            });
          }
        });
      }
      this.getTodayAndWin();
    },
    message(message) {
      let awardNews = JSON.parse(message.data);
      if (awardNews.messageType == "3") {
        if (awardNews.lotteryId == this.kindId) {
          this.obtainWinsDragon();
          setTimeout(() => {
            this.getTodayAndWin();
          }, 500);
        }
      }
    },
    betDataList() {
      // console.log(this.betDataList)
    }
  }
};
</script>

<style>
@keyframes numberListActivessc {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-440px);
  }
}

@keyframes numberListActive11x5 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-480px);
  }
}

@keyframes numberListActivek3 {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-280px);
  }
}

@keyframes dot2 {
  25% {
    border-color: transparent;
    background-color: transparent;
  }
  50% {
    border-right-color: transparent;
    background-color: transparent;
  }
  75% {
    border-right-color: transparent;
  }
}
.unRound .highlight {
  color: #ffdb4a;
}
.unRound .pk10-num {
  padding: 0 10px;
  display: flex;
}
.unRound .pk10-num span {
  width: 38px;
  height: 38px;
  float: left;
  margin-right: 7px;
  text-align: center;
  border-radius: 3px;
  font-size: 28px;
  font-style: italic;
  color: #fff;
  font-weight: bold;
  line-height: 38px;
  overflow: hidden;
}
.unRound .pk10-num .n1 {
  background: #e6de00;
}
.unRound .pk10-num .n2 {
  background: #0092dd;
}
.unRound .pk10-num .n3 {
  background: #4b4b4b;
}
.unRound .pk10-num .n4 {
  background: #ff7600;
}
.unRound .pk10-num .n5 {
  background: #17e2e5;
}
.unRound .pk10-num .n6 {
  background: #5234ff;
}
.unRound .pk10-num .n7 {
  background: #bfbfbf;
}
.unRound .pk10-num .n8 {
  background: #ff2600;
}
.unRound .pk10-num .n9 {
  background: #780b00;
}
.unRound .pk10-num .n10 {
  background: #07bf00;
}
.unRound .clock-count {
  white-space: nowrap;
  font-size: 50px;
  line-height: 35px;
  padding: 5px 0;
  border-radius: 4px;
  text-align: center;
  font-family: clock-number, "Helvetica Neue For Number", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #d80c09;
}

.unRound .dotting_2 {
  margin-left: 2px;
  padding-left: 2px;
}

.unRound .dotting_2 {
  display: inline-block;
  width: 10px;
  min-height: 2px;
  padding-right: 2px;
  border-left: 2px solid currentColor;
  border-right: 2px solid currentColor;
  background-color: currentColor;
  background-clip: content-box;
  box-sizing: border-box;
  animation: dot2 4s infinite step-start both;
}

.unRound .ivu-layout-header,
.unRound .ivu-layout-footer {
  background: linear-gradient(0, #363a44 0, #717784 100%) !important;
  line-height: 38px;
  font-size: 12px;
  color: #fff;
}

.unRound .ivu-layout-footer div {
  float: left;
}

.ant-row-flex-middle {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.ant-row-flex,
.ant-row-flex:after,
.ant-row-flex:before {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.ant-row-flex {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
}

.clock-container-middle {
  background: linear-gradient(180deg, #fff 0, #d0d0d1 100%);
}

.ant-col-10.col-with-gutter-16 {
  padding-left: 8px;
  padding-right: 8px;
}

.ant-col-10 {
  display: block;
  width: 42%;
  float: left;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}

.ant-row-flex-space-around {
  -ms-flex-pack: distribute;
  justify-content: space-around;
}

.ant-row-flex,
.ant-row-flex:after,
.ant-row-flex:before {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.ant-row-flex {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
}

.unRound .result-number-item {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  overflow: hidden;
  background: linear-gradient(0, #710000 0, #540404 0, #b00e11 45%, red 100%);
}

.unRound .result-number-list > li {
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  color: #fff;
}

.unRound .result-number-shadow {
  width: 30px;
  height: 2px;
  margin: 0 auto;
  box-shadow: 0 0 4px 1px #686868;
  background: #686868;
  border-radius: 50%;
}

.clock-container-middle .sum-detail {
  border-left: 2px solid #fff;
  border-right: 2px solid #fff;
}

.ant-col-7.col-with-gutter-16 {
  padding-left: 8px;
  padding-right: 8px;
}

.ant-col-7 {
  display: block;
  width: 29%;
  box-sizing: border-box;
  float: left;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
}

.clock-container-middle .title {
  border-radius: 50px;
  background: linear-gradient(0, #fff 0, #d0d0d1 100%);
  padding: 4px 0;
  font-size: 14px;
  text-align: center;
  margin-top: 4px;
}

.ant-row {
  position: relative;
  margin-left: 0;
  margin-right: 0;
  height: auto;
  zoom: 1;
  display: block;
}

.ant-row:after,
.ant-row:before {
  content: " ";
  display: table;
}

:before {
  box-sizing: border-box;
}

.ant-row-flex-center {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.ant-row-flex,
.ant-row-flex:after,
.ant-row-flex:before {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.ant-row-flex {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
}

.row-with-gutter-16 {
  margin-left: -8px;
  margin-right: -8px;
}

.col-with-gutter-16 {
  padding-left: 8px;
  padding-right: 8px;
}

.clock-container-middle .sum-detail .sum-item.lg {
  width: 50px;
}

.clock-container-middle .sum-detail .sum-item.beta {
  background: linear-gradient(0, #cf2820 0, #e54817 47%, #ea4b16 100%);
}

.clock-container-middle .sum-detail .sum-item.gama {
  background: linear-gradient(180deg, #83ad39 0, #6d9f44 47%, #4a8848 100%);
}

.clock-container-middle .sum-detail .sum-item.alpha {
  background: linear-gradient(0, #315b9f 0, #4d79b1 47%, #6190bf 100%);
}

.clock-container-middle .sum-detail .sum-item {
  border-radius: 4px;
  border: 1px solid #fff;
  box-shadow: 0 0 1px 1px #000;
  color: #fff;
  height: 30px;
  line-height: 30px;
  text-align: center;
  width: 30px;
}
.clock-container-middle .sum-detail .sum-item1 {
  border-radius: 4px;
  border: 1px solid #fff;
  box-shadow: 0 0 1px 1px #000;
  /*background: linear-gradient(0, #710000 0, #540404 0, #b00e11 45%, red 100%);*/
  color: #fff;
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 40px;
  font-size: 25px;
  font-weight: 700;
}

.ant-col-7 {
  display: block;
  width: 29.16666667%;
}
.ant-col-18 {
  display: block;
  width: 60.16666667%;
}

.clock-container-middle .clock-count {
  white-space: nowrap;
  font-size: 50px;
  line-height: 35px;
  padding: 5px 0;
  border-radius: 4px;
  text-align: center;
  font-family: clock-number, "Helvetica Neue For Number", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #d80c09;
}

.ant-col-2 {
  display: block;
  width: 8.33333333%;
}
/*.ant-col-1, .ant-col-2, .ant-col-3, .ant-col-4, .ant-col-5, .ant-col-6, .ant-col-7, .ant-col-8, .ant-col-9, .ant-col-10, .ant-col-11, .ant-col-12, .ant-col-13, .ant-col-14, .ant-col-15, .ant-col-16, .ant-col-17, .ant-col-18, .ant-col-19, .ant-col-20, .ant-col-21, .ant-col-22, .ant-col-23, .ant-col-24 {
    float: left;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
}
.ant-col-1, .ant-col-2, .ant-col-3, .ant-col-4, .ant-col-5, .ant-col-6, .ant-col-7, .ant-col-8, .ant-col-9, .ant-col-10, .ant-col-11, .ant-col-12, .ant-col-13, .ant-col-14, .ant-col-15, .ant-col-16, .ant-col-17, .ant-col-18, .ant-col-19, .ant-col-20, .ant-col-21, .ant-col-22, .ant-col-23, .ant-col-24, .ant-col-lg-1, .ant-col-lg-2, .ant-col-lg-3, .ant-col-lg-4, .ant-col-lg-5, .ant-col-lg-6, .ant-col-lg-7, .ant-col-lg-8, .ant-col-lg-9, .ant-col-lg-10, .ant-col-lg-11, .ant-col-lg-12, .ant-col-lg-13, .ant-col-lg-14, .ant-col-lg-15, .ant-col-lg-16, .ant-col-lg-17, .ant-col-lg-18, .ant-col-lg-19, .ant-col-lg-20, .ant-col-lg-21, .ant-col-lg-22, .ant-col-lg-23, .ant-col-lg-24, .ant-col-md-1, .ant-col-md-2, .ant-col-md-3, .ant-col-md-4, .ant-col-md-5, .ant-col-md-6, .ant-col-md-7, .ant-col-md-8, .ant-col-md-9, .ant-col-md-10, .ant-col-md-11, .ant-col-md-12, .ant-col-md-13, .ant-col-md-14, .ant-col-md-15, .ant-col-md-16, .ant-col-md-17, .ant-col-md-18, .ant-col-md-19, .ant-col-md-20, .ant-col-md-21, .ant-col-md-22, .ant-col-md-23, .ant-col-md-24, .ant-col-sm-1, .ant-col-sm-2, .ant-col-sm-3, .ant-col-sm-4, .ant-col-sm-5, .ant-col-sm-6, .ant-col-sm-7, .ant-col-sm-8, .ant-col-sm-9, .ant-col-sm-10, .ant-col-sm-11, .ant-col-sm-12, .ant-col-sm-13, .ant-col-sm-14, .ant-col-sm-15, .ant-col-sm-16, .ant-col-sm-17, .ant-col-sm-18, .ant-col-sm-19, .ant-col-sm-20, .ant-col-sm-21, .ant-col-sm-22, .ant-col-sm-23, .ant-col-sm-24, .ant-col-xs-1, .ant-col-xs-2, .ant-col-xs-3, .ant-col-xs-4, .ant-col-xs-5, .ant-col-xs-6, .ant-col-xs-7, .ant-col-xs-8, .ant-col-xs-9, .ant-col-xs-10, .ant-col-xs-11, .ant-col-xs-12, .ant-col-xs-13, .ant-col-xs-14, .ant-col-xs-15, .ant-col-xs-16, .ant-col-xs-17, .ant-col-xs-18, .ant-col-xs-19, .ant-col-xs-20, .ant-col-xs-21, .ant-col-xs-22, .ant-col-xs-23, .ant-col-xs-24 {
    position: relative;
    min-height: 1px;
    padding-left: 0;
    padding-right: 0;
}*/

.unRound .ant-col-20 {
  display: block;
  width: 83.33333333%;
}

.unRound .result-number-list {
  animation: numberListActivessc 1.2s infinite linear;
}

.unRound .result-number-list {
  transform: translateY(0);
  transition: transform 2s;
}

.unRound .result-number-list.active {
  animation: none;
  filter: none;
}
.unRound .selectMode .lmp_span {
  -webkit-animation: myfirst 1s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation: myfirst 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  display: inline-block;
  padding: 1px 7px;
  color: #ffffff;
  padding: 0 7px;
  font-size: 12px;
  border-radius: 4px;
  height: 22px;
  /*border: 1px solid #FFFFFF;*/
  line-height: 22px;
  text-align: center;
  margin-left: 8px;
}
.unRound .selectMode .routine,
.unRound .selectMode .optional {
  /*color: #ffdb4a;
    border-color: #ffdb4a;*/
  display: inline-block;
  padding: 1px 7px;
  color: #ffffff;
  padding: 0 7px;
  font-size: 12px;
  border-radius: 4px;
  height: 22px;
  border: 1px solid #ffffff;
  line-height: 22px;
  text-align: center;
  margin-left: 8px;
}

.unRound .selectMode .routine.active,
.unRound .selectMode .optional.active,
.unRound .selectMode .lmp_span.active {
  color: #ffdb4a;
  border-color: #ffdb4a;
}

.unRound .selectMode .routine:hover,
.unRound .selectMode .optional:hover,
.unRound .selectMode .lmp_span:hover {
  color: #ffdb4a;
  border-color: #ffdb4a;
}

.unRound .selectMode .routine.selected,
.unRound .selectMode .optional.selected,
.unRound .selectMode .lmp_span.selected {
  color: #ffdb4a;
  border-color: #ffdb4a;
}
@-webkit-keyframes myfirst {
  0% {
    border-color: rgba(255, 147, 159, 0.5);
  }
  50% {
    border-color: rgba(255, 147, 159, 0.5);
  }
  to {
    border-color: rgba(255, 255, 255, 0.5);
  }
}

@keyframes myfirst {
  0% {
    background-color: rgba(255, 147, 159, 0.5);
  }
  50% {
    background-color: rgba(255, 147, 159, 0.5);
  }
  to {
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
