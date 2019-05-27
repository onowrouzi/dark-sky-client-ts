# dark-sky-client-ts

A simple typescript client for Dark Sky API. 

All types based off what is found in the offication API [documentation](https://darksky.net/dev/docs).

## Installation

`npm install dark-sky-client-ts --save`

## Usage

```javascript
import { DarkSkyApiClient } from 'dark-sky-client-ts'; // And any other types needed.

const dsApi = new DarkSkyApiClient(apiKey, params);
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
getRequestParams() // Returns current request params.
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
  
```javascript
getRefreshRate(): number // Gets current refresh rate for data in minutes.
```

```javascript
setRefreshRate(refreshRate: number) // Sets current refresh rate for data in minutes. Minimum is 30.
```

## DarkSkyRequestObject

```javascript
{
  latitude?: number; // Required. Set either in constructor or using setCoords client method.
  longitute?: number; // Required. Set either in constructor or using setCoords client method.
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

For the sake of brevity, I'm going to go ahead and say that all reponses should match what is outlined in the offication API [documentation](https://darksky.net/dev/docs).
