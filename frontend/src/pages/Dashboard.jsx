import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import {LineChart, Line,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
  
const MyBarChart = () => {
    const data = [
        { name: 'Tháng 1', doanhThu: 4000 },
        { name: 'Tháng 2', doanhThu: 3000 },
        { name: 'Tháng 3', doanhThu: 5000 },
        { name: 'Tháng 4', doanhThu: 2780 },
    ];
    return (
      <ResponsiveContainer width={500} height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="doanhThu" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
};

const MyLineChart = () => {
    const data = [
        { tháng: '1', doanhThu: 2400 },
        { tháng: '2', doanhThu: 2210 },
        { tháng: '3', doanhThu: 2290 },
        { tháng: '4', doanhThu: 2000 },
        { tháng: '5', doanhThu: 2181 },
        { tháng: '6', doanhThu: 2500 },
      ];
    return (
      <ResponsiveContainer width={500} height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tháng" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="doanhThu" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
};

class Dashboard extends React.Component {
    render() {
        return (
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
                                <h1>10</h1>
                            </div>
                            <div className="Stat">
                                <h2>Số mẫu nước được lấy</h2>
                                <h1>20</h1>
                            </div>
                            <div className="Stat">
                                <h2>Số mẫu nước đạt tiêu chuẩn</h2>
                                <h1>15 (65.17%)</h1>
                            </div>
                        </div>
                        <div className="chart" style={{ marginTop: "20px", width: "100%", display: "flex", alignItems: "center",justifyContent:"center", flexWrap:"wrap", gap: "40px" }}>
                            <div>
                                <h2 style={{ textAlign: "center" }}>Thống kê doanh thu</h2>
                                <MyBarChart />
                            </div>
                            <div>
                                <h2 style={{ textAlign: "center" }}>Thống kê doanh thu</h2>
                                <MyLineChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            </>
        );
    }
}
export default Dashboard;