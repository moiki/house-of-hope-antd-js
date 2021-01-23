import { List } from "antd";
import AlertMessage from "./Alert";

export const GraphError = (e) =>
  AlertMessage(
    "Error",
    <List
      dataSource={
        e.graphQLErrors.length > 0
          ? e.graphQLErrors.map((v, i) => v.message)
          : [e.message]
      }
      renderItem={(item) => (
        <List.Item style={{ marginLeft: 0 }}>{item}</List.Item>
      )}
    />,
    "error"
  );
