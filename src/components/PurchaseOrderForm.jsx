import React, { useEffect } from "react";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PurchaseOrderPdf from "./PurchaseOrderPdf";
import { BlobProvider } from "@react-pdf/renderer";

function PurchaseOrderForm() {
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    address: "",
    poNumber: "",
  });

  const [vendorDetails, setVendorDetails] = useState({
    vendorName: "",
    vendorAddress: "",
  });

  const [shipTo, setShipTo] = useState({
    shipToName: "",
    shipToAddress: "",
  });

  const [items, setItems] = useState([
    {
      name: "",
      quantity: 0,
      price: 0,
    },
  ]);

  const handleCompanyDetails = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleVendorDetails = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setVendorDetails({ ...vendorDetails, [name]: value });
  };

  const handleShippingDetails = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setShipTo({ ...shipTo, [name]: value });
  };

  const handleItemChange = (e, index, field, value) => {
    e.preventDefault();
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        name: "",
        quantity: 0,
        price: 0,
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    if (updatedItems.length === 0) {
      updatedItems.push({
        name: "",
        quantity: 0,
        price: 0,
      });
    }
    setItems(updatedItems);
  };

  const total = () => {
    return items
      .map(({ price, quantity }) => price * quantity)
      .reduce((acc, currValue) => acc + currValue, 0);
  };

  return (
    <div className="flex justify-center p-2 m-4 rounded-xl shadow-md ">
      <div className="w-2/3 p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Purchase Order
        </h1>

        {/* compant details */}
        <div className="flex justify-between flex-grow-1 mb-3">
          <div className="flex flex-col">
            <label
              htmlFor="poNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              PO Number:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              name="poNumber"
              value={companyDetails.poNumber}
              onChange={handleCompanyDetails}
            />
          </div>
        </div>

        <div className="flex justify-between flex-grow-1">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Company Name:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              name="name"
              value={companyDetails.name}
              onChange={handleCompanyDetails}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Address:
            </label>
            <textarea
              typeof="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              name="address"
              value={companyDetails.address}
              onChange={handleCompanyDetails}
            />
          </div>
        </div>

        <hr className="border-gray-300 my-6" />

        {/* vendor details */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vendor</h2>
        <div className="flex justify-between flex-grow-1 mb-3">
          <div className="flex flex-col">
            <label
              htmlFor="vendorName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Compant Name:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              name="vendorName"
              value={vendorDetails.vendorName}
              onChange={handleVendorDetails}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="vendorAddress"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Address:
            </label>
            <textarea
              typeof="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              name="vendorAddress"
              value={vendorDetails.vendorAddress}
              onChange={handleVendorDetails}
            />
          </div>
        </div>

        <hr className="border-gray-300 my-6" />
        {/* shipping details */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ship To</h2>
        <div className="flex justify-between flex-grow-1 mb-3">
          <div className="flex flex-col">
            <label
              htmlFor="shipToName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Compant Name:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              name="shipToName"
              value={shipTo.shipToName}
              onChange={handleShippingDetails}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="shipToAddress"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Address:
            </label>
            <textarea
              typeof="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              name="shipToAddress"
              value={shipTo.shipToAddress}
              onChange={handleShippingDetails}
            />
          </div>
        </div>

        {/* item details */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Item Details
        </h2>

        <table className="w-full mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2">Item</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Price</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(e, index, "name", e.target.value)
                    }
                  />
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(e, index, "quantity", e.target.value)
                    }
                  />
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(e, index, "price", e.target.value)
                    }
                  />
                </td>
                <td className="py-2 text-center">
                  <p>${item.quantity * item.price}</p>{" "}
                </td>
                <td className="py-2 text-center">
                  <button
                    className="button bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleRemoveItem(index)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddItem}
        >
          Add
        </button>

        <hr className="border-gray-300 my-6" />

        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold">Total:</p>
          <p className="text-lg font-bold">{total()}</p>
        </div>

        <hr className="border-gray-300 my-6" />

        {/* <PDFDownloadLink
          document={
            <PurchaseOrderPdf
              companyDetails={companyDetails}
              vendorDetails={vendorDetails}
              shipTo={shipTo}
              total={total}
              items={items}
            />
          }
          fileName="purchaseOrder.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading..."
            ) : (
              <button className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Download PO
              </button>
            )
          }
        </PDFDownloadLink> */}

        <BlobProvider
          document={
            <PurchaseOrderPdf
              companyDetails={companyDetails}
              vendorDetails={vendorDetails}
              shipTo={shipTo}
              total={total}
              items={items}
            />
          }
        >
          {({ blob, url, loading, error }) => (
            <div className="flex gap-2">
              <a
                className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview
              </a>
              <PDFDownloadLink
                document={
                  <PurchaseOrderPdf
                    companyDetails={companyDetails}
                    vendorDetails={vendorDetails}
                    shipTo={shipTo}
                    total={total}
                    items={items}
                  />
                }
                fileName="purchaseOrder.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    "Loading..."
                  ) : (
                    <button className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Download
                    </button>
                  )
                }
              </PDFDownloadLink>
            </div>
          )}
        </BlobProvider>
      </div>
    </div>
  );
}

export default PurchaseOrderForm;
