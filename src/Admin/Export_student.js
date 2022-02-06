import React,{useEffect, useState} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory } from 'react-router-dom'
import '../CSS/LS.css'
import MaterialTable from 'material-table'
import {FaFileWord} from 'react-icons/fa'
import {IoMdArrowDropdownCircle,IoMdArrowRoundBack} from 'react-icons/io'

function Export_student(){
    const export_all = ()=>{
        if (!window.Blob) {
            alert('Your legacy browser does not support this action.');
            return;
        }
      
        var html, link, blob, url, css;
        
        // EU A4 use: size: 841.95pt 595.35pt;
        // US Letter use: size:11.0in 8.5in;
        
        css = (
            `<style>@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}div.WordSection1 {page: WordSection1;}table{font-family:Montserrat,sans-serif;width:100%;border-collapse:collapse;}td,th{border:1px gray solid;width:5em;padding:2px;}p{font-size:14px}.flx{display:flex;}.flx .img{wrap-text:square;}.flx .img2{wrap-text:square;}</style>`
        );
        
        html = window.docx.innerHTML;
        blob = new Blob(['\ufeff', css + html], {
          type: 'application/msword'
        });
        url = URL.createObjectURL(blob);
        link = document.createElement('A');
        link.href = url;
        // Set default file name. 
        // Word will append file extension - do not add an extension here.
        link.download = `Document`;   
        document.body.appendChild(link);
        if (navigator.msSaveOrOpenBlob ) navigator.msSaveOrOpenBlob( blob, `Document.doc`); // IE10-11
        else link.click();  // other browsers
        document.body.removeChild(link);
    }
    const [data,setData] = useState()
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
    const [pvalue,setPvalue] = useState('All')
    const [drp,setDrp] = useState(false)
    const [msg,setMsg] = useState('All')
    console.log(data)   

    const callAboutPage = async () => {
        try{
            const res = await fetch('/dashboard',{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            })

            const datas = await res.json()
            console.log(datas)
            setData(datas.user)

            if(datas.user[0].roll != 'SuperAdmin'){
                console.log(localStorage.getItem('dprt'))
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
                const error = new Error(res.error)
                throw error
            }
        }catch(err){
            console.log(err)
        }
    }

    const call_period = async (prd) => {
        try{
            const res = await fetch(`/period/students/${prd}/${data[0].department}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const s_admin = await res.json()
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

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
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
                <label htmlFor={props.id || props.name}>{label}</label>
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
    return(
        <div className="iqac">
        <div id="docx" style={{display:'none'}}>
        <div className="WordSection1">
            <div style={{textAlign: "center"}}>
            <h2>PSG COLLEGE OF ARTS & SCIENCE</h2>
            <p>An Autonomous College – Affiliated to Bharathiar University
            Accredited with A Grade by NAAC (3rd Cycle)
            College with Potential for Excellence (Status awarded by UGC)
            Star College Status Awarded by DBT-MST
            An ISO 9001:2015 Certified Institution
            Civil Aerodrome Post, Coimbatore-641 014
            Tamil Nadu, INDIA,</p>
            </div>
            <div style={{textAlign: 'center'}}>
                <h2>Internal Quality Assurance Cell (IQAC)</h2>
                    <h2>Department : {data ? data[0].department : null} - Students</h2>
                {
                    msg ? 
                    <>
                        {msg === 'All' ? 
                            <h2>Reports</h2> : <>
                                <h2>Quaterly Report</h2>
                                <h2>{msg ? msg : null}</h2>
                            </>
                        }
                    </> : null
                }
            </div>
            <h2>Student Details</h2>
            <h4>1.1 Placements (Total - {placements ?  placements.length : '0'})</h4>
            <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Student</th>
                    <th>Roll Number</th>
                    <th>Company Placed</th>
                    <th>Annual Package</th>
                    <th>Date</th>
                    <th>File</th>
                </tr>
                {
                    placements ? placements.map((r,i)=>
                    { const {n,roll_no,company_placed,annual_package,date,file} = r
                    return(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{n ? n : '-'}</td>
                            <td>{roll_no ? roll_no : '-'}</td>
                            <td>{company_placed ? company_placed : '-'}</td>
                            <td>{annual_package ? annual_package : '-'}</td>
                            <td>{date ? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                        </tr>
                    )
                    }):null
                }
                </tbody>
            </table>
            
            <h4>1.2 Publications (Total - {publications ?  publications.length : '0'})</h4>
            <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Student</th>
                    <th>Roll Number</th>
                    <th>Title of the paper</th>
                    <th>Name of the Journal</th>
                    <th>ISSN No. & DoI</th>
                    <th>Volume No. , Issue &  Page No.</th>
                    <th>SCI/SCIE/Scopus Indexed / UGC Recognized / Others</th>
                    <th>Impact Factor(as per SCI)</th>
                    <th>International / National</th>
                    <th>Date</th>
                    <th>File</th>
                </tr>
                {
                    publications ? publications.map((r,i)=>{
                        const {n,file,roll_no,title,n_journal,issn,volume,sci,impact,level,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{roll_no ? roll_no : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{n_journal ? n_journal : '-'}</td>
                                <td>{issn ? issn : '-'}</td>
                                <td>{volume ? volume : '-'}</td>
                                <td>{sci ? sci : '-'}</td>
                                <td>{impact ? impact : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }):null
                }
                </tbody>
            </table>

            <h4>1.3 Paper Presentation (Total - {paper_presentation ?  paper_presentation.length : '0'})</h4>
            <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Student</th>
                    <th>Roll Number</th>
                    <th>Conference / Seminar/ Symposium /Workshop</th>
                    <th>Title of the Paper</th>
                    <th>Financial support  from the College(Rs.)</th>
                    <th>Date</th>
                    <th>Venue </th>
                    <th>Regional/State/ National/ International</th>
                    <th>File</th>
                </tr>
                {
                    paper_presentation ? paper_presentation.map((r,i)=>{
                    const {n,file,roll_no,con,title,financial_support,venue,level,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{roll_no ? roll_no : '-'}</td>
                                <td>{con ? con : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{venue? venue : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{date? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
            </table>     

            <h4>1.4 Participation in Workshop/Seminar/Conference/Symposium (Total -{conference ?  conference.length : '0'})</h4>
            <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Student</th>
                    <th>Roll Number</th>
                    <th>Conference/Workshop/Seminar/ Symposium</th>
                    <th>Name of the Conferece</th>
                    <th>Sponsoring Agency</th>
                    <th>Awards</th>
                    <th>International / National/State/Regional</th>
                    <th>Venue</th>
                    <th>Poster</th>
                    <th>Date</th>
                    <th>File</th>
                </tr>
                {
                    conference ? conference.map((r,i)=>{
                        const {n,roll_no,con,n_con,sponsoring_agency,award,level,venue,poster,date,file} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{roll_no? roll_no : '-'}</td>
                                <td>{con ? con : '-'}</td>
                                <td>{n_con ? n_con : '-'}</td>
                                <td>{sponsoring_agency? sponsoring_agency : '-'}</td>
                                <td>{award ? award : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{venue? venue : '-'}</td>
                                <td>{poster? poster : '-'}</td>
                                <td>{date? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
            </table>           

            <h4>1.5 Participation in Competition/Others (Total - {competition ?  competition.length : '0'})</h4>
            <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Student</th>
                    <th>Roll Number</th>
                    <th>Name of the Event</th>
                    <th>Name of the Conference </th>
                    <th>Sponsoring Agency</th>
                    <th>Venue</th>
                    <th>Awards / Medals/Prize  received </th>
                    <th>International / National</th>
                    <th>Date</th>
                    <th>File</th>
                </tr>
                {
                    competition ? competition.map((r,i)=>{
                        const {n,roll_no,n_event,n_con,sponsoring_agency,venue,award,level,date,file} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{roll_no ? roll_no : '-'}</td>
                                <td>{n_event? n_event : '-'}</td>
                                <td>{n_con? n_con : '-'}</td>
                                <td>{sponsoring_agency ? sponsoring_agency : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                                <td>{award ? award : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
            </table>   

            <h4>1.6 Training Programmes / Internship/Field Work (Total - {training ? training.length : '0'})</h4>
            <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Student</th>
                    <th>Roll Number</th>
                    <th>Training / Internship / Field Work</th>
                    <th>Company / Research Institute with full address</th>
                    <th>Period(from – to)</th>
                    <th>Date</th>
                    <th>File</th>
                </tr>
                {
                    training ? training.map((r,i)=>{
                        const {n,roll_no,training,company,period,date,file
                            } = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{roll_no ? roll_no : '-'}</td>
                                <td>{training? training : '-'}</td>
                                <td>{company? company : '-'}</td>
                                <td>{period ? period : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
            </table>  

            <h4>1.7 Project Work (Total - {projectwork ?  projectwork.length : '0'})</h4>
            <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Student</th>
                    <th>Roll Number</th>
                    <th>Guide Name</th>
                    <th>Company / Research Institute with full address if the project was done outside PSGCAS</th>
                    <th>Certificate</th>
                    <th>Period(from – to)</th>
                    <th>Date</th>
                    <th>File</th>
                </tr>
                {
                    projectwork ? projectwork.map((r,i)=>{
                        const {n,file,roll_no,guide,company,certificate,date,period} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{roll_no? roll_no : '-'}</td>
                                <td>{guide? guide : '-'}</td>
                                <td>{company? company : '-'}</td>
                                <td>{certificate ? <a href={`Uploads/${certificate}`}>{certificate}</a> : '-'}</td>
                                <td>{period ? period : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
            </table>  

            <h4>1.8 Students qualifying in state/ national/ international level examinations(Total - {exams ? exams.length : '0'})</h4>
            <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Student</th>
                    <th>Roll Number</th>
                    <th>Examination Qualified</th>
                    <th>Examination Roll No. / Register Number</th>
                    <th>Date</th>
                    <th>File</th>
                </tr>
                {
                    exams ? exams.map((r,i)=>{
                        const {n,file,roll_no,exam_qualified,e_roll,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{roll_no ? roll_no : '-'}</td>
                                <td>{exam_qualified? exam_qualified : '-'}</td>
                                <td>{e_roll ? e_roll : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
            </table> 

            <h4>1.9 Students completed Online-Courses (Total - {online_courses ? online_courses.length : '0'})</h4>
            <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Student</th>
                    <th>Roll Number</th>
                    <th>Name of the MOOC portal</th>
                    <th>Name of the course</th>
                    <th>Duration of the course</th>
                    <th>Financial support  from the College (Rs.)</th>
                    <th>International / National/State/Regional</th>
                    <th>Date</th>
                    <th>File</th>
                </tr>
                {
                    online_courses ? online_courses.map((r,i)=>{
                        const {n,file,roll_no,portal,n_course,duration,financial_support,level,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{roll_no ? roll_no : '-'}</td>
                                <td>{portal ? portal : '-'}</td>
                                <td>{n_course ? n_course : '-'}</td>
                                <td>{duration ? duration : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
            </table> 

            <h4>1.10 Achievements (Total - {achievements ? achievements.length : '0'})</h4>
            <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Student</th>
                    <th>Roll Number</th>
                    <th>Prize/Achievement</th>
                    <th>Event</th>
                    <th>Level</th>
                    <th>Venue</th>
                    <th>Date</th>
                    <th>File</th>
                </tr>
                {
                   achievements ?achievements.map((r,i)=>{
                        const {n,file,roll_no,prize,event,venue,level,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{roll_no ? roll_no : '-'}</td>
                                <td>{prize ? prize : '-'}</td>
                                <td>{event ? event : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
            </table>
        </div>
        </div>

            <div style={{margin: '18px 0',textAlign: 'center',lineHeight: '30px',fontWeight: 'bolder'}}>
                <p style={{color: '#39a7e7'}}>Internal Quality Assurance Cell (IQAC)</p>
                <p>Department : {data ? data[0].department : null} - Students</p>
                {
                    msg ? 
                    <>
                        {msg === 'All' ? 
                            <p style={{color: '#39a7e7'}}>Reports</p> :
                            <>
                                <p style={{fontSize: '14px'}}>Quaterly Report</p>
                                <p style={{color: '#39a7e7'}}>{msg ? msg: null}</p>
                            </>
                        }
                    </> : null
                }
            </div>

            <div className='select'>
                <p><b>Filter by Period</b></p>
                <p className='msg' onClick={e=>setDrp(!drp)}>{pvalue ? pvalue : ''}<IoMdArrowDropdownCircle style={{color: '#0093E9'}} className={`${drp ? 'active' : ''}`} /></p>
                <div className={`${drp ? 'active' : ''}`} style={{backgroundColor: '#0093E9',backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',}}>
                    <p onClick={e=>{callAboutPage();setMsg('All');setPvalue('All');setDrp(!drp)}}>All</p>
                    <p onClick={e=>{call_period(`'2019-07-01' and '2019-09-30'`);setMsg(`July (01/07/2019) to September (30/09/2019)`);setPvalue('July - September(2019)');setDrp(!drp)}}>July - September(2019)</p>
                    <p onClick={e=>{call_period(`'2019-10-01' and '2019-12-31'`);setMsg(`October (01/10/2019) to December (30/12/2019)`);setPvalue('July - September(2019)');setDrp(!drp)}}>October - December(2019)</p>
                    <p onClick={e=>{call_period(`'2020-01-01' and '2020-03-31'`);setMsg(`January (01/01/2020) to March (31/03/2020)`);setPvalue('July - September(2019)');setDrp(!drp)}}>January - March(2020)</p>
                    <p onClick={e=>{call_period(`'2020-04-01' and '2020-06-30'`);setMsg(`April (01/04/2020) to June (30/06/2020)`);setPvalue('April - June(2020)');setDrp(!drp)}}>April - June(2020)</p>

                    <p onClick={e=>{call_period(`'2020-07-01' and '2020-09-30'`);setMsg(`July (01/07/2020) to September (30/09/2020)`);setPvalue('July - September(2020)');setDrp(!drp)}}>July - September(2020)</p>
                    <p onClick={e=>{call_period(`'2020-10-01' and '2020-12-31'`);setMsg(`October (01/10/2020) to December (30/12/2020)`);setPvalue('October - December(2020)');setDrp(!drp)}}>October - December(2020)</p>
                    <p onClick={e=>{call_period(`'2021-01-01' and '2021-03-31'`);setMsg(`January (01/01/2021) to March (31/03/2021)`);setPvalue('January - March(2021)');setDrp(!drp)}}>January - March(2021)</p>
                    <p onClick={e=>{call_period(`'2021-04-01' and '2021-06-30'`);setMsg(`April (01/04/2021) to June (30/06/2021)`);setPvalue('April - June(2021)');setDrp(!drp)}}>April - June(2021)</p>

                    <p onClick={e=>{call_period(`'2021-07-01' and '2021-09-30'`);setMsg(`July (01/07/2021) to September (30/09/2021)`);setPvalue('July - September(2021)');setDrp(!drp)}}>July - September(2021)</p>
                    <p onClick={e=>{call_period(`'2021-10-01' and '2021-12-31'`);setMsg(`October (01/10/2021) to December (30/12/2021)`);setPvalue('October - December(2021)');setDrp(!drp)}}>October - December(2021)</p>
                    <p onClick={e=>{call_period(`'2022-01-01' and '2022-03-31'`);setMsg(`January (01/01/2022) to March (31/03/2022)`);setPvalue('January - March(2022)');setDrp(!drp)}}>January - March(2022)</p>
                    <p onClick={e=>{call_period(`'2022-04-01' and '2022-06-30'`);setMsg(`April (01/04/2022) to June (30/06/2022)`);setPvalue('April - June(2022)');setDrp(!drp)}}>April - June(2022)</p>
                </div>
            </div><br />

            <div className="tables">
                <div style={{display: 'flex',justifyContent: 'space-between',margin: '0 0 15px'}}>
                    <p style={{cursor:'pointer',color: '#0093E9'}} className="expall" onClick={e=>export_all()}><FaFileWord />Export All</p>
                    
                    <Link to="/dashboard/view_students" style={{color: "#ff7295", display:'flex',alignItems:'center'}}><IoMdArrowRoundBack /> Back</Link>
                </div>
                <h3>Student Details</h3>
                
                {/* Placements */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#283d7f',
                            color: '#fff'
                        }}} columns={[
                            {field: 'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'roll_no',title:'Roll No',filterPlaceholder:'Filter by Roll No'},
                            {field:'company_placed',title:'Company Placed',filterPlaceholder:'Filter by Company Placed'},
                            {field:'annual_package',title:'Annual Package',filterPlaceholder:'Filter by Annual Package'},
                            {field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={placements} title="Placements" />
                        
                    }    
                </div>

                {/* Publications */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},exportFileName:'Ct',rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#283d7f',
                            color: '#fff'
                        }}} columns={[
                            {field: 'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'roll_no',title:'Roll No',filterPlaceholder:'Filter by Roll No'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'n_journal',title:'Name of the Journal',filterPlaceholder:'Filter by Name of Journal'},
                            {field:'issn',title:'ISSN No',filterPlaceholder:'Filter by ISSN No'},
                            {field:'volume',title:'Volume No',filterPlaceholder:'Filter by Volume No'},
                            {field:'sci',title:'SCI/SCIE/Scopus Indexed / UGC Recognized / Others',filterPlaceholder:'Filter by SCI'},
                            {field:'impact',title:'Impact Factor (as per SCI)',filterPlaceholder:'Filter by Impact Factor'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={publications} title="Publications"  />
                        
                    }    
                </div>

                {/* Paper Presentation */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},exportFileName:'Ct',rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#283d7f',
                            color: '#fff'
                        }}} columns={[
                            {field: 'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'roll_no',title:'Roll No',filterPlaceholder:'Filter by Roll No'},
                            {field:'con',title:'Conference / Seminar/ Symposium /Workshop',filterPlaceholder:'Filter by Conference / Seminar/ Symposium /Workshop'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'financial_support',title:'Financial Support',filterPlaceholder:'Filter by Financial Support'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={paper_presentation} title="Paper Presentation"  />
                        
                    }    
                </div>

                {/* Conference */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},exportFileName:'Ct',rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#283d7f',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field: 'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'roll_no',title:'Roll No',filterPlaceholder:'Filter by Roll No'},
                            {field:'con',title:'Conference/Workshop/Seminar/ Symposium',filterPlaceholder:'Filter by Conference/Workshop/Seminar/ Symposium'},
                            {field:'n_con',title:'Name of the Conference',filterPlaceholder:'Filter by Name of the conference'},
                            {field:'sponsoring_agency',title:'Sponsorin Aagency',filterPlaceholder:'Filter by Sponsoring Agency'},
                            {field:'poster',title:'Poster',filterPlaceholder:'Filter by Poster'},
                            {field:'award',title:'Award',filterPlaceholder:'Filter by Award'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={conference} title="Conference"  />
                        
                    }    
                </div>

                {/* Competition */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#283d7f',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field: 'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'roll_no',title:'Roll No',filterPlaceholder:'Filter by Roll No'},
                            {field:'n_event',title:'Name of the Event',filterPlaceholder:'Filter by Event Name'},
                            {field:'n_con',title:'Name of the Conference',filterPlaceholder:'Filter by Conference'},
                            {field:'sponsoring_agency',title:'Sponsorin Aagency',filterPlaceholder:'Filter by Sponsoring Agency'},
                            {field:'award',title:'Award',filterPlaceholder:'Filter by Award'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={competition} title="Competition"  />
                        
                    }    
                </div>

                {/* Training */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#283d7f',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field: 'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'roll_no',title:'Roll No',filterPlaceholder:'Filter by Roll No'},
                            {field:'training',title:'Training / Internship / Field Work',filterPlaceholder:'Filter by Training / Internship / Field Work'},
                            {field:'company',title:'Company / Research Institute with full address',filterPlaceholder:'Filter by Company / Research Institute with full address'},
                            {field:'period',title:'Period',filterPlaceholder:'Filter by Period'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={training} title="Training"  />
                        
                    }    
                </div>

                {/* Project Work */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#283d7f',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field: 'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'roll_no',title:'Roll No',filterPlaceholder:'Filter by Roll No'},
                            {field:'guide',title:'Guide',filterPlaceholder:'Filter by Guide'},
                            {field:'company',title:'Company / Research Institute with full address if the project was done outside PSGCAS',filterPlaceholder:'Filter by Company / Research Institute with full address if the project was done outside PSGCAS '},
                            {field:'certificate',title:'Certificate',filterPlaceholder:'Filter by Certificate'},
                            {field:'period',title:'Period',filterPlaceholder:'Filter by Period'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={projectwork} title="Project Work"  />
                        
                    }    
                </div>

                {/* Exams */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#283d7f',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field: 'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'roll_no',title:'Roll No',filterPlaceholder:'Filter by Roll No'},
                            {field:'exam_qualified',title:'Exam Qualified',filterPlaceholder:'Filter by Exam Qualified'},
                            {field:'e_roll',title:'Examination Roll No. / Register Number',filterPlaceholder:'Filter by Examination Roll No. / Register Number'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={exams} title="Exams"  />
                        
                    }    
                </div>

                {/* Online Courses */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#283d7f',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field: 'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'roll_no',title:'Roll No',filterPlaceholder:'Filter by Roll No'},
                            {field:'portal',title:'Name of the MOOC portal',filterPlaceholder:'Filter by MOOC portal Name'},
                            {field:'n_course',title:'Name of the course',filterPlaceholder:'Filter by Course Name'},
                            {field:'duration',title:'Duration of the course ',filterPlaceholder:'Filter by duration'},
                            {field:'financial_support',title:'Financial Support',filterPlaceholder:'Filter by Financial Support'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={online_courses} title="Online Courses"  />
                        
                    }    
                </div>

                {/* Achievements */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#283d7f',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field: 'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'roll_no',title:'Roll No',filterPlaceholder:'Filter by Roll No'},
                            {field:'prize',title:'Prize/Achievement',filterPlaceholder:'Filter by Prize/Achievement'},
                            {field:'event',title:'Event',filterPlaceholder:'Filter by Event'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={achievements} title="Achievements"  />
                        
                    }    
                </div>

            </div>
        </div>
    )
}

export default Export_student