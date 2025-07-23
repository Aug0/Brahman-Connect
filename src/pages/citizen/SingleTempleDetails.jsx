import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
  Grid,
  Chip,
  Paper,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from 'moment';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const prasadamItems = [
  {
    title: "Regular Prasadam",
    price: "₹120.00INR",
    img: "public/assets/Regular Prasadam.jpg",
    available: true,
  },
  {
    title: "Ekadashi Special Prasadam",
    price: "₹220.00INR",
    img: "public/assets/Ekadashi Prasadam.jpg",
    available: true,
  },
  {
    title: "Ladoo (4pcs)",
    price: "₹140.00INR",
    img: "public/assets/Laddu.jpg",
    available: true,
  },
];

const SingleTempleDetail = () => {
  const [pincode, setPincode] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
 const [selectedDay,setDay]=useState(moment().format("D"))

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDay(moment(date).format("D"))
  };

  return (
    <Box sx={{bgcolor: "#FDF8EB", minHeight: "100vh"}}>
      {/* Topbar */}
      {/* <div className="sticky top-0 z-20">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          bgcolor={"bg-[#D75A28]"}
          isForHomePage={true}
        />
      </div> */}

      {/* Main */}
      <Box maxWidth="lg" mx="auto" px={{xs: 2, md: 4}} py={6}>
        <button
          onClick={() => window.history.back()}
          className="text-sm text-gray-500 mb-4 hover:underline"
        >
          ← Back
        </button>

        <Paper elevation={1} sx={{borderRadius: 3, p: {xs: 2, md: 4}}}>
          <Grid container spacing={4}>
            {/* Left Section */}
            <Grid item xs={12} md={8}>
              <Box
                display="flex"
                flexDirection={{xs: "column", sm: "row"}}
                justifyContent="space-between"
                alignItems={{xs: "flex-start", sm: "center"}}
                gap={1}
              >
                <Typography variant="h5" fontWeight="bold">
                  Golden Temple
                </Typography>
                <Chip
                  label="AMRITSAR, PUNJAB"
                  sx={{
                    bgcolor: "#F8BF4C",
                    fontWeight: "bold",
                    borderRadius: "4px",
                  }}
                />
              </Box>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                mt={1}
                mb={2}
                flexWrap="wrap"
              >
                <LocationOnIcon sx={{color: "#D75A28"}} />
                <Typography variant="body2" sx={{wordBreak: "break-word"}}>
                  <a
                    href="https://maps.app.goo.gl/PuakMeC4Dzr3SsWv6"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#1976d2",
                      textDecoration: "underline",
                    }}
                  >
                    https://maps.app.goo.gl/PuakMeC4Dzr3SsWv6
                  </a>
                </Typography>
              </Box>

              <Typography variant="body1" mb={2}>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium, let dolorum fuga.{" "}
                <strong style={{textDecoration: "underline"}}>Read more</strong>
              </Typography>

              <Box sx={{width: "100%", mb: 2}}>
                <img
                  src="/assets/GoldenTemple.jpg"
                  alt="Golden Temple"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Box>

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#D75A28",
                  fontWeight: "bold",
                  fontFamily: "inherit",
                  px: 3,
                  py: 1,
                  fontSize: "14px",
                  mb: 4,
                  "&:hover": {
                    bgcolor: "#D75A28",
                  },
                }}
              >
                ENQUIRY
              </Button>

              <Typography variant="h6" mb={1}>
                Prasadam
              </Typography>
              <Typography variant="body2" color="gray" mb={1}>
                Enter your Pin code to check Prasadam delivery availability
              </Typography>
              <TextField
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                placeholder="500065"
                size="small"
                fullWidth
                sx={{maxWidth: "200px", mb: 3}}
              />

              <Grid container spacing={2}>
                {prasadamItems.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        p: 1.5,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        gap: 2,
                        flexWrap: "wrap",
                        border: "1px solid #D75A28",
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        style={{
                          height: 60,
                          width: 60,
                          objectFit: "cover",
                          borderRadius: 8,
                          flexShrink: 0,
                        }}
                      />
                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                          wordBreak: "break-word",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Typography fontSize="13px">{item.title}</Typography>
                        <Typography
                          fontSize="13px"
                          fontWeight="bold"
                          color="#000"
                        >
                          {item.price}
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            bgcolor: "#D75A28",
                            fontSize: "11px",
                            mt: 0.5,
                            width: "fit-content",
                            "&:hover": {
                              bgcolor: "#D75A28",
                            },
                          }}
                        >
                          ORDER NOW
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Right Section - Calendar */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 3,
                  px: 2,
                  py: 2,
                  mb: 3,
                }}
              >
                <Typography fontWeight={600} mb={2}>
                  Choose a Date
                </Typography>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  tileClassName={({date, view}) => {
                    if (view === "month") {
                      const day = date.getDate();
                      if (day == selectedDay) {
                        return "highlight-date";
                      }
                    }
                    return null; 
                  }}
                />
              </Paper>

              {/* Upcoming Events */}
              <Typography fontWeight={600} mb={1}>
                Upcoming Events
              </Typography>
              <Box>
                {[{date: "20 Jan"}, {date: "29 Jan"}].map((event, i) => (
                  <Box display="flex" alignItems="center" mb={1} key={i}>
                    <Chip
                      label={event.date}
                      size="small"
                      sx={{bgcolor: "#F8BF4C", color: "black", mr: 1}}
                    />
                    <Typography fontSize="14px">Seva Name</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default SingleTempleDetail;
