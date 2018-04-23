var ExtractText = require('extract-text-webpack-plugin');
var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//var SpritesmithPlugin = require('webpack-spritesmith');

var sources = [
  "./js/main.js"
];

module.exports = {
  stats: 'minimal',
  context: __dirname,
  devtool: "source-map",
  /*entry: ["./js/main.js", "./js/viewDataSet.js"],*/
  entry: {
    main: sources[0]
  },
  devServer: {
    inline: true,
    port: 8080
  },
  watch: true,
  // entry: {
  // js:"./js/main.js",
  // css: "./sass/main.scss"
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),//__dirname + "/dist/",
    filename: "[name].js"
  },
  module: {
    loaders: [
      /*{
        test: /\.(png|jpg)$/,
        //include: __dirname + "/dist/images",
        loader: 'file-loader'
      },*/
      /*{
        test: /\.styl$/, 
        loaders: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },*/
      {
        test: /\.(png|jpg)$/,
        loaders: [
          'file-loader?name=images/[hash].[ext]'
        ]
      },
      {
        test: /\.scss$/,
        // loader: 'css-loader!sass-loader'
        loader: ExtractText.extract({
          use: 'css-loader!sass-loader'
        })
        //   use: [
        //     {
        //         loader: 'css-loader',
        //         options: {
        //             url: false,
        //             minimize: true,
        //             sourceMap: true
        //         }
        //     }, 
        //     {
        //         loader: 'sass-loader',
        //         options: {
        //             sourceMap: true
        //         }
        //     }
        //     ]
        //   // use: 'css-loader!sass-loader'
        // })
      },
      {
        test: /\.css$/,
        // loader: 'css-loader'
        loader: ExtractText.extract({
          use: 'css-loader'
          // use: [
          //   { loader: 'css-loader', options: { minimize: true } }
          // ]
        })
      },
      /*{
      test: /\.html$/,
      
        loader: 'html-loader',
        options: {
          minimize: true,
          removeComments: false,
          collapseWhitespace: false
        }*/

      {
        test: /\.html$/,
        use: ['file-loader?name=html/[path][name].[ext]!extract-loader!html-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }/*,
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      }*/
    ]
  },
  resolve: {
    //webpack 2:
    modules: ["node_modules", "spritesmith-generated"]
  },
  plugins: [
    new UglifyJsPlugin(), // Default settings should be fine
    new ExtractText('[name].css')/*,
    new SpritesmithPlugin({
        src: {
            cwd: path.resolve(__dirname, 'images'),
            glob: '*.png'
        },
        target: {
            image: path.resolve(__dirname, 'images/sprite.png'),
            css: path.resolve(__dirname, 'sass/_sprites.sass')
        },
        apiOptions: {
            cssImageRef: "~sprite.png"
        }
    })*/
  ]
}