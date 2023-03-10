import { useState } from "react";
import { Typography, Box, Stack, FormControl, FormHelperText, TextField, TextareaAutosize, Select, MenuItem, Button } from '@pankod/refine-mui';
import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';
import { Add, Remove } from "@mui/icons-material";

const Form = ({ type, register, handleSubmit, handleImageChange, propertyImage, formLoading, onFinishHandler}: FormProps) => {

  const [propertyFor, setPropertyFor] = useState('sell');

  const [fields, setFields] = useState([{ id: 1}]); // initialize with one field
  const [nextId, setNextId] = useState(2); // the id for the next field

  const handleAddField = () => {
    setFields([...fields, { id: nextId }]); // add a new field to the state array
    setNextId(nextId + 1); // increment the nextId
  };

  const handleRemoveField = (id: number) => {
    setFields(fields.filter(field => field.id !== id)); // remove the field with the corresponding id
    setNextId(nextId - 1);
  };

  const handleFieldChange = (id: number) => {
    setFields(fields.map(field => (field.id === id ? { id } : field))); // update the value of a field in the state array
  };

  return (
  <Box>
    <Typography fontSize={25} fontWeight={700} color="#11142d">
      {type} a Property
    </Typography>

    <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
      <form style={{marginTop:'20px', width: '100%', display: "flex", flexDirection: "column", gap: "20px"}} onSubmit={handleSubmit(onFinishHandler)}>
        <FormControl>
          <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:16, color: '#11142d'}}>Enter Property Name</FormHelperText>
          <TextField fullWidth required id="outlined-basic" color="info" variant="outlined" {...register('title', {required:true})} />
        </FormControl>
        <FormControl>
          <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:16, color: '#11142d'}}>Enter Property Description</FormHelperText>
          <TextareaAutosize minRows={5} required placeholder='Write Description' color="info" style={{width: '100%', background: 'transparent', fontSize: '16px', borderColor:'rgba(0,0,0,0.23)', borderRadius: 6, padding: 10, color: '#919191'}} {...register('description', {required:true})}/>
        </FormControl>
        <FormControl fullWidth>
          <FormHelperText sx={{fontWeight: 500,margin: '10px', fontSize: 16, color: '#11142d'}}>
            Property For
          </FormHelperText>
          <Select variant='outlined' displayEmpty required inputProps={{'aria-label': 'Without label'}} value={propertyFor} onChange={(event) => setPropertyFor(event.target.value)} >
            <MenuItem value="sell">For Sell</MenuItem>
            <MenuItem value="rent">For Rent</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{flex:1}}>
          <FormHelperText sx={{fontWeight: 500,margin: '10px', fontSize: 16, color: '#11142d'}}>
            Select Property Type
          </FormHelperText>
          <Select variant='outlined' color="info" displayEmpty required inputProps={{'aria-label': 'Without label'}} defaultValue="apartment" {...register( 'propertyType', {required:true})}>
            <MenuItem value="apartment">Apartment</MenuItem>
            <MenuItem value="villa">Villa</MenuItem>
            <MenuItem value="farmhouse">Farmhouse</MenuItem>
            <MenuItem value="condos">Condos</MenuItem>
            <MenuItem value="townhouse">Townhouse</MenuItem>
            <MenuItem value="duplex">Duplex</MenuItem>
            <MenuItem value="studio">Studio</MenuItem>
            <MenuItem value="chalet">Chalet</MenuItem>
          </Select>
        </FormControl>
        {propertyFor === 'rent' && (
        <Stack direction="row" gap={2} justifyContent="space-between">
          <Typography fontSize={18} fontWeight={500} color="#11142d">Packages</Typography>
          <Stack direction="row" gap={2} justifyContent="space-between">
          <CustomButton title="Remove" handleClick={() => handleRemoveField(fields[fields.length - 1].id)} backgroundColor="#475be8" color="#fcfcfc" disabled={fields[fields.length - 1].id === 1}  icon={<Remove />} />
          <CustomButton title="Add" handleClick={handleAddField} backgroundColor="#475be8" color="#fcfcfc" disabled={fields[fields.length - 1].id === 4} icon={<Add />} />
          </Stack>
        </Stack>
        )}
        {propertyFor === 'rent' && (
        <Box>
          {fields.map(({ id }) => (
          <Box key={id} onChange={(e) => handleFieldChange(id)} mt={2}>
            <Typography fontSize={16} fontWeight={500} color="#11142d">Packages {id}</Typography>
            <Stack direction="row" gap={4} mt={2}>
              <FormControl fullWidth>
                <TextField label={"Package Name "+id} required id="outlined-basic" color="info" variant="outlined" {...register('packagename'+id)} />
              </FormControl>
              <FormControl fullWidth>
                <TextField label={"Package " +id + " Price"} required id="outlined-basic" type="number" color="info" variant="outlined" {...register('packageprice'+id)} />
              </FormControl>
            </Stack>
            <Stack direction="row" gap={2} mt={2}>
              <FormControl fullWidth>
                <TextField label={"Days"} required id="outlined-basic" type="number" color="info" variant="outlined" {...register('days'+id)} />
              </FormControl>
              <FormControl fullWidth>
                <TextField label={"Rooms"} required id="outlined-basic" type="number" color="info" variant="outlined" {...register('rooms'+id)} />
              </FormControl>
              <FormControl fullWidth>
                <TextField label={"Persons"} required id="outlined-basic" type="number" color="info" variant="outlined" {...register('persons'+id)} />
              </FormControl>
            </Stack>
          </Box>
          ))}
        </Box>
        )}
        {propertyFor === 'sell' && (
        <FormControl fullWidth>
          <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:16, color: '#11142d'}}>Enter Property Price</FormHelperText>
          <TextField required id="outlined-basic" type="number" color="info" variant="outlined" {...register('price')} />
        </FormControl>
        )}
        <FormControl>
          <FormHelperText sx={{fontWeight:500, margin: '10px', fontSize:16, color: '#11142d'}}>Enter Location</FormHelperText>
          <TextField fullWidth required id="outlined-basic" color="info" variant="outlined" {...register('location', {required:true})} />
        </FormControl>
        <Stack direction="column" gap={1} justifyContent="center" mb={2}>
          <Stack direction="row" gap={2}>
            <Typography color="#11142d" margin="10px" fontSize={16} fontWeight={500} my="10px">Property Photo</Typography>
            <Button component="label" sx={{width: "fit-content", color: "#2ed480", textTransform: 'capitalize', fontSize: 16}}>
              Upload *<input hidden accept="image/*" type="file" onChange={(e) => {
              // @ts-ignore 
              handleImageChange(e.target.files[0])}} />
            </Button>
          </Stack>
          <Typography fontSize={14} color="#808191" sx={{wordBreak: 'break-all'}}>{propertyImage?.name}</Typography>
        </Stack>
        <CustomButton type="submit" title={formLoading ? 'Submitting...' : 'Submit'} backgroundColor="#475be8" color="#fcfcfc" />
      </form>
    </Box>
  </Box>
  )
}

export default Form