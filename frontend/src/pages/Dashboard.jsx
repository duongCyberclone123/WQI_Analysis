import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import {PieChart, Pie, Cell, LineChart, Line,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
  
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#FF00FF'];

function MeasurementLineChart({ data }) {
    console.log("Line chart data: ", data);
    return (
        <ResponsiveContainer width={400} height={400}> {/* 👈 thêm height vào đây */}
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgWqi" stroke="#8884d8" name="WQI trung bình" />
            </LineChart>
        </ResponsiveContainer>
    );
  }

function DonutChart({ data }) {
    const keys = ["Tệ", "Khá tệ", "Trung bình", "Khá tốt", "Tốt"];
    const newArr = data.map((item, index) => ({
        name: keys[index],
        value: item
      }));
    
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={ newArr}
          cx="50%"    // tâm X
          cy="50%"    // tâm Y
          innerRadius={70}   // bán kính trong => tạo lỗ
          outerRadius={120}  // bán kính ngoài
          fill="#8884d8"
          paddingAngle={5}   // khoảng cách giữa các miếng
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {newArr.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  }

function Dashboard() {
        const [ops, setOps] = useState(0);
        const [obs, setObs] = useState(0);
        const [data, setData] = useState([]);
        const [valid, setValid] = useState(0);
        const [province, setProvince] = useState("");
        const [filterProvinces, setFilterProvinces] = useState([]);
        const [district, setDistrict] = useState("");
        const [filterDistricts, setFilterDistricts] = useState([]);
        const [Ob_point, setObPoint] = useState("");
        const [filterObPoints, setFilterObPoints] = useState([]);
        const [wqiData, setWqiData] = useState([]);
        const handleClickProvince = (province) => {
            setProvince(province);
            setFilterProvinces([]);
        }

        const IdentifyProvince = (province) => {
            const selectedProvince = filterProvinces.find(item => item.pname === province);
            if (selectedProvince) {
                return selectedProvince.pid;
            }
            return null;
        }

        const IndentifyDistrict = (district) => {
            const selectedDistrict = filterDistricts.find(item => item.dname === district);
            if (selectedDistrict) {
                return selectedDistrict.w_id;
            }
            return null;
        }

        useEffect(() => {
            const fetchops = async () => {
                try {
                    const response = await axios.get("http://localhost:3002/analysis/nb_of_observation_points");
                    setOps(response.data.nb_of_observation_points);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            const fetchobs = async () => {
                try {
                    const response = await axios.get("http://localhost:3002/analysis/nb_of_observations");
                    setObs(response.data.nb_of_observations);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            const fetchvalid = async () => {
                try {
                    const response = await axios.get("http://localhost:3002/analysis/valid_quality");
                    setValid(response.data.valid_quality);
                }
                catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            const fetchwater = async () => {
                try {
                    const response = await axios.get("http://localhost:3002/analysis/water_quality");
                    const data = response.data.water_quality;
                    setData(data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            const fetchMap = async () => {
                try {
                    const response = await axios.get("http://localhost:3002/analysis/map");
                    const data = response.data;
                    console.log(data.provinces);
                    console.log(data.districts);
                    console.log(data.ob_places);
                    setFilterProvinces(data.provinces);
                    setFilterDistricts(data.districts);
                    setFilterObPoints(data.ob_places);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchops();
            fetchobs();
            fetchvalid();
            fetchwater();
            fetchMap();
        }, []);

        useEffect(() => {
            const fetchWqiData = async () => {
                try {
                    const response = await axios.get("http://localhost:3002/analysis/observe", {
                        params: {
                            province: province,
                            district: district,
                            ob_place: Ob_point
                        }
                    });
                    const rawData = response.data.observation;
                    const yearMap = {};

                    rawData.forEach(item => {
                        const year = new Date(item.date).getFullYear();
                        if (!yearMap[year]) {
                            yearMap[year] = { total: 0, count: 0 };
                        }
                        yearMap[year].total += item.wqi;
                        yearMap[year].count += 1;
                    });

                    const processedData = Object.entries(yearMap).map(([year, { total, count }]) => ({
                        year: parseInt(year),
                        avgWqi: parseFloat((total / count).toFixed(2))
                    }));
                    
                    console.log("WQI data: ", processedData);
                    setWqiData(processedData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchWqiData();
        },[province, district, Ob_point]);

        return (wqiData && wqiData.length!=0  ? (
            <>
            <style>{`
                .dashboard-container {
                    display: flex;
                    margin-left:-10px;
                    margin-right:-10px;
                    background-color: #f0f0f0;
                    font-family: Arial, sans-serif;
                }
                .dashboard-content {
                    margin-top: 80px;
                    padding: 20px;
                    width: 100%;
                    align-items: center;
                }
                .dashboard-content .head-tag {
                    display: flex;
                    padding: 10px;
                    border-radius: 5px;
                    width: 100%;
                    justify-items: center;
                }
                .dashboard-content .head-tag h1 {
                    font-size: 24px;
                    background-color: #4CAF50;
                    padding: 10px;
                    border-radius: 0 5px 5px 0;
                    color: white;
                    width: 100%;
                }
                .dashboard-content .head-tag span {
                    width: 10px;
                    margin-top: 16px;
                    margin-bottom: 16px;
                    border-radius: 5px 0 0 5px;
                    background-color: #4CA;
                }
                .dashboard-content .content {
                    padding: 10px;
                    border-radius: 5px;
                    margin-left: 10px;
                    justify-items: center;
                    background-color: white;
                }
                .Stat{
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    width: 200px;
                    height: 150px;
                    border: 2px solid #333;
                    border-radius: 5px;
                    background-color: #f0f0f0;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .Stat h2 {
                    content: center;
                    text-align: center;
                }
                .Stat h1 {
                    text-align: center;
                    font-size: 30px;
                    color: #4CAF50;
                }
                .Overview{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
            <Header />
            <div className="dashboard-container" >
                <div className="dashboard-content">
                    <div className="head-tag">
                        <span></span>
                        <h1><b>WATER QUALITY OVERVIEW</b></h1>
                    </div>
                    <div className="content">
                        <div className="Overview" style={{ display: "flex", gap: "40px", flexWrap: "wrap"  }}>
                            <div className="Stat">
                                <h2>Số địa điểm được khảo sát</h2>
                                <h1>{ops}</h1>
                            </div>
                            <div className="Stat">
                                <h2>Số mẫu nước được lấy</h2>
                                <h1>{obs}</h1>
                            </div>
                            <div className="Stat">
                                <h2>Số mẫu nước đạt tiêu chuẩn</h2>
                                <h1>{valid} ({(valid/1612*100).toFixed(2)}%)</h1>
                            </div>
                        </div>
                        <div className="sort-bar" style={{display: "flex", flexWrap: "wrap", gap: "20px"}}>
                            <div className="province" style={{ padding: "8px", boxSizing: "border-box", borderRadius: "5px", border: "1px solid #ccc" }}>
                                <input
                                    type="text"
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                    list="province-options"  // <-- Phần này bị thiếu
                                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                                    placeholder="Nhập tên tỉnh..."
                                />
                                <datalist id="province-options">
                                    {filterProvinces
                                    .filter(item =>
                                        item.pname.toLowerCase().includes(province.toLowerCase())
                                    )
                                    .map((option, index) => (
                                        <option key={index} value={option.pname} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="district" style={{ padding: "8px", boxSizing: "border-box", borderRadius: "5px", border: "1px solid #ccc" }}>    
                                <input
                                    type="text"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    list="district-options"  // <-- Phần này bị thiếu
                                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                                    placeholder="Nhập tên huyện..."
                                />
                                <datalist id="district-options">
                                    {filterDistricts
                                    .filter(item => 
                                        item.pid === IdentifyProvince(province) // Lọc theo tỉnh
                                    )
                                    .filter(item =>
                                        item.dname.toLowerCase().includes(district.toLowerCase())
                                    )
                                    .map((option, index) => (
                                        <option key={index} value={option.dname} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="obPlace" style={{ padding: "8px", boxSizing: "border-box", borderRadius: "5px", border: "1px solid #ccc" }}>
                                <input
                                    type="text"
                                    value={Ob_point}
                                    onChange={(e) => setObPoint(e.target.value)}
                                    list="obplace-options"  // <-- Phần này bị thiếu
                                    style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
                                    placeholder="Nhập tên địa điểm..."
                                />
                                <datalist id="obplace-options">
                                    {filterObPoints
                                    .filter(item => 
                                        item.wid === IndentifyDistrict(district) // Lọc theo huyện
                                    )
                                    .filter(item =>
                                        item.opname.toLowerCase().includes(Ob_point.toLowerCase())
                                    )
                                    .map((option, index) => (
                                        <option key={index} value={option.opname} />
                                    ))}
                                </datalist>
                            </div>
                        </div>
                        <div className="chart" style={{ marginTop: "20px", width: "100%", display: "flex", alignItems: "center",justifyContent:"center", flexWrap:"wrap", gap: "40px" }}>
                            <div>
                                <h2 style={{ textAlign: "center" }}>Thống kê chất lượng mẫu nước</h2>
                                <DonutChart data={data} />
                            </div>
                            <div>
                                <h2 style={{ textAlign: "center" }}>Thống kê chất lượng mẫu nước</h2>
                                <MeasurementLineChart data={wqiData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            </>):null
    );
}
export default Dashboard;