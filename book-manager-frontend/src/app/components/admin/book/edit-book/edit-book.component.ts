import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BookService} from 'src/app/services/book.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: any },
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private dialogRef: MatDialogRef<EditBookComponent>
  ) {
  }

  bookForm: FormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    author: ['', Validators.required],
    isbn: ['', Validators.required],
    publicationYear: [null, Validators.required],
    genre: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getBookById(this.data.id);
  }

  getBookById(id: String) {
    this.bookService.findBookById(id).subscribe({
      next: (res) => {
        this.bookForm.setValue({
          id: res!.id,
          title: res!.title,
          author: res!.author,
          isbn: res!.isbn,
          publicationYear: res!.publicationYear,
          genre: res!.genre,
          description: res!.description,
        });
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  submit(): void {
    if (this.bookForm.valid) {

      const id = this.bookForm.get('id')?.value;
      const jsonData = this.bookForm.value;

      this.bookService.updateBook(id, jsonData).subscribe({
        next: (res) => {
          this.dialogRef.close({
            message: 'success',
          });
        },
        error: (err) => {
          this.dialogRef.close({
            message: 'error',
          });
          console.log(err);
        },
      });
    } else {
      this.dialogRef.close({
        message: 'invalid',
      });
    }
  }

}
