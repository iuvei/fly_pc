export default {
    rechargeList(state) {
        let arr = [];
        for (let item of state.points) {
            if (item.type === '0') {
                arr.push(item)
            }
        }
        return arr
    },
    withdrawList(state) {
        let arr = [];
        for (let item of state.points) {
            if (item.type === '1') {
                arr.push(item)
            }
        }
        return arr
    }
}