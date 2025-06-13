import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadForm from "./components/UploadForm";
import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";

function App() {
  const [photos, setPhotos] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // 'all' or 'favorites'

  const fetchPhotos = () => {
    axios.get("http://localhost:5000/api/photos").then((res) => setPhotos(res.data));
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/photo/${id}`);
    fetchPhotos();
  };

  const handleFavorite = async (id) => {
    await axios.put(`http://localhost:5000/api/photo/favorite/${id}`);
    fetchPhotos();
  };

  const filteredPhotos =
    activeTab === "all" ? photos : photos.filter((p) => p.favorite);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6 text--700">My Photo Gallery</h1>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <UploadForm onUpload={fetchPhotos} />
      <Gallery
        photos={filteredPhotos}
        onDelete={handleDelete}
        onFavorite={handleFavorite}
      />
    </div>
  );
}

export default App;
