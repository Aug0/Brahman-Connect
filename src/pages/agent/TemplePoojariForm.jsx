import React from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { useNavigate } from 'react-router-dom';
import {
  TextField,
  MenuItem,
  Button,
  Select,
  FormControl,
} from "@mui/material";
import SEO from "../../components/SEO";

const validationSchema = Yup.object({
  poojaris: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      altPhone: Yup.string().required("Required"),
    })
  ),
});

const TemplePoojariForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      poojaris: [
        { firstName: "", lastName: "", phone: "", altPhone: "" },
      ],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // await axios.post('/api/temple-poojaris', values);
        console.log("Form Submitted", values);
        navigate("/agent/temple-additions");
      } catch (error) {
        console.error("Submission error", error);
      }
    },
  });

  return (

    <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 p-4 sm:p-6 pt-4">
      <SEO title='Temple Poojari | Brahmin Connect' />
      <div className="bg-white rounded-xl shadow p-6 sm:p-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Add a Temple</h1>
        <p className="text-gray-500 mb-6">Complete the form to add the temple.</p>

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <FieldArray name="poojaris">
              {({ push }) => (
                <>
                  <div className="mb-4 flex items-center justify-start gap-4">
                    <h2 className="text-xl font-semibold text-gray-700">Temple Poojaris</h2>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        push({ firstName: "", lastName: "", phone: "", altPhone: "" })
                      }
                      className="text-[#D75A28] border-[#D75A28] hover:bg-[#fef4f1] normal-case text-xs px-2 sm:px-3 py-0.5 sm:py-1 whitespace-nowrap inline-flex max-w-[120px] sm:max-w-[150px] overflow-hidden text-ellipsis"
                      sx={{
                        minWidth: 'unset',
                        height: '28px',
                        fontSize: '12px',
                        fontWeight: 500,
                        textTransform: 'none',
                        borderColor: '#D75A28',
                        color: '#D75A28',
                        lineHeight: 1.2,
                        padding: '4px 10px',
                        ":hover": { backgroundColor: '#fef4f1' },
                      }}
                    >
                      Add Poojari
                    </Button>

                  </div>

                  {formik.values.poojaris.map((_, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="font-semibold mb-2">{index + 1}. Poojari Details</h3>
                      <div className="flex flex-col space-y-4 w-full mb-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex flex-col">
                            <label className="text-sm text-gray-1000 mb-1">First Name</label>
                            <TextField
                              size="small"
                              variant="outlined"
                              className="bg-gray-50"
                              sx={{ width: { xs: '100%', sm: '230px' } }}
                              name={`poojaris[${index}].firstName`}
                              value={formik.values.poojaris[index].firstName}
                              onChange={(e) => {
                                const onlyText = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                formik.setFieldValue(`poojaris[${index}].firstName`, onlyText);
                              }}
                              error={formik.touched.poojaris?.[index]?.firstName && Boolean(formik.errors.poojaris?.[index]?.firstName)}
                              helperText={formik.touched.poojaris?.[index]?.firstName && formik.errors.poojaris?.[index]?.firstName}
                              placeholder="John"
                            />

                          </div>

                          <div className="flex flex-col">
                            <label className="text-sm text-gray-1000 mb-1">Last Name</label>
                            <TextField
                              size="small"
                              variant="outlined"
                              className="bg-gray-50"
                              sx={{ width: { xs: '100%', sm: '230px' } }}
                              name={`poojaris[${index}].lastName`}
                              value={formik.values.poojaris[index].lastName}
                              onChange={(e) => {
                                const onlyText = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                formik.setFieldValue(`poojaris[${index}].lastName`, onlyText);
                              }}
                              error={formik.touched.poojaris?.[index]?.lastName && Boolean(formik.errors.poojaris?.[index]?.lastName)}
                              helperText={formik.touched.poojaris?.[index]?.lastName && formik.errors.poojaris?.[index]?.lastName}
                              placeholder="Gridson"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-2">
                          <div className="flex flex-col">
                            <label className="text-sm text-gray-1000 mb-1">Phone Number</label>
                            <div className="flex gap-2 items-center">
                              <FormControl size="small" sx={{ minWidth: 74 }}>
                                <Select defaultValue="+91">
                                  <MenuItem value="+91">+91</MenuItem>
                                </Select>
                              </FormControl>
                              <TextField
                                placeholder="9012345678"
                                size="small"
                                variant="outlined"
                                className="bg-gray-50"
                                sx={{ width: '150px' }}
                                name={`poojaris[${index}].phone`}
                                value={formik.values.poojaris[index].phone}
                                onChange={(e) => {
                                  const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
                                  formik.setFieldValue(`poojaris[${index}].phone`, numbersOnly);
                                }}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                error={formik.touched.poojaris?.[index]?.phone && Boolean(formik.errors.poojaris?.[index]?.phone)}
                                helperText={formik.touched.poojaris?.[index]?.phone && formik.errors.poojaris?.[index]?.phone}
                              />

                            </div>
                          </div>

                          <div className="flex flex-col">
                            <label className="text-sm text-gray-1000 mb-1">Alternate Phone Number</label>
                            <div className="flex gap-2 items-center">
                              <FormControl size="small" sx={{ minWidth: 74 }}>
                                <Select defaultValue="+91">
                                  <MenuItem value="+91">+91</MenuItem>
                                </Select>
                              </FormControl>
                              <TextField
                                placeholder="7004556789"
                                size="small"
                                variant="outlined"
                                className="bg-gray-50"
                                sx={{ width: '150px' }}
                                name={`poojaris[${index}].altPhone`}
                                value={formik.values.poojaris[index].altPhone}
                                onChange={(e) => {
                                  const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
                                  formik.setFieldValue(`poojaris[${index}].altPhone`, numbersOnly);
                                }}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                error={formik.touched.poojaris?.[index]?.altPhone && Boolean(formik.errors.poojaris?.[index]?.altPhone)}
                                helperText={formik.touched.poojaris?.[index]?.altPhone && formik.errors.poojaris?.[index]?.altPhone}
                              />

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Buttons Container */}
                  <div className="flex flex-wrap gap-3 mt-6 mb-4">
                    <button
                      type="submit"
                      className="px-4 sm:px-6 py-2 rounded-md bg-[#D75A28] text-white font-medium text-sm hover:bg-[#c14f23] transition"
                    >
                      Save & Next
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="px-4 sm:px-6 py-2 rounded-md bg-[#d25b2d] text-white font-medium text-sm hover:bg-[#bb4f24] transition"
                    >
                      Back
                    </button>
                  </div>

                </>
              )}
            </FieldArray>
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default TemplePoojariForm;
