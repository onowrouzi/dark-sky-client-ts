import { DarkSkyDataPointObject } from "./data-point-object";
import { DarkSkyDataBlockObject } from "./data-block-object";
import { DarkSkyAlertObject } from "./alert-object";
import { DarkSkyFlagsObject } from "./flags-object";
import { DarkSkyHourlyBlockObject } from "./hourly-block-object";
import { DarkSkyDailyBlockObject } from "./daily-block-object";
import { DarkSkyCurrentlyResponse } from "./currently-resposne";

export type DarkSkyResponseObject = {
  latitude: number;
  longitude: number;
  timezone: string;
  offset: number;
  currently?: DarkSkyCurrentlyResponse;
  minutely?: DarkSkyDataBlockObject;
  hourly?: DarkSkyHourlyBlockObject;
  daily?: DarkSkyDailyBlockObject;
  alerts?: DarkSkyAlertObject[];
  flags?: DarkSkyFlagsObject;
};
