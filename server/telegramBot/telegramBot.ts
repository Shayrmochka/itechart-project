const http = require("request");
import { botConfig } from "./botConfig";

const logs: any = [];

const getLogs = (status: any, error: any, response: any, body: any) => {
  logs.push({
    status,
    error,
    statusCode: response && response.statusCode,
    body,
  });
};

export const useBot = (name: string, action: string) => {
  const text = `<b>Name:</b> ${name} \n<b>Action:</b> ${action}`;
  http.post(
    `https://api.telegram.org/bot${botConfig.token}/sendMessage?chat_id=${botConfig.chatId}&parse_mode=html&text=${text}`,
    (error: any, response: any, body: any) => {
      if (response.statusCode === 200) {
        console.log({ status: "ok", message: "Succes!" });
        getLogs("ok", error, response, body);
      }
      if (response.statusCode !== 200) {
        console.log({ status: "error", message: "Error!" });
        getLogs("error", error, response, body);
      }
    }
  );
};
