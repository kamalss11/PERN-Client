import React,{ useContext, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import '../CSS/About.css'
import Sidebar from '../Components/S_sidebar'
import {FaWpforms} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiFillEdit,AiOutlineLogout} from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import {AiOutlineBars} from 'react-icons/ai'


function Student_dashboard(){
    const [uData,setUdata] = useState()
    const [publication,Setpublication] = useState()    
    const [achievement,Setachievement] = useState()  
    
    const [men,setMen] = useState(false)
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

            if(datas.user[0].roll != 'Student'){
                history.push('/dashboard')
            }   
            else{
                const stu = await fetch('/dashboard_student',{
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
    
                const s = await stu.json()
                console.log(s)
                Setpublication(s.publication)
                Setachievement(s.achievemnt)
            }         

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }catch(err){
            console.log(err)
            history.push('/signin')
        }
    }

        // Delete Publications
        const Pub = async(id)=>{
            console.log(id)
            try{
                const res = await fetch(`/forms/publication/publications/delete/${id}`,{
                    method: "PUT",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email : `${uData.email}`,
                        filled : `${uData.filled}`
                    })
                })

                callAboutPage()
        
                if(!res.status === 200){
                    const error = new Error(res.error)
                    throw error
                }
            }catch(err){
                console.log(err)
            }
        }

        // Delete achievements
        const Ach = async(id)=>{
            try{
                const res = await fetch(`/forms/achievement/achievements/delete/${id}`,{
                    method: "PUT",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email : `${uData.email}`,
                        filled : `${uData.filled}`
                    }),
                    credentials: 'include',
                })

                callAboutPage()
        
                if(!res.status === 200){
                    const error = new Error(res.error)
                    throw error
                }
            }catch(err){
                console.log(err)
            }
        }

    useEffect(() => {
        callAboutPage()
    },[])
    return (
        <>
            <Sidebar />
            <div id="docx" style={{display:'none'}}>
                <div class="WordSection1">
                    <h1>Name : {uData ? uData[0].name : ''}</h1>
                    <h1>Department : {uData ? uData[0].department : ''}</h1>
                    <h2>PUBLICATION </h2>
                    <h4>1.1 Publication</h4>
                    <table>
                    <tbody>
                    <tr>
                        <th>S.No</th>
                        <th>Department</th>
                        <th>Name of the Student</th>
                        <th>Roll No</th>
                        <th>Title of the paper</th>
                        <th>Name of the Journal</th>
                        <th>ISSN No & DOI</th>
                        <th>Volume No.,Issue & Page No</th>
                        <th>SCI/SCIE/Scopus Indexed/UGC/Recognized/Others</th>                        
                        <th>Web Link of the Publication</th>                        
                        <th>Impact Factor (as per SCI)</th>                     
                        <th>Level</th>
                    </tr>
                    {
                        publication ? publication.map((r,i)=>
                        { const {department,name,roll_no,title,journal,issn,volume_no,sci,link,impact,level} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{department ? department : '-'}</td>
                                <td>{roll_no ? roll_no : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{journal ? journal : '-'}</td>
                                <td>{issn ? issn : '-'}</td>
                                <td>{volume_no ? volume_no : '-'}</td>
                                <td>{sci ? sci : '-'}</td>
                                <td>{link ? link : '-'}</td>
                                <td>{impact ? impact : '-'}</td>
                                <td>{level ? level : '-'}</td>
                            </tr>
                        )
                        }):null
                    }
                    </tbody>
                    </table>
                    
                    <h2>ACHIEVEMENT </h2>
                    <h4>2.1 ACHIEVEMENTS</h4>
                    <table>
                    <tbody>
                    <tr>
                        <th>S.No</th>
                        <th>Department</th>
                        <th>Name of the student</th>
                        <th>Roll No</th>
                        <th>Achievement</th>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Venue</th>
                        <th>Level</th>
                    </tr>
                    {
                        achievement ? achievement.map((r,i)=>{
                            const {department,name,roll_no,achievement,event,date,venue,level} = r
                            return(
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{department ? department : '-'}</td>
                                    <td>{name ? name : '-'}</td>
                                    <td>{roll_no ? roll_no : '-'}</td>
                                    <td>{achievement ? achievement : '-'}</td>
                                    <td>{event ? event : '-'}</td>
                                    <td>{date ? date : '-'}</td>
                                    <td>{venue ? venue : '-'}</td>
                                    <td>{level ? level : '-'}</td>
                                </tr>
                            )
                        }):null
                    }
                    </tbody>
                    </table>
                </div>
            </div>

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
                                    <div className="research">
                                        <h3>Publication</h3>
    
                                        <h4>1.1 Publications</h4>  
                                        {publication ? publication.map((r,i)=>{ const {id,department,name,roll_no,title,journal,issn,volume_no,sci,link,impact,level} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Department :</b> {department ? department : 'NIL'}</p>
                                                    <p><b>Name of the student :</b> {name ? name : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Title of the paper :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Name of the Journal :</b> {journal ? journal : 'NIL'}</p>
                                                    <p><b>ISSN NO. & DOI :</b> {issn ? issn : 'NIL'}</p>
                                                    <p><b>Volume :</b> {volume_no ? volume_no : 'NIL'}</p>
                                                    <p><b>SCI/SCIE/Scopus Indexed/UGC Recognized/Others :</b> {sci ? sci : 'NIL'}</p>                                                    
                                                    <p><b>Web link of the Publication :</b> {link ? link : 'NIL'}</p>                                                    
                                                    <p><b>Impact Factor :</b> {impact ? impact : 'NIL'}</p>                                                    
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/publication/publications/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Pub(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Achievements */}

                                        <h3>Achievement</h3>
                                        <h4>2.1 Achievements</h4>  
                                        {achievement ? achievement.map((r,i)=>{
                                        const {id,department,name,roll_no,achievement,event,date,venue,level} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Departmnet :</b> {department ? department : 'NIL'}</p>
                                                    <p><b>Name of the Student :</b> {name ? name : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Prize/Achievement :</b> {achievement ? achievement : 'NIL'}</p>
                                                    <p><b>Event :</b> {event ? event : 'NIL'}</p>
                                                    <p><b>Date :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/achievement/achievements/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button onClick={e=>Ach(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
                                    </div>
                                    </>
                                : ''
                            }
                        </div>
    
                    </div>
            </div>
        </>
    )
}

export default Student_dashboard