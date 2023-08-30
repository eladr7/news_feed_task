// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Item } from "../../components/definitions";
import { Collection, MongoClient } from "mongodb";

const mongoUri = "mongodb://localhost:27017/news_db";
const dbName = "news_db";
interface Data {
  items?: Item[];
  message?: string;
}
// Simulated user database
const users: { phoneNumber: string }[] = [];
const initialItems = [
  {
    title: "Check this out",
    text: "Our new hamburger is ready!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/500px-Hamburger_%28black_bg%29.jpg",
    link: {
      linkText: "Order Now!",
      linkPath: "/order",
    },
  },
  {
    title: "Did someone say VEGAN?",
    text: "We also have a vegan Option, just check out our vegan options!",
    image:
      "https://images.everydayhealth.com/images/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg?w=1110",
    link: {
      linkText: "I'm Vegan",
      linkPath: "/order",
    },
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      const formData = req.body;

      try {
        const client = await MongoClient.connect(mongoUri, {});

        const db = client.db(dbName);
        const collection: Collection = db.collection("news");

        const result = await collection.insertOne(formData);

        client.close();

        res.status(201).json({ message: "Form data saved successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
      break;

    case "GET":
      try {
        const client = await MongoClient.connect(mongoUri, {});

        const db = client.db(dbName);
        const collection: Collection = db.collection("news");

        const retrievedItems = await collection.find().toArray();

        client.close();

        // Map the retrieved data to your Item type
        const mappedItems = retrievedItems.map((item) => ({
          title: item.title,
          text: item.text,
          image: item.image,
          link: {
            linkText: item.linkText,
            linkPath: item.linkPath,
          },
        }));

        res.status(200).json({ items: initialItems });
        // res.status(200).json({ items: mappedItems });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
      // res.status(200).json({ items });
      res.status(200).json({ items: initialItems });
      return;

    case "POST":
      // Handle user signup
      const { phoneNumber } = req.body;

      if (!phoneNumber || typeof phoneNumber !== "string") {
        return res.status(400).json({ message: "Invalid phone number" });
      }

      // Check if the phone number exists in the database (simulated)
      const user = users.find((user) => user.phoneNumber === phoneNumber);

      if (user) {
        return res.status(200).json({ message: "User logged in successfully" });
      } else {
        // If the user doesn't exist, add them to the database (simulated)
        users.push({ phoneNumber });
        return res
          .status(201)
          .json({ message: "User registered successfully" });
      }
      break;

    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}
