import { Notify, Loading, QSpinnerCube } from 'quasar'
import { routerInstance } from 'boot/router'
import * as storage from 'src/modules/storage'

const removeToken = () => {
  // caches.delete()
  storage.clearStore()
  storage.deleteLocalToken()
  storage.deleteHeaderToken()
  storage.deleteUser()
  storage.deleteCurrentApp()
  routerInstance.replace('/login')
}

const notifErr = (resp) => {
  // const msg = resp ? resp.data.message : 'Ada Kesalahan, Harap ulangi!'
  // console.log('before utility', resp.response)

  console.log('utility', resp)
  const status = (resp === 'undefined' || resp === undefined) ? 500 : resp?.status
  const statusText = (resp === 'undefined' || resp === undefined) ? 500 : resp?.statusText
  const statusMsg = (resp === 'undefined' || resp === undefined) ? 500 : resp?.data ? resp?.data?.message : 'ER'

  // unauthenticated
  if (status === 401 || statusText === 'Unauthorized' || statusMsg === 'Unauthenticated.') {
    console.log('remove token', resp.status)
    return removeToken()
  }

  //   if (status === 200) {

  if (status === 402) {
    console.log('anyar mas', resp)
    storage.setLocalToken(resp.data.token)
    localStorage.setItem('token2', resp.data.token)
    // return next()resp.status
    if (resp.config.url !== '/v1/auth/profile') {
      Notify.create({
        message: 'ada kesalahan, harap ulangi',
        icon: 'icon-eva-message-circle-outline',
        position: 'bottom-right',
        color: 'negative',
        actions: [
          {
            label: 'Dismiss',
            color: 'yellow',
            handler: () => {
              /* console.log('wooow') */
            }
          }
        ]
      })
    };
  } else if (status === 422) {
    const keys = Object.keys(resp.data)
    // const msgs = resp.data.message
    console.log('keys', keys)
    keys.forEach(msgkeys => {
      if (msgkeys === 'errors') {
        const key = Object.keys(resp.data[msgkeys])
        console.log('key', key)
        key.forEach(msgkey => {
          resp.data[msgkeys][msgkey].forEach(data => {
            Notify.create({
              message: data,
              icon: 'icon-eva-message-circle-outline',
              position: 'top-right',
              color: 'negative',
              actions: [
                { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
              ]
              // for (const key in msgs) {
              // }
            })
          })
        })
      } else {
        if (msgkeys !== 'nomor') {
          Notify.create({
            message: resp.data[msgkeys],
            icon: 'icon-eva-message-circle-outline',
            position: 'top-right',
            color: 'negative',
            actions: [
              { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
            ]
          // for (const key in msgs) {
          // }
          })
        }
      }
    })
  } else if (status === 409) {
    const msgs = resp.data.message
    Notify.create({
      message: msgs,
      icon: 'icon-eva-message-circle-outline',
      position: 'top-right',
      color: 'negative',
      actions: [
        { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
      ]
    })
  } else if (status === 417) {
    const keys = Object.keys(resp.data)
    // const msgs = resp.data.message
    console.log('keys', keys)
    keys.forEach(msgkeys => {
      if (msgkeys === 'error') {
        const key = Object.keys(resp.data[msgkeys])
        console.log('key', key)
        key.forEach(msgkey => {
          resp.data[msgkeys][msgkey].forEach(data => {
            Notify.create({
              message: data,
              icon: 'icon-eva-message-circle-outline',
              position: 'top-right',
              color: 'negative',
              actions: [
                { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
              ]
              // for (const key in msgs) {
              // }
            })
          })
        })
      } else {
        if (msgkeys !== 'nomor') {
          Notify.create({
            message: resp.data[msgkeys],
            icon: 'icon-eva-message-circle-outline',
            position: 'top-right',
            color: 'negative',
            actions: [
              { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
            ]
          // for (const key in msgs) {
          // }
          })
        }
      }
    })
  } else if (status === 500) {
    let msgs = 'Ada Kesalahan Harap ulangi'
    if (resp.data) {
      console.log('rsp data msg', resp?.data?.message)
      if (resp?.data?.message?.includes('https://apijkn.bpjs-kesehatan.go.id')) msgs = 'Error Bridging BPJS'
      else if (resp?.data?.message?.includes('simrs/events?auth_key=simrs_key_harry141312&auth_')) msgs = 'Error Event Notifikasi Simrs'
      else msgs = resp.data.message ? resp.data.message : 'Ada Kesalahan Harap ulangi'
    }
    Notify.create({
      message: msgs,
      icon: 'icon-eva-message-circle-outline',
      position: 'top-right',
      color: 'negative',
      actions: [
        { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
      ]
    })
  } else {
    const msgs = resp.data ? resp.data.message : 'NETWOR ERROR SERVER TIDAK MERESPON'
    Notify.create({
      message: msgs,
      icon: 'icon-eva-message-circle-outline',
      position: 'top-right',
      color: 'negative',
      actions: [
        { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
      ]
    })
  }
}
const notifSuccess = (resp) => {
  const msg = resp ? resp.data.message : 'Sucees!, Wow Kerja Bagus!'
  Notify.create({
    message: msg || 'Sucees!, Wow Kerja Bagus!',
    icon: 'icon-mat-thumb_up_off_alt',
    position: 'top-right',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifErrVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'icon-eva-message-circle-outline',
    position: 'top-right',
    color: 'negative',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifInfVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'icon-eva-message-circle-outline',
    position: 'top-right',
    color: 'info',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}
const notifSuccessVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'icon-mat-thumb_up_off_alt',
    position: 'top-right',
    actions: [
      { label: 'Dismiss', color: 'yellow', handler: () => { /* console.log('wooow') */ } }
    ]
  })
}

const waitLoad = (cond) => {
  if (cond === 'show') {
    Loading.show({
      message: 'Harap bersabar. Menunggu...',
      boxClass: 'bg-dark text-white',
      spinner: QSpinnerCube,
      // spinnerColor: 'yellow',
      spinnerSize: 30
    })
  } else {
    Loading.hide()
  }
}

const notifNegativeCenterVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'icon-eva-message-circle-outline',
    position: 'center',
    color: 'negative',
    actions: [
      {
        label: 'Dismiss',
        color: 'yellow',
        handler: () => {
          /* console.log('wooow') */
        }
      }
    ]
  })
}
const uniqueId = () => {
  const dateString = Date.now().toString(36)
  const randomness = Math.random().toString(36).substring(2, 7)
  return dateString + randomness
}

const filterDuplicateArrays = (array) => {
  const data = array.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
  return data
}

const filterDuplicateArraysInArrays = (array) => {
  const anu = []
  array.forEach(a => {
    const data = a.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    // console.log('a ', a)
    if (data.length) {
      data.forEach(b => {
        anu.push(b)
      })
    }
  })
  // console.log('arrays ', array, 'anu ', anu)
  const apem = anu.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
  return apem
}

const findWithAttr = (array, attr, value) => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i
    }
  }
  return -1
}

