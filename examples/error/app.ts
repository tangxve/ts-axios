import axios, { AxiosError } from '../../src'

// axios({
//   method: 'get',
//   url: '/error/get1'
// }).then(res => {
//   console.log('/error/get1====then：', res)
// }).catch(e => {
//   console.log('/error/get1====catch：', e)
// })
//
// axios({
//   method: 'get',
//   url: '/error/get'
// }).then(res => {
//   console.log('/error/get====then：', res)
// }).catch(e => {
//   console.log('/error/get====catch：', e)
// })

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log('5秒后：', res)
  }).catch((e) => {
    console.log('5秒后：', e)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.config)
  console.log(e.code)
  console.log(e.request)
})
