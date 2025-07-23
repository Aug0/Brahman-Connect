import { use, useEffect ,useState} from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import query from '../../queries/adminQuery';
import {useError} from "../../context/ErrorContext";
import SEO from '../../components/SEO';
import Loader from '../../components/Loader';

export default function CreateAgent() {
  const navigate = useNavigate();
  const {handleError} = useError();
  const { id } = useParams();
   const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneCode: '+91',
      mobile: '',
      altPhoneCode: '+91',
      alternateContactNumber: '',
      role:"AGENT"
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      mobile: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required('Mobile number is required'),
      alternateContactNumber: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits'),//.required('Required'),
    }),
    onSubmit: async (values, { setSubmitting ,resetForm}) => {          
        try {
          setLoading(true);
          if(id){
            values['id']=id
          }
            const response = id? await query.updateAgent(values): await query.addNewAgent(values);
            if (response) {
              if (response?.code === 200 || response.code === 201) {
                 handleError("Success", response.message, false);
                 navigate('/admin/agents');
                 resetForm();
              } else if (response.code !== undefined) {
                handleError("Error", response.message, true);
              }
            }
             setLoading(false)
          } catch (error) {
             setLoading(false)
            handleError("Error", error.message, true);
          } finally {
         setSubmitting(false);
        setLoading(false)
          }
     
    },
  });
    
 const getAgentDetails=async()=>{
     try {
        setLoading(true);
       const response = await query.getAgentDetail(id);
       if (response) {
         if (response?.code === 200 || response.code === 201) {
          formik.setFieldValue("firstName",response.data.firstName);
           formik.setFieldValue("lastName",response.data.lastName);
          formik.setFieldValue("email",response.data.email);
          formik.setFieldValue("alternateContactNumber",response.data.alternateContactNumber);
          formik.setFieldValue("mobile",response.data.mobile)
         } else if (response.code !== undefined) {
           handleError("Error", response.message, true);
         }
           setLoading(false);
       }
     } catch (error) {
        setLoading(false);
       handleError("Error", error.message, true);
     } finally{
      setLoading(false)
     }
     
  }

  useEffect(()=>{
    if(id){
      getAgentDetails()
    }
  },[id])
  return (
    <div className="min-h-screen bg-[#fcf9f1]">
      <SEO title='Agent | Brahmin Connect'/>    
       {
         loading && <Loader/>
      }
      {/* FORM SECTION */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl px-8 py-12">
          {/* ✅ BACK BUTTON */}
          {/* <button
            type="button"
            onClick={() => navigate('/vendor')}
            className="text-sm text-gray-500 mb-4"
          >
            &larr; Back
          </button> */}

          <h1 className="text-2xl font-semibold mb-1 text-gray-800">Create an Agent</h1>
          <p className="text-base font-semibold text-gray-700 mt-4 mb-4">Basic Details</p>

          <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-6">
            {/* Agent Name & Email */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col w-[250px]">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className="border rounded px-3 py-2 w-full  bg-[#FCFCFD]"
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-xs text-red-500">{formik.errors.firstName}</div>
                )}
              </div>
              <div className="flex flex-col w-[250px]">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">Last Name<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className="border rounded px-3 py-2 w-full  bg-[#FCFCFD]"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-xs text-red-500">{formik.errors.lastName}</div>
                )}
              </div>

              <div className="flex flex-col w-[250px]">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email ID<span className="text-red-500">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="border rounded px-3 py-2 w-full  bg-[#FCFCFD]"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-xs text-red-500">{formik.errors.email}</div>
                )}
              </div>
            </div>

            {/* mobile & Alternate mobile */}
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col w-[250px]">
                <label htmlFor="mobile" className="text-sm font-medium text-gray-700 mb-1">Mobile Number<span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <select
                    name="phoneCode"
                    value={formik.values.phoneCode}
                    onChange={formik.handleChange}
                    className="border rounded px-2 bg-[#FCFCFD]"
                  >
                    <option value="+91">+91</option>
                  </select>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                    className="border rounded px-3 py-2 w-full  bg-[#FCFCFD]"
                  />
                </div>
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="text-xs text-red-500">{formik.errors.mobile}</div>
                )}
              </div>

              <div className="flex flex-col w-[250px]">
                <label htmlFor="alternateContactNumber" className="text-sm font-medium text-gray-700 mb-1">Alternate Mobile Number (Optional)</label>
                <div className="flex gap-2">
                  <select
                    name="altPhoneCode"
                    value={formik.values.altPhoneCode}
                    onChange={formik.handleChange}
                    className="border rounded px-2  bg-[#FCFCFD]"
                  >
                    <option value="+91">+91</option>
                  </select>
                  <input
                    type="text"
                    id="alternateContactNumber"
                    name="alternateContactNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.alternateContactNumber}
                    className="border rounded px-3 py-2 w-full  bg-[#FCFCFD]"
                  />
                </div>
                {formik.touched.alternateContactNumber && formik.errors.alternateContactNumber && (
                  <div className="text-xs text-red-500">{formik.errors.alternateContactNumber}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="bg-[#d75a28] hover:bg-[#c94e1e] text-white font-medium px-6 py-2 rounded mt-2"
              >
                {formik.isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
