
<template>
  <div style="width：100%">
    <component :is="item" v-for="(item,index) in datalist " :key="index" />
  </div>

</template>
<script>
import Vue from 'vue'
export default {
  name: 'Test',
  components: {

  },
  data() {
    return {
      currentTabComponent: 'test1',
      datalist: ['test1', 'test2', 'test3']
    }
  },
  created() {
    this.initData()
  },
  mounted() {

  },
  methods: {
    initData() {
      this.datalist.forEach(each => {
        Vue.component(
          each,
          (re) => {
            require([`./${each}`], re)
          }
          // each, ()=>import(`./${each}`)  import会报错
        )
      })
    }
  }
}
</script>

<style>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
</style>
