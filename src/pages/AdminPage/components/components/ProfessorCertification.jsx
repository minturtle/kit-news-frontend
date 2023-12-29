import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./styles/ProfessorCertification.css";

const ProfessorCertification = ({show,hide,userName,job,company,education,uid}) => {
    return (
        <Modal show={show} onHide={hide}>
          <Modal.Header>
            <Modal.Title>전문가 이력서</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="IdSearchModalDiv">
              <div id="nameAndTel">
                <div>
                  <label>이름</label>
                  <p>{userName}</p>
                </div>
                <div>
                  <label>소속</label>
                  <p>{company}</p>
                </div>
              </div>
              <div id="inputNumber">
                <div>
                  <label>직급</label>
                  <p>{job}</p>
                </div>
              </div>
              <div id="photoZone">
                <img src={process.env.PUBLIC_URL + '/assets/dummyProfile.png'} alt="dummyProfile" />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn_close" variant="secondary" onClick={hide}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      );
};

export default ProfessorCertification;