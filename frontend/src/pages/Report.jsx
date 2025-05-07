import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

export default function Report() {
    const rows = 10;
    const columns = 24;
    const [limitRecord, setLimitRecord] = useState(10);
    const lstLimitRecord = [10, 20, 50, 100];
    const [dataset, setDataset] = useState([]);
    const [startIdx, setStartIdx] = useState(0);
    const [lb, setLb] = useState(0);
    const [ub, setUb] = useState(100);
    const [startDate, setStartDate] = useState("2022/01/01");
    const [endDate, setEndDate] = useState("2025/01/01");

    useEffect(()=>{
        const fetchData = async() => {
            try {
                const res = await axios.get("http://localhost:3002/analysis/fetch",{
                    params: {
                        limit: limitRecord || 10,
                        ub: ub || 100,
                        lb: lb || 0,
                        startDate: startDate || "2022/01/01",
                        endDate: endDate || "2025/01/01",
                        offset: startIdx || 0
                    }
                })
                setDataset(res.data.data)
            } catch (error) {
                alert(error.message)
            }
        }
        fetchData();
    },[limitRecord, ub, lb, startDate, endDate, startIdx])

    const DateFormat = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('en-GB', options);
    }

    function downloadExcel() {
        fetch('http://localhost:3002/analysis/export/excel')
          .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.blob();
          })
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'wqi_data.xlsx'; // tên file tải về
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
          })
          .catch(error => {
            console.error('Download error:', error);
          });
    }

    function downloadPDF() {
        fetch('http://localhost:3002/analysis/export/pdf')
          .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.blob();
          })
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'wqi_data.pdf'; // tên file tải về
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
          })
          .catch(error => {
            console.error('Download error:', error);
          });
    }

    return (
        <>
            <Header />
            <div className="filter" style={{marginTop: "150px"}}>
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

                    input[type="text"] {
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
                        width: 25px;
                    }

                    input[type="text"]:hover {
                        border-color: #4CAF50;
                    }

                    input[type="text"]:focus {
                        border-color: #4CAF50;
                        outline: none;
                        box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
                    }
                    `}
                </style>
                <div style={{display: "flex", flexWrap: "wrap", gap: "20px"}}>
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px", fontSize: "18px", fontWeight: "bold", marginTop: "5px"}}>Ngày bắt đầu</div>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <div style={{height: "30px", width: "4px", backgroundColor: "#000", marginLeft: "20px"}}></div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px", fontSize: "18px", fontWeight: "bold", marginTop: "5px"}}>Ngày kết thúc</div>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <div style={{height: "30px", width: "4px", backgroundColor: "#000", marginLeft: "20px"}}></div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px", fontSize: "18px", fontWeight: "bold", marginTop: "5px"}}>Cận dưới WQI</div>
                        <input
                            type="text"
                            value={lb}
                            onChange={(e) => setLb(e.target.value)}
                        />
                        <div style={{height: "30px", width: "4px", backgroundColor: "#000", marginLeft: "20px"}}></div>
                    </div>
                    <div style={{display: "flex"}}>
                        <div style={{marginRight: "10px", fontSize: "18px", fontWeight: "bold", marginTop: "5px"}}>Cận trên WQI</div>
                        <input
                            type="text"
                            value={ub}
                            onChange={(e) => setUb(e.target.value)}
                        />
                        <div style={{height: "30px", width: "4px", backgroundColor: "#000", marginLeft: "10px", marginRight: "10px"}}></div>
                    </div>
                    
                </div>
                
            </div>        
            <div style={{marginTop: '30px', display: "flex", flexWWrap: "wrap", gap:"20px" }}>
                <div style={{width: "100%", height: "500px", overflowY: "scroll", overflowX: "scroll"}}>
                    <table style={{borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>STT</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Province</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>District</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Observed Place</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Place No.</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Co-ordinate</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Date</th>
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
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Water Quality Index</th>
                                <th style={{border: '1px solid #ccc', padding: '8px', backgroundColor: '#f2f2f2',}}>Water Quality Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataset.map((item, id) => (
                                <tr key={id}>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{id + Number(startIdx) + 1}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{item.province}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{item.district}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{item.observation_point}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{item.place}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{item.coordinate}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{DateFormat(item.date)}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{Number(item.temperature).toFixed(2)} &#8451;</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{Number(item.pH).toFixed(1)}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{Number(item.DO).toFixed(1)}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{item.conductivity}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{Number(item.alkalinity).toFixed(2)}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{Number(item.no2).toFixed(4)}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{Number(item.po4).toFixed(4)}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{Number(item.nh4).toFixed(4)}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{Number(item.h2s).toFixed(4)}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{Number(item.tss).toFixed(1)}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{Number(item.cod).toFixed(1)}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{item.aeromonas_total < 1 ? Number(item.aeromonas_total).toFixed(1) : Number(item.aeromonas_total).toFixed(0)}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{item.edwardsiella_ictaluri == 0 ? "Âm tính" : "Dương tính"}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{item.aeromonas_hydrophila == 0 ? "Âm tính" : "Dương tính"}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{item.coliform < 1 ? Number(item.coliform).toFixed(1) : Number(item.coliform).toFixed(0)}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{item.wqi}</td>
                                    <td style={{border: '1px solid #ccc', padding: '8px', textAlign: 'center',}}>{item.water_quality == 0?"Rất tệ":(item.water_quality == 1 ? "Tệ" : (item.water_quality == 2 ? "Trung bình" : (item.water_quality == 3 ? "Khá tốt" : (item.water_quality == 4 ? "Tốt" : "Xuất sắc"))))}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div></div>
                </div>
                <div style={{width: "2px", height: "500px", backgroundColor: "#000"}}></div>
                <div>
                    <style>
                        {`
                            .PDF:hover {
                                background-color: #7D383F;
                                color: white;
                                cursor: pointer;
                            }
                            .Excel:hover {
                                background-color: #68B0AB;
                                color: white;
                                cursor: pointer;
                            }
                        `}
                    </style>
                    <div className="PDF" style={{width: "100px", height: "30px", border: "2px solid #09192A", justifyContent: "center", textAlign: "center", justifyItems: "center", alignItems:"center", marginBottom: "30px", borderRadius: "10px", backgroundColor: "#FF9AA2", paddingTop: "10px"}} onClick={() => downloadPDF()}>PDF</div>
                    <div className="Excel" style={{width: "100px", height: "30px", border: "2px solid #09192A", justifyContent: "center", textAlign: "center", justifyItems: "center", alignItems:"center", marginBottom: "30px", borderRadius: "10px", backgroundColor: "#B5EAD7", paddingTop: "10px"}} onClick={() => downloadExcel()}>Exel</div>
                    <div></div>
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px" }}>
                <style>
                    {`
                    select {
                        appearance: none;
                        -webkit-appearance: none;
                        -moz-appearance: none;

                        padding: 10px 15px;
                        font-size: 16px;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        background-color: #fff;
                        color: #333;
                        min-width: 100px;

                        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                        transition: border-color 0.3s, box-shadow 0.3s;

                        background-image: url("data:image/svg+xml,%3Csvg fill='gray' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
                        background-repeat: no-repeat;
                        background-position: right 10px center;
                        background-size: 12px;
                        padding-right: 35px;
                    }

                    select:focus {
                        border-color: #4a90e2;
                        outline: none;
                        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
                    }

                    .nav-button {
                        background-color: #4a90e2;
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 500;
                        transition: background-color 0.3s, transform 0.2s;
                    }

                    .nav-button:hover {
                        background-color: #357ab8;
                        transform: scale(1.03);
                    }

                    .nav-button:disabled {
                        background-color: #ccc;
                        cursor: not-allowed;
                    }
                    `}
                </style>

                <select value={limitRecord} onChange={(e) => {setLimitRecord(e.target.value); setStartIdx(0);}}>
                    {lstLimitRecord.map((item, id) => (
                    <option key={id} value={item}>{item}</option>
                    ))}
                </select>

                <button
                    className="nav-button"
                    onClick={() => setStartIdx(Number(startIdx) - Number(limitRecord) <= 0 ? Number(startIdx) : Number(startIdx) - Number(limitRecord))}
                >
                    Prev
                </button>
                <button
                    className="nav-button"
                    onClick={() => {setStartIdx(Number(startIdx) + Number(limitRecord) >= 1612 ? Number(startIdx) : Number(startIdx) + Number(limitRecord)); console.log(startIdx)}}
                >
                    Next
                </button>
            </div>
        </>
    );
}
