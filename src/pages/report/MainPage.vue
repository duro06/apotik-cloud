<template>
  <div class="q-pa-sm">
    <div class="row full-width q-col-gutter-sm q-mb-xs items-center">
      <div class="col-auto">pilihan</div>
      <div class="col-auto">
        <q-btn
        dense
        label="Ambil Laporan Baru"
        color="primary"
        no-caps
        :loading="loadingKirimNotif"
        @click="kirimNotif"
        />
      </div>
    </div>
    <div class="row">
      <q-tabs
        v-model="tab"
        narrow-indicator
        class="bg-grey-3 text-primary q-ml-md print-hide'"
        active-color="white"
        active-bg-color="primary"
        indicator-color="primary"
        dense
      >
      <template v-for="ta in tabs" :key="ta">
        <q-tab :name="ta.name" :label="ta.label" no-caps />
      </template>

      </q-tabs>
    </div>
    <div>
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="slide-right"
        transition-next="slide-left"
      >
      <template v-for="ta in tabs" :key="ta">
        <q-tab-panel :name="ta.name">
          <laporanPage/>
        </q-tab-panel>
      </template>
    </q-tab-panels>
    </div>
  </div>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { defineAsyncComponent, ref } from 'vue'
const laporanPage = defineAsyncComponent(() => import('src/pages/report/comp/LaporanPage.vue'))
const tab = ref('semua')
const tabs = [
  { label: 'Semua', name: 'semua' }
]
// kirim notif
const loadingKirimNotif = ref(false)
async function kirimNotif () {
  loadingKirimNotif.value = true
  await api.get('v1/report/send-notif-get-report')
    .then((resp) => {
      loadingKirimNotif.value = false
      console.log(resp?.data)

      notifSuccess(resp)
    })
    .catch(() => { loadingKirimNotif.value = false })
}
</script>
