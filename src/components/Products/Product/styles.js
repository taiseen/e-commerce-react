import { makeStyles } from '@material-ui/core/styles';

// makeStyles take 1 parameter () => 
// & another call-back function() inside there
// & that function has an instant return of an Object {}
// inside that Object we write CSS in Js way...

// makeStyles( );
// makeStyles( () => () );
// makeStyles( () => ({ }) );

export default makeStyles(() => ({
  root: {
    // maxWidth: 345, original width style
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));