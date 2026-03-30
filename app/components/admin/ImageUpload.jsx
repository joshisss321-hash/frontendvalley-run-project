'use client';

import { useState } from 'react';
import { adminAPI } from '@/lib/api';

export default function ImageUpload({ onUpload, label = 'Upload Image', currentImage = null }) {
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to cloudinary
    setUploading(true);
    try {
      const result = await adminAPI.uploadImage(file);
      if (result.success) {
        onUpload(result.url);
      } else {
        alert('Upload failed');
        setPreview(currentImage);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
      setPreview(currentImage);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload('');
  };

  return (
    <div className="image-upload">
      <label className="upload-label">{label}</label>
      
      {preview ? (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="preview-image" />
          <button 
            type="button" 
            onClick={handleRemove} 
            className="remove-btn"
            disabled={uploading}
          >
            ✕ Remove
          </button>
        </div>
      ) : (
        <label className="upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            style={{ display: 'none' }}
          />
          <div className="upload-content">
            <span className="upload-icon">📸</span>
            <p>{uploading ? 'Uploading...' : 'Click to upload'}</p>
          </div>
        </label>
      )}

      <style jsx>{`
        .image-upload {
          margin-bottom: 20px;
        }

        .upload-label {
          display: block;
          color: #888;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .upload-box {
          display: block;
          border: 2px dashed #333;
          border-radius: 12px;
          padding: 40px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #1a1a1a;
        }

        .upload-box:hover {
          border-color: #00ff88;
          background: rgba(0, 255, 136, 0.05);
        }

        .upload-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .upload-icon {
          font-size: 48px;
        }

        .upload-content p {
          color: #888;
          margin: 0;
        }

        .preview-container {
          position: relative;
          display: inline-block;
        }

        .preview-image {
          max-width: 100%;
          max-height: 300px;
          border-radius: 12px;
          border: 2px solid #333;
        }

        .remove-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .remove-btn:hover {
          background: #ff2222;
          transform: scale(1.05);
        }

        .remove-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}