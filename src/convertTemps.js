

export function kelvinToFahrenheit(temp){
    return ((temp - 273.15) * 9/5 + 32);
 }

export function kelvinToCelcius (temp){
    return (temp - 273.15);
 }

export function fahrenheitToCelcius(temp){
  return (temp - 32) * 5/9;
 }

export function celciusToFahrenheit(temp){
  return ((temp * 9/5) + 32);
}
