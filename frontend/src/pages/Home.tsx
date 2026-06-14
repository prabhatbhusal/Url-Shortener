import { useState } from "react"

const Home = () => {
    const [url, setUrl] = useState("")
    const [result, setResult] = useState("")
    const [countdown, setCountdown] = useState(0)
    function handleChange(e) {
        setUrl(e.target.value)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const response = await fetch("http://127.0.0.1:8000/api/shortenurl/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url_entry: url },

            )
        })
        console.log(response)
    }

    return (
        <>
            <section>
                <form onSubmit={handleSubmit} className="flex items-center justify-center  ">
                    <div className="p-5 ">
                        <label className="p-5 text-black">Please enter url:</label>
                        <input
                            type="text"
                            id='Url' value={url}
                            onChange={handleChange} placeholder="Enter Url" className="p-5 text-black border border-black rounded-2xl" />
                    </div>
                    <input type="submit" className="py-5 px-10 bg-blue-600 rounded-full hover:ease-in-out hover:transition-all hover:scale-110 hover:duration-500 text-white"
                    />
                </form>
            </section>
        </>
    )
}

export default Home