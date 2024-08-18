import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    menus: [
      {
        icon: 'dashboard',
        link: 'dashboard',
        name: 'dashboard',
        route: 'dashboard',
        submenus: [

        ],
        roles: ' root owner '
      },
      {
        icon: 'report',
        link: 'report',
        name: 'report',
        route: 'report',
        submenus: [

        ],
        roles: ' root owner '
      }
    ]
  })
})
