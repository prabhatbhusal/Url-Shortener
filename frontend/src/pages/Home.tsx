import { useState, useEffect } from "react";

const Home = () => {
    const [url, setUrl] = useState("");
    const [result, setResult] = useState("");
    const [countdown, setCountdown] = useState(0);
    const [error, setError] = useState(false);
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
        setResult("");
        setError(false);
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
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center justify-center  "
                >
                    <div className="p-5 ">
                        <label className="p-5 text-black">Please enter url:</label>
                        <input
                            type="text"
                            id="Url"
                            value={url}
                            onChange={handleChange}
                            placeholder="Enter Url"
                            className="p-5 text-black border border-black rounded-2xl"
                        />
                    </div>
                    <input
                        type="submit"
                        className="py-5 px-10 bg-blue-600 rounded-full hover:ease-in-out hover:transition-all hover:scale-110 hover:duration-500 text-white"
                    />
                </form>
                {result && !error && (
                    <a
                        href={error ? "#" : `http://127.0.0.1:8000/api/${result}`}
                        className="text-black justify-center items-center flex"
                    >
                        {error ? "" : `127.0.0.1:8000/api/${result}`}
                    </a>
                )}
                {error && (
                    <p className="text-black justify-center items-center flex">
                        Url already shortened
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
