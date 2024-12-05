// src/components/auth/RegisterForm.js
import React, { useState } from 'react';
import Button from '../shared/Button';
import Input from '../shared/Input';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/authSlice';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(registerUser({ username, email, password })).unwrap();
      history.push('/login');  // Redirect to login page after registration
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
