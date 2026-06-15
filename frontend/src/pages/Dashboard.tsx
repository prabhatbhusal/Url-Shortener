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
    setLoading(true); // Added to show the loading state on initial mount
    fetch('http://127.0.0.1:8000/api/urls/')
      .then(response => response.json())
      .then(data => {
        seturls(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to load URLs:", err);
        setLoading(false);
      });
  }, []);

  
  function fetchData(alias: string) {
    console.log("Fetching alias:", alias)
    setLoading(true)
    setSelectedAlias(alias)
    
    
    return fetch(`http://127.0.0.1:8000/api/analytics/${alias}/`)
      .then(response => response.json())
      .then(data => {
        console.log("Analytics data:", data)
        setAnalytics(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Fetch data error:", err);
        setLoading(false);
      });
  }

  async function refresh() {
    setLoading(true); 
    try {
      
      await fetchData(selectedAlias);
    } catch (err) {
      console.error("Failed to refresh chart data:", err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="max-w-300 mx-auto px-4 py-6 font-sans">

      {/* 1. Title Section*/}
      <div className="flex justify-center items-center mb-8">
        <h1 className="font-bold text-2xl  text-slate-900 rounded-full px-8 py-4 border-2 border-red-500 shadow-md">
          Analytics Dashboard
        </h1>
      </div>


      <div className="flex flex-col lg:flex-row gap-8 items-start">


        <div className="w-full lg:flex-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">

          {/* Toggle Button Container */}
          <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
            <h3 className="font-semibold text-slate-700 text-lg">Your Shortened URLs</h3>
            <button
              onClick={() => setShowUrls(!showUrls)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors duration-200"
            >
              {showUrls ? "Hide Collection" : "Show All Url"}
            </button>
          </div>

          {/* Show all list*/}
          {showUrls && (
            <ul className="max-h-[360px] overflow-y-auto pr-1 flex flex-col gap-2.5">
              {urls.map((items, idx) => (
                <li
                  key={idx}
                  onClick={() => fetchData(items.alias_value)}
                  className="group flex flex-col gap-1 p-3.5 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-lg cursor-pointer transition-all duration-150 shadow-sm"
                >
                  <div className="text-[13px] text-slate-500 font-medium truncate w-full">
                    {items.url_entry}
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-bold text-emerald-600 group-hover:text-emerald-700">
                      localhost:8000/{items.alias_value}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded-md shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors duration-150">
                      To Chart 📊
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {loading && (
            <div className="flex items-center justify-center py-4 text-slate-500 text-sm font-medium animate-pulse">
              ⏳ Loading....
            </div>
          )}
        </div>

        {/* Chart board */}
        <div className="w-full lg:flex-[1.3] bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between min-h-[480px] shadow-sm">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-semibold text-slate-700 text-lg">Click Metrics (Past 7 Days)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Target active resource link path: <span className="font-mono font-bold text-slate-600">/{selectedAlias || "none"}</span>
              </p>
            </div>

            {/* Charts if empty */}
            <div className="w-full h-[300px] relative my-4 flex items-center justify-center">
              {analytics.length > 0 ? (
                <Charts analytics={analytics} alias={selectedAlias} />
              ) : (
                <div className="w-full h-full border-2 border-dashed border-slate-200 bg-slate-50 rounded-lg flex flex-col items-center justify-center p-4 text-slate-400 text-sm gap-2">
                  <span>📈</span>
                  <span>Select a stored resource URL card from the left database deck to map metrics.</span>
                </div>
              )}
            </div>
          </div>

          {/* Chart report*/}
          <div className="mt-4 border-t border-slate-100 pt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-medium text-slate-500 bg-slate-50 p-2.5 border border-slate-100 rounded-md">
              <span>Total Analysis Records :</span>
              <span className="font-mono bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-bold">{analytics.length}</span>
            </div>

            {selectedAlias && (
              <button
                onClick={refresh}
                disabled={loading}
                className={`w-full py-3 text-white font-bold text-sm rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${loading
                    ? "bg-slate-400 cursor-not-allowed opacity-75"
                    : "bg-slate-700 hover:bg-slate-800 active:scale-[0.98] cursor-pointer"
                  }`}
              >
                <span className={loading ? "animate-spin" : ""} role="img" aria-label="refresh">
                  🔄
                </span>
                {loading ? "Updating chart..." : "Refresh Chart Data"}
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
export default Dashboard 