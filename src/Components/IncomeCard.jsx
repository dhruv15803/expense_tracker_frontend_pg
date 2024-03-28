import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { FaEdit, FaTrash } from "react-icons/fa";

const IncomeCard = ({
  title,
  amount,
  date,
  categoryid,
  incomeCategories,
  id,
  incomes,
  setIncomes,
  deleteIncome,
}) => {
  const [incomeCategoryName, setIncomeCategoryName] = useState("");
  const [newIncomeTitle, setNewIncomeTitle] = useState("");
  const [newIncomeAmount, setNewIncomeAmount] = useState(0);
  const [newIncomeCategory, setNewIncomeCategory] = useState("");
  const [newIncomeDate, setNewIncomeDate] = useState("");
  const [isEditIncome, setIsEditIncome] = useState(false);
  const [incomeEditId, setIncomeEditId] = useState(null);
  const [editIncomeErrorMsg, setEditIncomeErrorMsg] = useState("");

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

  const editIncomeItem = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/income/edit`,
        {
          incomeid: incomeEditId,
          newIncomeTitle,
          newIncomeAmount,
          newIncomeCategory,
          newIncomeDate,
        },
        { withCredentials: true }
      );
      console.log(response);
      const newIncomes = incomes.map((income) => {
        if (income.incomeid === incomeEditId) {
          return response.data.newIncome;
        } else {
          return income;
        }
      });
      setIncomes(newIncomes);

      setNewIncomeTitle("");
      setNewIncomeAmount(0);
      setNewIncomeCategory("");
      setNewIncomeDate("");
      setIsEditIncome(false);
      setIncomeEditId(null);
    } catch (error) {
      console.log(error);
      setEditIncomeErrorMsg(error.response.data.message);
      setTimeout(() => {
        setEditIncomeErrorMsg("");
      }, 3000);
    }
  };

  const editIncome = (id) => {
    setIsEditIncome(true);
    setIncomeEditId(id);
    setNewIncomeTitle(title);
    setNewIncomeAmount(amount);
    setNewIncomeCategory(incomeCategoryName);
    setNewIncomeDate(date.slice(0, 10));
  };

  useEffect(() => {
    getIncomeCategoryNameById();
  }, [incomes]);

  return (
    <>
      <div className="flex flex-col p-2 border-2 rounded-lg text-lg shadow-lg gap-2">
        <div className="flex items-center">
          <div className="flex flex-wrap items-center w-[45%] font-semibold">
            {isEditIncome ? (
              <input
                className="border-2 rounded-lg p-2"
                value={newIncomeTitle}
                onChange={(e) => setNewIncomeTitle(e.target.value)}
                type="text"
                name="newIncomeTitle"
              />
            ) : (
              <p>{title}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center w-[20%]">
            {isEditIncome ? (
              <input
                className="border-2 rounded-lg p-2"
                value={newIncomeAmount}
                onChange={(e) => setNewIncomeAmount(e.target.value)}
                type="number"
                name="newIncomeAmount"
              />
            ) : (
              <p>Rs {amount}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center w-[15%]">
            {isEditIncome ? (
              <>
                <select
                  value={newIncomeCategory}
                  onChange={(e) => setNewIncomeCategory(e.target.value)}
                  className="border-2 rounded-lg p-2"
                  name="newIncomeCategory"
                >
                  {incomeCategories.map((category) => {
                    return (
                      <option
                        key={category.incomecategoryid}
                        value={category.categoryname}
                      >
                        {category.categoryname}
                      </option>
                    );
                  })}
                </select>
              </>
            ) : (
              <p>{incomeCategoryName}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center">
            {isEditIncome ? (
              <input
                className="border-2 rounded-lg p-2"
                value={newIncomeDate}
                onChange={(e) => setNewIncomeDate(e.target.value)}
                type="date"
                name="newIncomeDate"
              />
            ) : (
              <p>{date.slice(0, 10).replaceAll("-", "/")}</p>
            )}
          </div>
        </div>
        {isEditIncome ? (
          <>
            <div className="text-red-500">{editIncomeErrorMsg}</div>
            <div className="flex items-center gap-2">
              <button
                className="border-2 rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300 p-2"
                onClick={() => setIsEditIncome(false)}
              >
                Cancel
              </button>
              <button
                className="border-2 rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300 p-2"
                onClick={editIncomeItem}
              >
                Edit
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={() => deleteIncome(id)} className="text-2xl">
              <FaTrash />
            </button>
            <button onClick={() => editIncome(id)} className="text-2xl">
              <FaEdit />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default IncomeCard;
