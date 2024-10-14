// src/app/components/ImageUpload.tsx
import React from "react";

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  imagePreview: string | null;
  error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, imagePreview, error }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-1">Upload Image</label>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
      {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover mb-2" />}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default ImageUpload;
