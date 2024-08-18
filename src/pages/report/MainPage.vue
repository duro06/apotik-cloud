<template>
  <div class="q-pa-sm">
    <div class="row full-width q-col-gutter-sm q-mb-xs items-center justify-between">
      <div class="col-auto" style="min-width: 100px; max-width: 50%;">
        <q-select v-model="selctModel"
        label="pilih tanggal"
        dense
        outlined
        clearable
        use-input
        input-debounce="400"
        :options="options"
        @update:model-value="selected"
        @filter="filterFn"
        ></q-select>
      </div>
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
          <laporanPage :laporan="ta?.laporan"/>
        </q-tab-panel>
      </template>
    </q-tab-panels>
    </div>
  </div>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { filterDuplicateArrays, notifSuccess } from 'src/modules/utils'
import { defineAsyncComponent, onMounted, ref } from 'vue'
const laporanPage = defineAsyncComponent(() => import('src/pages/report/comp/LaporanPage.vue'))
const tab = ref('semua')
const tabs = ref([
  { label: 'Semua', name: 'semua', laporan: {} }
])
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
// ambil laporan yang sudah ada
const loadingAmbil = ref(false)
const reports = ref([])
function getSavedReports (val) {
  const param = {
    params: {
      q: val
    }
  }
  loadingAmbil.value = true
  return new Promise(resolve => {
    api.get('v1/report/get-saved-report', param)
      .then(resp => {
        loadingAmbil.value = false
        console.log('resports', resp?.data)
        makeReport(resp?.data)
        resolve(resp?.data)
      })
      .catch(() => { loadingAmbil.value = false })
  })
}
// make report
function makeReport (val) {
  const report = val
  if (report?.length) {
    const tgl = report.map(m => m.tgl)
    options.value = filterDuplicateArrays(tgl)
    const kodecabang = filterDuplicateArrays(report.map(m => m.kodecabang))
    const laporan = {}
    const keyLaporan = Object.keys(report[0]?.laporan)
    if (keyLaporan?.length) {
      laporan.masterBeban = []
      keyLaporan.forEach(key => {
        if (key === 'masterBeban') {
          report[0]?.laporan?.masterBeban.forEach(la => {
            const bebebe = {
              id: la.id,
              nama: la.nama,
              total: 0
            }
            laporan.masterBeban.push(bebebe)
          })
        } else laporan[key] = 0
      })
    }
    if (kodecabang.length) {
      kodecabang.forEach(cab => {
        const temp = report.find(fi => fi.kodecabang === cab)
        if (temp) {
          const mau = {
            label: temp?.cabang?.namacabang,
            name: temp?.kodecabang,
            laporan: temp?.laporan
          }
          tabs.value.push(mau)
          console.log('kodecabang', mau)
          const keys = Object.keys(temp?.laporan)
          if (keys.length) {
            keys.forEach(key => {
              if (key === 'masterBeban') {
                temp?.laporan?.masterBeban?.forEach(beb => {
                  const beban = laporan?.masterBeban.find(f => f.id === beb.id)
                  if (beban) {
                    beban.total += beb.total
                  }
                })
              } else laporan[key] += temp?.laporan[key]
            })
          }
        }
      })
      const anu = tabs.value.find(f => f.name === 'semua')
      if (anu) anu.laporan = laporan
    }
  }
  reports.value = val
}
// buat select
const selctModel = ref('')
const options = ref([])
function selected (val) {
  const ada = reports.value?.filter(f => f.tgl === val)
  console.log('selected', val, ada)
}
function filterFn (val, update) {
  const prevOpt = options.value
  if (val === '') {
    update(() => {
      options.value = prevOpt
    })
  }
  if (val?.length < 3) {
    update(() => {
      const needle = val.toLowerCase()
      options.value = prevOpt.filter(v => v.toLowerCase().indexOf(needle) > -1)
    })
  } else {
    update(() => {
      getSavedReports(val)
    })
  }
  console.log('selected', val)
}
onMounted(() => {
  getSavedReports()
})
</script>
