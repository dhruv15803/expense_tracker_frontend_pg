import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";

const IncomeCard = ({ title, amount, date, categoryid,incomeCategories }) => {
  const [incomeCategoryName, setIncomeCategoryName] = useState("");

  const getIncomeCategoryNameById = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/income/getIncomeCategoryNameById`,
        {
          categoryid,
        },
        { withCredentials: true }
      );
      console.log(response);
      setIncomeCategoryName(response.data.categoryname);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIncomeCategoryNameById();
  }, []);

  return (
    <>
      <div className="flex flex-col p-2 border-2 rounded-lg text-lg shadow-lg gap-2">
        <div className="flex items-center">
          <div className="flex flex-wrap items-center w-[45%] font-semibold">
            <p>{title}</p>
          </div>
          <div className="flex flex-wrap items-center w-[20%]">
            <p>Rs {amount}</p>
          </div>
          <div className="flex flex-wrap items-center w-[15%]">
            <p>{incomeCategoryName}</p>
          </div>
          <div className="flex flex-wrap items-center">
            <p>{date.slice(0,10).replaceAll('-','/')}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomeCard;
