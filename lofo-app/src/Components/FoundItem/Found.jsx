import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../HomePage/firebase';

export const Found = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [confirmModalOpen, setConfirmModalOpen] = useState(false);
      const [currentImage, setCurrentImage] = useState(null);
      const [lostItems, setLostItems] = useState([]);
      const [currentDescription, setCurrentDescription] = useState('');
      const [currentStatus, setCurrentStatus] = useState('');
      const [selectedItemId, setSelectedItemId] = useState(null);

      const fetchLostItems = async () => {
            const querySnapshot = await getDocs(collection(db, 'foundItems'));
            const items = [];
            querySnapshot.forEach((docu) => {
                  let data = { ...docu.data() }
                  items.push({ ...data, id: docu.id });
            });
            setLostItems(items);
      };

      useEffect(() => {
            fetchLostItems();
      }, []);

      const openImage = (image, description, status) => {
            setCurrentImage(image);
            setCurrentDescription(description);
            setCurrentStatus(status);
            setIsOpen(true);
      };

      const closeModal = () => {
            setIsOpen(false);
            setCurrentImage(null);
            setCurrentDescription('');
            setCurrentStatus('');
      };

      const handleStatusClick = (itemId) => {
            setSelectedItemId(itemId);
            setConfirmModalOpen(true);
      };

      const handleConfirmStatusChange = () => {
            setLostItems(prevItems =>
                  prevItems.map(item =>
                        item.id === selectedItemId ? { ...item, isClaimed: !item.isClaimed } : item
                  )
            );
            setConfirmModalOpen(false);
            setSelectedItemId(null);
      };

      const handleCancelStatusChange = () => {
            setConfirmModalOpen(false);
            setSelectedItemId(null);
      };

      return (
            <>
                  <div className='flex items-center justify-center'>
                        <h1 className='ml-72 mt-[100px] mb-10 text-2xl font-poppins text-blue-600 font-semibold'>Displaying Found Items at BIT Campus</h1>
                  </div>
                  <div className='ml-72 font-poppins'>
                        <div className='flex items-center justify-center'>
                              <table className="w-[1200px] table-auto border-2">
                                    <thead>
                                          <tr className="text-center bg-gray-800 text-white h-12">
                                                <th className="pb-2">Item Name</th>
                                                <th className="pb-2">Landmark</th>
                                                <th className="pb-2">Date Found</th>
                                                <th className="pb-2">Time Found</th>
                                                <th className="pb-2">Reported By</th>
                                                <th className="pb-2">Status</th>
                                                <th className="pb-2">Action</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {lostItems.map((item) => (
                                                <tr key={item.id} className="border-t text-center">
                                                      <td className="py-2">{item.itemName}</td>
                                                      <td className="py-2">{item.landmark}</td>
                                                      <td className="py-2">{item.dateFound}</td>
                                                      <td className="py-2">{item.timeFound}</td>
                                                      <td className="py-2">{item.reportedBy || ''}</td>
                                                      <td className="py-2">
                                                            <input
                                                                  type="checkbox"
                                                                  checked={item.isClaimed || false}
                                                                  onChange={() => handleStatusClick(item.id)}
                                                                  className="accent-green-600 h-5 cursor-pointer"
                                                            />
                                                      </td>
                                                      <td className="py-2">
                                                            <button
                                                                  className='border-2 w-[50px] bg-green-600 font-semibold text-white shadow'
                                                                  onClick={() => openImage(item.url || '', item.description, item.itemStatus)}
                                                            >
                                                                  View
                                                            </button>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>

                        {confirmModalOpen && (
                              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                          <h2 className="text-lg font-semibold mb-4">Confirm Status Change</h2>
                                          <p className="mb-6">Are you sure you want to mark this item as claimed?</p>
                                          <div className="flex justify-center space-x-4">
                                                <button
                                                      className="bg-green-500 font-semibold text-white px-4 py-2 rounded-md shadow hover:bg-green-700"
                                                      onClick={handleConfirmStatusChange}
                                                >
                                                      Yes
                                                </button>
                                                <button
                                                      className="bg-red-500 font-semibold text-white px-4 py-2 rounded-md shadow hover:bg-red-700"
                                                      onClick={handleCancelStatusChange}
                                                >
                                                      No
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        )}

                        {isOpen && (
                              <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
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
                                                      <span className='ml-5 text-white font-bold'>Item Details</span>
                                                </div>
                                                <img
                                                      src={currentImage}
                                                      alt="Full size"
                                                      className="w-[400px] h-[400px] object-cover mb-4"
                                                />
                                                <div className='mt-5 mb-5'>
                                                      <span>Description: {currentDescription}</span>
                                                </div>
                                                <div className="flex space-x-4">
                                                      <button className="bg-green-500 font-semibold text-white px-4 py-2 rounded-md shadow hover:bg-green-700">
                                                            Request Claim
                                                      </button>
                                                      <button className="bg-red-500 font-semibold text-white px-4 py-2 rounded-md shadow hover:bg-red-700" onClick={closeModal}>
                                                            Cancel
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        )}
                  </div>
            </>
      );
};
