import { resolve } from 'node:path';
import Components from 'unplugin-vue-components/vite';
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { MarkdownTransform } from '../plugin/markdown-transform'
/*
  vitepress 也支持vite.config.ts的独立配置文件方式
  请参考：https://github.com/vuejs/vitepress/issues/189
*/

export const vite = {
  plugins: [
    // 请注意，MarkdownTransform()的位置必须在Components()之前, 否则会导致markdown中的组件无法解析
    MarkdownTransform(),
    // vite-plugin-vue-components
    Components({
      dirs: [resolve(__dirname, '../theme/components')],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ArcoResolver({ sideEffect: true, resolveIcons: true }),
        IconsResolver({
          componentPrefix: '',
        }),
      ]
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      defaultStyle: 'display: inline-block',
    }),
    UnoCSS()
  ],  
}
