import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../HomePage/firebase';
import { useParams } from 'react-router-dom';

export const OwnerData = () => {
      const [lostItem, setLostItem] = useState(null);
      const [reportPerson, setReportPerson] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const { itemId } = useParams();

      const fetchLostItem = async () => {
            try {
                  const docRef = doc(db, 'lostItems', itemId);
                  const docSnap = await getDoc(docRef);

                  if (docSnap.exists()) {
                        const data = { ...docSnap.data(), id: itemId };
                        setLostItem(data);

                        if (docSnap.data().reportedBy) {
                              fetchReporterDetails(data.reportedBy);
                        }
                  } else {
                        setError("No such document found.");
                  }
            } catch (error) {
                  setError("Error fetching item: " + error.message);
            } finally {
                  setLoading(false);
            }
      };

      const fetchReporterDetails = async (reporterId) => {
            const [firstName, lastName] = reporterId.trim().split(/\s+/);

            const userRef = collection(db, 'Users');
            const queryReport = query(userRef, where("firstName", "==", firstName));

            try {
                  const snapshot = await getDocs(queryReport);

                  if (!snapshot.empty) {
                        const userData = snapshot.docs.map(doc => doc.data());
                        setReportPerson(userData[0]);
                  } else {
                        console.log("No user found for the given name.");
                  }
            } catch (error) {
                  console.error("Error fetching reporter details:", error);
            }
      };


      useEffect(() => {
            fetchLostItem();
      }, [itemId]);

      if (loading) {
            return <p className="text-center text-base font-medium mt-6">Loading...</p>;
      }

      if (error) {
            return <p className="text-center text-red-500 font-medium mt-6">{error}</p>;
      }

      return (
            <div className="ml-80 container mx-auto mt-[100px] px-4">
                  <h1 className="text-3xl font-bold text-center text-red-600 mb-8">Item Owner Details</h1>
                  <div className="flex flex-col lg:flex-row gap-8">
                        {/* Lost Item Details */}
                        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                              {lostItem?.url && (
                                    <img
                                          src={lostItem.url}
                                          alt={lostItem.itemName || "Lost item"}
                                          className="w-full h-64 object-contain mb-6 rounded-lg"
                                    />
                              )}
                              <h2 className="text-2xl font-semibold mb-4">Item Details</h2>
                              <p className="text-gray-800 text-base mb-2"><strong>Item Name:</strong> {lostItem.itemName}</p>
                              <p className="text-gray-800 text-base mb-2"><strong>Landmark:</strong> {lostItem.landmark}</p>
                              <p className="text-gray-800 text-base mb-2"><strong>Date Lost:</strong> {lostItem.dateFound}</p>
                              <p className="text-gray-800 text-base mb-2"><strong>Time Lost:</strong> {lostItem.timeFound}</p>
                              <p className="text-gray-800 text-base mb-2"><strong>Description:</strong> {lostItem.description}</p>
                              <p className="text-gray-800 text-base"><strong>Reported By:</strong> {lostItem.reportedBy}</p>
                        </div>

                        {/* Reporter Details */}
                        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                              <h2 className="text-2xl font-semibold mb-4">Reporter Details</h2>
                              {reportPerson !== null ? (
                                    <div>
                                          <p className="text-gray-800 text-base mb-2"><strong>Name:</strong> {reportPerson?.firstName} {reportPerson?.lastName}</p>
                                          <p className="text-gray-800 text-base mb-2"><strong>Email:</strong> {reportPerson?.email}</p>
                                          <p className="text-gray-800 text-base mb-2"><strong>Phone:</strong> {reportPerson?.phone || 'Not Provided'}</p>
                                          <p className="text-gray-800 text-base"><strong>Address:</strong> {reportPerson?.address || 'Not Provided'}</p>
                                    </div>
                              ) : (
                                    <p className="text-gray-800 text-base">No reporter details available.</p>
                              )}
                        </div>
                  </div>

                  {/* Claim Button */}
                  <div className="flex justify-center mt-8">
                        <button className="w-40 h-12 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-md shadow-md transition-all duration-200">
                              Return Item
                        </button>
                  </div>
            </div>
      );
};
