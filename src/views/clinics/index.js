import React, { useState, useEffect } from "react";
import ClinicCard from "components/clinicCard";
import { List, Avatar, Space, Button } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import "assets/css/clinic.css";
import { useLazyQuery } from "@apollo/react-hooks";
import { clinicsReviewGQL } from "graphql/queries/clinicsQueries";
import AlertMessage from "components/MyAlert/Alert";
import { ScaleLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import { RiHospitalLine } from "react-icons/ri";

export default function ClinicsView() {
  const [clinicsState, setClinicsState] = useState([]);
  const hist = useHistory();
  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: "https://ant.design",
      title: `ant design part ${i}`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    });
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const [refetchClinic, { loading }] = useLazyQuery(clinicsReviewGQL, {
    onCompleted: (e) => {
      setClinicsState(
        e.result.map((value) => {
          return {
            id: value.id,
            href: "https://ant.design",
            title: value.name,
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            description: "Clinic of Bradley's House of Hope",
            content:
              "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
          };
        })
      );
    },
    onError: (e) => {
      AlertMessage(
        "Error",
        <div>
          <ul>
            {e.graphQLErrors.length > 0 ? (
              e.graphQLErrors.map((v, i) => <li key={i}>{v.message}</li>)
            ) : (
              <p>{e.message}</p>
            )}
          </ul>
        </div>,
        "error"
      );
    },
  });

  useEffect(() => {
    refetchClinic();
  }, []);
  return (
    <div className="clinic-card-container">
      {loading ? (
        <div style={{ marginTop: "30%", marginLeft: "30%" }}>
          <ScaleLoader loading color="#084954" />
        </div>
      ) : (
        <>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={clinicsState}
            footer={
              <div>
                <b>ant design</b> footer part
              </div>
            }
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={StarOutlined}
                    text="156"
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  avatar={
                    <RiHospitalLine
                      size={30}
                      className="cl-danger"
                      style={{ marginRight: 10 }}
                    />
                  }
                  title={
                    <Button
                      type="primary"
                      shape="round"
                      onClick={() =>
                        hist.push({
                          pathname: "/admin/clinics/details",
                          state: {
                            id: item.id,
                          },
                        })
                      }
                    >
                      {item.title}
                    </Button>
                  }
                  description={item.description}
                />
                {item.content}
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
}
