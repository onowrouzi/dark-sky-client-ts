import { DarkSkyDataPointObject } from "./data-point-object";
import { DarkSkyIcon } from "./icon";

export type DarkSkyDataBlockObject = {
  icon?: DarkSkyIcon;
  summary?: string;
  data: DarkSkyDataPointObject[];
};
