import Chance from "chance";
import { v4 as uuid } from "uuid";
import { Customer, Gender } from "../types/customer";

const chance = new Chance();

const randomCustomers: Customer[] = [];

const genders: Gender[] = ["male", "female"];
const randomInt = () => Math.floor(Math.random() * 2);
const maleTitles = ["Mr.", "Dr.", "Prof."];
const femaleTitles = ["Mrs.", "Ms.", "Dr.", "Prof."];

for (let i = 1; i <= 1000; i++) {
  const gender: Gender = genders[randomInt()];
  const customer: Customer = {
    id: uuid(),
    name: chance.name({ gender }),
    title:
      gender === "male"
        ? chance.pickone(maleTitles)
        : chance.pickone(femaleTitles),
    address: chance.address(),
    about: chance.paragraph({ sentences: 3 }),
  };

  randomCustomers.push(customer);
}

export { randomCustomers };
