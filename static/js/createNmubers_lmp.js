import { ssc_btnLabels, pk10_btnLabels } from './btn_lables.js';
var ball_num = {
	"b1": "第一球",
	"b2": "第二球",
	"b3": "第三球",
	"b4": "第四球",
	"b5": "第五球"
}
export function createNmubers_lmp(classId, showId) {
	if(classId == 3) {
		return ssc_groupList(showId)
	} else if(classId == 6) {
		return pk10_groupList(showId)
	}
}

function pk10_groupList(showId) {
	var numbers = [];
	var names, ids;
	switch(showId) {
		case 'lmp':
			names = ["冠、亚军和", "冠军", "亚军", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", "第九名", "第十名"];
			ids = ["gyds", "p1_dxds", "p2_dxds", "p3_dxds", "p4_dxds", "p5_dxds", "p6_dxds", "p7_dxds", "p8_dxds", "p9_dxds", "p10_dxds"];
			ids.forEach((item1, index1) => {
				if(item1 == "gyds") {
					numbers[index1] = pk10_btnLabels[item1]
				} else {
					let keyNames = item1.split("_");
					let newsItems = []
					if(keyNames[1] == 'dxds') {
						let ary
						if(keyNames[0].split('p')[1] * 1 <= 5) {
							ary = pk10_btnLabels[keyNames[1]].concat(pk10_btnLabels['lh'])
						} else {
							ary = pk10_btnLabels[keyNames[1]]
						}
						ary.forEach((item2, index2) => {
							let obj = {};
							obj.name = item2.name
							obj.selected = item2.selected
							obj.key = item2.key
							obj.key = obj.key.replace("%xx", keyNames[0])
							newsItems.push(obj)
						})
					} else {
						pk10_btnLabels[keyNames[1]].forEach((item2, index2) => {
							let obj = {};
							obj.name = item2.name
							obj.selected = item2.selected
							obj.key = item2.key
							obj.key = obj.key.replace("%xx", keyNames[0])
							newsItems.push(obj)
						})
					}
					numbers[index1] = newsItems
				}
			})
			break;
		case '1T10':
			names = ["冠军", "亚军", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", "第九名", "第十名"];
			ids = ["p1_pn", "p2_pn", "p3_pn", "p4_pn", "p5_pn", "p6_pn", "p7_pn", "p8_pn", "p9_pn", "p10_pn"];
			ids.forEach((item1, index1) => {
				let keyNames = item1.split("_");
				let newsItems = []
				pk10_btnLabels[keyNames[1]].forEach((item2, index2) => {
					let obj = {};
					obj.name = item2.name
					obj.selected = item2.selected
					obj.key = item2.key
					obj.key = obj.key.replace("%xx", keyNames[0])
					newsItems.push(obj)
				})

				numbers[index1] = newsItems

			})
			break;
		case 'gyzh':
			names = ["冠、亚军和"];
			ids = ["gyzh"];
			ids.forEach((item1, index1) => {
				let ary = pk10_btnLabels['gyds'].concat(pk10_btnLabels[item1])
				let newsItems = []
				ary.forEach((item2, index2) => {
					let obj = {};
					obj.name = item2.name
					obj.selected = item2.selected
					obj.key = item2.key
					newsItems.push(obj)
				})
				numbers[index1] = newsItems
			})
			break;
		default:
			break;
	}
	return getNumbers(names, numbers)
}

function ssc_groupList(showId) {
	var numbers = [];
	var names, ids;
	switch(showId) {
		case 'zh':
			names = ["总和-龙虎和", "第一球", "第二球", "第三球", "第四球", "第五球", "前三", "中三", "后三"];
			ids = ["zh_lhh", "b1_bn", "b2_bn", "b3_bn", "b4_bn", "b5_bn", "ft3b_3b", "md3b_3b", "lt3b_3b"];
			ids.forEach((item1, index1) => {
				if(item1 == "zh_lhh") {
					numbers[index1] = ssc_btnLabels[item1]
				} else {
					let keyNames = item1.split("_");
					let newsItems = []
					if(keyNames[1] == 'bn') {
						let ary = ssc_btnLabels['dxds'].concat(ssc_btnLabels[keyNames[1]])
						ary.forEach((item2, index2) => {
							let obj = {};
							obj.name = item2.name
							obj.selected = item2.selected
							obj.key = item2.key
							obj.key = obj.key.replace("%xx", keyNames[0])
							newsItems.push(obj)
						})
					} else {
						ssc_btnLabels[keyNames[1]].forEach((item2, index2) => {
							let obj = {};
							obj.name = item2.name
							obj.selected = item2.selected
							obj.key = item2.key
							obj.key = obj.key.replace("%xx", keyNames[0])
							newsItems.push(obj)
						})
					}
					numbers[index1] = newsItems
				}
			})
			break;
		case 'b1':
		case 'b2':
		case 'b3':
		case 'b4':
		case 'b5':
			names = [ball_num[showId], "两面", "前三", "中三", "后三"];
			ids = [showId + "_bn", "zh_lhh", "ft3b_3b", "md3b_3b", "lt3b_3b"];
			ids.forEach((item1, index1) => {
				let newsItems = [];
				let keyNames = item1.split("_");
				if(item1 == "zh_lhh") {
					let ary = ssc_btnLabels['dxds'].concat(ssc_btnLabels['zh_lhh'])
					ary.forEach((item2, index2) => {
						let obj = {};
						obj.name = item2.name
						obj.selected = item2.selected
						obj.key = item2.key
						obj.key = obj.key.replace("%xx", showId)
						newsItems.push(obj)
					})
					numbers[index1] = newsItems
				} else {
					ssc_btnLabels[keyNames[1]].forEach((item2, index2) => {
						let obj = {};
						obj.name = item2.name
						obj.selected = item2.selected
						obj.key = item2.key
						obj.key = obj.key.replace("%xx", keyNames[0])
						newsItems.push(obj)
					})
					numbers[index1] = newsItems
				}
			})
			break;
		default:
			break;
	}
	return getNumbers(names, numbers)
}

function getNumbers(names, numbers) {
	let ary = [];
	names.forEach((item, index) => {
		let obj = {};
		obj.title = item;
		obj.groups = numbers[index];
		ary.push(obj)
	})
	return ary
}