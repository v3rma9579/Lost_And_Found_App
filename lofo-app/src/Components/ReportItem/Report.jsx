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
      const [loading, setLoading] = useState(false); // Loading state

      useEffect(() => {
            const userid = auth.currentUser.uid;

            getDoc(doc(db, 'Users', userid)).then((user) => {
                  console.log(user.data().firstName);
                  setReportedBy(user.data().firstName + "  " + user.data().lastName);
            });
      }, []);

      const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true); // Set loading to true when submitting

            console.log(file);

            if (file != null) {
                  const imageName = itemName + Date.now();
                  const imagesRef = ref(storage, `image/${imageName}`);
                  uploadBytes(imagesRef, file).then((snapshot) => {
                        console.log(file);
                        getDownloadURL(snapshot.ref).then((url) => {
                              const formData = {
                                    itemName,
                                    landmark,
                                    dateFound,
                                    timeFound,
                                    description,
                                    reportedBy,
                                    url,
                              };
                              console.log("BYE");
                              setDownloadUrl(url);
                              console.log(url);
                              addDoc(collection(db, 'foundItems'), formData).then((snapshot) => {
                                    toast.success("Item added!", {
                                          position: "top-right"
                                    });
                                    setLoading(false); // Reset loading state after submission
                              });
                        });
                  });
            } else {
                  console.log("HELLO R");
                  setLoading(false); // Reset loading state if no file
            }

            const formData = {
                  itemName,
                  landmark,
                  dateFound,
                  timeFound,
                  description,
                  reportedBy,
            };
            console.log('Form Data Submitted:', formData);
      };

      return (
            <div className='ml-[300px] mt-[100px] font-poppins'>
                  <div className='flex flex-col gap-4 items-center'>
                        <h1 className='text-2xl text-red-600 font-bold'>Report Missing Items</h1>
                        <form className="items-center bg-gray-100 p-6 rounded-lg shadow-lg w-[1000px]" onSubmit={handleSubmit}>
                              <ToastContainer />
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
