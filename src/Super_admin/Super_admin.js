import React,{ useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import '../CSS/About.css'
import '../CSS/Super_admin.css'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import {CgMenuRight} from 'react-icons/cg'
import Sasidebar from '../Components/Sidebar'
import Department_list from '../Datas/Department_list'
import Student_details from '../Datas/student_details'
import research from '../Datas/research'
import callob from '../Datas/callaborations'
import events from '../Datas/events'
import prjser from '../Datas/projects_services'
import faculty from '../Datas/faculties'
import {FaUserCircle} from 'react-icons/fa'
import {IoMdArrowDropdownCircle} from 'react-icons/io'


function Super_admin(){
    var history = useHistory()
    const [staff,setStaff] = useState(false)    
    const [student,setStudent] = useState(false)
    const [tabind,setTabind] = useState(1)
    const [uData,setUdata] = useState()
    const editprofile = `/dashboard/editprofile`
    const [men,setMen] = useState(false)
    const [sb,setSb] = useState(false)
    const [act,setAct] = useState(false)
    const [act2,setAct2] = useState(false)
    
    useEffect(()=>{
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
        
                if(datas.user[0].roll !== 'SuperAdmin'){
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
        callAboutPage()
    },[history])
    return(
        <>
            <Sasidebar dactive="active" sb={sb} set={setSb} />
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
                
                    <div className='details'>
                        <h4>Internal Quality Assurance Cell ( IQAC ) - Reports</h4>

                        <div className='tab' style={{display: 'flex',justifyContent: 'center'}}>
                            <ul className='shdr'>
                                <li onClick={e=>setTabind(1)} className={tabind === 1 ? 'active' : null}>Departments</li>
                                <li onClick={e=>setTabind(2)} className={tabind === 2 ? 'active' : null}>Overall</li>
                                <li className='slide'></li>
                            </ul>
                        </div>

                        {
                            tabind === 1 ? 
                            <div style={{margin: '0 10px'}} className='dprt'>
                                <ul className='dlist'>
                                    {
                                        Department_list.map((l,i)=>{
                                            const {id,name,staffs,students} = l
                                            return(
                                                <li key={id}>{name} 
                                                    <div>
                                                        <Link target={'_blank'} to={staffs}>Staffs</Link>
                                                        <Link target={'_blank'} to={students}>Students</ Link>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div> : 
                            <div style={{margin: '0 10px'}} className='dprt'>
                                <ul className='dlist'>
                                    <li className={`${act ? 'ss active': 'ss'}`} onClick={()=>{setStaff(!staff);setAct(!act);setAct2(false);setStudent(false)}}>Staffs<IoMdArrowDropdownCircle className={`${staff ? 'active' : ''}`}/></li>
                                        <div className={staff ? 'tb1 active' : 'tb1'}>
                                            <h4>Research</h4>
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

                                            <h4>Collaborations</h4>

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
                                            
                                            <h4>Events/Programmes/Visits Organized</h4>

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
                                            
                                            <h4>Consultancy Projects/Services</h4>

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

                                            <h4>Faculty Details</h4>

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
                                    <li className={`${act2 ? 'ss active': 'ss'}`} onClick={()=>{setStudent(!student);setAct2(!act2);setAct(false);setStaff(false)}}>Students <IoMdArrowDropdownCircle className={`${student ? 'active' : ''}`}/></li>
                                        <div className={student ? 'tb2 active' : 'tb2'}>
                                            <h4>Student Details</h4>
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