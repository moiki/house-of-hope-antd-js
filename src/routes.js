import { SettingOutlined } from "@ant-design/icons";
import React from "react";
import { AiOutlineHome, AiOutlineMedicineBox } from "react-icons/ai";
import { FiMap } from "react-icons/fi";
import { RiHospitalLine } from "react-icons/ri";

const routes = [
  {
    title: "Home",
    path: "home",
    icon: <AiOutlineHome className="anticon" />,
    layout: "admin",
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
    show: false,
  },
  {
    title: "Work Routes",
    path: "work-routes",
    icon: <FiMap className="anticon" />,
    layout: "admin",
    children: [
      {
        title: "Review",
        path: "routes/review",
        icon: "visibility",
        layout: "admin",
        allowedRoles: [
          "Root",
          "Administrator",
          "Local Member",
          "Support Doctor",
          "Sponsor",
        ],
      },
      {
        title: "Calendar",
        path: "routes/calendar",
        icon: "calendar_today",
        layout: "admin",
        allowedRoles: [
          "Root",
          "Administrator",
          "Local Member",
          "Support Doctor",
          "Sponsor",
        ],
      },
      {
        title: "Routes Manager",
        path: "routes/manage",
        icon: "build",
        layout: "admin",
        allowedRoles: ["Root", "Administrator"],
      },
    ],
    show: true,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
  },
  {
    title: "Pacients",
    path: "",
    icon: <AiOutlineMedicineBox className="anticon" />,
    layout: "admin",
    children: [
      {
        title: "Review",
        path: "pacients/review",
        icon: "visibility",
        layout: "admin",
        allowedRoles: [
          "Root",
          "Administrator",
          "Local Member",
          "Support Doctor",
          "Sponsor",
        ],
      },
      {
        title: "Pacients Manager",
        path: "pacients/manage",
        icon: "build",
        layout: "admin",
        allowedRoles: ["Root", "Administrator", "Local Member"],
      },
    ],
    show: true,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
  },
  {
    title: "Clinics",
    path: "",
    icon: <RiHospitalLine className="anticon" />,
    layout: "admin",
    children: [
      {
        title: "Review",
        path: "clinics/review",
        icon: "visibility",
        layout: "admin",
        allowedRoles: [
          "Root",
          "Administrator",
          "Local Member",
          "Support Doctor",
          "Sponsor",
        ],
      },
      {
        title: "Clinics Manager",
        path: "clinics/manage",
        icon: "build",
        layout: "admin",
        allowedRoles: ["Root", "Administrator"],
      },
    ],
    show: true,
    allowedRoles: [
      "Root",
      "Administrator",
      "Local Member",
      "Support Doctor",
      "Sponsor",
    ],
  },

  {
    title: "Login",
    path: "login",
    icon: "",
    layout: "auth",
    children: null,
    show: false,
  },

  {
    title: "Management",
    path: "management",
    icon: <SettingOutlined />,
    layout: "admin",
    children: null,
    show: true,
    allowedRoles: ["Root"],
  },
];

export default routes;
