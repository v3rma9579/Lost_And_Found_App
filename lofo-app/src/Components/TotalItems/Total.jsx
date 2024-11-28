import { React, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../HomePage/firebase";

export const Total = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  // Fetch items from Firestore
  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "allItems"));
      const items = [];
      querySnapshot.forEach((docu) => {
        let data = { ...docu.data() };
        items.push({ ...data, id: docu.id });
      });
      setAllItems(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Open modal with item details
  const openImage = (image, description, status) => {
    setCurrentImage(image || ""); // Fallback for missing image URL
    setCurrentDescription(description || "No description available.");
    setCurrentStatus(status || "Unknown");
    setIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsOpen(false);
    setCurrentImage(null);
    setCurrentDescription("");
    setCurrentStatus("");
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="ml-72 mt-[100px] mb-10 text-2xl font-poppins text-blue-600 font-semibold">
          Displaying Lost/Found Items at BIT Campus
        </h1>
      </div>
      <div className="ml-72 font-poppins">
        <div className="flex items-center justify-center">
          <table className="w-[1200px] table-auto border-2">
            <thead>
              <tr className="text-center bg-gray-800 text-white h-12">
                <th className="pb-2">Item Name</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Landmark</th>
                <th className="pb-2">Date Found</th>
                <th className="pb-2">Time Found</th>
                <th className="pb-2">Reported By</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allItems.length > 0 ? (
                allItems.map((item) => (
                  <tr key={item.id} className="border-t text-center">
                    <td className="py-2">{item.itemName || "N/A"}</td>
                    <td className="py-2">{item.itemStatus || "Unknown"}</td>
                    <td className="py-2">{item.landmark || "N/A"}</td>
                    <td className="py-2">{item.dateFound || "N/A"}</td>
                    <td className="py-2">{item.timeFound || "N/A"}</td>
                    <td className="py-2">{item.reportedBy || "Anonymous"}</td>
                    <td className="py-2">
                      <button
                        className="border-2 w-[50px] bg-green-600 font-semibold text-white shadow"
                        onClick={() =>
                          openImage(item.url || "", item.description, item.itemStatus)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No items found.
                  </td>
                </tr>
              )}
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
                <div className="bg-green-700 w-full h-10 flex items-center">
                  <span className="ml-5 text-white font-bold">Item Details</span>
                </div>
                {currentImage ? (
                  <img
                    src={currentImage}
                    alt="Full size"
                    className="w-[400px] h-[400px] object-cover mb-4"
                  />
                ) : (
                  <p className="text-gray-600 mb-4">No image available.</p>
                )}
                <div className="mt-5 mb-5">
                  <span>Description: {currentDescription}</span>
                </div>
                <div className="mb-5">
                  <span>Status: {currentStatus}</span>
                </div>
                <div className="flex space-x-4">
                  <button className="bg-green-500 font-semibold text-white px-4 py-2 rounded-md shadow hover:bg-green-700">
                    Request Claim
                  </button>
                  <button
                    className="bg-red-500 font-semibold text-white px-4 py-2 rounded-md shadow hover:bg-red-700"
                    onClick={closeModal}
                  >
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
