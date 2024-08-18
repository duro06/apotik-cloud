<template>
  <div class="q-pa-sm">
    <div class="row full-width q-col-gutter-sm q-mb-xs items-center justify-between">
      <div class="col-auto" style="min-width: 100px; max-width: 50%;">
        <q-select v-model="store.selctModel"
        label="pilih tanggal"
        dense
        outlined
        clearable
        use-input
        input-debounce="400"
        :options="store.options"
        @update:model-value="selected"
        @filter="filterFn"
        @clear="clear"
        ></q-select>
      </div>
      <div class="col-auto">
        <q-btn
        dense
        label="Ambil Laporan Baru"
        color="primary"
        no-caps
        :loading="loadingKirimNotif"
        @click="bukaDialog"
        />
      </div>
    </div>
    <div class="row">
      <q-tabs
        v-model="store.tab"
        narrow-indicator
        class="bg-grey-3 text-primary q-ml-md print-hide'"
        active-color="white"
        active-bg-color="primary"
        indicator-color="primary"
        dense
      >
      <template v-for="ta in store.tabs" :key="ta">
        <q-tab :name="ta.name" :label="ta.label" no-caps />
      </template>

      </q-tabs>
    </div>
    <div>
      <q-tab-panels
        v-model="store.tab"
        animated
        transition-prev="slide-right"
        transition-next="slide-left"
      >
      <template v-for="ta in store.tabs" :key="ta">
        <q-tab-panel :name="ta.name">
          <laporanPage :laporan="ta?.laporan"/>
        </q-tab-panel>
      </template>
    </q-tab-panels>
    </div>
  </div>
  <tanggal v-model="buka" position="top" @ganti-periode="gantiPeriode"/>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { useReportStore } from 'src/stores/report/report'
import { defineAsyncComponent, onMounted, ref } from 'vue'
const laporanPage = defineAsyncComponent(() => import('src/pages/report/comp/LaporanPage.vue'))
const tanggal = defineAsyncComponent(() => import('src/pages/report/comp/PilihRangeTanggal.vue'))

const buka = ref(false)
const store = useReportStore()
// const tab = ref('semua')
// const tabs = ref([
//   { label: 'Semua', name: 'semua', laporan: {} }
// ])
// kirim notif
function bukaDialog () {
  buka.value = true
}
function gantiPeriode (val) {
  console.log('gantiPeriode', val)
  buka.value = false
  kirimNotif(val)
}
const loadingKirimNotif = ref(false)
// eslint-disable-next-line no-unused-vars
async function kirimNotif (val) {
  const param = {
    params: val
  }
  loadingKirimNotif.value = true
  await api.get('v1/report/send-notif-get-report', param)
    .then((resp) => {
      loadingKirimNotif.value = false
      console.log(resp?.data)

      notifSuccess(resp)
    })
    .catch(() => { loadingKirimNotif.value = false })
}
// select
function clear () {
  store.tabs = [
    { label: 'Semua', name: 'semua', laporan: {} }
  ]
}
function selected (val) {
  const ada = store.reports?.filter(f => f.tgl === val)
  store.makeReport(store.reports, val)
  console.log('selected', val, ada)
}
function filterFn (val, update) {
  const prevOpt = store.options
  if (val === '') {
    update(() => {
      store.options = prevOpt
    })
  }
  if (val?.length < 3) {
    update(() => {
      const needle = val.toLowerCase()
      store.options = prevOpt.filter(v => v.toLowerCase().indexOf(needle) > -1)
    })
  } else {
    update(() => {
      store.getSavedReports(val)
    })
  }
  console.log('selected', val)
}
onMounted(() => {
  store.getSavedReports()
})
</script>
