<template>
  <div class="singFail">
    <div class="err">
      <img src="../../static/img/singFail.png">
      <span>抱歉！登录失败</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      second: 5,
      timer: null
    }
  }
}
</script>

<style scoped>
.singFail .err {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}
.singFail .err img {
  width: 300px;
  height: 240px;
}
.singFail .err span {
  font-size: 28px;
  font-family: monospace;
  margin-left: 30px;
}
</style>

