import { useEffect, useState } from "react";
import axios from "axios";
import { connections, endpoints } from "../config/connections";
const BrickUtils = (amount) => {
  const [listOfBricks, setListOfBricks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //fetches 3 random brick products
  useEffect(() => {
    const fetchBrickProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${connections.server}${endpoints.brickproducts}`
        );
        const shuffledBrickProducts = shuffle(response.data);
        const selectedBrickProducts = shuffledBrickProducts.slice(0, amount);

        setListOfBricks(selectedBrickProducts);

        // Log the updated state and its length
        console.log(selectedBrickProducts);
        console.log("Updated Length: " + selectedBrickProducts.length);
      } catch (error) {
        console.error(
          "Error fetching brick products: " +
            error.code +
            " " +
            error.message +
            " " +
            error.name
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrickProducts();
  }, []);

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex,
      tempValue;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }

    return array;
  };

  return { listOfBricks, isLoading };
};

export default BrickUtils;
