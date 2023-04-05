import { APP_CONSTANTS } from "src/app/constants";


export const environment = {
  production: false,
  SERVICE_APIS: {

    LIST_ALL_PACKAGE_METHOD: APP_CONSTANTS.URI + '/api/v1/generalSettings/getAllpackagemethod',
  }
}
