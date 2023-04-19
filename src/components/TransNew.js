
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../pages/Dropdown";
const API = process.env.REACT_APP_API_URL;


export default function TransNew() {

    const navigate = useNavigate();
    const [transactions, setTransactions] = useState({
        itemName: "",
        from: "",
        amount: 0,
        category: "",
        date: [],
        deposit: false,
    });

    const options = [
        { value: "Income", label: "Income" },
        { value: "Bank", label: "Bank" },
        { value: "Bills", label: "Bills" },
        { value: "Grocery", label: "Grocery" },
        { value: "Food", label: "Food" },
        { value: "Medical", label: "Medical" },
        { value: "Personal", label: "Personal" },
        { value: "Educational", label: "Educational" }
    ];


    const handleTextChange = (event) => {
        setTransactions({ ...transactions, [event.target.id]: event.target.value });
    };

    const handleCheckboxChange = () => {
        setTransactions({ ...transactions, deposit: !transactions.deposit });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addTransaction(transactions);
    };

    const addTransaction = (newTransaction) => {
        axios
            .post(`${API}/transactions`, newTransaction)
            .then(() => navigate("/transactions"))
            .catch((err) => console.error(err))
    };


    return (
        <div className="transactionsEdit">
            <form onSubmit={handleSubmit}>
                <label htmlFor="itemName">Item Name:</label>
                <input
                    id="itemName"
                    value={transactions.itemName}
                    type="text"
                    onChange={handleTextChange}
                    required
                />
                <br />
                <label htmlFor="from">From:</label>
                <input
                    id="from"
                    type="text"
                    value={transactions.from}
                    onChange={handleTextChange}
                    required
                />
                <br />
                <label htmlFor="amount">Amount:</label>
                <input
                    id="amount"
                    type="number"
                    value={transactions.amount}
                    onChange={handleTextChange}
                />
                <br />
                <label htmlFor="category">Category:</label>
                <Dropdown
                    isSearchable
                    isMulti
                    placeHolder="Select..."
                    options={options}
                    onChange={(value) => console.log(value)}
                />
                <br />
                <label htmlFor="deposit">Deposit:</label>
                <input
                    id="deposit"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={transactions.deposit}
                />
                <br />
                <input type="submit" />
                <br />
                <br />
                <a href="/transactions">Back</a>
            </form>
        </div>
    )
};
