// src/pages/PoojaStoreServices.jsx

import React from "react";
import { TextField, Button } from "@mui/material";
import { Formik, Form, FieldArray, getIn } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SEO from "../../components/SEO";

const validationSchema = Yup.object().shape({
  services: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Service name is required"),
        price: Yup.number()
          .typeError("Price must be a number")
          .positive("Price must be positive")
          .required("Price is required"),
        description: Yup.string(),
      })
    )
    .min(1, "At least one service is required"),
});

const initialValues = {
  services: [{ name: "", description: "", price: "" }],
};

const PoojaStoreServices = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        { services: values.services }
      );
      console.log("Submitted Services:", response.data);
      alert("Services submitted successfully!");
      resetForm();

      // ✅ Navigate to vendor page after submission
      navigate('/vendor');
    } catch (error) {
      console.error("Error submitting services:", error);
      alert("Failed to submit services. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (

    <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 p-6 pt-4">
      <SEO title='Pooja Store Service | Brahmin Connect' />
      <div className="bg-white rounded-xl shadow p-6 sm:p-10 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Add a Partner</h1>
        <p className="text-gray-500 mb-6">Complete the form to add the pooja store.</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            setFieldValue
          }) => (
            <Form>
              <FieldArray name="services">
                {({ push }) => (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">Services</h2>
                      <Button
                        type="button"
                        variant="outlined"
                        className="text-[#D75A28] border-[#D75A28] normal-case"
                        sx={{
                          borderColor: "#D75A28",
                          color: "#D75A28",
                          fontWeight: 500,
                          fontSize: "0.875rem",
                          padding: "4px 16px",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "#fef4f1",
                            borderColor: "#D75A28",
                          },
                          width: "100%",
                          '@media (min-width: 640px)': {
                            width: "auto",
                          },
                        }}
                        onClick={() => push({ name: "", description: "", price: "" })}
                      >
                        Add Another Service
                      </Button>
                    </div>

                    {values.services.map((service, index) => {
                      const nameError = getIn(errors, `services[${index}].name`);
                      const nameTouched = getIn(touched, `services[${index}].name`);
                      const priceError = getIn(errors, `services[${index}].price`);
                      const priceTouched = getIn(touched, `services[${index}].price`);
                      const descriptionError = getIn(errors, `services[${index}].description`);
                      const descriptionTouched = getIn(touched, `services[${index}].description`);

                      return (
                        <div key={index} className="mb-6 border-b pb-6">
                          <h3 className="font-medium text-gray-700 mb-3">
                            {index + 1}. Service Details
                          </h3>

                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col w-full sm:w-[35%]">
                              <label
                                htmlFor={`services.${index}.name`}
                                className="text-sm font-medium text-gray-700 mb-1"
                              >
                                Service Name
                              </label>
                              <TextField
                                id={`services.${index}.name`}
                                name={`services.${index}.name`}
                                placeholder="Type here"
                                size="small"
                                variant="outlined"
                                value={service.name}
                                onChange={(e) => {
                                  const onlyText = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                  handleChange({
                                    target: {
                                      name: `services.${index}.name`,
                                      value: onlyText,
                                    },
                                  });
                                }}
                                onBlur={handleBlur}
                                error={Boolean(nameError && nameTouched)}
                                helperText={nameError && nameTouched ? nameError : ""}
                                InputProps={{
                                  className: "bg-gray-100",
                                }}
                              />


                              <label
                                htmlFor={`services.${index}.price`}
                                className="text-sm font-medium text-gray-700 mb-1 mt-4"
                              >
                                Price
                              </label>
                              <TextField
                                id={`services.${index}.price`}
                                name={`services.${index}.price`}
                                placeholder="₹ 0"
                                size="small"
                                variant="outlined"
                                value={service.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(priceError && priceTouched)}
                                helperText={priceError && priceTouched ? priceError : ""}
                                InputProps={{
                                  className: "bg-gray-100",
                                }}
                              />
                            </div>

                            <div className="flex flex-col w-full sm:w-1/2">
                              <label
                                htmlFor={`services.${index}.description`}
                                className="text-sm font-medium text-gray-700 mb-1"
                              >
                                Description
                              </label>
                              <TextField
                                id={`services.${index}.description`}
                                name={`services.${index}.description`}
                                placeholder="..........."
                                size="small"
                                variant="outlined"
                                value={service.description}
                                onChange={(e) => {
                                  const onlyText = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                  handleChange({
                                    target: {
                                      name: `services.${index}.description`,
                                      value: onlyText,
                                    },
                                  });
                                }}
                                onBlur={handleBlur}
                                error={Boolean(descriptionError && descriptionTouched)}
                                helperText={descriptionError && descriptionTouched ? descriptionError : ""}
                                fullWidth
                                InputProps={{
                                  className: "bg-gray-100",
                                }}
                              />

                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </FieldArray>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 mb-4">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: "#D75A28",
                    ":hover": { backgroundColor: "#c95021" },
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    padding: "8px 24px",
                    width: "100%",
                    '@media (min-width: 640px)': {
                      width: "auto",
                    },
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>

                <Button
                  type="button"
                  variant="contained"
                  onClick={() => {
                    if (window.history.length > 2) {
                      navigate(-1);
                    } else {
                      navigate("/vendor");
                    }
                  }}
                  sx={{
                    backgroundColor: "#d25b2d",
                    ":hover": { backgroundColor: "#c14e1f" },
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    padding: "8px 24px",
                    color: "white",
                    width: "100%",
                    '@media (min-width: 640px)': {
                      width: "auto",
                    },
                  }}
                >
                  Back
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>

  );
};

export default PoojaStoreServices;
