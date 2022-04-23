import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';


function CustomFormInput({ name, label, required }) {

    const { control } = useFormContext();
    const isError = false;

    return (
        <Grid item xs={12} sm={6}>

            <Controller
                name={name}
                control={control}
                error={isError}
                // as={TextField}

                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        label={label}
                        required={required}
                    />
                )}
            />

        </Grid>
    );
}

export default CustomFormInput;
