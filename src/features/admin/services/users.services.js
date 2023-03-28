import { useAxiosGet } from "../../../core/hooks/useAxios";

export const useGetUsers = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const getUsers = async (config = {}) => {
    return callApi(`/users`, { params: config });
  };
  return { getUsers, isLoading };
};
