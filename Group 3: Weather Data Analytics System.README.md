# Group 3: Weather Data Analytics System Challenge

## Overview

Build a weather data analytics system that processes weather information, generates reports, and provides forecasting capabilities using ES6 features.

## Setup

1. Create a file called `weatherAnalytics.js`
2. All your code should be written in this file
3. Run tests using: `node weatherAnalytics.js`

## Steps

### Step 0: WeatherReading Class Foundation

**Objective**: Create basic weather reading structure

**Requirements**:

- Create `WeatherReading` class with properties: id, location, temperature, humidity, pressure, windSpeed, timestamp
- Add constructor with default timestamp using Date.now()
- Add method `getTemperatureInFahrenheit()` to convert Celsius to Fahrenheit
- Add method `toString()` using template literals

**Test Case**:

```javascript
const reading = new WeatherReading(1, "New York", 25, 60, 1013, 15);
console.log(reading.getTemperatureInFahrenheit()); // Expected: 77
console.log(reading.toString().includes("New York")); // Expected: true
console.log(reading.timestamp > 0); // Expected: true
```

### Step 1: Enhanced Reading with Getters/Setters

**Objective**: Add computed properties and validation

**Requirements**:

- Add getter `comfortIndex` that calculates comfort based on temperature and humidity
- Add getter `windCategory` that categorizes wind speed ("calm", "light", "moderate", "strong")
- Add setter for temperature with validation (must be between -50 and 60 Celsius)
- Add method `isExtremeWeather()` using arrow function

**Test Case**:

```javascript
const reading = new WeatherReading(1, "Miami", 30, 80, 1013, 25);
console.log(reading.comfortIndex); // Expected: number between 0-100
console.log(reading.windCategory); // Expected: "moderate" or "strong"
console.log(reading.isExtremeWeather()); // Expected: boolean

try {
  reading.temperature = 100; // Should throw error
} catch (e) {
  console.log("Temperature validation working"); // Expected output
}
```

### Step 2: Location Class with Static Methods

**Objective**: Create location management with static utilities

**Requirements**:

- Create `Location` class with properties: name, latitude, longitude, timezone, readings array
- Add static method `calculateDistance(loc1, loc2)` using Haversine formula
- Add static method `fromCoordinates(lat, lng, name)` as factory method
- Add method `addReading(reading)` that maintains sorted readings by timestamp

**Test Case**:

```javascript
const nyc = new Location("New York", 40.7128, -74.006, "EST");
const la = new Location("Los Angeles", 34.0522, -118.2437, "PST");

const distance = Location.calculateDistance(nyc, la);
console.log(distance > 2000); // Expected: true (distance in km)

const miami = Location.fromCoordinates(25.7617, -80.1918, "Miami");
console.log(miami.name); // Expected: "Miami"

const reading = new WeatherReading(1, "New York", 25, 60, 1013, 15);
nyc.addReading(reading);
console.log(nyc.readings.length); // Expected: 1
```

### Step 3: WeatherStation with Array Methods

**Objective**: Implement weather station using modern array methods

**Requirements**:

- Create `WeatherStation` class with locations array
- Add method `addLocation(location)`
- Add method `getAverageTemperature()` using reduce across all readings
- Add method `findHottestLocation()` using array methods
- Add method `getReadingsByDateRange(startDate, endDate)` using filter

**Test Case**:

```javascript
const station = new WeatherStation();
const nyc = new Location("New York", 40.7128, -74.006, "EST");
const reading1 = new WeatherReading(1, "New York", 25, 60, 1013, 15);
const reading2 = new WeatherReading(2, "New York", 30, 65, 1015, 10);

nyc.addReading(reading1);
nyc.addReading(reading2);
station.addLocation(nyc);

console.log(station.getAverageTemperature()); // Expected: 27.5
console.log(station.findHottestLocation().name); // Expected: "New York"
```

### Step 4: Destructuring and Spread Operations

**Objective**: Implement data processing with destructuring and spread

**Requirements**:

