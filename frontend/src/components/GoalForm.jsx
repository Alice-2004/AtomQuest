import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaRegTrashAlt,
  FaPaperPlane,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

export default function GoalForm() {

  const [goals, setGoals] = useState([
    {
      thrust_area: "",
      title: "",
      description: "",
      uom_type: "Numeric",
      target: "",
      weightage: "",
    }
  ]);

  const [submittedGoals, setSubmittedGoals] = useState([]);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);

  const getStatusBadgeClass = (status) => {

    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === "rejected") {
      return "bg-red-50 text-red-700";
    }

    if (normalizedStatus === "approved") {
      return "bg-blue-50 text-blue-700";
    }

    return "bg-green-50 text-green-700";
  };

  const fetchSubmittedGoals = async () => {

    try {

      const response = await axios.get(
        "https://atomquest-backend-qfhk.onrender.com/goals"
      );

      setSubmittedGoals(response.data);

    }

    catch (error) {

      console.error("Failed to load submitted goals", error);
    }
  };

  useEffect(() => {

    fetchSubmittedGoals();
  }, []);

  const handleChange = (
    index,
    field,
    value
  ) => {

    const updatedGoals = [...goals];

    updatedGoals[index][field] = value;

    setGoals(updatedGoals);
  };

  const addGoal = () => {

    if (goals.length >= 8) {

      alert("Maximum 8 goals allowed");

      return;
    }

    setGoals([
      ...goals,
      {
        thrust_area: "",
        title: "",
        description: "",
        uom_type: "Numeric",
        target: "",
        weightage: "",
      }
    ]);
  };

  const removeGoal = (index) => {

    const updatedGoals = goals.filter(
      (_, i) => i !== index
    );

    setGoals(updatedGoals);
  };

  const handleEditGoalChange = (
    field,
    value
  ) => {

    setEditingGoal({
      ...editingGoal,
      [field]: value,
    });
  };

  const startEditingGoal = (goal) => {

    setEditingGoalId(goal.id);

    setEditingGoal({
      thrust_area: goal.thrust_area,
      title: goal.title,
      description: goal.description,
      uom_type: goal.uom_type,
      target: goal.target,
      weightage: goal.weightage,
    });
  };

  const cancelEditingGoal = () => {

    setEditingGoalId(null);
    setEditingGoal(null);
  };

  const saveEditedGoal = async (goalId) => {

    try {

      await axios.put(
        `https://atomquest-backend-qfhk.onrender.com/goals/${goalId}`,
        editingGoal
      );

      cancelEditingGoal();
      await fetchSubmittedGoals();

      alert("Goal updated successfully");

    }

    catch (error) {

      alert(
        error.response?.data?.detail ||
        "Goal update failed"
      );
    }
  };

  const deleteSubmittedGoal = async (goalId) => {

    if (!window.confirm("Delete this submitted goal?")) {

      return;
    }

    try {

      await axios.delete(
        `https://atomquest-backend-qfhk.onrender.com/goals/${goalId}`
      );

      await fetchSubmittedGoals();

      alert("Goal deleted successfully");

    }

    catch (error) {

      alert(
        error.response?.data?.detail ||
        "Goal delete failed"
      );
    }
  };

  const totalWeightage = goals.reduce(
    (sum, goal) =>
      sum + Number(goal.weightage),
    0
  );

  const handleSubmit = async () => {

    if (totalWeightage !== 100) {

      alert(
        "Total weightage must equal 100"
      );

      return;
    }

    for (let goal of goals) {

      if (goal.weightage < 10) {

        alert(
          "Minimum weightage per goal is 10"
        );

        return;
      }
    }

    try {

      await axios.post(
        "https://atomquest-backend-qfhk.onrender.com/goals",
        goals
      );

      await fetchSubmittedGoals();

      alert("Goals submitted successfully");

    }

    catch (error) {

      alert(
        error.response?.data?.detail ||
        "Submission failed"
      );
    }
  };

  return (

    <section className="mx-auto mt-8 max-w-6xl">

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-sm font-semibold uppercase text-blue-600">
            Goal Planning
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-950">
            Performance goals
          </h2>

        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
            Total weightage: {totalWeightage}/100
          </div>

          <button
            onClick={addGoal}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <FaPlus className="text-sm" />
            Add Goal
          </button>

        </div>

      </div>

      <div className="space-y-8">

        {
          goals.map((goal, index) => (

            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >

              <div className="mb-6 flex items-center justify-between gap-4 border-b border-gray-100 pb-4">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Goal {index + 1}/8
                  </p>

                  <h3 className="text-xl font-bold text-gray-950">
                    Define outcome and measurement
                  </h3>

                </div>

                {
                  goals.length > 1 && (

                    <button
                      onClick={() =>
                        removeGoal(index)
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <FaRegTrashAlt />
                      Remove
                    </button>
                  )
                }

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <label className="space-y-2">

                  <span className="text-sm font-semibold text-gray-700">
                    Thrust Area
                  </span>

                <input
                  type="text"
                  placeholder="Thrust Area"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  value={goal.thrust_area}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "thrust_area",
                      e.target.value
                    )
                  }
                />

                </label>

                <label className="space-y-2">

                  <span className="text-sm font-semibold text-gray-700">
                    Goal Title
                  </span>

                <input
                  type="text"
                  placeholder="Goal Title"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  value={goal.title}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "title",
                      e.target.value
                    )
                  }
                />

                </label>

                <label className="space-y-2 md:col-span-2">

                  <span className="text-sm font-semibold text-gray-700">
                    Description
                  </span>

                <textarea
                  placeholder="Description"
                    rows="4"
                    className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  value={goal.description}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                />

                </label>

                <label className="space-y-2">

                  <span className="text-sm font-semibold text-gray-700">
                    Unit of Measure
                  </span>

                <select
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  value={goal.uom_type}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "uom_type",
                      e.target.value
                    )
                  }
                >

                  <option>
                    Numeric
                  </option>

                  <option>
                    %
                  </option>

                  <option>
                    Timeline
                  </option>

                  <option>
                    Zero-based
                  </option>

                </select>

                </label>

                <label className="space-y-2">

                  <span className="text-sm font-semibold text-gray-700">
                    Target
                  </span>

                <input
                  type="number"
                  placeholder="Target"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  value={goal.target}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "target",
                      e.target.value
                    )
                  }
                />

                </label>

                <label className="space-y-2">

                  <span className="text-sm font-semibold text-gray-700">
                    Weightage
                  </span>

                <input
                  type="number"
                  placeholder="Weightage"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  value={goal.weightage}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "weightage",
                      e.target.value
                    )
                  }
                />

                </label>

              </div>

            </div>
          ))
        }

      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700"
      >
        <FaPaperPlane />
        Submit Goals
      </button>

      <div className="mt-10">

        <div className="mb-5 flex items-end justify-between gap-4">

          <div>

            <p className="text-sm font-semibold uppercase text-blue-600">
              Submitted Goals
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-950">
              Your saved goals
            </h2>

          </div>

          <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
            {submittedGoals.length}/8 submitted
          </div>

        </div>

        {
          submittedGoals.length === 0 ? (

            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-gray-500">
              Submitted goals will appear here.
            </div>
          ) : (

            <div className="space-y-4">

              {
                submittedGoals.map((goal, index) => (

                  <div
                    key={goal.id || index}
                    className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                  >

                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                      <div>

                        <p className="text-sm font-semibold text-blue-600">
                          Goal {index + 1}/8
                        </p>

                        {
                          editingGoalId === goal.id ? (

                            <input
                              type="text"
                              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-xl font-bold text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                              value={editingGoal.title}
                              onChange={(e) =>
                                handleEditGoalChange(
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          ) : (

                            <h3 className="mt-1 text-xl font-bold text-gray-950">
                              {goal.title}
                            </h3>
                          )
                        }

                        {
                          editingGoalId === goal.id ? (

                            <textarea
                              rows="3"
                              className="mt-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                              value={editingGoal.description}
                              onChange={(e) =>
                                handleEditGoalChange(
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          ) : (

                            <p className="mt-2 text-sm text-gray-600">
                              {goal.description}
                            </p>
                          )
                        }

                      </div>

                      <div className="flex flex-wrap items-center gap-2">

                        <span
                          className={`
                            rounded-full px-3 py-1 text-sm font-semibold capitalize
                            ${getStatusBadgeClass(goal.status)}
                          `}
                        >
                          Status: {goal.status || "submitted"}
                        </span>

                        {
                          goal.status === "submitted" && (

                            editingGoalId === goal.id ? (

                              <>

                                <button
                                  onClick={() =>
                                    saveEditedGoal(goal.id)
                                  }
                                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                  <FaSave />
                                  Save
                                </button>

                                <button
                                  onClick={cancelEditingGoal}
                                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                  <FaTimes />
                                  Cancel
                                </button>

                              </>
                            ) : (

                              <>

                                <button
                                  onClick={() =>
                                    startEditingGoal(goal)
                                  }
                                  className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                                >
                                  <FaEdit />
                                  Edit
                                </button>

                                <button
                                  onClick={() =>
                                    deleteSubmittedGoal(goal.id)
                                  }
                                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                >
                                  <FaRegTrashAlt />
                                  Delete
                                </button>

                              </>
                            )
                          )
                        }

                      </div>

                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">

                      <div className="rounded-lg bg-gray-50 p-3">
                        <p className="font-semibold text-gray-500">
                          Thrust Area
                        </p>
                        {
                          editingGoalId === goal.id ? (

                            <input
                              type="text"
                              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                              value={editingGoal.thrust_area}
                              onChange={(e) =>
                                handleEditGoalChange(
                                  "thrust_area",
                                  e.target.value
                                )
                              }
                            />
                          ) : (

                            <p className="mt-1 text-gray-950">
                              {goal.thrust_area}
                            </p>
                          )
                        }
                      </div>

                      <div className="rounded-lg bg-gray-50 p-3">
                        <p className="font-semibold text-gray-500">
                          UOM
                        </p>
                        {
                          editingGoalId === goal.id ? (

                            <select
                              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                              value={editingGoal.uom_type}
                              onChange={(e) =>
                                handleEditGoalChange(
                                  "uom_type",
                                  e.target.value
                                )
                              }
                            >
                              <option>Numeric</option>
                              <option>%</option>
                              <option>Timeline</option>
                              <option>Zero-based</option>
                            </select>
                          ) : (

                            <p className="mt-1 text-gray-950">
                              {goal.uom_type}
                            </p>
                          )
                        }
                      </div>

                      <div className="rounded-lg bg-gray-50 p-3">
                        <p className="font-semibold text-gray-500">
                          Target
                        </p>
                        {
                          editingGoalId === goal.id ? (

                            <input
                              type="number"
                              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                              value={editingGoal.target}
                              onChange={(e) =>
                                handleEditGoalChange(
                                  "target",
                                  e.target.value
                                )
                              }
                            />
                          ) : (

                            <p className="mt-1 text-gray-950">
                              {goal.target}
                            </p>
                          )
                        }
                      </div>

                      <div className="rounded-lg bg-gray-50 p-3">
                        <p className="font-semibold text-gray-500">
                          Weightage
                        </p>
                        {
                          editingGoalId === goal.id ? (

                            <input
                              type="number"
                              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                              value={editingGoal.weightage}
                              onChange={(e) =>
                                handleEditGoalChange(
                                  "weightage",
                                  e.target.value
                                )
                              }
                            />
                          ) : (

                            <p className="mt-1 text-gray-950">
                              {goal.weightage}
                            </p>
                          )
                        }
                      </div>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </section>
  );
}
