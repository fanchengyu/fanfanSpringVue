
export function test() {
// require.context函数接受三个参数
// String  directory  读取文件的路径
// Boolean  boolean   是否遍历文件的子目录
// regExp   reg       匹配文件的正则
  const files = require.context('./te', true, /\.js$/)

  // 返回值：一个函数  这个返回的函数有三个属性
  console.log({ files })
  //  Function keys       返回一个由匹配文件的文件名组成的数组
  console.log(files.keys())
  //  Function resolve   传入keys方法返回的数组中的元素，返回一个字符串代表着传入参数的文件相对于整个工程的相对路径
  files.keys().forEach(eve => {
    const sk = files.resolve(eve)
    console.log({ sk })
  })
  //  String id    执行环境的id？
  console.log(files.id)
  // 这个函数可以传一个参数--文件名相对路径，执行后得到的值是Module模块
  files.keys().forEach(eve => {
    const wa = files(eve)
    console.log({ wa })
  })
}
