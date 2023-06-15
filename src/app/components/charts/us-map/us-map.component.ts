import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

import USMap from '@highcharts/map-collection/countries/us/us-all.topo.json';

import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ChartService } from 'src/app/services/chartData.service';
import moment from 'moment';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-us-map',
  templateUrl: './us-map.component.html',
  styleUrls: ['./us-map.component.scss'],
})
export class UsMapComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';
  updateFlag = true;

  columns = ['State', 'Total', 'Count', 'Percentage'];
  filteredData: any;

  globalFromDate: NgbDate;
  globalToDate: NgbDate | null = null;

  todaysDate = moment(new Date()).format('YYYY-MM-DD');
  fullDate: any = moment(new Date()).format('YYYY-MM-DD');

  startDate: any = '2023-02-05 00:00:00';
  endDate: any = '2023-02-05 23:59:59';

  faTimes = faTimes;

  data = [
    ['us-ca', 130066755.06, 16.65, 197791],
    ['us-tx', 84661683.89, 10.84, 121359],
    ['us-fl', 56873971.89, 7.28, 85945],
    ['us-ny', 41000786.14, 5.25, 66462],
    ['us-ga', 25305160.24, 3.24, 37529],
    ['us-il', 24406919.16, 3.12, 47587],
    ['us-nc', 21672162.69, 2.77, 39648],
    ['us-tn', 20592754.22, 2.64, 31468],
    ['us-az', 19651441.56, 2.52, 31266],
    ['us-va', 19581483.87, 2.51, 30339],
    ['us-nj', 19471599.73, 2.49, 34462],
    ['us-pa', 18689174.82, 2.39, 39755],
    ['us-oh', 18561489.97, 2.38, 35981],
    ['us-mi', 17823452.32, 2.28, 35332],
    ['us-wa', 17753230.22, 2.27, 33206],
    ['us-or', 17724770.84, 2.27, 26674],
    ['us-ma', 16920696.28, 2.17, 29401],
    ['us-co', 16425820.65, 2.1, 28510],
    ['us-md', 13216293.3, 1.69, 21664],
    ['us-mn', 10530383.56, 1.35, 20773],
    ['us-in', 10260548.75, 1.31, 21176],
    ['us-ct', 10234874, 1.31, 14674],
    ['us-sc', 10067313.62, 1.29, 17326],
    ['us-al', 10050671.42, 1.29, 15546],
    ['us-nv', 9813176.75, 1.26, 14481],
    ['us-mo', 9640853.19, 1.23, 20957],
    ['us-la', 9098289, 1.16, 13609],
    ['us-ok', 8726468.17, 1.12, 13796],
    ['us-wi', 8707209.42, 1.11, 17951],
    ['us-de', 8658690.27, 1.11, 7206],
    ['us-ky', 7880152.98, 1.01, 15718],
    ['us-ut', 7428676.2, 0.95, 12763],
    ['us-ks', 6696311.54, 0.86, 11535],
    ['us-ar', 5645348.98, 0.72, 10239],
    ['us-nh', 5640949.02, 0.72, 8929],
    ['us-ia', 4867352.49, 0.62, 10223],
    ['us-ms', 4373543.45, 0.56, 7048],
    ['us-nm', 4346911.39, 0.56, 8768],
    ['us-ne', 4301019.87, 0.55, 6928],
    ['us-id', 3802700.49, 0.49, 6699],
    ['us-me', 2628902.08, 0.34, 5502],
    ['us-hi', 2225345.22, 0.28, 3434],
    ['us-sd', 2096232.54, 0.27, 2772],
    ['us-wv', 2054525.39, 0.26, 4712],
    ['us-mt', 1900179.52, 0.24, 3190],
    ['us-ri', 1841244.26, 0.24, 4114],
    ['us-dc', 1486939.73, 0.19, 1509],
    ['us-nd', 1389624.51, 0.18, 2583],
    ['us-vt', 1376655.76, 0.18, 3060],
    ['us-ak', 1364808.75, 0.17, 2113],
    ['us-wy', 831079.78, 0.11, 1677],
    ['us-pr', 432164.48, 0.06, 667],
    ['us-ae', 179190.1, 0.02, 307],
    ['us-ap', 171509.71, 0.02, 213],
    ['us-vi', 30308.69, 0, 39],
    ['us-aa', 6983, 0, 45],
    ['us-on', 6551.03, 0, 11],
    ['us-corozal', 5129.91, 0, 3],
    ['us-', 3684.11, 0, 19],
    ['us-tx', 3149.94, 0, 3],
    ['us-bolivar', 2972.65, 0, 5],
    ['us-us', 2069.08, 0, 4],
    ['us-virginia', 2035.17, 0, 3],
    ['us-va', 1687.86, 0, 2],
    ['us-qc', 1298.99, 0, 2],
    ['us-gu', 1186.08, 0, 12],
    ['us-ontario', 963.47, 0, 5],
    ['us-ab', 949, 0, 1],
    ['us-fl', 791.76, 0, 2],
    ['us-puerto rico', 749, 0, 1],
    ['us-nb', 479.99, 0, 1],
    ['us-fm', 357, 0, 3],
    ['us-bc', 265.94, 0, 1],
    ['us-alberta', 175.8, 0, 4],
    ['us-???', 169, 0, 1],
    ['us-abingdon', 156.9, 0, 1],
    ['us-mn', 152.7, 0, 1],
    ['us-ca', 131.34, 0, 3],
    ['us-las vegas', 130.02, 0, 1],
    ['us-californie', 119.95, 0, 1],
    ['us-sk', 89.99, 0, 1],
    ['us-nueva esparta', 74.99, 0, 1],
    ['us-kharkivska obl', 70, 0, 1],
    ['us-alberta', 69.99, 0, 1],
    ['us-3903', 53.36, 0, 1],
    ['us-guerrero cuauhtemoc', 50, 0, 1],
    ['us-alabama', 0, 0, 1],
    ['us-california', 0, 0, 1],
    ['us-louisiana', 0, 0, 1],
    ['us-wisconsin', 0, 0, 3],
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

  showTresholdsModal = false;

  toggleShowTresholdsModal() {
    this.showTresholdsModal = !this.showTresholdsModal;
  }

saveTresholds() {}

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

    this.filteredData = tableData.slice(0, 10);

    const data = Highcharts.geojson(USMap);

    data.forEach((d, i) => {
      d.drilldown = d.properties['hc-key'];
      const index = this.data.findIndex((x) => x[0] === d.drilldown);
      d.value = Math.floor(+this.data[index][1]) ? +this.data[index][1] : 0;
      d.count = Math.floor(+this.data[index][3]);
      d.abbr = Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(+d.value);
    });

    const sortedArrayForTreshold = data.sort((a: any, b: any) => {
      return b.value - a.value;
    });

    const tresholds = {
      first: sortedArrayForTreshold[10].value,
      second: sortedArrayForTreshold[20].value,
      third: sortedArrayForTreshold[sortedArrayForTreshold.length - 1].value,
    };

    this.chartOptions = {
      chart: {
        marker: {
          enabled: false,
        },
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

                        d.count = cityData.find(
                          (x: any) => x.city === d.properties.name
                        )?.count
                          ? cityData.find(
                              (x: any) => x.city === d.properties.name
                            )?.count
                          : 0;

                        d.abbr = Intl.NumberFormat('en-US', {
                          notation: 'compact',
                          compactDisplay: 'short',
                        }).format(+d.value);
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
                          format: '{point.abbr}',
                          // format : '{point.name}', to abbreviate the value
                          formatter: function (e: any) {
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
          drillup: (e: any) => {
            this.filteredData = tableData.slice(0, 10);
          },
        },
      },
      tooltip: {
        enabled: true,
        pointFormat:
          'Name: {point.name}<br/> Total: {point.abbr}<br/> Count: {point.count}',

        color: '#fff',
        style: {
          fontSize: '15px',
          color: '#000',
        },
      },
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
          fontSize: '18px',
        },
        itemHoverStyle: {
          color: '#4aa4ff',
        },
      },
      colorAxis: {
        dataClasses: [
          {
            from: tresholds.first,
            color: '#025464',
            name: 'High',
          },
          {
            from: tresholds.second,
            to: tresholds.first,
            color: '#3C486B',
            name: 'Medium',
          },
          {
            from: tresholds.third,
            to: tresholds.second,
            color: '#4F709C',
            name: 'Low',
          },
        ],
      },
      series: [
        {
          point: {},
          type: 'map',
          name: 'Sales',
          states: {
            hover: {
              color: '#57C5B6',
            },
          },

          dataLabels: {
            enabled: true, // true to show the value
            format: '{point.abbr}',

            color: '#fff',
            style: {
              fontSize: '18px',
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

    this.filteredData = tableData.slice(0, 10);

    const data = Highcharts.geojson(USMap);

    data.forEach((d, i) => {
      d.drilldown = d.properties['hc-key'];
      const index = res.findIndex((x: any) => x[0] === d.drilldown);
      if (index !== -1) {
        d.value = res[index][1] ? res[index][1] : 0;
      } else {
        d.value = 0;
      }
      d.count = res[index] ? res[index][3] : 0;
      d.abbr = Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(+d.value);
    });
    console.log(data);
    const sortedArrayForTreshold = data.sort((a: any, b: any) => {
      return b.value - a.value;
    });

    const tresholds = {
      first: sortedArrayForTreshold[10].value,
      second: sortedArrayForTreshold[20].value,
      third: sortedArrayForTreshold[sortedArrayForTreshold.length - 1].value,
    };

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

                  this.filteredData = tableData.slice(0, 10);

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
                        d.count = cityData.find(
                          (x: any) => x.city === d.properties.name
                        )?.count
                          ? cityData.find(
                              (x: any) => x.city === d.properties.name
                            )?.count
                          : 0;
                        d.abbr = Intl.NumberFormat('en-US', {
                          notation: 'compact',
                          compactDisplay: 'short',
                        }).format(+d.value);
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
                          format: '{point.abbr}',
                          // format : '{point.name}', to abbreviate the value
                          formatter: function (e: any) {
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
          drillup: (e: any) => {
            this.filteredData = tableData.slice(0, 10);
          },
        },
      },
      tooltip: {
        enabled: true,
        pointFormat:
          'Name: {point.name}<br/> Total: {point.abbr}<br/> Count: {point.count}',

        color: '#fff',
        style: {
          fontSize: '15px',
          color: '#000',
        },
      },
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
            from: tresholds.first,
            color: '#025464',
            name: 'High',
          },
          {
            from: tresholds.second,
            to: tresholds.first,
            color: '#3C486B',
            name: 'Medium',
          },
          {
            from: tresholds.third,
            to: tresholds.second,
            color: '#4F709C',
            name: 'Low',
          },
        ],
      },
      series: [
        {
          point: {},
          type: 'map',
          name: 'Sales',
          states: {
            hover: {
              color: '#57C5B6',
            },
          },

          dataLabels: {
            enabled: true, // true to show the value
            format: '{point.abbr}',

            color: '#fff',
            style: {
              fontSize: '18px',
              color: '#fff',
            },
          },
          allAreas: false,
          mapData: data,
          data: data,
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
