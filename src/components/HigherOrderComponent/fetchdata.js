import React, {useEffect, useState} from 'react';
import axios from 'axios';

const fetchdata = (WrappedComponent, url)=>{

 const Fetchdata =()=>{

    const [allData, setAllData] = useState([]);
    const [loaded, setLoaded] = useState(true);
    useEffect(() => {
      let mounted = true
    axios.get(url).then(res => {
      if (mounted) {setAllData(res.data);
        setLoaded(false)
      }
      });

      return function cleanup() {
        mounted = false
    }

    },[]);

    return (
        <WrappedComponent allData={allData} loaded={loaded}/>
    )
}

 return Fetchdata;

}

export default fetchdata;