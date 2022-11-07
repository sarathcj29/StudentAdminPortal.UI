import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/updateStudentRequest.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseApiUrl = 'https://localhost:44373';

  constructor(private httpClient: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students');
  }

  getStudentById(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(
      this.baseApiUrl + '/students/' + studentId
    );
  }

  updateStudentById(studentId: string, request: Student): Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: request.firstName,
      lastName: request.lastName,
      dateOfBirth: request.dateOfBirth,
      email: request.email,
      mobile: request.mobile,
      genderId: request.genderId,
      physicalAddress: request.address.physicalAddress,
      postalAddress: request.address.postalAddress,
    };

    return this.httpClient.put<Student>(
      this.baseApiUrl + '/students/' + studentId,
      updateStudentRequest
    );
  }
}
