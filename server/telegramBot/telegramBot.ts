import http from "request";
import dotenv from 'dotenv'
dotenv.config()

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
    `https://api.telegram.org/bot${process.env.token}/sendMessage?chat_id=${process.env.chatId}&parse_mode=html&text=${text}`,
    (error: any, response: any, body: any) => {
      if (response.statusCode === 200) {
        getLogs("ok", error, response, body);
      }
      if (response.statusCode !== 200) {
        getLogs("error", error, response, body);
      }
    }
  );
};
