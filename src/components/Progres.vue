<template>
  <div class="el-progress">
    <div class="el-progress-circle">
      <svg viewBox="0 0 100 100">
        <path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke="#fff" stroke-width="4.8" fill="none"></path>
        <path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke-linecap="round" stroke="#d12323" stroke-width="4.8" fill="none" style="stroke-dasharray: 300px, 300px; transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease;" :style="'stroke-dashoffset:' + (300 - 3*procent) + 'px;'"></path>
      </svg>
    </div>
    <div class="el-progress__text">{{ Math.floor(procent) }}%</div>
  </div>
</template>

<script>
export default {
  name: 'Progres',
  data () {
    return {}
  },
  props: ['procent']
}
</script>

<style scoped>
  .el-progress-circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .el-progress-circle svg {
    display: block;
    width:60%;
    height: 60%;
    position: absolute;
    left: 20%;
    top: 20%;
  }

  .el-progress__text {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
    font-size: 2em;
    color: #666;
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
  }
</style>
