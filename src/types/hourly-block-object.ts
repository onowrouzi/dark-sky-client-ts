import { DarkSkyIcon } from "./icon";
import { DarkSkyHourlyResponse } from "./hourly-response";

export type DarkSkyHourlyBlockObject = {
  icon?: DarkSkyIcon;
  summary?: string;
  data: DarkSkyHourlyResponse[];
};
