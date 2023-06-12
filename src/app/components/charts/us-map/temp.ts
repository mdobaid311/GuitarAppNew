// import { Component, ElementRef, ViewChild } from '@angular/core';
// import * as Highcharts from 'highcharts';

// import USMap from '@highcharts/map-collection/countries/us/us-all.topo.json';

// import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
// import { ChartService } from 'src/app/services/chartData.service';
// import moment from 'moment';

// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.scss'],
// })
// export class MapComponent {
//   Highcharts: typeof Highcharts = Highcharts;
//   chartConstructor = 'mapChart';
//   updateFlag = true;

//   globalFromDate: NgbDate;
//   globalToDate: NgbDate | null = null;

//   todaysDate = moment(new Date()).format('YYYY-MM-DD');
//   fullDate: any = moment(new Date()).format('YYYY-MM-DD');

//   startDate: any = '2023-02-05 00:00:00';
//   endDate: any = '2023-02-05 23:59:59';

//   data = [
//     ['us-', 3684.11, '3.7K'],
//     ['us-???', 169, '169'],
//     ['us-3903', 53.36, '53'],
//     ['us-aa', 7179.64, '7.2K'],
//     ['us-ab', 949, '949'],
//     ['us-abingdon', 156.9, '157'],
//     ['us-ae', 181034.02, '181K'],
//     ['us-ak', 1386057.57, '1.4M'],
//     ['us-al', 10231794.36, '10M'],
//     ['us-alabama', 0, '0'],
//     ['us-alberta', 351.78000000000003, '352'],
//     ['us-ap', 173767.61, '174K'],
//     ['us-ar', 5836443.62, '5.8M'],
//     ['us-az', 20235865.25, '20M'],
//     ['us-bc', 265.94, '266'],
//     ['us-bolivar', 2972.65, '3K'],
//     ['us-ca', 133534080.7, '134M'],
//     ['us-california', 0, '0'],
//     ['us-californie', 119.95, '120'],
//     ['us-campbell river', 179.1, '179'],
//     ['us-co', 16977149.93, '17M'],
//     ['us-corozal', 5129.91, '5.1K'],
//     ['us-ct', 10432508.99, '10M'],
//     ['us-dc', 1508777.36, '1.5M'],
//     ['us-de', 8757519.86, '8.8M'],
//     ['us-fl', 58148251.25, '58M'],
//     ['us-fm', 357, '357'],
//     ['us-ga', 25824161.1, '26M'],
//     ['us-gu', 1186.08, '1.2K'],
//     ['us-guerrero cuauhtemoc', 50, '50'],
//     ['us-hi', 2332261.8, '2.3M'],
//     ['us-ia', 5018812.24, '5M'],
//     ['us-id', 3863796.82, '3.9M'],
//     ['us-il', 25143058.65, '25M'],
//     ['us-in', 10571979.78, '11M'],
//     ['us-kharkivska obl', 70, '70'],
//     ['us-ks', 6934160.28, '6.9M'],
//     ['us-ky', 8095082.15, '8.1M'],
//     ['us-la', 9339909.74, '9.3M'],
//     ['us-las vegas', 130.02, '130'],
//     ['us-louisiana', 0, '0'],
//     ['us-ma', 17384547.38, '17M'],
//     ['us-md', 13602412.67, '14M'],
//     ['us-me', 2677173.73, '2.7M'],
//     ['us-mi', 18432266.84, '18M'],
//     ['us-mn', 10809580.69, '11M'],
//     ['us-mo', 10028829.09, '10M'],
//     ['us-ms', 4522140.58, '4.5M'],
//     ['us-mt', 1963009.22, '2M'],
//     ['us-nb', 479.99, '480'],
//     ['us-nc', 22157756.51, '22M'],
//     ['us-nd', 1419586.89, '1.4M'],
//     ['us-ne', 4372633.8, '4.4M'],
//     ['us-nh', 5805467.31, '5.8M'],
//     ['us-nj', 20676809.35, '21M'],
//     ['us-nm', 4553619.16, '4.6M'],
//     ['us-nueva esparta', 74.99, '75'],
//     ['us-nv', 10024003.99, '10M'],
//     ['us-ny', 41936401.1, '42M'],
//     ['us-oh', 19110738.44, '19M'],
//     ['us-ok', 8925096.88, '8.9M'],
//     ['us-on', 6551.03, '6.6K'],
//     ['us-ontario', 963.47, '963'],
//     ['us-or', 18123941.79, '18M'],
//     ['us-pa', 19080728.94, '19M'],
//     ['us-pr', 464360.84, '464K'],
//     ['us-puerto rico', 749, '749'],
//     ['us-qc', 1298.99, '1.3K'],
//     ['us-ri', 1887858.45, '1.9M'],
//     ['us-sc', 10264786.14, '10M'],
//     ['us-sd', 2135101.7, '2.1M'],
//     ['us-select', 158.35, '158'],
//     ['us-sk', 89.99, '90'],
//     ['us-tn', 21078776.94, '21M'],
//     ['us-tx', 86651559.64999999, '87M'],
//     ['us-us', 2069.08, '2.1K'],
//     ['us-ut', 7679263.75, '7.7M'],
//     ['us-va', 19961551.52, '20M'],
//     ['us-vi', 30308.69, '30K'],
//     ['us-virginia', 2035.17, '2K'],
//     ['us-vt', 1430722.26, '1.4M'],
//     ['us-wa', 18233361.75, '18M'],
//     ['us-wi', 9017259.02, '9M'],
//     ['us-wisconsin', 0, '0'],
//     ['us-wv', 2118384.85, '2.1M'],
//     ['us-wy', 880877.06, '881K'],
//   ];

