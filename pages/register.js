import { useState, useEffect, useContext } from 'react';

import Link from 'next/link';

import FullscreenWrapper from '../components/FullscreenWrapper/FullscreenWrapper';
import Form from '../components/Form/Form';
import InputGroup from '../components/InputGroup/InputGroup';
import SubmitButton from '../components/SubmitButton/SubmitButton';
import Logo from '../components/Logo/Logo';
import Head from 'next/head';
import styles from '../styles/Register.module.css';
import Spinner from '../components/Spinner/Spinner';
import ProjectContext from '../context/Project-context';
export default function register() {
  const context = useContext(ProjectContext);
  const { handleLoginAsGuest } = context;
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isRegister: true,
  });
  const handleResetInputs = () =>
    setInputs((prevState) => ({
      ...prevState,
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }));
  const inputList = [
    {
      label: 'Username',
      setNameId: 'username',
      type: 'text',
      placeholder: ' ',
      value: inputs.username,
    },
    {
      label: 'E-mail',
      setNameId: 'email',
      type: 'email',
      placeholder: ' ',
      value: inputs.email,
    },
    {
      label: 'Password',
      setNameId: 'password',
      type: 'password',
      placeholder: ' ',
      value: inputs.password,
    },
    {
      label: 'Confirm Password',
      setNameId: 'confirmPassword',
      type: 'password',
      placeholder: ' ',
      value: inputs.confirmPassword,
    },
  ];

  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://netplix-inky-five.vercel.app/';
    console.time('Sign up time');
    try {
      const result = await fetch(`${url}/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...inputs,
          authType: 'register',
        }),
      });

      const resultJSON = await result.json();
      if (resultJSON.ok) {
        handleResetInputs();
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      setFeedback(resultJSON.message);
    } catch (error) {
      setIsLoading(false);
      setFeedback(error);
    }
    console.timeEnd('Sign up time');
  };

  return (
    <FullscreenWrapper>
      <Head>
        <title>Netflix Clone | Register</title>
      </Head>
      <main className={styles.register}>
        <Form submitFunc={handleSubmit}>
          <Logo type="big" margin="0 auto 50px auto" maxWidth="160px" />
          {feedback && <p>{feedback}</p>}
          {inputList.map((input, id) => {
            return (
              <InputGroup
                key={input.label}
                inputFor={'register'}
                usernameForValidation={inputs.username}
                passwordForValidation={inputs.password}
                setId={input.setNameId}
                setType={input.type}
                setPlaceholder={input.placeholder}
                setName={input.setNameId}
                setLabel={input.label}
                handleChangeFunc={handleChange}
                autoFocus={id === 0 && true}
                inputValue={input.value}
              />
            );
          })}
          <SubmitButton isDisabled={isLoading} isTypeSubmit={true}>
            {isLoading ? <Spinner /> : 'Register'}
          </SubmitButton>
          <p style={{ width: '100%', textAlign: 'center', margin: '20px 0' }}>OR</p>
          <SubmitButton
            isDisabled={isLoading}
            isTypeSubmit={false}
            func={() => {
              setIsLoading(true);
              handleLoginAsGuest();
            }}
          >
            {isLoading ? <Spinner /> : 'Login as Guest'}
          </SubmitButton>
          <p>
            Already have an account? <Link href="/login">Login now</Link>
          </p>
        </Form>
      </main>
    </FullscreenWrapper>
  );
}

export async function getServerSideProps(context) {
  const token = await context.req.cookies.token;
  let url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://netplix-inky-five.vercel.app';
  if (token) {
    const result = await fetch(`${url}/api/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const resultJSON = await result.json();
    if (resultJSON.ok) {
      return {
        redirect: {
          destination: '/browse',
          permanent: false,
        },
        props: {},
      };
    }
    return { props: {} };
  }
  return { props: {} };
}
