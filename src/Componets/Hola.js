import * as React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function Hola() {

const [value, setValue] = React.useState('2014-08-18T21:11:54');

const handleChange = (newValue) => {
  setValue(newValue);
};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
          label="Time"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />

    </LocalizationProvider>
  );
}


