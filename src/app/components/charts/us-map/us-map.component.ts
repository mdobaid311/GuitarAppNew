import { Component, ElementRef, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import stateNamesMap from './stateNamesMap.json';
import USMap from '@highcharts/map-collection/countries/us/us-all.topo.json';
import mapData from './data.json';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ChartService } from 'src/app/services/chartData.service';
import moment from 'moment';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-us-map',
  templateUrl: './us-map.component.html',
  styleUrls: ['./us-map.component.scss'],
})
export class UsMapComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  columns = ['State', 'Total', 'Count', 'Percentage'];
  filteredData: any;

  globalFromDate: NgbDate;
  globalToDate: NgbDate | null = null;

  todaysDate = moment(new Date()).format('YYYY-MM-DD');
  fullDate: any = moment(new Date()).format('YYYY-MM-DD');

  theme = 'light';

  startDate: any = '2023-02-05 00:00:00';
  endDate: any = '2023-02-05 23:59:59';

  faTimes = faTimes;

  data: any;

  mapView = USMap.objects.default['hc-recommended-mapview'];

  data1 = Highcharts.geojson(USMap);

  loader = false;

  chartOptions: any;

  constructor(
    private chartData: ChartService,
    calendar: NgbCalendar,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.globalFromDate = calendar.getToday();
    this.globalToDate = calendar.getToday();
  }

  originalData: any;
  columnsData: any;
  newData: any;

  showThresholdsModal = false;
  stateNamesMap: any;

  user: any;

  toggleShowThresholdsModal() {
    this.showThresholdsModal = !this.showThresholdsModal;
  }

  userThresholds: any;

  ngOnInit() {
    this.stateNamesMap = stateNamesMap;
    this.data = mapData;

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
      const index = this.data.findIndex((x: any) => x[0] === d.drilldown);
      d.value = Math.floor(+this.data[index][1]) ? +this.data[index][1] : 0;
      d.count = Math.floor(+this.data[index][3]);
      d.abbr = Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
      }).format(+d.value);
    });

    const sortedArrayForThreshold = data.sort((a: any, b: any) => {
      return b.value - a.value;
    });

    let thresholds;

    this.userService.user$
      .pipe(
        switchMap((user) => {
          this.user = user;
          return this.userService.getThresholdInfo(this.user?.id);
        })
      )
      .subscribe((res: any) => {
        this.userThresholds = res.result[0];
        this.statesRemaingingForThreshold =
          51 -
          this.userThresholds?.tsone -
          this.userThresholds?.tstwo -
          this.userThresholds?.tsthree;

        const threshold1 = +this.userThresholds?.tsone;
        const threshold2 = +this.userThresholds?.tstwo + threshold1;
        const threshold3 = +this.userThresholds?.tsthree + threshold2;

        this.threshold1 = +this.userThresholds?.tsone;
        this.threshold2 = +this.userThresholds?.tstwo;
        this.threshold3 = +this.userThresholds?.tsthree;

        thresholds = {
          first: sortedArrayForThreshold[threshold1].value,
          second: sortedArrayForThreshold[threshold2].value,
          third: sortedArrayForThreshold[threshold3 - 1].value,
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
                    .getCityData(
                      this.startDate,
                      this.endDate,
                      e.point.drilldown
                    )
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
                            (+item.original_order_total_amount / totalSum) *
                              10000
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

                      chart.showLoading(
                        '<i class="icon-spinner icon-spin icon-3x"></i>'
                      );
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
                from: thresholds.first,
                color: '#025464',
                name: 'High',
              },
              {
                from: thresholds.second,
                to: thresholds.first,
                color: '#3C486B',
                name: 'Medium',
              },
              {
                from: thresholds.third,
                to: thresholds.second,
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
      });
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

    const sortedArrayForThreshold = data.sort((a: any, b: any) => {
      return b.value - a.value;
    });

    const threshold1 = +this.userThresholds?.tsone;
    const threshold2 = +this.userThresholds?.tstwo + threshold1;
    const threshold3 = +this.userThresholds?.tsthree + threshold2;

    let thresholds = {
      first: sortedArrayForThreshold[threshold1].value,
      second: sortedArrayForThreshold[threshold2].value,
      third: sortedArrayForThreshold[threshold3 - 1].value,
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
            from: thresholds.first,
            color: '#025464',
            name: 'High',
          },
          {
            from: thresholds.second,
            to: thresholds.first,
            color: '#3C486B',
            name: 'Medium',
          },
          {
            from: thresholds.third,
            to: thresholds.second,
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

  ngAfterViewInit() {}

  threshold1 = 0;
  threshold2 = 0;
  threshold3 = 0;

  statesRemaingingForThreshold = 51;

  disableThresholdSaveButton: boolean = false;

  changeThreshold(event: any, threshold: any) {
    if (threshold == 1) {
      this.threshold1 = event.target.value;
    }
    if (threshold == 2) {
      this.threshold2 = event.target.value;
    }
    if (threshold == 3) {
      this.threshold3 = event.target.value;
    }

    this.statesRemaingingForThreshold =
      51 -
      Number(this.threshold1) -
      Number(this.threshold2) -
      Number(this.threshold3);

    if (this.statesRemaingingForThreshold === 0) {
      this.disableThresholdSaveButton = false;
    } else {
      this.disableThresholdSaveButton = true;
    }
  }

  saveThresholdMessage: string = '';

  saveThresholds() {
    const thresholdData = {
      userid: this.userThresholds?.userid,
      tsone: this.threshold1 ? this.threshold1 : this.userThresholds.tsone,
      tstwo: this.threshold2 ? this.threshold2 : this.userThresholds.tstwo,
      tsthree: this.threshold3 ? this.threshold3 : this.userThresholds.tsthree,
    };

    this.userService.setThresholds(thresholdData).subscribe((res: any) => {
      this.toastr.success('Thresholds saved successfully');
    });
    this.showThresholdsModal = false;

    window.location.reload();
  }

  nameMap(name: any) {
    if (this.stateNamesMap[name.split('-')[1]]) {
      return this.stateNamesMap[name.split('-')[1]];
    } else {
      return name;
    }
  }
}
