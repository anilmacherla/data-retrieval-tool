import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import QueueTableComponent from "./QueueTable";
import envJsonData from "./Environments.json";
import queueNamesJsonData from "./QueueNames.json";
import queueDataJson from "./QueueData.json";
import Loading from "./Loading";

function Main() {
  const [environmentsData, setEnvData] = useState([]);
  const [environmentId, setEnvSelectedId] = useState(0);
  const [queueNamesData, setQueueNames] = useState([]);
  const [queueNameId, setQueueNameId] = useState(0);
  const [queueData, setQueueData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mappedData = envJsonData.map((item) => ({
      id: item.Id,
      displayValue: item.DisplayName,
    }));
    setEnvData(mappedData);
  }, []);

  function handleEnvDropdownChange(id) {
    //Remove: Added for testing 'loading' component
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    setEnvSelectedId(id);
    const mappedData = queueNamesJsonData.value.map((item) => ({
      id: item.Id,
      displayValue: item.Name,
    }));
    setQueueNames(mappedData);
  }

  function handleQueueDropdownChange(id) {
    setQueueNameId(id);
    const mappedData = queueDataJson.value.map((item) => ({
      QueueDefinitionName: item.QueueDefinitionName,
      ItemsToProcess: item.ItemsToProcess,
      ItemsInProgress: item.ItemsInProgress,
      SuccessfulTransactionsNo: item.SuccessfulTransactionsNo,
    }));
    setQueueData(mappedData);
  }

  function clearAll() {
    setEnvSelectedId(0);
    setQueueNameId(0);
  }

  return (
    <form>
      <div className="flex">
        <h2 style={{ paddingTop: "15px" }}>Data Retrieval Tool</h2>
        <hr />
        <Dropdown
          items={environmentsData}
          onChange={handleEnvDropdownChange}
          labelText="Select the environment"
        ></Dropdown>
        {environmentId > 0 && (
          <Dropdown
            items={queueNamesData}
            onChange={handleQueueDropdownChange}
            labelText="Select the Queue Name"
          />
        )}

        {loading && <Loading />}
        <button onClick={clearAll} className="btn btn-primary mt-3">
          Clear All
        </button>
        <hr />
        {queueNameId > 0 && (
          <div>
            <label style={{ "font-weight": "bold" }}>Queue Data</label>
            <QueueTableComponent data={queueData} />
          </div>
        )}
      </div>
    </form>
  );
}

export default Main;
