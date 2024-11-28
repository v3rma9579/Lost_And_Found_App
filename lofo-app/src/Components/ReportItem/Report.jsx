import { React, useEffect, useState } from 'react';
import { storage } from '../HomePage/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../HomePage/firebase";
import { addDoc, collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../HomePage/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Report = () => {
      const [itemName, setItemName] = useState('');
      const [landmark, setLandmark] = useState('');
      const [dateFound, setDateFound] = useState('');
      const [timeFound, setTimeFound] = useState('');
      const [description, setDescription] = useState('');
      const [file, setFile] = useState(null);
      const [downloadUrl, setDownloadUrl] = useState("");
      const [reportedBy, setReportedBy] = useState("");
      const [loading, setLoading] = useState(false);
      const [itemStatus, setItemStatus] = useState('');

      useEffect(() => {
            const userid = auth.currentUser.uid;

            getDoc(doc(db, 'Users', userid)).then((user) => {
                  setReportedBy(user.data().firstName + " " + user.data().lastName);
            });
      }, []);

      const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);

            const collectionName = itemStatus === 'Lost' ? 'lostItems' : 'foundItems';

            if (file != null) {
                  const imageName = itemName + Date.now();
                  const imagesRef = ref(storage, `image/${imageName}`);
                  uploadBytes(imagesRef, file).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((url) => {
                              const formData = {
                                    itemName,
                                    landmark,
                                    dateFound,
                                    timeFound,
                                    description,
                                    reportedBy,
                                    url,
                                    itemStatus,
                              };
                              setDownloadUrl(url);
                              addDoc(collection(db, collectionName), formData).then(() => {
                                    toast.success("Item added!", {
                                          position: "top-right"
                                    });
                                    setLoading(false);
                              });
                        });
                  });
            } else {
                  setLoading(false);
            }

            const formData = {
                  itemName,
                  landmark,
                  dateFound,
                  timeFound,
                  description,
                  reportedBy,
                  itemStatus,
            };
            console.log('Form Data Submitted:', formData);
      };

      return (
            <div className='ml-[300px] mt-[100px] font-poppins'>
                  <div className='flex flex-col gap-4 items-center'>
                        <h1 className='text-2xl text-red-600 font-bold'>Report Missing / Found Items</h1>
                        <form className="items-center bg-gray-100 p-6 rounded-lg shadow-lg w-[1000px]" onSubmit={handleSubmit}>
                              <ToastContainer />
                              <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Select Item Status*</label>
                                    <select
                                          value={itemStatus}
                                          onChange={(e) => setItemStatus(e.target.value)}
                                          className="border border-gray-300 p-2 w-full"
                                          required
                                    >
                                          <option value="">Select Status</option>
                                          <option value="Lost">Lost</option>
                                          <option value="Found">Found</option>
                                    </select>
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Insert Image* (acceptable filetype: jpeg/png)</label>
                                    <input type="file" accept="image/jpeg,image/png" className="border border-gray-300 p-2 w-full" onChange={(e) => setFile(e.target.files[0])} />
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Item Name*</label>
                                    <input
                                          type="text"
                                          value={itemName}
                                          onChange={(e) => setItemName(e.target.value)}
                                          className="border border-gray-300 p-2 w-full"
                                          placeholder="Item Name"
                                          required
                                    />
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Landmark*</label>
                                    <input
                                          type="text"
                                          value={landmark}
                                          onChange={(e) => setLandmark(e.target.value)}
                                          className="border border-gray-300 p-2 w-full"
                                          placeholder="Enter Landmark"
                                          required
                                    />
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Date Found / Lost*</label>
                                    <input
                                          type="date"
                                          value={dateFound}
                                          onChange={(e) => setDateFound(e.target.value)}
                                          className="border border-gray-300 p-2 w-full"
                                          required
                                    />
                              </div>

                              <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Time Found / Lost*</label>
                                    <input
                                          type="time"
                                          value={timeFound}
                                          onChange={(e) => setTimeFound(e.target.value)}
                                          className="border border-gray-300 p-2 w-full"
                                          required
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
                                          placeholder="Enter description"
                                          required
                                    />
                              </div>

                              <button
                                    type="submit"
                                    className={`bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                              >
                                    {loading ? (
                                          <span className="loader">Submitting...</span>
                                    ) : (
                                          "Submit"
                                    )}
                              </button>
                        </form>
                  </div>
            </div>
      )
};
