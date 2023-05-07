import { toast } from "react-toastify";

const useToast = () => {
  const setToastMessage = (data) => toast(data.message, { type: data.type });
  return { setToastMessage };
};

export default useToast;

// import { useDispatch } from "react-redux";
// import { removeToast, setToast } from "../../redux/modules/toastSlice";

// const useToast = () => {
//   const dispatch = useDispatch();
//   const setToastMessage = (data) => {
//     const id = new Date().getTime();
//     dispatch(setToast({ ...data, id }));
//     setTimeout(() => dispatch(removeToast({ id })), 1500);
//   };
//   return { setToastMessage };
// };

// export default useToast;
