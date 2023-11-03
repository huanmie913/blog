import { watch, onMounted, nextTick } from 'vue';

// // https://vitepress.dev/guide/custom-theme
// import Theme from 'vitepress/theme'
// import './style.css'
import DefaultTheme from 'vitepress/theme';
import NewLayout from './components/new-layout.vue';
import mediumZoom from 'medium-zoom'
import './rainbow.css'
import './vars.css'
import './overrides.css'
import 'uno.css';
// import './custom.css';
import { useRoute } from 'vitepress';
let homePageStyle: HTMLStyleElement | undefined

export default {
  // ...Theme,
  // Layout: () => {
  //   return h(Theme.Layout, null, {
  //     // https://vitepress.dev/guide/extending-default-theme#layout-slots
  //   })
  // },
  // enhanceApp({ app, router, siteData }) {
  // }
  ...DefaultTheme,
  Layout: NewLayout,
  enhanceApp({ router }) {
    // register global compoment
    // 使用vite的unplugin-vue-components插件自动注册组件,替代app.component('xxx', xxx)
    if (typeof window === 'undefined'){
      return;
    }

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === '/'),
      { immediate: true },
    )
  },
  setup() {
  //   // 获取前言和路由
  //   const { frontmatter } = useData();
  //   const route = useRoute();
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }) // Should there be a new?
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    )
  }
};

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle){
      return
    }

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
    return;
  }

  if (!homePageStyle){
    return
  }
  homePageStyle.remove()
  homePageStyle = undefined
}
