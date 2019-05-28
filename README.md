# dark-sky-client-ts

A simple typescript client for Dark Sky API.

All types based off what is found in the official API [documentation](https://darksky.net/dev/docs).

DISCLAIMER: This does not use a proxy and as such does not hide your api key during requests. If you would like to use a proxy approach there are several other packages that offer it.

## Installation

`npm install dark-sky-client-ts --save`

## Usage

```javascript
import { DarkSkyApiClient } from "dark-sky-client-ts"; // And any other types needed.

const dsApi = new DarkSkyApiClient(apiKey, params);

async getWeather() {
    const weatherIsh = await dsApi.get(); // requires type assertion.
    const weather = await dsApi.getWeather(); // resolves type.
}

async getHourly() {
    const hourlyIsh = await dsApi.get("hourly"); // requires type assertion.
    const hourly = await dsApi.getHourly(); // resolves type.
}

async getDaily() {
    const daily = await dsApi.get("daily", {
        latitude: -38.590451,
        longitude: 175.541561,
        lang: "zh",
        units: "uk2"
    });
}
```

## DarkSkyApiClient

```javascript
const dsApi = new DarkSkyApiClient(apiKey, params);
```

- apiKey (`string`) - Dark Sky API key.
- params (`DarkSkyRequestObject`) - optional params for API request.

#### Methods

```javascript
async get(
    field?: DarkSkyRootField, // Which section of the data you want. If ommitted, returns all.
    params?: DarkSkyRequestObject // If ommitted, uses client's declared params.
  )
```

###### Note: Responses are stored for the duration of the refresh rate, unless it is a Time Machine request.

```javascript
getWeather(); // Returns full api response.
```

```javascript
getCurrently(); // Returns currently field from api response.
```

```javascript
getMinutely(); // Returns minutely field from api response.
```

```javascript
getHourly(); // Returns hourly field from api response.
```

```javascript
getDaily(); // Returns daily field from api response.
```

```javascript
getAlerts(); // Returns alerts field from api response.
```

```javascript
getFlags(); // Returns flags field from api response.
```

```javascript
getRequestParams(); // Returns current request params.
```

```javascript
getRefreshRate(): number // Gets current refresh rate for data in minutes.
```

```javascript
setRefreshRate(refreshRate: number) // Sets current refresh rate for data in minutes. Minimum is 30.
```

```javascript
setRequestParams(request: DarkSkyRequestObject) // Sets current request params.
```

```javascript
setCoords(lat: number, lng: number) // Sets current request latitude & longitude.
```

```javascript
setExcludes(excludes: DarkSkyRootField[]) // Sets which root field to exclude from response.
```

###### Note: `minutely` is excluded by default, because c'mon, really?

```javascript
setLang(lang: DarkSkySupportedLanguage) // Sets the preferred language from supported languages.
```

```javascript
setUnits(units: DarkSkyUnitType) // Sets the preferred units of measurements from supported units.
```

```javascript
setTime(time: number | string) // Sets time for Time Machine requests, parsed internally.
                                // Number should be milliseconds.
                                // String should be ISO string.
```

###### Note: `time` is used for Time Machine requests and is reset to null after each call.

## DarkSkyRequestObject

```javascript
{
  latitude?: number; // Required. Set either in constructor or using setCoords client method.
  longitude?: number; // Required. Set either in constructor or using setCoords client method.
  exclude?: DarkSkyRootField[]; // List of root fields to exclude from returned data.
  lang?: DarkSkySupportedLanguage; // Language string that matches supported list.
  units?: DarkSkyUnitType; // Unit of measurement that matches supported list.
  timeSeconds?: number; // Used for time machine requests. Pass in milliseconds,
                        // as conversion to UNIX is handled internally.
  timeString?: string;  // Used for time machine requests. Pass in ISO string.
                        // Setting of this field and timeSeconds are exclusive to each other.
}
```

## DarkSkyResponseObject

For the sake of brevity, I'm going to go ahead and say that all reponses should match what is outlined in the official API [documentation](https://darksky.net/dev/docs).
