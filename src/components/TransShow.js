import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const API = process.env.REACT_APP_API_URL;


export default function TransShow() {
    let navigate = useNavigate();
    let { index } = useParams();
    const [transaction, setTransaction] = useState({});

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

    return (
        <div className="Transaction">
            <h2>Transaction:</h2>
            <h4 style={{ "textTransform": "capitalize" }}>Item Name: {transaction.itemName}</h4>
            <h5 style={{ "textTransform": "capitalize" }}>Source: {transaction.from}</h5>
            <p>Amount: ${transaction.amount}</p>
            <p>Date: {transaction.date}</p>
            <Link to="/transactions">Back</Link>
            <Link to={`/transactions/${index}/edit`}>Edit</Link>
            <br />
            <button onClick={handleDelete}>Delete</button>

        </div>
    )
};
