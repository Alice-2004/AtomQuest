import { useEffect, useState } from "react";

import axios from "axios";

export default function ManagerGoals() {

  const [goals, setGoals] = useState([]);

  const [comments, setComments] = useState({});

  const fetchGoals = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/goals"
      );

      setGoals(response.data);

    }

    catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchGoals();

  }, []);

  const handleCommentChange = (
    goalId,
    value
  ) => {

    setComments({
      ...comments,
      [goalId]: value,
    });
  };

  const handleApproval = async (
    goalId,
    status
  ) => {

    try {

      await axios.put(
        `http://127.0.0.1:8000/goals/approve/${goalId}`,
        {
          status: status,
          manager_comment:
            comments[goalId] || "",
        }
      );

      fetchGoals();

      alert(`Goal ${status}`);

    }

    catch (error) {

      console.log(error);

      alert("Action failed");
    }
  };

  return (

    <div className="mt-10 space-y-8">

      {
        goals.map((goal) => (

          <div
            key={goal.id}
            className="bg-white p-6 rounded-2xl shadow"
          >

            <div className="flex justify-between items-center">

              <h2 className="text-2xl font-bold">
                {goal.title}
              </h2>

              <span
                className={`px-4 py-2 rounded-full text-white
                ${
                  goal.status === "approved"
                    ? "bg-green-500"
                    : goal.status === "rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >

                {goal.status}

              </span>

            </div>

            <div className="mt-5 space-y-2">

              <p>
                <strong>Thrust Area:</strong>
                {" "}
                {goal.thrust_area}
              </p>

              <p>
                <strong>Description:</strong>
                {" "}
                {goal.description}
              </p>

              <p>
                <strong>Target:</strong>
                {" "}
                {goal.target}
              </p>

              <p>
                <strong>Weightage:</strong>
                {" "}
                {goal.weightage}
              </p>

              <p>
                <strong>Unit:</strong>
                {" "}
                {goal.uom_type}
              </p>

            </div>

            <textarea
              placeholder="Add manager comment"
              className="w-full border p-3 rounded-lg mt-5"
              value={comments[goal.id] || ""}
              onChange={(e) =>
                handleCommentChange(
                  goal.id,
                  e.target.value
                )
              }
            />

            <div className="flex gap-4 mt-5">

              <button
                onClick={() =>
                  handleApproval(
                    goal.id,
                    "approved"
                  )
                }
                className="bg-green-600 text-white px-5 py-3 rounded-lg"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  handleApproval(
                    goal.id,
                    "rejected"
                  )
                }
                className="bg-red-600 text-white px-5 py-3 rounded-lg"
              >
                Reject
              </button>

            </div>

            {
              goal.manager_comment && (

                <div className="mt-5 bg-gray-100 p-4 rounded-lg">

                  <strong>
                    Manager Comment:
                  </strong>

                  <p>
                    {goal.manager_comment}
                  </p>

                </div>
              )
            }

          </div>
        ))
      }

    </div>
  );
}