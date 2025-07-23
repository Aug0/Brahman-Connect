import React from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  FormLabel,
} from '@mui/material';
import SEO from '../../components/SEO';

const categories = ['Prasadam', 'Sevas', 'Special Occasion', 'Pooja'];


const numberToWords = (num) => {
  const words = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  return words[num] || `${num + 1}`;
};

const validationSchema = Yup.object().shape({
  additions: Yup.array().of(
    Yup.object().shape({
      category: Yup.string().required('Required'),
      title: Yup.string().required('Required'),
      price: Yup.number().typeError('Must be a number').required('Required'),
    })
  ),
});

const TempleAdditions = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      additions: [{ category: '', title: '', price: '' }],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post('https://jsonplaceholder.typicode.com/posts', values);
        alert('Submitted successfully!');
        navigate('/vendor');
      } catch (error) {
        console.error(error);
        alert('Submission failed');
      }
    },

  });

 const { values, handleChange, handleSubmit, errors, touched, setFieldValue, isSubmitting } = formik;
  return (

    <div className="p-4 sm:p-10">
      <SEO title='Temple Additions | Brahmin Connect' />
      <div className="bg-white rounded-xl shadow p-6 sm:p-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Add a Temple</h2>
        <p className="text-sm text-gray-500 mb-6">Complete the form to add the temple.</p>

        <FormikProvider value={formik}>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Temple Additions</h3>
              <Button
                onClick={() => {
                  setFieldValue('additions', [
                    ...values.additions,
                    { category: '', title: '', price: '' },
                  ]);
                }}
                variant="outlined"
                size="small"
                className="!text-orange-500 !border-orange-500 normal-case text-xs px-2 py-0.5 whitespace-nowrap max-w-[110px] sm:max-w-[140px] inline-flex overflow-hidden text-ellipsis"
                sx={{
                  minWidth: 'unset',
                  height: '28px',
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'none',
                  lineHeight: 1.2,
                  padding: '4px 10px',
                  borderColor: '#F97316', // orange-500
                  color: '#F97316',
                  ":hover": {
                    backgroundColor: '#FFF7ED',
                  },
                }}
              >
                Add more
              </Button>

            </div>

            <FieldArray
              name="additions"
              render={() =>
                values.additions.map((item, index) => (
                  <div key={index} className="mb-6">
                    <p className="font-medium mb-3">
                      {index + 1}. Addition {numberToWords(index)}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <div className="flex flex-col w-full sm:w-[25%]">
                        <FormLabel className="text-sm text-black mb-1">Select Category</FormLabel>
                        <FormControl size="small">
                          <Select
                            name={`additions[${index}].category`}
                            value={item.category}
                            onChange={handleChange}
                            displayEmpty
                          >
                            <MenuItem value="" disabled>Select Category</MenuItem>
                            {categories.map((cat) => (
                              <MenuItem key={cat} value={cat}>
                                {cat}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.additions?.[index]?.category && errors.additions?.[index]?.category && (
                          <div className="text-red-500 text-xs mt-1">{errors.additions[index].category}</div>
                        )}
                      </div>

                      <div className="flex flex-col w-full sm:w-[25%]">
                        <FormLabel className="text-sm text-black mb-1">Title</FormLabel>
                        <TextField
                          size="small"
                          placeholder="Enter Title"
                          name={`additions[${index}].title`}
                          value={item.title}
                          onChange={(e) => {
                            const onlyText = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                            handleChange({
                              target: {
                                name: `additions[${index}].title`,
                                value: onlyText,
                              },
                            });
                          }}
                        />

                        {touched.additions?.[index]?.title && errors.additions?.[index]?.title && (
                          <div className="text-red-500 text-xs mt-1">{errors.additions[index].title}</div>
                        )}
                      </div>

                      <div className="flex flex-col w-full sm:w-[25%]">
                        <FormLabel className="text-sm text-black mb-1">Price</FormLabel>
                        <TextField
                          size="small"
                          placeholder="Enter Price"
                          name={`additions[${index}].price`}
                          value={item.price}
                          onChange={handleChange}
                        />
                        {touched.additions?.[index]?.price && errors.additions?.[index]?.price && (
                          <div className="text-red-500 text-xs mt-1">{errors.additions[index].price}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              }
            />
            {/* Buttons Container */}
            <div className="flex flex-wrap gap-3 mt-6 mb-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="!bg-[#d25b2d] hover:!bg-[#bb4f24] !text-white font-medium text-sm px-4 sm:px-6 py-2 rounded-md normal-case"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 sm:px-6 py-2 rounded-md bg-[#d25b2d] text-white font-medium text-sm hover:bg-[#bb4f24] transition"
              >
                Back
              </button>
            </div>


          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default TempleAdditions;
