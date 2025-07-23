import React, { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from 'moment';
import Calendar from "react-calendar";


const PoojariProfile = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay,setDay]=useState(moment().format("D"))

  const formik = useFormik({
    initialValues: {
      enquiry: "",
    },
    validationSchema: Yup.object({
      enquiry: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("/api/enquiry", values);
        alert("Enquiry submitted");
      } catch (err) {
        alert("Submission failed");
      }
    },
  });

   const handleDateChange = (date) => {
      setSelectedDate(date);
      setDay(moment(date).format("D"))
    };
  return (
    <div style={{ minHeight: "100vh", background: "#FFF6ED", overflowX: "hidden" }}>     

      {/* Back Button */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, pt: 2 }}>
        <Button variant="text" size="small" sx={{ color: "gray" }}>
          ← Back
        </Button>
      </Box>

      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          bgcolor: "white",
          borderRadius: 3,
          p: { xs: 2, sm: 3 },
          my: 3,
        }}
      >
        <Grid container spacing={4}>
          {/* Left Side */}
          <Grid item xs={12} lg={8}>
            {/* Poojari Name and Location */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              gap={1}
              mb={2}
            >
              <Typography fontSize={{ xs: 18, sm: 24 }} fontWeight="bold">
                Poojari Name...
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#F8BF4C",
                  px: 2,
                  py: 0.5,
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 500,
                  mt: { xs: 1, sm: 0 },
                }}
              >
                AMRITSAR, PUNJAB
              </Box>
            </Box>

            {/* Map Link */}
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <LocationOnIcon sx={{ color: "#D75A28", fontSize: 20 }} />
              <a
                href="https://maps.app.goo.gl/pUakMrnC4Drt3SWr6"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#2563EB",
                  fontSize: "13px",
                  textDecoration: "underline",
                  wordBreak: "break-word",
                }}
              >
                https://maps.app.goo.gl/pUakMrnC4Drt3SWr6
              </a>
            </Box>

            {/* Image and Description */}
            <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2} mb={3}>
              <img
                src="/assets/PoojariProfile.jpg"
                alt="poojari"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
              <Box>
                <Typography variant="body2">
                  Offering all types of Hindu rituals including Griha Pravesh,
                  Satyanarayan Katha, Marriage, Vastu Shanti, and other
                  ceremonies. Conducted with devotion, authenticity, and proper
                  Vedic procedures.{" "}
                  <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                    Read more
                  </span>
                </Typography>
              </Box>
            </Box>

            {/* Enquiry Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#D75A28",
                "&:hover": { backgroundColor: "#b24b20" },
                textTransform: "none",
                mb: 4,
              }}
              onClick={formik.handleSubmit}
            >
              ENQUIRY
            </Button>

            {/* Hidden Form */}
            <form onSubmit={formik.handleSubmit} style={{ display: "none" }}>
              <TextField
                name="enquiry"
                value={formik.values.enquiry}
                onChange={formik.handleChange}
                error={formik.touched.enquiry && Boolean(formik.errors.enquiry)}
                helperText={formik.touched.enquiry && formik.errors.enquiry}
              />
            </form>

            {/* Services Offered */}
            <Typography variant="h6" fontWeight={600} mb={2}>
              Services offered
            </Typography>

            {[1, 2].map((s, idx) => (
              <Card
                key={idx}
                variant="outlined"
                sx={{
                  borderColor: "#FCD7B0",
                  boxShadow: "none",
                  borderRadius: "12px",
                  mb: 3,
                }}
              >
                <CardContent>
                  <Typography fontWeight="bold" fontSize="15px" mb={1}>
                    {idx === 0
                      ? "Griha Pravesh (Housewarming Pooja)"
                      : "Pooja Name"}
                  </Typography>
                  <Typography fontSize="13px" mb={1}>
                    Auspicious pooja to purify and bless your new home with peace,
                    prosperity, and positive energy.
                  </Typography>
                  <Typography fontWeight={500} fontSize="14px" mb={1}>
                    {idx === 0 ? "₹11,000 INR" : "₹ N/A"}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      backgroundColor: "#D75A28",
                      "&:hover": { backgroundColor: "#b24b20" },
                      fontSize: "12px",
                      textTransform: "none",
                    }}
                  >
                    REQUEST SERVICE
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Right Side (Calendar and Events) */}
          <Grid item xs={12} lg={4}>
            <Grid container direction="column" spacing={3}>
              {/* Calendar */}
              <Grid item>
  <Paper
    elevation={0}
    className="border border-gray-300 rounded-xl p-4 w-full overflow-x-auto"
  >
    <div className="react-calendar w-full">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({ date, view }) => {
          if (view === "month" && date.getDate() === Number(selectedDay)) {
            return "bg-[#F8BF4C] text-black font-semibold rounded-full";
          }
          return "rounded-full hover:bg-orange-100";
        }}
        next2Label={null}
        prev2Label={null}
        navigationLabel={({ date }) =>
          moment(date).format("MMMM YYYY")
        }
        className="text-sm"
      />
    </div>
  </Paper>
</Grid>


              {/* Events */}
              <Grid item>
                <Typography fontWeight={600} mb={2}>
                  Upcoming Events
                </Typography>
                <Box sx={{ fontSize: "14px" }}>
                  {[{ date: "20 Jan", name: "Festival Name" }, { date: "29 Jan", name: "Festival Name" }].map(
                    (event, i) => (
                      <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
                        <Box
                          sx={{
                            backgroundColor: "#F8BF4C",
                            color: "black",
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: "12px",
                          }}
                        >
                          {event.date}
                        </Box>
                        <Typography fontSize="14px">{event.name}</Typography>
                      </Box>
                    )
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

    </div>
  );
};

export default PoojariProfile;
