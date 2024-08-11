import { setToken, deleteToken } from 'boot/axios'

export const setHeaderToken = token => {
  return new Promise((resolve, reject) => {
    try {
      setToken(token)
      resolve(token)
    } catch (error) {
      reject(error)
    }
  })
}
export const setLocalToken = token => localStorage.setItem('token', JSON.stringify(token))
export const getLocalToken = () => JSON.parse(localStorage.getItem('token'))

export const setUser = user => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem('user', JSON.stringify(user))
      resolve(user)
    } catch (error) {
      reject(error)
    }
  })
}
export const getUser = () => JSON.parse(localStorage.getItem('user'))
export const deleteHeaderToken = () => deleteToken()
export const deleteLocalToken = () => localStorage.removeItem('token')
export const isBlocked = () => localStorage.getItem('blocked') === 'true'
export const setBlocked = value => localStorage.setItem('blocked', JSON.stringify(value))
export const deleteUser = () => localStorage.removeItem('user')
export const setTempData = data => localStorage.setItem('tempData', JSON.stringify(data))
export const getTempData = () => JSON.parse(localStorage.getItem('tempData'))
export const deleteTempData = () => localStorage.removeItem('tempData')

export const setCurrentApp = data => localStorage.setItem('currentApp', JSON.stringify(data))
export const deleteCurrentApp = () => localStorage.removeItem('currentApp')
export const getCurrentApp = () => JSON.parse(localStorage.getItem('currentApp'))

export const setApps = data => localStorage.setItem('apps', JSON.stringify(data))
export const getApps = () => JSON.parse(localStorage.getItem('apps'))
export const delApps = () => localStorage.removeItem('apps')
export const setAkses = data => localStorage.setItem('akses', JSON.stringify(data))
export const getAkses = () => JSON.parse(localStorage.getItem('akses'))
export const delAkses = () => localStorage.removeItem('akses')
export const delX = () => localStorage.removeItem('aplikasiX')

// presist pendaftaran
export const setAutoPend = data => localStorage.setItem('autoPend', JSON.stringify(data))
export const getAutoPend = () => JSON.parse(localStorage.getItem('autoPend'))
export const delAutoPend = () => localStorage.removeItem('autoPend')
export const delAPend = () => localStorage.removeItem('pendaftaranAutocomplete')

// time
export const setActiveTime = localStorage.setItem('activeTime', new Date())
export const getActiveTime = () => localStorage.getItem('activeTime')

// satset
export const setTokenSatset = data => localStorage?.setItem('satset', JSON.stringify(data))
export const getAuthSatset = () => JSON.parse(localStorage.getItem('satset'))
export const delAuthSatset = () => localStorage.removeItem('satset')

export const clearStore = () => localStorage.clear()
