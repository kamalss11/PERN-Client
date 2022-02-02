import React,{ useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useField } from 'formik'
import '../CSS/About.css'
import '../CSS/dashboard.css'
import Sidebar from '../Components/Sidebar'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import { CgProfile,CgMenuRight } from 'react-icons/cg'
import {IoArrowRedoCircle} from 'react-icons/io5'
import {FaUserCircle} from 'react-icons/fa'


function Dashboard(){
    const [tabind,setTabind] = useState(1)
    const [uData,setUdata] = useState()  
    const [men,setMen] = useState(false)
    const [sb,setSb] = useState(false)
    const editprofile = `/dashboard/editprofile/${uData ? uData[0].user_id : ''}`
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

            if(datas.user[0].roll === 'SuperAdmin'){
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
            <div className='dg'></div>
            <Sidebar dactive="active" sb={sb} set={setSb} />
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
                        {
                            uData  ? 
                                <>
                                    <div className='dprt'>
                                        <h4>Internal Quality Assurance Cell (IQAC)</h4>
                                        <h4>Department : {uData ? uData[0].department : null }</h4>
                                        <img src='/Uploads/dashboard.svg'></img>
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
                                                    <li><Link to='/dashboard/view_staffs'><IoArrowRedoCircle /> View Staffs Datas</Link></li>
                                                    <li><Link to='/dashboard/add_staffs'><IoArrowRedoCircle /> Add Staffs Datas</Link></li>
                                                </ul> : 
                                                <ul className='links'>
                                                    <li><Link to='/dashboard/view_students'><IoArrowRedoCircle /> View Students Datas</Link></li>
                                                    <li><Link to='/dashboard/add_students'><IoArrowRedoCircle /> Add Students Datas</Link></li>
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