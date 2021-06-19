import React, { useState } from "react";
import { List, Avatar, Space, Button } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LoadingWrapper from "components/loaders/LoadingWrapper";
import { NavLink, useHistory } from "react-router-dom";

const getPatientGQL = gql`
  {
    result: PatientsReview {
      id
      name
      clinic
    }
  }
`;

export default function PacientsView() {
  const hist = useHistory();
  const [patients, setPatiens] = useState([]);
  const { loading } = useQuery(getPatientGQL, {
    onCompleted: (data) => {
      setPatiens(
        data.result.map((value) => {
          return {
            id: value.id,
            title: value.name,
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            description: value.clinic,
            content:
              "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
          };
        })
      );
    },
  });
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div className="clinic-card-container">
      <LoadingWrapper loading={loading}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={patients}
          renderItem={(item) => (
            <List
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
                  src="https://png.pngtree.com/png-vector/20190802/ourlarge/pngtree-patient-user-injured-hospital-flat-color-icon-vector-icon-png-image_1645907.jpg"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={
                  <Button
                    type="primary"
                    shape="round"
                    onClick={() =>
                      hist.push({
                        pathname: "/admin/patients/details",
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
            </List>
          )}
        />
      </LoadingWrapper>
    </div>
  );
}
