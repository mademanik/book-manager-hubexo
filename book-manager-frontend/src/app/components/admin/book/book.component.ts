import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BookService} from 'src/app/services/book.service';
import {Book} from 'src/app/models/book.model';
import {ShowBookComponent} from "./show-book/show-book.component";
import {AddBookComponent} from "./add-book/add-book.component";
import {DeleteBookComponent} from "./delete-book/delete-book.component";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'title',
    'author',
    'isbn',
    'publicationYear',
    'genre',
    'description',
    'action'
  ];

  dataSource = new MatTableDataSource<Book>();
  ELEMENT_DATA = [];

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  tableError: string | null = null;

  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const q = (event.target as HTMLInputElement).value.trim();
    this.bookService.findAllBooks(q ? q : undefined).pipe(
      catchError(err => {
        console.error(err);
        this.openSnackbarError('Error', 'Search failed');
        return of([]);
      })
    ).subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.paginator?.firstPage();
    });
  }


  ngOnInit(): void {
    this.findAllBooks()
  }

  findAllBooks() {
    this.bookService.findAllBooks().subscribe({
      next: (res) => {
        this.dataSource.data = res;

        console.log(this.dataSource.data)
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  addDialog(id?: String) {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: '50%',
      position: { top: '20px' },
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        this.findAllBooks();
      }, 500);

      this.tableError = null;

      if (result?.message == 'success') {
        this.openSnackbarSuccess('Success', 'Data successfully created');
      } else if (result?.message === 'invalid' || result?.message === 'error') {
        const fieldMsgs = result?.fields
          ? Object.entries(result.fields).map(([k, v]) => `${k}: ${v}`).join(' | ')
          : null;
        this.tableError = fieldMsgs
          ? `${result.error ?? 'Validation failed'} — ${fieldMsgs}`
          : (result.error ?? 'Validation failed');
      }

    });
  }

  openSnackbarSuccess(title: string, message: string) {
    this._snackBar.open(message, title, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: 'app-notification-success',
    });
  }

  openSnackbarError(title: string, message: string) {
    this._snackBar.open(message, title, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: 'app-notification-error',
    });
  }

  showDialog(id: String) {
    const dialogRef = this.dialog.open(ShowBookComponent, {
      width: '50%',
      position: {top: '20px'},
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        this.findAllBooks();
      }, 500);
    });
  }

  deleteDialog(id: String) {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      width: '20%',
      position: {top: '20px'},
      data: {id: id},
    });

    dialogRef.afterClosed().subscribe((result) => {
      setTimeout(() => {
        this.findAllBooks();
      }, 500);

      this.resultSnackBar(result, 'delete');
    });
  }

  resultSnackBar(result: any, type: string) {
    if (result?.message == 'success') {
      this.openSnackbarSuccess('Success', `Data ${type} successfully`);
    } else if (result?.message == 'error') {
      this.openSnackbarError('Error', `Data ${type} Failed`);
    } else if (result?.message == 'invalid') {
      this.openSnackbarError('Error', `Form ${type} invalid`);
    }
  }

}
