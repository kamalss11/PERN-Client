import React,{useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import '../CSS/About.css'
import '../CSS/dashboard.css'
import Sidebar from '../Components/Sidebar'
import * as Yup from 'yup'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import {AiOutlineBars} from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'


function Viewstudents(){
    const [exp,setExp] = useState('exp')
    const [uData,setUdata] = useState()
    const [placements,setPlacements] = useState([])
    const [publications,setPublications] = useState([])
    const [paper_presentation,setPaper] = useState([])
    const [competition,setCompetition] = useState([])
    const [conference,setConference] = useState([])
    const [training,setTraining] = useState([])
    const [projectwork,setProjectwork] = useState([])
    const [exams,setExams] = useState([])
    const [online_courses,setOnline_courses] = useState([])
    const [achievements,setAchievements] = useState([])
    const history = useHistory()
    const [msg,setMsg] = useState('All')
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile/${uData ? uData[0].user_id : ''}`
    console.log(uData)

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
                const ad = await fetch(`/super_admin/departments/students/${datas.user[0].department}`,{
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                })
    
                const s_admin = await ad.json()
                console.log(s_admin)

                setPlacements(s_admin.placements)
                setPublications(s_admin.publications)
                setPaper(s_admin.paper_presentation)
                setConference(s_admin.conference)
                setCompetition(s_admin.competition)
                setTraining(s_admin.training)
                setProjectwork(s_admin.projectwork)
                setExams(s_admin.exams)
                setOnline_courses(s_admin.online_courses)
                setAchievements(s_admin.achievements)
            }
            else{
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

    const call_period = async (prd) => {
        try{
            const res = await fetch(`/period/students/${prd}/${uData[0].department}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const datas = await res.json()
            console.log(datas)

            setPlacements(datas.placements)
            setPublications(datas.publications)
            setPaper(datas.paper_presentation)
            setConference(datas.conference)
            setCompetition(datas.competition)
            setTraining(datas.training)
            setProjectwork(datas.projectwork)
            setExams(datas.exams)
            setOnline_courses(datas.online_courses)
            setAchievements(datas.achievements)

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }catch(err){
            console.log(err)
            history.push('/signin')
        }
    }
    // Delete Placements
    const Pla = async(id)=>{
        console.log(id)
        try{
            const res = await fetch(`/forms/student/palcements/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
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

    // Delete Publications
    const Pub = async(id)=>{
        try{
            const res = await fetch(`/forms/student/s_publications/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
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

    // Paper Presentation
    const Ppr = async(id)=>{
        try{
            const res = await fetch(`/forms/student/s_paper_presentation/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
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

    // Competition
    const Com = async(id)=>{
        try{
            const res = await fetch(`/forms/student/s_competition/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
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

    // Conference
    const Con = async(id)=>{
        try{
            const res = await fetch(`/forms/student/s_conference/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
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

    // Training
    const Tra = async(id)=>{
        try{
            const res = await fetch(`/forms/student/s_training/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
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

    // project work
    const Pw = async(id)=>{
        try{
            const res = await fetch(`/forms/student/s_projectwork/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
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

    // exams
    const Ex = async(id)=>{
        try{
            const res = await fetch(`/forms/student/s_exams/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
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

    // online courses
    const Oc = async(id)=>{
        try{
            const res = await fetch(`/forms/student/s_onlinecourses/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
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

    // achievements
    const Ac = async(id)=>{
        try{
            const res = await fetch(`/forms/student/s_achievements/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
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
            <Sidebar stu={exp} />

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
                                            <h3>Department : {uData ? uData[0].department : null} - Students</h3>
                                            {
                                                msg ? 
                                                <>
                                                    {msg === 'All' ? 
                                                        <p className='rp p'>Reports</p> : <>
                                                            <p className='rp'>Quaterly Report</p>
                                                            <p className='rp p'>{msg ? msg : null}</p>
                                                        </>
                                                    }
                                                </> : null
                                            }
                                        </div>

                                    <Formik
                                        initialValues={{
                                            period : ''
                                        }}

                                        enableReinitialize

                                        validationSchema={
                                            Yup.object({
                                                period: Yup.string().required('Required')
                                            })
                                        }
                                    >
                                        <Form style={{textAlign:'center',margin:'20px 0',background:'none'}}>
                                            <div>
                                            <label style={{fontSize:'14px',fontWeight:'bold'}}>Filter by Period</label><br />
                                            <select style={{margin:'15px 0',}} onChange={async (e)=>{
                                                if(e.target.value === 'All'){
                                                    setMsg('All')
                                                }
                                                else if(e.target.value === `'2019-07-01' and '2019-09-30'`){
                                                    setMsg(`July (01/07/2019) to September (30/09/2019)`)
                                                }
                                                else if(e.target.value === `'2019-10-01' and '2019-12-31'`){
                                                    setMsg(`October (01/10/2019) to December (30/12/2019)`)
                                                }
                                                else if(e.target.value === `'2020-01-01' and '2020-03-31'`){
                                                    setMsg(`January (01/01/2020) to March (31/03/2020)`)
                                                }
                                                else if(e.target.value === `'2020-04-01' and '2020-06-30'`){
                                                    setMsg(`April (01/04/2020) to June (30/06/2020)`)
                                                }

                                                else if(e.target.value === `'2020-07-01' and '2020-09-30'`){
                                                    setMsg(`July (01/07/2020) to September (30/09/2020)`)
                                                }
                                                else if(e.target.value === `'2020-10-01' and '2020-12-31'`){
                                                    setMsg(`October (01/10/2020) to December (30/12/2020)`)
                                                }
                                                else if(e.target.value === `'2021-01-01' and '2021-03-31'`){
                                                    setMsg(`January (01/01/2021) to March (31/03/2021)`)
                                                }
                                                else if(e.target.value === `'2021-04-01' and '2021-06-30'`){
                                                    setMsg(`April (01/04/2021) to June (30/06/2021)`)
                                                }

                                                else if(e.target.value === `'2021-07-01' and '2021-09-30'`){
                                                    setMsg(`July (01/07/2021) to September (30/09/2021)`)
                                                }
                                                else if(e.target.value === `'2021-10-01' and '2021-12-31'`){
                                                    setMsg(`October (01/10/2021) to December (30/12/2021)`)
                                                }
                                                else if(e.target.value === `'2022-01-01' and '2022-03-31'`){
                                                    setMsg(`January (01/01/2022) to March (31/03/2022)`)
                                                }
                                                else if(e.target.value === `'2022-04-01' and '2022-06-30'`){
                                                    setMsg(`April (01/04/2022) to June (30/06/2022)`)
                                                }

                                                if(e.target.value === 'All'){
                                                    await callAboutPage()
                                                }
                                                else{
                                                    await call_period(e.target.value)
                                                }
                                            }} name="period" label="Filter By Period">
                                                <option selected value='All'>All</option>
                                                <option value={`'2019-07-01' and '2019-09-30'`}>July - September(2019)</option>
                                                <option value={`'2019-10-01' and '2019-12-31'`}>October - December(2019)</option>
                                                <option value={`'2020-01-01' and '2020-03-31'`}>January - March(2020)</option>
                                                <option value={`'2020-04-01' and '2020-06-30'`}>April - June(2020)</option>

                                                <option value={`'2020-07-01' and '2020-09-30'`}>July - September(2020)</option>
                                                <option value={`'2020-10-01' and '2020-12-31'`}>October - December(2020)</option>
                                                <option value={`'2021-01-01' and '2021-03-31'`}>January - March(2021)</option>
                                                <option value={`'2021-04-01' and '2021-06-30'`}>April - June(2021)</option>

                                                <option value={`'2021-07-01' and '2021-09-30'`}>July - September(2021)</option>
                                                <option value={`'2021-10-01' and '2021-12-31'`}>October - December(2021)</option>
                                                <option value={`'2022-01-01' and '2022-03-31'`}>January - March(2022)</option>
                                                <option value={`'2022-04-01' and '2022-06-30'`}>April - June(2022)</option>
                                            </select><br />
                                            
                                            {uData[0].roll === "IQAC"  ? 
                                                <Link to="/admin" style={{color: "#f56036"}}>Move to Admin</Link>
                                            : null
                                            }
                                            </div>
                                        </Form>
                                    </Formik>

                                    <div className="research">
                                        <h3>Student Details</h3>
    
                                        <h4>1.1 Placements</h4>  
                                        {placements ? placements.map((r,i)=>
                                        { const {n,roll_no,company_placed,annual_package,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Company Placed :</b> {company_placed ? company_placed : 'NIL'}</p>
                                                    <p><b>Annual Package :</b> {annual_package ? annual_package : 'NIL'}</p>
                                                    <p><b>Date :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/placements/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Pla(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Publications */}
    
                                        <h4>1.2 Publication</h4>  
                                        {publications ? publications.map((r,i)=>{
                                        const {n,roll_no,title,n_journal,issn,volume,sci,impact,level,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Title of the paper :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Name of the Journal :</b> {n_journal ? n_journal : 'NIL'}</p>
                                                    <p><b>ISSN No. & DoI. :</b> {issn ? issn : 'NIL'}</p>
                                                    <p><b>Volume No. , Issue &  Page No. :</b> {volume ? volume : 'NIL'}</p>
                                                    <p><b>SCI/SCIE/Scopus Indexed / UGC Recognized / Others :</b> {sci ? sci : 'NIL'}</p>
                                                    <p><b>Impact Factor (as per SCI) :</b> {impact ? impact : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/s_publications/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button onClick={e=>Pub(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Paper Presentation */}
    
                                        <h4>1.3 Paper Presentation</h4>  
                                        {paper_presentation ? paper_presentation.map((r,i)=>{
                                        const {n,roll_no,con,title,financial_support,venue,level,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Conference / Seminar/ Symposium /Workshop :</b> {con ? con : 'NIL'}</p>
                                                    <p><b>Title of the Paper :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Financial support  from the College(Rs.) :</b> {financial_support ? financial_support : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>International/National/State/Regional :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/s_paper_presentation/edit`} onClick={e=>window.localStorage.setItem("edit",id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button onClick={e=>Ppr(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Participation in Workshop/Seminar/Conference/Symposium */}
    
                                        <h4>1.4 Participation in Workshop/Seminar/Conference/Symposium</h4>  
                                        {conference ? conference.map((r,i)=>{
                                        const {n,roll_no,n_con,con,sponsoring_agency,poster,award,venue,level,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Conference/Workshop/Seminar/ Symposium :</b> {con ? con : 'NIL'}</p>
                                                    <p><b>Name of the Conference  :</b> {n_con ? n_con : 'NIL'}</p>
                                                    <p><b>Sponsoring Agency :</b> {sponsoring_agency ? sponsoring_agency : 'NIL'}</p>
                                                    <p><b>Oral /Poster presentation  :</b> {poster ? poster : 'NIL'}</p>
                                                    <p><b>Awards / Medals/Prize   :</b> {award ? award : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>International / National/State/Regional :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/s_conference/edit`} onClick={e=>window.localStorage.setItem("edit",id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button onClick={e=>conference(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Participation in Competition/Others */}
    
                                        <h4>1.5 Participation in Competition/Others </h4>  
                                        {competition ? competition.map((r,i)=>{
                                        const {n,roll_no,n_event,con,n_con,award,sponsoring_agency,venue,level,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Name of the Event :</b> {n_event ?n_event : 'NIL'}</p>
                                                    <p><b>Name of the Conference :</b> {n_con ? n_con : 'NIL'}</p>
                                                    <p><b>Sponsoring Agency :</b> {sponsoring_agency ? sponsoring_agency : 'NIL'}</p>
                                                    <p><b>Awards / Medals/Prize :</b> {award ? award : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>International / National/State/Regional :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/fellowship/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>Com(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Training Programmes / Internship/Field Work */}
    
                                        <h4>1.6 Training Programmes / Internship/Field Work</h4>  
                                        {training ? training.map((r,i)=>{
                                        const {n,roll_no,training,company,period,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Training / Internship / Field Work :</b> {training ? training : 'NIL'}</p>
                                                    <p><b>Company / Research Institute with full address :</b> {company ? company : 'NIL'}</p>
                                                    <p><b>Period(from – to) :</b> {period ? period : 'NIL'}</p> 
                                                    <p><b>Date :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p>   
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/s_training/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button id={id} onClick={e=>Tra(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Project Work  */}
    
                                        <h4>1.7 Project Work  </h4>  
                                        {projectwork ? projectwork.map((r,i)=>{
                                        const {n,roll_no,guide,company,certificate,period,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Guide Name :</b> {guide ? guide : 'NIL'}</p>
                                                    <p><b>Company / Research Institute with full address if the project was done outside PSGCAS :</b> {company ? company : 'NIL'}</p>
                                                    <p><b>Period(from – to) :</b> {period ? period : 'NIL'}</p>
                                                    <p><b>Certificate :</b> {certificate ? certificate : 'NIL'}</p>
                                                    <p><b>Date :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p>   
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/s_projectwork/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>Pw(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Students qualifying in state/ national/ international level examinations */}
    
                                        <h4>1.8 Students qualifying in state/ national/ international level examinations</h4>  
                                        {exams ? exams.map((r,i)=>{
                                        const {n,roll_no,exam_qualified,e_roll,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Examination Qualified :</b> {exam_qualified ? exam_qualified : 'NIL'}</p>
                                                    <p><b>Examination Roll No. / Register Number :</b> {e_roll ? e_roll : 'NIL'}</p>
                                                    <p><b>Date:</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p>   
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/s_exams/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>Ex(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Students completed Online-Courses */}
    
                                        <h4>1.9 Students completed Online-Courses </h4> 
                                        {online_courses ? online_courses.map((r,i)=>{
                                        const {n,roll_no,portal,n_course,duration,financial_support,level,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Name of the MOOC portal :</b> {portal ? portal : 'NIL'}</p>
                                                    <p><b>Name of the course :</b> {n_course ? n_course : 'NIL'}</p>
                                                    <p><b>Duration of the course  :</b> {duration ? duration : 'NIL'}</p>
                                                    <p><b>Financial support  from the College  :</b> {financial_support ? financial_support : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p>   
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/s_onlinecourses/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>Oc(id)}>Delete</button>
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Guest Lectures */}
    
                                        <h4>1.10 Achievements</h4> 
                                        {achievements ? achievements.map((r,i)=>{
                                        const {n,roll_no,prize,event,venue,level,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Prize/Achievement :</b> {prize ? prize : 'NIL'}</p>
                                                    <p><b>Event :</b> {event ? event : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p>   
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/s_achievementss/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>Ac(id)}>Delete</button>
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

export default Viewstudents