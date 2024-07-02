module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@dtos': './src/dtos',
            '@assets': './src/assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@storage': './src/storage',
            '@libs': './src/libs',
            '@utils': './src/utils',
            '@services': './src/services',
            '@hooks': './src/hooks',
            '@notifications': './src/notifications',
            '@contexts': './src/contexts',
            '@routes': './src/routes',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          'moduleName': '@env',
          'allowUndefined': false
        }
      ]
    ],
  };
};