//   // mapView = USMap.objects.default['hc-recommended-mapview'];

//   data1 = Highcharts.geojson(USMap);

//   loader = false;

//   chartOptions: any;

//   constructor(private chartData: ChartService, calendar: NgbCalendar) {
//     Highcharts.setOptions({
//       lang: {
//         numericSymbols: ['K', 'M', 'B', 'T', 'P', 'E'],
//       },
//     });

//     this.globalFromDate = calendar.getToday();
//     this.globalToDate = calendar.getToday();
//   }

//   ngOnInit() {
//     const data = Highcharts.geojson(USMap)

//     console.log(data);

//     this.chartOptions = {
//       chart: {
//         events: {
//           drilldown: (e: any) => {
//             console.log(e.point.drilldown);
//             if (!e.seriesOptions) {
//               const chart = e.target,
//                 mapKey = (e.point as any).drilldown,
//                 mapLocation = (e.point as any).mapLocation;

//               // Handle error, the timeout is cleared on success
//               let fail = setTimeout(() => {
//                 if (!Highcharts.maps[mapKey]) {
//                   chart.showLoading(
//                     '<i class="icon-frown"></i> Failed loading ' + e.point.value
//                   );
//                   fail = setTimeout(() => {
//                     chart.hideLoading();
//                   }, 1000);
//                 }
//               }, 3000);

//               // Show the spinner
//               chart.showLoading(
//                 '<i class="icon-spinner icon-spin icon-3x"></i>'
//               ); // Font Awesome spinner

//               // Load the drilldown map
//               fetch(
//                 'https://code.highcharts.com/mapdata/countries/us/' +
//                   mapKey +
//                   '-all.topo.json'
//               )
//                 .then((response) => response.json())
//                 .then((mapData) => {
//                   const drillDownData = Highcharts.geojson(mapData);
//                   Highcharts.maps[mapKey] = drillDownData;

//                   drillDownData.forEach((d, i) => {
//                     d.mapLocation =
//                       'countries/' +
//                       d.properties['hc-key'] +
//                       '/' +
//                       d.properties['hc-key'] +
//                       '-all';
//                     d.drilldown = d.properties['hc-key'];
//                   });

