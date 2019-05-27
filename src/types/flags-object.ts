import { DarkSkyUnitType } from "./unit-type";

export type DarkSkyFlagsObject = {
  darkskyUnavailable: boolean;
  sources: string[];
  nearestStation: number;
  units: DarkSkyUnitType;
};
