import { DarkSkyDataPointObject } from "./data-point-object";
import { DarkSkyDataBlockObject } from "./data-block-object";
import { DarkSkyAlertObject } from "./alert-object";
import { DarkSkyFlagsObject } from "./flags-object";

export type DarkSkyResponseObject = {
  latitude: number;
  longitude: number;
  timezone: string;
  offset: number;
  currently?: DarkSkyDataPointObject;
  minutely?: DarkSkyDataBlockObject;
  hourly?: DarkSkyDataBlockObject;
  daily?: DarkSkyDataBlockObject;
  alerts?: DarkSkyAlertObject[];
  flags?: DarkSkyFlagsObject;
};
