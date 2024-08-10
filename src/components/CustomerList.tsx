import { Customer } from "../types/customer";
import "./CustomerList.css";

interface CustomerListProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelectCustomer: (customer: Customer) => void;
}

export const CustomerList = ({
  customers,
  selectedCustomer,
  onSelectCustomer,
}: CustomerListProps) => {
  return (
    <div className="customer-list">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className={`customer-card ${
            selectedCustomer?.id === customer.id ? "selected" : ""
          }`}
          onClick={() => onSelectCustomer(customer)}
        >
          <div className="customer-name">
            {customer.title + " " + customer.name}
          </div>
          <div className="about">{customer.about}</div>
        </div>
      ))}
    </div>
  );
};
