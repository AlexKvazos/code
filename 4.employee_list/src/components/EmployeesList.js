import React, { useState, useEffect, useMemo } from "react";
import { Image, Spinner, Button, Table } from "react-bootstrap";
import EmployeeModal from "./EmployeeModal";
import { useParams, useHistory } from "react-router-dom";

const EmployeesList = () => {
  const [error, setError] = useState(null);
  const [employeesList, setEmployeesList] = useState([]);

  const history = useHistory();
  const { employeeID } = useParams();
  const singleEmployee = useMemo(
    () =>
      employeeID
        ? employeesList.filter((item) => item.id === parseInt(employeeID))[0]
        : null,
    [employeeID, employeesList]
  );

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1")
      .then((res) => res.json())
      .then((result) => setEmployeesList(result.data))
      .catch((error) => setError(error));
  }, []);

  return (
    <div>
      {employeesList.length > 0 && (
        <Table striped size="sm">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employeesList.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <Image
                    roundedCircle
                    src={employee.avatar}
                    alt={`image of ${employee.first_name}`}
                  />
                </td>
                <td>
                  <Button
                    onClick={() => history.push(`/employees/${employee.id}`)}
                    variant="primary"
                  >
                    {employee.first_name} {employee.last_name}
                  </Button>
                </td>
                <td>{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {employeesList.length === 0 && !error && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      {employeeID && Boolean(employeesList.length) && (
        <EmployeeModal
          handleClose={() => history.push("/employees")}
          employee={singleEmployee}
        />
      )}
    </div>
  );
};

export default EmployeesList;
