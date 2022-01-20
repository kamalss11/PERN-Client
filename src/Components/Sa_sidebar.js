import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Sbar from '../Datas/S_data'
import Formdatas from '../Datas/Formdatas'
import {FaWpforms} from 'react-icons/fa'
import research from '../Datas/research'
import callob from '../Datas/callaborations'
import consultancy from '../Datas/projects_services'
import events from '../Datas/events'
import faculty from '../Datas/faculties'
import {AiOutlineLogout} from 'react-icons/ai'
import AppContext from '../Context/context'
import {FaFileWord} from 'react-icons/fa'

function Ss_sidebar(dactive){
    const {bar} = useContext(AppContext)
    return (
        <div className={`sidebar ${bar ? `activate` : ''}`}>
            <h2 className="stitle">IQAC</h2>

            <ul>
                <li><Link className={dactive ? "active" : ''} to={'/super_admin'}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></svg> Dashboard</Link>
                </li>
                
                <ul>
                </ul>
                
                <li>
                    <Link to='/logout'><AiOutlineLogout /> Logout</Link>
                </li>
            </ul>
        </div>
    )
}

export default Ss_sidebar