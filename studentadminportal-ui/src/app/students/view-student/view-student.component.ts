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

  isNewStudent = false;
  header = 'Edit Student';
  displayProfileImgUrl = '';

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
      if (this.studentID.toLowerCase() === 'Add'.toLowerCase()) {
        this.isNewStudent = true;
        this.header = 'Add New Student';
        // set profile image
        this.setImage();
      }

      if (!this.isNewStudent) {
        this.studentService
          .getStudentById(this.studentID)
          .subscribe((successResponse) => {
            this.student = successResponse;

            // set profile image
            this.setImage();
          });
      }

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
        // Redirect to list & Show a notification
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

  onAdd(): void {
    this.studentService.createStudent(this.student).subscribe(
      (successResponse) => {
        // Redirect to list & Show a notification
        this.router.navigateByUrl('/students');

        // other option to redirect to edit
        // this.router.navigateByUrl(`/students/${successResponse.id}`);

        this.snackBar.open(
          this.student.firstName +
            ' ' +
            this.student.lastName +
            ' ' +
            'created successfully',
          undefined,
          { duration: 3000 }
        );
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  uploadImage(event: any): void {
    if (this.studentID) {
      const file: File = event.target.files[0];

      this.studentService.uploadImage(this.studentID, file).subscribe(
        (successResponse) => {
          this.student.profileImageUrl = successResponse;
          this.setImage();

          // show notification for success image upload
          this.snackBar.open('Profile Image uploaded successfully', undefined, {
            duration: 3000,
          });
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
    }
  }

  private setImage(): void {
    if (this.student.profileImageUrl) {
      // get absoulte path and set the image
      this.displayProfileImgUrl = this.studentService.getImageUrl(
        this.student.profileImageUrl
      );
    } else {
      //display default
      this.displayProfileImgUrl = `assets/defaultImg.png`;
    }
  }
}
