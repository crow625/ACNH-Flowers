import { useContext } from "react";
import DataContext from "contexts/DataContext";

export const useData = () => {
    const data = useContext(DataContext);
    return {
        flowers: data.flowers,
        genes: data.genes,
        seeds: data.seeds
    };
};