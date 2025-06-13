# My-Photo-Gallery-MERN-Stack-App
A Google Photos-style full-stack application to upload, view, favorite, delete, and download images. Built with **MongoDB, Express, React, Node.js**, and styled using **Tailwind CSS**.
## Features

- Upload single/multiple images
- Mark/unmark images as favorite
- Responsive Masonry Grid (like Google Photos)
- Lightbox modal preview
- Delete images
- Download images (to local storage)
- Tabs for All Photos / Favorites
- REST API using Express + MongoDB

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Multer
- **Database:** MongoDB + Mongoose
- **File Uploads:** Local storage via Multer (can extend to Cloudinary/S3)
- **UI Components:** react-masonry-css, react-image-lightbox, @heroicons/react

Backend Setup (Server)
cd server
npm install
npm install express mongoose multer cors
node server.js

Frontend Setup (client)
cd client
npm install
npm install axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# Additional UI packages
npm install react-masonry-css
npm install react-image-lightbox --legacy-peer-deps
npm install @heroicons/react --force
npm run dev


Author
Developed by: Sowmiya Thangadurai
GitHub: https://github.com/sowmi1010
Email: tamilsowmi1010@gmail.com

![full gallery](https://github.com/user-attachments/assets/87f1aaf4-06f3-464a-bde3-7ff0b506daf8)
![image actions visible](https://github.com/user-attachments/assets/9cfc3957-50b7-4679-a99c-90b87bbebd11)
![favorites tab](https://github.com/user-attachments/assets/563e4d44-f999-475e-a93a-b15930fa2b3d)


