import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  studentID: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    },
  };

  genderList: Gender[] = [];

  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentID = params.get('id');
    });

    // Fetch student based on ID
    if (this.studentID) {
      this.studentService
        .getStudentById(this.studentID)
        .subscribe((successResponse) => {
          this.student = successResponse;
        });

      this.genderService.getGenderList().subscribe((successResponse) => {
        this.genderList = successResponse;
      });
    }
  }

  onUpdate(): void {
    this.studentService
      .updateStudentById(this.student.id, this.student)
      .subscribe(
        (successResponse) => {
          // Show a notification
          this.snackBar.open(
            this.student.firstName +
              ' ' +
              this.student.lastName +
              ' ' +
              'updated successfully',
            undefined,
            { duration: 3000 }
          );
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
  }

  onDelete(): void {
    this.studentService.deleteStudentById(this.student.id).subscribe(
      (successresponse) => {
        this.router.navigateByUrl('/students');
        this.snackBar.open(
          this.student.firstName +
            ' ' +
            this.student.lastName +
            ' ' +
            'deleted successfully',
          undefined,
          { duration: 3000 }
        );

        // setTimeout(() => {
        //   this.router.navigateByUrl('/students');
        // }, 2000);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
}
