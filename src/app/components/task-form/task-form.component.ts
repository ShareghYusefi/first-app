import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Task } from '../../interfaces/task';
import { TaskService } from 'src/app/services/task-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private navCtrl: NavController,
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      priority_level: ['Low', [Validators.required]],
    });
  }

  // getters for displaying errors
  get title() {
    return this.taskForm.get('title');
  }
  get description() {
    return this.taskForm.get('description');
  }
  get priority_level() {
    return this.taskForm.get('priority_level');
  }

  closeForm() {
    this.navCtrl.navigateBack('/tabs/tab1');
  }

  onSubmit() {
    console.log('Form submitted!', this.taskForm.value);
    this.taskService.addTask(this.taskForm.value).subscribe(
      (result: Task) => {
        console.log('Task added!', result);
      },
      (error) => {
        console.log('Error adding task', error);
      }
    );
  }
}
