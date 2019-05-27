import { DarkSkyIcon } from "./icon";

export type DarkSkyDataPointObject = {
  time: number;
  summary?: string;
  icon?: DarkSkyIcon;
  nearestStormDistance?: number;
  nearestStormBearing?: number;
  precipIntensity?: number;
  precipProbability?: number;
  temperature?: number;
  apparentTemperature?: number;
  dewPoint?: number;
  humidity?: number;
  pressure?: number;
  windSpeed?: number;
  windGust?: number;
  windBearing?: number;
  cloudCover?: number;
  uvIndex?: number;
  visibility?: number;
  ozone?: number;
};
