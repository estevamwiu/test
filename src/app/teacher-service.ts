import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from './teacher-component/teachers';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
    apiUrl = 'http://localhost:3000/teachers';
    constructor (private http: HttpClient) {}
    getAllTeachers (): Observable<Teacher[]> 
    {
      return this.http.get<Teacher[]>(this.apiUrl);
    }

    save(teachers: Teacher): Observable<Teacher>{
    return this.http.post<Teacher>(this.apiUrl, teachers);
  }

    delete(teachers: Teacher): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${teachers.id}`);
 }

  update(teachers: Teacher): Observable<Teacher>{
    return this.http.put<Teacher>(`${this.apiUrl}/${teachers.id}`, teachers);
  }
}
