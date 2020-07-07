import { sortBy } from 'lodash';

export const normalizeStations = (features) =>
  features.map(
    ({
      geometry: { coordinates },
      id,
      properties: {
        ELEVATION: elevation,
        FIRST_DATE: firstUpdated,
        LAST_DATE: lastUpdated,
        PROV_STATE_TERR_CODE: province,
        STATION_NAME: stationName,
      },
    }) => ({
      coordinates,
      id,
      elevation,
      firstUpdated,
      lastUpdated,
      province,
      stationName,
    }),
  );

export const normalizeStationItems = (features) =>
  sortBy(
    features.map(
      ({
        properties: {
          LOCAL_DATE: date,
          MAX_TEMPERATURE: maxTemperature,
          MIN_TEMPERATURE: minTemperature,
          TOTAL_PRECIPITATION: totalPrecipitation,
          // TODO: should we add these?
          // COOLING_DEGREE_DAYS
          // HEATING_DEGREE_DAYS:
          // MEAN_TEMPERATURE
        },
      }) => ({
        date,
        maxTemperature,
        minTemperature,
        totalPrecipitation,
      }),
    ),
    'date',
  );
