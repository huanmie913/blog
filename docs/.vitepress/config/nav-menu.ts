import { DefaultTheme } from 'vitepress';
/**
 * 一级菜单
 */
export const nav: DefaultTheme.NavItem[] = [
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
  { text: '运维&网络', link: '/archives?category=运维|网络' },
  {
    text: '技术专题',
    items: [
      { text: '时间、时区', link: '/subject/date-time-zone/index.md' },
      { text: '正则表达式', link: '/subject/regexp/index.md' },
      { text: '工具集', link: '/subject/tools/index/index.md' },
    ]
  },
  {
    text: '生活随笔',
    items: [
      { text: '健康/保险', link: '/life/healthy/insurance-submit-expense/index.md' },
      { text: '言论', link: '/life/speech/index.md' },
    ]
  },
  { 
    text: '归档', 
    items: [
      { text: '归档', link: '/archives' },
      { text: '标签', link: '/tags' },
    ]
  },
];

/**
 * 侧边栏
 * 自动匹配子路径，如：/linux.network/xxx/xxx.md
 */
export const sidebar: DefaultTheme.Sidebar = {
  '/life/healthy/': [
    {
      text: '健康/保险',
      items: [
        { text: '保险报销', link: '/life/healthy/insurance-submit-expense/index.md' },
        { text: '亲情账户&家庭共济账户', link: '/life/healthy/two-account/index.md' },
        { text: '家庭常备药&儿科急诊医院', link: '/life/healthy/family-medicine-checklist/index.md'}
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
        { text: '使用unocss时适配不同的设计稿', link: '/fe/tech/unocss-rem2px2vw/index.md' },
        { text: 'lottie的配置和发布', link: '/fe/tech/vite-vue3-lottie/index.md' },
        { text: 'String.raw的使用及场景', link: '/fe/tech/string.raw/String.raw.md' },
      ],
    },
    {
      text: '工程化',
      items: [
        {
          text: '代理/调试/抓包',
          items: [
            {text: '线上环境代理到开发环境', link: '/fe/project/debug/proxy-online-to-local/index.md' },
            {text: '调试android设备H5', link: '/fe/project/debug/debug-android-from-computer-h5/index.md'},
            {text: '调试ios设备H5', link: '/fe/project/debug/debug-ios-from-computer-h5/index.md'}
          ]
        },
        {
          text: 'Git',
          items: [
            {text: 'git config配置多用户场景', link: '/fe/project/git-config/index.md'},
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
        { text: 'linux之前后台命令', link: '/op/linux.fe.be.order/index.md' },
        { 
          text: 'HTTP',
          items: [
            { text: 'HTTP缓存机制', link: '/op/http/cache/index.md' },
          ]
        },
        { 
          text: '跨域',
          items: [
            { text: '跨域详解', link: '/op/cors/index/index.md' },
            { text: '缓存CORS的OPTION请求', link: '/op/cors/cache-option/index.md'}
          ]
        },
        { 
          text: 'Nginx',
          items: [  
            { text: '常用命令及配置', link: '/op/nginx/command-configuration/index.md'},
            { text: 'location优先级', link: '/op/nginx/location-priority/index.md' },
            { text: 'Nginx的CORS跨域配置', link: '/op/nginx/nginx-cors/index.md' },
          ]
        }
      ],
    },
  ],
};