import { useAxiosGet, useAxiosPost } from "../../../core/hooks/useAxios";

export const useGetAttendanceByLeaderId = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const getAttendanceByLeaderId = async (leaderId, config = {}) => {
    return callApi(`/attendance/${leaderId}`, { params: config });
  };
  return { getAttendanceByLeaderId, isLoading };
};

export const useGetAllAttendance = () => {
  const [callApi, { isLoading }] = useAxiosPost();
  const getAllAttendance = async (data, config = {}) => {
    return callApi(`/attendance/getAll`, data, { params: config });
  };
  return { getAllAttendance, isLoading };
};

export const useAddAttendance = () => {
  const [callApi, { isLoading }] = useAxiosPost();
  const addAttendance = async (data, config = {}) => {
    return callApi(`/attendance`, data, { params: config });
  };
  return { addAttendance, isLoading };
};
