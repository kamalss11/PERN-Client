import React,{ useContext, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import '../CSS/About.css'
import '../CSS/Super_admin.css'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiFillEdit,AiOutlineLogout} from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import {AiOutlineBars} from 'react-icons/ai'
import Sa_sidebar from '../Components/Sa_sidebar'
import Department_list from '../Datas/Department_list'
import Student_details from '../Datas/student_details'
import research from '../Datas/research'
import callob from '../Datas/callaborations'
import events from '../Datas/events'
import prjser from '../Datas/projects_services'
import faculty from '../Datas/faculties'


function Super_admin(){
    const history = useHistory()
    const [staff,setStaff] = useState(false)    
    const [student,setStudent] = useState(false)
    const [tabind,setTabind] = useState(1)
    const [uData,setUdata] = useState()
    const editprofile = `/dashboard/editprofile/${uData ? uData[0].user_id : ''}`
    const [men,setMen] = useState(false)
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
    
            if(datas.user[0].roll != 'SuperAdmin'){
                history.push('/signin')
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
    
    useEffect(()=>{
        callAboutPage()
    },[])
    return(
        <>
            <Sa_sidebar />

            <div className={`about`}>
                <div className="content">
                    <div className="hdr">
                        <div className="beg">
                            <AiOutlineBars />
                            <h3>Super Admin</h3>
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
                
                    <div className='details'>
                        <h3>Internal Quality Assurance Cell(IQAC) - Reports</h3>

                        <div className='tab' style={{display: 'flex',justifyContent: 'center'}}>
                            <ul className='shdr'>
                                <li onClick={e=>setTabind('1')} className={tabind == '1' ? 'active' : null}>Departments</li>
                                <li onClick={e=>setTabind('2')} className={tabind == '2' ? 'active' : null}>Overall</li>
                                <li className='slide'></li>
                            </ul>
                        </div>

                        {
                            tabind == 1 ? 
                            <div className='dprt'>
                                <ul className='dlist'>
                                    {
                                        Department_list.map((l,i)=>{
                                            const {id,name,staffs,students} = l
                                            return(
                                                <li key={id}>{name} 
                                                    <div>
                                                        <Link onClick={(e)=>{window.localStorage.setItem('dprt',name)}} to={staffs}>Staffs</Link>
                                                        <Link onClick={(e)=>{window.localStorage.setItem('dprt',name)}} to={students}>Students</ Link>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div> : 
                            <div className='dprt'>
                                <ul className='dlist'>
                                    <li onClick={e=>setStaff(!staff)}>Staffs</li>
                                        <div className={staff ? 'tb1 active' : 'tb1'}>
                                            {
                                                research.map((l,i)=>{
                                                    const{id,name,s_a} = l
                                                    return(
                                                        <>  
                                                            <Link key={id} to={s_a} target={'_blank'}>{name}</Link><br />
                                                        </>
                                                    )
                                                })
                                            }

                                            {
                                                callob.map((l,i)=>{
                                                    const{id,name,s_a} = l
                                                    return(
                                                        <>  
                                                            <Link key={id} to={s_a} target={'_blank'}>{name}</Link><br />
                                                        </>
                                                    )
                                                })
                                            }

                                            {
                                                events.map((l,i)=>{
                                                    const{id,name,s_a} = l
                                                    return(
                                                        <>  
                                                            <Link key={id} to={s_a} target={'_blank'}>{name}</Link><br />
                                                        </>
                                                    )
                                                })
                                            }

                                            {
                                                prjser.map((l,i)=>{
                                                    const{id,name,s_a} = l
                                                    return(
                                                        <>  
                                                            <Link key={id} to={s_a} target={'_blank'}>{name}</Link><br />
                                                        </>
                                                    )
                                                })
                                            }

                                            {
                                                faculty.map((l,i)=>{
                                                    const{id,name,s_a} = l
                                                    return(
                                                        <>  
                                                            <Link key={id} to={s_a} target={'_blank'}>{name}</Link><br />
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    <li onClick={e=>setStudent(!student)}>Students</li>
                                        <div className={student ? 'tb2 active' : 'tb2'}>
                                            {
                                                Student_details.map((l,i)=>{
                                                    const{id,name,s_a} = l
                                                    return(
                                                        <>
                                                            <Link key={id} to={s_a} target={'_blank'}>{name}</Link> <br />
                                                        </>
                                                    )
                                                })
                                            }
                                        </div> 
                                </ul>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default Super_admin