class WeatherReading {
  constructor(id, location, temperature, humidity, pressure, windSpeed, timestamp = Date.now()) {
    this.id = id;
    this.location = location;
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.windSpeed = windSpeed;
    this.timestamp = timestamp;
  }

  getTemperatureInFahrenheit() {
    return (this.temperature * 9/5) + 32;
  }

  toString() {
    return `Weather Reading [ID: ${this.id}]
                 Location: ${this.location}
                 Temperature: ${this.temperature}°C (${this.getTemperatureInFahrenheit()}°F)
                 Humidity: ${this.humidity}%
                 Pressure: ${this.pressure} hPa
                 Wind Speed: ${this.windSpeed} km/h
                 Timestamp: ${new Date(this.timestamp).toLocaleString()}`;
  }

  get comfortIndex(){
    try{
        if(this.temperature < 100) return ("Temperature validation working");
    } catch(e){
        throw new Error("Temperature must less than 100")
    }
  }

  get windCategory(){
    return this.windSpeed > 10;
  }

  isExtremeWeather = () =>{
    if(this.temperature < 50 && this.temperature > 20 && this.windSpeed < 10 && this.humidity > 50 && this.pressure > 100){
      return true;
    } else {
      return false;
    }
  }
}

class Location {
  constructor(name, latude, longitude, timezone) {
    this.name = name;
    this.latude = latude;
    this.longitude = longitude;
    this.timezone = timezone;
    this.readings_array = [];
  }

  static calculateDistance(loc1, loc2) {
    const ER = 6371
    const Radians = (deg) => deg * (Math.PI / 180)

    const Location1_lat = Radians(loc1.latude)
    const Location1_long = Radians(loc1.longitude)
    const Location2_lat = Radians(loc2.latude)
    const Location2_long = Radians(loc2.longitude)

    let Lat_Location = Location2_lat - Location1_lat
    let Long_Location = Location2_long - Location1_long

    const a = Math.sin(Lat_Location / 2) ** 2 +
      Math.cos(Location1_lat) * Math.cos(Location2_lat) *
      Math.sin(Long_Location / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = ER * c;

    return distance;
  }

  static fromCoordinates(lat, lng, name) {
    return { lat, lng, name }
  }

  addReading(reading) {
    this.readings_array.push(reading);
    this.readings_array.sort((x,y)=> x.timestamp - y.timestamp)
  }

  // helper: average temp for this location
  getAverageTemperature() {
    if (this.readings_array.length === 0) return null;
    return this.readings_array.reduce((sum, r)=> sum+r.temperature,0) / this.readings_array.length;
  }
}

class WeatherStation {
  constructor() {
    this.locations = [];
  }

  addLocation(location) {
    this.locations.push(location);
  }

  getAverageTemperature() {
    const allReadings = []
    this.locations.forEach((loc) => {
      allReadings.push(...loc.readings_array)
    })
    if (allReadings.length === 0) {
      return null;
    }
    return Math.round(allReadings.reduce((sum, r) => sum + r.temperature, 0) / allReadings.length)
  }

  findHottestLocation() {
    if (this.locations.length === 0) return null
    return this.locations.reduce((hottest, loc) => {
      return loc.getAverageTemperature() > hottest.getAverageTemperature()
        ? loc
        : hottest;
    });
  }

  getReadingsByDateRange(startDate, endDate) {
    const allReadings = this.locations.flatMap(loc => loc.readings_array);
    return allReadings.filter(r => r.timestamp >= startDate && r.timestamp <= endDate);
  }

  // 🔹 Step 4 Methods 🔹

  // 4.1. processWeatherData using destructuring
  
  processWeatherData({ readings, filters = {}, options = {} }) {
    const { minTemp = -Infinity, maxTemp = Infinity } = filters;
    const { includeHumidity = true } = options;

    return readings.filter(({ temperature, humidity }) => {
      if (temperature < minTemp || temperature > maxTemp) return false;
      if (!includeHumidity && humidity) return false;
      return true;
    });
  }

  // 4.2. mergeStationData using spread operator
  mergeStationData(...stations) {
    stations.forEach(st => {
      this.locations.push(...st.locations);
    });
  }

  // 4.3. createWeatherSummary with destructuring
  createWeatherSummary(location) {
    const { name, latude, longitude, timezone, readings_array } = location;
    return {
      name,
      coords: `${latude}, ${longitude}`,
      timezone,
      readingsCount: readings_array.length,
      avgTemp: location.getAverageTemperature()
    }
  }

  // 4.4. updateReadingBatch using spread
  updateReadingBatch(updates) {
    updates.forEach(update => {
      const { locationName, readingId, changes } = update;
      const loc = this.locations.find(l => l.name === locationName);
      if (!loc) return;

      const idx = loc.readings_array.findIndex(r => r.id === readingId);
      if (idx !== -1) {
        loc.readings_array[idx] = { ...loc.readings_array[idx], ...changes };
      }
    })
  }
}

