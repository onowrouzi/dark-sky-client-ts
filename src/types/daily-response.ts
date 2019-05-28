import { DarkSkyDataPointObject } from "./data-point-object";

export type DarkSkyDailyResponse = DarkSkyDataPointObject & {
  apparentTemperatureMin?: number;
  apparentTemperatureMinTime?: number;
  apparentTemperatureMax?: number;
  apparentTemperatureMaxTime?: number;
  sunriseTime?: number;
  moonPhase?: number;
  precipAccumulation?: number;
  precipIntensityMax?: number;
  precipIntensityMaxTime?: number;
  sunsetTime?: number;
  temperatureHigh?: number;
  temperatureHighTime?: number;
  temperatureLow?: number;
  temperatureLowTime?: number;
  temperatureMin?: number;
  temperatureMinTime?: number;
  temperatureMax?: number;
  temperatureMaxTime?: number;
  uvIndexTime?: number;
  windGustTime?: number;
};
