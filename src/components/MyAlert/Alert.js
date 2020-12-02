import { notification } from "antd";

const AlertMessage = (title, description, type) => {
  notification[type]({
    message: title ? title : "",
    description: description ? description : "",
  });
};
export default AlertMessage;
