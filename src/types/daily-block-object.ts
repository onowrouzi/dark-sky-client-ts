import { DarkSkyIcon } from "./icon";
import { DarkSkyDailyResponse } from "./daily-response";

export type DarkSkyDailyBlockObject = {
  icon?: DarkSkyIcon;
  summary?: string;
  data: DarkSkyDailyResponse[];
};
