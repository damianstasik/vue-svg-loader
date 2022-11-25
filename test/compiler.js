import path from 'path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';
const { VueLoaderPlugin } = require('vue-loader')

export default (fixture, options = {}) => {
  let loaderToUse = 'vue-loader'
  if(options.useDummyLoader){
    loaderToUse = path.resolve(__dirname, './dummyLoader.js');
  }
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.html',
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            loaderToUse,
            path.resolve(__dirname, '../index.js'),
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(stats.toJson().errors);

      resolve(stats);
    });
  });
};