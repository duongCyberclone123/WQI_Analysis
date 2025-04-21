import { useEffect, useStat  } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

class Login extends React.Component {
    render() {
        return (
            <>
            <style>
                {`
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                        background: linear-gradient(to bottom right, #4CAF50, #2196F3);
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    
                    .login-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                    }
                    
                    .login-box {
                        background-color: white;
                        padding: 40px 30px;
                        border-radius: 20px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.2);
                        width: 300px;
                    }
                    
                    .login-box h2 {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    
                    .login-box form {
                        display: flex;
                        flex-direction: column;
                    }
                    
                    .login-box input[type="text"],
                    .login-box input[type="password"] {
                        padding: 10px;
                        margin-bottom: 15px;
                        border: 2px solid #333;
                        border-radius: 5px;
                    }
                    
                    .checkbox-remember {
                        display: flex;
                        align-items: center;
                        margin-bottom: 15px;
                    }
                    
                    .checkbox-remember input {
                        margin-right: 8px;
                    }
                    
                    .login-box button {
                        padding: 10px;
                        background-color: black;
                        color: white;
                        border: none;
                        border-radius: 7px;
                        cursor: pointer;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    
                    .login-box .forgot-password {
                        text-align: center;
                        font-size: 0.9em;
                        color: black;
                        text-decoration: none;
                    }
                    
                `}
            </style>
            <div class="login-container">
                <div class="login-box">
                <h2>Đăng nhập</h2>
                <form>
                    <label for="username">Email/Tên đăng nhập</label>
                    <input type="text" id="username" placeholder="Email/Tên đăng nhập" required />

                    <label for="password">Mật khẩu</label>
                    <input type="password" id="password" placeholder="Mật khẩu" required />

                    <div class="checkbox-remember">
                    <input type="checkbox" id="remember" />
                    <label for="remember">Lưu tài khoản</label>
                    </div>

                    <button type="submit">Đăng nhập</button>
                    <a href="#" class="forgot-password">Quên mật khẩu?</a>
                </form>
                </div>
            </div>
            </> 
        );
    }
}

export default Login;