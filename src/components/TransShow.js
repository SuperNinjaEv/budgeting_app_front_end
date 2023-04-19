import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const API = process.env.REACT_APP_API_URL;


export default function TransShow() {
    let navigate = useNavigate();
    let { index } = useParams();
    const [transaction, setTransaction] = useState({});
    const deposit = transaction.deposit;

    useEffect(() => {
        axios
            .get(`${API}/transactions/${index}`)
            .then((res) => {
                setTransaction(res.data);
                console.log(res.data);
            })
            .catch((err) => console.error(err))
    }, [index, navigate]);

    const handleDelete = () => {
        axios.delete(`${API}/transactions/${index}`)
            .then(() => {
                navigate("/transactions");
            })
            .catch((err) => console.error(err))
    };

    function getDate() {
        const date = new Date(transaction.date);
        const options = {month: "short", day: "numeric", year: "numeric"}
        return (date.toLocaleString("en-US", options));
      };

    return (
        <div className="Transaction">
            <h2>Transaction:</h2>
            <h4 style={{ "textTransform": "capitalize" }}>Item Name: {transaction.itemName}</h4>
            <h5 style={{ "textTransform": "capitalize" }}>Source: {transaction.from}</h5>
            <p>Amount:
                {
                    deposit
                        ? <span style={{ color: "green" }}> +${transaction.amount}</span>
                        : <span style={{ color: "red" }}> -${transaction.amount}</span>
                }
            </p>
            <p>Date: {getDate()}</p>
            <Link to="/transactions">
                <button>
                    Back
                </button>
            </Link>
            <Link to={`/transactions/${index}/edit`}>
                <button>
                    Edit
                </button>
            </Link>
            <button onClick={handleDelete}>Delete</button>

        </div>
    )
};
