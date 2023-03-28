import { useDispatch } from "react-redux";
import { removeToast, setToast } from "../../redux/modules/toastSlice";

const useToast = () => {
  const dispatch = useDispatch();
  const setToastMessage = (data) => {
    const id = new Date().getTime();
    dispatch(setToast({ ...data, id }));
    setTimeout(() => dispatch(removeToast({ id })), 1500);
  };
  return { setToastMessage };
};

export default useToast;
