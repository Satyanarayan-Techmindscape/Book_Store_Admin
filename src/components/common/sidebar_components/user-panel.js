import React from "react";
import man from "../../../assets/images/dashboard/Weet_Logo  250px.png";

const UserPanel = () => {
  return (
    <div>
      <div className="sidebar-user text-center">
        <div>
          <img
            className="img-60 rounded-circle lazyloaded blur-up"
            src={man}
            alt="#"
          />
        </div>
        <h6 className="mt-3 f-14">Prajna Books</h6>
        {/* <p>general manager.</p> */}
      </div>
    </div>
  );
};

export default UserPanel;
