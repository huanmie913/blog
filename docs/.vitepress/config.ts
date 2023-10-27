import { DefaultTheme, defineConfig } from 'vitepress';
// 获取markdown配置，自定义解析器
import { markdown } from './config/markdown';
// 获取vite配置
import { vite } from './config/vite';

// 获取algolia搜索配置
import { algoliaSearchOptions } from './config/algolia-search';

/**
 * 一级菜单
 */
const nav: DefaultTheme.NavItem[] = [
  // 顶部导航下拉菜单按如下方式：
  {
    text: '前端',
    items: [
      { text: '前端技术', link: '/fe/ts/hello/index.md' },
      { text: '工程化', link: '/fe/project/monorepo-pnpm/index.md' },
    ]
  },
  /*
  {
    text: '后端',
    items: [
      { text: 'java', link: '/java' },
    ]
  },
  */
  { text: '运维&网络', link: '/op/cors/index.md' },
  {
    text: '技术专题',
    items: [
      { text: '时间、时区', link: '/subject/date-time-zone/index.md' },
      { text: '正则表达式', link: '/subject/regexp/index.md' },
      { text: '工具收集', link: '/subject/tools/index.md' },
    ]
  },
  {
    text: '生活随笔',
    items: [
      { text: '健康/保险', link: '/life/healthy/insurance-submit-expense/index.md' },
      { text: '言论', link: '/life/speech/index.md' },
    ]
  }

];

/**
 * 侧边栏
 * 自动匹配子路径，如：/linux.network/xxx/xxx.md
 */
const sidebar: DefaultTheme.Sidebar = {
  '/life/healthy/': [
    {
      text: '健康/保险',
      items: [
        { text: '保险报销', link: '/life/healthy/insurance-submit-expense/index.md' },
        { text: '亲情账户&家庭共济账户', link: '/life/healthy/two-account/index.md' },
      ]
    }
  ],
  '/fe': [
    {
      text: '前端技术',
      items: [
        { 
          text: 'TypeScript入门总结', 
          items: [
            { text: '入门（一）', link: '/fe/ts/hello/index.md' },
            { text: '入门（二）', link: '/fe/ts/hello/index2.md' },
            { text: '入门（三）', link: '/fe/ts/hello/index3.md' },
            { text: 'd.ts描述文件', link: '/fe/ts/hello/d.ts.md' },
          ],
        },
        { text: 'chatGPT之event-source', link: '/fe/tech/event-source/index.md' },
      ],
    },
    {
      text: '工程化',
      items: [
        {
          text: 'Git',
          items: [
            {text: 'git config', link: '/fe/project/git-config/index.md'},
            {text: '同一项目使用多个远程仓库', link: '/fe/project/git-more-remote/index.md'}
          ]
        },
        {text: 'monorepo-pnpm', link: '/fe/project/monorepo-pnpm/index.md'},
      ]
    }
  ],
  '/op': [
    // {
    //   text: '运维&网络',
    //   items: [
    //     { text: '基础组件 1', link: '/components/basic-component1' },
    //     { text: '基础组件 2', link: '/components/basic-component2' },
    //     { text: '基础组件 2', items: [
    //       { text: '基础组件 2', link: '/components/basic-component2' },
    //     ]
    //     },
    //   ],
    // },
    {
      text: '运维&网络',
      items: [
        { text: '跨域详解', link: '/op/cors/index.md' },
        { text: 'linux之前后台命令', link: '/op/linux.fe.be.order/index.md' },
      ],
    },
  ],
};

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
    nav,
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
