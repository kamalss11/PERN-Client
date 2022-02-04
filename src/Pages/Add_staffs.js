import React,{useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import '../CSS/About.css'
import '../CSS/dashboard.css'
import Sidebar from '../Components/Sidebar'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import research from '../Datas/research'
import collab from '../Datas/callaborations'
import events from '../Datas/events'
import pser from '../Datas/projects_services'
import faculties from '../Datas/faculties'
import {FaUserCircle} from 'react-icons/fa'
import { CgMenuRight } from 'react-icons/cg'

function Add_staffs(){
    const [uData,setUdata] = useState()   
    const [men,setMen] = useState(false)
    const [sb,setSb] = useState(false)
    const editprofile = `/dashboard/editprofile`
    console.log(uData)
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
            <Sidebar sb={sb} set={setSb} />
            <div className={`about ${sb ? 'activate' : ''}`}>
                <div className="content">
                    <div className={`hdr ${sb ? 'activate' : ''}`}>
                            <div className="beg">
                                <CgMenuRight onClick={e=>setSb(!sb)} />
                                <h4>Dashboard</h4>
                            </div>

                            <b onClick={()=>setMen(!men)}>
                                <p> <span>Hello,</span> {uData ? uData[0].name : ''}</p>
                                <ul className={men ? "men active" : "men"}>
                                    <li><Link to="/dashboard/profile"><FaUserCircle />Profile</Link></li>
                                    <li><Link to={editprofile}><RiLockPasswordLine />Change password</Link></li>
                                    <li><Link to="/logout"><AiOutlineLogout />Logout</Link></li>
                                </ul>
                            </b>
                    </div>
    
                    <div className="submitted">
                            <div className='img'>
                                <img src='/Uploads/add.svg' />
                            </div>
                            {
                                uData  ? 
                                    <>
                                        <div className='dprt'>
                                            <h4>Internal Quality Assurance Cell (IQAC)</h4>
                                            <h4>Department : {uData ? uData[0].department : null} - Add Staffs Datas</h4>
                                        </div>
                                        <div className='add'>
                                            <h3>Research</h3>
                                            {
                                                research ?
                                                <>
                                                    {
                                                        research.map((r)=>{
                                                        const{id,name,url} = r
                                                            return(
                                                                <Link key={id} to={url}>{name}</Link>
                                                            )
                                                        })
                                                    }

                                                </>  : null
                                            }

                                            <h3>Collaborations</h3>
                                            {
                                                collab ?
                                                <>
                                                    {
                                                        collab.map((r)=>{
                                                        const{id,name,url} = r
                                                            return(
                                                                <Link key={id} to={url}>{name}</Link>
                                                            )
                                                        })
                                                    }

                                                </>  : null
                                            }     

                                            <h3>Events/Programmes/Visits Organized</h3>
                                            {
                                                events ?
                                                <>
                                                    {
                                                        events.map((r)=>{
                                                        const{id,name,url} = r
                                                            return(
                                                                <Link key={id} to={url}>{name}</Link>
                                                            )
                                                        })
                                                    }

                                                </>  : null
                                            }       

                                            <h3>Consultancy Projects/Services</h3>
                                            {
                                                pser ?
                                                <>
                                                    {
                                                        pser.map((r)=>{
                                                        const{id,name,url} = r
                                                            return(
                                                                <Link key={id} to={url}>{name}</Link>
                                                            )
                                                        })
                                                    }

                                                </>  : null
                                            } 

                                            <h3>Faculty Details</h3>

                                            {
                                                faculties ?
                                                <>
                                                    {
                                                        faculties.map((r)=>{
                                                        const{id,name,url} = r
                                                            return(
                                                                <Link key={id} to={url}>{name}</Link>
                                                            )
                                                        })
                                                    }

                                                </>  : null
                                            } 
                                        </div>
                                </>: null 
                            }    
                    </div>    
                </div>
            </div>
        </>
    )
}

export default Add_staffs