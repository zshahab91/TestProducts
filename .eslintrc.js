// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
    extends: ['@rushstack/eslint-config', '@rushstack/eslint-config/react'],
    parserOptions: { tsconfigRootDir: __dirname },
    settings: {
        react: { version: '16.13.1' },
    },
    rules: {
        '@typescript-eslint/typedef': 'off',
        '@rushstack/no-null': 'off',
        'react/jsx-no-bind': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-floating-promises': ["off", { ignoreVoid: true, ignoreIIFE: false }],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off"

    },
};
