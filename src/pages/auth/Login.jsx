import { useEffect ,useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useError } from '../../context/ErrorContext';
import {logOut, Login as setUser} from "../../store/userSlice"
import SEO from '../../components/SEO.jsx';
import queries from "../../queries/index.js";
import { getRedirectUrl } from '../../../config.js';
import Loader from '../../components/Loader.jsx';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { handleError } = useError();
   const [loading, setLoading] = useState(false);
  
  const handleLogin = async (values, { setSubmitting }) => {  
      try {
         setLoading(true);
            const bodyData = {
              loginName: values.email.trim(),
              password: values.password.trim(),
            };           
            queries
              .login(bodyData)
              .then((r) => {
                if (r) {
                  if (r.status === 503 || r.code === 503){
                    return false
                  }else
                  if (r.status === 401 || r.code === 401){
                    handleError("Error", r.message.data.message, true);
                  }else
                  if (r.code === 200 || r.status === 201) {
                    storeToken(r.data.access_token);
                    storeRefreshToken(r.data.refresh_token);
                    queries.getUserDetailsByToken(r.access_token).then((res) => {
                     
                      if (res?.code === 200 || res?.code === 201) {
                        dispatch(
                          setUser({
                            user: res?.data,
                            userRole: res?.data?.userRole,
                          })
                        );
                        const redirectUrl=getRedirectUrl(res?.data?.userRole);
                         navigate(redirectUrl); // navigate to vendor route
                      } else if(res?.code !== undefined){
                        handleError("Error", "SomeThing went wrong", true);
                      }
                    });
                  } else {
                    setSubmitting(false);
                    handleError("Error", "Invalid email or password", true);
                  }
                }
                setSubmitting(false);
              })
              .catch((err) => {
                setSubmitting(false);
                 setLoading(false);
                handleError("Error", "SomeThing went wrong", true);
              });
          } catch (err) {
            handleError("Error", err, true);
            setSubmitting(false);
             setLoading(false);
          }
  };
  
    useEffect(() => {
    localStorage.clear();
    dispatch(logOut({loading:false,
      user:null}));
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-between px-4 relative"
      style={{
        backgroundImage: "url('/assets/login-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'sans-serif',
      }}
    >
       {loading && <Loader />}
      <SEO title='Login | Brahmin Connect'/>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center relative z-10">
        <div className="relative z-20 flex flex-col lg:flex-row items-center lg:items-start justify-between w-full max-w-6xl gap-6 sm:gap-10 mt-2 lg:mt-[-30px]">
          {/* Left Section */}
          <div className="text-white w-full max-w-sm text-center lg:text-left mt-10 sm:mt-16 lg:mt-0 px-4 sm:ml-8 md:ml-26">
            <div className="bg-white bg-opacity-45 h-8 sm:h-10 w-48 sm:w-72 mx-auto lg:mx-0 mb-3 rounded-sm" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-2">
              Login to<br />your account
            </h1>
            <p className="text-sm sm:text-base">Let's make things simpler</p>
          </div>

          {/* Form Section */}
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="bg-white px-5 py-6 sm:px-6 sm:py-8 rounded-xl shadow-md w-full max-w-[90%] sm:max-w-sm mt-2 sm:mt-10 text-sm">
                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-gray-800 font-bold text-sm">Email</label>
                  <Field
                    as={TextField}
                    name="email"
                    placeholder="John@gmail.com"
                    fullWidth
                    variant="outlined"
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        height: '50px',
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '15px',
                      },
                    }}
                  />
                </div>

                {/* Password */}
                <div className="space-y-1 mt-4">
                  <label className="block text-gray-800 font-bold text-sm">Password</label>
                  <Field
                    as={TextField}
                    type="password"
                    name="password"
                    placeholder="Your password"
                    fullWidth
                    variant="outlined"
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        height: '50px',
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '15px',
                      },
                    }}
                  />
                </div>

                {/* Forgot Password */}
                <div className="text-right text-xs mt-2 mb-4">
                  <Link
                    to="/auth/forgot-password"
                    className="text-blue-600 border-b-2 border-blue-300 pb-[1px] hover:opacity-80"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: '#e5672a',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    borderRadius: '10px',
                    textTransform: 'none',
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: '#d4551a',
                    },
                  }}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-white text-xs z-10 py-2">
        © 2025 - All Rights Reserved
      </div>
    </div>
  );
}
