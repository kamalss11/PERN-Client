import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Sbar from '../Datas/S_data'
import {TiExport} from 'react-icons/ti'
import {AiOutlineLogout} from 'react-icons/ai'
import AppContext from '../Context/context'
import '../CSS/About.css'

function Sidebar({Formdatas,research,callob,events,consultancy,faculty,exp,stu,dactive,pactive}){
    const {bar} = useContext(AppContext)
    return (
        <div className={`sidebar ${bar ? `activate` : ''}`}>
            <h2 className="stitle">IQAC</h2>

            <ul>
                {
                    Sbar.map((bar)=>{
                        const {id,url,name,icon} = bar
                        if(name === 'Dashboard'){
                            return(
                                <li key={id}>
                                    <Link className={`${dactive ? 'active' : ''}`} to={url}>{icon} {name}</Link>
                                </li>
                            )
                        }
                        else{
                            return(
                                <li key={id}>
                                    <Link className={`${pactive ? 'active' : ''}`} to={url}>{icon} {name}</Link>
                                </li>
                            )
                        }
                    })
                }
 
                {exp ?  <li className="forms" style={{cursor:" pointer"}}>
                    <Link to={'/dashboard/staffs_export'} className="expall"><TiExport />Exports</Link>
                </li> : null}
                
                {stu ?  <li className="forms" style={{cursor:" pointer"}}>
                    <Link to={'/dashboard/students_export'} className="expall"><TiExport />Exports</Link>
                </li> : null}

                <ul>
                    { 
                        Formdatas ? 
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
                        }) : null
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