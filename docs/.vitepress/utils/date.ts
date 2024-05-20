import { parseISO, format, formatDistance, setDefaultOptions } from 'date-fns'
import zhCN from 'date-fns/locale/zh-CN';

const formatString = 'yyyy-MM-dd'
setDefaultOptions({locale: zhCN})

export function getDate(date: string): string | null {
  if (!date) {
    return null
  }
  return format(parseISO(date), formatString)
}

export function getFromNow(date: string | number): string | null {
  if (!date) {
    return null
  }

  let isoDate = ''
  if (typeof date === 'number') {
    isoDate = new Date(date).toISOString()
  } else {
    isoDate = date
  }

  return formatDistance(parseISO(isoDate), new Date(), { addSuffix: true });
}
