/**
 * 首页.推荐数据.数据结构
 */
export interface Link {
  url: string
  icon?: string
  channel?: string
}

export interface ExampleChild {
  name: string
  desc: string
  icon?: string
  icons?: string[]
  logo?: string
  links: Link[]
}

export interface Example {
  title: string
  children: ExampleChild[]
}


/**
 * link的默认icon为: i-gg-link
 */

// @unocss-include
export const examples: Example[] = [
  // 技术类.电子书.手册
  {
    title: '技术类.电子书.手册',
    children: [
      {
        name: 'MDN',
        desc: 'MDN Web 文档',
        icon: 'i-simple-icons-mdnwebdocs dark:invert',
        links: [
          {
            channel: '官网',
            icon: 'i-mdi-web',
            url: 'https://developer.mozilla.org/zh-CN/docs/web',
          }
        ]
      },
      {
        name: 'caniuse',
        desc: '前端兼容性查询',
        icon: 'i-noto-compass dark:invert',
        links: [
          {
            channel: '官网',
            icon: 'i-mdi-web',
            url: 'https://caniuse.com/',
          }
        ]
      },
      {
        name: 'html/css',
        desc: 'Html和CSS教程(英)',
        icon: 'inject',
        logo: 'html-css.png',
        links: [
          {
            url: 'https://internetingishard.netlify.app/html-and-css/',
            channel: '官网',
          }
        ]
      },
      {
        name: '你不知道的Javascript(第二版)',
        desc: 'JavaScript电子书',
        icon: 'i-logos-javascript dark:invert',
        links: [
          {
            url: 'https://zh-cn-ydk.js.org/',
            channel: '官网.电子版',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/liunnn1994/You-Dont-Know-JS-zh-CN',
          }
        ]
      },
      {
        name: '现代 JavaScript 教程',
        desc: 'JavaScript电子书',
        icon: 'i-logos-javascript dark:invert',
        links: [
          {
            channel: 'javascript.info',
            icon: 'i-mdi-web',
            url: 'https://zh.javascript.info/',
          }
        ]
      },
      {
        name: 'ES6教程(阮一峰)',
        desc: 'JavaScript',
        icon: 'i-logos-javascript dark:invert',
        links: [
          {
            url: 'https://wangdoc.com/es6/',
            channel: '网道'
          },
          {
            url: 'https://es6.ruanyifeng.com/',
            channel: '官网'
          },
        ]
      },
      {
        name: 'Typescript',
        desc: '阮一峰的TypeScript教程及手册',
        icon: 'i-logos-typescript-icon dark:invert',
        links: [
          {
            url: 'https://www.typescriptlang.org/zh/',
            icon: 'i-logos-typescript-icon dark:invert',
            channel: '官网',
          },
          {
            url: 'https://github.com/microsoft/TypeScript',
            icon: 'i-logos-github-icon dark:invert',
            channel: 'github',
          },
          {
            url: 'https://wangdoc.com/typescript/',
            channel: '网道',
          }
        ]
      },

      {
        name: 'NodeJS',
        desc: 'NodeJs相关文档',
        icons: [
          'i-logos-nodejs-icon dark:invert',
          'i-logos-javascript dark:invert',
        ],
        links: [
          {
            url: 'https://nodejs.org/zh-cn/docs/',
            icon: 'i-mdi-web',
            channel: '官网',
          },
          {
            url: 'https://javascript.ruanyifeng.com/nodejs/basic.html',
            icon: 'i-mdi-web',
            channel: '阮一峰'
          }
        ]
      },
      {
        name: 'CSS',
        desc: 'CSS查询手册',
        icon: 'i-logos-css-3 dark:invert',
        links: [
          {
            channel: '手册',
            url: 'https://css.gengxiaofei.com/',
          }
        ]
      },
      {
        name: 'Flexbox-Froggy',
        desc: '在游戏中学习flex布局',
        icon: 'inject',
        links: [
          {
            channel: '官网',
            icon: 'i-mdi-web',
            url: 'https://flexboxfroggy.com/#zh-cn',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/thomaspark/flexboxfroggy/'
          }
        ]
      },
      {
        name: 'SVG',
        desc: 'SVG教程(英)',
        icon: 'i-tabler-svg dark:invert',
        links: [
          {
            channel: 'SVG Tutorial官网',
            url: 'https://svg-tutorial.com/',
          }
        ]
      },
      {
        name: 'hello-algo',
        desc: 'Hello-algo算法图解',
        icon: 'inject',
        links: [
          {
            channel: '官网',
            icon: 'i-mdi-web dark:invert',
            url: 'https://www.hello-algo.com/',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/krahets/hello-algo'
          }
        ]
      },
      {
        name: 'kubernetes',
        desc: 'kubernetes中文文档',
        icon: 'i-logos-kubernetes dark:invert',
        links: [
          {
            channel: '官网',
            icon: 'i-mdi-web',
            url: 'https://kubernetes.io/zh/docs/home/',
          }
        ]
      },
      {
        name: '深入架构原理与实践',
        logo: 'architecture.png',
        icon: 'inject',
        desc: '深入架构原理与实践',
        links: [
          {
            channel: '官网',
            url: 'https://www.thebyte.com.cn/',
            icon: 'i-mdi-web',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/isno/theByteBook'
          },
        ]
      },
      {
        name: 'Will it CORS?',
        icon: 'i-carbon:http dark:invert',
        desc: 'CORS跨域查询测试',
        links: [
          {
            channel: '官网',
            url: 'https://httptoolkit.tech/will-it-cors/',
            icon: 'i-mdi-web',
          }
        ]
      },
      {
        name: 'AI神器大全',
        icon: 'i-eos-icons-ai dark:invert',
        desc: 'AI神器大全-网址导航',
        links: [
          {
            channel: '官网',
            url: 'https://aishenqi.net/',
            icon: 'i-mdi-web',
          }
        ]
      },
      {
        name: 'bestblogs',
        icon: 'inject',
        desc: '精选中文科技文章的阅读平台',
        links: [
          {
            channel: '官网',
            url: 'https://bestblogs.dev/',
            icon: 'i-mdi-web',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/ginobefun/bestblogs'
            }
        ]
      },
      {
        name: '动手实战人工智能',
        icon: 'i-streamline-emojis-robot-face-2 dark:invert',
        desc: '通过实例介绍一些 AI 算法(中文)',
        links: [
          {
            channel: '官网',
            url: 'https://aibydoing.com/',
            icon: 'i-mdi-web',
          }
        ]
      }
    ]
  },
  // 前端开发.资源 
  {
    title: '前端开发.资源',
    children: [
      {
        name: 'UnoCSS',
        desc: '零配置、原子化CSS工具',
        icon: 'i-logos-unocss dark:invert',
        links: [
          {
            icon: 'i-mdi-web',
            url: 'https://unocss.dev/',
          },
          {
            channel: 'interactive',
            url: 'https://unocss.dev/interactive/',
          }
        ]
      },
      {
        name: 'Iconify',
        desc: '图标库',
        icon: 'i-simple-icons-iconify dark:invert',
        links: [
          {
            channel: '官网',
            url: 'https://iconify.design/',
            icon: 'i-mdi-web',
          },
          {
            channel: '搜索',
            url: 'https://icon-sets.iconify.design/',
          },
          {
            channel: '图标库',
            url: 'https://icones.js.org/',
          }
        ]
      },
      {
        name: 'IconGo',
        desc: 'SVG图标库',
        icon: 'inject',
        logo: 'icon-go.png',
        links: [
          {
            channel: '官网',
            icon: 'i-mdi-web',
            url: 'https://icongo.github.io/',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/jaywcjlove/icongo'
          }
        ]
      },
      {
        name: 'svgl',
        desc: '常用徽标 Logo 的搜索引擎',
        icon: 'inject',
        logo: 'svgl.svg',
        links: [
          {
            channel: '官网',
            icon: 'i-mdi-web',
            url: 'https://www.svgl.app/',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/pheralb/svgl'
          }]
      },
      {
        name: 'MacOsIconGallery',
        desc: 'MacOS图标库',
        icon: 'i-mdi-apple dark:invert',
        links: [
          {
            channel: 'MacOS',
            icon: 'i-mdi-web',
            url: 'https://macosicongallery.com/',
          },
          {
            channel: 'watchOS',
            url: 'https://www.watchosicongallery.com/'
          },
          {
            channel: 'iOS',
            url: 'https://www.iosicongallery.com/'
          }
        ]
      },
      {
        name: 'OpenMoji',
        desc: '各种开源的 Emoji',
        icon: 'inject',
        links: [
          {
            channel: '官网',
            url: 'https://openmoji.org/',
            icon: 'i-mdi-web',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/hfg-gmuend/openmoji'
          }
        ]
      },
      {
        name: 'Animate.css',
        desc: 'CSS动画库',
        icon: 'i-simple-icons-css3 dark:invert',
        links: [
          {
            channel: '官网',
            url: 'https://animate.style/',
            icon: 'i-mdi-web',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/animate-css/animate.css'
          }
        ]
      },
      {
        name: 'vditor',
        desc: 'Markdown编辑器',
        icon: 'inject',
        links: [
          {
            channel: '官网',
            url: 'https://b3log.org/vditor/',
            icon: 'i-mdi-web',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/Vanessa219/vditor'
          }
        ]
      },
      {
        name: 'wangEditor',
        desc: '富文本编辑器',
        icon: 'inject',
        links: [
          {
            channel: '官网',
            url: 'https://www.wangeditor.com/',
            icon: 'i-mdi-web',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/wangeditor-team/wangEditor'
          }
        ]
      },
      {
        name: 'driverjs',
        desc: '引导用户操作的工具',
        icon: 'inject',
        links: [
          {
            channel: '官网',
            url: 'https://driverjs.com/',
            icon: 'i-mdi-web',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/kamranahmedse/driver.js'
          },
          {
            channel: '文档',
            icon: 'i-simple-line-icons-docs dark:invert',
            url: 'https://driverjs.com/docs/installation'
          }
        ]
      },
      {
        name: 'medium-zoom',
        desc: '图片放大工具js库',
        icon: 'inject',
        links: [
          {
            channel: '官网',
            icon: 'i-mdi-web',
            url: 'https://medium-zoom.francoischalifour.com/',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/francoischalifour/medium-zoom'
          }
        ]
      },
      {
        name: 'typed.js',
        desc: '打字机效果的js库',
        icon: 'i-file-icons-typedoc dark:invert',
        links: [
          {
            channel: '官网',
            icon: 'i-mdi-web',
            url: 'https://mattboldt.com/demos/typed-js/',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/mattboldt/typed.js/'
          },
          {
            channel: '文档',
            icon: 'i-simple-line-icons-docs dark:invert',
            url: 'https://mattboldt.github.io/typed.js/docs/'
          }
        ]
      },
      {
        name: 'lodash',
        desc: 'JavaScript 实用工具库',
        icon: 'i-logos-lodash dark:invert',
        links: [
          {
            channel: '官网',
            url: 'https://lodash.com/',
            icon: 'i-mdi-web',
          },
          {
            channel: '中文',
            url: 'https://www.lodashjs.com/',
            icon: 'i-ri-emphasis-cn dark:invert',
          },
          {
            channel: 'npm',
            icon: 'i-logos-npm-icon dark:invert',
            url: 'https://www.npmjs.com/package/lodash'
          }
        ]
      },
      {
        name: 'superjson',
        desc: '扩展多种类型的 JSON 序列化工具',
        icon: 'inject',
        links: [
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/blitz-js/superjson'
          },
          {
            channel: 'npm',
            icon: 'i-logos-npm-icon dark:invert',
            url: 'https://www.npmjs.com/package/superjson'
          }
        ]
      }
    ]
  },

  {
    title: '工具',
    children: [
      {
        name: 'VOLTA',
        desc: 'Node版本管理工具',
        icon: 'i-noto-high-voltage dark:invert',
        links: [
          {
            url: 'https://volta.sh/',
            icon: 'i-noto-high-voltage dark:invert',
            channel: '官网',
          },
          {
            url: 'https://docs.volta.sh/guide/',
            icon: 'i-simple-line-icons-docs dark:invert',
            channel: '官.文档',
          },
          {
            url: '/fe/project/volta/',
            icon: 'i-simple-line-icons-docs dark:invert',
            channel: '本.文档',
          }
        ]
      },
      {
        name: 'Warp',
        desc: '现代终端，支持AI机器人',
        icon: 'i-simple-icons-warp dark:invert',
        links: [
          {
            url: 'https://warp.dev/',
            icon: 'i-simple-icons-warp dark:invert',
            channel: '官网',
          },
          {
            url: 'https://app.warp.dev/get_warp',
            icon: 'i-mdi-download',
            channel: '下载',
          },
          {
            url: 'https://docs.warp.dev/getting-started/readme',
            icon: 'i-simple-line-icons-docs dark:invert',
            channel: '文档',
          }
        ]
      },
      {
        name: 'raycast',
        desc: '生产力效率工具',
        icon: 'inject', // 使用图片插入模式 , 默认使用name的名字，或者增加logo字段
        links: [
          {
            channel: '官网',
            url: 'https://www.raycast.com/',
            icon: 'i-mdi-web',
          },
          {
            channel: '文档',
            url: 'https://manual.raycast.com/',
            icon: 'i-simple-line-icons-docs dark:invert',
          },
          {
            channel: '插件',
            url: '/subject/tools/raycast/',
            icon: 'i-clarity:plugin-line dark:invert',
          }
        ]
      },
      {
        name: 'uTools',
        desc: '一个极简、插件化现代桌面软件',
        icon: 'inject',
        links: [
          {
            channel: '官网',
            url: 'https://u.tools/',
            icon: 'i-mdi-web',
          },
          {
            channel: '文档',
            url: 'https://u.tools/docs/guide/intro.html',
            icon: 'i-simple-line-icons-docs dark:invert',
          }
        ]
      },
      {
        name: 'Proxyman',
        desc: '高性能本地代理和HTTP调试工具',
        icon: 'inject',
        logo: 'proxyman.png',
        links: [
          {
            channel: '官网',
            url: 'https://proxyman.io/',
            icon: 'i-mdi-web',
          },
          {
            channel: 'macapp',
            url: 'https://macapp.org.cn/app/proxyman.html'
          },
          {
            url: '/fe/project/debug/proxy-man/',
            icon: 'i-simple-line-icons-docs dark:invert',
            channel: '文档',
          }            
        ]
      },
      {
        name: 'draw.io',
        desc: '流程图在线工具',
        icon: 'i-vscode-icons-file-type-drawio',
        links: [
          {
            channel: '官网',
            url: 'https://www.drawio.com/',
            icon: 'i-mdi-web',
          },
          {
            channel: '客户端',
            url: 'https://github.com/jgraph/drawio-desktop/releases/tag/v22.0.3',
            icon: 'i-mdi-download dark:invert',
          },
          {
            channel: '插件',
            url: 'https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio',
            icon: 'i-devicon-vscode dark:invert',
          }
        ]
      },
      {
        name: 'D2',
        desc: '语义化的流程图',
        icon: 'inject',
        logo: 'd2_graphic.svg',
        links:[
          {
            channel: '官网',
            url: 'https://d2lang.com/',
            icon: 'i-mdi-web',
          },
          {
            channel: 'github',
            url: 'https://github.com/terrastruct/d2',
            icon: 'i-logos-github-icon dark:invert',
          },
          {
            channel: '练习',
            url: 'https://play.d2lang.com/',
            icon: 'i-mdi-light-play dark:invert',
          }

        ]
      },
      {
        name: 'Docker Compose',
        desc: '常用的 Docker Compose 配置文件',
        icon: 'i-skill-icons-docker',
        links: [
          {
            channel: '官网',
            url: 'https://haxxnet.github.io/Compose-Examples/',
            icon: 'i-mdi-web',
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/Haxxnet/Compose-Examples'
          }
        ]
      },
      {
        name: '雷池',
        desc: '简单、好用、强大的免费WAF(安全工具)',
        logo: 'safe-line.png',
        icon: 'inject',
        links: [
          {
            channel: '官网',
            icon: 'i-mdi-web',
            url: 'https://waf-ce.chaitin.cn/'
          },
          {
            channel: 'github',
            icon: 'i-logos-github-icon dark:invert',
            url: 'https://github.com/chaitin/SafeLine'
          }
        ]
      }
    ]
  },
  {
    title: '其他',
    children: [
      {
        name: 'z2h字帖',
        desc: '中英文字帖在线生成',
        icon: 'i-twemoji-memo dark:invert',
        links: [
          {
            channel: '官网',
            icon: 'i-mdi-web',
            url: 'https://paper.z2h.cn/'
          },
        ]
      },
      {
        name: 'BeddyStories',
        desc: '全球精选儿童睡前故事',
        icon: 'i-streamline-emojis:crescent-moon',
        links: [
          {
            channel: '官网',
            url: 'https://www.beddystories.com/',
          }
        ]
      }
    ]
  },
  // {
  //   title: '流程图&图表',
  //   children: [

  //   ]
  // }
]
// .sort((a, b) => a.name.localeCompare(b.name))
