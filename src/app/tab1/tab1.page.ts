import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TaskService } from '../services/task-service';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  tasks!: Task[];

  constructor(
    private navCtrl: NavController,
    private taskService: TaskService
  ) {}

  // initialize tasks
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    // load in the tasks
    this.taskService.getTasks().subscribe((results: Task[]) => {
      this.tasks = results;
    });
  }

  // Will update tasks array
  ionViewDidEnter() {
    this.loadTasks();
  }

  openForm() {
    this.navCtrl.navigateForward('/tabs/task-form');
  }
}
