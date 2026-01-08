import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BookService} from 'src/app/services/book.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent {
  id: String = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: any },
    private bookService: BookService,
    private dialogRef: MatDialogRef<DeleteBookComponent>,
  ) {
  }

  deleteBook() {
    this.bookService.deleteBookById(this.data.id).subscribe({
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
  }

}