const changeArrayIndex = (array, from, to) => {
  const toIn = array.indexOf(to)
  const fromIn = array.indexOf(from)
  const element = array?.splice(fromIn, 1)[0]
  array?.splice(toIn, 0, element)
}

const notifCenterVue = (msg) => {
  Notify.create({
    message: msg,
    icon: 'icon-eva-message-circle-outline',
    position: 'center',
    color: 'primary',
    actions: [
      {
        label: 'Dismiss',
        color: 'yellow',
        handler: () => {
          /* console.log('wooow') */
        }
      }
    ]
  })
}

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate()
}

const loadingBlock = (cond) => {
  if (cond === 'show') {
    Loading.show({
      message: '<div class="f-20">Harap bersabar </br> Mengirim data Ke <strong>BPJS</strong><div class="__dot f-24"></div></div>',
      boxClass: 'bg-dark text-white box-anyar',
      html: true,
      spinner: QSpinnerCube,
      // spinnerColor: 'yellow',
      spinnerSize: 50
    })
  } else {
    Loading.hide()
  }
}

const inputMustNumber = (value) => {
  const temp = !isNaN(parseFloat(value)) ? parseFloat(value) : 0
  // console.log('inputMustNumber', value, temp)
  return temp
}

export {
  daysInMonth,
  notifCenterVue,
  notifSuccess,
  uniqueId,
  notifErr,
  notifErrVue,
  notifSuccessVue,
  waitLoad,
  filterDuplicateArrays,
  findWithAttr,
  changeArrayIndex,
  notifNegativeCenterVue,
  removeToken,
  filterDuplicateArraysInArrays,
  loadingBlock,
  notifInfVue,
  inputMustNumber
}
