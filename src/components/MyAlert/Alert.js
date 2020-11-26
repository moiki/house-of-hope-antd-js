import { notification } from "antd";

const Alert = (title, description, type) => {
  notification[type]({
    message: title ? title : "",
    description: description ? description : "",
  });
};
export default Alert;
