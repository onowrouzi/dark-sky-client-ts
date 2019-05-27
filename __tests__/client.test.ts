import { DarkSkyResponseObject } from "../src/types/response-object";
import { DarkSkyDataBlockObject } from "../src/types/data-block-object";
import { DarkSkyApiClient } from "./../src";

require("dotenv").config();

describe("Dark Sky Client Tests", () => {
  process.env = Object.assign(process.env, { ENV: "test" });

  it("DarkSkyApiClient - get - Returns full response", async () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    const lat = parseFloat(process.env.TEST_LAT);
    const lng = parseFloat(process.env.TEST_LNG);

    api.setCoords(lat, lng);

    const res = (await api.get()) as DarkSkyResponseObject;

    expect(res).not.toBeNull();
    expect(res.alerts).not.toBeNull();
    expect(res.currently).not.toBeNull();
    expect(res.daily).not.toBeNull();
  });

  it("DarkSkyApiClient - get (with all params) - Returns full response without flags", async () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    const lat = parseFloat(process.env.TEST_LAT);
    const lng = parseFloat(process.env.TEST_LNG);

    api.setCoords(lat, lng);
    api.setLang("en");
    api.setUnits("us");
    api.setExcludes(["flags"]);
    api.setTime(Date.parse("05/08/2018") / 1000);

    const res = (await api.get()) as DarkSkyResponseObject;

    expect(res).not.toBeNull();
    expect(res.currently).not.toBeNull();
    expect(res.daily).not.toBeNull();
    expect(res.hourly).not.toBeNull();
    expect(res.minutely).not.toBeNull();
    expect(res.flags).toBeUndefined();
  });

  it("DarkSkyApiClient - get (with all params passed in) - Returns full response", async () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    const lat = parseFloat(process.env.TEST_LAT);
    const lng = parseFloat(process.env.TEST_LNG);

    api.setCoords(lat, lng);
    api.setLang("en");
    api.setUnits("us");
    api.setExcludes(["flags"]);

    const res = (await api.get(null, {
      latitude: lat,
      longitute: lng,
      lang: "zh",
      units: "uk2",
      timeString: new Date("05/08/2018").toISOString()
    })) as DarkSkyResponseObject;

    expect(res).not.toBeNull();
    expect(res.currently).not.toBeNull();
    expect(res.daily).not.toBeNull();
    expect(res.hourly).not.toBeNull();
    expect(res.minutely).not.toBeNull();
    expect(res.flags).not.toBeNull();
  });

  it("DarkSkyApiClient - get (hours with previously excluded hourly field) - Returns hourly response", async () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    const lat = parseFloat(process.env.TEST_LAT);
    const lng = parseFloat(process.env.TEST_LNG);

    api.setCoords(lat, lng);
    api.setExcludes(["hourly"]);

    const res = (await api.get("hourly")) as DarkSkyDataBlockObject;

    expect(res).not.toBeNull();
  });

  it("DarkSkyApiClient - get (with empty api key) - Throws Error", async () => {
    const api = new DarkSkyApiClient("");
    await expect(api.get()).rejects.toThrowError();
  });

  it("DarkSkyApiClient - get (withouot coords) - Throws Error", async () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);
    await expect(api.get()).rejects.toThrowError();
  });

  it("DarkSkyApiClient - setRequestParams", () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    api.setRequestParams({
      latitude: 0,
      longitute: 0,
      lang: "en",
      units: "us",
      exclude: ["minutely", "flags"]
    });

    const params = api.getRequestParams();

    expect(params.latitude).toBe(0);
    expect(params.longitute).toBe(0);
    expect(params.lang).toBe("en");
    expect(params.units).toBe("us");
    expect(params.exclude).toEqual(["minutely", "flags"]);
  });

  it("DarkSkyApiClient - setRefreshRate", () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    api.setRefreshRate(60);

    const refreshRate = api.getRefreshRate();

    expect(refreshRate).toBe(60);
  });

  it("DarkSkyApiClient - setRefreshRate (below 30)", () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    api.setRefreshRate(10);

    const refreshRate = api.getRefreshRate();

    expect(refreshRate).toBe(30);
  });

  it("DarkSkyApiClient - setLang", () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    api.setLang("zh");

    const params = api.getRequestParams();

    expect(params.lang).toBe("zh");
  });

  it("DarkSkyApiClient - setUnits", () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    api.setUnits("uk2");

    const params = api.getRequestParams();

    expect(params.units).toBe("uk2");
  });

  it("DarkSkyApiClient - setExcludes", () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    api.setExcludes(["minutely", "flags"]);

    const params = api.getRequestParams();

    expect(params.exclude).toEqual(["minutely", "flags"]);
  });

  it("DarkSkyApiClient - setTime (with number)", () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    const time = new Date().getTime();

    api.setTime(time);

    const params = api.getRequestParams();

    expect(params.timeSeconds).toBe(time);
    expect(params.timeString).toBeNull();
  });

  it("DarkSkyApiClient - setTime (with string)", () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    const time = new Date().toISOString();

    api.setTime(time);

    const params = api.getRequestParams();

    expect(params.timeString).toBe(time);
    expect(params.timeSeconds).toBeNull();
  });

  it("DarkSkyApiClient - setTime (with invalid string)", () => {
    const api = new DarkSkyApiClient(process.env.DARK_SKY_API_KEY);

    const time = "12-25-2001";

    api.setTime(time);

    const params = api.getRequestParams();

    expect(params.timeString).toBeNull();
    expect(params.timeSeconds).toBeNull();
  });
});
