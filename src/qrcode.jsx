import "./qrcode.css";
import { useState } from "react";
import React from 'react'
const Qrcode = () => {
  const [data,setData]= useState("");
  const [size,setSize] = useState("");
  const [img , setImg] = useState("");
  const[loading, setLoading] = useState(false);


  async function handlegenerateqr(){
     setLoading(true);
     try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
      setImg(url);
           
     }
     catch(error){
      console.log("qr api error:", error);
     }
     finally{
       setLoading(false);
     }
  }

  function handledownloadqr(){
    fetch(img).then((Response)=>Response.blob()).then((blob)=>{
      const link = document.createElement("a");
      link.href =URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removechild(link);
    })

  }


  return (
      <div className="qrcode-container">
        <h1>QR Code Generator</h1>
        {loading &&<p className="paragraph-wait">Plese wait....</p>}
        {img && <img src={img} alt="qr code"/>}        
       <div className="input-container">
        <label htmlFor="datainput" >Data for qr code</label>
        <input type="text" id="datainput" placeholder="Enter the data" value={data} onChange={(e)=>setData(e.target.value)} />
        <label htmlFor="sizeinput" >Image size (eg.150):</label>
        <input type="text" id="sizeinput" placeholder="Enter the size value" value={size} onChange={(e)=>setSize(e.target.value)} />
        </div>

        <button onClick={handlegenerateqr}>Generate qr code</button>
        <button onClick={handledownloadqr}>Download qr code</button>

      </div>
  )

}

export default Qrcode;
