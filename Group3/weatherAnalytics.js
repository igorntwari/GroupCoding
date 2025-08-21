
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

  get comfortIndex(){
    try{
        if(this.temperature <100) return ("Temperature validation working");
        
      } catch(e){
        throw new Error("Temperature must less than 100")
      }
  }
  get windCategory(){
    // this.windSpeed > 10 ? "strong": "moderate"
    return this.windSpeed > 10
  }
  isExtremeWeather = () =>{
    if(this.temperature < 50 && this.temperature > 20 && this.windSpeed < 10 && this.humidity > 50 && pressure > 100){
      return true
    }else{
      return false
    }
  }
}


const reading = new WeatherReading(1, "Miami", 30, 80, 1013, 25);
console.log(reading.comfortIndex); // Expected: number between 0-100
console.log(reading.windCategory); // Expected: "moderate" or "strong"
console.log(reading.isExtremeWeather()); // Expected: boolean
