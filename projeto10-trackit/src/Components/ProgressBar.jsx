import  { CircularProgressbar, buildStyles }  from  'react-circular-progressbar' ; 
import  'react-circular-progressbar/dist/styles.css' ;

import { useContext } from 'react';
import UserContext from './Contexts/UserContext';

function ProgressBar () {

    const { progress } = useContext(UserContext);
    const percentage = progress
    
    return (
        <CircularProgressbar 
            value={percentage} 
            text={"hoje"}
            background
            backgroundPadding= {6}
            styles={buildStyles({
            backgroundColor:"#52B6FF",
            textColor: "#ffffff",
            pathColor: "#ffffff",
            trailColor: "transparent"
            })} 
        />
    )
}

export default ProgressBar;