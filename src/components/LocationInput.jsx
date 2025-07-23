import React, { useRef, useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { MapPin } from "lucide-react";
import useUserLocation from "../hooks/useUserLocation";

const LocationInput = ({ values, setFieldValue }) => {
  const editableRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

    const { error, getLocation, googleMapsLink } = useUserLocation();

  useEffect(() => {
    getLocation();
    setTimeout(() => {
      if (googleMapsLink) {
        setFieldValue("location", googleMapsLink);
      }
    }, 0);
  }, [googleMapsLink]);

  const handleBlur = () => {
    const text = editableRef.current?.textContent.trim();
    if (text && text !== values.location) {
      setFieldValue("location", text);
    }
    setIsEditing(false);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("Text").trim();
    if (pastedText && pastedText.startsWith("http")) {
      setFieldValue("location", pastedText);
    }
  };

  const handleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      editableRef.current?.focus();
    }, 0);
  };

  return (
    <Grid item xs={12} md={4}>
      <div className="flex flex-col w-full">
        <label className="text-sm text-gray-700 mb-1">Location</label>

        <Box
          onClick={handleClick}
          sx={{
            px: 2,
            py: 1.5,
            minHeight: "48px",
            borderRadius: "6px",
            backgroundColor: "#F1F5F9",
            border: "1px solid #1976d2",
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "text",
            wordBreak: "break-word",
          }}
        >
          <MapPin size={16} className="text-blue-700" />

          {isEditing || !values.location ? (
            <div
              ref={editableRef}
              contentEditable
              suppressContentEditableWarning
              onBlur={handleBlur}
              onPaste={handlePaste}
              style={{
                outline: "none",
                fontSize: "13px",
                color: "#374151",
                flex: 1,
              }}
            >
              {values.location || "Paste Google Maps URL here"}
            </div>
          ) : (
            <a
              href={values.location}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "underline",
                color: "#1976d2",
                fontSize: "13px",
                flex: 1,
              }}
            >
              {values.location}
            </a>
          )}
        </Box>

        <Typography variant="caption" sx={{ color: "gray", mt: 1 }}>
          Please copy paste the location here
        </Typography>
      </div>
    </Grid>
  );
};

export default LocationInput;

