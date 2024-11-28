import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../HomePage/firebase';
import { Link } from "react-router-dom";

export const Found = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [lostItems, setLostItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentDescription, setCurrentDescription] = useState('');
    const [currId, setCurrId] = useState(null);

    const fetchLostItems = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'foundItems'));
            const items = [];
            querySnapshot.forEach((docu) => {
                let data = { ...docu.data() };
                items.push({ ...data, id: docu.id });
            });
            setLostItems(items);
        } catch (error) {
            setError("Error fetching items: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLostItems();
    }, []);

    const openImage = (image, description, id) => {
        setCurrentImage(image);
        setCurrentDescription(description);
        setCurrId(id);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setCurrentImage(null);
        setCurrentDescription('');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className='flex items-center justify-center'>
                <h1 className ='ml-72 mt-[100px] mb-10 text-2xl font-poppins text-blue-600 font-semibold'>Displaying Found Items at BIT Campus</h1>
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
                                        <button
                                            className='border-2 w-[50px] bg-green-600 font-semibold text-white shadow'
                                            onClick={() => openImage(item.url || '', item.description, item.id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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
                                    <Link to={`/claim/${currId}`}>
                                        <button className="bg-green-500 font-semibold text-white px-4 py-2 rounded-md shadow hover:bg-green-700">
                                            Request Claim
                                        </button>
                                    </Link>

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