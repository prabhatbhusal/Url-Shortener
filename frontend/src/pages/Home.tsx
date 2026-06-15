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
            <section>
                <div className="flex justify-center items-center py-5"><h1 className="text-bold text-2xl  bg-amber-500 rounded-full p-5 border-2 ">Shorten Your Url</h1></div>
                <form
                    onSubmit={handleSubmit}
                    className="flex  items-center justify-center  "
                >
                    <div className="p-5 ">
                        <label className="p-5 text-black">Please enter url:</label>
                        <input
                            type="text"
                            id="Url"
                            value={url}
                            onChange={handleChange}
                            placeholder="Enter Url"
                            className="p-5 text-blue-950 border-2 border-red-900  rounded-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-5 px-10 bg-red-500 hover:bg-red-900 rounded-full"
                    >
                        Submit
                    </button>
                </form>
                {result && !errors && (
                    <a
                        href={errors ? "#" : `http://127.0.0.1:8000/api/${result}`}
                        target="blank"
                        className="text-black justify-center items-center flex"
                    >
                        {errors ? "" : `127.0.0.1:8000/api/${result}`}
                    </a>
                )}
                {errors && (
                    <p className="text-black justify-center items-center flex">
                        {result}
                    </p>
                )}
                {countdown > 0 && (
                    <h2
                        className={
                            countdown > 0
                                ? "visible text-black justify-center items-center flex"
                                : "hidden"
                        }
                    >
                        {countdown} seconds remaining
                    </h2>
                )}
                
            </section>
        </>
    );
};

export default Home;
