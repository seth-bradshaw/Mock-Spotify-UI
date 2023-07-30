import { changeModal } from "../../store/slices/ui/ui";
import { useDispatch } from "../../store/hooks";
import { ModalOptions } from "../../store/slices/ui/types";


const useToggleModal = () => {
    const dispatch = useDispatch();
    const closeModal = (modal: ModalOptions | null = null) => dispatch(changeModal(modal));

    return closeModal;
}

export default useToggleModal;