import React from "react";
import image from "../../assets/img/LOGOBIG.png";
import { Card } from "antd";

export default function Error404() {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Card>
          {/* <CardActionArea> */}
          <div>
            <img src={image} />
          </div>
          <Card>
            <h4 variant="h2" align="center" color="primary">
              404 - Page Not Found!
            </h4>
          </Card>
          {/* </CardActionArea> */}
        </Card>
      </div>
    </Card>
  );
}
