import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddStudentRequest } from '../models/api-models/addStudentRequest.model';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/updateStudentRequest.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseApiUrl = environment.baseApiUrl;

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

  deleteStudentById(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(
      this.baseApiUrl + '/students/' + studentId
    );
  }

  createStudent(request: Student): Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: request.firstName,
      lastName: request.lastName,
      dateOfBirth: request.dateOfBirth,
      email: request.email,
      mobile: request.mobile,
      genderId: request.genderId,
      physicalAddress: request.address.physicalAddress,
      postalAddress: request.address.postalAddress,
    };

    return this.httpClient.post<Student>(
      this.baseApiUrl + '/students/add',
      addStudentRequest
    );
  }

  uploadImage(studentId: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('profileImage', file);

    return this.httpClient.post(
      this.baseApiUrl + '/students/' + studentId + '/upload-img',
      formData,
      {
        responseType: 'text',
      }
    );
  }

  getImageUrl(relativePath: string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }
}
