import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../style/header.css'

export default function HeaderRes() {
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    
    return(user == null?
        <>
        <header className="header">
            <h1 onClick={() => navigate("/home")}><img src="/assets/plogo.png" style={{ width: "30px", height: "30px", marginRight: "10px", marginTop: "-4px" }} />WQR LAB</h1>
            <div className="sidebar-toggle" onClick={toggleSidebar}>☰</div>
            <nav className="navbar">
                <a href="/home">Home</a>
                <a href="/dashboard">Dashboard</a>
                <a href="/model">AI Model</a>
                <a href="/report">Report</a>
                <a href="#">Thông tin cá nhân</a>
            </nav>
        </header>

        {showSidebar && (
            <div className="sidebar">
                <a href="/home" onClick={toggleSidebar}>Home</a>
                <a href="/dashboard" onClick={toggleSidebar}>Dashboard</a>
                <a href="/model" onClick={toggleSidebar}>AI Model</a>
                <a href="/report" onClick={toggleSidebar}>Report</a>
                <a href="#" onClick={toggleSidebar}>Thông tin cá nhân</a>
            </div>
        )}
        </>:(user.role == "admin" ?(
            <>
            <header className="header">
                <h1 onClick={() => navigate("/home")}><img src="/assets/plogo.png" style={{ width: "30px", height: "30px", marginRight: "10px", marginTop: "-4px" }} />WQR LAB</h1>
                <div className="sidebar-toggle" onClick={toggleSidebar}>☰</div>
                <nav className="navbar">
                    <a href="/home">Home</a>
                    <a href="/dashboard">Dashboard</a>
                    <a href="/model">AI Model</a>
                    <a href="/report">Report</a>
                    <a href="#">Thông tin cá nhân</a>
                </nav>
            </header>

            {showSidebar && (
                <div className="sidebar">
                    <a href="/home" onClick={toggleSidebar}>Home</a>
                    <a href="/dashboard" onClick={toggleSidebar}>Dashboard</a>
                    <a href="/model" onClick={toggleSidebar}>AI Model</a>
                    <a href="/report" onClick={toggleSidebar}>Report</a>
                    <a href="#" onClick={toggleSidebar}>Thông tin cá nhân</a>
                </div>
            )}
            </>
        ):(
        <>
        <header className="header">
            <h1 onClick={() => navigate("/home")}>
                <div className="sidebar-toggle" onClick={toggleSidebar}>☰</div>
                <img src="/assets/plogo.png" style={{ width: "30px", height: "30px" }} />
                WQR LAB
            </h1>
            <nav className="navbar">
                <a href="/home">Home</a>
                <a href="/dashboard">Dashboard</a>
                <a href="/model">AI Model</a>
                <a href="/report">Report</a>
                <a href="#">Thông tin cá nhân</a>
            </nav>
        </header>

        {showSidebar && (
            <div className="sidebar">
                <a href="/home" onClick={toggleSidebar}>Home</a>
                <a href="/dashboard" onClick={toggleSidebar}>Dashboard</a>
                <a href="/model" onClick={toggleSidebar}>AI Model</a>
                <a href="/report" onClick={toggleSidebar}>Report</a>
                <a href="#" onClick={toggleSidebar}>Thông tin cá nhân</a>
            </div>
        )}
        </>
        ))
        
    )
}