import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
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
export class AddBookComponent {
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    public dialogRef: MatDialogRef<AddBookComponent>
  ) {
  }

  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    isbn: ['', Validators.required],
    publicationYear: [null, Validators.required],
    genre: ['', Validators.required],
    description: ['', Validators.required],
  });

  submit(): void {
    if (this.bookForm.valid) {
      const jsonData = this.bookForm.value;

      this.bookService.createBook(jsonData).subscribe({
        next: (res) => {
          this.dialogRef.close({
            message: 'success',
          });
        },
        error: (err) => {
          console.log(err);
          this.dialogRef.close({
            message: 'error',
          });
        },
      });
    } else {
      this.dialogRef.close({
        message: 'invalid',
      });
    }
  }

}
