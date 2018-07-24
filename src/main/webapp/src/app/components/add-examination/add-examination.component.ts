import { Component, OnInit } from '@angular/core';
import {Examination} from '../../examination';
import {ExaminationService} from '../../service/examination.service';
import {Router} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ActivatedRoute, Params, } from '@angular/router';
import { MyDialogComponent } from '../../components//my-dialog/my-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-add-examination',
  templateUrl: './add-examination.component.html',
  styleUrls: ['./add-examination.component.scss']
})
export class AddExaminationComponent implements OnInit {

  examination: Examination;
  private updateid: Number;
  myDialog: MatDialogRef<MyDialogComponent>;
files: any;
  constructor(private _examinationService: ExaminationService, private activatedRouter: ActivatedRoute,
     private router: Router, private dialog: MatDialog) { }

     openAddFileDialog() {
       this.myDialog = this.dialog.open(MyDialogComponent);
     this.myDialog
        .afterClosed()
        .pipe(filter(name => name))
        .subscribe(name => this.files.push({ name, content: '' }));
  }



  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.updateid = +id;
        this._examinationService.getExaminationWithQuestions(this.updateid).subscribe(result => this.examination = result);
      }

    this.examination = this._examinationService.getter();
  });
}
  processFormExamination() {
    if (this.examination.id) {
      this._examinationService.createExamination(this.examination).subscribe((examination) => {
        console.log(examination);
        this.router.navigate(['/examinationList']);
      }, (error) => {console.log(error);
      });
    } else {
      this._examinationService.updateExamination(this.examination).subscribe((examination) => {
        console.log(this.examination);
        this.router.navigate(['/examinationList']);
      });
    }

  }
  // tslint:disable-next-line:member-ordering
  MyDialogRef: MatDialogRef<MyDialogComponent>;
  openDialog() {
    this.MyDialogRef = this.dialog.open(MyDialogComponent, {
      hasBackdrop: false
    });
  }
}