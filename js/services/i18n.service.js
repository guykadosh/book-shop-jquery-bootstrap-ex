'use strict'

const CURRENCY = 3.34 // US$ to NIS

let gTrans = {
  heading: {
    en: '馃悰 BookWorm backoffice',
    es: 'Oficina administrativa de BookWorm 馃悰',
    he: ' 馃悰诪砖专讚 讗讞讜专讬 - 转讜诇注转 住驻专讬诐 ',
  },
  'filter-by': {
    en: 'Filter By:',
    es: 'Filtrado por',
    he: '住谞谉 诇驻讬:',
  },
  'max-price': {
    en: 'Max price',
    es: 'Precio m谩ximo',
    he: '诪讞讬专 诪拽住讬诪诇讬',
  },
  'min-rate': {
    en: 'Min rate',
    es: 'Tasa m铆nima',
    he: '讚讬专讜讙 诪讬谞讬诪讗诇讬',
  },
  'filter-txt': {
    en: 'Start typing...',
    es: 'Empieza a escribir...',
    he: '讛拽诇讚 讻讗谉...',
  },
  'sort-by': {
    en: 'Sort By:',
    es: 'Empieza a escribir...',
    he: '诪讬讬谉 诇驻讬:',
  },
  'select-sorting': {
    en: 'Select Sorting',
    es: 'Seleccionar clasificaci贸n',
    he: '讘讞专 诪讬讜谉',
  },
  title: {
    en: 'Title',
    es: 'T铆tulo',
    he: '讻讜转专转',
  },
  price: {
    en: 'Price',
    es: 'Precio',
    he: '诪讞讬专',
  },
  'add-book': {
    en: 'Add book',
    es: 'A帽adir libro',
    he: '讛讜住祝 住驻专',
  },
  'update-book': {
    en: 'Update book',
    es: 'Actualizar libro',
    he: '注讚讻谉 住驻专',
  },
  add: {
    en: 'Add',
    es: 'Aggregar',
    he: '讛讜住祝',
  },
  update: {
    en: 'Update',
    es: 'Actualizar',
    he: '注讚讻谉',
  },
  read: {
    en: 'Read',
    es: 'Leer',
    he: '拽专讗 注讜讚',
  },
  delete: {
    en: 'Delete',
    es: 'Borrar',
    he: '诪讞拽',
  },
  'title-placeholder': {
    en: 'Enter book title',
    es: 'Introduzca el t铆tulo del libro',
    he: '讛讻谞住 砖诐 砖诇 讛住驻专',
  },
  'price-placeholder': {
    en: 'Enter price',
    es: 'Introduce el precio',
    he: '讛讻谞住 诪讞讬专',
  },
  id: {
    en: 'Id',
    es: 'Id',
    he: '诪讝讛讛',
  },
  actions: {
    en: 'Actions',
    es: 'Comportamiento',
    he: '驻注讜诇讜转',
  },
  rating: {
    en: 'Rating',
    es: 'Clasificaci贸n',
    he: '讚讬专讜讙',
  },
  close: {
    en: 'Close',
    es: 'Cerca',
    he: '住讙讜专',
  },
}

let gCurrLang = 'en'

function getTrans(transKey) {
  let keyTrans = gTrans[transKey]
  if (!keyTrans) return 'UNKNOWN'

  let txt = keyTrans[gCurrLang] // he
  if (!txt) txt = keyTrans.en

  return txt
}

function doTrans() {
  const els = document.querySelectorAll('[data-trans]')
  els.forEach(el => {
    let transKey = el.dataset.trans
    let txt = getTrans(transKey)

    if (el.localName === 'input') {
      el.setAttribute('placeholder', txt)
      // el.placeholder = txt
    } else el.innerText = txt
  })

  if (gCurrLang === 'he') {
    $('.display-price').each(function () {
      $(this).text(formatCurrency($(this).data('price') * CURRENCY))
    })
  }
}

function setLang(lang) {
  gCurrLang = lang // he
}

function formatNumOlder(num) {
  return num.toLocaleString('es')
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
  }).format(num)
}

function formatDate(time) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

function kmToMiles(km) {
  return km / 1.609
}
