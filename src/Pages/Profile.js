import React,{useState,useEffect} from "react";
import {Link,useHistory} from 'react-router-dom'
import Sidebar from "../Components/Sidebar";
import {MdEdit} from 'react-icons/md'
import {AiOutlineLogout} from 'react-icons/ai'
import { RiLockPasswordLine } from "react-icons/ri";
import { CgMenuRight } from 'react-icons/cg'
import {FaUserCircle} from 'react-icons/fa'

function Profile(){
    const [uData,setUdata] = useState()
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile/${uData ? uData[0].user_id : ''}`
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

            const data = await res.json()
            setUdata(data.user)
            console.log(data)

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }catch(err){
            console.log(err)
            history.push('/signin')
        }
    }

    useEffect(() => {
        callAboutPage()
    },[])
    return(
        <>
            <Sidebar pactive='active' />
            <div className="about">
                <div className="content">
                    <div className="hdr">
                        <div className="beg">
                            <CgMenuRight />
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

                    <div className="pro-data">                        
                        <div className="hdrs">
                            <h3>Profile</h3>
                            {
                                uData ? <button id={uData[0].user_id} onClick={()=> history.push(`/dashboard/editprofile/${uData[0].user_id}`)}><MdEdit />Edit </button> : ''
                            }
                        </div>

                        <div className="img">
                            <img src='/Uploads/profile.svg'></img>
                        </div>

                        <p><b>Name  : </b> {uData ? uData[0].name : ''}</p>
                        <p><b>Email : </b> {uData ? uData[0].email : ''}</p>
                        <p><b>Department  : </b> {uData ? uData[0].department : ''}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile