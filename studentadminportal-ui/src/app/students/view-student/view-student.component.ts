import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
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

  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute
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
    }
  }
}
