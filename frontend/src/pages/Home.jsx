import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

class Home extends React.Component{
    render(){
        return(
            <>
            <style>
                {`
                body {
                    background-color: #f0f0f0;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                h1 {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 40px;
                    color: white;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }
                `}
            </style>
            <Header />
            <div style={{ textAlign: "center", marginTop: "0px" }}>
                <img src="/assets/wbg.png" alt="Logo" style={{ width: "100%", height: "100%" }} />
            </div>
            </>
        )
    }
}

export default Home;