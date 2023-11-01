import { defineConfig } from 'vitepress';
// 获取markdown配置，自定义解析器
import { markdown } from './config/markdown';
// 获取vite配置
import { vite } from './config/vite';

// 获取algolia搜索配置
import { algoliaSearchOptions } from './config/algolia-search';

// 导入导航菜单、侧边栏配置
import { nav, sidebar } from './config/nav-menu';

const github = 'https://github.com/huanmie913/blog';

export default defineConfig({
  title: 'Sway | 飞飞的博客',
  description: '学无止境、乐享生活、终身成长',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    // 百度统计.start
    [
      'script', 
      {
        'id': 'baidutongji',
        'src': 'https://hm.baidu.com/hm.js?a8ee586c52b9a4d073f44b09a4ee77ed', 
        'async': 'true'
      }
    ],
    // 百度统计.end
  ],
  lang: 'cn-ZH',
  base: '/', // 必须以斜杠结尾
  srcDir: './src',
  ignoreDeadLinks: true,
  lastUpdated: true,
  vite, // vite配置
  markdown, // Markdown配置
  // 生成站点地图
  sitemap: {
    hostname: 'https://gengxiaofei.com'
  },
  rewrites: {},
  themeConfig: {
    // 主题设置手册：https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F%E9%93%BE%E6%8E%A5
    logo: '/logo.png',
    // siteTitle: '组件库标题',
    socialLinks: [{ icon: 'github', link: github }],
    outline: [1, 6], // 默认值，deep = [2, 6]
    outlineTitle: '文章大纲',
    // 菜单栏配置
    nav,
    // 侧边栏配置
    sidebar,
    // 自定义扩展: 文章元数据配置
    // @ts-ignore
    articleMetadataConfig: {
      author: '飞飞', // 文章全局默认作者名称
      authorLink: '/about/me', // 点击作者名时默认跳转的链接
      showViewCount: true, // 是否显示文章阅读数, 需要在 docs/.vitepress/theme/api/config.js 及 interface.js 配置好相应 API 接口
    },
    editLink: {
      pattern: `${github}/tree/master/docs/src/:path`,
      text: '在 GitHub 上编辑此页',
    },
    // 搜索配置
    search: {
      provider: 'algolia',
      options: algoliaSearchOptions,
    },
  },
});
