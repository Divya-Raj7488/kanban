import { useEffect, useState } from "react";
import "./styles/App.css";
import axios from "axios";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [showOption, setShowOption] = useState(false);

  function updateShowOption() {
    setShowOption(!showOption);
  }
  async function fetchData() {
    try {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      setTickets(response.data.tickets);
      setUsers(response.data.users);
      setProcessedData(response.data.tickets);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  useState(() => {
    fetchData();
  }, []);

  function groupingFunc(groupingParam) {
    if (groupingParam === "userId") {
      const result = Object.groupBy(tickets, (item) => item["userId"]);
      setProcessedData([result]);
    }
    if (groupingParam === "priority") {
      const result = Object.groupBy(tickets, (item) => item["priority"]);
      setProcessedData([result]);
    }
    if (groupingParam === "status") {
      const result = Object.groupBy(tickets, (item) => item["status"]);
      setProcessedData([result]);
    }
  }

  function sortingFunc(sortingParam) {
    if (sortingParam == "priority") {
    }
    if (sortingParam == "title") {
    }
  }
  return (
    <div className="homepage">
      <button onClick={updateShowOption} className="DisplayBtn">
        Display
      </button>
      <div
        style={{ display: `${showOption ? "flex" : "none"}` }}
        className="optionBox"
      >
        <div className="optBox">
          <label>Grouping</label>
          <select
            onChange={(e) => {
              // setGroupingParam(e.target.value);
              groupingFunc(e.target.value);
            }}
          >
            <option value="status">Status</option>
            <option value="userId">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="optBox">
          <label>Ordering</label>
          <select
            onChange={(e) => {
              // setSortingParam(e.target.value);
              sortingFunc();
            }}
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      <div>{/* {processedData.map()} */}</div>
    </div>
  );
}

export default App;
