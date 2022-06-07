//TODO: use jQUERY

let gTrans = {
  heading: {
    en: '🐛 BookWorm backoffice',
    es: 'Oficina administrativa de BookWorm 🐛',
    he: ' 🐛משרד אחורי - תולעת ספרים ',
  },
  'filter-by': {
    en: 'Filter By:',
    es: 'Filtrado por',
    he: 'סנן לפי:',
  },
  'max-price': {
    en: 'Max price',
    es: 'Precio máximo',
    he: 'מחיר מקסימלי',
  },
  'min-rate': {
    en: 'Min rate',
    es: 'Tasa mínima',
    he: 'דירוג מינימאלי',
  },
  'filter-txt': {
    en: 'Start typing...',
    es: 'Empieza a escribir...',
    he: 'הקלד כאן...',
  },
  'sort-by': {
    en: 'Sort By:',
    es: 'Empieza a escribir...',
    he: 'מיין לפי:',
  },
  'select-sorting': {
    en: 'Select Sorting',
    es: 'Seleccionar clasificación',
    he: 'בחר מיון',
  },
  title: {
    en: 'Title',
    es: 'Título',
    he: 'כותרת',
  },
  price: {
    en: 'Price',
    es: 'Precio',
    he: 'מחיר',
  },
  'add-book': {
    en: 'Add book',
    es: 'Añadir libro',
    he: 'הוסף ספר',
  },
  'update-book': {
    en: 'Update book',
    es: 'Actualizar libro',
    he: 'עדכן ספר',
  },
  add: {
    en: 'Add',
    es: 'Aggregar',
    he: 'הוסף',
  },
  update: {
    en: 'Update',
    es: 'Actualizar',
    he: 'עדכן',
  },
  read: {
    en: 'Read',
    es: 'Leer',
    he: 'קרא עוד',
  },
  delete: {
    en: 'Delete',
    es: 'Borrar',
    he: 'מחק',
  },
  'title-placeholder': {
    en: 'Enter book title',
    es: 'Introduzca el título del libro',
    he: 'הכנס שם של הספר',
  },
  'price-placeholder': {
    en: 'Enter price',
    es: 'Introduce el precio',
    he: 'הכנס מחיר',
  },
  id: {
    en: 'Id',
    es: 'Id',
    he: 'מזהה',
  },
  actions: {
    en: 'Actions',
    es: 'Comportamiento',
    he: 'פעולות',
  },
  rating: {
    en: 'Rating',
    es: 'Clasificación',
    he: 'דירוג',
  },
  close: {
    en: 'Close',
    es: 'Cerca',
    he: 'סגור',
  },
}

let gCurrLang = 'en'
const gCurrency = 3.34

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
    document
      .querySelectorAll('.display-price')
      .forEach(
        el => (el.innerText = formatCurrency(+el.dataset.price * gCurrency))
      )
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
