import React from "react";

function QueueTable(props) {
  const data = props.data;

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Queue Definition Name</th>
            <th scope="col">Items To Process</th>
            <th scope="col">Items In Progress</th>
            <th scope="col">Transactions Processed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{row.QueueDefinitionName}</td>
              <td>{row.ItemsToProcess}</td>
              <td>{row.ItemsInProgress}</td>
              <td>{row.SuccessfulTransactionsNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QueueTable;
