<template>
  <div class="q-pa-sm">
    <div class="f-16 q-mb-md">
      <span class="">Selamat Datang</span>
      <span class="q-mx-xs f-18 text-primary text-weight-bold">{{auth?.user?.name}}</span>
      <span class="">berikut highlite data 10 laporan terakhir diambil untuk semua cabang</span>
    </div>
    <div class="row text-weight-bold q-my-sm" style="border-bottom: 1px solid black">
      <div class="col-4">Tanggal</div>
      <div class="col-4">Periode data</div>
      <div class="col-4 text-right">Laba / Rugi</div>
    </div>
    <div v-for="rep in report.dashboards" :key="rep" class="row" style="border-bottom: 1px solid black">
      <div class="col-4">{{dateFull(rep?.tgl)}}</div>
      <div class="col-4">{{dateHalfFormat(rep?.header?.from)}} - {{dateHalfFormat(rep?.header?.to)}}</div>
      <div class="col-4 text-right" :class="rep?.labaRugi>0?'text-green':'text-negative'">{{formatDouble(rep?.labaRugi)}}</div>
      <!-- {{ rep }} -->
    </div>
  </div>
</template>
<script setup>
import { dateFull, dateHalfFormat, formatDouble } from 'src/modules/formatter'
import { useAuthStore } from 'src/stores/auth'
import { useReportStore } from 'src/stores/report/report'
import { onMounted } from 'vue'

// eslint-disable-next-line no-unused-vars
const report = useReportStore()
// eslint-disable-next-line no-unused-vars
const auth = useAuthStore()
onMounted(() => {
  report.getSavedReports()
})
</script>
