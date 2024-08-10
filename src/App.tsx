import { useState, useEffect } from "react";
import { CustomerList } from "./components/CustomerList";
import { CustomerDetails } from "./components/CustomerDetails";
import { Customer } from "./types/customer";
import { randomCustomers } from "./assets/sampleData";
import { useGetPhotos } from "./hooks/GetPhotos";
import "./App.css";

export const App = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    randomCustomers[0]
  );

  const [blurred, setBlurred] = useState(false);

  const { fetchPhotos, photos } = useGetPhotos();

  useEffect(() => {
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
