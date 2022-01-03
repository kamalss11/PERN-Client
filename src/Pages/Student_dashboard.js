import React,{ useContext, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Formik,Form,useField } from 'formik'
import '../CSS/About.css'
import Sidebar from '../Components/S_sidebar'
import * as Yup from 'yup'
import {FaWpforms} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiFillEdit,AiOutlineLogout} from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import {AiOutlineBars} from 'react-icons/ai'
import S_sidebar from '../Components/S_sidebar'


function Student_dashboard(){
    const [uData,setUdata] = useState()
    const [placements,Setplacements] = useState()
    const [paper_presentation,Setpaper_presentation] = useState()
    const [seminar,Setseminar] = useState()
    const [competition,Setcompetition] = useState()
    const [training,Settraining] = useState()
    const [exams,Setexams] = useState()
    const [online_courses,Setonline_courses] = useState()
    const [projectwork,Setprojectwork] = useState()   
    const [achievement,Setachievement] = useState()  
    const [publication,Setpublication] = useState() 
    
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
            Setplacements(s.placements)
            Setpaper_presentation(s.paper_presentation)
            Setseminar(s.seminar)
            Setcompetition(s.competition)
            Settraining(s.training)
            Setexams(s.exams)
            Setonline_courses(s.online_courses)
            Setprojectwork(s.projectwork)
            Setpublication(s.publication)
            Setachievement(s.achievement)  

            if(!s.status === 200){
                const error = new Error(s.error)
                throw error
            }
        }catch(err){
            console.log(err)
            history.push('/signin')
        }
    }

    const call_period = async (prd) => {
        try{
            const res = await fetch(`/period/${prd}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const datas = await res.json()
            console.log(datas)

            Setpublication(datas.publication)
            Setachievement(datas.achievemnt)

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
            <S_sidebar />
            <div id="docx" style={{display: 'none'}}>
                <div className="WordSection1">
                <div className='flx' style={{display:'flex'}}>
                    <img className='img' src='C:\Users\GOOD DAY\Desktop\IQAC\PERN-Client-main\public\Uploads\logo.jpg' title='logo' width={'100'} height={'100'} />
                    <div style={{textAlign: "center"}}>
                        <h1>PSG COLLEGE OF ARTS & SCIENCE</h1>
                        <p style={{lineHeight:'20px'}}>An Autonomous College – Affiliated to Bharathiar University
                        Accredited with A Grade by NAAC (3rd Cycle)
                        College with Potential for Excellence (Status awarded by UGC)
                        Star College Status Awarded by DBT-MST
                        An ISO 9001:2015 Certified Institution
                        Civil Aerodrome Post, Coimbatore-641 014
                        Tamil Nadu, INDIA,</p>
                    </div>                        
                    <img className='img2' src='C:\Users\GOOD DAY\Desktop\IQAC\PERN-Client-main\public\Uploads\cert.jpg' title='certified' width={'100'} height={'50'} />

                    <div style={{textAlign: 'center'}}>
                        <h2>Internal Quality Assurance Cell (IQAC)</h2>
                        {
                            msg ? 
                            <>
                                {msg === 'All' ? 
                                    <h2>2019 - 2022</h2> : <>
                                        <h2>Quaterly Report</h2>
                                        <h2>{msg ? msg : null}</h2>
                                    </>
                                }
                            </> : null
                        }
                    </div>                        
                </div>

                    <h1>Name : {uData ? uData[0].name : ''}</h1>
                    <h1>Roll No : </h1>
                    <h1>Department : {uData ? uData[0].department : ''}</h1>
                    <h2>Student Details </h2>
                    <h4>1.1 Placements</h4>
                    <table>
                    <tbody>
                    <tr>
                        <th>S.No</th>
                        <th>Name of the Student</th>
                        <th>Roll No</th>
                        <th>Company Placed</th>
                        <th>Annual Package</th>
                        <th>Date of Selection</th>
                    </tr>
                    {
                        placements ? placements.map((r,i)=>
                        { const {n,roll_no,company_placed,annual_package,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{roll_no ? roll_no : '-'}</td>
                                <td>{company_placed ? company_placed : '-'}</td>
                                <td>{annual_package ? annual_package : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            </tr>
                        )
                        }):null
                    }
                    </tbody>
                    </table>

                    <h4>1.2 Paper Presentation</h4>
                    <table>
                    <tbody>
                    <tr>
                        <th>S.No</th>
                        <th>Name of the Student</th>
                        <th>Roll No</th>
                        <th>Conference / Seminar/ Symposium /Workshop</th>
                        <th>Title of the Paper</th>
                        <th>Financial support  from the College(Rs.)</th>                   
                        <th>International / National/State/Regional</th>                 
                        <th>Venue</th>             
                        <th>Date</th>
                    </tr>
                    {
                        paper_presentation ? paper_presentation.map((r,i)=>
                        { const {id,n,roll_no,con,title,financial_support,date,venue,level} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{roll_no ? roll_no : '-'}</td>
                                <td>{con ? con : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            </tr>
                        )
                        }):null
                    }
                    </tbody>
                    </table>

                    <h4>1.3 Participation in Workshop/Seminar/Conference/Symposium</h4>
                    <table>
                    <tbody>
                    <tr>
                        <th>S.No</th>
                        <th>Name of the Student</th>
                        <th>Roll No</th>
                        <th>Conference/Workshop/Seminar/ Symposium</th>
                        <th>Name of the Conference</th>
                        <th>Sponsoring Agency</th>
                        <th>Oral /Poster presentation (if applicable)</th>
                        <th>Awards / Medals/Prize  received if any</th>                        
                        <th>International / National/State/Regional</th>                       
                        <th>Venue</th>                      
                        <th>Date</th> 
                    </tr>
                    {
                        seminar ? seminar.map((r,i)=>
                        { const {id,n,con,roll_no,n_con,title,sponsoring_agency,poster,award,date,venue,level} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{roll_no ? roll_no : '-'}</td>
                                <td>{con ? con : '-'}</td>
                                <td>{n_con ? n_con : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{sponsoring_agency ? sponsoring_agency : '-'}</td>
                                <td>{poster ? poster : '-'}</td>
                                <td>{award ? award : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                                <td>{date ? date : '-'}</td>
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
                                    <div style={{margin: '18px 0',textAlign: 'center',lineHeight: '30px',fontWeight: 'bolder'}}>
                                        <p style={{color: '#39a7e7'}}>Internal Quality Assurance Cell (IQAC)</p>
                                        {
                                            msg ? 
                                            <>
                                                {msg === 'All' ? 
                                                    <p style={{color: '#39a7e7'}}>2019 - 2022</p> : <>
                                                        <p style={{fontSize: '14px'}}>Quaterly Report</p>
                                                        <p style={{color: '#39a7e7'}}>{msg ? msg : null}</p>
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
                                                    await callAboutPage()
                                                }
                                                else{
                                                    await call_period(e.target.value)
                                                }

                                                if(e.target.value === 'All'){
                                                    setMsg('All')
                                                }
                                                else if(e.target.value === `'${uData[0].admission}-07-01' and '${uData[0].admission}-09-30'`){
                                                    setMsg(`July (01/07/${uData[0].admission}) to September (30/09/${uData[0].admission})`)
                                                }
                                                else if(e.target.value === `'${uData[0].admission}-10-01' and '${uData[0].admission}-12-31'`){
                                                    setMsg(`October (01/10/${uData[0].admission}) to December (30/12/${uData[0].admission})`)
                                                }
                                                else if(e.target.value === `'${uData[0].admission + 1}-01-01' and '${uData[0].admission + 1}-03-31'`){
                                                    setMsg(`January (01/01/${uData[0].admission + 1}) to March (31/03/${uData[0].admission + 1})`)
                                                }
                                                else if(e.target.value === `'${uData[0].admission + 1}-04-01' and '${uData[0].admission + 1}-06-30'`){
                                                    setMsg(`April (01/04/${uData[0].admission + 1}) to June (30/06/${uData[0].admission + 1})`)
                                                }

                                                else if(e.target.value === `'${uData[0].admission + 1}-07-01' and '${uData[0].admission + 1}-09-30'`){
                                                    setMsg(`July (01/07/${uData[0].admission + 1}) to September (30/09/${uData[0].admission + 1})`)
                                                }
                                                else if(e.target.value === `'${uData[0].admission + 1}-10-01' and '${uData[0].admission + 1}-12-31'`){
                                                    setMsg(`October (01/10/${uData[0].admission + 1}) to December (30/12/${uData[0].admission + 1})`)
                                                }
                                                else if(e.target.value === `'${uData[0].admission + 2}-01-01' and '${uData[0].admission + 2}-03-31'`){
                                                    setMsg(`January (01/01/${uData[0].admission + 2}) to March (31/03/${uData[0].admission + 2})`)
                                                }
                                                else if(e.target.value === `'${uData[0].admission + 2}-04-01' and '${uData[0].admission + 2}-06-30'`){
                                                    setMsg(`April (01/04/${uData[0].admission + 2}) to June (30/06/${uData[0].admission + 2})`)
                                                }

                                                else if(e.target.value === `'${uData[0].admission + 2}-07-01' and '${uData[0].admission + 2}-09-30'`){
                                                    setMsg(`July (01/07/${uData[0].admission + 2}) to September (30/09/${uData[0].admission + 2})`)
                                                }
                                                else if(e.target.value === `'${uData[0].admission + 2}-10-01' and '${uData[0].admission + 2}-12-31'`){
                                                    setMsg(`October (01/10/${uData[0].admission + 2}) to December (30/12/${uData[0].admission + 2})`)
                                                }
                                                else if(e.target.value === `'${uData[0].admission + 3}-01-01' and '${uData[0].admission + 3}-03-31'`){
                                                    setMsg(`January (01/01/${uData[0].admission + 3}) to March (31/03/${uData[0].admission + 3})`)
                                                }
                                                else if(e.target.value === `'${uData[0].admission + 3}-04-01' and '${uData[0].admission + 3}-06-30'`){
                                                    setMsg(`April (01/04/${uData[0].admission + 3}) to June (30/06/${uData[0].admission + 3})`)
                                                }
                                            }} name="period" label="Filter By Period">
                                                <option selected value='All'>All</option>
                                                <option value={`'${uData ?  uData[0].admission : null}-07-01' and '${uData ?  uData[0].admission : null}-09-30'`}>July - September({uData ?  uData[0].admission : null})</option>
                                                <option value={`'${uData ?  uData[0].admission : null}-10-01' and '${uData ?  uData[0].admission : null}-12-31'`}>October - December({uData[0].admission})</option>
                                                <option value={`'${uData ?  uData[0].admission + 1 : null}-01-01' and '${uData ?  uData[0].admission + 1 : null}-03-31'`}>January - March({uData ?  uData[0].admission + 1 : null})</option>
                                                <option value={`'${uData ?  uData[0].admission + 1 : null}-04-01' and '${uData ?  uData[0].admission + 1 : null}-06-30'`}>April - June({uData ?  uData[0].admission + 1 : null})</option>

                                                <option value={`'${uData ?  uData[0].admission + 1 : null}-07-01' and '${uData ?  uData[0].admission + 1 : null}-09-30'`}>July - September({uData ?  uData[0].admission + 1 : null})</option>
                                                <option value={`'${uData ?  uData[0].admission + 1 : null}-10-01' and '${uData ?  uData[0].admission + 1 : null}-12-31'`}>October - December({uData ?  uData[0].admission + 1 : null})</option>
                                                <option value={`'${uData ?  uData[0].admission + 2 : null}-01-01' and '${uData ?  uData[0].admission + 2 : null}-03-31'`}>January - March({uData ?  uData[0].admission + 2 : null})</option>
                                                <option value={`'${uData ?  uData[0].admission + 2 : null}-04-01' and '${uData ?  uData[0].admission + 2 : null}-06-30'`}>April - June({uData ?  uData[0].admission + 2 : null})</option>

                                                <option value={`'${uData ?  uData[0].admission + 2 : null}-07-01' and '${uData ?  uData[0].admission + 2 : null}-09-30'`}>July - September({uData ?  uData[0].admission + 2 : null})</option>
                                                <option value={`'${uData ?  uData[0].admission + 2 : null}-10-01' and '${uData ?  uData[0].admission + 2 : null}-12-31'`}>October - December({uData ?  uData[0].admission + 2 : null})</option>
                                                <option value={`'${uData ?  uData[0].admission + 3 : null}-01-01' and '${uData ?  uData[0].admission + 3 : null}-03-31'`}>January - March({uData ?  uData[0].admission + 3 : null})</option>
                                                <option value={`'${uData ?  uData[0].admission + 3 : null}-04-01' and '${uData ?  uData[0].admission + 3 : null}-06-30'`}>April - June({uData ?  uData[0].admission + 3 : null})</option>
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
                                        {placements ? placements.map((r,i)=>{ const {id,name,roll_no,company_placed,annual_package,date} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the student :</b> {name ? name : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Company Placed :</b> {company_placed ? company_placed : 'NIL'}</p>
                                                    <p><b>Annual Package :</b> {annual_package ? annual_package : 'NIL'}</p>
                                                    <p><b>Date Happend :</b> {date ? date : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/placements/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Pub(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        <h4>1.2 Paper Presentation</h4>  
                                        {paper_presentation ? paper_presentation.map((r,i)=>{ const {id,n,roll_no,con,title,financial_support,date,venue,level} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the student :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Conferece :</b> {con ? con : 'NIL'}</p>
                                                    <p><b>Title of the paper :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Financial Support :</b> {financial_support ? financial_support : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date Happend :</b> {date ? date : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/paper_presentation/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Pub(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}

                                        <h4>1.3 Conferece</h4>  
                                        {seminar ? seminar.map((r,i)=>{ const {id,n,con,roll_no,n_con,title,sponsoring_agency,poster,award,date,venue,level} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the student :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Conferece :</b> {con ? con : 'NIL'}</p>
                                                    <p><b>Title of the paper :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Name of the Conferece :</b> {n_con ? n_con : 'NIL'}</p>
                                                    <p><b>Sponsoring Agency :</b> {sponsoring_agency ? sponsoring_agency : 'NIL'}</p>
                                                    <p><b>Poster :</b> {poster ? poster : 'NIL'}</p>
                                                    <p><b>Award :</b> {award ? award : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date Happend :</b> {date ? date : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/conference/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Pub(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}

                                        <h4>1.4 Competition</h4>  
                                        {competition ? competition.map((r,i)=>{ const {id,n,roll_no,n_con,n_event,sponsoring_agency,award,date,venue,level} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the Event :</b> {n_event ? n_event : 'NIL'}</p>
                                                    <p><b>Name of the student :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Name of the Conferece :</b> {n_con ? n_con : 'NIL'}</p>
                                                    <p><b>Sponsoring Agency :</b> {sponsoring_agency ? sponsoring_agency : 'NIL'}</p>
                                                    <p><b>Award :</b> {award ? award : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date Happend :</b> {date ? date : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/paper_presentation/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Pub(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}

                                        <h4>1.5 Training</h4>  
                                        {training ? training.map((r,i)=>{ const {id,n,roll_no,training,company,period,date} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the student :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Training :</b> {training ? training : 'NIL'}</p>
                                                    <p><b>Company :</b> {company ? company : 'NIL'}</p>
                                                    <p><b>Period :</b> {period ? period : 'NIL'}</p>
                                                    <p><b>Date Happend :</b> {date ? date : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/training/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Pub(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}

                                        <h4>1.6 Project Work</h4>  
                                        {projectwork ? projectwork.map((r,i)=>{ const {id,n,roll_no,guide,company,certificate,period,date} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the student :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Guide Name :</b> {guide ? guide : 'NIL'}</p>
                                                    <p><b>Company :</b> {company ? company : 'NIL'}</p>
                                                    <p><b>Certificate :</b> {certificate ? certificate : 'NIL'}</p>
                                                    <p><b>Period :</b> {period ? period : 'NIL'}</p>
                                                    <p><b>Date Happend :</b> {date ? date : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/training/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Pub(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}

                                        <h4>1.7 Exams</h4>  
                                        {exams ? exams.map((r,i)=>{ const {id,n,roll_no,exam_qualified,e_roll,date} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the student :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Examination Qualified :</b> {exam_qualified ? exam_qualified : 'NIL'}</p>
                                                    <p><b>Examination Roll No :</b> {e_roll ? e_roll : 'NIL'}</p>
                                                    <p><b>Date Happend :</b> {date ? date : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/exams/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Pub(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}

                                        <h4>1.8 Online Courses</h4>  
                                        {exams ? exams.map((r,i)=>{ const {id,n,roll_no,portal,n_course,duration,financial_support,level,date} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the student :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Name of the MOOC Portal :</b> {portal ? portal : 'NIL'}</p>
                                                    <p><b>Name of the Course :</b> {n_course ? n_course : 'NIL'}</p>
                                                    <p><b>Duration :</b> {duration ? duration : 'NIL'}</p>
                                                    <p><b>Financial Support :</b> {financial_support ? financial_support : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date Happend :</b> {date ? date : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/online_courses/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Pub(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}

                                        <h4>1.9 Achievements</h4>  
                                        {exams ? exams.map((r,i)=>{ const {id,n,roll_no,prize,event,level,date,venue} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the student :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Prize/Achievement :</b> {prize ? prize : 'NIL'}</p>
                                                    <p><b>Event :</b> {event ? event : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Date Happend :</b> {date ? date : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/achievements/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Pub(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}

                                        <h4>1.10 Publications</h4>  
                                        {publication ? publication.map((r,i)=>{ const {id,n,roll_no,n_journal,issn,volume,sci,impact,level,date} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the student :</b> {n ? n : 'NIL'}</p>
                                                    <p><b>Roll No :</b> {roll_no ? roll_no : 'NIL'}</p>
                                                    <p><b>Name of the Journal :</b> {n_journal ? n_journal : 'NIL'}</p>
                                                    <p><b>ISSN No :</b> {issn ? issn : 'NIL'}</p>
                                                    <p><b>Volume No :</b> {volume ? volume : 'NIL'}</p>
                                                    <p><b>SCI/SCIE/Scopus Indexed / UGC Recognized / Others :</b> {sci ? sci : 'NIL'}</p>
                                                    <p><b>Impact Factor :</b> {impact ? impact : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date Happend :</b> {date ? date : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/student/publications/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Pub(id)}>Delete</button>
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