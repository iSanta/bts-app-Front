import { getCurrentWeather } from "@/server-actions/weather";
import GoogleMapPage from "@/components/googleMap";
import { Weather, Weathers } from "@/interfase/weather";
import stylesMap from "./map.module.css"



const cities = [
    {
        pos: {lat: 25.761, lng: -80.191}
    },
    {
        pos: {lat: 28.538, lng: -81.379}
    },
    {
        pos: {lat: 40.730, lng: -73.935}
    }
]


export default async function MapPage(){
    let responses: Array<Weather> = [];

    let res= await getCurrentWeather(cities[0].pos.lng, cities[0].pos.lat)
    responses.push(res!);
    let res2= await getCurrentWeather(cities[1].pos.lng, cities[1].pos.lat)
    responses.push(res2!);
    let res3= await getCurrentWeather(cities[2].pos.lng, cities[2].pos.lat)
    responses.push(res3!);


    
    
    return(
        <div>
            <GoogleMapPage weathers={responses}></GoogleMapPage>
        </div>
    )
}