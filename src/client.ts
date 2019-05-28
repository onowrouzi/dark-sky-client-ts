import { DarkSkyRequestObject } from "./types/request-object";
import { DarkSkyResponseObject } from "./types/response-object";
import { DarkSkySupportedLanguage } from "./types/supported-language";
import { DarkSkyUnitType } from "./types/unit-type";
import { DarkSkyRootField } from "./types/root-field-type";
import { DarkSkyDataBlockObject } from "./types/data-block-object";
import { DarkSkyDataPointObject } from "./types/data-point-object";
import { DarkSkyAlertObject } from "./types/alert-object";
import { DarkSkyFlagsObject } from "./types/flags-object";
import { get } from "request-promise-native";
import fetchJsonp = require("fetch-jsonp");

export class DarkSkyApiClient {
  private readonly baseURL = "https://api.darksky.net/forecast";
  private readonly dateTimeRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([0=1]\d|2[0-3]):([0-5]\d):([0-5]\d))/;

  private key: string;
  private params: DarkSkyRequestObject;
  private currentData: DarkSkyResponseObject;
  private refreshRate: number;
  private lastFetched: Date;

  constructor(key: string, req?: DarkSkyRequestObject) {
    this.key = key;
    this.params = req || {};
    this.params.exclude = this.params.exclude || ["minutely"];

    this.refreshRate = 30;
  }

  isCurrentDataExpired(): boolean {
    return (
      !this.lastFetched ||
      this.lastFetched.getTime() <
        new Date().getTime() - this.refreshRate * 60000
    );
  }

  async get(
    field?: DarkSkyRootField,
    params?: DarkSkyRequestObject
  ): Promise<
    | DarkSkyResponseObject
    | DarkSkyDataBlockObject
    | DarkSkyDataPointObject
    | DarkSkyAlertObject[]
    | DarkSkyFlagsObject
  > {
    let data = this.currentData;
    params = params || this.params;
    if (this.params.exclude && this.params.exclude.some(e => e == field)) {
      const index = this.params.exclude.indexOf(field);
      this.params.exclude.splice(index, 1);
    }

    if (
      this.isCurrentDataExpired() ||
      !this.currentData[field] ||
      params.timeSeconds ||
      params.timeString
    ) {
      data = await this.request(params);
    } else {
      console.log("Using existing data.", this.lastFetched.toISOString());
    }

    return field ? data[field] : data;
  }

  async getWeather(): Promise<DarkSkyResponseObject> {
    return (await this.get()) as DarkSkyResponseObject;
  }

  async getCurrent(): Promise<DarkSkyDataPointObject> {
    return (await this.get("currently")) as DarkSkyDataPointObject;
  }

  async getMinutely(): Promise<DarkSkyDataBlockObject> {
    return (await this.get("minutely")) as DarkSkyDataBlockObject;
  }

  async getHourly(): Promise<DarkSkyDataBlockObject> {
    return (await this.get("hourly")) as DarkSkyDataBlockObject;
  }

  async getDaily(): Promise<DarkSkyDataBlockObject> {
    return (await this.get("daily")) as DarkSkyDataBlockObject;
  }

  async getAlerts(): Promise<DarkSkyAlertObject[]> {
    return ((await this.get("alerts")) as DarkSkyAlertObject[]) || [];
  }

  async getFlags(): Promise<DarkSkyFlagsObject> {
    return (await this.get("flags")) as DarkSkyFlagsObject;
  }

  getRequestParams(): DarkSkyRequestObject {
    return this.params;
  }

  setRequestParams(request: DarkSkyRequestObject) {
    this.params = request;
  }

  setCoords(lat: number, lng: number) {
    this.params.latitude = lat;
    this.params.longitude = lng;
  }

  setExcludes(excludes: DarkSkyRootField[]) {
    this.params.exclude = excludes;
  }

  setLang(lang: DarkSkySupportedLanguage) {
    this.params.lang = lang;
  }

  setUnits(units: DarkSkyUnitType) {
    this.params.units = units;
  }

  setTime(time: number | string) {
    switch (typeof time) {
      case "number":
        this.params.timeString = null;
        this.params.timeSeconds = time;
        break;
      case "string":
        this.params.timeSeconds = null;
        this.params.timeString = this.dateTimeRegex.test(time) ? time : null;
        break;
    }
  }

  getRefreshRate(): number {
    return this.refreshRate;
  }

  setRefreshRate(refreshRate: number) {
    this.refreshRate = refreshRate > 30 ? refreshRate : 30;
  }

  clear(includeParams?: boolean) {
    this.currentData = null;
    this.lastFetched = null;
    this.params = includeParams ? { exclude: ["minutely"] } : this.params;
  }

  private parseurl(params: DarkSkyRequestObject): string {
    if (!this.key) {
      throw new Error("No api key specified.");
    }

    if (!params.latitude || !params.longitude) {
      throw new Error("No latitude or longitude specified");
    }

    let url = `${this.baseURL}/${this.key}/${params.latitude},${
      params.longitude
    }?`;

    if (params.exclude && params.exclude.length > 0) {
      url += `exclude=${params.exclude.join(",")}&`;
    }

    if (params.lang) {
      url += `lang=${params.lang}&`;
    }

    if (params.units) {
      url += `units=${params.units}&`;
    }

    if (params.timeSeconds) {
      url += `time=${params.timeSeconds}`;
    } else if (params.timeString) {
      url += `time=${params.timeString}`;
    }

    return url;
  }

  private async request(
    params: DarkSkyRequestObject
  ): Promise<DarkSkyResponseObject> {
    const url = this.parseurl(params);
    const call =
      process.env.ENV == "test"
        ? get({
            uri: url,
            json: true
          })
        : fetchJsonp(url).then((res: any) => res.json());

    return await call
      .then((data: DarkSkyResponseObject) => {
        if (!params.timeSeconds && !params.timeString) {
          this.currentData = data;
          this.lastFetched = new Date();
        }

        this.params.timeSeconds = null;
        this.params.timeString = null;

        console.log("Dark Sky API call executed", new Date().toISOString());
        return data;
      })
      .catch((err: any) => {
        throw new Error(err);
      });
  }
}
