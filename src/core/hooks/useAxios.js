import { useState } from "react";
import Axios from "../../axios";

export const useAxiosGet = () => {
  // ================= State ====================
  const [isLoading, setIsLoading] = useState(false);

  const getRequest = async (url, config = {}) => {
    try {
      setIsLoading(true);
      const response = await Axios.get(url, { ...config });
      setIsLoading(false);

      if (response?.meta?.error) {
        throw response?.meta?.error;
      }

      return { data: response.data };
    } catch (error) {
      setIsLoading(false);
      return {
        error: error?.message || error?.error || error,
        data: error?.data,
      };
    }
  };

  return [getRequest, { isLoading }];
};

export const useAxiosPost = () => {
  // ================= State ====================
  const [isLoading, setIsLoading] = useState(false);

  const postRequest = async (url, data, config = {}) => {
    try {
      setIsLoading(true);
      const response = await Axios.post(url, data, { ...config });
      setIsLoading(false);

      if (response?.meta?.error) {
        throw response?.meta?.error;
      }

      return { data: response.data };
    } catch (error) {
      setIsLoading(false);

      return {
        error: error?.message || error?.error || error,
        data: error?.data,
      };
    }
  };

  return [postRequest, { isLoading }];
};

export const useAxiosPut = () => {
  // ================= State ====================
  const [isLoading, setIsLoading] = useState(false);

  const putRequest = async (url, data, config = {}) => {
    try {
      setIsLoading(true);
      const response = await Axios.put(url, data, { ...config });
      setIsLoading(false);

      if (response?.meta?.error) {
        throw response?.meta?.error;
      }

      return { data: response.data };
    } catch (error) {
      setIsLoading(false);

      return {
        error: error?.message || error?.error || error,
        data: error?.data,
      };
    }
  };

  return [putRequest, { isLoading }];
};

export const useAxiosPatch = () => {
  // ================= State ====================
  const [isLoading, setIsLoading] = useState(false);

  const putRequest = async (url, data, config = {}) => {
    try {
      setIsLoading(true);
      const response = await Axios.patch(url, data, { ...config });
      setIsLoading(false);

      if (response?.meta?.error) {
        throw response?.meta?.error;
      }

      return { data: response.data };
    } catch (error) {
      setIsLoading(false);
      return {
        error: error?.message || error?.error || error,
        data: error?.data,
      };
    }
  };

  return [putRequest, { isLoading }];
};

export const useAxiosDelete = () => {
  // ================= State ====================
  const [isLoading, setIsLoading] = useState(false);

  const deleteRequest = async (url, config = {}) => {
    try {
      setIsLoading(true);
      const response = await Axios.delete(url, { ...config });
      setIsLoading(false);

      if (response?.meta?.error) {
        throw response?.meta?.error;
      }

      return { data: response.data };
    } catch (error) {
      setIsLoading(false);
      return {
        error: error?.message || error?.error || error,
        data: error?.data,
      };
    }
  };

  return [deleteRequest, { isLoading }];
};
