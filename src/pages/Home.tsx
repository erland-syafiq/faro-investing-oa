import { useState } from 'react';
import { useForm } from '../hooks/useForm.tsx';
import AuthService from '../services/AuthService.tsx';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  username: string;
  password: string;
}


function Home() {
  const initialValues: LoginFormValues = { username: '', password: '' };


  const [submissionError, setSubmissionError] = useState("");
  const navigate = useNavigate();

  const validate = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};
    if (!values.username) errors.username = 'Username is required';
    if (!values.password) errors.password = 'Password is required';
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm<LoginFormValues>({
    initialValues,
    validate,
    onSubmit: ({username, password}:LoginFormValues) => {
      console.log("Hello");
      const authService = AuthService.Instance;
      try {
        authService.login(username, password);
        navigate("/assets");
        console.log("redirecting...");
      }
      catch (e) {
        setSubmissionError(e.message);
      }
    },
  });

  return (
    <div className="bg-base w-screen min-h-screen flex items-center justify-center">
      <div className="min-w-80 p-8 bg-white shadow-md rounded-lg">
        <div className="bg-primary h-3 w-24 mb-6"></div>
        <h1 className="font-raleway text-6xl mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <input
              type="submit"
              value="Login"
              className="w-full p-2 bg-primary text-white font-semibold rounded cursor-pointer"
            />
            {submissionError && <p className="text-red-500 text-sm">{submissionError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
