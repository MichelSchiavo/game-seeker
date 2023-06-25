import { toast } from "react-toastify";
import { API } from "./api";
import { Game } from "@/types/game";

export async function GetGamesList() {
  const response: any = await API();

  if (
    response.status === 500 ||
    response.status === 502 ||
    response.status === 503 ||
    response.status === 504 ||
    response.status === 507 ||
    response.status === 508 ||
    response.status === 509
  ) {
    toast.error("O servidor falhou em responder, tente recarregar a página", {
      autoClose: 10000,
    });

    return [];
  } else if (response.status >= 500) {
    toast.error(
      "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde",
      {
        autoClose: 10000,
      }
    );
    return [];
  }

  const data: Game[] = await response.json();

  return data;
}
