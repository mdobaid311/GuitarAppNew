import { APP_CONSTANTS } from 'src/app/constants';

export const environment = {
  production: false,
  SERVICE_APIS: {
    ORIGINAL_TOTAL: APP_CONSTANTS.URI + '/alsd/original-order-total',
    ORIGINAL_ORDER_TOTAL_BY_MONTH:
      APP_CONSTANTS.URI + '/alsd/original-order-total-by-month',
    ORIGINAL_ORDER_TOTAL_BY_YEAR:
      APP_CONSTANTS.URI + '/alsd/original-order-total-by-year',
    ORIGINAL_ORDER_TOTAL_BY_DAY:
      APP_CONSTANTS.URI + '/alsd/original-order-total-by-day',
    ORIGINAL_ORDER_TOTAL_BY_HOUR:
      APP_CONSTANTS.URI + '/alsd/original-order-total-by-hour',
    ORIGINAL_ORDER_TOTAL_BY_DAY_RANGE:
      APP_CONSTANTS.URI + '/alsd/original-order-total-by-day-range',
    ORIGINAL_ORDER_TOTAL_BY_HOUR_RANGE:
      APP_CONSTANTS.URI + '/alsd/original-order-total-by-hour-range',
    ORIGINAL_ORDER_TOTAL_BY_MONTH_RANGE:
      APP_CONSTANTS.URI + '/alsd/original-order-total-by-month-range',
    ORIGINAL_ORDER_TOTAL_BY_YEAR_RANGE:
      APP_CONSTANTS.URI + '/alsd/original-order-total-by-year-range',
    ORG_CHART: APP_CONSTANTS.URI + '/org',
  },
};
