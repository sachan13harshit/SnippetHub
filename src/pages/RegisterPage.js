import React, { useEffect } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log(values);
        try{
            const res = await register(values.username, values.email, values.password);
            if(res.success){
                message.success(res.message);
                navigate('/');
            }
            else{
                message.error(res.message);
            }
        }
        catch(error){
            message.error(error.message);
        }
    }
    return (
        <>
          <header className="App-header">
            <main className="main-area mw-500 text-center px-3">
              <section className="left-section">
                <h1>Register to SnippetHub</h1>
              </section>
              <section className="right-section">
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    label="Name"
                    htmlFor="name"
                    name="name"
                    className="d-block"
                    rules={[{ required: true, message: "Name is required!" }]}
                  >
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      rules={[{ required: true, message: "Email is required!" }]}
                    ></Input>
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    htmlFor="email"
                    name="email"
                    className="d-block"
                    rules={[{ required: true, message: "Email is required!" }]}
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    ></Input>
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    htmlFor="password"
                    name="password"
                    className="d-block"
                    rules={[{ required: true, message: "Password is required!" }]}
                  >
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter the password"
                    ></Input>
                  </Form.Item>
    
                  <Form.Item>
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      style={{ fontSize: "1rem", fontWeight: "600" }}
                    >
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
                <div>
                  <p>
                    Already a user? <Link to="/login">Login now</Link>
                  </p>
                </div>
              </section>
            </main>
          </header>
        </>
      );
    }
    export default RegisterPage;