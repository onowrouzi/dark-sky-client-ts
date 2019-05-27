export type DarkSkyUnitType =
  | "auto" // automatically select units based on geographic location
  | "ca" // same as si, except that windSpeed and windGust are in kilometers per hour
  | "uk2" // same as si, except that nearestStormDistance and visibility are in miles, and windSpeed and windGust in miles per hour
  | "us" // Imperial units (the default)
  | "si"; // SI units
