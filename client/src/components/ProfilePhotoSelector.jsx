// IMPORTS
// React hooks
import { useRef, useState } from "react";
// React icons
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the image file in the parent component

      const preview = URL.createObjectURL(file); // Create a preview URL for the image
      setPreview(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null); // Remove the image file in the parent component
    setPreview(null); // Clear the preview URL
  };

  const onChooseImage = () => {
    inputRef.current.click();
  };
  return (
    <div className="flex justify-start mt-2">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-tertiary border-gray-200 border-1 rounded-full relative">
          <LuUser className="text-4xl text-black" />

          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-secondary text-white rounded-full absolute -bottom-1 -right-2 cursor-pointer hover:bg-primary transition duration-200"
            onClick={onChooseImage}
            title="Choose image"
            aria-label="Choose image"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-300 text-white rounded-full absolute -bottom-1 -right-2 cursor-pointer hover:bg-red-400 transition duration-200"
            onClick={handleRemoveImage}
            title="Remove image"
            aria-label="Remove image"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
