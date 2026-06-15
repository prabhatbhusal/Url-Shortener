export interface URLItem {
    url_entry: string
    alias_value: string
    date_url: string
}
export interface ChartProps{
    analytics:{date_click__date:string,clicks:number}[]
    alias:string
}
