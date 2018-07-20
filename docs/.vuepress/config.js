module.exports = {
  title: 'Documentation',
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader(require.resolve('../../index'));
  },
  themeConfig: {
    repo: 'visualfanatic/vue-svg-loader',
    editLinks: true,
    nav: [
      {
        text: 'FAQ',
        link: '/faq',
      },
    ],
  },
};
