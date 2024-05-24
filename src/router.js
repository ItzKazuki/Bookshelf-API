import { createBook, deleteBookById, editBookById, getBookById, getBooks } from "./handler.js";

const routers = [
  {
    method: 'GET',
    path: '/books',
    handler: getBooks
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookById
  },
  {
    method: 'POST',
    path: '/books',
    handler: createBook
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookById
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById
  },
];

export default routers;