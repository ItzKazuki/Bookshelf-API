import { nanoid } from "nanoid";
import books from "./books.js";
import { validateRequest, response } from "./utils.js";

const createBook = (req, h) => {
  // create new book here
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  const [success, error] = validateRequest(newBook, 'create');

  if (!success) return response(h, {
    status: 'fail',
    message: error
  }, 400)

  books.push(newBook);

  if (books.filter(book => book.id === id).length > 0) {
    // send success message
    return response(h, {
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    }, 201)
  }

  // send error message
  return response(h, {
    status: "fail",
    message: "Buku gagal ditambahkan",
  }, 404);
};

const getBooks = (req, h) => {
  const { name, reading, finished } = req.query;

  if (Object.keys(req.query).length !== 0) {
    let filterBooks;

    // akan error jika query > 2 kek name="dicoding"&reading=1
    if (name !== undefined) filterBooks = books.filter(book => {
      const normalizedName = book.name.toLowerCase();
      return normalizedName.includes(name.toLowerCase());
    });

    // cek dulu reading nya true or false
    if (reading !== undefined) {
      filterBooks = books.filter(book => book.reading == reading);
      // if(reading != true || reading != false) filterBooks = books;
    }

    if (finished !== undefined) {
      filterBooks = books.filter(book => book.finished == finished);
      // if(finished != true || finished != false) filterBooks = books;
    }

    filterBooks = filterBooks.map(({ id, name, publisher }) => {
      return {
        id, name, publisher
      }
    })

    return response(h, {
      status: 'success',
      data: {
        books: filterBooks
      }
    }, 200);
  }

  const res = books.map(({ id, name, publisher }) => {
    return {
      id, name, publisher
    }
  })
  return response(h, {
    status: 'success',
    data: {
      books: res
    }
  }, 200);
};

const getBookById = (req, h) => {
  // get book from spesific id
  const { id } = req.params;

  const book = books.filter(book => book.id === id)[0];

  if (book !== undefined) return {
    status: 'success',
    data: {
      book
    }
  }

  return response(h, {
    status: 'fail',
    message: 'Buku tidak ditemukan'
  }, 404)
};

const editBookById = (req, h) => {
  // edit book by spesific id
  const { id } = req.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  //validate data
  const [success, error] = validateRequest({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  }, 'update');

  if (!success) return response(h, {
    status: 'fail',
    message: error
  }, 400)

  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    // TODO: update this logic update object value
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt
    };

    return response(h, {
      status: 'success',
      message: 'Buku berhasil diperbarui'
    }, 200);
  }

  return response(h, {
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  }, 404);
};

const deleteBookById = (req, h) => {
  // delete book by spesific id
  const { id } = req.params;

  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);

    return response(h, {
      status: 'success',
      message: 'Buku berhasil dihapus'
    }, 200);
  }

  return response(h, {
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  }, 404)
};

export {
  createBook,
  getBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
