import React, { useState, useEffect, useContext } from "react";
import { Table, Tag, Space, Button, Popconfirm } from "antd";
import moment from "moment";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { invitationsGQL } from "graphql/queries/userQueries";
import {
  deleteInvitationGQL,
  resendInvitationGQL,
} from "graphql/mutations/userMutation";
import { useScreenObserverHook } from "utils/ScreenObserverHook";
import AlertMessage from "components/MyAlert/Alert";
import { DeleteOutlined, EditOutlined, MailOutlined } from "@ant-design/icons";
import randomIdForRow from "utils/TableKeygen";
import InvitationCU from "./InvitationCU";
import { isExpired } from "react-jwt";
import { GraphError } from "components/MyAlert/GraphQlError";

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
            url_token: "", // isExpired(v.url_token),
          };
        });
        setLocalData(result);
      },
      onError: (e) => {
        GraphError(e);
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

  const [executeResend, { loadingResend, error: resError }] = useMutation(
    resendInvitationGQL,
    {
      onCompleted: (e) => {
        console.log({ e });
        refetchInvitation();
        AlertMessage(
          "Completed!",
          <span>Invitation is active again!</span>,
          "success"
        );
      },
      onError: (e) => {
        // console.log({ e });
        GraphError(e);
      },
    }
  );
  const handleDelete = (e) => {
    if (e) {
      executeDelete({
        variables: {
          id: e,
        },
      });
    }
  };

  const handleResend = (e) =>
    e ? executeResend({ variables: { id: e } }) : null;

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
        <Tag color={text === "EXPIRED" ? "magenta" : "green"}>{text}</Tag>
      ),
    },
    // {
    //   title: "Token State",
    //   dataIndex: "url_token",
    //   key: "url_token",
    //   render: (text) => (
    //     <Tag color={text === true ? "magenta" : "green"}>
    //       {text === true ? "Expired" : "Active"}
    //     </Tag>
    //   ),
    // },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            placement="top"
            title={"Are you sure to enable this invitation?"}
            onConfirm={() => handleResend(text)}
            okText="Yes"
            cancelText="No"
            disabled={record.answered === "ACCEPTED" ? true : false}
          >
            <Button
              icon={<MailOutlined />}
              className={
                record.answered === "ACCEPTED" ? "default" : "ant-btn-info"
              }
              shape="round"
            >
              Resend Invitation
            </Button>
          </Popconfirm>
          <Popconfirm
            placement="top"
            title={"Are you sure to delete this invitation?"}
            onConfirm={() => handleDelete(text)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              className="ant-btn-danger"
              shape="round"
            >
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
        loading={loadingInvitation || loadingDelete || loadingResend}
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
