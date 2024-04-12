import TableWeather from "@/components/tableWeather"
import { getCities } from "@/server-actions/weather"
import { cities } from "@/interfase/APIInterfase"

export default async function RecordPage(){
    let allCities = await getCities();
    console.log(allCities);
    
    return(
        <TableWeather cities={allCities!}/>
    )
}