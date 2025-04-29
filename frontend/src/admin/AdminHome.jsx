import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

class AdminHome extends React.Component{
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
                    background-image: url('https://img.freepik.com/premium-photo/serene-water-droplets-with-gentle-waves-reflections_100209-6223.jpg');
                }
                h1 {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 36px;
                }
                `}
            </style>
            <Header />
            <div>
                <h1>WELCOME TO WATER RESEARCHING MANAGEMENTS</h1>
            </div>
            <Footer />
            </>
        )
    }
}

export default AdminHome;