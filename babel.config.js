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
  ];
  const plugins = [
    '@emotion/babel-plugin',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-polished',
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
          '@babel/preset-typescript',
        ],
      },
    },
  };
};
