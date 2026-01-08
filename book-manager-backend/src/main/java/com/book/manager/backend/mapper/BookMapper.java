package com.book.manager.backend.mapper;

import com.book.manager.backend.dto.BookDTO;
import com.book.manager.backend.model.Book;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookMapper {
    BookDTO toDto(Book book);
    Book toEntity(BookDTO dto);
}
