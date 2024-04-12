"use client"
import { useState, useTransition } from "react"
import { postSaveData } from "@/server-actions/weather";

import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps"
import stylesMap from "./googleMap.module.css";
import { Weather, Weathers } from "@/interfase/weather";

//Material UI
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const APIKEY:string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!; 

export default  function GoogleMapPage({ weathers } : Weathers){
    const position = {lat: 34.225, lng: -77.944}
    const [open1, setOpen1] = useState(true)
    const [open2, setOpen2] = useState(true)
    const [open3, setOpen3] = useState(true)
    const [alertOpen, setAlertOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const pins = [
        {
            cityName: "Miami",
            pos: {lat: 25.761, lng: -80.191},
            variable: open1,
            set: setOpen1,
            data: weathers[0]
        },
        {
            cityName: "Orlando",
            pos: {lat: 28.538, lng: -81.379},
            variable: open2,
            set: setOpen2,
            data: weathers[1]
        },
        {
            cityName: "New York",
            pos: {lat: 40.730, lng: -73.935},
            variable: open3,
            set: setOpen3,
            data: weathers[2]
        }
    ]

    const saveData = () =>{
        startTransition( async ()=>{
            let result = await postSaveData([pins[0].cityName, pins[1].cityName, pins[2].cityName], [pins[0].data.main.humidity,pins[1].data.main.humidity,pins[2].data.main.humidity]);
            if(result) setAlertOpen(true)
        })
        
    }
    
    return (
        <APIProvider apiKey={APIKEY}>
            <Button className={stylesMap.btnSave} sx={{color: "#fff"}} onClick={()=>saveData()} color="secondary" variant="contained">Save current humidity</Button>
            <Box sx={{ width: '100%' }}>
                <Collapse in={alertOpen}>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setAlertOpen(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                    
                    
                    </Alert>
                </Collapse>
            </Box>
            <div className={stylesMap.map}>
                <Map defaultZoom={4} defaultCenter={position} mapId={process.env.NEXT_PUBLIC_MAP_ID} >
                    {pins.map((tag, key)=>{
                        return(
                            <span key={key}>
                                <AdvancedMarker position={tag.pos} onClick={()=> tag.set(true)}>
                                    <Pin></Pin>
                                </AdvancedMarker>
                                {tag.variable && <InfoWindow onCloseClick={()=> tag.set(false)} position={tag.pos}><p className={stylesMap.markerText}>{tag.cityName}</p> <br /><p className={stylesMap.markerText}>Humidity: {tag.data.main.humidity} </p> </InfoWindow> }
                            </span>
                        )
                    })}
                    
                </Map>
            </div>

            
        </APIProvider>
    )
}