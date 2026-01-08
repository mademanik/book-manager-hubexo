package com.book.manager.backend.repository;

import com.book.manager.backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("""
                SELECT b FROM Book b
                WHERE (:q IS NULL OR 
                       LOWER(b.title) LIKE LOWER(CONCAT('%', :q, '%')) OR
                       LOWER(b.author) LIKE LOWER(CONCAT('%', :q, '%')))
            """)
    List<Book> search(@Param("q") String q);
}
