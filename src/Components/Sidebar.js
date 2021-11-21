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

function Sidebar(){
    const {bar} = useContext(AppContext)
    return (
        <div className={`sidebar ${bar ? `activate` : ''}`}>
            <h2 className="stitle">IQAC</h2>

            <ul>
                {
                    Sbar.map((bar)=>{
                        const {id,url,name,icon} = bar
                        return(
                            <li key={id}>
                                <Link to={url}>{icon} {name}</Link>
                            </li>
                        )
                    })
                }

                <li className="forms">
                    <FaWpforms /> Forms
                </li>

                <ul>
                    {
                        Formdatas.map((fname)=>{
                            const {id,name} = fname
                            if(name == "Research"){
                                return(
                                    <li key={id}>
                                        <b>{name}</b>
                                        {
                                            research.map(r=>{
                                                const {id,name,url} = r
                                                return(
                                                    <Link key={id} to={url}>{name}</Link>
                                                )
                                            })
                                        }
                                    </li>
                                )
                            }
                            else if(name == "Collaborations"){
                                return(
                                    <li key={id}>
                                        <b>{name}</b>
                                        {
                                            callob.map(c=>{
                                                const {id,name,url} = c
                                                return(
                                                    <Link key={id} to={url}>{name}</Link>
                                                )
                                            })
                                        }
                                    </li>
                                )
                            }

                            else if(name == "Events/Programmes/Visits Organized"){
                                return(
                                    <li key={id}>
                                        <b>{name}</b>
                                        {
                                            events.map(e=>{
                                                const {id,name,url} = e
                                                return(
                                                    <Link key={id} to={url}>{name}</Link>
                                                )
                                            })
                                        }
                                    </li>
                                )
                            }

                            else if(name == "Consultancy Projects/Services"){
                                return(
                                    <li key={id}>
                                        <b>{name}</b>
                                        {
                                            consultancy.map(c=>{
                                                const {id,name,url} = c
                                                return(
                                                    <Link key={id} to={url}>{name}</Link>
                                                )
                                            })
                                        }
                                    </li>
                                )
                            }

                            else if(name == "Faculty Details"){
                                return(
                                    <li key={id}>
                                        <b>{name}</b>
                                        {
                                            faculty.map(f=>{
                                                const {id,name,url} = f
                                                return(
                                                    <Link key={id} to={url}>{name}</Link>
                                                )
                                            })
                                        }
                                    </li>
                                )
                            }
                        })
                    }
                </ul>

                <li>
                    <Link to='/logout'><AiOutlineLogout /> Logout</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar