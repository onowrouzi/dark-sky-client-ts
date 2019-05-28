import { DarkSkyDataPointObject } from "./data-point-object";

export type DarkSkyCurrentlyResponse = DarkSkyDataPointObject & {
  temperature?: number;
  nearestStormBearing?: number;
  nearestStormDistance?: number;
};
