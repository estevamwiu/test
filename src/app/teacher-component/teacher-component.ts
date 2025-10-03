import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Teacher } from './teachers';
import { TeacherService } from '../teacher-service';

@Component({
  selector: 'app-teacher-component',
  standalone: false,
  templateUrl: './teacher-component.html',
  styleUrl: './teacher-component.css'
})
export class TeacherComponent implements OnInit {

      ngOnInit(): void {
      this.service.getAllTeachers().subscribe(
          {
              next: json => this.teachers = json
          }
      );
  }

    teachers: Teacher[] = [];
    FormGroupTeacher : FormGroup;
    isEditing: boolean = false;

      constructor (private formBuilder: FormBuilder, private service: TeacherService) {
          this.FormGroupTeacher = formBuilder.group({
              id: [''],
              name: [''],
              email: [''],
              teste: [false],
              teste2: [false], //CHECK BOX
              turno: [''] //RADIO BUTTON SÓ AQUI E NO HTML
          })
      }

        getSubjects(teachers: Teacher): string {
        const subjects = [];
        if (teachers.teste) subjects.push('Teste');
        if (teachers.teste2) subjects.push('Teste2');  //CHECK BOX
        return subjects.join(', ');
      }

      save () {
       this.service.save(this.FormGroupTeacher.value).subscribe(
      {
        next: json => {
                        this.teachers.push(json);
                        this.FormGroupTeacher.reset();
                      }
      }
    )
  }
     delete(teachers: Teacher) {
    this.service.delete(teachers).subscribe(
      {
        next: () => {
          this.teachers = this.teachers.filter(p => p.id != teachers.id);
        }
      }
    )
  }
      OnClickUpdate(teachers: Teacher) {
     this.FormGroupTeacher.setValue(teachers);
     this.isEditing = true;
  }
      update() {
      this.service.update(this.FormGroupTeacher.value).subscribe(
      {
        next: json => {
          this.teachers[this.teachers.findIndex(p => p.id == json.id)] = json;
          this.FormGroupTeacher.reset();
          this.isEditing = false;
        }
      }
    )
  }
}
