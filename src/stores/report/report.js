import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { filterDuplicateArrays } from 'src/modules/utils'

export const useReportStore = defineStore('report_store', {
  state: () => ({
    tab: 'semua',
    tabs: [
      { label: 'Semua', name: 'semua', laporan: {} }
    ],
    loadingKirimNotif: false,
    loadingAmbil: false,
    reports: [],
    options: [],
    selctModel: ''
  }),
  actions: {
    getSavedReports (val) {
      const param = {
        params: {
          q: val
        }
      }
      this.loadingAmbil = true

      return new Promise(resolve => {
        api.get('v1/report/get-saved-report', param)
          .then(resp => {
            this.loadingAmbil = false
            console.log('resports', resp?.data)
            const tgl = resp?.data.map(m => m.tgl)
            this.options = filterDuplicateArrays(tgl)
            this.selctModel = tgl[0]
            this.reports = resp?.data
            this.makeReport(resp?.data, tgl[0])
            resolve(resp?.data)
          })
          .catch(() => { this.loadingAmbil = false })
      })
    },
    // make report
    makeReport (val, tgl) {
      this.tabs = [
        { label: 'Semua', name: 'semua', laporan: {} }
      ]
      const report = val
      console.log('tgl', tgl)
      if (report?.length) {
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
            const temp = report.find(fi => fi.kodecabang === cab && fi.tgl === tgl)
            if (temp) {
              const mau = {
                label: temp?.cabang?.namacabang,
                name: temp?.kodecabang,
                laporan: temp?.laporan
              }
              this.tabs.push(mau)
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
          const anu = this.tabs.find(f => f.name === 'semua')
          if (anu) anu.laporan = laporan
        }
      }
    }
  }
})
