import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  title = 'Pie Chart';

  private svg: any;
  private margin = 50;
  private width = 960;
  private height = 450;
  private radius = Math.min(this.width, this.height) / 2;

  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;

  constructor(public dataService: DataService) {}

  ngAfterViewInit(): void {
    this.dataService.getData().then(() => {
      this.createChart();
      this.initSvg();
      this.drawPie();
    });
  }

  createChart() {
    // var ctx = document.getElementById("myChart").getContext("2d");
    const ctx = document.getElementById('myChart');
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataService.dataSource,
    });
  }

  private initSvg() {
    this.color = d3Scale
      .scaleOrdinal()
      .range(this.dataService.dataSource.datasets[0].backgroundColor);
    this.arc = d3Shape
      .arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);
    this.labelArc = d3Shape
      .arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);
    this.pie = d3Shape
      .pie()
      .sort(null)
      .value((d: any) => d.budget);
    this.svg = d3
      .select('svg')
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private drawPie() {
    let g = this.svg
      .selectAll('.arc')
      .data(this.pie(this.dataService.secondData))
      .enter()
      .append('g')
      .attr('class', 'arc');
    g.append('path')
      .attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.title));
    g.append('text')
      .attr(
        'transform',
        (d: any) => 'translate(' + this.labelArc.centroid(d) + ')'
      )
      .attr('dy', '.35em')
      .text((d: any) => d.data.title);
  }
}
