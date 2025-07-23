import { Box, Typography } from "@mui/material";

const DataNotFound=({text,width="80%"})=>{
    return(
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',my:6}}>
        <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <img src='/assets/Poojari.png' alt="Empty Notification image" style={{width:width,margin:"16px 0px"}}/>
            <Typography sx={{ font: 'Plus Jakarta Sans', fontWeight: 600, fontSize: {xs:'16px',sm:'20px',md:'24px'}, lineHeight: '32px', textAlign: 'center' }}>{text}</Typography>
        </Box>
    </Box>
    )
}
export default DataNotFound;