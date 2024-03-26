import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import IncomeCard from "../Components/IncomeCard";

const Income = () => {
  const [incomeCategoryName, setIncomeCategoryName] = useState("");
  const [incomeTitle, setIncomeTitle] = useState("");
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [incomeDate, setIncomeDate] = useState("");
  const [incomeCategory, setIncomeCategory] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [addIncomeCategoryNameMsg, setAddIncomeCategoryNameMsg] = useState({});
  const [addIncomeMsg, setAddIncomeMsg] = useState({});
  const [isAddIncome, setIsAddIncome] = useState(false);

  const addIncomeCategory = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/income/addIncomeCategory`,
        {
          incomeCategoryName,
        },
        { withCredentials: true }
      );
      console.log(response);
      setIncomeCategories((prevIncomeCategories) => {
        return [...prevIncomeCategories, response.data.category];
      });
      setAddIncomeCategoryNameMsg(response.data);
      setTimeout(() => {
        setAddIncomeCategoryNameMsg({});
      }, 3000);
      setIncomeCategoryName("");
    } catch (error) {
      console.log(error);
      setAddIncomeCategoryNameMsg(error.response.data);
      setTimeout(() => {
        setAddIncomeCategoryNameMsg("");
      }, 3000);
    }
  };

  const addIncome = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/income/add`,
        {
          incomeTitle,
          incomeAmount,
          incomeCategory,
          incomeDate,
        },
        { withCredentials: true }
      );
      console.log(response);
      setIncomes((prevIncomes) => {
        return [...prevIncomes, response.data.income];
      });
      setAddIncomeMsg(response.data);
      setTimeout(() => {
        setAddIncomeMsg({});
      }, 3000);
      setIncomeTitle("");
      setIncomeAmount(0);
      setIncomeDate("");
      setIncomeCategory(incomeCategories[0].categoryname);
    } catch (error) {
      console.log(error);
      setAddIncomeMsg(error.response.data);
      setTimeout(() => {
        setAddIncomeMsg({});
      }, 3000);
    }
  };

  const getAllIncomes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/income/getAllIncomes`, {
        withCredentials: true,
      });
      console.log(response);
      setIncomes(response.data.incomes);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllIncomeCategories = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/income/getAllIncomeCategories`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setIncomeCategories(response.data.categories);
      setIncomeCategory(response.data.categories[0].categoryname);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllIncomeCategories();
    getAllIncomes();
  }, []);

  return (
    <>
      <div className="mx-10 my-4 text-blue-500">
        <button onClick={() => setIsAddIncome(!isAddIncome)}>
          {isAddIncome ? "Cancel" : "Add income"}
        </button>
      </div>
      {isAddIncome && (
        <div className="border-2 rounded-lg shadow-lg p-4 flex flex-col mx-10">
          <h1 className="text-xl text-blue-500 font-semibold my-2">
            Add income category
          </h1>
          <form
            onSubmit={addIncomeCategory}
            className="flex items-center gap-2"
          >
            <input
              value={incomeCategoryName}
              onChange={(e) => setIncomeCategoryName(e.target.value)}
              className="border-2 rounded-lg p-2"
              type="text"
              name="incomeCategoryName"
              id="incomeCategoryName"
              placeholder="eg: real estate"
            />
            <button className="border-2 p-2 rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">
              Add category
            </button>
          </form>
          <div>
            {addIncomeCategoryNameMsg.success ? (
              <p className="text-blue-500">
                {addIncomeCategoryNameMsg.message}
              </p>
            ) : (
              <p className="text-red-500">{addIncomeCategoryNameMsg.message}</p>
            )}
          </div>
          <h1 className="text-xl text-blue-500 font-semibold my-2">
            Add income
          </h1>
          <form onSubmit={addIncome} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-lg" htmlFor="incomeTitle">
                Enter income title
              </label>
              <input
                value={incomeTitle}
                onChange={(e) => setIncomeTitle(e.target.value)}
                className="border-2 rounded-lg p-2"
                type="text"
                name="incomeTitle"
                id="incomeTitle"
                placeholder="eg: movie tickets"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="incomeAmount">Enter amount (in Rs)</label>
              <input
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                className="border-2 rounded-lg p-2"
                type="number"
                name="incomeAmount"
                id="incomeAmount"
                placeholder="eg: 1250"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="incomeDate">Enter date</label>
              <input
                value={incomeDate}
                onChange={(e) => setIncomeDate(e.target.value)}
                className="border-2 rounded-lg p-2"
                type="date"
                name="incomeDate"
                id="incomeDate"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="incomeCategory">Select category</label>
              <select
                value={incomeCategory}
                onChange={(e) => setIncomeCategory(e.target.value)}
                className="border-2 rounded-lg p-2"
                name="incomeCategory"
                id="incomeCategory"
              >
                {incomeCategories?.map((category) => {
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
            </div>
            <div>
              {addIncomeMsg.success ? (
                <p className="text-blue-500">{addIncomeMsg.message}</p>
              ) : (
                <p className="text-red-500">{addIncomeMsg.message}</p>
              )}
            </div>
            <button className=" my-4 border-2 p-2 rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">
              Add
            </button>
          </form>
        </div>
      )}
      <div className="flex flex-col m-10 p-4 gap-2">
        <h1 className="text-blue-500 font-semibold text-xl">Your income</h1>
        {incomes?.map((income) => {
          return (
            <IncomeCard
              key={income.incomeid}
              title={income.incometitle}
              categoryid={income.incomecategoryid}
              amount={income.incomeamount}
              date={income.incomedate}
              incomeCategories={incomeCategories}
            />
          );
        })}
      </div>
    </>
  );
};

export default Income;
