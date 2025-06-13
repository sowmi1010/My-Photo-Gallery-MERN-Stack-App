import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import UploadForm from "../components/UploadForm";
import Gallery from "../components/Gallery";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [view, setView] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:5000/api/photos")
      .then(res => setPhotos(res.data))
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/photo/${id}`);
    setPhotos(photos.filter(p => p._id !== id));
  };

  const handleFavorite = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/photo/favorite/${id}`);
    setPhotos(photos.map(p => p._id === id ? res.data : p));
  };

  const filtered = view === "favorites" ? photos.filter(p => p.favorite) : photos;

  return (
    <div>
      <Navbar setView={setView} />
      {view === "upload" && <UploadForm onUpload={(newPhotos) => setPhotos(prev => [...newPhotos, ...prev])} />}
      <Gallery photos={filtered} onDelete={handleDelete} onToggleFavorite={handleFavorite} />
    </div>
  );
};

export default Home;