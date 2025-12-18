import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  API_URL = environment.api_url;

  // We can use an instance of HttpClient object to make API calls for data
  // This module does need to be imported via provideHttpClient
  constructor(private httpClientInstance: HttpClient) {}

  getTasks(): Observable<Task[]> {
    // Typically making an API call for all tasks, but we will use in memory array for now.
    // We can use < > to specify the type of data we expect from the API call.
    return this.httpClientInstance.get<Task[]>(this.API_URL + '/tasks');
  }

  getTask(id: number): Observable<Task> {
    return this.httpClientInstance.get<Task>(this.API_URL + '/tasks/' + id);
  }

  addTask(task: Task): Observable<Task> {
    return this.httpClientInstance.post<Task>(this.API_URL + '/tasks', task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClientInstance.patch<Task>(
      this.API_URL + '/tasks/' + task.id,
      task
    );
  }

  deleteTask(id: number): Observable<Task> {
    return this.httpClientInstance.delete<Task>(this.API_URL + '/tasks/' + id);
  }
}
