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

  //  Method to convert Celsius to Fahrenheit
  getTemperatureInFahrenheit() {
    return (this.temperature * 9/5) + 32;
  }
// string to all data
   toString() {
     return `Weather Reading [ID: ${this.id}]
                 Location: ${this.location}
                 Temperature: ${this.temperature}°C (${this.getTemperatureInFahrenheit()}°F)
                 Humidity: ${this.humidity}%
                 Pressure: ${this.pressure} hPa
                 Wind Speed: ${this.windSpeed} km/h
                 Timestamp: ${new Date(this.timestamp).toLocaleString()}`;
  }
}


const reading = new WeatherReading(1, "Kigali", 25, 60, 1012, 10);
console.log(reading.toString())
