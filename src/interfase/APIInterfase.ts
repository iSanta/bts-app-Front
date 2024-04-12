export interface cities{
    status: number,
    total: number,
    results: [
        {
            id_city: number,
            name_city: string,
            date_created_city: string,
            date_updated_city: string
        }
    ]
}

export interface records{
    status: number,
    total: number,
    results: [
        {
            id_record: number,
            id_city_record: number,
            humidity_record: number,
            date_created_record: string,
            date_updated_record: string
        }
    ]
}