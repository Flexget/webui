module.exports = function config(api) {
  const presets = [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'entry',
        modules: false,
      },
    ],
    '@babel/preset-react',
    ...(api.env() !== 'test'
      ? ['@emotion/babel-preset-css-prop', { sourceMap: api.env() !== 'test' }]
      : []),
  ];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    'react-hot-loader/babel',
  ];

  return {
    presets,
    plugins,
    env: {
      production: {
        plugins: ['transform-react-remove-prop-types'],
      },
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: 3,
              modules: 'commonjs',
            },
          ],
        ],
        plugins: ['dynamic-import-node'],
      },
      release: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: 3,
              modules: 'commonjs',
            },
          ],
        ],
      },
    },
  };
};
