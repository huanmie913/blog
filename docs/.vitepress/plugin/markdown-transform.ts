import type { Plugin } from 'vite'
import { getReadingTime } from '../utils'

export function replacer(code: string, value: string, key: string, insert: 'head' | 'tail' | 'none' = 'none') {
  const START = `<!--${key}_STARTS-->`
  const END = `<!--${key}_ENDS-->`
  const regex = new RegExp(`${START}[\\s\\S]*?${END}`, 'im')

  const target = value ? `${START}\n${value}\n${END}` : `${START}${END}`

  if (!code.match(regex)) {
    if (insert === 'none')
      return code
    else if (insert === 'head')
      return `${target}\n\n${code}`
    else
      return `${code}\n\n${target}`
  }

  return code.replace(regex, target)
}

export function MarkdownTransform(): Plugin {
  return {
    name: 'md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/)) {
        return null
      }
      
      const [_name, i] = id.split('/').slice(-2)
      // 如果id返回的是'/src/index.md'，即：首页，则不需要添加PageInfo`
      if (_name === 'src' && i === 'index.md') {
        return code
      }

      // const { readTime, words } = {readTime: 10, words: 100} // getReadingTime(code)
      const { readTime, words } =  getReadingTime(code)
      code = code.replace(/(#\s.+?\n)/, `$1\n\n<PageInfo readTime="${readTime}" words="${words}"/>\n`)

      return code
    },
  }
}
