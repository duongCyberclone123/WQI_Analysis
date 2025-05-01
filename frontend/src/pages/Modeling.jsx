import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import AIChatbot from "../components/AIChatbot";

export default function Modeling() {

    const [placeNo, setPlaceNo] = useState("")
    const [temp, setTemp] = useState("")
    const [pH, setpH] = useState("")
    const [DO, setDO] = useState("")
    const [con, setCon] = useState("")
    const [alkan, setAlkan] = useState("")
    const [no2, setNO2] = useState("")
    const [po4, setPO4] = useState("")
    const [nh4, setNH4] = useState("")
    const [h2s, setH2S] = useState("")
    const [tss, setTSS] = useState("")
    const [cod, setCOD] = useState("")
    const [totalAe, setTotalAe] = useState("")
    const [edward, setEdward] = useState("")
    const [aero, setAero] = useState("")
    const [coliform, setColiform] = useState("")
    const [wqi, setWqi] = useState(0)
    const [wqr, setWqr] = useState("")
    const [show, setShow] = useState(false);

    const handlePrediction = async () => {
        console.log("JSON data: ", {
            place: { "location1": placeNo },
            temperature: { "location1": temp },
            pH: { "location1": pH },
            DO: { "location1": DO },
            conductivity: { "location1": con },
            alkalinity: { "location1": alkan },
            no2: { "location1": no2 },
            nh4: { "location1": nh4 },
            po4: { "location1": po4 },
            h2s: { "location1": h2s },
            tss: { "location1": tss },
            cod: { "location1": cod },
            aeromonas_total: { "location1": totalAe },
            edwardsiella_ictaluri: { "location1": edward },
            aeromonas_hydrophila: { "location1": aero },
            coliform: { "location1": coliform },
            water_quality: { "location1": 95 }
        });
        try {
            const res = await axios.post("http://localhost:8000/test",
                {
                    place: { "location1": placeNo },
                    temperature: { "location1": temp },
                    pH: { "location1": pH },
                    DO: { "location1": DO },
                    conductivity: { "location1": con },
                    alkalinity: { "location1": alkan },
                    no2: { "location1": no2 },
                    nh4: { "location1": nh4 },
                    po4: { "location1": po4 },
                    h2s: { "location1": h2s },
                    tss: { "location1": tss },
                    cod: { "location1": cod },
                    aeromonas_total: { "location1": totalAe },
                    edwardsiella_ictaluri: { "location1": edward },
                    aeromonas_hydrophila: { "location1": aero },
                    coliform: { "location1": coliform },
                    water_quality: { "location1": 95 }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            await axios.post("http://localhost:3002/analysis/insert", {
                place: placeNo,
                temperature: temp,
                pH: pH,
                DO: DO,
                conduct: con,
                alkan: alkan,
                no2: no2,
                nh4: nh4,
                po4: po4,
                h2s: h2s,
                tss: tss,
                cod: cod,
                aero_total: totalAe,
                edward: edward,
                aero_hydro: aero,
                coliform: coliform,
                wqi: res.data.prediction[0],
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            setWqi(res.data.prediction[0]);
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("Lỗi khi gọi API: " + error.message);
        }
    };
    

    return (
        <>
            <Header />    
            <h1 style={{fontSize: "40px", marginTop: '150px', fontWeight: "bold", textAlign: "center"}}>WATER QUALITY INDEX PREDICTION</h1>  
            <div style={{marginTop: '30px', display: "flex", flexWWrap: "wrap", gap:"20px" }}>
            <style>
                    {`
                    input[type="date"] {
                        appearance: none;
                        -webkit-appearance: none;
                        -moz-appearance: none;

                        padding: 10px 15px;
                        font-size: 16px;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        background-color: #fff;
                        color: #333;

                        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                        transition: border-color 0.3s, box-shadow 0.3s;
                        height: 10px;
                        width: 115px;
                    }

                    input[type="date"]:hover {
                        border-color: #4CAF50;
                    }

                    input[type="date"]:focus {
                        border-color: #4CAF50;
                        outline: none;
                        box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
                    }

                    input[type="number"] {
                        appearance: none;
                        -webkit-appearance: none;
                        -moz-appearance: none;

                        padding: 10px 15px;
                        font-size: 16px;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        background-color: #fff;
                        color: #333;

                        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                        transition: border-color 0.3s, box-shadow 0.3s;
                        height: 10px;
                        width: 40px;
                    }

                    input[type="number"]:hover {
                        border-color: #4CAF50;
                    }

                    input[type="number"]:focus {
                        border-color: #4CAF50;
                        outline: none;
                        box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
                    }
                    `}
                </style>
                <div style={{width: "100%", height: "140px", overflowX: "scroll"}}>
                    <table style={{borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Place No.</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Temperature</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>pH</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Disolved Oxygen</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Conductivity</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Alkanity</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>NO2</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>PO4</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>NH4</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>H2S</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Total suspended solids</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Chemical Oxygen Demand</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Total Aeromonas</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Edwardsiella ictaluri</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Aeromonas hydrophila</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Coliform</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={placeNo} onChange={(e) => setPlaceNo(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={temp} onChange={(e) => setTemp(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={pH} onChange={(e) => setpH(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={DO} onChange={(e) => setDO(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={con} onChange={(e) => setCon(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={alkan} onChange={(e) => setAlkan(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={no2} onChange={(e) => setNO2(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={po4} onChange={(e) => setPO4(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={nh4} onChange={(e) => setNH4(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={h2s} onChange={(e) => setH2S(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={tss} onChange={(e) => setTSS(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={cod} onChange={(e) => setCOD(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={totalAe} onChange={(e) => setTotalAe(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={edward} onChange={(e) => setEdward(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={aero} onChange={(e) => setAero(e.target.value)}/>
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>
                                    <input type="number" value={coliform} onChange={(e) => setColiform(e.target.value)}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div></div>
                </div>
                <div style={{width: "4px", height: "140px", backgroundColor: "#000"}}></div>
                <div style={{height: "140px"}}>
                    <table style={{borderCollapse: 'collapse' }}>
                        <thead>
                            <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Water Quality Index</th>
                            <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Water Quality Rate</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center', height: "20px"}}>
                                    {wqi}
                                </td>
                                <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center', height: "20px"}}>
                                    {wqr}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <style>
                {`
                    .btn {
                        display: flex;               
                        align-items: center;        
                        justify-content: center;     
                        width: 160px;
                        height: 40px;
                        border: 2px solid #040403;
                        border-radius: 10px;
                        background-color: #C0C0C0;
                        color: #040403;
                        font-size: 18px;
                        font-weight: bold;
                        margin-top: 30px;
                    }
                    .btn:hover {
                        background-color: #40AAB9;
                        color: #F2E394;
                        cursor: pointer;
                    }
                `}
            </style>
            <div className="btn" onClick={() => handlePrediction()}>Generating Model</div>
            <AIChatbot />
        </>
    );
}
