import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="Home">
            <h3>Welcome to your budget helper.  <br />Please login to view detailed account information.</h3>
            <button><Link to={'/transactions'}>Log in</Link></button>
        </div>
    )
}
