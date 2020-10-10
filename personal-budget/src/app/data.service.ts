import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#2Bf7f5',
          '#9b1365',
          '#23f225',
        ],
      },
    ],
    labels: [],
  };

  secondData = [];

  constructor(private http: HttpClient) {}

  getData() {
    if (this.dataSource.datasets[0].data === []) {
      return null;
    }
    return this.http.get('http://localhost:3200/budget').toPromise().then((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.secondData = res.myBudget;
    });
  }
}
