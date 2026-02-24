import React, { useEffect, useState } from 'react'
import SearchTop from '../components/SearchTop'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFlight } from '../store/selectedFlightSlice';
import { searchFlights, searchReturnFlight } from '../utils/apiService';

function PageList() {
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [flightList, setFlightList] = useState([])
    const tripType = location.state?.tripType || 'single';

    const initialPayload = useSelector((state)=>state?.passengerDetails)



    const handleBookNow = (flight) => {
        const selectedFlight = {
            iterinary_id: flight.id,
            token_id: flight.token
        };
        
        dispatch(setSelectedFlight(selectedFlight));
        navigate('/flights/review');
    };

    // const tempResult = [
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___1284815922",
    //         "token": "AAAA.AAAADNH2jmB4G0EEoX1tkzxUVtgJPKLeIwIcmft6oAh8Y+b0/0ZV2ypGaOK0AJkmA431zTLvMSaGn74sPBcgs+Sn/Twbs1ErNHjiw4J7hhUd+mvzcfGbVQf+4r6rVPZYO9b9C1jeJWE/t3cqiJkRrCMjUiacxX1MPxmUBny/YxsnV5XKZ2Lq0hmSwQwvpErkJtrULlWHwK9XjjvRfDyrieJ1wCYipjT5h7+Ay09fiMWzqfGf5ZyoZhFbbifJnWnuUAHv2ait0ECooxGpeWqcz5XMnCvf2pg2tWAHvU1n5QpS9A0SalN/clxqxh/VdTt5S0kMuyuExVE9P0zrkWGzAYJgzcfVXnhTpjkYyuT5SSJgJAywkG6Dt1Y1fZm3mzt+6Xk=",
    //         "flight_number": "6218",
    //         "carrier_name": "IndiGo",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/6E_v2.png",
    //         "carrier_code": "6E",
    //         "arrival_date_time": "2025-02-21T08:15:00",
    //         "departure_date_time": "2025-02-21T06:00:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 135,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 128.53,
    //         "price_exclusive": 108.56
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_XX_2___75553590",
    //         "token": "AAAA.AAAADDkEhcpGM3GrdcrwMkEmuaooKUJfRTTqdMYmAvZcQXE4No9QHYMljOCzhjvThX1XIXhWl2lqdIYNIOOFPWVK0VCtKysu4KzyfHThs+cSEvkry/64kIlRdEzstYy6WG6iUlpdh/3BWBtjyHRDI6lT0Q4bEBRB7hHyYGmPCAtxV/fHaZtf69aLvGYBqtzvAHM9ybanA1Y6D7VTppZXmVHbX7vSdvcoKfZbZo7J4vb1vHn1RlXY7UOgOAwZoJ3gQppOxJ0M6uctdgPIuW6bH55ZiDm1gVmp+yPQ9wBV5Vd7ZIkNx3Rq04wZyOSRxwXfQSFlYX/ltjC6akK3b2OiiqKGFMwMNDbzd+Pt18byaw==",
    //         "flight_number": "449",
    //         "carrier_name": "IndiGo",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/6E_v2.png",
    //         "carrier_code": "6E",
    //         "arrival_date_time": "2025-02-21T07:20:00",
    //         "departure_date_time": "2025-02-21T05:00:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 140,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 129.12,
    //         "price_exclusive": 109.02
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_XX_2___1244058287",
    //         "token": "AAAA.AAAADJCwRPRXNEOzzJtufEj1fxHjIsrkvVW4pxbAzXPDnMu3ekHG1+2AqG/FMjrXGo7v3YtNI6SZuod1FPUd+3o5BvfYyEqCeOipiNXPoKhhCx9vqGi4sPxEwSxCzkc0LtayGAoeRlJ1kRo+1OQzO+RYFvEOZHnfT1VfW96Y5QXwJdxnoBfZNM2zpy11QhFOJuITUNOSp/uWv8ILTT6gCQ6bTTik/MUXKF+bgtBeCjRoMecyUTp0Gexi5tMTEIDa20ySth1D9A3uKssUJZFOIRJMVcx/aX1ic8fit7Ich9VexCOgYigAEwqv4Co77Ye32TBJiBDPeWCHHTsEEbqwPl7zV039I00vAwgXJTJgKEPL",
    //         "flight_number": "6348",
    //         "carrier_name": "IndiGo",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/6E_v2.png",
    //         "carrier_code": "6E",
    //         "arrival_date_time": "2025-02-21T08:25:00",
    //         "departure_date_time": "2025-02-21T07:05:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 8864,
    //             "arrivalCityName": "Bhopal",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Raja Bhoj Airport"
    //         },
    //         "total_trip_duration": 310,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 134.76,
    //         "price_exclusive": 113.09
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_XX_2___1985953332",
    //         "token": "AAAA.AAAADJP+j2LcaelPNAnx1LdIUw+MTT9z3OgfUxpZZjUHtcwxL8EQArg4v8KboefNSo4z45riUpzUjcmMxPOFQev7QFkjSTVQO0qrSikdCRk866sTdR1semd5nB8XPA4DuSmNA5cCqya8Xl2qmehKnrYhCDiBJ8LH9iS853+/mNsYxPic0KfcicW2fid0rolJjCl6LjRhPq5pQh5j1VLutzBQrDZYFdH/79iO7i/E99918HERQ9TnyKL7hlF0CBpUJMPByhQQkKTuACNbUxWoS7g/4I9AR2p/ry84iB94//vskBPpM/l9Xu0nzBS3XGe/EH0HXPhs+JcKWWN73GzwJtCmkaEoxAF7sLVSWG92Ew==",
    //         "flight_number": "2298",
    //         "carrier_name": "IndiGo",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/6E_v2.png",
    //         "carrier_code": "6E",
    //         "arrival_date_time": "2025-02-21T06:30:00",
    //         "departure_date_time": "2025-02-21T05:00:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 3177,
    //             "arrivalCityName": "Indore",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Devi Ahilyabai Holkar International Airport"
    //         },
    //         "total_trip_duration": 295,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 134.76,
    //         "price_exclusive": 113.09
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_XX_2___315918518",
    //         "token": "AAAA.AAAADCUsqNhA0Yw23x0RgrYwGDzvZhPF0ByphoEJtb0eLn+lVBNKsOTlNlQYRc8GwVq4jsmLJ1Bjj8O8+Pvc/Kj46oOrputxjcU6HjmbfjDY4BYVr98xyhhVW8ipHb4rFAqxcHdqZ3j1tShjFMdtBN8OdBUoICHW9QwZEvWqlZ2vZ3PTXGRvf7M7s3m2cSCMVCaLJ1kqp3XSJQ+5KL485MMTLPEbzm9E9vLCt2n8An+al2zdMqMLjEVT6Cye/wQNTOvJA1sOZFdqs4XWNJc78WD/YlF1H0ODYDyQIZVcDfjSYQCDOUhiIR7Cuajrm5Vg+JnjVnxCjppieKJ6F0LPjzgd+OhzYNvfW4CdfURbXA==",
    //         "flight_number": "2431",
    //         "carrier_name": "IndiGo",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/6E_v2.png",
    //         "carrier_code": "6E",
    //         "arrival_date_time": "2025-02-21T06:25:00",
    //         "departure_date_time": "2025-02-21T04:40:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 7010,
    //             "arrivalCityName": "Nagpur",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Dr. Babasaheb Ambedkar International Airport"
    //         },
    //         "total_trip_duration": 310,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 134.76,
    //         "price_exclusive": 113.09
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___408669372",
    //         "token": "AAAA.AAAADPwPq4oXnTp913VXZ/7gYxktT/iPfnvGiSlIoV67QvnKN+dSQhCbTka1r57WJ3ANcJEB2yh6c0xc6IiVZ4ObaIKh+YxmLPeENaU3zwWDPYTsPa6ptOwiAut1Wj1SonOp9rJLEPsJL3H4KqZzR7mnjFYV5Eg2j4m4eSUpzEmnb7fr3dwFrfIUrg4vtklw2x8s6hR/l967HW3LKVWaW2+kBaRVY9oIAinpllI6TatdYKriWW4vwFzYMVaJkOe97mWTfjBRDur/cnC2K31bOOYcxVJFvzqdkEBsREWRfhuXB9SNDtPKai7I9ay2gMBM8J5vC9F1tjt5BExm5oG7erl3u1tiALpCq2CE8Mo8jj7TlNpyXTOFuBsplmKFBIf9v7M=",
    //         "flight_number": "2768",
    //         "carrier_name": "IndiGo",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/6E_v2.png",
    //         "carrier_code": "6E",
    //         "arrival_date_time": "2025-02-21T20:40:00",
    //         "departure_date_time": "2025-02-21T18:25:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 8801,
    //             "arrivalCityName": "Hyderabad",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Rajiv Gandhi International Airport"
    //         },
    //         "total_trip_duration": 235,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 135.29,
    //         "price_exclusive": 113.1
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___1728080534",
    //         "token": "AAAA.AAAADJYR+j70eXO9dQmX1Qv5Kng+1BiPsbJQyYKamo352CtINI5mKVxPtgFN3szndc9LD33vRdcR/HjUnooQ8DkstLyxfbZaUmY7bDVtzenaXes+UPCBUrRlEsx4vViknsANtC5RxhSJ9tJpZw43o2UiPG+LFhfsC6K1RnLUOLKX3sJZdiP8rRIky2/Sk4hyBdjrriNk1qBacegqa4sKA1kzReU6kK4Nn9b4CYgNwaeA3Y2jUgUsZPgI1vQkqYJ3zMmTsLjJtRjwn6fWpY79bUWDGLLAl29IwaCY/8xVJ99NpGkXhXk9jzccLv3WPG+83dl7Dsa/EMLKBgBQbC/j7NPcy9+gRXUcJqHu0tpz+ygFzQt16q6kq0YcbHJEYIwYA67dp3l2Wzo2iKOAcJeZfz4UPR2HrUGFuEP45vm30R2aoe+TCn3aGyuNP3edrFgMGJrQ7ThKQS+XGfRb+qtGOWFcCaeBBi7lOy3r",
    //         "flight_number": "1719",
    //         "carrier_name": "Akasa Air",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/QP_v1.png",
    //         "carrier_code": "QP",
    //         "arrival_date_time": "2025-02-21T10:50:00",
    //         "departure_date_time": "2025-02-21T08:30:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 140,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 138.57,
    //         "price_exclusive": 116.13
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_XX_2___1764901958",
    //         "token": "AAAA.AAAADEcQxajb4ehNsqeDuVPreP8LtEEA/EaYFP58fWLr+Uoulxf1srRIEns5Ip6Fxy8NovO4UW9Yb2uv7arJisPoeS8mJtmDv7h5fAx6ecjTveBuyYXF8xenZJbbnh32kHCh7EKjafGSK6ROl+RaaEHjjalwbgujFPCmtwskxxbNYVTEbpst062gAXnvOpSQNORqH0QfbsKlIwqgRSKlnw08mAfFI8x+wBk5/cfXdcDpx1nrgum4cxzecG90YAxF4XZUKeg6G5ZV5/QgY9z6tw5yjTfkVgaxVM3xPjjkncEpLNKYjX8QZg8C2rxVH9ERHQVP4wutk9oARgtMW4xCYBkRBsZmdCeGWYlvmA8yDQ==",
    //         "flight_number": "673",
    //         "carrier_name": "IndiGo",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/6E_v2.png",
    //         "carrier_code": "6E",
    //         "arrival_date_time": "2025-02-21T04:20:00",
    //         "departure_date_time": "2025-02-21T02:00:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 140,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 138.52,
    //         "price_exclusive": 117.73
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_XX_2___1867068569",
    //         "token": "AAAA.AAAADHg0SgpjNkOmPjYElsDXamhDrhUR63YXo3AMR+gaB4TiJ1cxDNQ/ORNSlW7ttTAlu/If/+x3JMCn987d9vA+I9SBxyzTrjnR1kyjDQz2Ybye6dhCsW6Mh1Tf54AmDJMtnqHh76vnawX0X102wnt/tgeESsCbFV9drC35EziS+pYGtQFr4BN6WS+OuMMZhyrYO2S5aCDg3PYwPBFJQzTiOxZI+hytryJZSq78xMwec6ovlbsstDdRZffHcgAFCnJFHaZTUaTvLOcfeJ41VjSCbFoM2Z8QEaxLqfl9sMSQRuMOevaG37XhhkMqYuF69xStHeHaG7Te8Uo/wT7xVXc7gfpuqwWv9MV5O3KpBiif",
    //         "flight_number": "708",
    //         "carrier_name": "IndiGo",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/6E_v2.png",
    //         "carrier_code": "6E",
    //         "arrival_date_time": "2025-02-21T06:20:00",
    //         "departure_date_time": "2025-02-21T04:00:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 140,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 138.52,
    //         "price_exclusive": 117.73
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___1096412531",
    //         "token": "AAAA.AAAADDzxcqXw3ixCtFtX3dEDuEI9VfNBzZnHG6I34Cj88yrHY2fPQYlvZ81ZSxSkpqt4GSvHBkxvYbfkRdQeJSPWjF506MTd3XwGOZ6DiRkA+POeXyuFxCOZMjY05CXFzhBjmsS9AR325I9vdRA/ppoAAEIbVZ8i8I/4xPWZU8+pr7bWCJ1Ws9M1p5yAwJJE39WT5+8l8NZU9skQ5FhG2/QzIibzPhhsTtrr+ppevxNXLrKBPmSbTqnxKZz2BAAOOa24LXLZVNNFGZ5bG0Rx5hGXvorxSv6JBQEAJK3IhvbR89kQX2XwwwJKTxl/AYVaBVIGvX8uC+QlGpU9AKmtYdbEdME1VDdFHBUPscoO9OiyOFl1KSohNkGW4Ww/UcG3iJnSH3CAwdErHLKnJRkdRreBeFrTeI8WUDxRlouRMcqrDL7R+YOCDTuvMlFMPwtE9Ej9buFxRMk7qgVSoam2hrKyf/NWmnTTqBfLdA==",
    //         "flight_number": "2678",
    //         "carrier_name": "Air India",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/AI_V3.png",
    //         "carrier_code": "AI",
    //         "arrival_date_time": "2025-02-21T10:45:00",
    //         "departure_date_time": "2025-02-21T08:30:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 135,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 141.75,
    //         "price_exclusive": 118.82
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___1962533955",
    //         "token": "AAAA.AAAADKxCaZJu3Utup3lTEbO+F7Y1LNxHzN6jEVjEndnc3jq7Oj6xAK7J5EDwYHgoynphcsrCpdkJwQ6C44hcC5J5NEsFyVDERgbpqY+CHPOICyW05PxzgZf1KTvgkhS2zT3LeWq+pz+aQnDIEnFoH/TDmagrq39hLUc5o01AUjroqyMZvfcwwpcspuI5J2fHGctf4VmH8+KnJTybO1NVm3UClcbmDKjBB1jz+xWzu9M7mCA9t/exWJubrqvBcdFGspthx1ZoKyN82IEJ+S8ZhSb+Em7N3/2B4hhfhPhhHPzse88S8MPAWn0kFl79mbVu6XVUKmuPByXqJ+KzjJOPzLXKs9FmXhclGZgz0ZuhfZmIceuQ0l3lbNtkVW6yuOJ3NPGqI8LfPUzIu66dqgy+s1OBbg+9LFodumIBhfnyuNcK4U5UOonb7gCD54wFf5lq4nOJMWChO0vNUOifA4L4CQuIsRysnLXUZZ2QCMNZxQ==",
    //         "flight_number": "2975",
    //         "carrier_name": "Air India",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/AI_V3.png",
    //         "carrier_code": "AI",
    //         "arrival_date_time": "2025-02-21T08:25:00",
    //         "departure_date_time": "2025-02-21T06:15:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 130,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 141.75,
    //         "price_exclusive": 118.82
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___236679220",
    //         "token": "AAAA.AAAADG0abUDfRe7O2pZ6U3maf6XWjzDmLndCP6g9bT/e1jx7WcoVo6umA95coLcNWqQBIDAnoK5xkj50J+mRTFCxpmjQgS71pk5dEveMj40Cb6MOf9DJlf9WY1w+QftutNGyXJtXJ7HWzLU81XfAyBkrQKQGb8pTWuMWlgopqwGRR6YCiEtXK34ep+r0kBGG7wIkk0lzcJRB9R5z9dLyaX/SGaiLt7NjAEHW01t92Rcs2wh7pLC2z9aAfGw44/KPeWV286qmhZCn4TYJAmB7ChjKsmanyVJloritIDuYbR+auG6jtKfsjR5qEkj1BSE3CmeHYB3nrRW4wSzMTehVdfOox38UYs6Kl35Z7lT7Cnri4WXxGrnYiJi0vN3BN1cSmS1+sBplnhnOrD9t+NcPYR5yZrALtfexxehPBjjaJFDDrzu4h8PpLvFGk+AgpMQ3jAu2iSxsPqPz/lQMeCDh7CgpRpw9xCc3PLcWQfp7",
    //         "flight_number": "2435",
    //         "carrier_name": "Air India",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/AI_V3.png",
    //         "carrier_code": "AI",
    //         "arrival_date_time": "2025-02-21T10:20:00",
    //         "departure_date_time": "2025-02-21T08:00:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 140,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 141.75,
    //         "price_exclusive": 118.82
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___23830236",
    //         "token": "AAAA.AAAADDpMwTCDol5TmqroRgUwz10OsvRSpJHgipzsMSNXnde0KPJGVPvgABMGTqH7SKxDd9aR8R8B1BPuODSauNQN2uf+AEVnYw62VamhPff9UQ1IzYCgFMYn2TNt5mkDyoiOcpJZ0Bh6fQGLsJnUZdaBpbPUMyS/0NBMUFA90x0wjAzsda4sLdvONtLG/bVQlAtFyJfrAduKWA9ItX1AMOTz0hXoMEzH8c4IaZmFDYjdVwwSgbRuaFCoRBwFN/ptAgKyCUMV/LtR/tMJUDSOoxmhASy4XsltBFaYqqmPm0rdSBDONjGDdY0CFYVtXzc6cM7Z0Gxz0nWs788uoPC5o4MSbsbNT1mjqbmgjZ3EDWNN1D/UVHGBiEQKquS1yVQLQnVHtY4/bE6JnIRqPMwk6twkQFTsagx3goeYYUYDguuC98hPERfgrAXj7VXCUfiSA2BRRjlwi7a+vGlM4M2qimubbuTUxAuvU8XNmBk=",
    //         "flight_number": "2425",
    //         "carrier_name": "Air India",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/AI_V3.png",
    //         "carrier_code": "AI",
    //         "arrival_date_time": "2025-02-21T13:25:00",
    //         "departure_date_time": "2025-02-21T11:00:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 145,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 141.75,
    //         "price_exclusive": 118.82
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___32986817",
    //         "token": "AAAA.AAAADGIE6anz8jSQSNaIh0p9ZPBab6PFMcUIMc+cQ4OTPnMHJpsjXCodcDhtITsv8Qv3gh78G7UABiK1HaMI26MlR9mcE1N3DDJOgts+SWru1aTj9TgXo6/0xDR1hUCqrivPN/zUcOt1m8xEAaMaGph8TqEuoH87h1XsQnnmYUMeNiuVYedrGL8CgLDM4oYZYngT6lGavjDoVKmMyZG8Iw/fSYyZh/SF1POVsIJM8WbJwvLBZK9KO5ew6FivYTcG3MSkKR9UY0r0/dwNhFLQlFW6+r/zJcy8dqsH2u/qIPdQIBPRMxmntwh8FVdWXwbBdIIhjsRy7k6IDbB7o8tbQKqHcYZhdzS/SxzlgmXuIeqzTzxrLt2HbADVrM+05+5t7JGrw6B1j3WhyoSvsKo5KGgRnfp5rID4ZkOQgppwAAUfwCtDZs20/Z0B1/WL4zrHq7aasXWvvTZllMyE6AfsV2pUjbaV+ty4SfuT/u4=",
    //         "flight_number": "2951",
    //         "carrier_name": "Air India",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/AI_V3.png",
    //         "carrier_code": "AI",
    //         "arrival_date_time": "2025-02-21T16:35:00",
    //         "departure_date_time": "2025-02-21T14:20:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 135,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 141.75,
    //         "price_exclusive": 118.82
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___536118740",
    //         "token": "AAAA.AAAADPOX5FrvSR3bvJ7GAJVRkjPiPvFiRqhK5WDJ2jVFqqx1J9Tm946rwkxW4LdtSxc3zzAyQd0d359Aqrs2LmuBAzd8ULyRjY1/YiQSiyUfrpqdkds5hAukJmQUWb15w0WOHAmQ+7czrtE/eBg5KxFLKNXGn0ndXYx893ePPqOehf+lYh4PHfIiYREYm6IP+44scCf4xvM1u1ObEzPbf5trnBu4UMw2QmYWQuilW9T5F1WFQkyR3S7zMMKfqQ9D+owVVa7JFJhI37uZxx8EPgA/+vP3PMh6xBiYly6le66M6whq9C5Ib+o/2GukLgCegY7uEHTc/mUlFtodhJcaExBPqn+6+AbLMITziH87hTooSHYL/6VIXNhrzQxwQ6Vx5BCPyifdl5Q5yumUXzmFuNY98u+5fe/rrQr2rsZDQnG06jqVATlpwPT18f46wLjnkCRDvTL6lk9vSzTOvbMsDSuefvtWZVpoZ1Ngjx6E",
    //         "flight_number": "2429",
    //         "carrier_name": "Air India",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/AI_V3.png",
    //         "carrier_code": "AI",
    //         "arrival_date_time": "2025-02-21T09:15:00",
    //         "departure_date_time": "2025-02-21T07:00:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 135,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 141.75,
    //         "price_exclusive": 118.82
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___975923118",
    //         "token": "AAAA.AAAADL9ZtJ2K0yiIsNpMG0TEL+UQXJdsi5Z1bsd1jM2eVdiRJLuHf0QsQWtdKlXJs8vyrj9GXL4fodC2bG76YArltfgoVl62RXclUgygxHSeZ7dv5ZV1YBwKN5JC5FJM5rkdfHnMHnazTLdwycBiKmZzQHtADsZgxTQAUi2gkG2tX0pD2WJzTqpxTvaFt1LWzbTA3pq8grw56LVGagqIfJakgXMDCNkB13xbd6HEAA/lkiI4RNBBF1AaeYoQ0eH6kbd0MJ+eWMNcyu55EC3G0bx4O15Z71erxWxEh8PCM/WcrET2Sju0DoSCK5hWleVS1UR+lPpb43gZBKgTZw44oizn9XEe/Aq6fLUSTOmr58fb5k/ywm2LhpWQHzvBjqS2ozaxsAp1paK1JtUIqot5+TxsKg/1dUM+Hr2mUvYZt0iC3Y+dl69QHApJ8MlclBHlMIwLsE2c+UwQVGJIYoJKfoXe0gOVhipmDTU2xoY=",
    //         "flight_number": "2995",
    //         "carrier_name": "Air India",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/AI_V3.png",
    //         "carrier_code": "AI",
    //         "arrival_date_time": "2025-02-21T12:35:00",
    //         "departure_date_time": "2025-02-21T10:15:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 140,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 141.75,
    //         "price_exclusive": 118.82
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___1203061067",
    //         "token": "AAAA.AAAADNOQuobq+FHln2PgrlMsYmNId1y0E+SBOiTJyX0By4LaUI4ogUvosAgQFd6Lls/39mNr4ZDkQeE9hvJ1BiCo4iukgA2/APT8xflqP/HtP3EFe3VmQaHYYKVtW1s5hQ7O5dXSfZgPoPtlbMmQw4uSiH6j8udzxzmM7TcjYMKsSM+hUm9BQq89QSeAnGSmAdd0Sf2MARzMzBYRzV95hPS2PWmce/pcfCicLiGgpYrW7UyqQtk3YK+r04FbYIn7K9GbQUD8/gJ0YeuQISwTj6MEpVhXcwxbSKsEhInrXmSWyrTTjiDFzwADugQ2wBvRnCuri7uHCnjkiFanechzcLYlpaYOVHKWE9ikWVxuK63v891PNIv5cSd44IY8QZH4p2D6LD0XtiotXH4YhITbxEeVQcFs5ticycj4rQweIngIWEslX2pHDnMBSOqGb2OXRf60SOTUe3076j4Cg/K0/FJuZ8KhSQvsQfKpUsk=",
    //         "flight_number": "2943",
    //         "carrier_name": "Air India",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/AI_V3.png",
    //         "carrier_code": "AI",
    //         "arrival_date_time": "2025-02-21T09:35:00",
    //         "departure_date_time": "2025-02-21T07:30:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 125,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 143.86,
    //         "price_exclusive": 120.63
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___1988356502",
    //         "token": "AAAA.AAAADL2HVQC/ZrsjQUSapOQq/rDbSvqjcjUs7SAfTefXeFP83rKAfvQ9Cza6NN7HCOHUheRzxzrzrcVkfM+wcmKU1dpub2IsVqMhEf1ThHRB3qSiVnZ1hL5oDzoeCaV6R2HX5MwwWPQg8DXKD23lBuH6G24FlB2YDb3as87RzjI8LuA/NMvsc8ruTPV8UWD0rCKIMWWTq8ldeTyG9xN1NjtwxyFMNltdsS0zZuVPM8zAs10dCXuoPobhizxAExsuV2Yu+bP6OJyXWHx837GFLqlZaGxEFcuae0j3uP4BLM6zwt3xOsWRa9QajBXeSip1/7/BQoXwkvTD6gTNPRN90nQRTUDeKf4W9YFT8fqyjeyRyzpAdSEftPrsLHzYcbEAoZMn3yw=",
    //         "flight_number": "6047",
    //         "carrier_name": "IndiGo",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/6E_v2.png",
    //         "carrier_code": "6E",
    //         "arrival_date_time": "2025-02-21T14:10:00",
    //         "departure_date_time": "2025-02-21T11:50:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 140,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 141.96,
    //         "price_exclusive": 121.05
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___2104714987",
    //         "token": "AAAA.AAAADCjpWdbYQdYPvwWFre4YKmQ6uPek7kSMAl66F3e7NJEzOWbb2u+61Pa1bjp1Y8vh4z8FMg2hpD+KGdmoZNk++D+ilKwiob576kDe4YI9Q0nUlpslVHUNjJtYkPHay0y3MWSV4uFZo+R3a0oOBjJMhbP9z8VxbiVG9wZQS9tPYnstldR5YVDNyJitfQXdzZmlfjJ7jEOQvFmUbmEByuaE7wYeA5dxyxXuS928V0fzajaTCOrhDRxJz25PC5potGyNkkHeJNkvMg8J+ufCC3Lqb94iRwA//PLtV/WPAyj9WzgGTmUufL83BCtsDZO42DlRfO8VvCt2mh60JloBL68Y8JNr+h2a8FwQSwK9OZBoUJl318cL9A9B/M4rjIaipP4V47x7",
    //         "flight_number": "6328",
    //         "carrier_name": "IndiGo",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/6E_v2.png",
    //         "carrier_code": "6E",
    //         "arrival_date_time": "2025-02-21T12:20:00",
    //         "departure_date_time": "2025-02-21T10:00:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 140,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 141.96,
    //         "price_exclusive": 121.05
    //     },
    //     {
    //         "id": "A:DEL_20250221_A:BOM__2-0-0_ECO_2___998930320",
    //         "token": "AAAA.AAAADFCn/NQ0r358edqRHwY9usiWrwpBx7b39l9cXr2icsR6XEVIRKsnRvvzfmeCnDkxMkwM29Ls9RAaEzJqb9+DELcxf9ywJkFtZcq7O57+jVRt4GuMiCGjaqSz0dIa4HzbZY2osxO5udIPpcSY2o8VLdv6lnM5V3TJjwkINeqndg9f7H3LuvNReUrHCFxbzI+XUniD2M4MgGV0UFIiYGaVdshdRX2MBc+pgcULMihN+NYliDoPLlV1rxJc64fD49nAJDox6PRHQwxG/bh+AtPjaskIvbNKOlcvsa/LnaRT4JjKKnvw7fFlbVQcE3E/Cs5POiZt0gab9sdwJdE5tSYZFMOQYbFhAt3/2WQ7/o8ymX6ze1X28+CYUZRFWTidiAKxy0U=",
    //         "flight_number": "519",
    //         "carrier_name": "IndiGo",
    //         "carrier_image": "https://img.agoda.net/images/mvc/default/airlines/6E_v2.png",
    //         "carrier_code": "6E",
    //         "arrival_date_time": "2025-02-22T02:15:00",
    //         "departure_date_time": "2025-02-21T23:55:00",
    //         "departure_arrival_airport": {
    //             "departureCityId": 14552,
    //             "departureCityName": "New Delhi and NCR",
    //             "departureCountryId": 35,
    //             "departureCountryName": "India",
    //             "departureAirportName": "Indira Gandhi International Airport",
    //             "arrivalCityId": 16850,
    //             "arrivalCityName": "Mumbai",
    //             "arrivalCountryId": 35,
    //             "arrivalCountryName": "India",
    //             "arrivalAirportName": "Chhatrapati Shivaji Maharaj International Airport"
    //         },
    //         "total_trip_duration": 140,
    //         "cabin_class": {
    //             "cabinClass": "ECO",
    //             "cabinName": "Economy Class"
    //         },
    //         "passport_required": false,
    //         "cart_info": {
    //             "isCartEligible": true,
    //             "isCartRestricted": true,
    //             "allowMultipleBooking": true,
    //             "cart": null
    //         },
    //         "price_inclusive": 141.96,
    //         "price_exclusive": 121.05
    //     }
    // ]



    const fetchFlightList = async() =>{
        console.log("HIIII")
        try {
            const response = tripType === 'return' ? await searchReturnFlight(initialPayload) : await searchFlights(initialPayload);
            console.log("The response for flight List", response)
            setFlightList(response)
          } catch (error) {
            console.error("Search request failed:", error);
          }finally {
            console.log("Flight Details fetched")
          }
    }

    useEffect(()=>{
        console.log("initial Flight", initialPayload, tripType)
        fetchFlightList()
    },[initialPayload])

   
    return (
        <div className='page-result'>
            <SearchTop
                data={flightList} 
                onBookNow={handleBookNow}
                // data={tempResult}
            />
        </div>
    )
}

export default PageList