//                   // Hide loading and add series
//                   chart.hideLoading();
//                   clearTimeout(fail);
//                   chart.addSeriesAsDrilldown(e.point, {
//                     name: e.point.value,
//                     mapData: Highcharts.maps[mapKey],
//                     data: [
//                       ['de', 30],
//                       ['ro', 5],
//                     ],
//                     type: 'map',
//                     dataLabels: {
//                       enabled: true,
//                       format: '{point.value}',
//                     },
//                   });
//                   if (mapKey.indexOf('de') != -1) {
//                     chart.addSeries(
//                       {
//                         type: 'mappoint',
//                         name: 'Active Locations',
//                         data: [
//                           {
//                             name: 'Frankfurter Werk',
//                             lat: 50.11,
//                             lon: 8.68,
//                           },
//                           {
//                             name: 'Berliner Werk',
//                             lat: 52.52,
//                             lon: 13.4,
//                           },
//                         ],
//                       },
//                       true
//                     );

//                     // chart.addSeriesAsDrilldown(e.point, {
//                     //   type: 'mappoint',
//                     //   name: 'Active Locations',
//                     //   data: [
//                     //     {
//                     //       name: 'Frankfurter Werk',
//                     //       lat: 50.11,
//                     //       lon: 8.68,
//                     //     },
//                     //     {
//                     //       name: 'Berliner Werk',
//                     //       lat: 52.52,
//                     //       lon: 13.4,
//                     //     },
//                     //   ],
//                     // });
//                   }
//                 });
//             }
//           },
//           drillup: function () {
//             // this.setTitle(null, { text: '' });
//           },
//         },
//       },
//       tooltip: { enabled: false },
//       title: {
//         text: 'Sales',
//         style: {
//           color: '#fff',
//           fontSize: '26px',
//           fontFamily: 'Poppins, sans-serif',
//         },
//       },
//       mapNavigation: {
//         enabled: true,
//         buttonOptions: {
//           alignTo: 'spacingBox',
//         },
//       },
//       exporting: {
//         enabled: true,
//       },
//       credits: {
//         enabled: true,
//       },
//       legend: {
//         enabled: true,
//         itemStyle: {
//           color: '#fff',
//         },
//         itemHoverStyle: {
//           color: '#4aa4ff',
//         },
//       },
//       colorAxis: {
//         dataClasses: [
//           {
//             to: 100000,
//             color: '#F8F1F1',
//           },
//           {
//             from: 10000,
//             to: 100000,
//             color: '#E8AA42',
//           },
//           {
//             from: 100000,
//             to: 500000,
//             color: '#C88EA7',
//           },
//           {
//             from: 500000,
//             to: 1000000,
//             color: '#18978F',
//           },
//           {
//             from: 1000000,
//             to: 2500000,
//             color: '#E8D2A6',
//           },
//           {
//             from: 2500000,
//             to: 5000000,
//             color: '#0E5E6F',
//           },
//           {
//             from: 5000000,
//             to: 10000000,
//             color: '#E76161',
//           },
//         ],

//         type: 'linear',
//       },
//       series: [
//         {
//           point: {},
//           type: 'map',
//           name: 'Sales',
//           states: {
//             hover: {
//               color: '#BADA55',
//             },
//           },

