import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem("user") ? localStorage.getItem("user") : null);
    return(user == null?
        <>
        <style>
            {`
            header {
                background-color: #333;
                color: white;
                display: inline-flex;
                width: 100%;
                height: 100px;
                align-items: center;
                position: fixed;
                margin: 0;
                margin-top: -20px;
                margin-left: -10px;
                padding: 10px 20px;
                z-index: 1000;
            }
            .header h1 {
                font-size: 24px;
                margin-right: 0px;
            }
            .navbar {
                display: flex;
                width: 80%;
                padding: 20px;
            }
            .navbar a {
                color: white;
                text-decoration: none;
                padding: 14px 20px;
                text-align: center;
                flex-grow: 1;
                font-size: 20px;
            }
            .navbar a:hover {
                background-color: #575757;
                color: white;
            }
            `}
        </style>
        <header className="header">
            <h1>WATER QUALITY RESEARCHER</h1>
            <nav className="navbar">
                <a href="/home">Home</a>
                <a href="/dashboard">Dashboard</a>
                <a href="/model">AI Model</a>
                <a href="/report">Report</a>
                <a href="/login">Login</a>
            </nav>
        </header>
        </>:
        <>
        <style>
            {`
            header {
                background-color: #333;
                color: white;
                display: inline-flex;
                width: 100%;
                height: 100px;
                align-items: center;
                position: fixed;
                margin: 0;
                margin-top: -20px;
                margin-left: -10px;
                padding: 10px 20px;
                z-index: 1000;
            }
            .header h1 {
                font-size: 24px;
                margin-right: 0px;
            }
            .navbar {
                display: flex;
                width: 80%;
                padding: 20px;
            }
            .navbar a {
                color: white;
                text-decoration: none;
                padding: 14px 20px;
                text-align: center;
                flex-grow: 1;
                font-size: 20px;
                width: 80%;
            }
            .navbar a:hover {
                background-color: #575757;
                color: white;
            }
            `}
        </style>
        <header className="header">
            <h1>WATER QUALITY RESEARCHER</h1>
            <nav className="navbar">
                <a href="/home">Home</a>
                <a href="/dashboard">Dashboard</a>
                <div>{user.uid}</div>
            </nav>
        </header>
        </>
    )
}