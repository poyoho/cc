import fetch from './fetch'

export function counter() {
  const res = fetch({
    method: 'get',
    url: '/counter',
    params: {
      time: performance.now()
    }
  })
}
