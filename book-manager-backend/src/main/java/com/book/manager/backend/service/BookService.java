package com.book.manager.backend.service;

import com.book.manager.backend.dto.BookDTO;

import java.util.List;

public interface BookService {
    List<BookDTO> findAll(String q);

    BookDTO findById(Long id);

    BookDTO create(BookDTO book);

    BookDTO update(Long id, BookDTO book);

    void delete(Long id);
}
