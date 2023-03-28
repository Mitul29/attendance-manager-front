import { useAxiosGet } from "../../../core/hooks/useAxios";

export const useGetMembers = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const getMembers = async (config = {}) => {
    return callApi(`/members`, { params: config });
  };
  return { getMembers, isLoading };
};

export const useGetUsersAssignedMembers = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const getAssignedMembers = async (userId, config = {}) => {
    return callApi(`/assigned-members/${userId}`, { params: config });
  };
  return { getAssignedMembers, isLoading };
};
