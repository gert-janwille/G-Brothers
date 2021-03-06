const path = require(`path`);

const webpack = require(`webpack`);
const {UglifyJsPlugin} = webpack.optimize;

const CopyWebpackPlugin = require(`copy-webpack-plugin`);
const ExtractTextWebpackPlugin = require(`extract-text-webpack-plugin`);
const configHtmls = require(`webpack-config-htmls`)();

const {getIfUtils, removeEmpty} = require(`webpack-config-utils`);
const {ifProduction} = getIfUtils(process.env.NODE_ENV);

const extractCSS = new ExtractTextWebpackPlugin({filename: "css/style.css"});
const autoprefixer = require('autoprefixer');

// change for production build on different server path
const publicPath = `/`;

const copy = new CopyWebpackPlugin([

  {
  from: `./src/assets`,
  to: `assets`
  }
], {
  ignore: [
    `.DS_Store`
  ]
});

const config = {

  entry: removeEmpty([
    `./src/css/style.less`,
    `./src/js/script.js`,
  ]),

  resolve: {
    extensions: [
      `.js`,
      `.jsx`,
      `.css`
    ]
  },

  output: {
    path: path.join(__dirname, `server`, `public`),
    filename: `js/[name].js`,
    publicPath
  },

  devtool: `source-map`,

  module: {

    rules: removeEmpty([

      {
        test: /\.less$/,
        loader: extractCSS.extract([
          {
            loader: `css-loader`,
            options: {
              importLoaders: 1,
              plugins: () => autoprefixer({
                browsers: ['last 3 versions', '> 1%']
              })
            }
          },
          {
            loader: `less-loader`
          }
        ])
      },

      {
        test: /\.html$/,
        loader: `html-loader`,
        options: {
          attrs: [
            `audio:src`,
            `img:src`,
            `video:src`,
            `source:srcset`
          ] // read src from video, img & audio tag
        }
      },

      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: `babel-loader`
          },
          {
            loader: `eslint-loader`,
            options: {
              fix: true
            }
          }
        ]
      },

      {
        test: /\.(svg|png|jpe?g|gif|webp)$/,
        loader: `url-loader`,
        options: {
          limit: 1000, // inline if < 1 kb
          context: `./src`,
          name: `[path][name].[ext]`
        }
      },

      {
        test: /\.(mp3|mp4|wav)$/,
        loader: `file-loader`,
        options: {
          context: `./src`,
          name: `[path][name].[ext]`
        }
      },

      ifProduction({
        test: /\.(svg|png|jpe?g|gif)$/,
        loader: `image-webpack-loader`,
        enforce: `pre`,
        options: {
          bypassOnDebug: true
        }
      })

    ])

  },

  plugins: removeEmpty([

    ...configHtmls.plugins,

    copy,
    extractCSS,

    ifProduction(
      new UglifyJsPlugin({
        sourceMap: true,
        comments: false
      })
    )

  ])

};

module.exports = config;
