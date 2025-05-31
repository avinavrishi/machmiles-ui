import { Container, Typography } from "@mui/material"
import CustomTable from "../../commons/CustomTable";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../utils/apiService";
import {Loader} from '../../commons/Loader'
import { formatDate, formatShortDate } from "../../commons/FormatDate";

const UserInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([])
  const columns = [
    { id: "user_id", label: "User ID" },
    { id: "username", label: "UserName" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "created_at", label: "Created At",renderCell: (row) => formatDate(row.created_at) },
    { id: "updated_at", label: "Updated At",renderCell: (row) => formatShortDate(row.updated_at) }
  ];

  const fetchUserData = async () => {
    setIsLoading(true)
    try {
      const response = await getAllUsers();
      console.log("The response for the user data", response)
      setData(response?.user)
    } catch (error) {
      console.error("Error in getting user Data", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div className="layout">
      {
        isLoading ? (
          <>
          <Loader/>
          </>
        ):(
      <Container>
        {/* <Typography variant="h4" sx={{ textAlign:'center'}}>
                    Hello World
                </Typography> */}
        <CustomTable columns={columns} data={data} height={350} />
      </Container>
        )
      }
    </div>
  )
}
export default UserInfo