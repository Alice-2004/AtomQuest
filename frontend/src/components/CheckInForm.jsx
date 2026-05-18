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
        "http://127.0.0.1:8000/goals"
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
        "http://127.0.0.1:8000/checkins"
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
        "http://127.0.0.1:8000/checkins",
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
            checkins.map((checkin) => (

              <div
                key={checkin.id}
                className="bg-white p-5 rounded-2xl shadow"
              >

                <div className="flex justify-between">

                  <h4 className="text-xl font-bold">
                    {checkin.quarter}
                  </h4>

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