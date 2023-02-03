// 模块化
// 解决复杂问题 自顶向下逐层把系统划分为若干模块的过程
// 模块是可 组合 分解 更换 的单元

// 模块化规范
// 对代码进行模块化 拆分与组合 时，需要遵守的规则

// Node.js的模块化
// 分类：
// 内置模块  官方提供的 fs path http
// 自定义模块 用户创建的.js文件
// 第三方模块 第三方开发出来的模块 使用要预先下载

// 加载模块
// 使用require()方法 可以忽略.js后缀名
// 加载内置模块、第三方模块只用模块名字
// 加载自定义模块需要相对路径
// * 使用require()方法加载其他模块会执行被加载模块中的代码
// require('./08-testmodule');

// 模块作用域
// 在自定义模块中定义的变量、方法等 只能在模块内被访问

// 向外共享模块作用域中的成员
// 1.module对象
// 每个.js自定义模块中都有一个module对象 存储了和当前模块有关的信息
// module.exports对象
// 通过该对象将模块内成员共享出去
// 外界用require方法导入自定义模块时，得到module.exports所指定的对象
const m = require('./08-testmodule');
console.log(m);

// *使用require()方法导入模块时，导入的结果永远以module.exports指向的对象为准

// exports对象
// 简化版module.exports

// 使用误区
// * require得到的永远时module.exports指向的对象
// 这俩最好不要混用

// 模块化规范
// CommonJs模块化规范
// 1.每个模块内部，module变量代表当前的模块
// 2.module变量是一个对象，他的exports属性是对外的接口
// 3.加载某个模块，其实是加载该模块的module.exports属性。require方法用于加载模块

// npm与包
// Node.js中的第三方模块又叫做包
// https://www.npmjs.com/
// 包管理工具 Node Package Manager（npm包管理工具）
// npm -v查看版本号

// 在项目中安装指定名称的包
// npm install packagename
// 或
// npm i packagename

// 初次装包后,项目文件下多一个node_modules的文件夹和package-lock.json的配置文件
// 前者存放已安装的包
// 后者记录包下载的信息

// 包的语义化版本规范
// 点分十进制 e.g. 2.24.0
// 1 大版本
// 2 功能版本
// 3 bug修复版本
// 规则:前面的版本号增长了,后面的版本号归零

// npm包管理配置文件
// 记录相关信息 项目的版本号 名称 描述...

// 多人协作开发
// 问题:第三方体积过大 不方便成员之间共享
//      所以 共享时剔除node_modules的文件夹
//      创建package.json记录
//      上传时忽略node_modules文件夹

// 快捷命令
// npm init -y
// 执行命令所处的目录中自动创建package.json文件
// 只能在英文目录下运行 不能使用中文以及空格
// 运行npm install命令安装包时npm管理工具会自动把包的管理信息记录到package.json文件中之中

// dependencies节点
// 记录包的名字和版本号

// devDependencies节点
// 某些包只在开发阶段用到 项目上线后用不到
// npm i packagename -D
// npm install packagename --save-dev

// 一次性安装所有包
// npm install
// npm包管理工具会读取package.json文件中的依赖,然后统一下载

// 卸载包
// npm uninstall 包名
// 无简写
// 自动从dependencies中删除对应的包的信息

// 解决下包速度慢
// npm默认采用国外服务器
// 采用淘宝npm镜像服务器
// 查看当前下包服务器地址
// npm config get registry
// 切换为镜像服务器：
// npm config set registry=https://registry.npm.taobao.org/

// 包的分类
// 1.项目包 安装到ndoe_modules的包
// 分为 开发依赖包 开发期间用到
//      核心依赖包 开发以及上线之后用到
// 2.全局包 提供-g 安装为全局包

// i5ting_toc包 md->html网页

// 包的规范结构
// 1.必须以单独的目录存在
// 2.顶级目录下包含package.json包管理配置文件
// 3.package.json包含name version main三个属性 代表包名 版本号 包的入口

const mytool = require('./10-mpackage/index.js');

const dtStr = mytool.dateFormat(new Date());
console.log(dtStr);

// 模块的加载机制
// 模块会在第一次加载之后缓存 多次调用require不会导致代码多次执行

// 内置模块加载机制
// 内置模块加载优先级最高 同名的时候加载内置模块
// 自定义模块加载机制
// 以./ ../开头的路径标识符 没有的话会被当作第三方或者内置模块来加载
// 省略扩展名时会按顺序做尝试
// 确切的文件名->.js->.json->.node->报错
// 第三方模块
// 非前两者 从当前模块的父目录开始,尝试从/node_modules文件夹加载第三方模块
// 如果没有的话会向再上一级..直到文件系统根目录

// 目录作为模块
// 1.在加载的目录中查找package.json并查询main属性,作为加载入口
// 2.没有.json或main入口不存在 会尝试加载目录下的index.js文件
// 3.以上都失败 报错 Error:Cannot find module 'xxx'