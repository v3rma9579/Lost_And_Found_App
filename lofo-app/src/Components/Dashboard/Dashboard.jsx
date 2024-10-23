import React from 'react';

export const Dashboard = () => {
  return (
    <>
      <div className='hidden md:block'>
        <main className="pt-16 px-6 flex-1 h-screen overflow-auto bg-gray-50 ml-72 font-poppins">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8 mt-10">
            <h1 className="text-2xl font-semibold font-poppins">User Dashboard</h1>

          </div>

          {/* Stats Section */}
          <div className="flex flex-col md:flex-row md:gap-20 gap-5 mb-20 p-5 items-start">
            <div className="bg-blue-600 p-6 h-[200px] w-[300px] rounded-md flex flex-col justify-around shadow-xl transition duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Your Claimed Items</h3>
              </div>
              <h1 className="text-4xl font-bold text-white">2</h1>
              <button className=' bg-white flex items-center h-8 justify-center border-2 rounded-full'>View</button>
            </div>

            <div className="bg-orange-600 p-6 h-[200px] w-[300px] rounded-md flex flex-col justify-around shadow-xl transition duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white font-poppins">Total Missing Items</h3>
              </div>
              <h1 className="text-4xl font-bold text-white">25</h1>
              <button className=' bg-white flex items-center h-8 justify-center border-2 rounded-full'>View</button>
            </div>

            <div className="card bg-green-700 p-6 h-[200px] w-[300px] rounded-md flex flex-col justify-around shadow-xl transition duration-300 hover:scale-105 cursor-pointer">
              <div className="card-inner flex items-center justify-between">
                <h3 className="font-semibold text-white">Total Claimed Items</h3>
              </div>
              <h1 className="text-4xl font-bold text-white">20</h1>
              <button className=' bg-white flex items-center h-8 justify-center border-2 rounded-full'>View</button>
            </div>

          </div>

          <div className="bg-white p-4">
            <h3 className="font-semibold mb-4 font-poppins text-gray-700">Displaying Most Recent Lost Items</h3>
            <table className="w-full table-auto border-2">
              <thead className=''>
                <tr className="text-left bg-gray-800 text-white h-12">
                  <th className="p-2">Item Name</th>
                  <th className="p-2">Landmark</th>
                  <th className="p-2">Date Found</th>
                  <th className="p-2">Time Found</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2 flex items-center">

                    Realme Earbuds
                  </td>
                  <td className="p-2">R&D Building</td>
                  <td className="p-2">
                    <span className="">08-10-2024</span>
                  </td>
                  <td className="p-2">
                    <span className="">10:00 AM</span>
                  </td>
                  <td className="p-2">
                    <span className="text-yellow-500">Pending</span>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="p-2 flex items-center">

                    Oneplus Phone
                  </td>
                  <td className="p-2">Sports Complex</td>
                  <td className="p-2">
                    <span className="">03-05-2024</span>
                  </td>
                  <td className="p-2">
                    <span className="">06:30 PM</span>
                  </td>
                  <td className="p-2">
                    <span className="text-yellow-500">Pending</span>
                  </td>

                </tr>
                <tr className="border-t">
                  <td className="p-2 flex items-center">

                    Water Bottle
                  </td>
                  <td className="p-2">IC</td>
                  <td className="p-2">
                    <span className="">29-10-2024</span>
                  </td>
                  <td className="p-2">
                    <span className="">11:40 AM</span>
                  </td>
                  <td className="p-2">
                    <span className="text-green-500">Completed</span>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <div className='md:hidden'>
        <div className="flex items-center justify-between ml-24 mb-8 mt-14">
          <h1 className="text-xl font-semibold font-poppins">User Dashboard</h1>
        </div>

        <div className="flex flex-col gap-5 mb-20 p-5 items-center">
          <div className="bg-blue-600 p-6 h-[200px] w-full max-w-[250px] rounded-md flex flex-col justify-around shadow-xl transition duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Your Claimed Items</h3>
            </div>
            <h1 className="text-4xl font-bold text-white">2</h1>
            <button className="bg-white flex items-center h-8 justify-center border-2 rounded-full">View</button>
          </div>

          <div className="bg-orange-600 p-6 h-[200px] w-full max-w-[250px] rounded-md flex flex-col justify-around shadow-xl transition duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white font-poppins">Total Missing Items</h3>
            </div>
            <h1 className="text-4xl font-bold text-white">25</h1>
            <button className="bg-white flex items-center h-8 justify-center border-2 rounded-full">View</button>
          </div>

          <div className="bg-green-700 p-6 h-[200px] w-full max-w-[250px] rounded-md flex flex-col justify-around shadow-xl transition duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Total Claimed Items</h3>
            </div>
            <h1 className="text-4xl font-bold text-white">20</h1>
            <button className="bg-white flex items-center h-8 justify-center border-2 rounded-full">View</button>
          </div>
        </div>

      </div>
    </>
  );
};
