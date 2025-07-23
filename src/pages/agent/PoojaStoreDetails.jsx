import React, { useState } from 'react';
import axios from 'axios';
import { MapPin, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    MenuItem,
    Select,
    TextField,
    InputLabel,
    FormControl,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SEO from '../../components/SEO';
import MediaUpload from '../../components/MediaUpload';
import LocationInput from '../../components/LocationInput';

// Validation schema
const validationSchema = Yup.object().shape({
    storeName: Yup.string().required('Required'),
    bankName: Yup.string().required('Required'),
    accountHolder: Yup.string().required('Required'),
    accountNumber: Yup.string().required('Required'),
    ifsc: Yup.string(),
    upi: Yup.string(),
    gst: Yup.string(),
    pan: Yup.string(),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zip: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    location: Yup.string()
        .url('Must be a valid URL')
        .required('Location URL is required'),
});

const PoojaStoreDetails = () => {
    const navigate = useNavigate();
    const [mediaFile, setMediaFile] = useState(null);

    const mapUrl = 'https://maps.app.goo.gl/PUakcMnc4Dzr3SWv6  ';

    const initialValues = {
        storeName: '',
        landline: '',
        firstName: '',
        lastName: '',
        phone: '',
        altPhone: '',
        bankName: '',
        accountHolder: '',
        accountNumber: '',
        ifsc: '',
        upi: '',
        gst: '',
        pan: '',
        city: 'Hyderabad',
        state: '',
        zip: '',
        country: 'India',
        location: '',
    };

    const handleSubmit = async (values, { setFieldError }) => {
        // Custom validation for mediaFile
        if (!mediaFile) {
            setFieldError('mediaFile', 'File upload is required');
            return;
        }

        try {
            console.log('Submitting:', values);
            await axios.post('https://jsonplaceholder.typicode.com/posts ', values);
            navigate('/agent/add-pooja-store');
        } catch (err) {
            console.error('Submission error:', err);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
            <SEO title='Pooja Store | Brahmin Connect' />
            <div className="bg-white rounded-xl shadow p-10 max-w-6xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">Add a Pooja Store</h1>
                <p className="text-gray-500 mb-6">Complete the form to add the pooja store.</p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, touched, errors, setFieldValue }) => (
                        <Form>
                            {/* BASIC DETAILS */}
                            <div className="mb-6">
                                <h3 className="text-gray-700 font-medium mb-4">Basic Details</h3>
                                <div className="flex gap-4 flex-wrap">
                                    <div className="flex flex-col w-full sm:w-[48%] md:w-[30%]">
                                        <label className="text-sm text-gray-700 mb-1">Store Name</label>
                                        <TextField
                                            name="storeName"
                                            size="small"
                                            value={values.storeName}
                                            onChange={(e) => {
                                                const onlyText = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                                handleChange({
                                                    target: {
                                                        name: 'storeName',
                                                        value: onlyText,
                                                    },
                                                });
                                            }}
                                            placeholder="Store Name"
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
                                                name="landline"
                                                size="small"
                                                value={values.landline}
                                                onChange={handleChange}
                                                placeholder="Landline"
                                                className="w-[65%]"
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
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
                                            <FormControl size="small" className="w-[40%] min-w-[80px]">
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
                                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full sm:w-[48%] md:w-[30%]">
                                        <label className="text-sm text-gray-700 mb-1">Alternate Phone Number</label>
                                        <div className="flex gap-2 sm:flex-nowrap flex-wrap">
                                            <FormControl size="small" className="w-[40%] min-w-[80px]">
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
                                                onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PAYMENT DETAILS */}
                            <div className="mb-6">
                                <h3 className="text-gray-700 font-medium mb-4">Payment Details</h3>
                                <div className="flex gap-4 flex-wrap mb-4">
                                    <div className="flex flex-col w-full sm:w-[48%] md:w-[25%]">
                                        <label className="text-sm text-gray-700 mb-1">Bank Name</label>
                                        <TextField
                                            name="bankName"
                                            size="small"
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
                                            placeholder="Bank Name"
                                        />
                                    </div>
                                    <div className="flex flex-col w-full sm:w-[48%] md:w-[25%]">
                                        <label className="text-sm text-gray-700 mb-1">Account Holder's Name</label>
                                        <TextField
                                            name="accountHolder"
                                            size="small"
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
                                            placeholder="Account Holder"
                                        />
                                    </div>
                                    <div className="flex flex-col w-full sm:w-[48%] md:w-[25%]">
                                        <label className="text-sm text-gray-700 mb-1">Bank Account Number</label>
                                        <TextField
                                            name="accountNumber"
                                            size="small"
                                            value={values.accountNumber}
                                            onChange={handleChange}
                                            placeholder="Account Number"
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full sm:w-[48%] md:w-[25%] mb-2">
                                    <label className="text-sm text-gray-700 mb-1">IFSC Code</label>
                                    <TextField
                                        name="ifsc"
                                        size="small"
                                        value={values.ifsc}
                                        onChange={handleChange}
                                        placeholder="IFSC Code"
                                    />
                                </div>
                                <div className="flex justify-center my-3 w-full">
                                    <p className="text-sm text-gray-800 font-semibold">(or)</p>
                                </div>
                                <div className="flex flex-col w-full sm:w-[48%] md:w-[25%] mb-4">
                                    <label className="text-sm text-gray-700 mb-1">UPI ID</label>
                                    <TextField
                                        name="upi"
                                        size="small"
                                        value={values.upi}
                                        onChange={handleChange}
                                        placeholder="vendorname@upi"
                                    />
                                </div>
                                <div className="flex gap-4 mb-4 flex-wrap">
                                    <div className="flex flex-col w-full sm:w-[48%] md:w-[25%]">
                                        <label className="text-sm text-gray-700 mb-1">GST Number</label>
                                        <TextField
                                            name="gst"
                                            size="small"
                                            value={values.gst}
                                            onChange={handleChange}
                                            placeholder="GST Number"
                                        />
                                    </div>
                                    <div className="flex flex-col w-full sm:w-[48%] md:w-[25%]">
                                        <label className="text-sm text-gray-700 mb-1">PAN Number</label>
                                        <TextField
                                            name="pan"
                                            size="small"
                                            value={values.pan}
                                            onChange={handleChange}
                                            placeholder="PAN Number"
                                        />
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
                                <div className="flex gap-4 flex-wrap">
                                    <div className="flex flex-col w-full sm:w-[48%] md:w-[25%]">
                                        <label className="text-sm text-gray-700 mb-1">State</label>
                                        <TextField
                                            name="state"
                                            size="small"
                                            placeholder="Enter State"
                                            value={values.state}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full sm:w-[48%] md:w-[25%]">
                                        <label className="text-sm text-gray-700 mb-1">Zip Code</label>
                                        <TextField
                                            name="zip"
                                            size="small"
                                            placeholder="Enter ZipCode"
                                            value={values.zip}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full sm:w-[48%] md:w-[25%]">
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

                            {/* MEDIA UPLOAD */}
                            <div>
                                <MediaUpload onFileSelect={(file) => setMediaFile(file)} />
                                {!mediaFile && (
                                    <p className="text-red-500 text-xs mt-1">File upload is required</p>
                                )}
                            </div>

                            {/* BUTTONS */}
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

export default PoojaStoreDetails;