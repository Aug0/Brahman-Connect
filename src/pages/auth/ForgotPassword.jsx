import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {TextField, Button} from "@mui/material";
import backgroundImage from "/assets/login-bg.jpg";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import SEO from "../../components/SEO";
import queries from "../../queries/index";
import {useError} from "../../context/ErrorContext";
import Loader from "../../components/Loader";
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {handleError} = useError();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, {setSubmitting}) => {
    try {
      setLoading(true);
      queries
        .forgot_password(values.email)
        .then(r => {
          if (r.code === 200 || r.code === 201) {
            handleError("Success", r?.message, false);
          } else if (r?.code !== undefined) {
            handleError("Error", r?.message, true);
            setLoading(false);
          }
        })
        .catch(err => {
          handleError("Error", r.message, true);
        });
      setSubmitting(false);
    } catch (err) {
      setLoading(false);
      handleError("Error", "SomeThing want wrong", true);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full relative flex items-center justify-center px-4 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "sans-serif",
      }}
    >
      {loading && <Loader />}
      <SEO title="Forgot Password | Brahmin Connect" />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

      <div className="relative z-20 flex flex-col lg:flex-row items-center lg:items-start justify-between w-full max-w-5xl gap-6 sm:gap-10 mt-2 lg:mt-[-30px]">
        {/* Left Text Section */}
        <div className="text-white w-full max-w-sm text-center lg:text-left mt-8 sm:mt-14 lg:mt-[-60px] px-4 sm:ml-8 md:ml-26">
          <div className="bg-white bg-opacity-45 h-8 sm:h-10 w-48 sm:w-72 mx-auto lg:mx-0 mb-3 rounded-sm" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-2">
            Reset your
            <br />
            password
          </h1>
          <p className="text-sm sm:text-base">
            Enter your email to receive a <br /> password reset link
          </p>
        </div>

        {/* Form */}
        <Formik
          initialValues={{email: ""}}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({errors, touched, isSubmitting}) => (
            <Form className="bg-white px-5 pt-6 pb-24 sm:px-6 sm:pt-8 sm:pb-24 rounded-xl shadow-lg w-full max-w-[90%] sm:max-w-sm mt-6 sm:mt-10 text-sm">
              {" "}
              <div className="space-y-1">
                <label className="block text-gray-800 font-bold text-sm">
                  Email ID
                </label>
                <Field
                  as={TextField}
                  name="email"
                  placeholder="john@gmail.com"
                  fullWidth
                  variant="outlined"
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      height: "50px",
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "15px",
                    },
                  }}
                />
              </div>
              <div className="mt-6">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: "#e5672a",
                    fontSize: "15px",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    textTransform: "none",
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#d4551a",
                    },
                  }}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-white text-xs z-10">
        © 2025 - All Rights Reserved
      </div>
    </div>
  );
}
