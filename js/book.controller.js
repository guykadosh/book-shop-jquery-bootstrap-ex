'use strict'

// TODO: FIX RTL
// TODO: FLASH ALERT

let gDesc = -1

$(init)

function init() {
  renderByQueryStringParams()
  renderBooks()
  doTrans()
  addEventListeners()
}

// Adds all event listeners
function addEventListeners() {
  $('.filter-by-price').on('change', onSetFilterByPrice)
  $('.filter-by-rate').on('change', onSetFilterByRate)
  $('.filter-by-txt').on('input', onSetFilterByTxt)
  $('.sort-desc').on('input', onSetSortBy)
  $('.sort-by').on('change', onSetSortBy)
  $('.select-lang').on('change', onSetLang)
  $('.btn-add-book').on('click', onAddBookModal)
  $('.btn-close').on('click', onCloseModal)
  $('.btn-rate').on('click', onUpdateRate)
  $('.next').on('click', onChangePage)
  $('.prev').on('click', onChangePage)
}

// handle add/remove/update book events
function onRemoveBook() {
  const bookId = $(this).closest('tr').data('id')

  // Model
  removeBook(bookId)

  // DOM
  renderBooks()
}

function onAddBook() {
  const title = $('[name="title"]').val()
  const price = $('[name="price"]').val()

  // returns when no title input (price will generate randomaly)
  if (!title) return

  // Model
  addBook(title, price)

  // DOM
  renderBooks()
}

function onAddBookModal() {
  $('[name="title"]').val('')
  $('[name="title"]').attr('readonly', false)

  $('.input-modal-title').text('Add Book')
  $('.input-modal-btn').text('Add Book')
  $('.input-modal-btn').on('click', onAddBook)
}

function onUpdateBook(bookId) {
  const bookPrice = $('[name="price"]').val()
  const book = getBookById(bookId)

  if (book.price === bookPrice || !bookPrice) return

  // Model
  updateBook(bookId, bookPrice)

  // DOM
  renderBooks()
}

function onUpdateBookModal() {
  const bookId = $(this).closest('tr').data('id')
  const book = getBookById(bookId)

  $('[name="title"]').val(book.title).attr('readonly', true)
  $('.input-modal-title').text('Update Book')
  $('.input-modal-btn').text('Update Book')
  $('.input-modal-btn').on('click', () => {
    onUpdateBook(bookId)
  })
}

function onUpdateRate() {
  const diff = +$(this).data('diff')
  console.log(diff)
  const $elModal = $('.modal-read')
  const $elRate = $('.book-rate')
  const bookId = $elModal.data('id')
  const book = getBookById(bookId)

  if ((book.rate === 0 && diff === -1) || (book.rate === 10 && diff === 1)) {
    return
  }

  // Model
  updateRate(bookId, diff)

  // DOM
  $elRate.text(book.rate)
  // elRate.innerText = updateRate(bookId, diff).rate
}

function onSetFilterByPrice() {
  console.log(this.value)
  onSetFilterBy({ price: this.value })
}

function onSetFilterByRate() {
  onSetFilterBy({ rate: this.value })
}

function onSetFilterByTxt() {
  onSetFilterBy({ txt: this.value })
}

// Handle sort and filter events
function onSetFilterBy(filterBy) {
  filterBy = setBookFilter(filterBy)

  renderBooks()
  doTrans()

  setQueryStringParams()
}

function onSetSortBy() {
  const prop = $('.sort-by').val()
  const isDesc = $('.sort-desc').prop('checked')

  console.log(prop, isDesc)

  const sortBy = {}
  sortBy[prop] = isDesc ? -1 : 1

  setBookSort(sortBy)
  renderBooks()
  doTrans()
}

function onSetSortByClick(elHead) {
  const prop = elHead.dataset.sort

  gDesc *= -1

  const sortBy = {
    [prop]: gDesc,
  }

  elHead.querySelector('span').innerText = gDesc === 1 ? '↑' : '↓'

  setBookSort(sortBy)
  renderBooks()
  doTrans()
}

// Handle description Modal
function onReadBook(ev = null, bookId = null) {
  console.log($(this).closest('tr').data('id'))
  if (!bookId) bookId = $(this).closest('tr').data('id')
  console.log(bookId)
  const book = getBookById(bookId)

  const $elModal = $('.modal-read')

  // Set id as data(for updating rate later)
  $elModal.data('id', bookId)
  console.log($elModal.data('id'))

  // Update DOM accordinly
  $('.book-id').text(book.id)
  $('.book-rate').text(book.rate)
  $('.book-title').text(book.title)
  $('.book-price').text(book.price)
  $('.book-desc').text(book.desc)

  $elModal.addClass('open')

  setQueryStringParams(bookId)
}

function onCloseModal() {
  $('.modal-read').removeClass('open')

  setQueryStringParams()
}

// Handle pages events
function onChangePage(diff) {
  diff = +$(this).data('page')

  // Get curr page and num of pages
  const pageIdx = getPageIdx()
  const pages = getPagesNum()

  // if there is only 1 page do nothing
  if (
    !pages ||
    (diff === 1 && pageIdx === pages) ||
    (diff === -1 && !pageIdx)
  ) {
    return
  }

  // Change curr page
  changePage(diff)

  renderBooks()
  doTrans()
}

function onSetPage(page) {
  setPage(page)

  renderBooks()
  doTrans()
}

function onSetLang() {
  console.log('i got called')
  const lang = this.value

  if (!lang) return

  setLang(lang)

  if (lang === 'he') $('body').addClass('rtl')
  else $('body').removeClass('rtl')

  renderBooks()
  doTrans()
}
