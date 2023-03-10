import { useState } from 'react';
import { Typography, Box, Stack, FormControl, FormHelperText, TextField, TextareaAutosize, Select, MenuItem, Button } from '@pankod/refine-mui';
import { BookingFormProps } from 'interfaces/common';
import CustomButton from './CustomButton';
import { useTable } from '@pankod/refine-core';

const BookingForm = ({ type, register, handleSubmit, formLoading, onFinishHandler}: BookingFormProps) => {

    const [selectedPropertyPrice, setSelectedPropertyPrice] = useState<number>(999);
    const { tableQueryResult: {data, isLoading, isError}} = useTable();
    const allProperties = data?.data ?? [];

    if(isLoading) return <Typography>Loading...</Typography>
    if(isError) return <Typography>Error...</Typography>

  return (
  <Box>
    <Typography fontSize={25} fontWeight={700} color="#11142d">
      {type} a Property
    </Typography>

    <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
      <form style={{marginTop:'20px', width: '100%', display: "flex", flexDirection: "column", gap: "20px"}} onSubmit={handleSubmit(onFinishHandler)}>
        <FormControl>
          <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:16, color: '#11142d'}}>Select the Property</FormHelperText>
          <Select fullWidth required id="outlined-basic" color="info" variant="outlined" defaultValue="sea sand apartment and hotel" {...register('title', {required:true})}
            onChange={(e) => { const selectedTitle = e.target.value;
                               const selectedProperty = allProperties.find((item) => item.title.toLowerCase() === selectedTitle);
            if (selectedProperty) {
            setSelectedPropertyPrice(selectedProperty.price);
            }
            }}
           >
            {allProperties.map((item) => (
                <MenuItem key={item.title} value={item.title.toLowerCase()}>{item.title}</MenuItem>
            ))}
           </Select> 
        </FormControl>
        <FormControl>
          <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:14, color: '#11142d'}}>Full Name</FormHelperText>
          <TextField fullWidth required id="outlined-basic" color="info" variant="outlined" {...register('name', {required:true})} />
        </FormControl>
        <FormControl>
          <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:14, color: '#11142d'}}>Address</FormHelperText>
          <TextField fullWidth required id="outlined-basic" color="info" variant="outlined" {...register('address', {required:true})} />
        </FormControl>
        <FormControl>
          <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:14, color: '#11142d'}}>Contact Number</FormHelperText>
          <TextField fullWidth required id="outlined-basic" type="tel" color="info" variant="outlined" {...register('contactno', {required:true})} />
        </FormControl>
        <Stack direction="row" justifyContent="space-between" gap={4}>
            <FormControl fullWidth>
                <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:14, color: '#11142d'}}>Number of Rooms</FormHelperText>
                <TextField fullWidth required id="outlined-basic" type="number" color="info" variant="outlined" {...register('roomscount', {required:true})} />
            </FormControl>
            <FormControl fullWidth>
                <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:14, color: '#11142d'}}>Number of Days</FormHelperText>
                <TextField fullWidth required id="outlined-basic" type="number" color="info" variant="outlined" {...register('dayscount', {required:true})} />
                </FormControl>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={4}>
            <FormControl fullWidth>
                <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:14, color: '#11142d'}}>Number of Persons</FormHelperText>
                <TextField fullWidth required id="outlined-basic" type="number" color="info" variant="outlined" {...register('headscount', {required:true})} />
            </FormControl>
            <FormControl fullWidth>
                <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:14, color: '#11142d', textAlign: 'center'}}>Property Price</FormHelperText>
                <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:18, color: '#11142d', textAlign: 'center'}} required id="outlined-basic" type="number" color="info" variant="outlined" {...register('price', {required:true})}>
                    {selectedPropertyPrice}
                </FormHelperText>
            </FormControl>
        </Stack>
        <CustomButton type="submit" title={formLoading ? 'Submitting...' : 'Submit'} backgroundColor="#475be8" color="#fcfcfc" />
      </form>
    </Box>
  </Box>
  )
}

export default BookingForm