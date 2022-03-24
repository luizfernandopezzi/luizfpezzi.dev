
import getUser from "../../utils/getUser"

export default async function apiGetUser(req, res) {
    const data = await getUser('luizfernandopezzi')
    res.status(200).send(data)
}