import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Task } from '../../interfaces/task';
import { TaskService } from 'src/app/services/task-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      priority_level: ['Low', [Validators.required]],
    });

    // get the id of task from url
    this.route.paramMap.subscribe((params) => {
      // check if id is present in the URL parameter
      let id = params.get('id');
      // check if id is truthy, then get task data
      if (id) {
        this.taskService.getTask(parseInt(id)).subscribe(
          (task: Task) => {
            // update the task form with data
            this.taskForm.patchValue({
              id: task.id,
              title: task.title,
              description: task.description,
              priority_level: task.priority_level,
            });
          },
          (error) => {
            console.log(error);
          }
        );
      }
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
    if (this.taskForm.invalid) return;

    // check if we ahve an id in URL
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.updateTask();
    } else {
      this.addTask();
    }
    // reset form and close
    this.taskForm.reset();
    this.closeForm();
  }

  updateTask() {
    this.taskService.updateTask(this.taskForm.value).subscribe(
      (result: Task) => {
        console.log('Task updated: ', result);
      },
      (error) => {
        console.log('Error updating task', error);
      }
    );
  }

  addTask() {
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
