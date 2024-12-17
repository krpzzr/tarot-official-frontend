const path = require('path');

module.exports = {
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      locales: path.resolve(__dirname, 'src/locales/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      types: path.resolve(__dirname, 'src/types/'),
    }
  },
  rules: [
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
  ],
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'src/styles')],
  },
};