- Add method `processWeatherData({readings, filters = {}, options = {}})` using destructuring
- Add method `mergeStationData(...stations)` using spread operator
- Add method `createWeatherSummary(location)` that destructures location properties
- Add method `updateReadingBatch(updates)` using object spread for updates

**Test Case**:

```javascript
const station = new WeatherStation();
const nyc = new Location("New York", 40.7128, -74.006, "EST");
const reading = new WeatherReading(1, "New York", 25, 60, 1013, 15);
nyc.addReading(reading);
station.addLocation(nyc);

const processed = station.processWeatherData({
  readings: [reading],
  filters: { minTemp: 20 },
  options: { includeExtreme: true },
});
console.log(Array.isArray(processed)); // Expected: true

const summary = station.createWeatherSummary(nyc);
console.log(summary.name); // Expected: "New York"
console.log(summary.hasOwnProperty("coordinates")); // Expected: true
```

### Step 5: Default Parameters and Enhanced Objects

**Objective**: Use default parameters and enhanced object literals

**Requirements**:

- Add method `generateForecast(days = 7, model = "simple", options = {})`
- Add method `createAlert(type, severity = "medium", ...conditions)`
- Use enhanced object literals with computed property names
- Add method `getStatistics(period = "week", metrics = ["temperature", "humidity"])`

**Test Case**:

```javascript
const station = new WeatherStation();
const forecast = station.generateForecast();
console.log(Array.isArray(forecast)); // Expected: true
console.log(forecast.length); // Expected: 7

const alert = station.createAlert(
  "temperature",
  "high",
  "heat wave",
  "drought"
);
console.log(alert.type); // Expected: "temperature"
console.log(alert.severity); // Expected: "high"
console.log(alert.conditions.length); // Expected: 2

const stats = station.getStatistics();
console.log(stats.hasOwnProperty("temperature")); // Expected: true
```

### Step 6: Promises for Data Fetching

**Objective**: Implement asynchronous data operations

**Requirements**:

- Add method `fetchWeatherData(location)` that returns Promise with mock API data
- Add method `saveToCloud(data)` that returns Promise simulating upload
- Add method `getHistoricalData(location, days)` returning Promise
- Use setTimeout to simulate API delays

**Test Case**:

```javascript
const station = new WeatherStation();

station.fetchWeatherData("New York").then((data) => {
  console.log(data.location); // Expected: "New York"
  console.log(Array.isArray(data.readings)); // Expected: true
});

station.saveToCloud({ test: "data" }).then((result) => {
  console.log(result.success); // Expected: true
  console.log(result.cloudId.length > 0); // Expected: true
});

station.getHistoricalData("Miami", 30).then((historical) => {
  console.log(historical.length); // Expected: 30
  console.log(historical[0].hasOwnProperty("temperature")); // Expected: true
});
```

### Step 7: Async/Await Weather Processing

**Objective**: Convert to async/await with comprehensive error handling

**Requirements**:

- Add async method `syncAllStations()` using multiple await calls
- Add async method `generateWeatherReport(locations)` with error handling
- Add async method `bulkDataImport(dataSource)` with try/catch blocks
- Implement retry logic for failed operations

**Test Case**:

```javascript
const station = new WeatherStation();

(async () => {
  try {
    const syncResult = await station.syncAllStations();
    console.log(syncResult.synchronized); // Expected: true

    const report = await station.generateWeatherReport(["New York", "Miami"]);
    console.log(report.hasOwnProperty("summary")); // Expected: true
    console.log(Array.isArray(report.locationData)); // Expected: true

    const imported = await station.bulkDataImport("weather_api");
    console.log(imported.recordsProcessed > 0); // Expected: true
  } catch (error) {
    console.log("Error handled:", error.message);
  }
})();
```

### Step 8: Map and Set for Advanced Analytics

**Objective**: Use Map and Set for complex data relationships

**Requirements**:

- Add `weatherPatterns` property using Map to track patterns by location
- Add `alertSubscribers` property using Set for unique subscribers
- Add method `trackWeatherPattern(location, pattern)` using Map operations
- Add method `subscribeToAlerts(subscriberId)` using Set operations
- Add method `getPatternAnalysis()` that processes Map data

