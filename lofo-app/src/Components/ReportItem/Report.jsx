import { React, useState } from 'react';

export const Report = () => {
      const [itemName, setItemName] = useState('');
      const [landmark, setLandmark] = useState('');
      const [dateFound, setDateFound] = useState('');
      const [timeFound, setTimeFound] = useState('');
      const [description, setDescription] = useState('');
      const handleSubmit = (e) => {
            e.preventDefault();
            const formData = {
                  itemName,
                  landmark,
                  dateFound,
                  timeFound,
                  description,
            };
            console.log('Form Data Submitted:', formData);
      };
      return (
            <div className='ml-[300px] mt-[100px] font-poppins'>
                  <div className='flex flex-col gap-4 items-center'>
                        <h1 className='text-2xl text-red-600 font-bold'>Report Missing Items</h1>
                        <form className="items-center bg-gray-100 p-6 rounded-lg shadow-lg w-[1000px]" onSubmit={handleSubmit}>
                              <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Insert Image* (acceptable filetype: jpeg/png)</label>
                                    <input type="file" accept="image/jpeg,image/png" className="border border-gray-300 p-2 w-full" />
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Item Name*</label>
                                    <input
                                          type="text"
                                          value={itemName}
                                          onChange={(e) => setItemName(e.target.value)}
                                          className="border border-gray-300 p-2 w-full"
                                          placeholder="Item Name"
                                    />
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Landmark*</label>
                                    <select
                                          value={landmark}
                                          onChange={(e) => setLandmark(e.target.value)}
                                          className="border border-gray-300 p-2 w-full"
                                    >
                                          <option value="">Select Landmark</option>
                                          <option value="R&D Building">R&D Building</option>
                                          <option value="Sports Complex">Sports Complex</option>
                                          <option value="IC">IC</option>
                                          {/* Add more options as needed */}
                                    </select>
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Date Found*</label>
                                    <input
                                          type="date"
                                          value={dateFound}
                                          onChange={(e) => setDateFound(e.target.value)}
                                          className="border border-gray-300 p-2 w-full"
                                    />
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Time Found*</label>
                                    <input
                                          type="time"
                                          value={timeFound}
                                          onChange={(e) => setTimeFound(e.target.value)}
                                          className="border border-gray-300 p-2 w-full"
                                    />
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">
                                          Description* (place a comma (,) to separate the item's description)
                                    </label>
                                    <textarea
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)}
                                          className="border border-gray-300 p-2 w-full"
                                          placeholder="e.g. Color: Blue, Cotton, with money inside"
                                    />
                              </div>

                              <button
                                    type="submit"
                                    className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 w-full"
                              >
                                    Submit
                              </button>
                        </form>
                  </div>
            </div>
      )
};
