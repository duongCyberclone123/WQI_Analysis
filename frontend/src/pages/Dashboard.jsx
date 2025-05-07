import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import {PieChart, Pie, Cell, LineChart, Line,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import AIChatbot from "../components/AIChatbot";  
import { MeasurementLineChart, DonutChart, ProvinceLineChart } from "../components/Chart";
import MapViewer from "../components/Map";

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

        const Coordinate = (str) => {
            const coordinates = str.split("-").map(coord => parseFloat(coord.trim()));
            if (coordinates.length === 2) {
                return coordinates;
            } else {
                return [0, 0]; // Hoặc giá trị mặc định khác nếu không thể phân tích cú pháp
            }
        }

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
            const fetchData = async () => {
                await fetchops();
                await fetchobs();
                await fetchvalid();
                await fetchwater();
                await fetchMap();
            }
            fetchData(); // Gọi hàm fetchData ngay lập tức
            const interval = setInterval(fetchData, 10000);

            // Cleanup khi component unmount
            return () => clearInterval(interval);
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
                    console.log("Raw data: ", rawData);
                    const processedData = rawData.map(item => {
                        const date = new Date(item.date);
                        return {
                            year: date.getFullYear(),
                            month: date.getMonth() + 1, // Lấy tháng, bắt đầu từ 0, vì vậy cộng thêm 1
                            wqi: item.wqi,
                            province: item.province,
                            district: item.district,
                            observation_point: item.observation_point,
                            lat: Coordinate(item.coordinate)[0],
                            lng: Coordinate(item.coordinate)[1]
                        };
                    });
                    const yearMonthMap = {};

                    processedData.forEach(item => {
                        const key = `${item.year}-${item.month}`; // Tạo key theo năm và tháng
                        if (!yearMonthMap[key]) {
                            yearMonthMap[key] = {
                                total: 0,
                                count: 0,
                                province: item.province, // Lưu province
                                district: item.district, // Lưu district
                                observation_point: item.observation_point, // Lưu observation_point
                                lat: item.lat,
                                lng: item.lng
                            };
                        }
                        yearMonthMap[key].total += item.wqi;
                        yearMonthMap[key].count += 1;
                    });

                    // Chuyển đổi thành mảng dữ liệu đã xử lý
                    const finalData = Object.entries(yearMonthMap).map(([key, { total, count, province, district, observation_point, lat, lng }]) => {
                        const [year, month] = key.split('-');
                        return {
                            year: parseInt(year),
                            month: parseInt(month),
                            label: `${year}-${String(month).padStart(2, '0')}`,
                            avgWqi: parseFloat((total / count).toFixed(2)),
                            province: province,
                            district: district,
                            observation_point: observation_point,
                            lat: lat,
                            lng: lng
                        };
                    });
                    const sortedData = finalData.sort((a, b) => {
                        if (a.year === b.year) {
                            return a.month - b.month; // So sánh tháng nếu năm giống nhau
                        }
                        return a.year - b.year; // So sánh năm
                    });
                    console.log("WQI data unclustered: ", sortedData);
                    setWqiData(sortedData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchWqiData();
            const interval = setInterval(fetchWqiData, 10000);

            // Cleanup khi component unmount
            return () => clearInterval(interval);
        },[province, district, Ob_point]);

        return (1  ? (
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
                .content{
                    background-image: url("/assets/nbg.png");
                }
                .chart-mask{
                    border: 2px solid #333;
                    border-radius: 5px;
                    background-color: #f0f0f0; 
                    align-items: center;                  
                }
            `}</style>
            <Header />
            <div className="dashboard-container" >
                <div className="dashboard-content">
                    <div className="head-tag">
                        <span></span>
                        <h1><b>WATER QUALITY OVERVIEW</b> <span style={{textAlign: "right", width:"80%"}}><a href="#">Chi tiết</a></span></h1>
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
                                <h1>{valid} ({(valid/obs*100).toFixed(2)}%)</h1>
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
                                {data && data.length > 0 ? (
                                    <div className="chart-mask">
                                        <h2 style={{ textAlign: "center" }}>Thống kê chất lượng mẫu nước</h2>
                                        <div style={{marginRight: "20px"}}>
                                        <DonutChart data={data} />
                                        </div>
                                        
                                    </div>
                                ):null}
                                {wqiData && wqiData.length > 0 ? (
                                    <div className="chart-mask">
                                        <h2 style={{ textAlign: "center" }}>Thống kê chất lượng mẫu nước</h2>
                                        <div style={{marginRight: "20px"}}>
                                            <MeasurementLineChart data={wqiData} />
                                        </div>
                                        
                                    </div>
                                    
                                ):null}
                                <div style={{width: "4px", height: "400px", backgroundColor: "#f0f0f0"}}></div>
                                {wqiData && wqiData.length > 0 ? (
                                    <div className="chart-mask">
                                        <div style={{marginRight: "20px"}}>
                                        <MapViewer lat={wqiData[0].lat} lng={wqiData[0].lng} zoom={13} address={wqiData[0].observation_point + ", " + wqiData[0].district + ", " + wqiData[0].province} />
                                        </div>
                                    </div>
                                ):null}
                        </div>
                    </div>
                </div>
            </div>
            <AIChatbot />
            </>):null
    );
}
export default Dashboard;