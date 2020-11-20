import { Row } from "antd";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "../../assets/css/auth.css";
import Login from "../../views/auth/Login";

export default function AuthLayout(props) {
  return (
    <div>
      <div
        className="page-header"
        style={{
          backgroundImage:
            "url('https://hopecrucitas.com/wp-content/uploads/2019/06/water1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <Row>
          <section>
            <div style={{ justifyContent: "center", display: "flex" }}>
              <Switch>
                <Route
                  path="/auth/login"
                  render={(props) => <Login {...props} />}
                />
                {/* <Route path="auth/signin" render=/> */}
              </Switch>
            </div>
          </section>
        </Row>
      </div>
    </div>
  );
}
