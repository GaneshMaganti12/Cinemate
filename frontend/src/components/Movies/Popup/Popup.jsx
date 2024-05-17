import React from "react";
import ReactPlayer from "react-player";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Modal } from "@mui/material";
import "./Popup.css";

function Popup(props) {
  const { handleClose, open, selected, title } = props;
  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-container">
        <IoIosCloseCircleOutline className="close-icon" onClick={handleClose} />
        {title === "plot" ? (
          <div className="modal-plot-card">
            <h1>Full Plot</h1>
            <hr />
            <p>{selected}</p>
          </div>
        ) : (
          <div className="modal-card">
            {title === "photo" ? (
              <img src={selected} alt="/" />
            ) : (
              <div className="video-card">
                <ReactPlayer
                  controls={true}
                  height={"100%"}
                  width={"100%"}
                  url={selected}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default Popup;
