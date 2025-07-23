import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {TextField, Button} from "@mui/material";
import {Formik, Form, Field, FieldArray} from "formik";
import * as Yup from "yup";
import axios from "axios";
import SEO from "../../components/SEO";

export default function Login() {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const inputRefs = useRef([]);
  const otpSentRef = useRef(false); // Used to auto-focus only once after OTP is shown

  const MobileSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
      .required("Mobile number is required"),
    otp: otpSent
      ? Yup.array()
          .of(
            Yup.string().matches(/^\d$/, "Must be a digit").required("Required")
          )
          .when("otpSent", {
            is: true,
            then: schema =>
              schema.min(6, "Enter full OTP").required("OTP is required"),
          })
      : Yup.array().nullable(),
  });

  const handleSubmit = async (values, {setSubmitting}) => {
    try {
      if (!otpSent) {
        // Simulate sending OTP via API
        await axios.post("https://jsonplaceholder.typicode.com/posts", {
          mobile: values.mobile,
        });
        alert(`OTP sent to ${values.mobile}`);

        setOtpSent(true);
      } else {
        const otpCode = values.otp.join("");
        // Simulate verifying OTP
        if (otpCode === "123456") {
          alert("Login successful!");
          navigate("/vendor");
        } else {
          throw new Error("Invalid OTP");
        }
      }
    } catch (err) {
      alert(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="h-screen w-full relative flex items-center justify-center px-4 overflow-hidden"
      style={{
        backgroundImage: "url('/assets/login-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "sans-serif",
      }}
    >
      <SEO title="Login | Brahmin Connect" />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
      {/* Content Container */}
      <div className="flex-grow flex items-center justify-center relative z-10">
        <div className="relative z-20 flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl gap-6 sm:gap-10 mt-2 lg:mt-[-30px]">
          {/* Left Section */}
          <div className="text-white w-full max-w-sm text-center lg:text-left mt-10 sm:mt-16 lg:mt-[-200px] px-4 sm:ml-8">
            <div className="bg-white bg-opacity-45 h-8 sm:h-10 w-45 sm:w-72 mx-auto lg:mx-0 mb-3 rounded-sm" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-2">
              Login to
              <br />
              your account
            </h1>
            <p className="text-sm sm:text-base">Let's make things simpler</p>
          </div>

          {/* Form Section */}
          <Formik
            initialValues={{mobile: "", otp: Array(6).fill("")}}
            validationSchema={MobileSchema}
            onSubmit={handleSubmit}
          >
            {({values, errors, touched, isSubmitting, setFieldValue}) => (
              <Form className="bg-white px-5 py-6 sm:px-6 sm:py-8 rounded-xl shadow-md w-full max-w-[90%] sm:max-w-sm mt-6 sm:mt-10 text-sm">
                {!otpSent && (
                  <div className="space-y-1">
                    <label className="block text-gray-800 font-bold text-sm">
                      Mobile Number
                    </label>
                    <Field
                      as={TextField}
                      name="mobile"
                      placeholder="Enter mobile number"
                      fullWidth
                      variant="outlined"
                      error={touched.mobile && !!errors.mobile}
                      helperText={touched.mobile && errors.mobile}
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
                )}

                {otpSent && (
                  <div className="space-y-1">
                    <label className="block text-gray-800 font-bold text-sm mb-2">
                      Enter OTP
                    </label>
                    <FieldArray name="otp">
                      {() => (
                        <div className="flex gap-2">
                          {values.otp.map((_, index) => (
                            <TextField
                              key={index}
                              inputRef={el => {
                                inputRefs.current[index] = el;
                                if (index === 0 && el && !otpSentRef.current) {
                                  el.focus(); // Autofocus first input only once
                                  otpSentRef.current = true;
                                }
                              }}
                              value={values.otp[index]}
                              onChange={e => {
                                const val = e.target.value.replace(/\D/, "");
                                if (val) {
                                  setFieldValue(`otp[${index}]`, val);
                                  if (index < 5)
                                    inputRefs.current[index + 1]?.focus();
                                } else {
                                  setFieldValue(`otp[${index}]`, "");
                                }
                              }}
                              onKeyDown={e => {
                                if (e.key === "Backspace") {
                                  if (values.otp[index]) {
                                    setFieldValue(`otp[${index}]`, "");
                                  } else if (index > 0) {
                                    setFieldValue(`otp[${index - 1}]`, "");
                                    inputRefs.current[index - 1]?.focus();
                                  }
                                }
                              }}
                              onPaste={e => {
                                const pasted = e.clipboardData
                                  .getData("Text")
                                  .replace(/\D/g, "");
                                if (pasted.length === 6) {
                                  for (let i = 0; i < 6; i++) {
                                    setFieldValue(`otp[${i}]`, pasted[i]);
                                  }
                                  inputRefs.current[5]?.focus();
                                }
                                e.preventDefault(); // Prevent default paste
                              }}
                              name={`otp[${index}]`}
                              error={touched.otp && !!errors.otp}
                              inputProps={{
                                maxLength: 1,
                                style: {
                                  textAlign: "center",
                                  fontSize: "18px",
                                  padding: "10px",
                                },
                              }}
                              sx={{
                                width: "50px",
                                height: "50px",
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: "12px",
                                  height: "50px",
                                },
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </FieldArray>

                    {touched.otp && typeof errors.otp === "string" && (
                      <div className="text-red-600 text-sm mt-1">
                        {errors.otp}
                      </div>
                    )}
                  </div>
                )}

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
                    mt: 4,
                    "&:hover": {
                      backgroundColor: "#d4551a",
                    },
                  }}
                >
                  {otpSent
                    ? isSubmitting
                      ? "Verifying..."
                      : "Verify OTP"
                    : isSubmitting
                    ? "Sending OTP..."
                    : "Send OTP"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* Footer */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-white text-xs z-10">
        © 2025 - All Rights Reserved
      </div>
       
    </div>
  );
}