**Test Case**:

```javascript
const station = new WeatherStation();

station.trackWeatherPattern("New York", "cold_front");
station.trackWeatherPattern("New York", "high_pressure");
station.trackWeatherPattern("Miami", "tropical_storm");

console.log(station.weatherPatterns.get("New York").length); // Expected: 2
console.log(station.weatherPatterns.has("Miami")); // Expected: true

station.subscribeToAlerts("user123");
station.subscribeToAlerts("user456");
station.subscribeToAlerts("user123"); // Duplicate should be ignored

console.log(station.alertSubscribers.size); // Expected: 2

const analysis = station.getPatternAnalysis();
console.log(analysis.hasOwnProperty("totalPatterns")); // Expected: true
```

### Step 9: Symbols and Iterator Implementation

**Objective**: Implement advanced ES6 features with Symbols

**Requirements**:

- Add Symbol properties for internal weather calculation methods
- Implement iterator protocol for WeatherStation (iterate through all readings)
- Add method using computed property names for dynamic filtering
- Create private calculation methods using Symbols

**Test Case**:

```javascript
const station = new WeatherStation();
const nyc = new Location("New York", 40.7128, -74.006, "EST");
const reading1 = new WeatherReading(1, "New York", 25, 60, 1013, 15);
const reading2 = new WeatherReading(2, "New York", 30, 65, 1015, 10);

nyc.addReading(reading1);
nyc.addReading(reading2);
station.addLocation(nyc);

// Should be iterable through all readings
let count = 0;
for (let reading of station) {
  count++;
  console.log(reading.temperature); // Expected: 25, 30
}
console.log(count); // Expected: 2

// Dynamic method creation
const filterType = "Temperature";
const dynamicMethod = "filterBy" + filterType;
if (typeof station[dynamicMethod] === "function") {
  const filtered = station[dynamicMethod](20, 35);
  console.log(Array.isArray(filtered)); // Expected: true
}

// Test private symbol methods exist
const symbols = Object.getOwnPropertySymbols(station);
console.log(symbols.length > 0); // Expected: true
```

### Step 10: Complete Weather Analytics System

**Objective**: Integrate all features into comprehensive weather system

**Requirements**:

- Add module exports for all classes
- Create real-time weather monitoring simulation
- Add comprehensive data validation and error handling
- Implement weather alerting system
- Create complete demonstration of all functionality

**Test Case**:

