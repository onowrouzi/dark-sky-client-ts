import { DarkSkyResponseObject } from "../src/types/response-object";
import { DarkSkyDataBlockObject } from "../src/types/data-block-object";
import { DarkSkyApiClient } from "./../src";
import { DarkSkyHourlyBlockObject } from "../src/types/hourly-block-object";

require("dotenv").config();

describe("Dark Sky Client Tests", () => {
  process.env = Object.assign(process.env, { ENV: "test" });
  const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);
  const lat = parseFloat(process.env.TEST_LAT);
  const lng = parseFloat(process.env.TEST_LNG);

  beforeEach(() => {
    api.setRequestParams({
      latitude: lat,
      longitude: lng
    });
    api.setExcludes(["minutely"]);
  });

  it("DarkSkyApiClient - get - Returns full response", async () => {
    const res = await api.getWeather();

    expect(res).not.toBeUndefined();
    expect(res.currently).not.toBeUndefined();
    expect(res.daily).not.toBeUndefined();
  });

  it("DarkSkyApiClient - get (with all params & time as number) - Returns full response without flags", async () => {
    api.setCoords(lat, lng);
    api.setLang("en");
    api.setUnits("us");
    api.setExcludes(["flags"]);
    api.setTime(Date.parse("05/08/2018") / 1000);

    const res = (await api.get()) as DarkSkyResponseObject;

    expect(res).not.toBeUndefined();
    expect(res.currently).not.toBeUndefined();
    expect(res.daily).not.toBeUndefined();
    expect(res.hourly).not.toBeUndefined();
    expect(res.minutely).not.toBeUndefined();
    expect(res.flags).toBeUndefined();
  });

  it("DarkSkyApiClient - get (with all params passed in & time as string) - Returns full response", async () => {
    api.setLang("en");
    api.setUnits("us");
    api.setExcludes(["flags"]);

    api.clear(true);

    const res = (await api.get(null, {
      latitude: lat,
      longitude: lng,
      lang: "zh",
      units: "uk2",
      timeString: new Date("05/08/2018").toISOString()
    })) as DarkSkyResponseObject;

    expect(res).not.toBeUndefined();
    expect(res.currently).not.toBeUndefined();
    expect(res.daily).not.toBeUndefined();
    expect(res.hourly).not.toBeUndefined();
    expect(res.minutely).not.toBeUndefined();
    expect(res.flags).not.toBeUndefined();
  });

  it("DarkSkyApiClient - get (hours with previously excluded hourly field) - Returns DarkSkyDataBlockObject", async () => {
    api.setExcludes(["hourly"]);

    const res = (await api.get("hourly")) as DarkSkyHourlyBlockObject;

    expect(res).not.toBeUndefined();
  });

  it("DarkSkyApiClient - get (after clearing cached data) - Returns ", async () => {
    api.clear();

    const res = (await api.get("hourly")) as DarkSkyHourlyBlockObject;

    expect(res).not.toBeUndefined();
  });

  it("DarkSkyApiClient - get (with empty api key) - Throws Error", async () => {
    const throwableApi = new DarkSkyApiClient("");
    await expect(throwableApi.get()).rejects.toThrowError();
  });

  it("DarkSkyApiClient - get (without coords) - Throws Error", async () => {
    const throwableApi = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);
    await expect(throwableApi.get()).rejects.toThrowError();
  });

  it("DarkSkyApiClient - getCurrent - Returns DarkSkyDataPointObject", async () => {
    const res = await api.getCurrent();

    expect(res).not.toBeUndefined();
    expect(res.time).not.toBeUndefined();
  });

  it("DarkSkyApiClient - getMinutely - Returns DarkSkyDataBlockObject", async () => {
    const res = await api.getMinutely();

    expect(res).not.toBeUndefined();
    expect(res.data).not.toBeUndefined();
    expect(res.data.length > 0).toBe(true);
  });

  it("DarkSkyApiClient - getHourly - Returns DarkSkyDataBlockObject", async () => {
    const res = await api.getHourly();

    expect(res).not.toBeUndefined();
    expect(res.data).not.toBeUndefined();
    expect(res.data.length > 0).toBe(true);
  });

  it("DarkSkyApiClient - getDaily - Returns DarkSkyDataBlockObject", async () => {
    const res = await api.getDaily();

    expect(res).not.toBeUndefined();
    expect(res.data).not.toBeUndefined();
    expect(res.data.length > 0).toBe(true);
  });

  it("DarkSkyApiClient - getFlags - Returns DarkSkyFlagsObject", async () => {
    const res = await api.getFlags();

    expect(res).not.toBeUndefined();
    expect(res.sources).not.toBeUndefined();
    expect(res.sources.length > 0).toBe(true);
  });

  it("DarkSkyApiClient - getAlerts - Returns DarkSkyAlertObject[]", async () => {
    const res = await api.getAlerts();

    expect(res).not.toBeUndefined();
    expect(Array.isArray(res)).toBe(true);
  });

  it("DarkSkyApiClient - setRequestParams", () => {
    api.setRequestParams({
      latitude: 0,
      longitude: 0,
      lang: "en",
      units: "us",
      exclude: ["minutely", "flags"]
    });

    const params = api.getRequestParams();

    expect(params.latitude).toBe(0);
    expect(params.longitude).toBe(0);
    expect(params.lang).toBe("en");
    expect(params.units).toBe("us");
    expect(params.exclude).toEqual(["minutely", "flags"]);
  });

  it("DarkSkyApiClient - setRefreshRate", () => {
    api.setRefreshRate(60);

    const refreshRate = api.getRefreshRate();

    expect(refreshRate).toBe(60);
  });

  it("DarkSkyApiClient - setRefreshRate (below 30)", () => {
    api.setRefreshRate(10);

    const refreshRate = api.getRefreshRate();

    expect(refreshRate).toBe(30);
  });

  it("DarkSkyApiClient - setLang", () => {
    api.setLang("zh");

    const params = api.getRequestParams();

    expect(params.lang).toBe("zh");
  });

  it("DarkSkyApiClient - setUnits", () => {
    api.setUnits("uk2");

    const params = api.getRequestParams();

    expect(params.units).toBe("uk2");
  });

  it("DarkSkyApiClient - setExcludes", () => {
    api.setExcludes(["minutely", "flags"]);

    const params = api.getRequestParams();

    expect(params.exclude).toEqual(["minutely", "flags"]);
  });

  it("DarkSkyApiClient - setTime (with number)", () => {
    const time = new Date().getTime();

    api.setTime(time);

    const params = api.getRequestParams();

    expect(params.timeSeconds).toBe(time);
    expect(params.timeString).toBeNull();
  });

  it("DarkSkyApiClient - setTime (with string)", () => {
    const time = new Date().toISOString();

    api.setTime(time);

    const params = api.getRequestParams();

    expect(params.timeString).toBe(time);
    expect(params.timeSeconds).toBeNull();
  });

  it("DarkSkyApiClient - setTime (with invalid string)", () => {
    const time = "12-25-2001";

    api.setTime(time);

    const params = api.getRequestParams();

    expect(params.timeString).toBeNull();
    expect(params.timeSeconds).toBeNull();
  });
});
