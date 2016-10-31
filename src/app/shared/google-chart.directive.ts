//import { Directive } from '@angular/core';
import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { GlobalVariableService } from "./global-variable.service";

declare var google: any;
@Directive({
    selector: '[GoogleChart]',
    providers: [GlobalVariableService]
})

export class GoogleChartDirective implements OnInit, OnChanges {
    public _element: any;
    @Input('chartType') public chartType: string;
    @Input('chartOptions') public chartOptions: Object;
    @Input('chartData') public chartData: Object;
    changeLog: string[] = [];

    constructor(public element: ElementRef, private globalVar: GlobalVariableService) {
        this._element = this.element.nativeElement;
    }
    ngOnInit() {
        console.log("google load check")
        if (!this.globalVar.googleLoaded) {
            console.log("google load check")
            this.globalVar.googleLoaded = true;
            google.charts.load('current', { 'packages': ['corechart', 'gauge'] });
        } else {
            console.log("google load check")

        }
        setTimeout(() => this.drawGraph(this.chartOptions, this.chartType, this.chartData, this._element), 1000);
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (let propName in changes) {
            if (propName == 'chartData') {
                this.redrawGraph();
            }
        }
    }

    drawGraph(chartOptions, chartType, chartData, ele) {
        if (chartData.length > 0)
            google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var wrapper;
            wrapper = new google.visualization.ChartWrapper({
                chartType: chartType,
                dataTable: chartData,
                options: chartOptions || {},
                containerId: ele.id
            });
            wrapper.draw();
        }

    }

    redrawGraph() {
        this.drawGraph(this.chartOptions, this.chartType, this.chartData, this._element)
    }
}
