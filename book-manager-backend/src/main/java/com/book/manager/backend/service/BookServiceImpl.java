package com.book.manager.backend.service;

import com.book.manager.backend.dto.BookDTO;
import com.book.manager.backend.exception.NotFoundException;
import com.book.manager.backend.mapper.BookMapper;
import com.book.manager.backend.model.Book;
import com.book.manager.backend.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    @Override
    public List<BookDTO> findAll(String q) {
        List<Book> books = bookRepository.search(q);
        return books.stream()
                .map(bookMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public BookDTO findById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Book not found"));
        return bookMapper.toDto(book);
    }

    @Override
    public BookDTO create(BookDTO book) {
        Book bookEntity = bookMapper.toEntity(book);
        Book bookSaved = bookRepository.save(bookEntity);
        return bookMapper.toDto(bookSaved);
    }

    @Override
    public BookDTO update(Long id, BookDTO book) {
        Book bookEntity = bookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Book not found"));
        bookEntity.setTitle(book.getTitle());
        bookEntity.setAuthor(book.getAuthor());
        bookEntity.setIsbn(book.getIsbn());
        bookEntity.setPublicationYear(book.getPublicationYear());
        bookEntity.setGenre(book.getGenre());
        bookEntity.setDescription(book.getDescription());

        Book bookSaved = bookRepository.save(bookEntity);
        return bookMapper.toDto(bookSaved);
    }

    @Override
    public void delete(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Book not found"));
        bookRepository.delete(book);
    }
}
