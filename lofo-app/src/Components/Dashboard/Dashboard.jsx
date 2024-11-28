import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, setDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../HomePage/firebase";
import { getAuth } from "firebase/auth";

export const Dashboard = () => {
  const [allItems, setAllItems] = useState([]);
  const [userRegisteredCount, setUserRegisteredCount] = useState(0);
  const [totalItemsSize, setTotalItemsSize] = useState(0); 
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const mergeCollectionsRealtime = () => {
    try {
      const lostItemsRef = collection(db, "lostItems");
      onSnapshot(lostItemsRef, (lostSnapshot) => {
        const lostItems = lostSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          itemType: "lost",
        }));

        const foundItemsRef = collection(db, "foundItems");
        onSnapshot(foundItemsRef, async (foundSnapshot) => {
          const foundItems = foundSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            itemType: "found",
          }));

          const mergedData = [...lostItems, ...foundItems];

          const promises = mergedData.map((item) =>
            setDoc(doc(db, "allItems", item.id), item)
          );
          await Promise.all(promises);

          setAllItems(mergedData);

          if (currentUser) {
            const registeredByUser = mergedData.filter(
              (item) => item.reportedBy === currentUser.displayName
            );
            setUserRegisteredCount(registeredByUser.length);
          }
        });
      });
    } catch (error) {
      console.error("Error in real-time merging and fetching:", error);
    }
  };

  const getCollectionSize = async () => {
    try {
      const docRef = collection(db, "allItems");
      const snap = await getDocs(docRef);
      setTotalItemsSize(snap.size); 
    } catch (error) {
      console.error("Error fetching collection size:", error);
    }
  };

  useEffect(() => {
    mergeCollectionsRealtime();
    getCollectionSize();
  }, [currentUser]);

  return (
    <>
      <div className="hidden md:block">
        <main className="pt-16 px-6 flex-1 h-screen overflow-auto bg-gray-50 ml-72 font-poppins">
          <div className="flex items-center justify-between mb-8 mt-10">
            <h1 className="text-2xl font-semibold font-poppins">User Dashboard</h1>
          </div>

          <div className="flex flex-col md:flex-row md:gap-20 gap-5 mb-20 p-5 items-start">
            <Link to="/listed">
              <div className="bg-blue-600 p-6 h-[200px] w-[300px] rounded-md flex flex-col justify-around shadow-xl transition duration-300 hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Your Registered Items</h3>
                </div>
                <h1 className="text-4xl font-bold text-white">{userRegisteredCount}</h1>
                <button className="bg-white flex items-center h-8 justify-center border-2 rounded-full">
                  View
                </button>
              </div>
            </Link>

            
            <Link to="/total">
            <div className="bg-orange-600 p-6 h-[200px] w-[300px] rounded-md flex flex-col justify-around shadow-xl transition duration-300 hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white font-poppins">Total Missing Items</h3>
              </div>
              <h1 className="text-4xl font-bold text-white">{totalItemsSize}</h1>
              <button className="bg-white flex items-center h-8 justify-center border-2 rounded-full">
                View
              </button>
            </div>
            </Link>


            <div className="card bg-green-700 p-6 h-[200px] w-[300px] rounded-md flex flex-col justify-around shadow-xl transition duration-300 hover:scale-105 cursor-pointer">
              <div className="card-inner flex items-center justify-between">
                <h3 className="font-semibold text-white">Total Claimed Items</h3>
              </div>
              <h1 className="text-4xl font-bold text-white">20</h1>
              <button className="bg-white flex items-center h-8 justify-center border-2 rounded-full">
                View
              </button>
            </div>
          </div>

          <div className="bg-white p-4">
            <h3 className="font-semibold mb-4 text-gray-700">Displaying Most Recent Lost/Found Items</h3>
            <table className="w-full table-auto border-2">
              <thead>
                <tr className="text-left bg-gray-800 text-white h-12">
                  <th className="p-2">Item Name</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Landmark</th>
                  <th className="p-2">Reported By</th>
                </tr>
              </thead>
              <tbody>
                {allItems.length > 0 ? (
                  allItems.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2">{item.itemName || ""}</td>
                      <td className="p-2 capitalize">{item.itemType}</td>
                      <td className="p-2">{item.landmark || ""}</td>
                      <td className="p-2">
                        <span>
                          {item.reportedBy}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};
