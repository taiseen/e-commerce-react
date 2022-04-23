import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { commerce } from '../../lib/commerce';
import { Link } from 'react-router-dom';
import FormInput from './CustomFormInput';


const AddressForm = ({ checkoutToken, test }) => {

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const methods = useForm();


    const fetchShippingCountries = async (checkoutTokenId) => {
        // by using commerce Object ==> api calling...
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        // convert Object Key's into Array & access 1st element from an Array
        setShippingCountry(Object.keys(countries)[0]);
    };


    const fetchSubdivisions = async (countryCode) => {
        // by using commerce Object ==> api calling...
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        // convert Object Key's into Array & access 1st element from an Array
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };


    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        // by using commerce Object ==> api calling...
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });
        setShippingOptions(options);
        // convert Object Key's into Array & access 1st element from an Array's value of id
        setShippingOption(options[0].id);
    };


    // 1st useEffect
    useEffect(() => {
        if (checkoutToken.id) fetchShippingCountries(checkoutToken.id);
    }, [checkoutToken.id]);


    // 2nd useEffect
    // when ever [shippingCountry] changes ==> run this component again...
    useEffect(() => {
        // sometime 'shippingCountry' can be empty ==> so thats why if() checking is good...
        // if (shippingCountry) ==> exist ==> then only call this ==> fetchSubdivisions() function...
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);


    // 3rd useEffect
    // when ever [shippingSubdivision] changes ==> run this component again...
    useEffect(() => {
        // if (shippingSubdivision) ==> exist ==> then only call this ==> fetchShippingOptions( , , ) function...
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping address</Typography>

            {/* all those methods are available by this ...spread operator */}
            <FormProvider {...methods}>

                <form onSubmit={methods.handleSubmit(data => test(
                    // data is an Object, that contain the Information for all these <FormInput> components field
                    { ...data, shippingCountry, shippingSubdivision, shippingOption }
                ))}>

                    <Grid container spacing={3}>

                        {/* automatically manage stat... */}
                        <FormInput required name="firstName" label="First name" />
                        <FormInput required name="lastName" label="Last name" />
                        <FormInput required name="address1" label="Address line 1" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="city" label="City" />
                        <FormInput required name="zip" label="Zip / Postal code" />

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select
                                fullWidth
                                defaultValue=""
                                value={shippingCountry}
                                onChange={e => setShippingCountry(e.target.value)}
                            >
                                {
                                    // .entries() method returns an Array Iterator object with key/value pairs
                                    // Object.entries() method returns an array of a given object's
                                    // as string-keyed property like ===> arrays of array... 2d array...
                                    // [ 
                                    //     [ 'key', 'value' ], 
                                    //     [ 'key', 'value' ],............
                                    // ]
                                    Object.entries(shippingCountries).map(([key, value]) => (
                                        { id: key, label: value })).map(country => (
                                            <MenuItem key={country.id} value={country.id}>
                                                {country.label}
                                            </MenuItem>
                                        ))
                                }
                            </Select>
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>

                            <Select
                                fullWidth
                                defaultValue=""
                                value={shippingSubdivision}
                                onChange={e => setShippingSubdivision(e.target.value)}
                            >
                                {
                                    // .entries() method returns an Array Iterator object with key/value pairs
                                    // Object.entries() method returns an array of a given object's
                                    // as string-keyed property like ===> arrays of array... 2d array...
                                    // [ 
                                    //     [ 'key', 'value' ], 
                                    //     [ 'key', 'value' ],............
                                    // ]
                                    Object.entries(shippingSubdivisions).map(([key, value]) => (
                                        { id: key, label: value })).map(subdivisions => (
                                            <MenuItem key={subdivisions.id} value={subdivisions.id}>
                                                {subdivisions.label}
                                            </MenuItem>
                                        ))
                                }
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>

                            <Select
                                fullWidth
                                defaultValue=""
                                value={shippingOption}
                                onChange={e => setShippingOption(e.target.value)}
                            >
                                { // shippingOptions ==> are Array by default... & each (sO) is an Object...
                                    shippingOptions.map(sO => (
                                        { id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.label}
                                            </MenuItem>
                                        ))
                                }
                            </Select>
                        </Grid>

                    </Grid>

                    <br />

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            component={Link}
                            to='/cart'
                            variant="outlined"
                        >
                            Back to Cart
                        </Button>

                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Next
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
