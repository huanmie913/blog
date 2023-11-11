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
      { text: '工具收集', link: '/subject/tools/index/index.md' },
    ]
  },
  {
    text: '生活随笔',
    items: [
      { text: '健康/保险', link: '/life/healthy/insurance-submit-expense/index.md' },
      { text: '言论', link: '/life/speech/index.md' },
    ]
  },
  { text: '标签', link: '/tags' },
  { text: '归档', link: '/archives' },
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
        { 
          text: 'Nginx',
          items: [  
            { text: '常用命令及配置', link: '/op/nginx/command-configuration/index.md'}
          ]
        }
      ],
    },
  ],
};