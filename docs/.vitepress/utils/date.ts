import { parseISO, format, formatDistance, setDefaultOptions } from 'date-fns'
import zhCN from 'date-fns/locale/zh-CN/index';

const formatString = 'yyyy-MM-dd'
setDefaultOptions({locale: zhCN})

export function getDate(date: string): string | null {
  if (!date) {
    return null
  }
  return format(parseISO(date), formatString)
}

export function getFromNow(date: string): string | null {
  if (!date) {
    return null
  }
  return formatDistance(parseISO(date), new Date(), { addSuffix: true });
}
