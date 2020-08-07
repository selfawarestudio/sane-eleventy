const path = require('path')
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const ManifestPlugin = require('webpack-manifest-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const paths = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build'),
}

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: `${paths.src}/scripts/index.js`,
    style: `${paths.src}/styles/index.scss`,
  },
  output: {
    path: paths.build,
    filename: `[name].[contenthash].js`,
    chunkFilename: '[id].[contenthash]',
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': `${paths.src}/scripts/`,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-template-literals',
              'babel-plugin-transform-async-to-promises',
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer'),
                require('cssnano')({ preset: 'advanced' }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
                importer: require('node-sass-glob-importer')(),
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin({
      silent: true,
    }),
    new MiniCssExtractPlugin({
      filename: `[name].[contenthash].css`,
    }),
    new ManifestPlugin({
      fileName: '../src/templates/includes/_manifest.json',
    }),
  ],
  stats: 'errors-only',
  optimization: {
    usedExports: true,
    minimizer: isProd
      ? [
          new TerserPlugin({
            parallel: true,
            extractComments: 'all',
          }),
        ]
      : [],
  },
}

if (isProd) {
  module.exports.plugins.push(
    new PurgecssPlugin({
      paths: () => glob.sync(`${paths.src}/**/*`, { nodir: true }),
      whitelistPatterns: [/^is-/],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  )
}
