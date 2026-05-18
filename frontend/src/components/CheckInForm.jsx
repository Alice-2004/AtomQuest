import { useEffect, useState } from "react";

import axios from "axios";

export default function CheckInForm() {

  const [goals, setGoals] = useState([]);

  const [checkins, setCheckins] = useState([]);

  const [formData, setFormData] = useState({
    goal_id: "",
    quarter: "Q1",
    actual_value: "",
    progress_status: "On Track",
    comment: "",
  });

  const fetchGoals = async () => {

    try {

      const response = await axios.get(
        "https://atomquest-backend-qfhk.onrender.com/goals"
      );

      setGoals(response.data);

    }

    catch (error) {

      console.log(error);
    }
  };

  const fetchCheckins = async () => {

    try {

      const response = await axios.get(
        "https://atomquest-backend-qfhk.onrender.com/checkins"
      );

      setCheckins(response.data);

    }

    catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchGoals();

    fetchCheckins();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    try {

      await axios.post(
        "https://atomquest-backend-qfhk.onrender.com/checkins",
        {
          ...formData,
          actual_value: Number(
            formData.actual_value
          ),
          goal_id: Number(
            formData.goal_id
          ),
        }
      );

      alert("Check-in submitted");

      fetchCheckins();

      setFormData({
        goal_id: "",
        quarter: "Q1",
        actual_value: "",
        progress_status: "On Track",
        comment: "",
      });

    }

    catch (error) {

      alert("Submission failed");

      console.log(error);
    }
  };

  return (

    <div className="mt-16">

      <h2 className="text-3xl font-bold mb-8">
        Quarterly Check-ins
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow">

        <div className="grid grid-cols-2 gap-5">

          <select
            name="goal_id"
            className="border p-3 rounded-lg"
            value={formData.goal_id}
            onChange={handleChange}
          >

            <option value="">
              Select Goal
            </option>

            {
              goals.map((goal) => (

                <option
                  key={goal.id}
                  value={goal.id}
                >
                  {goal.title}
                </option>
              ))
            }

          </select>

          <select
            name="quarter"
            className="border p-3 rounded-lg"
            value={formData.quarter}
            onChange={handleChange}
          >

            <option>
              Q1
            </option>

            <option>
              Q2
            </option>

            <option>
              Q3
            </option>

            <option>
              Q4
            </option>

          </select>

          <input
            type="number"
            name="actual_value"
            placeholder="Actual Progress Value"
            className="border p-3 rounded-lg"
            value={formData.actual_value}
            onChange={handleChange}
          />

          <select
            name="progress_status"
            className="border p-3 rounded-lg"
            value={formData.progress_status}
            onChange={handleChange}
          >

            <option>
              Not Started
            </option>

            <option>
              On Track
            </option>

            <option>
              Completed
            </option>

          </select>

          <textarea
            name="comment"
            placeholder="Progress Comment"
            className="border p-3 rounded-lg col-span-2"
            value={formData.comment}
            onChange={handleChange}
          />

        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Submit Check-in
        </button>

      </div>

      <div className="mt-12">

        <h3 className="text-2xl font-bold mb-6">
          Progress History
        </h3>

        <div className="space-y-6">

          {
            checkins.map((checkin) => {

              const relatedGoal = goals.find(
                (goal) => goal.id === checkin.goal_id
              );

              const progressPercentage = relatedGoal
                ? Math.min(
                    (
                      (
                        checkin.actual_value /
                        relatedGoal.target
                      ) * 100
                    ).toFixed(1),
                    100
                  )
                : 0;

              return (

                <div
                  key={checkin.id}
                  className="bg-white p-6 rounded-2xl shadow"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h4 className="text-2xl font-bold">

                        {
                          relatedGoal
                            ? relatedGoal.title
                            : "Unknown Goal"
                        }

                      </h4>

                      <p className="text-gray-500 mt-1 text-lg">

                        {checkin.quarter}

                      </p>

                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-white h-fit
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

                  <div className="mt-6 grid grid-cols-3 gap-4">

                    <div className="bg-gray-100 p-4 rounded-xl">

                      <p className="text-gray-500">
                        Target
                      </p>

                      <h5 className="text-2xl font-bold mt-2">

                        {relatedGoal?.target}

                      </h5>

                    </div>

                    <div className="bg-gray-100 p-4 rounded-xl">

                      <p className="text-gray-500">
                        Achievement
                      </p>

                      <h5 className="text-2xl font-bold mt-2">

                        {checkin.actual_value}

                      </h5>

                    </div>

                    <div className="bg-gray-100 p-4 rounded-xl">

                      <p className="text-gray-500">
                        Progress
                      </p>

                      <h5 className="text-2xl font-bold mt-2">

                        {progressPercentage}%

                      </h5>

                    </div>

                  </div>

                  <div className="mt-6">

                    <p className="font-semibold text-lg">

                      Comment

                    </p>

                    <p className="mt-2 text-gray-700">

                      {checkin.comment}

                    </p>

                  </div>

                </div>
              );
            })
          }

        </div>

      </div>

    </div>
  );
}