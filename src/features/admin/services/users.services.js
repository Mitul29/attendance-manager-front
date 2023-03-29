import { useAxiosGet, useAxiosPost } from "../../../core/hooks/useAxios";

export const useGetUsers = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const getUsers = async (config = {}) => {
    return callApi(`/users`, { params: config });
  };
  return { getUsers, isLoading };
};

export const useChangePassword = () => {
  const [callApi, { isLoading }] = useAxiosPost();
  const changePassword = async (userId, data, config = {}) => {
    return callApi(`/change-password/${userId}`, data, config);
  };
  return { changePassword, isLoading };
};
