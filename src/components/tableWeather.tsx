
"use client"
import { useState, useTransition } from "react"
import { getRecords } from "@/server-actions/weather";
import { cities, records  } from "@/interfase/APIInterfase";

//Material UI
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [

    { field: 'humidity_record', headerName: 'Humidity',  flex: 1, minWidth: 200, },
    { field: 'date_created_record', headerName: 'Date',  flex: 1, minWidth: 200, },

  ];
  
export default function TableWeather({ cities }: { cities: cities }){
    const [city, setCity] = useState(0);
    const [records, setRecors] = useState({} as records);
    const [isPending, startTransition] = useTransition();

    const handleChange =  (event: SelectChangeEvent) => {
      if(event.target.value != ""){
        startTransition(async ()=>{
          let cityId:number = parseInt(event.target.value)
          setCity(cityId);
          let res = await getRecords(cityId)
          setRecors(res)
        })
      }
      else{
        setRecors({} as records)
        setCity(0);
      }
    };
    return (
    <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
        <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={String(city)}
          onChange={handleChange}
          label="Age"
          color="secondary"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {cities.results.map((e, key)=>
            <MenuItem key={key} value={e.id_city}>{e.name_city}</MenuItem>
          )}
          
        </Select>
        </FormControl>
        {Object.getOwnPropertyNames(records).length !== 0 &&
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={records.results}
                columns={columns}
                getRowId={(row) => row.id_record}
                sx={{
                  boxShadow: 2,
                  border: 2,
                  borderColor: 'secondary.main',
                  '& .MuiDataGrid-cell:hover': {
                    color: 'secondary.main',
                    
                  },
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: 'secondary.main',
                    color: 'primary.main',
                    fontWeight: 'bold',
                  }
                }}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}

            />
        </div>
        }
        

    </div>
    )
}