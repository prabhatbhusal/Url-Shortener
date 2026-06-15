import { useState, useEffect } from "react";
import type { URLItem } from '../@types/common.types'
import Charts from "../components/Charts";
const Dashboard = () => {
    const [urls, seturls] = useState<URLItem[]>([])
    const [selectedAlias, setSelectedAlias] = useState("")
    const [analytics, setAnalytics] = useState([])
    const [loading, setLoading] = useState(false)
    const [showUrls, setShowUrls] = useState(false)

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/urls/')
            .then(response => response.json())
            .then(data => {
                seturls(data)
                setLoading(false)
            });
    }, []);

    function fetchData(alias:any) {
        console.log("Fetching alias:", alias)
        setLoading(true)
        setSelectedAlias(alias)
        fetch(`http://127.0.0.1:8000/api/analytics/${alias}/`)
            .then(response => response.json())
            .then(data => {
                console.log("Analytics data:", data)
                setAnalytics(data)
                setLoading(false)
            });
        return
    }

    return (
        <>
            <section>
                <div className="flex justify-center items-center py-5"><h1 className="text-bold text-2xl  bg-amber-500 rounded-full p-5 border-2 ">The Analytics Dashboard</h1></div>
                <button onClick={() => setShowUrls(!showUrls)}>
    {showUrls ? "Hide URLs" : "Show All URLs"}
</button>
                {showUrls &&
                <ul>
                    {urls.map((items, idx) =>
                        (<li key={idx} onClick={() => fetchData(items.alias_value)}>{items.url_entry}-{items.alias_value}</li>))}
                </ul>}
                {loading && <p>Loading ...</p>}
                {analytics.length>0 && <Charts analytics={analytics} alias={selectedAlias}/>}
                <p>Analytics count: {analytics.length}</p>            
                {selectedAlias &&
                <button onClick={()=>fetchData(selectedAlias)}>Refresh</button>

                }
                </section>
        </>
    )
}
export default Dashboard 