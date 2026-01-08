import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {BookService} from 'src/app/services/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  isEdit = false;
  dialogTitle = 'Add Book';
  submitLabel = 'Submit';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: any },
    private formBuilder: FormBuilder,
    private bookService: BookService,
    public dialogRef: MatDialogRef<AddBookComponent>
  ) {
  }

  bookForm: FormGroup = this.formBuilder.group({
    id: [this.data?.id || null],
    title: ['', Validators.required],
    author: ['', Validators.required],
    isbn: ['', Validators.required],
    publicationYear: [null, Validators.required],
    genre: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    this.isEdit = !!this.data?.id;
    this.dialogTitle = this.isEdit ? 'Edit Book' : 'Add Book';
    this.submitLabel = this.isEdit ? 'Update' : 'Submit';

    if(this.isEdit) {
      this.getBookById(this.data?.id);
    }
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

    if (!this.bookForm.valid) {
      this.bookForm.markAllAsTouched();

      const fields: Record<string, string> = {};
      const controls = this.bookForm.controls;

      if (controls['title']?.hasError('required')) fields['title'] = 'required';
      if (controls['author']?.hasError('required')) fields['author'] = 'required';
      if (controls['isbn']?.hasError('required')) fields['isbn'] = 'required';
      if (controls['isbn']?.hasError('pattern')) fields['isbn'] = 'Invalid ISBN format';
      if (controls['publicationYear']?.hasError('required')) fields['publicationYear'] = 'required';
      if (controls['genre']?.hasError('required')) fields['genre'] = 'required';
      if (controls['description']?.hasError('required')) fields['description'] = 'required';

      this.dialogRef.close({
        message: 'invalid',
        error: 'Validation failed',
        fields
      });
      return;
    }

    if (this.bookForm.valid) {
      const jsonData = this.bookForm.value;

      if(this.isEdit) {
        console.log('update book')
        const id = this.bookForm.get('id')?.value;
        this.bookService.updateBook(id, jsonData).subscribe({
          next: (res) => {
            this.dialogRef.close({
              message: 'success',
            });
          },
          error: (err) => {
            const apiErr = (err?.error || {}) as { fields?: Record<string, string>; message?: string; error?: string };
            this.dialogRef.close({
              message: 'error',
              error: apiErr.message ?? apiErr.error ?? 'Operation failed',
              fields: apiErr.fields ?? null
            });
            console.log(err);
          },
        });
      } else {
        console.log('create book')
        this.bookService.createBook(jsonData).subscribe({
          next: (res) => {
            this.dialogRef.close({
              message: 'success',
            });
          },
          error: (err) => {
            const apiErr = (err?.error || {}) as { fields?: Record<string, string>; message?: string; error?: string };
            this.dialogRef.close({
              message: 'error',
              error: apiErr.message ?? apiErr.error ?? 'Operation failed',
              fields: apiErr.fields ?? null
            });
            console.log(err);
          },
        });
      }
    } else {
      console.log('form invalid')
      this.dialogRef.close({
        message: 'invalid',
      });
    }
  }

}
