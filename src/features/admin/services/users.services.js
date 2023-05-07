import {
  useAxiosDelete,
  useAxiosGet,
  useAxiosPost,
  useAxiosPut,
} from "../../../core/hooks/useAxios";

export const useGetUsers = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const getUsers = async (config = {}) => {
    return callApi(`/users`, { params: config });
  };
  return { getUsers, isLoading };
};

export const useGetAssignedMembersAttendance = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const getAssignedMembersAttendance = async (config = {}) => {
    return callApi(`/assigned-members-attendance`, { params: config });
  };
  return { getAssignedMembersAttendance, isLoading };
};

export const useGetLeadersWithMembers = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const getLeaders = async (config = {}) => {
    return callApi(`/users/leaders`, { params: config });
  };
  return { getLeaders, isLoading };
};

export const useGetLeaderWithMembers = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const getLeader = async (leaderId, config = {}) => {
    return callApi(`/users/leaders/${leaderId}`, { params: config });
  };
  return { getLeader, isLoading };
};

export const useGetAssignedMembers = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const getAssignedMembers = async (leaderId, config = {}) => {
    return callApi(`/users/leaders/${leaderId}/child`, { params: config });
  };
  return { getAssignedMembers, isLoading };
};

export const useMakeAsLeader = () => {
  const [callApi, { isLoading }] = useAxiosPost();
  const makeLeader = async (leaderId, data, config = {}) => {
    return callApi(`/users/${leaderId}/add-leader`, data, config);
  };
  return { makeLeader, isLoading };
};

export const useRemoveLeader = () => {
  const [callApi, { isLoading }] = useAxiosDelete();
  const removeLeader = async (leaderId, config = {}) => {
    return callApi(`/users/${leaderId}/remove-leader`, config);
  };
  return { removeLeader, isLoading };
};

export const useChangePassword = () => {
  const [callApi, { isLoading }] = useAxiosPut();
  const changePassword = async (leaderId, data, config = {}) => {
    return callApi(`/users/${leaderId}/update-leader`, data, config);
  };
  return { changePassword, isLoading };
};
