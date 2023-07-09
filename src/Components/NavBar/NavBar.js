import React, { useState } from "react";
import css from "./NavBar.module.css";

import Modal from "react-bootstrap/Modal";
import AddData from "../AddData/AddData";
const NavBar = (props) => {
  const { changeChart, chartType, socket } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className={css.container}>
      <div className={css.navItem} onClick={handleShow}>
        Add Data
      </div>

      <select
        className={css.select}
        onChange={(e) => changeChart(e.target.value)}
        value={chartType}
      >
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
      </select>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddData socket={socket} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NavBar;
