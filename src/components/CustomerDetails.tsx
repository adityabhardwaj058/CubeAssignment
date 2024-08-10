import { Customer } from "../types/customer";
import "./CustomerDetails.css";

interface CustomerDetailsProps {
  customer: Customer;
  photos: string[];
  isBlurred: boolean;
}

export const CustomerDetails = ({
  customer,
  photos,
  isBlurred,
}: CustomerDetailsProps) => {
  return (
    <div className="customer-details-container">
      <div className="customer-details">
        <div className="info">
          <div className="name">{customer.title + " " + customer.name}</div>
          <p className="address">{customer.address}</p>
          <p className="about-details">{customer.about}</p>
        </div>
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <img
              className={isBlurred ? "blur" : ""}
              key={index}
              src={photo}
              alt={`Photo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
