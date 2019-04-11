<template>
  <div class="touchsuper">
    <ul>
      <li>
        <label class="label">
          上级账户<span>:</span>
        </label>
        <span class="touch-way">{{tocuhWays.superAccount}}</span>
      </li>
      <li>
        <label class="label">
          QQ<span>:</span>
        </label>
        <span class="touch-way">{{tocuhWays.QQ}}</span>
      </li>
      <li>
        <label class="label">
          微信<span>:</span>
        </label>
        <span class="touch-way">{{tocuhWays.WX}}</span>
      </li>
      <li>
        <label class="label">
          手机号<span>:</span>
        </label>
        <span class="touch-way">{{tocuhWays.Phone}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      tocuhWays: []
    }
  },
  created () {
    this.touchSuper().then(res => {
      (res.QQ == "" || res.QQ == null) && (res.QQ = "您的上级暂时没有留下QQ");
      (res.WX == "" || res.WX == null) && (res.WX = "您的上级暂时没有留下微信");
      (res.Phone == "" || res.Phone == null) && (res.Phone = "您的上级暂时没有留下手机号");
      this.tocuhWays = res
    })
  },
  methods: {
    ...mapActions('account', ['touchSuper'])
  }
}
</script>

<style scoped>
.touchsuper {
  display: flex;
  justify-content: center;
  padding-top: 100px;
}
.touchsuper ul {
  font-size: 16px;
}
.label {
  display: inline-block;
  width: 100px;
  text-align-last: end;
}
.label span {
  position: absolute;
}
.touch-way {
  margin-left: 10px;
}
</style>
