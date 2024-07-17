import { useEffect, useState } from "react";
import axios from "axios";
import { connections, endpoints } from "../config/connections";

const MachineUtils = (amount) => {
  const [listOfMachines, setListOfBricks] = useState([]);
  const [isLoadingMachines, setIsLoading] = useState(false);

  //fetches 3 random brick products
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${connections.server}${endpoints.machineproducts}`
        );

        const availableNow = response.data.filter(
          (machine) => !machine.comingSoon
        );
        const shuffledMachines = shuffle(availableNow);
        const selectedMachines = shuffledMachines.slice(0, amount);

        setListOfBricks(selectedMachines);

        // Log the updated state and its length
        console.log(selectedMachines);
        console.log("Updated Length: " + selectedMachines.length);
      } catch (error) {
        console.error(
          "Error fetching machines: " +
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

    fetchMachines();
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

  return { listOfMachines, isLoading: isLoadingMachines };
};

export default MachineUtils;
