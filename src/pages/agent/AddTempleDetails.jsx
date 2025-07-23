import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  MenuItem,
  Select,
  TextField,
  FormControl,
} from '@mui/material';

import SEO from '../../components/SEO';
import MediaUpload from '../../components/MediaUpload';
import LocationInput from '../../components/LocationInput';

const validationSchema = Yup.object().shape({
  templeName: Yup.string().required('Required'),
  landline: Yup.string().required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  location: Yup.string()
    .url('Must be a valid URL')
    .required('Location URL is required'),
});

const AddTempleDetails = () => {
  const navigate = useNavigate();
  const [mediaFile, setMediaFile] = useState(null);

  const handleSubmit = async (values) => {
    try {
      console.log("Form Values:", values); // Debugging log
      navigate('/agent/add-temple');
      return

      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts ',
        {
          templeName: values.templeName,
          landline: values.landline,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          city: values.city,
          fileName: mediaFile?.name || 'No file uploaded',
        }
      );

      if (response.status === 201) {
        console.log('Submitted:', response.data);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit the form');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <SEO title="Add Temple | Brahmin Connect" />
      <div className="bg-white rounded-xl shadow p-6 md:p-10 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Add a Temple</h1>
        <p className="text-gray-500 mb-6">Complete the form to add the temple.</p>

        <Formik
          initialValues={{
            templeName: '',
            landline: '',
            firstName: '',
            lastName: '',
            pocPhone: '',
            altPhone: '',
            bankName: '',
            accountHolder: '',
            accountNumber: '',
            ifsc: '',
            upi: '',
            pan: '',
            city: 'Hyderabad',
            state: '',
            zip: '',
            country: 'India',
            location: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Basic Details */}
              <div>
                <h3 className="text-gray-700 font-medium mb-4">Basic Details</h3>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex flex-col w-full sm:w-[48%] md:w-[30%]">
                    <label htmlFor="templeName" className="text-sm mb-1">
                      Temple Name
                    </label>
                    <TextField
                      id="templeName"
                      name="templeName"
                      value={values.templeName}
                      onChange={(e) => {
                        const onlyText = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                        handleChange({
                          target: {
                            name: 'templeName',
                            value: onlyText,
                          },
                        });
                      }}
                      size="small"
                      placeholder="Temple Name"
                      error={touched.templeName && Boolean(errors.templeName)}
                      helperText={touched.templeName && errors.templeName}
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-[48%] md:w-[30%]">
                    <label className="text-sm text-gray-700 mb-1">Landline (if any)</label>
                    <div className="flex gap-2">
                      <FormControl size="small" className="w-[50%] min-w-[80px]">
                        <Select defaultValue="+91">
                          <MenuItem value="+91">+91</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        id="landline"
                        name="landline"
                        value={values.landline}
                        onChange={handleChange}
                        type="tel"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                        }
                        size="small"
                        placeholder="Landline"
                        className="w-[65%]"
                        error={touched.landline && Boolean(errors.landline)}
                        helperText={touched.landline && errors.landline}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* POC DETAILS */}
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-4">POC Details</h3>
                <div className="flex gap-4 flex-wrap mb-4">
                  <div className="flex flex-col w-full sm:w-[48%] md:w-[30%]">
                    <label className="text-sm text-gray-700 mb-1">First Name</label>
                    <TextField
                      name="firstName"
                      size="small"
                      value={values.firstName}
                      onChange={(e) => {
                        const onlyText = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                        handleChange({
                          target: {
                            name: 'firstName',
                            value: onlyText,
                          },
                        });
                      }}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-[48%] md:w-[30%]">
                    <label className="text-sm text-gray-700 mb-1">Last Name</label>
                    <TextField
                      name="lastName"
                      size="small"
                      value={values.lastName}
                      onChange={(e) => {
                        const onlyText = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                        handleChange({
                          target: {
                            name: 'lastName',
                            value: onlyText,
                          },
                        });
                      }}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex flex-col w-full sm:w-[48%] md:w-[30%]">
                    <label className="text-sm text-gray-700 mb-1">Phone Number</label>
                    <div className="flex gap-2 sm:flex-nowrap flex-wrap">
                      <FormControl size="small" className="w-[41%] min-w-[80px]">
                        <Select defaultValue="+91">
                          <MenuItem value="+91">+91</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        name="phone"
                        size="small"
                        value={values.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="flex-1"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full sm:w-[48%] md:w-[30%]">
                    <label className="text-sm text-gray-700 mb-1">Alternate Phone Number</label>
                    <div className="flex gap-2 sm:flex-nowrap flex-wrap">
                      <FormControl size="small" className="w-[41%] min-w-[80px]">
                        <Select defaultValue="+91">
                          <MenuItem value="+91">+91</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        name="altPhone"
                        size="small"
                        value={values.altPhone}
                        onChange={handleChange}
                        placeholder="Alternate Phone"
                        className="flex-1"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="text-gray-700 font-medium mb-4">Payment Details</h3>
                <div className="flex flex-wrap gap-4 items-start">
                  <div className="flex flex-col w-full sm:w-[48%] md:w-[24%]">
                    <label htmlFor="bankName" className="text-sm mb-1">
                      Bank Name
                    </label>
                    <TextField
                      id="bankName"
                      name="bankName"
                      placeholder="Bank Name"
                      value={values.bankName}
                      onChange={(e) => {
                        const onlyText = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                        handleChange({
                          target: {
                            name: 'bankName',
                            value: onlyText,
                          },
                        });
                      }}
                      size="small"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-[48%] md:w-[24%]">
                    <label htmlFor="accountHolder" className="text-sm mb-1">
                      Account Holder's Name
                    </label>
                    <TextField
                      id="accountHolder"
                      name="accountHolder"
                      placeholder="Account Holder's Name"
                      value={values.accountHolder}
                      onChange={(e) => {
                        const onlyText = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                        handleChange({
                          target: {
                            name: 'accountHolder',
                            value: onlyText,
                          },
                        });
                      }}
                      size="small"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-[48%] md:w-[24%]">
                    <label htmlFor="accountNumber" className="text-sm mb-1">
                      Bank Account Number
                    </label>
                    <TextField
                      id="accountNumber"
                      name="accountNumber"
                      placeholder="Bank Account Number"
                      value={values.accountNumber}
                      onChange={handleChange}
                      size="small"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                      }
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-[48%] md:w-[24%]">
                    <label htmlFor="ifsc" className="text-sm mb-1">
                      IFSC Code
                    </label>
                    <TextField
                      id="ifsc"
                      name="ifsc"
                      placeholder="IFSC Code"
                      value={values.ifsc}
                      onChange={handleChange}
                      size="small"
                    />
                  </div>
                  <div className="flex justify-center my-3 w-full">
                    <p className="text-sm text-gray-800 font-semibold">(or)</p>
                  </div>
                  <div className="flex flex-col w-full sm:w-[48%] md:w-[24%] gap-4">
                    <div>
                      <label htmlFor="upi" className="text-sm mb-1 block">
                        UPI Id
                      </label>
                      <TextField
                        id="upi"
                        name="upi"
                        placeholder="UPI ID"
                        value={values.upi}
                        onChange={handleChange}
                        size="small"
                        fullWidth
                      />
                    </div>
                    <div>
                      <label htmlFor="pan" className="text-sm mb-1 block">
                        PAN Number
                      </label>
                      <TextField
                        id="pan"
                        name="pan"
                        placeholder="PAN Number"
                        value={values.pan}
                        onChange={handleChange}
                        size="small"
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-4">Address</h3>
                <div className="flex gap-4 flex-wrap mb-4">
                  <div className="flex flex-col w-full sm:w-[70%] md:w-[40%]">
                    <LocationInput
                      values={values}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-[48%] md:w-[30%]">
                    <label className="text-sm text-gray-700 mb-1">City</label>
                    <FormControl size="small">
                      <Select
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                      >
                        <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                  <div className="flex flex-col w-full md:w-1/4 mb-4 md:mb-0">
                    <label className="text-sm text-gray-700 mb-1">State</label>
                    <TextField
                      name="state"
                      size="small"
                      placeholder="Enter State"
                      value={values.state}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-1/4 mb-4 md:mb-0">
                    <label className="text-sm text-gray-700 mb-1">Zip Code</label>
                    <TextField
                      name="zip"
                      size="small"
                      placeholder="Enter ZipCode"
                      value={values.zip}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col w-full md:w-1/4">
                    <label className="text-sm text-gray-700 mb-1">Country</label>
                    <FormControl size="small">
                      <Select
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                      >
                        <MenuItem value="India">India</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              {/* Media Upload */}
              <div>
                <MediaUpload onFileSelect={(file) => setMediaFile(file)} />
              </div>

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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTempleDetails;