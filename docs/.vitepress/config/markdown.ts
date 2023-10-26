import type { MarkdownOptions } from 'vitepress';
// https://github.com/tani/markdown-it-mathjax3#customization
import mathjax3 from 'markdown-it-mathjax3';
import footnote from 'markdown-it-footnote';

/**
 * vitepress的markdown配置参见：https://vitepress.dev/reference/site-config#markdown
 * markdownIt配置参见：https://github.com/markdown-it/markdown-it
 * Shiki主题, 所有主题参见: https://github.com/shikijs/shiki/blob/main/docs/themes.md
 */

export const markdown: MarkdownOptions = {
  theme: {
    light: 'github-light',
    dark: 'github-dark-dimmed'
  },
  math: true,
  // container配置参考：https://github.com/vuejs/vitepress/pull/3044
  container: {
    tipLabel: "提示",
    warningLabel: "警告",
    dangerLabel: "危险",
    infoLabel: "信息",
    detailsLabel: "详细信息"
  },
  lineNumbers: true, // 启用行号
  config: (md) => {
    md.use(mathjax3);
    md.use(footnote);
  },
};
