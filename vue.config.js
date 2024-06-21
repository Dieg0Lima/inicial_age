const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    port: 6969,
  },
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/themes/defaultTheme.scss";`,
      },
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#1DA57A",
            "link-color": "#1DA57A",
            "border-radius-base": "2px",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
});
