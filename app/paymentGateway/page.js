"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const App = () => {
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");
  const transaction_uuid = searchParams.get("uuid"); // Generate a unique transaction UUID
  const currentUrl = typeof window !== "undefined" ? window.location.origin : "";
 
  const [formData, setformData] = useState({
    amount: `${amount}`,
    tax_amount: "0",
    total_amount: `${amount}`,
    transaction_uuid: transaction_uuid,
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: `${currentUrl}/api/addPayment`,
    failure_url: `${currentUrl}/api/addPayment`,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const hashedSignature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      secret
    );
    setformData({ ...formData, signature: hashedSignature });
  }, [formData.amount]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        className="bg-white w-[350px] p-6 rounded-xl shadow-lg"
      >
        <p className="text-center text-2xl font-semibold mb-4">Checkout</p>
        <div className="container">Use these esewa credentials<br/> (Testing Credentials):<br/> <br/>
        Esewa ID: 9806800001<br/>
        Password: Nepal@123<br/>
        OTP/TOKEN: 123456 <br/><br/></div>
        <div className="mb-4 flex flex-col">

          <input
            type="text"
            id="amount"
            name="amount"
            autoComplete="off"
            className="hidden"
            value={formData.amount}
            onChange={({ target }) =>
              setformData({
                ...formData,
                amount: target.value,
                total_amount: target.value,
              })
            }
            required
          />
          <div>Amount: Rs {amount}</div>
        </div>

        {/* Hidden Inputs */}
        <input type="hidden" id="tax_amount" name="tax_amount" value={formData.tax_amount} required />
        <input type="hidden" id="total_amount" name="total_amount" value={formData.total_amount} required />
        <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={formData.transaction_uuid} required />
        <input type="hidden" id="product_code" name="product_code" value={formData.product_code} required />
        <input type="hidden" id="product_service_charge" name="product_service_charge" value={formData.product_service_charge} required />
        <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={formData.product_delivery_charge} required />
        <input type="hidden" id="success_url" name="success_url" value={formData.success_url} required />
        <input type="hidden" id="failure_url" name="failure_url" value={formData.failure_url} required />
        <input type="hidden" id="signed_field_names" name="signed_field_names" value={formData.signed_field_names} required />
        <input type="hidden" id="signature" name="signature" value={formData.signature} required />

        <input
          className="w-full bg-black text-white py-2 px-4 rounded-md mt-4 cursor-pointer hover:bg-gray-800 transition"
          value="Pay via E-Sewa"
          type="submit"
        />
      </form>
    </div>
  );
};

export default App;
