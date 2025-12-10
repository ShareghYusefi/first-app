import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Task } from '../../interfaces/task';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    priority_level: 'Low',
  };

  constructor(
    private navCtrl: NavController,
    private taskService: TaskService
  ) {}

  ngOnInit() {}

  closeForm() {
    this.navCtrl.navigateBack('/tabs/tab1');
  }

  onSubmit() {
    console.log('Form submitted!', this.task);
    this.taskService.addTask(this.task).subscribe(
      (result: Task) => {
        console.log('Task added!', result);
      },
      (error) => {
        console.log('Error adding task', error);
      }
    );
  }
}
