import {
  useAxiosGet,
  useAxiosPost,
  useAxiosPut,
} from "../../../core/hooks/useAxios";

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

export const useAddMember = () => {
  const [callApi, { isLoading }] = useAxiosPost();
  const addMember = async (data, config = {}) => {
    return callApi(`/add-member`, data, config);
  };
  return { addMember, isLoading };
};

export const useEditMember = () => {
  const [callApi, { isLoading }] = useAxiosPut();
  const editMember = async (memberId, data, config = {}) => {
    return callApi(`/edit-member/${memberId}`, data, config);
  };
  return { editMember, isLoading };
};

export const useGetMember = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const getMember = async (memberId, config = {}) => {
    return callApi(`/members/${memberId}`, config);
  };
  return { getMember, isLoading };
};
