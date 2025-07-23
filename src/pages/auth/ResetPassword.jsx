import {useNavigate, useSearchParams} from "react-router-dom";
import {
  TextField,
  Button,
} from "@mui/material";
import {useState} from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import queries from "../../queries/index";
import {useError} from "../../context/ErrorContext";
import SEO from "../../components/SEO";
import Loader from "../../components/Loader";

export default function ResetPassword() {
  const {handleError} = useError();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, {resetForm, setSubmitting}) => {
    try {
      setLoading(true);
      queries
        .reset_password(token, values.newPassword.trim())
        .then(r => {
          if (r.code === 200 || r.code === 201) {
            handleError("Success", r?.message, false);
            resetForm();
            navigate("/auth/login")
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
      className="min-h-screen w-full flex flex-col relative"
      style={{
        backgroundImage: "url('/assets/login-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "sans-serif",
      }}
    >
      {loading && <Loader />}
      <SEO title="Reset Password | Brahmin Connect" />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

      {/* Main Scrollable Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-12 relative z-10 overflow-y-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full max-w-6xl gap-6 sm:gap-10 pt-4 sm:pt-10 lg:pt-0">
          {/* Left Text */}
          <div className="text-white w-full max-w-sm text-center lg:text-left mt-8 sm:mt-14 lg:mt-[-20px] px-4 sm:ml-8 md:ml-26">
            <div className="bg-white bg-opacity-45 h-8 sm:h-10 w-48 sm:w-72 mx-auto lg:mx-0 mb-3 rounded-sm" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-2">
              Reset your
              <br />
              password
            </h1>
            <p className="text-sm sm:text-base">Let's make things simpler</p>
          </div>

          {/* Form */}
          <Formik
            initialValues={{newPassword: "", confirmPassword: ""}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({errors, touched, isSubmitting}) => (
              <Form className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm text-gray-800 space-y-6">
                <div>
                  <label className="block text-gray-800 font-bold text-sm sm:text-base mb-1">
                    New Password
                  </label>
                  <Field
                    as={TextField}
                    name="newPassword"
                    type="password"
                    placeholder="Your password"
                    fullWidth
                    variant="outlined"
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        height: {xs: "54px", sm: "56px", md: "50px"},
                      },
                      "& .MuiInputBase-input": {
                        fontSize: {xs: "16px", sm: "16px", md: "15px"},
                      },
                    }}
                  />
                </div>

                <div>
                  <label className="block text-gray-800 font-bold text-sm sm:text-base mb-1">
                    Confirm Password
                  </label>
                  <Field
                    as={TextField}
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    fullWidth
                    variant="outlined"
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        height: {xs: "54px", sm: "56px", md: "50px"},
                      },
                      "& .MuiInputBase-input": {
                        fontSize: {xs: "16px", sm: "16px", md: "15px"},
                      },
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  size="large"
                  style={{
                    backgroundColor: "#E15C2B",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textTransform: "none",
                    borderRadius: "12px",
                    padding: "14px 0",
                  }}
                >
                  {isSubmitting ? "Setting Password..." : "Set Password"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full text-center text-white text-xs sm:text-sm py-2">
        © 2025 - All Rights Reserved
      </div>
    </div>
  );
}
