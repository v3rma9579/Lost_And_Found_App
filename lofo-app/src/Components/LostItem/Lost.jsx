import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs,doc } from 'firebase/firestore';
import { db } from '../HomePage/firebase'; // Import your Firebase Firestore instance
// import p1 from './lost_items/lost-1.jpg';
// import p2 from './lost_items/lost-2.jpeg';
// import p3 from './lost_items/lost-3.jpg';

export const Lost = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [lostItems, setLostItems] = useState([]); // State to store fetched data

    // Function to fetch lost items from Firestore
    const fetchLostItems = async () => {
        const querySnapshot = await getDocs(collection(db, 'foundItems'));
        const items = [];
        querySnapshot.forEach(async (docu) => {
            let data = {...docu.data()}
            items.push({ ...data,id: docu.id }); 
        });
        setLostItems(items); // Set the state with the fetched data
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchLostItems();
    }, []);

    const openImage = (image) => {
        setCurrentImage(image);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setCurrentImage(null);
    };

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
                        {/* Map through the lostItems array to dynamically create rows */}
                        {lostItems.map((item, index) => (
                            <tr key={item.id} className="border-t text-center">
                                <td className="py-2">{item.itemName}</td>
                                <td className="py-2">{item.landmark}</td>
                                <td className="py-2">{item.dateFound}</td>
                                <td className="py-2">{item.timeFound}</td>
                                <td className="py-2">{item.reportedBy || 'ghfdfthgd'}</td>
                                <td className="py-2">
                                    <button
                                        className='border-2 w-[50px] bg-green-600 font-semibold text-white shadow'
                                        onClick={() => openImage(item.url || p1)} 
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Image Preview */}
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
                                <span>Description: </span>
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
    );
};
