import { useEffect, useState } from "react";

import axios from "axios";

export default function AdminAnalytics() {

  const [goals, setGoals] = useState([]);

  const [checkins, setCheckins] = useState([]);

  const fetchData = async () => {

    try {

      const goalsResponse = await axios.get(
        "http://127.0.0.1:8000/goals"
      );

      const checkinsResponse = await axios.get(
        "http://127.0.0.1:8000/checkins"
      );

      setGoals(goalsResponse.data);

      setCheckins(checkinsResponse.data);

    }

    catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchData();

  }, []);

  const totalGoals = goals.length;

  const approvedGoals = goals.filter(
    (goal) => goal.status === "approved"
  ).length;

  const rejectedGoals = goals.filter(
    (goal) => goal.status === "rejected"
  ).length;

  const pendingGoals = goals.filter(
    (goal) => goal.status === "submitted"
  ).length;

  const totalCheckins = checkins.length;

  return (

    <div className="mt-10">

      <div className="grid grid-cols-5 gap-5">

        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow">

          <h2 className="text-lg">
            Total Goals
          </h2>

          <p className="text-4xl font-bold mt-3">
            {totalGoals}
          </p>

        </div>

        <div className="bg-green-600 text-white p-6 rounded-2xl shadow">

          <h2 className="text-lg">
            Approved
          </h2>

          <p className="text-4xl font-bold mt-3">
            {approvedGoals}
          </p>

        </div>

        <div className="bg-red-600 text-white p-6 rounded-2xl shadow">

          <h2 className="text-lg">
            Rejected
          </h2>

          <p className="text-4xl font-bold mt-3">
            {rejectedGoals}
          </p>

        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow">

          <h2 className="text-lg">
            Pending
          </h2>

          <p className="text-4xl font-bold mt-3">
            {pendingGoals}
          </p>

        </div>

        <div className="bg-purple-600 text-white p-6 rounded-2xl shadow">

          <h2 className="text-lg">
            Check-ins
          </h2>

          <p className="text-4xl font-bold mt-3">
            {totalCheckins}
          </p>

        </div>

      </div>

      <div className="mt-14">

        <h2 className="text-3xl font-bold mb-8">
          Recent Goals
        </h2>

        <div className="space-y-5">

          {
            goals.map((goal) => (

              <div
                key={goal.id}
                className="bg-white p-5 rounded-2xl shadow"
              >

                <div className="flex justify-between items-center">

                  <h3 className="text-xl font-bold">
                    {goal.title}
                  </h3>

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

                <div className="mt-4 space-y-2">

                  <p>
                    <strong>Thrust Area:</strong>
                    {" "}
                    {goal.thrust_area}
                  </p>

                  <p>
                    <strong>Weightage:</strong>
                    {" "}
                    {goal.weightage}
                  </p>

                  <p>
                    <strong>Target:</strong>
                    {" "}
                    {goal.target}
                  </p>

                </div>

              </div>
            ))
          }

        </div>

      </div>

      <div className="mt-14">

        <h2 className="text-3xl font-bold mb-8">
          Recent Check-ins
        </h2>

        <div className="space-y-5">

          {
            checkins.map((checkin) => (

              <div
                key={checkin.id}
                className="bg-white p-5 rounded-2xl shadow"
              >

                <div className="flex justify-between items-center">

                  <h3 className="text-xl font-bold">
                    {checkin.quarter}
                  </h3>

                  <span
                    className={`px-4 py-2 rounded-full text-white
                    ${
                      checkin.progress_status === "Completed"
                        ? "bg-green-500"
                        : checkin.progress_status === "On Track"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >

                    {checkin.progress_status}

                  </span>

                </div>

                <div className="mt-4 space-y-2">

                  <p>
                    <strong>Actual Value:</strong>
                    {" "}
                    {checkin.actual_value}
                  </p>

                  <p>
                    <strong>Comment:</strong>
                    {" "}
                    {checkin.comment}
                  </p>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}