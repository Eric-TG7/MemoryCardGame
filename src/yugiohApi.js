import axios from "axios"
const yugiohApi = axios.create({
    baseURL:'https://db.ygoprodeck.com/api/v7/cardinfo.php'
    })

    export default yugiohApi