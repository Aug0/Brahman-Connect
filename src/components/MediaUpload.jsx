// src/components/MediaUpload.jsx
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const MediaUpload = ({ onFileSelect, defaultFile }) => {
  const [file, setFile] = useState(defaultFile || null);
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      onFileSelect && onFileSelect(droppedFile);
    } else {
      alert('Only JPG, PNG, and MP4 files are supported.');
    }
  };

  const handleBrowse = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      onFileSelect && onFileSelect(selectedFile);
    } else {
      alert('Only JPG, PNG, and MP4 files are supported.');
    }
  };

  const validateFile = (file) => {
    return ['image/jpeg', 'image/png', 'video/mp4'].includes(file?.type);
  };

  return (
    <div>
      <h3 className="text-gray-700 font-medium mb-4">Media</h3>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full sm:w-[60%] md:w-[30%] border-2 ${
          dragActive
            ? 'border-orange-500 bg-orange-100'
            : 'border-dashed border-orange-300 bg-orange-50'
        } rounded-lg p-6 text-center relative`}
      >
        <Upload className="mx-auto text-orange-400 mb-2" />
        <p className="text-sm text-gray-600">
          Drag & drop files or{' '}
          <label
            htmlFor="fileUpload"
            className="text-orange-600 font-medium cursor-pointer underline"
          >
            Browse
          </label>
        </p>
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={handleBrowse}
        />
        <p className="text-xs text-gray-400 mt-1">
          Supported formats: JPG, PNG, MP4
        </p>
        {file && (
          <div className="mt-2 text-sm text-gray-700">
            <strong>Selected:</strong> {file.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
