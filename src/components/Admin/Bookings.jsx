import { Container, Typography } from "@mui/material"
import CustomTable from "../../commons/CustomTable";
import { getAllBookings } from "../../utils/apiService";
import { useEffect, useState } from "react";

const Bookings = () =>{
const [isLoading, setIsLoading] = useState(false);    
    const columns = [
        { id: "bookingId", label: "Booking ID" },
        { id: "userId", label: "User ID" },
        { id: "destination", label: "Destination" },
        { id: "bookingStatus", label: "Status" },
        { id: "bookingDate", label: "Booking Date" },
        { id: "totalAmount", label: "Total Amount ($)", align: "right" },
      ];
      
    
      const data =Array.from({ length: 200 }, (_, index) => ({
        bookingId: `B${String(index + 1).padStart(4, "0")}`,
        userId: `U${String((index % 100) + 1).padStart(3, "0")}`, // Matches with users
        destination: [
          "Paris, France",
          "Tokyo, Japan",
          "Dubai, UAE",
          "Bali, Indonesia",
          "New York, USA",
          "London, UK",
          "Seoul, South Korea",
          "Sydney, Australia",
          "Barcelona, Spain",
          "Berlin, Germany",
        ][index % 10], // Cycles through 10 destinations
        bookingStatus: ["Confirmed", "Pending", "Cancelled"][index % 3], // Alternates statuses
        bookingDate: `2024-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`,
        totalAmount: (Math.random() * (2000 - 300) + 300).toFixed(2), // Price range $300-$2000
      }));

      const fetchBookingData = async () => {
          setIsLoading(true)
          try {
            const response = await getAllBookings();
            console.log("The response for the Bookings data", response)
            // setData(response?.user)
          } catch (error) {
            console.error("Error in getting bookings data", error)
          } finally {
            setIsLoading(false)
          }
        }
      
        useEffect(() => {
          fetchBookingData()
        }, [])
      
    return(
        <div className="layout">
            <Container>
                {/* <Typography variant="h4" sx={{ textAlign:'center'}}>
                    Hello World
                </Typography> */}
                <CustomTable columns={columns} data={data} height={350}/>
            </Container>
        </div>
    )
}
export default Bookings