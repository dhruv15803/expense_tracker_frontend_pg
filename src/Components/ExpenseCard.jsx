import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ExpenseCard = ({
  title,
  amount,
  date,
  categoryid,
  expenseid,
  deleteExpense,
  expenseCategories,
  expenses,
  setExpenses,
}) => {
  const [expenseCategoryName, setExpenseCategoryName] = useState("");
  const [newExpenseTitle, setNewExpenseTitle] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState(0);
  const [newExpenseCategory, setNewExpenseCategory] = useState("");
  const [newExpenseDate, setNewExpenseDate] = useState("");
  const [expenseEditId, setExpenseEditId] = useState(null);

  const [isEditExpense, setIsEditExpense] = useState(false);

  const getExpenseCategoryNameById = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/expense/getExpenseCategoryNameById`,
        {
          categoryid,
        },
        { withCredentials: true }
      );
      setExpenseCategoryName(response.data.categoryname);
    } catch (error) {
      console.log(error);
    }
  };

  const editExpense = async (expenseid) => {
    setIsEditExpense(true);
    setExpenseEditId(expenseid);
    setNewExpenseTitle(title);
    setNewExpenseAmount(amount);
    setNewExpenseCategory(expenseCategoryName);
    setNewExpenseDate(date.slice(0, 10));
  };

  const editExpenseItem = async (
    expenseid,
    newExpenseTitle,
    newExpenseAmount,
    newExpenseCategory,
    newExpenseDate
  ) => {
    try {
      const response = await axios.post(
        `${backendUrl}/expense/edit`,
        {
          newExpenseAmount,
          newExpenseCategory,
          newExpenseDate,
          newExpenseTitle,
          expenseid,
        },
        { withCredentials: true }
      );
      console.log(response);
      const newExpenses = expenses.map((item) => {
        if(item.expenseid===expenseEditId){
            return response.data.updatedExpense;
        } else {
            return item;
        }
      })
      setExpenses(newExpenses);

      setIsEditExpense(false);
      setNewExpenseTitle("");
      setNewExpenseAmount(0);
      setNewExpenseCategory("");
      setNewExpenseDate("");
      setExpenseEditId(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpenseCategoryNameById();
  }, [expenses]);

  return (
    <>
      <div className="flex flex-col p-2 border-2 rounded-lg text-lg shadow-lg gap-2">
        <div className=" flex items-center">
          <div className="flex flex-wrap w-[45%] font-semibold ">
            {isEditExpense ? (
              <input
                className="border-2 rounded-lg p-2"
                value={newExpenseTitle}
                onChange={(e) => setNewExpenseTitle(e.target.value)}
                type="text"
                name="newExpenseTitle"
              />
            ) : (
              <p>{title}</p>
            )}
          </div>
          <div className="flex flex-wrap w-[20%]">
            {isEditExpense ? (
              <input
                className="border-2 rounded-lg p-2"
                value={newExpenseAmount}
                onChange={(e) => setNewExpenseAmount(e.target.value)}
                type="number"
                name="newExpenseAmount"
              />
            ) : (
              <p>Rs {amount}</p>
            )}
          </div>
          <div className="flex flex-wrap w-[15%]">
            {isEditExpense ? (
              <select
                className="border-2 rounded-lg p-2"
                value={newExpenseCategory}
                onChange={(e) => setNewExpenseCategory(e.target.value)}
                name="newExpenseCategory"
              >
                {expenseCategories?.map((item) => {
                  return (
                    <option
                      key={item.expensecategoryid}
                      value={item.categoryname}
                    >
                      {item.categoryname}
                    </option>
                  );
                })}
              </select>
            ) : (
              <p>{expenseCategoryName}</p>
            )}
          </div>
          <div className="flex flex-wrap">
            {isEditExpense ? (
              <input
                className="border-2 rounded-lg p-2"
                value={newExpenseDate}
                onChange={(e) => setNewExpenseDate(e.target.value)}
                type="date"
                name="newExpenseDate"
              />
            ) : (
              <p>{date.slice(0, 10).replaceAll("-", "/")}</p>
            )}
          </div>
        </div>
        {isEditExpense ? (
          <>
            <div className="flex items-center gap-2">
              <button
                className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
                onClick={() => setIsEditExpense(false)}
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  editExpenseItem(
                    expenseid,
                    newExpenseTitle,
                    newExpenseAmount,
                    newExpenseCategory,
                    newExpenseDate
                  )
                }
                className="border-2 rounded-lg p-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300"
              >
                Edit
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={() => deleteExpense(expenseid)}
              className="text-2xl"
            >
              <FaTrash />
            </button>
            <button onClick={() => editExpense(expenseid)} className="text-2xl">
              <FaEdit />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ExpenseCard;
