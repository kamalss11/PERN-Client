import React,{useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import '../CSS/About.css'
import '../CSS/dashboard.css'
import Sidebar from '../Components/Sidebar'
import {RiLockPasswordLine, RiRadarFill} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import {AiOutlineBars} from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import research from '../Datas/research'
import collab from '../Datas/callaborations'
import events from '../Datas/events'
import pser from '../Datas/projects_services'
import faculties from '../Datas/faculties'

function Add_staffs(){
    const [uData,setUdata] = useState()   
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile/${uData ? uData[0].user_id : ''}`
    console.log(uData)
    const [msg,setMsg] = useState('All')
    const history = useHistory()

    const callAboutPage = async () => {
        try{
            const res = await fetch('/dashboard',{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const datas = await res.json()
            console.log(datas)
            setUdata(datas.user)

            if(!res.status === 200){
                window.alert(`${res.error}`)
                history.push('/signin')
            }
        }catch(err){
            console.log(err)
            history.push('/signin')
        }
    }

    const MySelect = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
          <div className="fields">
            <label htmlFor={props.id || props.name}>{label}</label><br />
            <select {...field} {...props} />
            {
                meta.touched && meta.error ?(
                    <p className="error">{meta.error}</p>
                ):null
            }
          </div>
        )
    }

    useEffect(() => {
        callAboutPage()
    },[])
    return (
        <>
            <Sidebar />

            <div className={`about`}>
                    <div className="content">
                        <div className="hdr">
                            <div className="beg">
                                <AiOutlineBars />
                                <h3>Dashboard</h3>
                            </div>
                            <b onClick={()=>setMen(!men)}>
                                <p> <span>Hello,</span> {uData ? uData[0].name : ''}</p>
                                <ul className={men ? "men active" : "men"}>
                                    <li><Link to="/dashboard/profile"><CgProfile />Profile</Link></li>
                                    <li><Link to={editprofile}><RiLockPasswordLine />Change password</Link></li>
                                    <li><Link to="/logout"><AiOutlineLogout />Logout</Link></li>
                                </ul>
                            </b>
                        </div>
    
                        <div className="submitted">
                            {
                                uData  ? 
                                    <>
                                        <div className='dprt'>
                                            <h3>Internal Quality Assurance Cell (IQAC)</h3>
                                            <h3>Department : {uData ? uData[0].department : null} - Add Staffs Datas</h3>
                                        </div>
                                        {
                                            research ?
                                            <ul>
                                                {
                                                    research.map((r)=>{
                                                    const{id,name,url} = r
                                                        return(
                                                            <li key={id}>
                                                                <Link to={url}>{name}</Link>
                                                            </li>
                                                        )
                                                    })
                                                }

                                            </ul>  : null
                                        }

                                        {
                                            collab ?
                                            <ul>
                                                {
                                                    collab.map((r)=>{
                                                    const{id,name,url} = r
                                                        return(
                                                            <li key={id}>
                                                                <Link to={url}>{name}</Link>
                                                            </li>
                                                        )
                                                    })
                                                }

                                            </ul>  : null
                                        }     

                                        {
                                            events ?
                                            <ul>
                                                {
                                                    events.map((r)=>{
                                                    const{id,name,url} = r
                                                        return(
                                                            <li key={id}>
                                                                <Link to={url}>{name}</Link>
                                                            </li>
                                                        )
                                                    })
                                                }

                                            </ul>  : null
                                        }       

                                        {
                                            pser ?
                                            <ul>
                                                {
                                                    pser.map((r)=>{
                                                    const{id,name,url} = r
                                                        return(
                                                            <li key={id}>
                                                                <Link to={url}>{name}</Link>
                                                            </li>
                                                        )
                                                    })
                                                }

                                            </ul>  : null
                                        } 

                                        {
                                            faculties ?
                                            <ul>
                                                {
                                                    faculties.map((r)=>{
                                                    const{id,name,url} = r
                                                        return(
                                                            <li key={id}>
                                                                <Link to={url}>{name}</Link>
                                                            </li>
                                                        )
                                                    })
                                                }

                                            </ul>  : null
                                        } 
                                </>: null 
                            }    
                        </div>    
                    </div>
            </div>
        </>
    )
}

export default Add_staffs