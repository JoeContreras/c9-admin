/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// import womanImg from "../../assets/img/theme/profile-cover.jpg";
// import womanImg from "../../assets/img/theme/profile-cover.jpg";
import handShake from "../../assets/img/theme/handShake.webp";
import team1 from "../../assets/img/theme/team.webp";
import macs from "../../assets/img/theme/macsCS.jpg";
import help from "../../assets/img/theme/helpcs.webp";
// import handShake from "../../assets/img/theme/handShake.webp";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledCarousel } from "reactstrap";

const items = [
  {
    src: team1,
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: handShake,
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: macs,
    altText: "",
    caption: "",
    header: "",
  },
  {
    src: help,
    altText: "",
    caption: "",
    header: "",
  },
];

const UserHeader = (props) => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/city.jpg").default + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div
          style={{
            // minHeight: "600px",
            width: "100%",
            // position: "absolute",
          }}
        >
          <UncontrolledCarousel items={items} />
        </div>

        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hola {props.personName}</h1>
              <p className="text-white mt-0 mb-5">
                Este es tu Perfil. En esta seccion puedes administrar los
                detalles de tu perfil. Si eres tienes permisos de administrador,
                podras gestionar las cuentas de los demas usuarios.
              </p>
              <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Editar Perfil
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
