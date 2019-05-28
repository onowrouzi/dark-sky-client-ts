import { DarkSkyIcon } from "./icon";
import { DarkSkyPrecipType } from "./precip-type";

export type DarkSkyDataPointObject = {
  time: number;
  summary?: string;
  icon?: DarkSkyIcon;
  precipIntensity?: number;
  precipProbability?: number;
  precipType?: DarkSkyPrecipType;
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
