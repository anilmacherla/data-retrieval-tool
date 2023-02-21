import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import QueueTableComponent from "./QueueTable";
import Loading from "./Loading";

function Main() {
  const [environmentsData, setEnvData] = useState([]);
  const [environmentId, setEnvSelectedId] = useState(0);
  const [queueNamesData, setQueueNames] = useState([]);
  const [queueNameId, setQueueNameId] = useState(0);
  const [queueData, setQueueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const data = {
      tenancyName: "LSG Automation",
      usernameOrEmailAddress: "amer\\aws-svc-rpa28p",
      password: "Test1234",
    };
    const url="https://uipath.amer.thermo.com/identity/connect/token";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAccessToken(data.access_token);
      })
      .catch((error) => {
        alert(
          "Error while making a request to the api. \nError message: " +
            error +
            "\nURL: " +
            url
        );
      });
  }, []);

  useEffect(() => {
    //Set URL to fetch Environments

    if (accessToken) {
      const url = "https://uipath.amer.thermo.com/odata/Environments";
      const options = {
        headers: {
          Accept: "application/json",
          "X-UIPATH-OrganizationUnitId": "199",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      setLoading(true);
      fetchApi(url, options).then((envJsonData) => {
        const mappedData = envJsonData.map((item) => ({
          id: item.Id,
          displayValue: item.DisplayName,
        }));
        setEnvData(mappedData);
      });
      setLoading(false);
    }
  }, [accessToken]);

  const fetchApi = async (url, options) => {
    return await fetch(url, options)
      .then((response) => response.json())
      .catch((error) =>
        alert(
          "Error while making a request to the api. \nError message: " +
            error +
            "\nURL: " +
            url
        )
      );
  };

  function handleEnvDropdownChange(id) {
    setLoading(true);
    setEnvSelectedId(id);
    setQueueNameDropdownList(id);
    setLoading(false);
  }

  function setQueueNameDropdownList(id) {
    //Set URL for fetch QueueName
    const url = "" + id;
    const options = {
      headers: {
        Accept: "application/json",
        "X-UIPATH-OrganizationUnitId": "199",
      },
    };

    fetchApi(url, options).then((queueNamesJsonData) => {
      const mappedData = queueNamesJsonData.value.map((item) => ({
        id: item.Id,
        displayValue: item.Name,
      }));
      setQueueNames(mappedData);
    });
  }

  function handleQueueDropdownChange(id) {
    setQueueNameId(id);
    //Set URL to get QueueData
    const url = "" + id;
    const options = {
      headers: {
        Accept: "application/json",
        "X-UIPATH-OrganizationUnitId": "199",
      },
    };

    setLoading(true);
    fetchApi(url, options).then((queueDataJson) => {
      const mappedData = queueDataJson.value.map((item) => ({
        QueueDefinitionName: item.QueueDefinitionName,
        ItemsToProcess: item.ItemsToProcess,
        ItemsInProgress: item.ItemsInProgress,
        SuccessfulTransactionsNo: item.SuccessfulTransactionsNo,
      }));
      setQueueData(mappedData);
    });
    setLoading(false);
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
            <label style={{ fontWeight: "bold" }}>Queue Data</label>
            <QueueTableComponent data={queueData} />
          </div>
        )}
      </div>
    </form>
  );
}

export default Main;
