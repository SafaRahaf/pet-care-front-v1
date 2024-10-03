import React from "react";

const page = () => {
  return (
    <div>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-semibold">
          Welcome to the Admin Dashboard
        </h2>
        <p className="mt-4 text-gray-600">
          Here you can manage users, bikes, and view reports.
        </p>

        {/* Content Area */}
        <div className="mt-6 p-6 rounded-lg shadow">
          {/* Placeholder for the specific content (e.g., Manage Users) */}
          <h3 className="text-2xl font-semibold">Manage Users</h3>
          <div className="mt-4">
            <p>List of users will go here...</p>
            {/* You can add a table or any component to manage users here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
