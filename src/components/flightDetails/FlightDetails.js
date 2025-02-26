import { Box, Grid } from "@mui/material"
import { formatDate, formatShortDate } from "../../commons/FormatDate"
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import CoffeeIcon from '@mui/icons-material/Coffee';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import WifiIcon from '@mui/icons-material/Wifi';
import ChargingStationIcon from '@mui/icons-material/ChargingStation';

export const FlightDetails = ({ data }) => {
    //Function for Converting durations
    const convertMinutesToHours = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };
    return (
        <>
            <Box sx={{ padding: "0.5rem", borderBottom: '1px solid gainsboro' }} mb={2} display={'flex'}>
                <span style={{ fontWeight: '600' }}>{data?.origin_data?.cityInfo?.name}</span> &nbsp;to&nbsp;<span style={{ fontWeight: '600' }}>{data?.destination?.cityInfo?.name}</span>, &nbsp; <span style={{ fontWeight: '600' }}>{formatDate(data?.departure_time)}</span>
            </Box>
            <Grid container spacing={2} mb={2} padding={'0.5rem'}>
                <Grid item lg={0.75} xs={1} display={'flex'} alignItems={'flex-start'} marginTop={'-1rem'}>
                    <img src={data?.carrier_image} width={'100%'} alt="logo" />
                </Grid>
                <Grid item lg={11.25} xs={11} mb={2} display={'flex'} alignItems={'flex-start'} justifyContent={'flex-start'} textAlign={'left'} >
                    {data.carrier_name} | {data?.flight_number}<div display={'flex'} style={{ border: '1px solid gainsboro', borderRadius: '10px', paddingRight: '0.5rem', paddingLeft: '0.5rem', marginLeft: '1rem', fontWeight: '550', fontSize: '0.75rem' }}>{data?.aircraft_data?.name}</div>
                </Grid>
                <Grid item lg={3} md={5.5} sm={12} xs={12}>
                    <Grid container>
                        <Grid item xs={12} fontSize={'1.5rem'} display={'flex'}>{data?.departure_time.slice(11, 16)}</Grid>
                        <Grid item xs={12} fontSize={'0.85rem'} display={'flex'}>{formatShortDate(data?.departure_time)}</Grid>
                        <Grid item xs={12} fontSize={'0.75rem'} display={'flex'}>{data?.origin_data?.name}</Grid>
                    </Grid>
                </Grid>
                <Grid item lg={1} md={1} sm={12} xs={12} display={'flex'} alignItems={'center'}>
                    <Grid container>
                        <Grid item xs={12} fontSize={'0.65rem'} display={'flex'} justifyContent={'center'}>{convertMinutesToHours(data?.trip_duration)}</Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={'center'}><HorizontalRuleIcon sx={{ color: 'blue', transform: 'scaleX(4)' }} /></Grid>
                    </Grid>
                </Grid>
                <Grid item lg={3} md={5.5} sm={12} xs={12}>
                    <Grid container>
                        <Grid item xs={12} fontSize={'1.5rem'} display={'flex'}>{data?.arrival_time.slice(11, 16)}</Grid>
                        <Grid item xs={12} fontSize={'0.85rem'} display={'flex'}>{formatShortDate(data?.arrival_time)}</Grid>
                        <Grid item xs={12} fontSize={'0.75rem'} display={'flex'}>{data?.destination?.name}</Grid>
                    </Grid>
                </Grid>
                <Grid item lg={1} md={4} sm={4} xs={4}>
                    <Grid container>
                        <Grid xs={12} fontSize={'1rem'} fontWeight={'800'} textAlign={'center'} >
                            BAGGAGE:
                        </Grid>
                        <Grid xs={12} fontSize={'0.75rem'} color={'grey'} textAlign={'center'}>
                            Adult
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={2} md={4} sm={4} xs={4}>
                    <Grid container>
                        <Grid xs={12} fontSize={'1rem'} fontWeight={'800'} textAlign={'center'} >
                            CHECK-IN:
                        </Grid>
                        <Grid xs={12} fontSize={'0.75rem'} color={'grey'} textAlign={'center'} >
                        23 Kgs (1 Piece x 23 Kgs)
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={2} md={4} sm={4} xs={4}>
                    <Grid container>
                        <Grid xs={12} fontSize={'1rem'} fontWeight={'800'} textAlign={'center'} >
                            CABIN:
                        </Grid>
                        <Grid xs={12} fontSize={'0.75rem'} color={'grey'} textAlign={'center'} >
                        7 Kgs
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} mb={1}/>
                <Grid item lg={3} md={4} sm={6} xs={12} display={'flex'}>
                    <WifiIcon/>
                    <span style={{fontSize:'0.75rem', textAlign:'left', fontFamily:'Poppins', display:'flex', alignItems:'center', marginLeft:'0.25rem'}}>
                        Wifi (Chargeable)
                    </span>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12} display={'flex'}>
                    <AirlineSeatReclineNormalIcon/>
                    <span style={{fontSize:'0.75rem', textAlign:'left', fontFamily:'Poppins', display:'flex', alignItems:'center', marginLeft:'0.25rem'}}>
                        Standard Recliner (29" Legroom)
                    </span>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12} display={'flex'}>
                    <CoffeeIcon/>
                    <span style={{fontSize:'0.75rem', textAlign:'left', fontFamily:'Poppins', display:'flex', alignItems:'center', marginLeft:'0.25rem'}}>
                        Beverage Available
                    </span>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12} display={'flex'}>
                    <OndemandVideoIcon/>
                    <span style={{fontSize:'0.75rem', textAlign:'left', fontFamily:'Poppins', display:'flex', alignItems:'center', marginLeft:'0.25rem'}}>
                        Inflight Entertainment
                    </span>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12} display={'flex'}>
                    <DinnerDiningIcon/>
                    <span style={{fontSize:'0.75rem', textAlign:'left', fontFamily:'Poppins', display:'flex', alignItems:'center', marginLeft:'0.25rem'}}>
                        Meals Available
                    </span>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12} display={'flex'}>
                    <DinnerDiningIcon/>
                    <span style={{fontSize:'0.75rem', textAlign:'left', fontFamily:'Poppins', display:'flex', alignItems:'center', marginLeft:'0.25rem'}}>
                        Complimentary Meals Available
                    </span>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12} display={'flex'}>
                    <ChargingStationIcon/>
                    <span style={{fontSize:'0.75rem', textAlign:'left', fontFamily:'Poppins', display:'flex', alignItems:'center', marginLeft:'0.25rem'}}>
                        USB Charging
                    </span>
                </Grid>
            </Grid>

        </>

    )
}