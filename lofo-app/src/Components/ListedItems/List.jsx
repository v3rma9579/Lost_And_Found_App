import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../HomePage/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const List = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false); 
    const [currentImage, setCurrentImage] = useState(null);
    const [currentDescription, setCurrentDescription] = useState('');
    const [currentItemId, setCurrentItemId] = useState(null);
    const [currentCollection, setCurrentCollection] = useState(''); 
    const [missingItems, setMissingItems] = useState([]);
    const [foundItems, setFoundItems] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchUserIdByName = async (name) => {
        const snapshot = await getDocs(collection(db, 'Users'));
        const userData = snapshot.docs.find((doc) => {
            const data = doc.data();
            return `${data.firstName} ${data.lastName}` === name;
        });
        return userData ? userData.id : null;
    };

    const fetchMissingItems = async () => {
        const querySnapshot = await getDocs(collection(db, 'lostItems'));
        const items = [];
        for (const doc of querySnapshot.docs) {
            const data = { ...doc.data() };
            const reportedByUserId = await fetchUserIdByName(data.reportedBy);
            if (reportedByUserId === userId) {
                items.push({ ...data, id: doc.id });
            }
        }
        setMissingItems(items);
    };

    const fetchFoundItems = async () => {
        const querySnapshot = await getDocs(collection(db, 'foundItems'));
        const items = [];
        for (const doc of querySnapshot.docs) {
            const data = { ...doc.data() };
            const reportedByUserId = await fetchUserIdByName(data.reportedBy);
            if (reportedByUserId === userId) {
                items.push({ ...data, id: doc.id });
            }
        }
        setFoundItems(items);
    };

    useEffect(() => {
        if (userId) {
            fetchMissingItems();
            fetchFoundItems();
        }
    }, [userId]);

    const openImage = (image, description, id) => {
        setCurrentImage(image);
        setCurrentDescription(description);
        setCurrentItemId(id);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setCurrentImage(null);
        setCurrentDescription('');
        setCurrentItemId(null);
    };

    const handleDelete = async () => {
        if (currentItemId && currentCollection) {
            await deleteDoc(doc(db, currentCollection, currentItemId));
            // Update local state
            if (currentCollection === 'lostItems') {
                setMissingItems((prevItems) => prevItems.filter((item) => item.id !== currentItemId));
            } else if (currentCollection === 'foundItems') {
                setFoundItems((prevItems) => prevItems.filter((item) => item.id !== currentItemId));
            }
            setIsConfirmOpen(false); // Close confirmation dialog
            setCurrentItemId(null); // Reset the current item ID
            setCurrentCollection(''); // Reset the collection
        }
    };

    const confirmDelete = (id, collection) => {
        setCurrentItemId(id);
        setCurrentCollection(collection);
        setIsConfirmOpen(true); // Open confirmation dialog
    };

    return (
        <>
            <div className='flex flex-col items-center'>
                <h1 className='text-2xl font-semibold mt-[100px] text-blue-600 mb-8'>Your Registered Items</h1>

                {/* Missing Items Table */}
                <h2 className='text-xl font-semibold text-gray-700 mb-4'>Your Listed Missing Items</h2>
                <div className='ml-[300px]'>
                    <table className="w-[1200px] table-auto border-2 mb-10">
                        <thead>
                            <tr className="text-center bg-gray-800 text-white h-12">
                                <th className="pb-2">Item Name</th>
                                <th className="pb-2">Landmark</th>
                                <th className="pb-2">Date Lost</th>
                                <th className="pb-2">Status</th>
                                <th className="pb-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {missingItems.map((item) => (
                                <tr key={item.id} className="border-t text-center">
                                    <td className="py-2">{item.itemName}</td>
                                    <td className="py-2">{item.landmark}</td>
                                    <td className="py-2">{item.dateLost}</td>
                                    <td className="py-2">
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-white ${item.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                                }`}
                                        >
                                            {item.status === 'completed' ? 'Completed' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-2">
                                        <button
                                            className='border-2 w-[50px] bg-green-600 font-semibold text-white shadow'
                                            onClick={() => openImage(item.url, item.description || 'No description available', item.id)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className='border-2 w-[50px] bg-red-600 font-semibold text-white shadow'
                                            onClick={() => confirmDelete(item.id, 'lostItems')}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Found Items Table */}
                <h2 className='text-xl font-semibold text-gray-700 mb-4'>Your Listed Found Items</h2>
                <div className='ml-[300px]'>
                    <table className="w-[1200px] table-auto border-2">
                        <thead>
                            <tr className="text-center bg-gray-800 text-white h-12">
                                <th className="pb-2">Item Name</th>
                                <th className="pb-2">Landmark</th>
                                <th className="pb-2">Date Found</th>
                                <th className="pb-2">Status</th>
                                <th className="pb-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foundItems.map((item) => (
                                <tr key={item.id} className="border-t text-center">
                                    <td className="py-2">{item.itemName}</td>
                                    <td className="py-2">{item.landmark}</td>
                                    <td className="py-2">{item.dateFound}</td>
                                    <td className="py-2">
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-white ${item.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                                                }`}
                                        >
                                            {item.status === 'completed' ? 'Completed' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-2">
                                        <button
                                            className='border-2 w-[50px] bg-green-600 font-semibold text-white shadow'
                                            onClick={() => openImage(item.url, item.description || 'No description available', item.id)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className='border-2 w-[50px] bg-red-600 font-semibold text-white shadow'
                                            onClick={() => confirmDelete(item.id, 'foundItems')}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Viewing Item Details */}
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
                                <button className="bg-red-500 font-semibold text-white px-4 py-2 rounded-md shadow hover:bg-red-700" onClick={closeModal}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Confirmation Modal */}
            {isConfirmOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded-md shadow-md text-center">
                        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this item?</p>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                            onClick={handleDelete}
                        >
                            Yes, Delete
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                            onClick={() => setIsConfirmOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
