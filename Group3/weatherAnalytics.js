
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


class Location {

    //constructor 
    constructor(name, latude, longitude, timezone) {
         
        this.name = name;
        this.latude = latude;
        this.longitude = longitude;
        this.timezone = timezone;
        this.readings_array = [];
    }

    //method2
    static calculateDistance(loc1, loc2) {
        //the earth radius
        const ER = 6371
        //circle = 360 deg
        //radians = 2Pi * R

        //commvert coordinates  to radians 

        const Radians = (deg) => deg * (Math.PI / 180)

        const Location1_lat = Radians(loc1.latude)
        const Location1_long = Radians(loc1.longitude)
        const Location2_lat = Radians(loc2.latude)
        const Location2_long = Radians(loc2.longitude)



        //finding the different 

        let Lat_Location = Location2_lat - Location1_lat
        let Long_Location = Location2_long - Location1_long

        //finding harversine formuale 

        const a = Math.sin(Lat_Location / 2) ** 2 +
            Math.cos(Location1_lat) * Math.cos(Location2_lat) *
            Math.sin(Long_Location / 2) ** 2;


        //centering the angle 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = ER * c;

        return distance;

    };

    //method22
    static fromCoordinates(lat, lng, name) {
        return {
            lat, lng, name
        }
    };

    //method 2 
    addReading(reading) {
       this.readings_array.push(reading);
       this.readings_array.sort((x,y)=> x.timestamp - y.timestamp)

    }


}

const nyc = new Location("New York", 40.7128, -74.006, "EST");
const la = new Location("Los Angeles", 34.0522, -118.2437, "PST");

const distance = Location.calculateDistance(nyc, la);
console.log(distance > 2000); // Expected: true (distance in km)

const miami = Location.fromCoordinates(25.7617, -80.1918, "Miammi");
console.log(miami.name); // Expected: "Miami"

 const reading = new WeatherReading(1, "New York", 25, 60, 1013, 15);
nyc.addReading(reading);
 console.log(nyc.readings_array); // Expected: 1



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
    return (
     Math.round( allReadings.reduce((sum, reading) => sum + reading.temperature, 0) /
      allReadings.length)
    )
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
    const allReadings = this.locations.map((loc) => loc.readings);
    return allReadings.filter((r) => r.timestamp >= startDate && r.timestamp <= endDate);
  }
}
const station = new WeatherStation();
// const nyc = new Location("New York", 40.7128, -74.006, "EST");
const reading1 = new WeatherReading(1, "New York", 25, 60, 1013, 15);
const reading2 = new WeatherReading(2, "New York", 30, 65, 1015, 10);

nyc.addReading(reading1);
nyc.addReading(reading2);
station.addLocation(nyc);

console.log(station.getAverageTemperature()); // Expected: 27.5
console.log(station.findHottestLocation().name); // Expected: "New York"