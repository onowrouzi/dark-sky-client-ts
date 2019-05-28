import { DarkSkyDataPointObject } from "./data-point-object";

export type DarkSkyHourlyResponse = DarkSkyDataPointObject & {
  apparentTemperature: number;
  precipAccumulation?: number;
  temperature?: number;
};
