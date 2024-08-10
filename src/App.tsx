import { useState, useEffect } from "react";
import { CustomerList } from "./components/CustomerList";
import { CustomerDetails } from "./components/CustomerDetails";
import { Customer } from "./types/customer";
import { randomCustomers } from "./assets/sampleData";
import { Photo } from "./types/image";
import axios from "axios";
import "./App.css";

export const App = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    randomCustomers[0]
  );

  const [photos, setPhotos] = useState<string[]>([]);
  const [blurred, setBlurred] = useState(false);

  const randomPage = () => Math.floor(Math.random() * 33) + 1;

  useEffect(() => {
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

    fetchPhotos();
    const interval = setInterval(() => {
      setBlurred(true);
      fetchPhotos();
      setTimeout(() => {
        setBlurred(false);
      }, 1500);
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedCustomer]);

  return (
    <div className="customer-portal">
      <CustomerList
        customers={randomCustomers}
        selectedCustomer={selectedCustomer}
        onSelectCustomer={setSelectedCustomer}
      />
      {selectedCustomer && (
        <CustomerDetails
          customer={selectedCustomer}
          photos={photos}
          isBlurred={blurred}
        />
      )}
    </div>
  );
};
