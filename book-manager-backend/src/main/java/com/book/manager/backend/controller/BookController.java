package com.book.manager.backend.controller;

import com.book.manager.backend.dto.BookDTO;
import com.book.manager.backend.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping
    public List<BookDTO> getAll(@RequestParam(required = false) String q) {
        return bookService.findAll(q);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookDTO create(@Valid  @RequestBody BookDTO dto) {
        return bookService.create(dto);
    }

    @GetMapping("/{id}")
    public BookDTO getById(@PathVariable Long id) {
        return bookService.findById(id);
    }

    @PutMapping("/{id}")
    public BookDTO updateById(@PathVariable Long id, @Valid @RequestBody BookDTO dto) {
        return bookService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable Long id) {
        bookService.delete(id);
    }
}
