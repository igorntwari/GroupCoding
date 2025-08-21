class WeatherReading{
  get comfortIndex(){
    try{
        if(this.temperature <100) return ("Temperature validation working");
        
      } catch(e){
        throw new Error("Temperature must less than 100")
      }
  }
  get windCategory(){
    this.windSpeed > 10 ? "strong": "moderate"
  }
  isExtremeWeather = () =>{
    if(this.temperature < 50 && this.temperature > 20 && this.windSpeed < 10 && this.humidity > 50 && pressure > 100){
      return true
    }else{
      return false
    }
  }
}