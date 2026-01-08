package com.book.manager.backend.service;

import com.book.manager.backend.dto.BookDTO;
import com.book.manager.backend.exception.NotFoundException;
import com.book.manager.backend.mapper.BookMapper;
import com.book.manager.backend.model.Book;
import com.book.manager.backend.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class BookServiceImplTest {

    @Mock
    private BookRepository bookRepository;

    @Mock
    private BookMapper bookMapper;

    @InjectMocks
    private BookServiceImpl bookService;

    private Book bookEntity;
    private BookDTO bookDTO;

    @BeforeEach
    void setUp() {
        bookEntity = new Book();
        bookEntity.setId(1L);
        bookEntity.setTitle("Clean Code");
        bookEntity.setAuthor("Robert Martin");
        bookEntity.setIsbn("9780132350884");
        bookEntity.setPublicationYear(2008);

        bookDTO = new BookDTO();
        bookDTO.setId(1L);
        bookDTO.setTitle("Clean Code");
        bookDTO.setAuthor("Robert Martin");
        bookDTO.setIsbn("9780132350884");
        bookDTO.setPublicationYear(2008);
    }

    // ================= FIND ALL =================
    @Test
    void shouldReturnListOfBooks_whenFindAll() {
        when(bookRepository.search("clean")).thenReturn(List.of(bookEntity));
        when(bookMapper.toDto(bookEntity)).thenReturn(bookDTO);

        List<BookDTO> result = bookService.findAll("clean");

        assertEquals(1, result.size());
        assertEquals("Clean Code", result.get(0).getTitle());
        verify(bookRepository).search("clean");
        verify(bookMapper).toDto(bookEntity);
    }

    // ================= FIND BY ID =================
    @Test
    void shouldReturnBook_whenFindByIdExists() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(bookEntity));
        when(bookMapper.toDto(bookEntity)).thenReturn(bookDTO);

        BookDTO result = bookService.findById(1L);

        assertEquals("Clean Code", result.getTitle());
        verify(bookRepository).findById(1L);
    }

    @Test
    void shouldThrowNotFoundException_whenFindByIdNotExists() {
        when(bookRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class,
                () -> bookService.findById(1L));
    }

    // ================= CREATE =================
    @Test
    void shouldCreateBookSuccessfully() {
        when(bookMapper.toEntity(bookDTO)).thenReturn(bookEntity);
        when(bookRepository.save(bookEntity)).thenReturn(bookEntity);
        when(bookMapper.toDto(bookEntity)).thenReturn(bookDTO);

        BookDTO result = bookService.create(bookDTO);

        assertEquals("Clean Code", result.getTitle());
        verify(bookRepository).save(bookEntity);
    }

    // ================= UPDATE =================
    @Test
    void shouldUpdateBookSuccessfully() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(bookEntity));
        when(bookRepository.save(bookEntity)).thenReturn(bookEntity);
        when(bookMapper.toDto(bookEntity)).thenReturn(bookDTO);

        BookDTO result = bookService.update(1L, bookDTO);

        assertEquals("Clean Code", result.getTitle());
        verify(bookRepository).save(bookEntity);
    }

    @Test
    void shouldThrowNotFoundException_whenUpdateBookNotExists() {
        when(bookRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class,
                () -> bookService.update(1L, bookDTO));
    }

    // ================= DELETE =================
    @Test
    void shouldDeleteBookSuccessfully() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(bookEntity));

        bookService.delete(1L);

        verify(bookRepository).delete(bookEntity);
    }

    @Test
    void shouldThrowNotFoundException_whenDeleteBookNotExists() {
        when(bookRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class,
                () -> bookService.delete(1L));
    }
}
