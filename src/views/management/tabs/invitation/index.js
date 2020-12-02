import React, { useState, useEffect, useContext } from "react";
import { Table, Tag, Space, Button, Popconfirm } from "antd";
import moment from "moment";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { invitationsGQL } from "graphql/queries/userQueries";
import { deleteInvitationGQL } from "graphql/mutations/userMutation";
import { useScreenObserverHook } from "utils/ScreenObserverHook";
import AlertMessage from "components/MyAlert/Alert";
import { DeleteOutlined, EditOutlined, MailOutlined } from "@ant-design/icons";
import randomIdForRow from "utils/TableKeygen";
import InvitationCU from "./InvitationCU";
import { isExpired } from "react-jwt";

export default function InvitationList(props) {
  const [idInvitation, setIdInvitation] = useState(null);
  const [openModalInvitation, setOpenModalInvitation] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { setRef, visible } = useScreenObserverHook();
  const [localData, setLocalData] = useState([]);

  const handleModalInvitation = () =>
    setOpenModalInvitation(!openModalInvitation);

  const [refetchInvitation, { loading: loadingInvitation }] = useLazyQuery(
    invitationsGQL,
    {
      onCompleted: (e) => {
        const res = e.invitations;
        const result = res.map((v) => {
          return {
            ...v,
            url_token: isExpired(v.url_token),
          };
        });
        setLocalData(result);
      },
      onError: (e) => {
        AlertMessage(
          "Error",
          <p>
            <ul>
              {e.graphQLErrors.length > 0 ? (
                e.graphQLErrors.map((v, i) => <li key={i}>{v.message}</li>)
              ) : (
                <p>{e.message}</p>
              )}
            </ul>
          </p>,
          "error"
        );
      },
    }
  );

  const [executeDelete, { loadingDelete }] = useMutation(deleteInvitationGQL, {
    onCompleted: () => {
      refetchInvitation();
      AlertMessage("Completed!", <span>Invitation Deleted!</span>, "success");
    },
    onError: (e) => {
      console.log(e);
      AlertMessage("Error", <span>Error During Process!</span>, "error");
    },
  });

  const handleDelete = (e) => {
    if (e) {
      executeDelete({
        variables: {
          id: e,
        },
      });
    }
  };

  const handleClickClose = () => {
    handleModalInvitation();
    if (idInvitation) {
      setIdInvitation(null);
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Invitation Date",
      dataIndex: "created_date",
      key: "created_date",
      render: (text) => <span>{moment(text).format("MMM Do, YYYY")}</span>,
    },
    {
      title: "Invitation State",
      dataIndex: "answered",
      key: "answered",
      render: (text) => (
        <Tag color={text === false ? "magenta" : "green"}>
          {text === false ? "Pending" : "Answered"}
        </Tag>
      ),
    },
    {
      title: "Token State",
      dataIndex: "url_token",
      key: "url_token",
      render: (text) => (
        <Tag color={text === true ? "magenta" : "green"}>
          {text === true ? "Expired" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Space size="middle">
          <Button type="ghost" icon={<EditOutlined />}>
            Edit
          </Button>
          <Popconfirm
            placement="top"
            title={"Are you sure to delete this Account?"}
            //    onConfirm={() => handleDelete(text)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //    const handleUpdate = (e) => {
  //      setIdInvitation(e);
  //      setOpenModalUser(true);
  //    };
  useEffect(() => {
    if (visible && !loaded) {
      setLoaded(true);
      refetchInvitation();
    }
  }, [visible]);
  return (
    <div ref={setRef}>
      <Button
        type="primary"
        shape="round"
        onClick={handleModalInvitation}
        icon={<MailOutlined />}
      >
        Create New Invitation
      </Button>
      <Table
        pagination={{ position: ["bottomCenter"], pageSize: 6 }}
        columns={columns}
        loading={loadingInvitation || loadingDelete}
        dataSource={localData}
        rowKey={() => randomIdForRow()}
      />
      {openModalInvitation && (
        <InvitationCU
          refetchInvitation={refetchInvitation}
          openModal={openModalInvitation}
          handleCloseModal={handleModalInvitation}
        />
      )}
    </div>
  );
}
