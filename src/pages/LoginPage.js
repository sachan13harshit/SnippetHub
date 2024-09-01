import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Form, Input, Button, message } from 'antd';

const LoginPage = () => {
   const { login } = useAuth();
   const navigate = useNavigate();

   const onFinish = async (values) => {
    try{
        const res = await login(values.email, values.password);
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
   };

   return (
    <>
    <header className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section className="left-section">
          <h1>Login to SnippetHub</h1>
        </section>

        <section className="right-section">
          <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input
                id="email"
                type="text"
                placeholder="Enter your Email"
              ></Input>
            </Form.Item>

            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
    <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
                
              ></Input>
            </Form.Item>

            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New User? <Link to="/register">Register Here</Link>
            </p>
          </div>
        </section>
      </main>
    </header>
  </>
  )
}

export default LoginPage;