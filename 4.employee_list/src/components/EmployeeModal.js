import React from "react";
import { Image, Modal, Button } from "react-bootstrap";

const EmployeeModal = ({ employee, handleClose }) => {
  if (!employee) return null;
  return (
    <Modal show onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Employee information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <Image
                  className="img-thumbnail"
                  src={employee.avatar}
                  alt={employee.first_name}
                />
              </td>
              <td className="text-center align-middle">
                <i className="fa fa-user"></i> {employee.first_name}{" "}
                {employee.last_name}
                <br />
                <i className="fa fa-envelope"></i> {employee.email}
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} variant="danger">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeModal;
