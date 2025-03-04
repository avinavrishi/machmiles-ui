import { Container, Typography } from "@mui/material"
import CustomTable from "../../commons/CustomTable";
import { getAllPayments } from "../../utils/apiService";
import { useEffect, useState } from "react";

const Payments = () => {
    const [isLoading, setIsLoading] = useState(false)
    const columns = [
        { id: "paymentId", label: "Payment ID" },
        { id: "bookingId", label: "Booking ID" },
        { id: "userId", label: "User ID" },
        { id: "amountPaid", label: "Amount Paid ($)", align: "right" },
        { id: "paymentMethod", label: "Payment Method" },
        { id: "paymentStatus", label: "Payment Status" },
        { id: "paymentDate", label: "Payment Date" },
    ];


    const data = Array.from({ length: 200 }, (_, index) => ({
        paymentId: `P${String(index + 1).padStart(4, "0")}`,
        bookingId: `B${String(index + 1).padStart(4, "0")}`, // Matches with booking data
        userId: `U${String((index % 100) + 1).padStart(3, "0")}`, // Matches with user data
        amountPaid: (Math.random() * (2000 - 300) + 300).toFixed(2), // Matches booking amount
        paymentMethod: ["Credit Card", "PayPal", "Bank Transfer", "UPI"][index % 4], // Payment options
        paymentStatus: ["Completed", "Pending", "Failed"][index % 3], // Status cycles
        paymentDate: `2024-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`,
    }));

    const fetchPaymentData = async () => {
              setIsLoading(true)
              try {
                const response = await getAllPayments();
                console.log("The response for the payments", response)
                // setData(response?.user)
              } catch (error) {
                console.error("Error in getting payments", error)
              } finally {
                setIsLoading(false)
              }
            }
          
            useEffect(() => {
              fetchPaymentData()
            }, [])
    return (
        <div className="layout">
            <Container>
                {/* <Typography variant="h4" sx={{ textAlign:'center'}}>
                    Hello World
                </Typography> */}
                <CustomTable columns={columns} data={data} height={350} rowsPerPageArr={[5,10,50]} />
            </Container>
        </div>
    )
}
export default Payments