import { DarkSkyRootField } from "./root-field-type";
import { DarkSkySupportedLanguage } from "./supported-language";
import { DarkSkyUnitType } from "./unit-type";

export type DarkSkyRequestObject = {
  latitude?: number;
  longitute?: number;
  exclude?: DarkSkyRootField[];
  lang?: DarkSkySupportedLanguage;
  units?: DarkSkyUnitType;
  timeSeconds?: number;
  timeString?: string;
};
