// Path路径模块

// 路径最好不要使用+做拼接

// 导入Path模块
const path = require('path');

// 路径拼接
// path.join([...paths]);

// path.basename(path[,ext])
// path<string> 必选参数 路径字符串
// ext<string> 可选参数 文件扩展名 传入后会将扩展名从返回值中省去
// 返回路径中的最后一部分，一般为文件名

// path.extname(path)
// path<string> 必选参数 路径字符串
// 返回扩展名