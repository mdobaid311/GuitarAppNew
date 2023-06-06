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

  columns = ['State', 'Total', 'Percentage'];
  filteredData: any;

  globalFromDate: NgbDate;
  globalToDate: NgbDate | null = null;

  todaysDate = moment(new Date()).format('YYYY-MM-DD');
  fullDate: any = moment(new Date()).format('YYYY-MM-DD');

  startDate: any = '2023-02-05 00:00:00';
  endDate: any = '2023-02-05 23:59:59';

  data = [
    ['us-ca', 133533949.36, 16.65],
    ['us-tx', 86648409.71, 10.8],
    ['us-fl', 58147459.49, 7.25],
    ['us-ny', 41936401.1, 5.23],
    ['us-ga', 25824161.1, 3.22],
    ['us-il', 25143058.65, 3.14],
    ['us-nc', 22157756.51, 2.76],
    ['us-tn', 21078776.94, 2.63],
    ['us-nj', 20676809.35, 2.58],
    ['us-az', 20235865.25, 2.52],
    ['us-va', 19959863.66, 2.49],
    ['us-oh', 19110738.44, 2.38],
    ['us-pa', 19080728.94, 2.38],
    ['us-mi', 18432266.84, 2.3],
    ['us-wa', 18233361.75, 2.27],
    ['us-or', 18123941.79, 2.26],
    ['us-ma', 17384547.38, 2.17],
    ['us-co', 16977149.93, 2.12],
    ['us-md', 13602412.67, 1.7],
    ['us-mn', 10809427.99, 1.35],
    ['us-in', 10571979.78, 1.32],
    ['us-ct', 10432508.99, 1.3],
    ['us-sc', 10264786.14, 1.28],
    ['us-al', 10231794.36, 1.28],
    ['us-mo', 10028829.09, 1.25],
    ['us-nv', 10024003.99, 1.25],
    ['us-la', 9339909.74, 1.16],
    ['us-wi', 9017259.02, 1.12],
    ['us-ok', 8925096.88, 1.11],
    ['us-de', 8757519.86, 1.09],
    ['us-ky', 8095082.15, 1.01],
    ['us-ut', 7679263.75, 0.96],
    ['us-ks', 6934160.28, 0.86],
    ['us-ar', 5836443.62, 0.73],
    ['us-nh', 5805467.31, 0.72],
    ['us-ia', 5018812.24, 0.63],
    ['us-nm', 4553619.16, 0.57],
    ['us-ms', 4522140.58, 0.56],
    ['us-ne', 4372633.8, 0.55],
    ['us-id', 3863796.82, 0.48],
    ['us-me', 2677173.73, 0.33],
    ['us-hi', 2332261.8, 0.29],
    ['us-sd', 2135101.7, 0.27],
    ['us-wv', 2118384.85, 0.26],
    ['us-mt', 1963009.22, 0.24],
    ['us-ri', 1887858.45, 0.24],
    ['us-dc', 1508777.36, 0.19],
    ['us-vt', 1430722.26, 0.18],
    ['us-nd', 1419586.89, 0.18],
    ['us-ak', 1386057.57, 0.17],
    ['us-wy', 880877.06, 0.11],
    ['us-pr', 464360.84, 0.06],
    ['us-ae', 181034.02, 0.02],
    ['us-ap', 173767.61, 0.02],
    ['us-vi', 30308.69, 0],
    ['us-aa', 7179.64, 0],
    ['us-on', 6551.03, 0],
    ['us-corozal', 5129.91, 0],
    ['us-', 3684.11, 0],
    ['us-tx', 3149.94, 0],
    ['us-bolivar', 2972.65, 0],
    ['us-us', 2069.08, 0],
    ['us-virginia', 2035.17, 0],
    ['us-va', 1687.86, 0],
    ['us-qc', 1298.99, 0],
    ['us-gu', 1186.08, 0],
    ['us-ontario', 963.47, 0],
    ['us-ab', 949, 0],
    ['us-fl', 791.76, 0],
    ['us-puerto rico', 749, 0],
    ['us-nb', 479.99, 0],
    ['us-fm', 357, 0],
    ['us-alberta', 281.79, 0],
    ['us-bc', 265.94, 0],
    ['us-campbell river', 179.1, 0],
    ['us-???', 169, 0],
    ['us-select', 158.35, 0],
    ['us-abingdon', 156.9, 0],
    ['us-mn', 152.7, 0],
    ['us-ca', 131.34, 0],
    ['us-las vegas', 130.02, 0],
    ['us-californie', 119.95, 0],
    ['us-sk', 89.99, 0],
    ['us-nueva esparta', 74.99, 0],
    ['us-kharkivska obl', 70, 0],
    ['us-alberta', 69.99, 0],
    ['us-3903', 53.36, 0],
    ['us-guerrero cuauhtemoc', 50, 0],
    ['us-alabama', 0, 0],
    ['us-california', 0, 0],
    ['us-louisiana', 0, 0],
    ['us-wisconsin', 0, 0],
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
                  const totalSum = res.reduce((acc: any, item: any) => {
                    return acc + +item.original_order_total_amount;
                  }, 0);

                  const output = res.map((item: any) => {
                    return [
                      ('us-' + item.city.trim()).toLowerCase(),
                      +item.original_order_total_amount,
                      Math.round(
                        (+item.original_order_total_amount / totalSum) * 10000
                      ) / 100,
                    ];
                  });

                  const sortedArray = output.sort((a: any, b: any) => {
                    return b[1] - a[1];
                  });

                  const tableData = sortedArray.map((row: any) => {
                    return Object.values(row);
                  });
                  this.originalData = sortedArray;

                  this.columnsData = this.columns.map((column: string) => {
                    return {
                      name: column,
                      isSelected: true,
                    };
                  });
                  this.newData = tableData;
                  this.filteredData = tableData;

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
        console.log(res);
        const tableData = res.map((row: any) => {
          return Object.values(row);
        });
        this.originalData = res;

        this.columnsData = this.columns.map((column: string) => {
          return {
            name: column,
            isSelected: true,
          };
        });
        this.newData = tableData;
        this.filteredData = tableData;
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
            console.log(res);
            const tableData = res.map((row: any) => {
              return Object.values(row);
            });
            this.originalData = res;

            this.columnsData = this.columns.map((column: string) => {
              return {
                name: column,
                isSelected: true,
              };
            });
            this.newData = tableData;
            this.filteredData = tableData;
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
            console.log(res);
            const tableData = res.map((row: any) => {
              return Object.values(row);
            });
            this.originalData = res;

            this.columnsData = this.columns.map((column: string) => {
              return {
                name: column,
                isSelected: true,
              };
            });
            this.newData = tableData;
            this.filteredData = tableData;
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
            console.log(res);
            const tableData = res.map((row: any) => {
              return Object.values(row);
            });
            this.originalData = res;

            this.columnsData = this.columns.map((column: string) => {
              return {
                name: column,
                isSelected: true,
              };
            });
            this.newData = tableData;
            this.filteredData = tableData;
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
            console.log(res);
            const tableData = res.map((row: any) => {
              return Object.values(row);
            });
            this.originalData = res;

            this.columnsData = this.columns.map((column: string) => {
              return {
                name: column,
                isSelected: true,
              };
            });
            this.newData = tableData;
            this.filteredData = tableData;
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
        console.log(res);
        const tableData = res.map((row: any) => {
          return Object.values(row);
        });
        this.originalData = res;

        this.columnsData = this.columns.map((column: string) => {
          return {
            name: column,
            isSelected: true,
          };
        });
        this.newData = tableData;
        this.filteredData = tableData;
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
        console.log(res);
        const tableData = res.map((row: any) => {
          return Object.values(row);
        });
        this.originalData = res;

        this.columnsData = this.columns.map((column: string) => {
          return {
            name: column,
            isSelected: true,
          };
        });
        this.newData = tableData;
        this.filteredData = tableData;
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
}
