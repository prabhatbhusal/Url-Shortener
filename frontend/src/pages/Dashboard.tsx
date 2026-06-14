import React, { useState,useEffect } from "react";
const Dashboard =()=>{
    const [urls,seturls]=useState([])
    const [selectedAlias,setSelectedAlias]=useState("")
    const [analytics,setAnalytics]=useState("")
    const [loading,setLoading]=useState(false)


    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/urls/')
            .then(response => response.json())
            .then(data => seturls(data));
    }, []);
    

    return (
        <>
        <section></section>
            <div className="flex justify-center items-center py-5"><h1 className="text-bold text-2xl  bg-amber-500 rounded-full p-5 border-2 ">The Analytics Dashboard</h1></div>
            
        </>
    )
}
export default Dashboard 