```javascript
// Complete weather analytics demonstration
const runWeatherAnalytics = async () => {
  console.log("=== Weather Analytics System Demo ===");

  const station = new WeatherStation();

  // Create locations
  const locations = [
    new Location("New York", 40.7128, -74.006, "EST"),
    new Location("Miami", 25.7617, -80.1918, "EST"),
    new Location("Los Angeles", 34.0522, -118.2437, "PST"),
  ];

  // Add sample readings for each location
  locations.forEach((location, index) => {
    station.addLocation(location);

    // Generate sample readings
    for (let i = 0; i < 5; i++) {
      const temp = 20 + Math.random() * 15; // 20-35°C
      const humidity = 40 + Math.random() * 40; // 40-80%
      const pressure = 1000 + Math.random() * 30; // 1000-1030 hPa
      const wind = Math.random() * 30; // 0-30 km/h

      const reading = new WeatherReading(
        index * 10 + i,
        location.name,
        temp,
        humidity,
        pressure,
        wind
      );

      location.addReading(reading);
    }
  });

  console.log("✓ Weather stations set up with sample data");

  // Test basic analytics
  const avgTemp = station.getAverageTemperature();
  console.log(
    `Average temperature across all stations: ${avgTemp.toFixed(1)}°C`
  );

  const hottestLocation = station.findHottestLocation();
  console.log(`Hottest location: ${hottestLocation.name}`);

  // Test async operations
  try {
    console.log("\n=== Testing Async Operations ===");

    // Simulate data fetching
    const weatherData = await station.fetchWeatherData("Boston");
    console.log(`✓ Fetched weather data for ${weatherData.location}`);

    // Generate comprehensive report
    const report = await station.generateWeatherReport(
      locations.map((l) => l.name)
    );
    console.log(
      `✓ Generated report covering ${report.locationData.length} locations`
    );

    // Test bulk import
    const importResult = await station.bulkDataImport("historical_api");
    console.log(
      `✓ Imported ${importResult.recordsProcessed} historical records`
    );

    // Sync all stations
    const syncResult = await station.syncAllStations();
    console.log(
      `✓ Station sync completed: ${
        syncResult.synchronized ? "Success" : "Failed"
      }`
    );
  } catch (error) {
    console.log(`✗ Async operation failed: ${error.message}`);
  }

  // Test advanced features
  console.log("\n=== Testing Advanced Features ===");

  // Test Map/Set operations
  station.trackWeatherPattern("New York", "nor'easter");
  station.trackWeatherPattern("Miami", "hurricane_season");
  station.subscribeToAlerts("meteorologist_001");
  station.subscribeToAlerts("emergency_services");

  console.log(`✓ Tracked ${station.weatherPatterns.size} weather patterns`);
  console.log(
    `✓ ${station.alertSubscribers.size} alert subscribers registered`
  );

  // Test iteration
  console.log("\n=== Testing Data Iteration ===");
  let totalReadings = 0;
  let extremeWeatherCount = 0;

  for (let reading of station) {
    totalReadings++;
    if (reading.isExtremeWeather()) {
      extremeWeatherCount++;
    }
  }

  console.log(`✓ Processed ${totalReadings} readings via iteration`);
  console.log(`✓ Found ${extremeWeatherCount} extreme weather readings`);

  // Test forecasting
  const forecast = station.generateForecast(5, "advanced", {
    includeAlerts: true,
  });
  console.log(`✓ Generated ${forecast.length}-day forecast`);

  // Test dynamic methods
  const tempFiltered = station.filterByTemperature(25, 35);
  console.log(
    `✓ Dynamic filtering found ${tempFiltered.length} readings in range`
  );

  // Test distance calculations
  const distance = Location.calculateDistance(locations[0], locations[1]);
  console.log(
    `✓ Distance calculation: ${distance.toFixed(0)}km between cities`
  );

  // Generate final statistics
  const stats = station.getStatistics("month", [
    "temperature",
    "humidity",
    "pressure",
  ]);
  console.log("\n=== Final Statistics ===");
  console.log(
    `Temperature stats: min=${stats.temperature.min.toFixed(
      1
    )}°C, max=${stats.temperature.max.toFixed(1)}°C`
  );
  console.log(`Humidity stats: avg=${stats.humidity.average.toFixed(1)}%`);
  console.log(`Pressure stats: avg=${stats.pressure.average.toFixed(1)} hPa`);

  // Test alerts
  const alert = station.createAlert(
    "temperature",
    "high",
    "heat_wave",
    "drought_conditions"
  );
  console.log(
    `✓ Created ${alert.type} alert with ${alert.conditions.length} conditions`
  );

  console.log("\n=== Weather Analytics Demo Complete ===");
  console.log("All ES6 features successfully demonstrated!");
};

// Run the complete demonstration
runWeatherAnalytics();

// Exports (uncomment when using as module)
// module.exports = { WeatherReading, Location, WeatherStation };
```

## Completion Checklist

- [ ] Step 0: WeatherReading class foundation
- [ ] Step 1: Enhanced reading with getters/setters
- [ ] Step 2: Location class with static methods
- [ ] Step 3: WeatherStation with array methods
- [ ] Step 4: Destructuring and spread operations
- [ ] Step 5: Default parameters and enhanced objects
- [ ] Step 6: Promises for data fetching
- [ ] Step 7: Async/await weather processing
- [ ] Step 8: Map and Set for advanced analytics
- [ ] Step 9: Symbols and iterator implementation
- [ ] Step 10: Complete weather analytics system

## Weather-Specific Features Implemented

- Temperature conversion utilities
- Weather comfort index calculations
- Geographic distance calculations
- Weather pattern tracking
- Historical data analysis
- Forecasting algorithms
- Alert and notification systems
- Real-time data processing simulation
