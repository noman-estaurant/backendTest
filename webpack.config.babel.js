import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'
import UgliftJSPlugin from 'uglifyjs-webpack-plugin'

const outputDirectory = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  optimization: {
    minimizer: [
      new ParallelUglifyPlugin({
        cacheDir: '.cache/', //缓存压缩，默认不缓存，设置存放位置开启
        test: /.js$/, //匹配需要压缩的文件，默认为/.js$/和Loader配置一样
        //include: [], 使用正则去选择需要被压缩的文件和Loader配置一样
        //exclude: [], 使用正则去去除不需要被压缩的文件和Loader配置一样
        //workerCount: 2, 开启几个子进程并发执行压缩
        // sourceMap: false, 是否输出source Map，开启会导致压缩变慢
        // uglifyJS: {}, 用于压缩ES6代码不可和uglifyJS同时使用
        uglifyJS:{//压缩ES5代码
          output: {
            // 是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
            beautify: false,
            //是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
            comments: false
          },
          compress: {
            //是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出
            warnings: false,
            //是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
            drop_console: false,
            //是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 1, 默认为否
            collapse_vars: true,
            // 提取出现多次但是没有定义成变量去引用的静态值
            reduce_vars:true
          }
        },
      }),
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new UgliftJSPlugin()
  ]
};
