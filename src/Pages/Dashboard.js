import React,{ useContext, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import Axios from 'axios'
import '../CSS/About.css'
import '../CSS/dashboard.css'
import Sidebar from '../Components/Sidebar'
import * as Yup from 'yup'
import {FaWpforms} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiFillEdit,AiOutlineLogout} from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import {AiOutlineBars} from 'react-icons/ai'


function Dashboard(){
    const [tabind,setTabind] = useState(1)
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

            if(datas.user[0].roll = 'SuperAdmin'){
                history.push('/super_admin')
            }

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
                                            <h3>Department : {uData ? uData[0].department : null}</h3>
                                    </div>

                                    <div className='modules'>
                                            <ul>
                                                <li className={tabind == 1 ? 'active' : null} onClick={e=>setTabind(1)}>Staffs</li>
                                                <li className={tabind == 2 ? 'active' : null} onClick={e=>setTabind(2)}>Students</li>
                                                <li className={tabind == 2 ? 'slide active' : 'slide'}></li>
                                            </ul>
                                    </div>

                                    <div className='da'>
                                            {
                                                tabind == 1 ? 
                                                <ul className='links'>
                                                    <li><Link to='/dashboard/view_staffs'>1. View Staffs Datas</Link></li>
                                                    <li><Link to='/dashboard/add_staffs'>2. Add Staffs Datas</Link></li>
                                                </ul> : 
                                                <ul className='links'>
                                                    <li><Link to='/dashboard/view_students'>1. View Students Datas</Link></li>
                                                    <li><Link to='/dashboard/add_students'>2. Add Students Datas</Link></li>
                                                </ul>
                                            }
                                    </div>
                                </> 
                            : null
                        }
                    </div>
    
                </div>
            </div>
        </>
    )
}

export default Dashboard