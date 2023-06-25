import { toast } from "react-toastify";
import { GetGamesList } from "./get-games-list";

export const getGamesWithTimeout = async <T>() => {
  return new Promise<T>(async (resolve, reject) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      toast.error("O servidor demorou para responder, tente mais tarde", {
        autoClose: 10000,
      });

      reject(new Error("TimeoutError"));
    }, 5000);

    try {
      const data = await GetGamesList();
      clearTimeout(timeoutId);
      resolve(data as T);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });
};
