import React,{ useEffect,useState }  from 'react'
import {Link,useHistory} from 'react-router-dom'
import '../CSS/not.css'

function Not(){
    const [pX,setPx] = useState('center')
    const [pY,setPy] = useState('center')
    return(
        <div className='backgrd'>
            <div className='container' onMouseMove={(e)=>{setPx(e.clientX);setPy(e.clientY)}} style={{backgroundImage: 'url(./Images/p404.png)',backgroundPositionX: `${pX}px`,backgroundPositionY: `${pY}px` }}>
            <div className='content'>
                <h2>404</h2>
                <h4>Oops! Page Not Found</h4>
                <p>The Page you were looking for doesn't exists.You may have mistyped the address or the page may have moved</p>
                <Link to='/'>Home</Link>
            </div>
            </div>
        </div>
    )
}

export default Not