export const combinePath = (...args: string[]) => {
  return args.reduce((all, cur) => {
    if (all === '') return cur
    if (cur === '') return all
    if (all[all.length - 1] === '/' && cur[0] === '/') {
      return `${all}${cur.slice(1)}`
    } else if (all[all.length - 1] !== '/' && cur[0] !== '/') {
      return `${all}/${cur}`
    } else {
      return `${all}${cur}`
    }
  })
}
