import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BookService} from 'src/app/services/book.service';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.scss']
})
export class ShowBookComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { id: any },
    private bookService: BookService,
    private dialogRef: MatDialogRef<ShowBookComponent>
  ) {
  }

  row: any;

  ngOnInit(): void {
    this.findBookById(this.data.id);
  }

  findBookById(id: String) {
    this.bookService.findBookById(id).subscribe({
      next: (res) => {
        this.row = res;
      },
      error: (err) => {
        alert(err);
      },
    });
  }

}
