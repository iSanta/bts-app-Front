'use server'
import { Weather } from "@/interfase/weather";
import { cities, records } from "@/interfase/APIInterfase";
import axios from "axios";
const API_ROUTE:string = process.env.API_ROUTE!

export async function getCurrentWeather(_lon:number, _lat:number) {
    
    try {
        const response = await axios.get<Weather>('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: _lat,
            lon: _lon,
            appid: process.env.WEATHER_ID
          },
        });

        const weatherNow:Weather = response.data;
        
        return weatherNow
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
      
}

export async function postSaveData(_cities: Array<string>, _humidities: Array<number>) {
    try {

        _cities.forEach( async (el, index) => {
            let response = await axios.get<cities>(`${API_ROUTE}/cities`,{
                params: {
                    select: "id_city",
                    linkTo: "name_city",
                    equalTo: el
                },
            })
            let id:cities = response.data  
            let currentId:number = id.results[0].id_city 
            console.log(id);
            

            let response2 = await axios.post<records>(`${API_ROUTE}/records`,{
                    id_city_record: currentId,
                    humidity_record: _humidities[index],  
            }, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            })

            let record:records = response2.data
            console.log(record);
            
        });
        return true
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return false
    }
}

export async function getRecords(_cityId:number) {
    try {
        let response = await axios.get<records>(`${API_ROUTE}/records`,{
            params: {
                linkTo: "id_city_record",
                equalTo: _cityId,
                orderBy: "date_created_record",
                orderMode: "DESC",
                select: "humidity_record,date_created_record,id_record"
            },
        })
        let record:records = response.data
        return record
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return {} as records
    }
}

export async function getCities() {
    try {
        let response = await axios.get<cities>(`${API_ROUTE}/cities`,{
            params: {
            },
        })
        let cities:cities = response.data
        return cities
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}