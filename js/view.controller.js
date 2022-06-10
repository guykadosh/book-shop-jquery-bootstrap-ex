'use strict'

// Render to user functions
function renderBooks() {
  const books = getBooks()

  const strHTMLs = books.map(
    book => `
          <tr data-id="${book.id}">
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td class="display-price" data-price="${book.price}">${book.price}$</td>
            <td class="text-center">
              <button 
              class="btn btn-outline-success btn-read" data-trans="read">Read</button>
              <button 
              class="btn btn-outline-warning btn-update" data-trans="update" data-bs-toggle="modal"
              data-bs-target="#input-modal">Update</button>
              <button 
               class="btn btn-outline-danger btn-delete" data-trans="delete">Delete</button>
            </td>
          </tr>`
  )

  $('.books-list').html(strHTMLs)

  addActionEvents()
  renderPagesBtns()
}

function addActionEvents() {
  $('.btn-read').on('click', onReadBook)
  $('.btn-update').on('click', onUpdateBookModal)
  $('.btn-delete').on('click', onRemoveBook)
}
function renderPagesBtns() {
  // get current num of pages
  const pages = getPagesNum()

  let strHTMLs = ''
  for (let i = 0; i <= pages; i++) {
    strHTMLs += `<li class="page-item" onclick="onSetPage(${i})"><a class="page-link page-${i}">${
      i + 1
    }</a></li>`
  }

  $('.btns-pages').html(strHTMLs)

  // render selected pgae
  const pageIdx = getPageIdx()
  $(`.page-${pageIdx}`).addClass('page-selected')
}

function renderByQueryStringParams() {
  // Retrieve data from the current query-params
  const queryStringParams = new URLSearchParams(window.location.search)

  const filterBy = {
    price: +queryStringParams.get('price') || 0,
    rate: +queryStringParams.get('rate') || 0,
    txt: queryStringParams.get('txt'),
  }

  setBookFilter(filterBy)

  $('.filter-by-price').val(filterBy.price)
  $('.filter-by-rate').val(filterBy.rate)
  $('.filter-by-txt').val(filterBy.txt)

  // handle when modal was open on specific book by id
  const bookId = queryStringParams.get('id')
  if (bookId) onReadBook(null, bookId)
}
