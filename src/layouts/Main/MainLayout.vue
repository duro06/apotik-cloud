<template>
  <q-layout
    view="lHh Lpr lFf"
    :class="dark?'':'page-light'"
  >
  <!--
  :notif="notifStore?.unreadNotif"
  :loading-notif="notifStore.loading"
  :cabangs="dist?.cabangs"
  @toggle-left="toggleLeftDrawer"
  @handle-notif="handleNotif"
  -->
  <MainHeader
      :dark="dark"
      mobile
      class="print-hide"
    />
    <!-- menu bottom mobile -->
    <!-- v-if="mobile" -->
    <main-footer
      :dark="dark"
      :menus="setting.menus"
      class="print-hide"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { computed } from 'vue'

import MainHeader from './MainHeader.vue'
import MainFooter from './MainFooter.vue'
import { useSettingStore } from 'src/stores/settings/setting'
const $q = useQuasar()
const setting = useSettingStore()
const dark = computed(() => {
  return $q.dark.isActive
})

</script>
