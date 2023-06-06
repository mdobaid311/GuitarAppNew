import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

import USMap from '@highcharts/map-collection/countries/us/us-all.topo.json';

import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ChartService } from 'src/app/services/chartData.service';
import moment from 'moment';

@Component({
  selector: 'app-us-map',
  templateUrl: './us-map.component.html',
  styleUrls: ['./us-map.component.scss'],
})
export class UsMapComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';
  updateFlag = true;

  columns = ['State', 'Total'];
  filteredData: any;

  globalFromDate: NgbDate;
  globalToDate: NgbDate | null = null;

  todaysDate = moment(new Date()).format('YYYY-MM-DD');
  fullDate: any = moment(new Date()).format('YYYY-MM-DD');

  startDate: any = '2023-02-05 00:00:00';
  endDate: any = '2023-02-05 23:59:59';

  data = [
    ['us-ca', 664304.4],
    ['us-al', 27003.79],
    ['us-nv', 50248.58],
    ['us-in', 66362.6],
    ['us-ri', 17942.98],
    ['us-ok', 27731.25],
    ['us-mn', 56186.86],
    ['us-ne', 8890.98],
    ['us-mo', 33361.22],
    ['us-ms', 18984.04],
    ['us-de', 41974.65],
    ['us-az', 117126.79],
    ['us-id', 19847.04],
    ['us-aa', 179],
    ['us-mt', 1756.44],
    ['us-ar', 18235.28],
    ['us-gu', 113.14],
    ['us-wy', 1349.59],
    ['us-co', 128117.4],
    ['us-ia', 51304.97],
    ['us-oh', 63699.21],
    ['us-tn', 115793.46],
    ['us-sc', 62409.19],
    ['us-pa', 77372.65],
    ['us-vi', 19871.44],
    ['us-wa', 92007.13],
    ['us-nd', 6796.82],
    ['us-ak', 13565.28],
    ['us-wv', 11997.24],
    ['us-ga', 133054.06],
    ['us-vt', 12342.04],
    ['us-tx', 397541.67],
    ['us-pr', 865.32],
    ['us-wi', 48437.4],
    ['us-ae', 1014],
    ['us-va', 137990.51],
    ['us-ny', 240857.7],
    ['us-hi', 27635.38],
    ['us-ky', 48951.69],
    ['us-or', 115055.32],
    ['us-la', 86528.01],
    ['us-il', 154868.96],
    ['us-md', 93906.23],
    ['us-sd', 17189.65],
    ['us-ut', 18112.53],
    ['us-ct', 34997.74],
    ['us-fl', 271752.17],
    ['us-nj', 100511.23],
    ['us-ma', 79293.53],
    ['us-mi', 59874.79],
    ['us-nm', 59747.43],
    ['us-dc', 2800.14],
    ['us-nh', 28252.2],
    ['us-ks', 8733.05],
    ['us-ap', 1986.47],
    ['us-me', 25927.1],
    ['us-nc', 72083.09],
  ];

  mapView = USMap.objects.default['hc-recommended-mapview'];

  data1 = Highcharts.geojson(USMap);

  loader = false;

  chartOptions: any;

  constructor(private chartData: ChartService, calendar: NgbCalendar) {
    Highcharts.setOptions({
      lang: {
        numericSymbols: ['K', 'M', 'B', 'T', 'P', 'E'],
      },
    });

    this.globalFromDate = calendar.getToday();
    this.globalToDate = calendar.getToday();
  }

  originalData: any;
  columnsData: any;

  newData: any;
  ngOnInit() {
    const tableData = this.data.map((row: any) => {
      return Object.values(row);
    });
    this.originalData = this.data;

    this.columnsData = this.columns.map((column: string) => {
      return {
        name: column,
        isSelected: true,
      };
    });
    this.newData = tableData;
    this.filteredData = tableData;

    const data = Highcharts.geojson(USMap);

    data.forEach((d, i) => {
      d.drilldown = d.properties['hc-key'];
      const index = this.data.findIndex((x) => x[0] === d.drilldown);
      d.value = Math.floor(+this.data[index][1]);
    });

    this.chartOptions = {
      chart: {
        map: USMap as any,
        events: {
          drilldown: (e: any) => {
            if (!e.seriesOptions) {
              const chart = e.target,
                mapKey = (e.point as any).drilldown,
                mapLocation = (e.point as any).mapLocation;

              let cityData: any;
              this.chartData
                .getCityData(this.startDate, this.endDate, e.point.drilldown)
                .subscribe((res: any) => {
                  cityData = res;
                  // cityData format
                  //   {
                  //     "city": "AMARGOSA VALLEY",
                  //     "original_order_total_amount": "29141.31"
                  // },

                  // Handle error, the timeout is cleared on success
                  let fail = setTimeout(() => {
                    if (!Highcharts.maps[mapKey]) {
                      chart.showLoading(
                        '<i class="icon-frown"></i> Failed loading ' +
                          e.point.value
                      );
                      fail = setTimeout(() => {
                        chart.hideLoading();
                      }, 1000);
                    }
                  }, 3000);

                  // Show the spinner
                  chart.showLoading(
                    '<i class="icon-spinner icon-spin icon-3x"></i>'
                  ); // Font Awesome spinner

                  // Load the drilldown map
                  fetch(
                    'https://code.highcharts.com/mapdata/countries/us/' +
                      mapKey +
                      '-all.topo.json'
                  )
                    .then((response) => response.json())
                    .then((mapData) => {
                      const data = Highcharts.geojson(mapData);
                      data.forEach((d, i) => {
                        // return original_order_total_amount if city matches  else 0
                        d.value = cityData.find(
                          (x: any) => x.city === d.properties.name
                        )?.original_order_total_amount
                          ? cityData.find(
                              (x: any) => x.city === d.properties.name
                            )?.original_order_total_amount
                          : 0;
                      });
                      //

                      // const drillDownData = Highcharts.geojson(mapData);
                      Highcharts.maps[mapKey] = data;

                      data.forEach((d, i) => {
                        d.mapLocation =
                          'countries/' +
                          d.properties['hc-key'] +
                          '/' +
                          d.properties['hc-key'] +
                          '-all';
                        d.drilldown = d.properties['hc-key'];
                      });

                      // Hide loading and add series
                      chart.hideLoading();
                      clearTimeout(fail);
                      chart.addSeriesAsDrilldown(e.point, {
                        name: e.point.value,
                        mapData: Highcharts.maps[mapKey],
                        data: data,
                        type: 'map',
                        cities: {
                          hover: {
                            color: '#BADA55',
                          },
                        },
                        dataLabels: {
                          enabled: true,
                          format: '{point.value}',
                          // format : '{point.name}', to abbreviate the value
                          formatter: function (e: any) {
                            console.log(e, 'event');
                            return e.value + 'sale';
                          },
                          color: '#fff',
                          style: {
                            color: '#fff',
                          },
                        },
                      });
                    });
                });
            }
          },
          drillup: function () {
            // this.setTitle(null, { text: '' });
          },
        },
      },
      tooltip: { enabled: true },
      title: {
        text: 'Sales',
        style: {
          color: '#fff',
          fontSize: '26px',
          fontFamily: 'Poppins, sans-serif',
        },
      },
      mapNavigation: {
        enabled: false,
        buttonOptions: {
          alignTo: 'spacingBox',
        },
      },
      exporting: {
        enabled: true,
      },
      credits: {
        enabled: true,
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: '#fff',
        },
        itemHoverStyle: {
          color: '#4aa4ff',
        },
      },
      colorAxis: {
        dataClasses: [
          {
            to: 100000,
            color: '#F8F1F1',
          },
          {
            from: 10000,
            to: 100000,
            color: '#E8AA42',
          },
          {
            from: 100000,
            to: 500000,
            color: '#C88EA7',
          },
          {
            from: 500000,
            to: 1000000,
            color: '#18978F',
          },
          {
            from: 1000000,
            to: 2500000,
            color: '#E8D2A6',
          },
          {
            from: 2500000,
            to: 5000000,
            color: '#0E5E6F',
          },
          {
            from: 5000000,
            to: 10000000,
            color: '#E76161',
          },
        ],

        type: 'linear',
      },
      series: [
        {
          point: {},
          type: 'map',
          name: 'Sales',
          states: {
            hover: {
              color: '#BADA55',
            },
          },

          dataLabels: {
            enabled: true, // true to show the value
            format: '{point.name}',

            formatter: function (e: any) {
              console.log('first');
              return e.value + 'sale';
            },
            color: '#fff',
            style: {
              fontSize: '13px',
              color: '#fff',
            },
          },
          allAreas: false,
          mapData: data,
          data: this.data,
        },
      ],
      drilldown: {
        tooltip: { enabled: true },
        activeAxisLabelStyle: {
          textDecoration: 'none',
          fontStyle: 'italic',
        },
        activeDataLabelStyle: {
          textDecoration: 'none',
          fontStyle: 'italic',
          color: '#FFFFFF',
          textOutline: '1px #000000',
        },
        breadcrumbs: {
          floating: true,
          relativeTo: 'spacingBox',
          format: '{point.title}',
          formatter: function (e: any) {
            return e.levelOptions[0];
          },
          style: {
            color: '#fff',
          },
          position: {
            x: 20,
            y: 50,
          },
        },
        drillUpButton: {
          relativeTo: 'spacingBox',
          position: {
            x: 20,
            y: 50,
          },
        },
      },
    };
  }
  onGlobalDateRangeChanged(date: NgbDate) {
    if (!this.globalFromDate && !this.globalToDate) {
      this.globalFromDate = date;
    } else if (
      this.globalFromDate &&
      !this.globalToDate &&
      date.after(this.globalFromDate)
    ) {
      this.globalToDate = date;
    } else {
      this.globalToDate = null;
      this.globalFromDate = date;
    }

    const beginDate =
      this.globalFromDate.year +
      '-' +
      this.globalFromDate.month +
      '-' +
      this.globalFromDate.day;
    const endDate = this.globalToDate
      ? this.globalToDate.year +
        '-' +
        this.globalToDate.month +
        '-' +
        this.globalToDate.day
      : null;
    if (beginDate && endDate) {
      this.fullDate = beginDate + ' to ' + endDate;
      this.chartData.getMapData(beginDate, endDate).subscribe((res: any) => {
        this.data1 = res;
        this.updateChart(res);
      });
    }
  }

  changeDate(value: any) {
    if (value === 'prev') {
      this.fullDate = moment(this.fullDate)
        .subtract(1, 'days')
        .format('YYYY-MM-DD');
    } else if (value === 'next') {
      this.fullDate = moment(this.fullDate).add(1, 'days').format('YYYY-MM-DD');
    }
  }

  onRangeSelect(range: any) {
    if (range === '1m') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(1, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      this.chartData.getMapData(startDate, endDate).subscribe((res: any) => {
        this.data1 = res;
        this.updateChart(res);
      });
    } else if (
      range === '2h' ||
      range === '6h' ||
      range === '12h' ||
      range === '1d'
    ) {
      if (range === '2h') {
        this.startDate = moment('2023-05-01 16:28:21')
          .subtract(2, 'hours')
          .format('YYYY-MM-DD HH:mm');
        this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.chartData
          .getMapData(this.startDate, this.endDate)
          .subscribe((res: any) => {
            this.data1 = res;
            this.updateChart(res);
          });

        this.fullDate = 'Last 2 hours';
      } else if (range === '6h') {
        this.startDate = moment('2023-05-01 16:28:21')
          .subtract(6, 'hours')
          .format('YYYY-MM-DD HH:mm');
        this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.chartData
          .getMapData(this.startDate, this.endDate)
          .subscribe((res: any) => {
            this.data1 = res;
            this.updateChart(res);
          });
        this.fullDate = 'Last 6 hours';
      } else if (range === '12h') {
        this.startDate = moment('2023-05-01 16:28:21')
          .subtract(12, 'hours')
          .format('YYYY-MM-DD HH:mm');
        this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.chartData
          .getMapData(this.startDate, this.endDate)
          .subscribe((res: any) => {
            this.data1 = res;
            this.updateChart(res);
          });
        this.fullDate = 'Last 12 hours';
      } else if (range === '1d') {
        this.startDate = moment('2023-05-01 16:28:21')
          .subtract(1, 'days')
          .format('YYYY-MM-DD HH:mm');
        this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
        this.chartData
          .getMapData(this.startDate, this.endDate)
          .subscribe((res: any) => {
            this.data1 = res;
            this.updateChart(res);
          });
        this.fullDate = 'Last 24 hours';
      }
    } else if (range === '6m') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(6, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      this.chartData.getMapData(startDate, endDate).subscribe((res: any) => {
        this.data1 = res;
        this.updateChart(res);
      });
      this.fullDate = 'Last 6 months';
    } else if (range === '1y') {
      const startDate = moment('2023-05-01 16:28:21')
        .subtract(12, 'months')
        .format('YYYY-MM-DD HH:mm');
      const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
      this.chartData.getMapData(startDate, endDate).subscribe((res: any) => {
        this.data1 = res;
        this.updateChart(res);
      });
      this.fullDate = 'Last 12 months';
    }
  }

  updateChart(res: any) {
    const data = Highcharts.geojson(USMap);

    data.forEach((d, i) => {
      d.drilldown = d.properties['hc-key'];
      const index = res.findIndex((x: any) => x[0] === d.drilldown);
      if (index !== -1) {
        d.value = res[index][1];
      }
    });

    this.chartOptions = {
      chart: {
        map: USMap as any,
        events: {
          drilldown: (e: any) => {
            if (!e.seriesOptions) {
              const chart = e.target,
                mapKey = (e.point as any).drilldown,
                mapLocation = (e.point as any).mapLocation;

              // Handle error, the timeout is cleared on success
              let fail = setTimeout(() => {
                if (!Highcharts.maps[mapKey]) {
                  chart.showLoading(
                    '<i class="icon-frown"></i> Failed loading ' + e.point.value
                  );
                  fail = setTimeout(() => {
                    chart.hideLoading();
                  }, 1000);
                }
              }, 3000);

              // Show the spinner
              chart.showLoading(
                '<i class="icon-spinner icon-spin icon-3x"></i>'
              ); // Font Awesome spinner

              // Load the drilldown map
              fetch(
                'https://code.highcharts.com/mapdata/countries/us/' +
                  mapKey +
                  '-all.topo.json'
              )
                .then((response) => response.json())
                .then((mapData) => {
                  const data = Highcharts.geojson(mapData);
                  data.forEach((d, i) => {
                    d.value = Math.floor(Math.random() * 1000000);
                  });

                  // const drillDownData = Highcharts.geojson(mapData);
                  Highcharts.maps[mapKey] = data;

                  data.forEach((d, i) => {
                    d.mapLocation =
                      'countries/' +
                      d.properties['hc-key'] +
                      '/' +
                      d.properties['hc-key'] +
                      '-all';
                    d.drilldown = d.properties['hc-key'];
                  });

                  // Hide loading and add series
                  chart.hideLoading();
                  clearTimeout(fail);
                  chart.addSeriesAsDrilldown(e.point, {
                    name: e.point.value,
                    mapData: Highcharts.maps[mapKey],
                    data: data,
                    type: 'map',
                    cities: {
                      hover: {
                        color: '#BADA55',
                      },
                    },
                    dataLabels: {
                      enabled: true,
                      format: '{point.value}',
                      formatter: function (e: any) {
                        console.log(e);
                        return e.value + 'sale';
                      },
                      color: '#fff',
                      style: {
                        color: '#fff',
                      },
                    },
                  });
                });
            }
          },
          drillup: function () {
            // this.setTitle(null, { text: '' });
          },
        },
      },
      tooltip: { enabled: false },
      title: {
        text: 'Sales',
        style: {
          color: '#fff',
          fontSize: '26px',
          fontFamily: 'Poppins, sans-serif',
        },
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: 'spacingBox',
        },
      },
      exporting: {
        enabled: true,
      },
      credits: {
        enabled: true,
      },
      legend: {
        enabled: true,
        itemStyle: {
          color: '#fff',
        },
        itemHoverStyle: {
          color: '#4aa4ff',
        },
      },
      colorAxis: {
        dataClasses: [
          {
            to: 100000,
            color: '#F8F1F1',
          },
          {
            from: 10000,
            to: 100000,
            color: '#E8AA42',
          },
          {
            from: 100000,
            to: 500000,
            color: '#C88EA7',
          },
          {
            from: 500000,
            to: 1000000,
            color: '#18978F',
          },
          {
            from: 1000000,
            to: 2500000,
            color: '#E8D2A6',
          },
          {
            from: 2500000,
            to: 5000000,
            color: '#0E5E6F',
          },
          {
            from: 5000000,
            to: 10000000,
            color: '#E76161',
          },
        ],

        type: 'linear',
      },
      series: [
        {
          point: {},
          type: 'map',
          name: 'Sales',
          states: {
            hover: {
              color: '#BADA55',
            },
          },

          dataLabels: {
            enabled: true,
            format: '{point.name}',
            // format : '{point.name}', to abbreviate the value
            formatter: function (e: any) {
              console.log(e, 'event');
              return e.value + 'sale';
            },
            color: '#fff',
            style: {
              fontSize: '15px',
              color: '#fff',
            },
          },
          allAreas: false,
          mapData: data,
          data: res,
        },
      ],
      drilldown: {
        activeDataLabelStyle: {
          color: '#FFFFFF',
          textDecoration: 'none',
          textOutline: '1px #000000',
        },
        drillUpButton: {
          relativeTo: 'spacingBox',
          position: {
            x: 0,
            y: 60,
          },
        },
      },
    };
  }
}
