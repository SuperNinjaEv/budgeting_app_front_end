import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;


export default function transactionsEdit() {

    const navigate = useNavigate();
    let { index } = useParams();

    const [transactions, setTransactions] = useState({
        itemName: "",
        from: "",
        amount: 0,
        category: "",
        date: [],
        deposit: false,
    });

    useEffect(() => {
        axios
        .get(`${API}/transactions/${index}`)
        .then((res) => {
            setTransactions(res.data);
            console.transactions(res.data);
        })
        .catch((err) => console.error(err))
    }, [index]);

    const handleTextChange = (event) => {
        setTransactions({ ...transactions, [event.target.id]: event.target.value });
    };

    const handleCheckboxChange = () => {
        setTransactions({ ...transactions, deposit: !transactions.deposit });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updatetransactions(transactions);
    };

    const updatetransactions = () => {
        axios
        .put(`${API}/transactions/${index}`, transactions)
        .then((res) => {
            setTransactions(res.data);
            navigate(`/transactions/${index}`);
        })
        .catch((err) => console.warn("warn", err))
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
                    placeholder="Your name please, Captain."
                    required
                />
                <br />
                <label htmlFor="from">From:</label>
                <input
                    id="from"
                    type="text"
                    value={transactions.from}
                    placeholder="Where is this Transaction from?"
                    onChange={handleTextChange}
                    required
                />
                <br />
                <label htmlFor="amount">Amount of Transaction:</label>
                <input
                    id="amount"
                    type="number"
                    value={transactions.amount}
                    onChange={handleTextChange}
                />
                <br />
                <label htmlFor="deposit">Is this a deposit:</label>
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
}