import { useState } from "react";
import axios from "axios";
import { Photo } from "../types/image";

export const useGetPhotos = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const randomPage = () => Math.floor(Math.random() * 33) + 1;

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${randomPage()}&&limit=9`
      );
      const images = response.data.map((photo: Photo) => ({
        ...photo,
        download_url: `https://picsum.photos/id/${photo.id}/400/400`,
      }));
      const imageUrls = images.map((photo: Photo) => photo.download_url);
      setPhotos(imageUrls);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  return { fetchPhotos, photos };
};