//           dataLabels: {
//             enabled: true,
//             format: '{point.value}',
//             // format : '{point.name}', to abbreviate the value
//             formatter: () => {
//               return '0';
//             },
//             color: '#fff',
//             style: {
//               fontSize: '15px',
//               color: '#fff',
//             },
//           },
//           allAreas: false,
//           mapData: data,
//           data: this.data,
//         },
//         // should be added only for country view
//         // {
//         //   type: 'mappoint',
//         //   name: 'Locations',
//         //   showInLegend: false,
//         //   color: (Highcharts.getOptions() as any).colors[4],
//         //   marker: {
//         //     fillColor: '#4d4d4d',
//         //     radius: 15,
//         //     states: {
//         //       hover: {
//         //         enabled: false,
//         //         radius: 10,
//         //       },
//         //     },
//         //   },
//         //   dataLabels: {
//         //     enabled: true,
//         //     format: '{point.value}',
//         //   },
//         //   events: {
//         //     click: (event: any) => {
//         //       console.log('Show the truck list for:', event.point.options.name);
//         //     },
//         //   },
//         //   data: [
//         //     {
//         //       name: 'Frankfurter Werk',
//         //       lat: 50.11,
//         //       lon: 8.68,
//         //     },
//         //     {
//         //       name: 'Berliner Werk',
//         //       lat: 52.52,
//         //       lon: 13.4,
//         //     },
//         //     {
//         //       name: 'Italia spedition',
//         //       lat: 41.9,
//         //       lon: 12.48,
//         //     },
//         //   ],
//         // },
//       ],
//       drilldown: {
//         activeDataLabelStyle: {
//           color: '#FFFFFF',
//           textDecoration: 'none',
//           textOutline: '1px #000000',
//         },
//         drillUpButton: {
//           relativeTo: 'spacingBox',
//           position: {
//             x: 0,
//             y: 60,
//           },
//         },
//       },
//     };
//   }
//   onGlobalDateRangeChanged(date: NgbDate) {
//     if (!this.globalFromDate && !this.globalToDate) {
//       this.globalFromDate = date;
//     } else if (
//       this.globalFromDate &&
//       !this.globalToDate &&
//       date.after(this.globalFromDate)
//     ) {
//       this.globalToDate = date;
//     } else {
//       this.globalToDate = null;
//       this.globalFromDate = date;
//     }

//     const beginDate =
//       this.globalFromDate.year +
//       '-' +
//       this.globalFromDate.month +
//       '-' +
//       this.globalFromDate.day;
//     const endDate = this.globalToDate
//       ? this.globalToDate.year +
//         '-' +
//         this.globalToDate.month +
//         '-' +
//         this.globalToDate.day
//       : null;
//     if (beginDate && endDate) {
//       this.fullDate = beginDate + ' to ' + endDate;
//       this.chartData.getMapData(beginDate, endDate).subscribe((res: any) => {
//         this.data1 = res;
//         this.updateChart(res);
//       });
//     }
//   }

//   changeDate(value: any) {
//     if (value === 'prev') {
//       this.fullDate = moment(this.fullDate)
//         .subtract(1, 'days')
//         .format('YYYY-MM-DD');
//     } else if (value === 'next') {
//       this.fullDate = moment(this.fullDate).add(1, 'days').format('YYYY-MM-DD');
//     }
//   }

//   onRangeSelect(range: any) {
//     if (range === '1m') {
//       const startDate = moment('2023-05-01 16:28:21')
//         .subtract(1, 'months')
//         .format('YYYY-MM-DD HH:mm');
//       const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
//       this.chartData.getMapData(startDate, endDate).subscribe((res: any) => {
//         this.data1 = res;
//         this.updateChart(res);
//       });
//     } else if (
//       range === '2h' ||
//       range === '6h' ||
//       range === '12h' ||
//       range === '1d'
//     ) {
//       if (range === '2h') {
//         this.startDate = moment('2023-05-01 16:28:21')
//           .subtract(2, 'hours')
//           .format('YYYY-MM-DD HH:mm');
//         this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
//         this.chartData
//           .getMapData(this.startDate, this.endDate)
//           .subscribe((res: any) => {
//             this.data1 = res;
//             this.updateChart(res);
//           });

