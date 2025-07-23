import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Slider,
  Button,
  Avatar,
  Grid,
  Paper,
  Badge,
  IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import LocationInput from "../../components/LocationInput";

const templeData = [
  {
    title: "Golden Temple",
    location: "Murali, Hyderabad",
    image: "/assets/GoldenTemple.jpg",
  },
  {
    title: "Temple Name",
    location: "Murali, Hyderabad",
    image: "/assets/BirlaTemple.jpg",
  },
  {
    title: "Temple Name",
    location: "Murali, Hyderabad",
    image: "/assets/JainTemple.jpg",
  },
];

const storeData = [
  {
    title: "Temple Name",
    location: "Murali, Hyderabad",
    image: "/assets/PoojaStore1.jpg",
  },
  {
    title: "Temple Name",
    location: "Murali, Hyderabad",
    image: "/assets/PoojaStore2.jpg",
  },
  {
    title: "Temple Name",
    location: "Murali, Hyderabad",
    image: "/assets/PoojaStore3.jpg",
  },
];

const NearbySearch = () => {
  const [radius, setRadius] = useState(25);

  const initialValues = {
    category: "Temples",
    location: "",
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
    location: Yup.string()
      .url("Must be a valid URL")
      .required("Location URL is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/api/search", {
        ...values,
        radius,
      });
      console.log("Search response:", response.data);
    } catch (error) {
      console.error("Error in search:", error);
    }
  };

  const renderCard = (item) => (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box p={2} flexGrow={1}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={0.5}
        >
          <Typography fontWeight={600} fontSize={{ xs: "14px", sm: "15px" }}>
            {item.title}
          </Typography>
          <Box
            sx={{
              bgcolor: "#D75A28",
              color: "white",
              fontSize: "11px",
              px: 1,
              py: 0.5,
              borderRadius: "4px",
            }}
          >
            {item.location}
          </Box>
        </Box>
        <Typography fontSize="13px" mt={1} color="gray">
          At vero eos et accusamus et iusto odio dignissimos ducimus.
          <span
            style={{
              color: "#1976d2",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            {" "}
            Read more
          </span>
        </Typography>
      </Box>
      <Box>
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "160px",
            objectFit: "cover",
          }}
        />
      </Box>
    </Paper>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8F4EA",
        pb: 10,
        overflowX: "hidden",
      }}
    >
      {/* Form */}
      <Box
        maxWidth="lg"
        mx="auto"
        mt={6}
        p={4}
        component={Paper}
        elevation={3}
        borderRadius={3}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <Typography variant="h6" gutterBottom>
                What are you looking for?
              </Typography>
              <Grid container spacing={3}>
                {/* Category Select */}
                <Grid item xs={12} md={3}>
                  <Typography fontSize="14px" fontWeight="bold" mb={1}>
                    Select
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                    >
                      <MenuItem value="Temples">Temples</MenuItem>
                      <MenuItem value="Pooja Stores">Pooja Stores</MenuItem>
                      <MenuItem value="Poojaris">Poojaris</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={9} />

                {/* Location Input */}
                <LocationInput
                  values={values}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />

                {/* Radius */}
                <Grid item xs={12} md={4}>
                  <Typography fontSize="14px" fontWeight="bold" mb={1}>
                    Set Radius
                  </Typography>
                  <Box display="flex" flexDirection="column" alignItems="stretch">
                    <Slider
                      value={radius}
                      onChange={(e, val) => setRadius(val)}
                      min={5}
                      max={50}
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => `${value} kms`}
                      sx={{
                        color: "#D75A28",
                        mb: 1,
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 4,
                  bgcolor: "#D75A28",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#c6521f" },
                }}
              >
                Search
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      {/* Results Section */}
      <Box maxWidth="lg" mx="auto" mt={8} px={2}>
        {/* Temples */}
        <Typography variant="h6" mb={3}>
          Near by Temples
        </Typography>
        <Grid container spacing={3}>
          {templeData.map((temple, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              {renderCard(temple)}
            </Grid>
          ))}
        </Grid>

        {/* Stores */}
        <Typography variant="h6" my={4}>
          Near by Pooja Stores
        </Typography>
        <Grid container spacing={3}>
          {storeData.map((store, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              {renderCard(store)}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default NearbySearch;
