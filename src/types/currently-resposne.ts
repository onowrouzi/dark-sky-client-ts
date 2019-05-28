import { DarkSkyDataPointObject } from "./data-point-object";

export type DarkSkyCurrentlyResponse = DarkSkyDataPointObject & {
  nearestStormBearing?: number;
  nearestStormDistance?: number;
};