//         this.fullDate = 'Last 2 hours';
//       } else if (range === '6h') {
//         this.startDate = moment('2023-05-01 16:28:21')
//           .subtract(6, 'hours')
//           .format('YYYY-MM-DD HH:mm');
//         this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
//         this.chartData
//           .getMapData(this.startDate, this.endDate)
//           .subscribe((res: any) => {
//             this.data1 = res;
//             this.updateChart(res);
//           });
//         this.fullDate = 'Last 6 hours';
//       } else if (range === '12h') {
//         this.startDate = moment('2023-05-01 16:28:21')
//           .subtract(12, 'hours')
//           .format('YYYY-MM-DD HH:mm');
//         this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
//         this.chartData
//           .getMapData(this.startDate, this.endDate)
//           .subscribe((res: any) => {
//             this.data1 = res;
//             this.updateChart(res);
//           });
//         this.fullDate = 'Last 12 hours';
//       } else if (range === '1d') {
//         this.startDate = moment('2023-05-01 16:28:21')
//           .subtract(1, 'days')
//           .format('YYYY-MM-DD HH:mm');
//         this.endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
//         this.chartData
//           .getMapData(this.startDate, this.endDate)
//           .subscribe((res: any) => {
//             this.data1 = res;
//             this.updateChart(res);
//           });
//         this.fullDate = 'Last 24 hours';
//       }
//     } else if (range === '6m') {
//       const startDate = moment('2023-05-01 16:28:21')
//         .subtract(6, 'months')
//         .format('YYYY-MM-DD HH:mm');
//       const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
//       this.chartData.getMapData(startDate, endDate).subscribe((res: any) => {
//         this.data1 = res;
//         this.updateChart(res);
//       });
//       this.fullDate = 'Last 6 months';
//     } else if (range === '1y') {
//       const startDate = moment('2023-05-01 16:28:21')
//         .subtract(12, 'months')
//         .format('YYYY-MM-DD HH:mm');
//       const endDate = moment('2023-05-01 16:28:21').format('YYYY-MM-DD HH:mm');
//       this.chartData.getMapData(startDate, endDate).subscribe((res: any) => {
//         this.data1 = res;
//         this.updateChart(res);
//       });
//       this.fullDate = 'Last 12 months';
//     }
//   }

//   updateChart(data: any) {}
// }


// ngOnInit() {
//   const data = Highcharts.geojson(USMap)

//   console.log(data);

//   this.chartOptions = {
//     chart: {
//       events: {
//         drilldown: (e: any) => {
//           console.log(e.point.drilldown);
//           if (!e.seriesOptions) {
//             const chart = e.target,
//               mapKey = (e.point as any).drilldown,
//               mapLocation = (e.point as any).mapLocation;

//             // Handle error, the timeout is cleared on success
//             let fail = setTimeout(() => {
//               if (!Highcharts.maps[mapKey]) {
//                 chart.showLoading(
//                   '<i class="icon-frown"></i> Failed loading ' + e.point.value
//                 );
//                 fail = setTimeout(() => {
//                   chart.hideLoading();
//                 }, 1000);
//               }
//             }, 3000);

//             // Show the spinner
//             chart.showLoading(
//               '<i class="icon-spinner icon-spin icon-3x"></i>'
//             ); // Font Awesome spinner

//             // Load the drilldown map
//             fetch(
//               'https://code.highcharts.com/mapdata/countries/us/' +
//                 mapKey +
//                 '-all.topo.json'
//             )
//               .then((response) => response.json())
//               .then((mapData) => {
//                 const drillDownData = Highcharts.geojson(mapData);
//                 Highcharts.maps[mapKey] = drillDownData;

//                 drillDownData.forEach((d, i) => {
//                   d.mapLocation =
//                     'countries/' +
//                     d.properties['hc-key'] +
//                     '/' +
//                     d.properties['hc-key'] +
//                     '-all';
//                   d.drilldown = d.properties['hc-key'];
//                 });

//                 // Hide loading and add series
//                 chart.hideLoading();
//                 clearTimeout(fail);
//                 chart.addSeriesAsDrilldown(e.point, {
//                   name: e.point.value,
//                   mapData: Highcharts.maps[mapKey],
//                   data: [
//                     ['de', 30],
//                     ['ro', 5],
//                   ],
//                   type: 'map',
//                   dataLabels: {
//                     enabled: true,
//                     format: '{point.value}',
//                   },
//                 });
//                 if (mapKey.indexOf('de') != -1) {
//                   chart.addSeries(
//                     {
//                       type: 'mappoint',
//                       name: 'Active Locations',
//                       data: [
//                         {
//                           name: 'Frankfurter Werk',
//                           lat: 50.11,
//                           lon: 8.68,
//                         },
//                         {
//                           name: 'Berliner Werk',
//                           lat: 52.52,
//                           lon: 13.4,
//                         },
//                       ],
//                     },
//                     true
//                   );

