import { useState, useEffect } from "react";
import Charts from "../components/Charts";
const Dashboard = () => {
    const [urls, seturls] = useState([])
    const [selectedAlias, setSelectedAlias] = useState("")
    const [analytics, setAnalytics] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/urls/')
            .then(response => response.json())
            .then(data => {
                seturls(data)
                setLoading(false)
            });
    }, []);

    function fetchData(alias:any) {
        setSelectedAlias(alias)
        fetch(`http://127.0.0.1:8000/api/analytics/${alias}/`)
            .then(response => response.json())
            .then(data => {
                setAnalytics(data)
                setLoading(false)
            });
        return
    }

    return (
        <>
            <section>
                <div className="flex justify-center items-center py-5"><h1 className="text-bold text-2xl  bg-amber-500 rounded-full p-5 border-2 ">The Analytics Dashboard</h1></div>
                <ul>
                    {urls.map((items, idx) =>
                        (<li key={idx} onClick={() => fetchData(items.alias_value)}>{items.url_entry}-{items.alias_value}</li>))}
                </ul>
                
                {analytics.length>0 && <Charts analytics={analytics} alias={selectedAlias}/>}            
                {selectedAlias &&
                <button onClick={()=>fetchData(selectedAlias)}>Refresh</button>

                }
                </section>
        </>
    )
}
export default Dashboard 