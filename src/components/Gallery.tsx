import React, { useState, useEffect, useRef } from "react";

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedImages = JSON.parse(
      localStorage.getItem("galleryImages") || "[]"
    );
    setImages(storedImages);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("galleryImages", JSON.stringify(images));
    } catch (e) {
      if (e instanceof DOMException && e.name === "QuotaExceededError") {
        setError("Storage limit exceeded! Unable to add more images.");
      }
    }
  }, [images]);

  const handleAddImage = () => {
    setIsModalOpen(true);
  };

  const handleImageAdd = (image: string) => {
    if (images.length >= 5) {
      setError("You can only store up to 5 images due to storage limits.");
      return;
    }
    setImages((prevImages) => [...prevImages, image]);
    setError(null);
  };

  const handleSlideLeft = () => {
    const newIndex =
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    scrollToImage(newIndex);
  };

  const handleSlideRight = () => {
    const newIndex =
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    scrollToImage(newIndex);
  };

  const scrollToImage = (index: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const imageWidth = 150 + 20; // Image width + gap
      container.scrollTo({
        left: index * imageWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full md:w-[70%] lg:w-[50%] xl:w-[35%] bg-[#363c43] rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl text-gray-300 bg-[#000] px-8 py-2 rounded-2xl">
          Gallery
        </h1>
        <div className="flex items-center gap-5">
          <button
            className="addBtBtn flex items-center rounded-full px-4 py-2 bg-[#40464d] text-gray-200 gap-2"
            onClick={handleAddImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
            </svg>
            Add Image
          </button>
          <div className="flex justify-center gap-5">
            <button
              className="btn p-2 rounded-full bg-gray-500"
              onClick={handleSlideLeft}
            >
              {/* Arrow Left */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
              </svg>
            </button>
            <button
              className="btn p-2 rounded-full bg-gray-500"
              onClick={handleSlideRight}
            >
              {/* Arrow Right */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Image Row */}
      <div
        ref={containerRef}
        className="flex overflow-x-scroll gap-5 mb-4"
        style={{ scrollBehavior: "smooth" }}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="w-[150px] h-[150px] object-cover rounded-xl"
              style={{ flex: "0 0 auto" }}
            />
          ))
        ) : (
          <p className="text-gray-400">
            No images available. Add an image to start.
          </p>
        )}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <ImageUploadPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImageAdd={handleImageAdd}
      />
    </div>
  );
};

export default Gallery;

interface ImageUploadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onImageAdd: (image: string) => void;
}

const ImageUploadPopup: React.FC<ImageUploadPopupProps> = ({
  isOpen,
  onClose,
  onImageAdd,
}) => {
  const [imageURL, setImageURL] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"browse" | "url">("browse");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImageUrl = reader.result as string;
        onImageAdd(newImageUrl);
        onClose();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageURLSubmit = () => {
    if (imageURL) {
      onImageAdd(imageURL);
      setImageURL("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg relative w-[90%] md:w-[400px]">
        <h2 className="text-lg mb-4 text-center">Select Image</h2>
        <div className="flex mb-4">
          <button
            className={`flex-1 p-2 ${
              activeTab === "browse" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("browse")}
          >
            Browse
          </button>
          <button
            className={`flex-1 p-2 ${
              activeTab === "url" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("url")}
          >
            URL
          </button>
        </div>
        {activeTab === "browse" ? (
          <div className="flex justify-center items-center flex-col">
            <label htmlFor="file-upload" className="cursor-pointer mb-4">
              <div className="border border-dashed border-gray-400 p-4 text-center">
                Browse or drop image
              </div>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        ) : (
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="https://"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <button
              onClick={handleImageURLSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              OK
            </button>
          </div>
        )}
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};