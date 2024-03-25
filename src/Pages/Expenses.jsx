import React, { useContext, useEffect, useState } from "react";
import { GlobalContext, backendUrl } from "../App";
import axios from "axios";
import ExpenseCard from "../Components/ExpenseCard";

const Expenses = () => {
  const [expenseCategoryName, setExpenseCategoryName] = useState("");
  const [addExpenseCategoryNameMsg, setAddExpenseCategoryMsg] = useState({});
  const [addExpenseMsg, setAddExpenseMsg] = useState({});
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseDate, setExpenseDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [isAddExpense, setIsAddExpense] = useState(false);
  const [expenseFilterCategoryId, setExpenseFilterCategoryId] =
    useState("none");
  const [sortByExpenseAmount, setSortByExpenseAmount] = useState(0);

  const addExpenseCategory = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/expense/addCategory`,
        {
          expenseCategoryName,
        },
        { withCredentials: true }
      );
      console.log(response);
      setExpenseCategoryName("");
      setExpenseCategories((prevExpenseCategories) => {
        return [...prevExpenseCategories, response.data.expenseCategory];
      });
      setAddExpenseCategoryMsg(response.data);
      setTimeout(() => {
        setAddExpenseCategoryMsg("");
      }, 3000);
    } catch (error) {
      console.log(error);
      setAddExpenseCategoryMsg(error.response.data);
      setTimeout(() => {
        setAddExpenseCategoryMsg("");
      }, 3000);
    }
  };

  const addExpense = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/expense/add`,
        {
          expenseTitle,
          expenseAmount,
          expenseDate,
          expenseCategory,
        },
        { withCredentials: true }
      );
      console.log(response);
      setAddExpenseMsg(response.data);
      setTimeout(() => {
        setAddExpenseMsg("");
      }, 3000);
      setExpenses((prevExpenses) => {
        return [...prevExpenses, response.data.expense];
      });
      setExpenseTitle("");
      setExpenseAmount(0);
      setExpenseDate("");
      setExpenseCategory(expenseCategories[0].categoryname);
    } catch (error) {
      console.log(error);
      setAddExpenseMsg(error.response.data);
      setTimeout(() => {
        setAddExpenseMsg("");
      }, 3000);
    }
  };

  const deleteExpense = async (expenseid) => {
    try {
      const response = await axios.post(
        `${backendUrl}/expense/delete`,
        {
          expenseid,
        },
        { withCredentials: true }
      );
      console.log(response);
      const newExpenses = expenses.filter(
        (expense) => expense.expenseid !== expenseid
      );
      setExpenses(newExpenses);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSortedExpenses = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/expense/getAllSortedExpenses`,
        {
          sortByExpenseAmount,
        },
        { withCredentials: true }
      );
      console.log(response);
      setExpenses(response.data.expenses);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllExpenses = async () => {
    try {
      const response = await axios.get(`${backendUrl}/expense/getAllExpenses`, {
        withCredentials: true,
      });
      console.log(response);
      setExpenses(response.data.expenses);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllExpenseCategories = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/expense/getAllExpenseCategories`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setExpenseCategories(response.data.categories);
      setExpenseCategory(response.data.categories[0].categoryname);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(expenseCategory);

  useEffect(() => {
    getAllSortedExpenses();
  }, [sortByExpenseAmount]);

  useEffect(() => {
    getAllExpenseCategories();
    getAllExpenses();
  }, []);

  return (
    <>
      <div className="mx-10 my-4 text-blue-500">
        <button onClick={() => setIsAddExpense(!isAddExpense)}>
          {isAddExpense ? "Cancel" : "Add expense"}
        </button>
      </div>
      {isAddExpense && (
        <div className="border-2 rounded-lg shadow-lg p-4 flex flex-col mx-10">
          <h1 className="text-xl text-blue-500 font-semibold my-2">
            Add expense category
          </h1>
          <form
            onSubmit={addExpenseCategory}
            className="flex items-center gap-2"
          >
            <input
              value={expenseCategoryName}
              onChange={(e) => setExpenseCategoryName(e.target.value)}
              className="border-2 rounded-lg p-2"
              type="text"
              name="expenseCategoryName"
              id="expenseCategoryName"
              placeholder="eg: entertainment"
            />
            <button className="border-2 p-2 rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">
              Add category
            </button>
          </form>
          <div>
            {addExpenseCategoryNameMsg.success ? (
              <p className="text-blue-500">
                {addExpenseCategoryNameMsg.message}
              </p>
            ) : (
              <p className="text-red-500">
                {addExpenseCategoryNameMsg.message}
              </p>
            )}
          </div>
          <h1 className="text-xl text-blue-500 font-semibold my-2">
            Add expense
          </h1>
          <form onSubmit={addExpense} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-lg" htmlFor="expenseTitle">
                Enter expense title
              </label>
              <input
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                className="border-2 rounded-lg p-2"
                type="text"
                name="expenseTitle"
                id="expenseTitle"
                placeholder="eg: movie tickets"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="expenseAmount">Enter amount (in Rs)</label>
              <input
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="border-2 rounded-lg p-2"
                type="number"
                name="expenseAmount"
                id="expenseAmount"
                placeholder="eg: 1250"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="expenseDate">Enter date</label>
              <input
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="border-2 rounded-lg p-2"
                type="date"
                name="expenseDate"
                id="expenseDate"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="expenseCategory">Select category</label>
              <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                className="border-2 rounded-lg p-2"
                name="expenseCategory"
                id="expenseCategory"
              >
                {expenseCategories?.map((category) => {
                  return (
                    <option
                      key={category.expensecategoryid}
                      value={category.categoryname}
                    >
                      {category.categoryname}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              {addExpenseMsg.success ? (
                <p className="text-blue-500">{addExpenseMsg.message}</p>
              ) : (
                <p className="text-red-500">{addExpenseMsg.message}</p>
              )}
            </div>
            <button className=" my-4 border-2 p-2 rounded-lg border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:duration-300">
              Add
            </button>
          </form>
        </div>
      )}
      <div className="m-10 flex flex-col gap-2 p-4">
        <h1 className="text-xl text-blue-500 font-semibold">Your expenses</h1>
        {expenses.length !== 0 ? (
          <>
            <div className="border-2 rounded-lg p-2 flex items-center gap-8">
              <div className="flex items-center gap-2">
                <p>Filter by category</p>
                <select
                  className="border-2 rounded-lg p-2"
                  value={expenseFilterCategoryId}
                  onChange={(e) => setExpenseFilterCategoryId(e.target.value)}
                  name="expenseFilterCategoryId"
                >
                  <option value="none">none</option>
                  {expenseCategories?.map((item, i) => {
                    return (
                      <option
                        key={item.expensecategoryid}
                        value={item.expensecategoryid}
                      >
                        {item.categoryname}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <p>Sort by amount</p>
                <select
                  value={sortByExpenseAmount}
                  onChange={(e) => setSortByExpenseAmount(e.target.value)}
                  className="border-2 rounded-lg p-2"
                >
                  <option value={0}>none</option>
                  <option value={1}>low to high</option>
                  <option value={-1}>high to low</option>
                </select>
              </div>
            </div>
            {expenses
              ?.filter((expense) => {
                if (expenseFilterCategoryId === "none") {
                  return expense;
                } else {
                  return expense.expensecategoryid === expenseFilterCategoryId;
                }
              })
              ?.map((expense) => {
                return (
                  <ExpenseCard
                    key={expense.expenseid}
                    deleteExpense={deleteExpense}
                    expenseid={expense.expenseid}
                    title={expense.expensetitle}
                    amount={expense.expenseamount}
                    categoryid={expense.expensecategoryid}
                    date={expense.expensedate}
                    expenseCategories={expenseCategories}
                    expenses={expenses}
                    setExpenses={setExpenses}
                  />
                );
              })}
            {expenses?.filter((expense) => {
              if (expenseFilterCategoryId === "none") {
                return expense;
              } else {
                return expense.expensecategoryid === expenseFilterCategoryId;
              }
            }).length === 0 && (
              <div className="my-20 flex justify-center text-4xl text-blue-400">
                You have no expenses in this category
              </div>
            )}
          </>
        ) : (
          <div className="my-20 flex justify-center text-4xl text-blue-400">
            You have no expenses
          </div>
        )}
      </div>
    </>
  );
};

export default Expenses;
