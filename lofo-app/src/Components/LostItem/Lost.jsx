import React, { useState } from 'react';
import p1 from './lost_items/lost-1.jpg';
import p2 from './lost_items/lost-2.jpeg'
import p3 from './lost_items/lost-3.jpg'
export const Lost = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [currentImage, setCurrentImage] = useState(null);

      const openImage = (image) => {
            setCurrentImage(image); 
            setIsOpen(true);
      };

      const closeModal = () => {
            setIsOpen(false); 
            setCurrentImage(null); 
      }

      return (
            <div className='ml-72 mt-[200px] font-poppins'>
                  <div className='flex items-center justify-center'>
                        <table className="w-[1200px] table-auto border-2">
                              <thead className=''>
                                    <tr className="text-center bg-gray-800 text-white h-12">
                                          <th className="pb-2">Item Name</th>
                                          <th className="pb-2">Landmark</th>
                                          <th className="pb-2">Date Found</th>
                                          <th className="pb-2">Time Found</th>
                                          <th className="pb-2">Reported By</th>
                                          <th className="pb-2">Action</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr className="border-t text-center">
                                          <td className="py-2">Realme Earbuds</td>
                                          <td className="py-2">R&D Building</td>
                                          <td className="py-2">08-10-2024</td>
                                          <td className="py-2">10:00 AM</td>
                                          <td className="py-2">Shubham Verma</td>
                                          <td className="py-2">
                                                <button
                                                      className='border-2 w-[50px] bg-green-600 font-semibold text-white shadow'
                                                      onClick={() => openImage(p1)}>View</button>
                                          </td>
                                    </tr>
                                    <tr className="border-t text-center">
                                          <td className="py-2">Oneplus Phone</td>
                                          <td className="py-2">Sports Complex</td>
                                          <td className="py-2">03-05-2024</td>
                                          <td className="py-2">06:30 PM</td>
                                          <td className="py-2">Lara Hali</td>
                                          <td className="py-2">
                                                <button
                                                      className='border-2 w-[50px] bg-green-600 font-semibold text-white shadow'
                                                      onClick={() => openImage(p2)}>View</button>
                                          </td>
                                    </tr>
                                    <tr className="border-t text-center">
                                          <td className="py-2">Water Bottle</td>
                                          <td className="py-2">IC</td>
                                          <td className="py-2">29-10-2024</td>
                                          <td className="py-2">11:40 AM</td>
                                          <td className="py-2">Awkash</td>
                                          <td className="py-2">
                                                <button
                                                      className='border-2 w-[50px] bg-green-600 font-semibold text-white shadow'
                                                      onClick={() => openImage(p3)}>View</button>
                                          </td>
                                    </tr>
                              </tbody>
                        </table>
                  </div>
                  {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
        >
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <button
              type="button"
              className="absolute top-5 right-4 text-white px-3 py-1"
              aria-label="Close"
              onClick={closeModal}
            >
              &times;
            </button>

            <div className="flex flex-col items-center">
                  <div className='bg-green-700 w-full h-10 flex items-center'>
                        <span className='ml-5 text-white font-bold'>Item Details</span></div>
              <img
                src={currentImage}
                alt="Full size"
                className="w-[400px] h-[400px] object-cover mb-4"
              />

              <div className='mt-5 mb-5'>
                  <span>Description:  </span>
              </div>
              <div className="flex space-x-4">
                <button className="bg-green-500 font-semibold text-white px-4 py-2 rounded-md shadow hover:bg-green-700">Request Claim</button>
                <button className="bg-red-500 font-semibold text-white px-4 py-2 rounded-md shadow hover:bg-red-700" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
            </div>
      );
};