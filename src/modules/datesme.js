const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate()
}

const bulans = (num) => {
  const arr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Novermber', 'Desember']
  if (num !== null || num !== 0 || num !== 'undefined') {
    return arr[num - 1]
  }
  return arr[0]
}

const months = () => {
  const arr = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Novermber', 'Desember']
  return arr
}

export {
  daysInMonth, bulans, months
}
