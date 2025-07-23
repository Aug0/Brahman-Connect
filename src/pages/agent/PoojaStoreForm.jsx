import React from "react";
import axios from 'axios';
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { Plus } from "lucide-react";

// Validation schema
const validationSchema = Yup.object().shape({
    items: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required("Item name is required"),
            description: Yup.string(),
            price: Yup.string().required("Price is required"),
            type: Yup.string().required("Type is required"),
            duration: Yup.string().when("type", {
                is: "Rent",
                then: (schema) => schema.required("Duration is required"),
                otherwise: (schema) => schema.notRequired(),
            }),
            images: Yup.array(),
        })
    ),
});

const PoojaStoreForm = () => {
    const navigate = useNavigate();

    const initialValues = {
        items: [
            {
                name: "Silver Bell",
                description: "",
                price: "₹1,500",
                type: "Sell",
                duration: "",
                images: ["/assets/bell-icon.svg"],
            },
            {
                name: "Silver Diya",
                description: "",
                price: "₹1,200",
                type: "Rent",
                duration: "24 hours",
                images: [],
            },
        ],
    };

    const handleSubmit = async (values) => {
        try {
            console.log("Submitted values:", values);
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', values);
            if (response.status === 201) {
                alert("Form submitted successfully!");
                navigate('/vendor');
            } else {
                alert("Submission failed.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 p-6 pt-4">
            <div className="bg-white rounded-xl shadow p-10">
                <h1 className="text-xl font-semibold text-gray-800 mb-1">Add a Pooja Store</h1>
                <p className="text-sm text-gray-500 mb-6">Complete the form to add the pooja store.</p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    {({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => (
                        <Form>
                            {/* Header */}
                            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-3 sm:gap-4">
                                <h2 className="text-lg font-semibold text-gray-800">Pooja Items</h2>
                                <FieldArray name="items">
                                    {({ push }) => (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className="!text-orange-500 !border-orange-500 normal-case"
                                            onClick={() =>
                                                push({
                                                    name: "",
                                                    description: "",
                                                    price: "",
                                                    type: "",
                                                    duration: "",
                                                    images: [],
                                                })
                                            }
                                            sx={{
                                                color: "#D75A28",
                                                borderColor: "#D75A28",
                                                textTransform: "none",
                                                fontWeight: 500,
                                            }}
                                        >
                                            ADD ANOTHER ITEM
                                        </Button>
                                    )}
                                </FieldArray>
                            </div>

                            {/* Item Fields */}
                            <FieldArray name="items">
                                {({ remove }) =>
                                    values.items.map((item, index) => (
                                        <div key={index} className="mb-8">
                                            <h3 className="text-base font-semibold text-gray-800 mb-3">
                                                {index + 1}. Item Details
                                            </h3>

                                            {/* Name and Description */}
                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 mb-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Item Name
                                                    </label>
                                                    <TextField
                                                        name={`items.${index}.name`}
                                                        variant="outlined"
                                                        size="small"
                                                        value={item.name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className="w-full bg-gray-50"
                                                        error={Boolean(touched.items?.[index]?.name && errors.items?.[index]?.name)}
                                                        helperText={touched.items?.[index]?.name && errors.items?.[index]?.name}
                                                    />
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Description
                                                    </label>
                                                    <TextField
                                                        name={`items.${index}.description`}
                                                        variant="outlined"
                                                        placeholder="---------"
                                                        size="small"
                                                        value={item.description}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className="w-full bg-gray-50"
                                                    />
                                                </div>
                                            </div>

                                            {/* Price, Type, Duration */}
                                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4 items-start">
                                                <div className="sm:col-span-3">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Price
                                                    </label>
                                                    <TextField
                                                        name={`items.${index}.price`}
                                                        variant="outlined"
                                                        placeholder="Enter Price"
                                                        size="small"
                                                        value={item.price}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className="w-full bg-gray-50"
                                                        error={Boolean(touched.items?.[index]?.price && errors.items?.[index]?.price)}
                                                        helperText={touched.items?.[index]?.price && errors.items?.[index]?.price}
                                                    />
                                                </div>

                                                <div className="sm:col-span-3 pt-1 sm:pt-[1.9rem] sm:pl-3">
                                                    <RadioGroup
                                                        row
                                                        name={`items.${index}.type`}
                                                        value={item.type}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} // 🔥 Added onBlur here
                                                        className="flex items-center gap-4"
                                                    >
                                                        {["Rent", "Sell"].map((option) => (
                                                            <FormControlLabel
                                                                key={option}
                                                                value={option}
                                                                control={
                                                                    <Radio
                                                                        size="small"
                                                                        sx={{
                                                                            color: "#D75A28",
                                                                            "&.Mui-checked": { color: "#D75A28" },
                                                                            p: 0.5,
                                                                        }}
                                                                    />
                                                                }
                                                                label={option}
                                                                sx={{
                                                                    "& .MuiFormControlLabel-label": {
                                                                        fontSize: "0.8rem",
                                                                    },
                                                                    marginRight: "12px",
                                                                }}
                                                            />
                                                        ))}
                                                    </RadioGroup>
                                                </div>

                                                {item.type === "Rent" && (
                                                    <div className="sm:col-span-3">
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Duration
                                                        </label>
                                                        <FormControl
                                                            size="small"
                                                            className="w-full bg-gray-50"
                                                        >
                                                            <Select
                                                                name={`items.${index}.duration`}
                                                                value={item.duration}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur} // 🔥 Added onBlur here
                                                                displayEmpty
                                                            >
                                                                <MenuItem value="" disabled>Select duration</MenuItem>
                                                                <MenuItem value="24 hours">24 hours</MenuItem>
                                                                <MenuItem value="3 days">3 days</MenuItem>
                                                                <MenuItem value="1 week">1 week</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Image Upload */}
                                            <div className="mb-4">
                                                <label className="text-sm font-medium text-gray-800 mb-1 block">
                                                    Add Item Images
                                                </label>
                                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                                    {item.images.map((img, i) => (
                                                        <img
                                                            key={i}
                                                            src={img}
                                                            alt="preview"
                                                            className="w-14 h-14 object-contain border border-gray-200 rounded"
                                                        />
                                                    ))}
                                                </div>
                                                <label
                                                    htmlFor={`upload-${index}`}
                                                    className="w-full sm:w-60 h-28 cursor-pointer bg-gray-100 rounded-md border border-dashed border-gray-300 flex flex-col justify-center items-center text-sm text-gray-700 hover:bg-gray-200 transition"
                                                >
                                                    <Plus className="mb-1 text-[#D75A28]" />
                                                    <p className="text-black text-center">
                                                        Drag & drop files or{" "}
                                                        <span className="text-[#D75A28] font-medium underline">Browse</span>
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 text-center">
                                                        Supported formats: JPG / PNG
                                                    </p>
                                                    <input
                                                        id={`upload-${index}`}
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const files = Array.from(e.target.files || []);
                                                            const urls = files.map((file) => URL.createObjectURL(file));
                                                            setFieldValue(`items.${index}.images`, [...item.images, ...urls]);
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    ))
                                }
                            </FieldArray>

                            {/* Submit & Back Buttons */}
                            <div className="flex gap-4 mt-6 mb-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-md bg-[#D75A28] text-white font-medium text-sm"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="text-white font-medium text-sm px-4 py-2 rounded-md"
                                    style={{ backgroundColor: '#d25b2d' }}
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

export default PoojaStoreForm;