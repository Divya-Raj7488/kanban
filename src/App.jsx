import { useEffect, useState } from "react";
import "./styles/App.css";
import axios from "axios";
import { FaExclamation } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [processedData, setProcessedData] = useState({});
  const [showOption, setShowOption] = useState(false);
  const [groupingParam, setGroupingParam] = useState("userId");
  const [sortingParam, setSortingParam] = useState("priority");
  const priorityMap = [
    "No priority",
    "Low",
    "Medium",
    "High",
    "Urgent",
];
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
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  useState(() => {
    fetchData();
  }, []);

  // function groupingFunc() {
  //   if (groupingParam == "userId") {
  //     const result = Map.groupBy(tickets, (item) => item["userId"]);
  //     setProcessedData(result);
  //   }
  //   if (groupingParam == "priority") {
  //     const result = Map.groupBy(tickets, (item) => item["priority"]);
  //     setProcessedData(result);
  //   }
  //   if (groupingParam == "status") {
  //     const result = Map.groupBy(tickets, (item) => item["status"]);
  //     setProcessedData(result);
  //   }
  // }

  function groupingFunc() {
    const result = tickets.reduce((acc, item) => {
      const key = item[groupingParam];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
    setProcessedData(result);
  }

  useEffect(() => {
    groupingFunc();
  }, [groupingParam, tickets]);
  console.log(processedData);

  function sortingFunc() {
    if (sortingParam == "priority") {
    }
    if (sortingParam == "title") {
    }
  }

  useEffect(() => {
    sortingFunc;
  }, [sortingParam]);
  return (
    <div className="homepage">
      <button onClick={updateShowOption} className="DisplayBtn">
        <span>
          <FaBars />
        </span>
        <span> Display</span>
      </button>
      <div
        style={{ display: `${showOption ? "flex" : "none"}` }}
        className="optionBox"
      >
        <div className="optBox">
          <label>Grouping</label>
          <select
            onChange={(e) => {
              setGroupingParam(e.target.value);
            }}
          >
            <option value="userId">User</option>
            <option value="status">Status</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="optBox">
          <label>Ordering</label>
          <select
            onChange={(e) => {
              setSortingParam(e.target.value);
            }}
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      <div className="dataContainer">
        {Object.keys(processedData).length === 0 ? (
          <p>No data available.</p>
        ) : (
          // Display grouped or sorted data
          Object.entries(processedData).map(([group, items]) => (
            <div key={group} className="groupContainer">
              {groupingParam == "priority" ? (
                <h4>{priorityMap[group]}</h4>
              ) : (
                <h4>{group}</h4>
              )}
              {/* <h4>{group}</h4> */}
              <div className="taskContainer">
                {items.map((ticket) => (
                  <div key={ticket.id} className="task">
                    <div className="Id">{ticket.id}</div>
                    <div className="title">{ticket.title}</div>
                    <div className="tag">
                      <span className="faExclamation">
                        <FaExclamation />
                      </span>{" "}
                      <span className="ticketTag">{ticket.tag[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
