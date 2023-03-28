import { useAxiosGet, useAxiosPost } from "../../../core/hooks/useAxios";

const AUTH_API_BASE_PATH = "/auth";

export const useLogin = () => {
  const [callApi, { isLoading }] = useAxiosPost();
  const login = async (data, config = {}) => {
    return callApi(`${AUTH_API_BASE_PATH}/login`, data, config);
  };
  return { login, isLoading };
};

export const useLoadUser = () => {
  const [callApi, { isLoading }] = useAxiosGet();
  const loadUser = async (config = {}) => {
    return callApi(`${AUTH_API_BASE_PATH}/logged-in`, config);
  };
  return { loadUser, isLoading };
};
