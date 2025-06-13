import React, { useState } from "react";
import Masonry from "react-masonry-css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon, TrashIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

function Gallery({ photos, onDelete, onFavorite }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const images = photos.map((photo) => `http://localhost:5000${photo.path}`);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="bg-clip-padding"
      >
        {photos.map((photo, index) => (
          <div key={photo._id} className="relative mb-4 group">
            <img
              src={`http://localhost:5000${photo.path}`}
              alt="Uploaded"
              className="rounded-lg w-full object-cover shadow-lg cursor-pointer"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            />

            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              {/* Favorite Toggle */}
              <button
                onClick={() => onFavorite(photo._id)}
                className="bg-white p-1 rounded-full shadow"
                title="Favorite"
              >
                {photo.favorite ? (
                  <SolidHeartIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>

              {/* Download Button */}
              <a
                href={`http://localhost:5000${photo.path}`}
                download={`image-${photo._id}.jpg`}
                className="bg-white p-1 rounded-full shadow"
                title="Download"
              >
                <ArrowDownTrayIcon className="h-5 w-5 text-gray-600" />
              </a>

              {/* Delete */}
              <button
                onClick={() => onDelete(photo._id)}
                className="bg-white p-1 rounded-full shadow"
                title="Delete"
              >
                <TrashIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </Masonry>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </>
  );
}

export default Gallery;
