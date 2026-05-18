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