import { useSelector } from "../../hooks";
import { getCategories } from "./categories.selectors";

export const useCategory = (id: string) => {
    const categories = useSelector(getCategories);
    return categories.find((cat) => cat.id === id);
}