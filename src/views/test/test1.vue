<template>
  <div class="test1">
    <a href="/">A标签 <span>222</span></a>
    <h1>TEST1</h1>
    <h1>TEST111</h1>
    <h1>TEST1111</h1>
    <a href="#">567</a>
    <div class="lele_div">
      <section>section里的内容</section>
    </div>
    <div class="fan_div">fan_div</div>
    <el-button @click="go">点我</el-button>
  </div>
</template>
<script>
export default {
  name: 'Test1',
  components: {

  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    go() {
      location.href = '/wx/storage/preview/D-131158-R2020-0125-1607588951597.pdf'
    }
  }
}
</script>

<style lang="scss">
$common-color:red;
@import '../../style/variables.scss';
@import '../../style/mixin.scss';
  .test1{
    a{
    &:hover{
      color:$common-color
    }
    ~ h1{
      color:red;
      background: {
        color:yellow;
        size:cover;
        repeat:repeat;
      };
    }
    + h1{
      font-weight: 700;
    }
    ~ a{
      font-size:40px + 100px;
    }
  }
  /**SASS局部文件的文件名以下划线开头，这样就不会编译输出css，而只是用作导入，引用时可省略下滑线 */
  /**嵌套导入--SASS允许@import命令写在css规则内 */
  .lele_div{
      @include mysass;
      @import '../../style/lele-style';

    }
  }

//  静默注释  这种注释内容不会出现在生成的css文件中
/* 这种注释内容会出现在css文件中*/

/**使用混合器来避免重复 @mixin @include*/
</style>
