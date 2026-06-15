import { useState, useEffect } from "react";


const Home = () => {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [errors, setError] = useState(false);
    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUrl(e.target.value);
    }
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (url.trim() === "") {
            setError(true)
            setResult("Please enter a URL")
            return
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/api/shortenurl/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url_entry: url }),
            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            if (response.status == 400) {
                setResult("The URL has already been shortened");
                setError(true);
            } else if (response.status == 429) {
                setCountdown(data.retry_after);
            } else if (response.status == 201) {
                setResult(data.alias_value);
            }
        }
        catch (error) {
            setResult("Please Try again later:Server/network error")
            setError(true)
        }
    }

    return (
        <>
            <section className="w-full bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8">

                {/* 1. Header Banner */}
                <div className="flex justify-center items-center mb-6">
                    <h1 className="font-bold text-2xl  text-slate-900 rounded-full px-8 py-3.5 border-2 border-red-500 shadow-md">
                        Url Shortener
                    </h1>
                </div>

                {/* */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-6"
                >
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-1">
                        <label className="text-sm font-semibold text-slate-600 whitespace-nowrap">
                            Please enter URL:
                        </label>
                        <input
                            type="text"
                            id="Url"
                            value={url}
                            onChange={handleChange}
                            placeholder="Enter Url (e.g., https://...)"
                            className="w-full px-5 py-3 text-slate-800 border-2 border-slate-200 focus:border-blue-500 rounded-xl outline-none transition-colors duration-200 shadow-inner text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full sm:w-auto py-3 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-sm transition-colors duration-500 text-sm"
                    >
                        Shorten
                    </button>
                </form>


                <div className="flex flex-col items-center justify-center gap-3">


                    {/* 1. Success Output  */}
                    {result && !errors && (
                        <div className="bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-lg flex items-center gap-2 shadow-sm animate-fade-in">
                            <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">Success</span>
                            <a
                                href={`http://127.0.0.1:8000/api/${result}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-semibold text-emerald-700 hover:underline"
                            >
                                {`127.0.0.1:8000/api/${result}`}
                            </a>
                        </div>
                    )}

                    {/* 2. Error Output*/}
                    {errors && (
                        <div className="bg-rose-50 border border-rose-200 px-5 py-3 rounded-lg flex items-center gap-2 text-sm font-medium text-rose-700 shadow-sm">
                            <span>❌ Error:</span>
                            
                            <span>{result || "Failed to generate short link."}</span>
                        </div>
                    )}


                    {countdown > 0 && (
                        <div
                            className={`px-5 py-3 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium rounded-lg flex items-center gap-2 shadow-sm ${countdown > 0 ? "visible" : "hidden"
                                }`}
                        >
                            <span>⚠️</span>
                            <span>Rate limit cooldown active: <strong>{countdown} seconds remaining</strong></span>
                        </div>
                    )}

                </div>
            </section>
        </>
    );
};

export default Home;
