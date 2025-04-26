import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LandingPage() {
    return (
        <>
            <style>
                {`
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-image: url('https://img.freepik.com/premium-photo/serene-water-droplets-with-gentle-waves-reflections_100209-6223.jpg');
                    background-size: cover;
                    
                }
                h1 {
                    margin-top: 0px;
                    text-align: center;
                    font-size: 36px;
                    color: white;
                }
                `}
            </style>
            <Header />
            <div>
                <h1>WELCOME TO WATER RESEARCHING LABORATORY</h1>
            </div>
        </>
    )
}