//                   // chart.addSeriesAsDrilldown(e.point, {
//                   //   type: 'mappoint',
//                   //   name: 'Active Locations',
//                   //   data: [
//                   //     {
//                   //       name: 'Frankfurter Werk',
//                   //       lat: 50.11,
//                   //       lon: 8.68,
//                   //     },
//                   //     {
//                   //       name: 'Berliner Werk',
//                   //       lat: 52.52,
//                   //       lon: 13.4,
//                   //     },
//                   //   ],
//                   // });
//                 }
//               });
//           }
//         },
//         drillup: function () {
//           // this.setTitle(null, { text: '' });
//         },
//       },
//     },
//     tooltip: { enabled: false },
//     title: {
//       text: 'Sales',
//       style: {
//         color: '#fff',
//         fontSize: '26px',
//         fontFamily: 'Poppins, sans-serif',
//       },
//     },
//     mapNavigation: {
//       enabled: true,
//       buttonOptions: {
//         alignTo: 'spacingBox',
//       },
//     },
//     exporting: {
//       enabled: true,
//     },
//     credits: {
//       enabled: true,
//     },
//     legend: {
//       enabled: true,
//       itemStyle: {
//         color: '#fff',
//       },
//       itemHoverStyle: {
//         color: '#4aa4ff',
//       },
//     },
//     colorAxis: {
//       dataClasses: [
//         {
//           to: 100000,
//           color: '#F8F1F1',
//         },
//         {
//           from: 10000,
//           to: 100000,
//           color: '#E8AA42',
//         },
//         {
//           from: 100000,
//           to: 500000,
//           color: '#C88EA7',
//         },
//         {
//           from: 500000,
//           to: 1000000,
//           color: '#18978F',
//         },
//         {
//           from: 1000000,
//           to: 2500000,
//           color: '#E8D2A6',
//         },
//         {
//           from: 2500000,
//           to: 5000000,
//           color: '#0E5E6F',
//         },
//         {
//           from: 5000000,
//           to: 10000000,
//           color: '#E76161',
//         },
//       ],

//       type: 'linear',
//     },
//     series: [
//       {
//         point: {},
//         type: 'map',
//         name: 'Sales',
//         states: {
//           hover: {
//             color: '#BADA55',
//           },
//         },

//         dataLabels: {
//           enabled: true,
//           format: '{point.value}',
//           // format : '{point.name}', to abbreviate the value
//           formatter: () => {
//             return '0';
//           },
//           color: '#fff',
//           style: {
//             fontSize: '15px',
//             color: '#fff',
//           },
//         },
//         allAreas: false,
//         mapData: data,
//         data: this.data,
//       },
//       // should be added only for country view
//       // {
//       //   type: 'mappoint',
//       //   name: 'Locations',
//       //   showInLegend: false,
//       //   color: (Highcharts.getOptions() as any).colors[4],
//       //   marker: {
//       //     fillColor: '#4d4d4d',
//       //     radius: 15,
//       //     states: {
//       //       hover: {
//       //         enabled: false,
//       //         radius: 10,
//       //       },
//       //     },
//       //   },
//       //   dataLabels: {
//       //     enabled: true,
//       //     format: '{point.value}',
//       //   },
//       //   events: {
//       //     click: (event: any) => {
//       //       console.log('Show the truck list for:', event.point.options.name);
//       //     },
//       //   },
//       //   data: [
//       //     {
//       //       name: 'Frankfurter Werk',
//       //       lat: 50.11,
//       //       lon: 8.68,
//       //     },
//       //     {
//       //       name: 'Berliner Werk',
//       //       lat: 52.52,
//       //       lon: 13.4,
//       //     },
//       //     {
//       //       name: 'Italia spedition',
//       //       lat: 41.9,
//       //       lon: 12.48,
//       //     },
//       //   ],
//       // },
//     ],
//     drilldown: {
//       activeDataLabelStyle: {
//         color: '#FFFFFF',
//         textDecoration: 'none',
//         textOutline: '1px #000000',
//       },
//       drillUpButton: {
//         relativeTo: 'spacingBox',
//         position: {
//           x: 0,
//           y: 60,
//         },
//       },
//     },
//   };
// }
