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
  const [incomeFilterCategoryId, setIncomeFilterCategoryId] = useState("none");
  const [sortByIncomeAmount, setSortByIncomeAmount] = useState(0);
  const [sortByIncomeDate, setSortByIncomeDate] = useState(0);
  const [totalIncome,setTotalIncome] = useState(0);
  const [isSortByAmount,setIsSortByAmount] = useState(true);
  const [isSortByDate,setIsSortByDate] = useState(false);


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

  const deleteIncome = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/income/delete`,
        {
          incomeid: id,
        },
        { withCredentials: true }
      );
      console.log(response);
      const newIncomes = incomes.filter((income) => income.incomeid !== id);
      setIncomes(newIncomes);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSortedIncomes = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/income/getAllSortedIncomes`,
        {
          sortByIncomeAmount,
        },
        { withCredentials: true }
      );
      console.log(response);
      setIncomes(response.data.incomes);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSortedIncomesByDate = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/income/getAllSortedIncomesByDate`,
        {
          sortByIncomeDate,
        },
        { withCredentials: true }
      );
      console.log(response);
      setIncomes(response.data.incomes);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalIncome = () => {
    let total = 0;
    for(let i = 0;i<incomes.length;i++){
      if(incomeFilterCategoryId==="none"){
        total = total + incomes[i].incomeamount;
      } else {
        if(incomes[i].incomecategoryid===incomeFilterCategoryId){
          total = total + incomes[i].incomeamount;
        } else {
          continue;
        }
      }
    }
    setTotalIncome(total);
  }


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
    getAllSortedIncomes();
  }, [sortByIncomeAmount]);

  useEffect(() => {
    getAllSortedIncomesByDate();
  }, [sortByIncomeDate]);

  useEffect(()=>{
    getTotalIncome();
  },[incomes,incomeFilterCategoryId])

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
        {incomes.length !== 0 && (
          <div className="border-2 rounded-lg p-2 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <p>Filter by category</p>
              <select
                className="border-2 rounded-lg p-2"
                value={incomeFilterCategoryId}
                onChange={(e) => setIncomeFilterCategoryId(e.target.value)}
                name="incomeFilterCategoryId"
              >
                <option value="none">none</option>
                {incomeCategories.map((category) => {
                  return (
                    <option
                      key={category.incomecategoryid}
                      value={category.incomecategoryid}
                    >
                      {category.categoryname}
                    </option>
                  );
                })}
              </select>
            </div>
            {isSortByDate && <div className="flex items-center gap-2">
              <p>Sort by amount</p>
              <input checked={isSortByAmount} onChange={() => {
                setIsSortByAmount(true);
                setIsSortByDate(false);
            }} type="checkbox" name="isSortByAmount" id="" />
            </div>}
            {isSortByAmount && <div className="flex items-center gap-2">
              <p>Sort by amount</p>
              <select
                className="border-2 rounded-lg p-2"
                value={sortByIncomeAmount}
                onChange={(e) => setSortByIncomeAmount(e.target.value)}
                name="sortByIncomeAmount"
              >
                <option value={0}>none</option>
                <option value={1}>low to high</option>
                <option value={-1}>high to low</option>
              </select>
            </div>}
            { isSortByAmount && <div className="flex items-center gap-2">
              <p>Sort by date</p>
               <input checked={isSortByDate} onChange={() => {
              setIsSortByDate(true);
              setIsSortByAmount(false);
            }} type="checkbox" name="isSortByDate" id="" />
            </div>}
            {isSortByDate && <div className="flex items-center gap-2">
              <p>Sort by date</p>
              <select
                className="border-2 rounded-lg p-2"
                name="sortByIncomeDate"
                value={sortByIncomeDate}
                onChange={(e) => setSortByIncomeDate(e.target.value)}
              >
                <option value={0}>none</option>
                <option value={1}>oldest to newest</option>
                <option value={-1}>newest to oldest</option>
              </select>
            </div>}
          </div>
        )}
        {incomes
          ?.filter((income) => {
            if (incomeFilterCategoryId === "none") {
              return income;
            } else {
              return income.incomecategoryid === incomeFilterCategoryId;
            }
          })
          ?.map((income) => {
            return (
              <IncomeCard
                key={income.incomeid}
                id={income.incomeid}
                title={income.incometitle}
                categoryid={income.incomecategoryid}
                amount={income.incomeamount}
                date={income.incomedate}
                incomeCategories={incomeCategories}
                incomes={incomes}
                setIncomes={setIncomes}
                deleteIncome={deleteIncome}
              />
            );
          })}
        {incomes?.filter((income) => {
          if (incomeFilterCategoryId === "none") {
            return income;
          } else {
            return income.incomecategoryid === incomeFilterCategoryId;
          }
        })?.length === 0 && (
          <div className="my-20 flex justify-center text-4xl text-blue-400">
            You have no income
          </div>
        )}
        {incomes?.filter((income) => {
          if(incomeFilterCategoryId==="none"){
            return income; 
          } else {
            return income.incomecategoryid===incomeFilterCategoryId;
          }
        })?.length!==0 && <>
          <div className="flex items-center gap-2 rounded-lg p-2 text-blue-500 font-semibold text-xl">
            <p>Total income: Rs {totalIncome}</p>
          </div>
        </>}
      </div>
    </>
  );
};

export default Income;
