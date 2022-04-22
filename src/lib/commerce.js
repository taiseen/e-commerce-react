import Commerce from '@chec/commerce.js';

export const commerce = new Commerce(process.env.REACT_APP_CHECK_PUBLIC_KEY, true);

// creating a new instance from commerce.js 
// & that instance become our Store...
// all data come from this Store Object ==> [ commerce ] 

// const commerce = new Commerce( , ) <== this Object/instance is store

// now use this [ commerce ] store object...
// form all over our application for accessing data 