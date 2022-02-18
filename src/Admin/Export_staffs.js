import React,{useEffect, useState} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'
import {FaFileWord} from 'react-icons/fa'
import {IoMdArrowDropdownCircle,IoMdArrowRoundBack} from 'react-icons/io'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Adminlogin(){
    const export_all = ()=>{
        if (!window.Blob) {
            alert('Your legacy browser does not support this action.');
            return;
        }
      
        var html, link, blob, url, css;
        
        // EU A4 use: size: 841.95pt 595.35pt;
        // US Letter use: size:11.0in 8.5in;
        
        css = (
          '<style>' +
          '@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}' +
          'div.WordSection1 {page: WordSection1;}' +
          'table{width:100%;border-collapse:collapse;}td,th{border:1px gray solid;width:5em;padding:2px;}'+
          '</style>'
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
        link.download = 'Document';   
        document.body.appendChild(link);
        if (navigator.msSaveOrOpenBlob ) navigator.msSaveOrOpenBlob( blob, 'Document.doc'); // IE10-11
        else link.click();  // other browsers
        document.body.removeChild(link);
    }

    const [pvalue,setPvalue] = useState('All')
    const [drp,setDrp] = useState(false)
    const [msg,setMsg] = useState('All')
    const [data,setData] = useState()
    const [rps,setRps] = useState([])
    const [rpat,setRpat] = useState([])
    const [rawd,setRawd] = useState([])
    const [rdeg,setRdeg] = useState([])
    const [rfel,setRfel] = useState([])
    const [ca,setCca] = useState([])
    const [clink,setClink] = useState([])
    const [cmou,setCmou] = useState([])
    const [econ,setEcon] = useState([])
    const [egl,setEgl] = useState([])
    const [eea,setEea] = useState([])
    const [eev,setEev] = useState([])
    const [eevs,setEevs] = useState([])
    const [eda,setEda] = useState([])
    const [cps,setCps] = useState([])
    const [fhnr,setFhnr] = useState([])
    const [fexm,setFexm] = useState([])
    const [fbp,setFbp] = useState([])
    const [fcc,setFcc] = useState([])
    const [fcp,setFcp] = useState([])
    const [fpp,setFpp] = useState([])
    const [fjp,setFjp] = useState([])
    const [fcon,setFcon] = useState([])
    const [frp,setFrp] = useState([])
    const [ffs,setFfs] = useState([])
    const [fdp,setFdp] = useState([])
    const [foc,setFoc] = useState([])
    const [fe,setFe] = useState([])
    const history = useHistory()
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
                const ad = await fetch(`/super_admin/departments/staffs/${datas.user[0].department}`,{
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                })
    
                const s_admin = await ad.json()
                console.log(s_admin)

                setRps(s_admin.research_projects)
                setRpat(s_admin.patents)
                setRawd(s_admin.awards_for_innovation)
                setRdeg(s_admin.degree)
                setRfel(s_admin.fellowship)
                setCca(s_admin.collab_activ)
                setClink(s_admin.linkages)
                setCmou(s_admin.mou)
                setEcon(s_admin.conference)
                setEgl(s_admin.guest_lectures)
                setEea(s_admin.extension_activities)
                setEev(s_admin.industrial_visits)
                setEevs(s_admin.evs)
                setEda(s_admin.departmental_activities)
                setCps(s_admin.project_services)
                setFhnr(s_admin.honours)
                setFexm(s_admin.exams)
                setFbp(s_admin.books_published)
                setFcc(s_admin.chapters_contributed)
                setFcp(s_admin.conference_proceeding)
                setFpp(s_admin.paper_presentation)
                setFjp(s_admin.journal_publications)
                setFcon(s_admin.fconference)
                setFrp(s_admin.resource_person)
                setFfs(s_admin.financial_support)
                setFdp(s_admin.development_programmes)
                setFoc(s_admin.online_courses)
                setFe(s_admin.e_content)
            }
            else{
                history.push('/super_admin')
            }
            
            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }catch(err){
            history.push('/signin')
            console.log(err)
        }
    }

    const call_period = async (prd,value) => {
        try{
            const res = await fetch(`/period/${prd}/${data[0].department}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const s_admin = await res.json()
            console.log(s_admin)

            setRps(s_admin.research_projects)
            setRpat(s_admin.patents)
            setRawd(s_admin.awards_for_innovation)
            setRdeg(s_admin.degree)
            setRfel(s_admin.fellowship)
            setCca(s_admin.collab_activ)
            setClink(s_admin.linkages)
            setCmou(s_admin.mou)
            setEcon(s_admin.conference)
            setEgl(s_admin.guest_lectures)
            setEea(s_admin.extension_activities)
            setEev(s_admin.industrial_visits)
            setEevs(s_admin.evs)
            setEda(s_admin.departmental_activities)
            setCps(s_admin.project_services)
            setFhnr(s_admin.honours)
            setFexm(s_admin.exams)
            setFbp(s_admin.books_published)
            setFcc(s_admin.chapters_contributed)
            setFcp(s_admin.conference_proceeding)
            setFpp(s_admin.paper_presentation)
            setFjp(s_admin.journal_publications)
            setFcon(s_admin.fconference)
            setFrp(s_admin.resource_person)
            setFfs(s_admin.financial_support)
            setFdp(s_admin.development_programmes)
            setFoc(s_admin.online_courses)
            setFe(s_admin.e_content)
            
            toast.info(value,{autoClose:1000})

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
                    <h2>Department : {data ? data[0].department : ''} - Staffs</h2>
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
                <h2>RESEARCH </h2>
                <h4>1.1 Research Projects (Total - {rps ? rps.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Faculty Member</th>
                    <th>Title of Project</th>
                    <th>Newly sanctioned or Ongoing</th>
                    <th>Sanctioned Amount(Rs.)</th>
                    <th>Grant No. / File No.</th>
                    <th>Amount Received(Rs.)</th>
                    <th>Funding Agency</th>
                    <th>Date of Sanction</th>
                    <th>File</th>
                </tr>
                {
                    rps ? rps.map((r,i)=>
                    { const {n,title,no,amount_sanctioned,fileno,amount_received,date_sanctioned,funding_agency,file} = r
                    return(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{n ? n : '-'}</td>
                            <td>{title ? title : '-'}</td>
                            <td>{no ? no : '-'}</td>
                            <td>{amount_sanctioned ? amount_sanctioned : '-'}</td>
                            <td>{fileno ? fileno : '-'}</td>
                            <td>{amount_received ? amount_received : '-'}</td>
                            <td>{funding_agency ? funding_agency : '-'}</td>
                            <td>{date_sanctioned ? date_sanctioned : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                        </tr>
                    )
                    }):null
                }
                </tbody>
                </table>
                
                <h4>1.2 Patents (Total {rpat ? rpat.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Faculty Member</th>
                    <th>Title of the Patent  </th>
                    <th>Patent Field</th>
                    <th>Patent No. / File No.  </th>
                    <th>Date of awarded of patent</th>
                    <th>Royalty Received  </th>
                    <th>Patent Providing Agency  </th>
                    <th>India / Abroad(specify country)  </th>
                    <th>File</th>
                </tr>
                {
                    rpat ? rpat.map((r,i)=>{
                        const {n,title,field,fileno,date_awarded_patent,royalty_received,providing_agency,country,file} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{field ? field : '-'}</td>
                                <td>{fileno ? fileno : '-'}</td>
                                <td>{date_awarded_patent ? date_awarded_patent : '-'}</td>
                                <td>{royalty_received ? royalty_received : '-'}</td>
                                <td>{providing_agency ? providing_agency : '-'}</td>
                                <td>{country ? country : '-'}</td>
                                <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}   </a> : null}</td>
                            </tr>
                        )
                    }):null
                }
                </tbody>
                </table>

                <h4>1.3 Awards for Innovation (Total - {rawd ? rawd.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Faculty Member</th>
                    <th>Title of the innovation</th>
                    <th>Award Category</th>
                    <th>Name of the awardee</th>
                    <th>Designation</th>
                    <th>Awarding agency (include our College also)</th>
                    <th>Date</th>
                    <th>Venue </th>
                    <th>Regional/State/ National/ International</th>
                    <th>File</th>
                </tr>
                {
                    rawd ? rawd.map((r,i)=>{
                    const {n,awardee_name,designation,award_category,title,awarding_agency,venue,level,date,file} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{award_category ? award_category : '-'}</td>
                                <td>{awardee_name ? awardee_name : '-'}</td>
                                <td>{designation ? designation : '-'}</td>
                                <td>{awarding_agency ? awarding_agency : '-'}</td>
                                <td>{date? date : '-'}</td>
                                <td>{venue? venue : '-'}</td>
                                <td>{level ? level : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>     

                <h4>1.4 Ph. D/M. Phil (Total - {rdeg ? rdeg.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Scholar</th>
                    <th>Ph. D/M. Phil</th>
                    <th>Guide’s Name</th>
                    <th>Title of the Thesis</th>
                    <th>External Examiner’s Name, Designation and Address</th>
                    <th>Date</th>
                    <th>Venue of Viva</th>
                    <th>File</th>
                </tr>
                {
                    rdeg ? rdeg.map((r,i)=>{
                        const {n,deg,guide_name,title,external,venue,date,file} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{deg? deg : '-'}</td>
                                <td>{guide_name ? guide_name : '-'}</td>
                                <td>{title? title : '-'}</td>
                                <td>{external ? external : '-'}</td>
                                <td>{date? date : '-'}</td>
                                <td>{venue? venue : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>           

                <h4>1.5 National/International Fellowship (Total - {rfel ? rfel.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Faculty Member</th>
                    <th>National/International Fellowship</th>
                    <th>Date of Sanction</th>
                    <th>Funding Agency</th>
                    <th>Sanctioned Amount </th>
                    <th>File</th>
                </tr>
                {
                    rfel ? rfel.map((r,i)=>{
                        const {n,fellowship,date_sanctioned,funding_agency,sanctioned_amount,file} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{fellowship? fellowship : '-'}</td>
                                <td>{date_sanctioned? date_sanctioned : '-'}</td>
                                <td>{funding_agency ? funding_agency : '-'}</td>
                                <td>{sanctioned_amount ? sanctioned_amount : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>   

                <h2>COLLABORATIONS</h2>

                <h4>2.1 Number of Collaborative activities (Total - {ca ? ca.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Nature of Activity</th>
                    <th>Participant</th>
                    <th>Source of financial support</th>
                    <th>Period(from – to)</th>
                    <th>File)</th>
                </tr>
                {
                    ca ? ca.map((r,i)=>{
                        const {n,activity,participant,financial_support,period,file
                            } = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{activity? activity : '-'}</td>
                                <td>{participant? participant : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{period ? period : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>  

                <h4>2.2 Linkages (Total - {clink ? clink.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Nature and Title  of the Linkage</th>
                    <th>Partnering agency</th>
                    <th>Period(from – to)</th>
                    <th>File</th>
                </tr>
                {
                    clink ? clink.map((r,i)=>{
                        const {n,file,title,partnering_agency,period} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{title? title : '-'}</td>
                                <td>{partnering_agency? partnering_agency : '-'}</td>
                                <td>{period ? period : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>  

                <h4>2.3 MoU(s) Signed (Total - {cmou ? cmou.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Organization</th>
                    <th>Date Signed</th>
                    <th>Period(from – to)</th>
                    <th>Participants</th>
                    <th>Purpose</th>
                    <th>Total No. of Beneficiaries</th>
                    <th>File</th>
                </tr>
                {
                    cmou ? cmou.map((r,i)=>{
                        const {n,file,organization,date_signed,period,participants,purpose,total} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{organization? organization : '-'}</td>
                                <td>{date_signed? date_signed : '-'}</td>
                                <td>{period ? period : '-'}</td>
                                <td>{participants ? participants : '-'}</td>
                                <td>{purpose ? purpose : '-'}</td>
                                <td>{total ? total : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table> 

                <h2>EVENTS/PROGRAMMES/VISITS ORGANIZED</h2>

                <h4>3.1 Conference / Seminar / Symposium / Workshop organized (Total - {econ ? econ.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Conference/ Seminar/  Symposium / Workshop</th>
                    <th>Title</th>
                    <th>Sponsoring Agency(if applicable)</th>
                    <th>Resource Person, Designation/Address  </th>
                    <th>Objective of the event</th>
                    <th>Outcome of the event</th>
                    <th>National/International/State/Regional</th>
                    <th>Total No. of Participants</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>File</th>
                </tr>
                {
                    econ ? econ.map((r,i)=>{
                        const {n,file,con_sem,title,sponsoring_agency,resource_person,venue,objective,outcome,level,total,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{con_sem? con_sem : '-'}</td>
                                <td>{title? title : '-'}</td>
                                <td>{sponsoring_agency ? sponsoring_agency : '-'}</td>
                                <td>{resource_person ? resource_person : '-'}</td>
                                <td>{objective ? objective : '-'}</td>
                                <td>{outcome ? outcome : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{total ? total : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table> 

                <h4>3.2 Guest Lectures organized (Total - {egl ? egl.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Name of Resource Person</th>
                    <th>Designation / Address</th>
                    <th>Topic</th>
                    <th>Objective of the event</th>
                    <th>Outcome of the event</th>
                    <th>Total No. of Participants</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>File</th>
                </tr>
                {
                    egl ? egl.map((r,i)=>{
                        const {n,file,resource_person,designation,topic,venue,objective,outcome,total,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{resource_person ? resource_person : '-'}</td>
                                <td>{designation ? designation : '-'}</td>
                                <td>{topic ? topic : '-'}</td>
                                <td>{objective ? objective : '-'}</td>
                                <td>{outcome ? outcome : '-'}</td>
                                <td>{total ? total : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>3.3 Extension Activities (Total - {eea ? eea.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Activities Performed</th>
                    <th>Collaborating agency if any</th>
                    <th>Total No. of Students</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>File</th>
                </tr>
                {
                    eea ? eea.map((r,i)=>{
                        const {n,file,activities,collaborations,venue,total,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{activities ? activities : '-'}</td>
                                <td>{collaborations ? collaborations : '-'}</td>
                                <td>{total ? total : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>3.4 Industrial Visits (Total - {eev ? eev.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Class</th>
                    <th>Industry  Visited with address</th>
                    <th>Total  No. of Beneficiaries</th>
                    <th>Programme outcome</th>
                    <th>Date</th>
                    <th>File</th>
                </tr>
                {
                    eev ? eev.map((r,i)=>{
                        const {n,file,classes,date,address,total,outcome} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{classes ? classes : '-'}</td>
                                <td>{address ? address : '-'}</td>
                                <td>{total ? total : '-'}</td>
                                <td>{outcome ? outcome : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>3.5 Environmental Science (EVS) visit (Total - {eevs ? eevs.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Nature of Activity</th>
                    <th>Place of Visit with Address</th>
                    <th>Total  No. of Students</th>
                    <th>Date</th>
                    <th>File</th>
                </tr>
                {
                    eevs ? eevs.map((r,i)=>{
                        const {n,file,date,place,total,activity} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ?n : '-'}</td>
                                <td>{activity ? activity : '-'}</td>
                                <td>{place ? place : '-'}</td>
                                <td>{total ? total : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>3.6 Any other departmental activities (Total - {eda ? eda.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Name of the Activity</th>
                    <th>Chief Guest / Resource Person with Designation/Address</th>
                    <th>Topic</th>
                    <th>No. of Participants</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>File</th>
                </tr>
                {
                    eda ? eda.map((r,i)=>{
                        const {n,file,activity,guest,topic,total,venue,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{activity ? activity : '-'}</td>
                                <td>{guest ? guest : '-'}</td>
                                <td>{topic ? topic : '-'}</td>
                                <td>{total ? total : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h2>CONSULTANCY PROJECTS / SERVICES</h2>

                <h4>4.1 Consultancy Projects / Services (Total - {cps ? cps.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Project Title</th>
                    <th>New/On going</th>
                    <th>Revenue Generated</th>
                    <th>Date of Sanction</th>
                    <th>Sponsoring / Consultancy Agency</th>
                    <th>File</th>
                </tr>
                {
                    cps ? cps.map((r,i)=>{
                        const {n,file,title,no,revenue_generated,date_sanction,sponsor,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{no ? no : '-'}</td>
                                <td>{revenue_generated ? revenue_generated : '-'}</td>
                                <td>{date_sanction ? date_sanction : '-'}</td>
                                <td>{sponsor ? sponsor : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h2>FACULTY DETAILS </h2>

                <h4>5.1 Honours and Recognitions received by Teachers (Total - {fhnr ? fhnr.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Award /Honour Received </th>
                    <th>Details</th>
                    <th>International / National / State/Regional</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>File</th>
                </tr>
                {
                    fhnr ? fhnr.map((r,i)=>{
                        const {n,file,award_honour,details,venue,level,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{award_honour ? award_honour : '-'}</td>
                                <td>{details ? details : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.2 Qualifying in state/ national/ international level examinations (Total - {fexm ? fexm.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>exam,</th>
                    <th>exam_rollno,</th>
                    <th>date</th>   
                    <th>File</th>        
                </tr>
                {
                    fexm ? fexm.map((r,i)=>{
                        const {n,file,exam,exam_rollno,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{exam ? exam : `-`}</td>
                                <td>{exam_rollno ? exam_rollno : `-`}</td>
                                <td>{date ? date : `-`}</td> 
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.3 Books Published (Total - {fbp ? fbp.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Name of the Book</th>
                    <th>Publisher</th>
                    <th>International/National</th>
                    <th>ISBN No.</th>
                    <th>File</th>
                </tr>
                {
                    fbp ? fbp.map((r,i)=>{
                        const {n,file,book,publisher,level,isbn_no,} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{book ? book : '-'}</td>
                                <td>{publisher ? publisher : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{isbn_no ? isbn_no : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.4 Chapters Contributed (Total - {fcc ? fcc.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Title of the Book</th>
                    <th>Title of the Chapter</th>
                    <th>Editor</th>
                    <th>Publisher</th>
                    <th>International/National</th>
                    <th>ISBN No.</th>
                    <th>File</th>
                </tr>
                {
                    fcc ? fcc.map((r,i)=>{
                        const {n,file,title,chapter,editor,publisher,level,isbn_no} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{chapter ? chapter : '-'}</td>
                                <td>{editor ? editor : '-'}</td>
                                <td>{publisher ? publisher : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{isbn_no ? isbn_no : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.5 Conference Proceeding (Total - {fcp ?  fcp.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Name of the Conference</th>
                    <th>Publication in Conference (give details)</th>
                    <th>International/National</th>
                    <th>Page No. & ISBN No.</th>
                    <th>File</th>
                </tr>
                {
                    fcp ? fcp.map((r,i)=>{
                        const {n,file,con,publication,level,isbn_no} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{con ? con : '-'}</td>
                                <td>{publication ? publication : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{isbn_no ? isbn_no : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.6 Paper Presentation (Total - {fpp ? fpp.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Conference / Seminar/ Symposium / Workshops</th>
                    <th>Title of the Paper</th>
                    <th>Financial support  from the College  (Rs.)</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>International / National/State/Regional</th>
                    <th>File</th>F
                </tr>
                {
                fpp ?fpp.map((r,i)=>{
                        const {n,file,con,title,financial_support,venue,level,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{con ? con : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                                <td>{level ? level : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.7 Journal Publications (Total - {fjp ? fjp.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Title of the paper</th>
                    <th>Name of the Journal</th>
                    <th>ISSN No. & DoI</th>
                    <th>Volume No. , Issue &  Page No.</th>
                    <th>SCI/SCIE/Scopus Indexed / UGC Recognized / Others</th>
                    <th>Impact Factor (as per SCI)</th>
                    <th>International / National</th>
                    <th>File</th>
                </tr>
                {
                    fjp ? fjp.map((r,i)=>{
                        const {n,file,title,jou,issn_no,volume,sci,impact,level} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{jou ? jou : '-'}</td>
                                <td>{issn_no ? issn_no : '-'}</td>
                                <td>{volume ? volume : '-'}</td>
                                <td>{sci ? sci : '-'}</td>
                                <td>{impact ? impact : '-'}</td>
                                <td>{level ? level : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.8 Conference / Seminar / Symposium / Workshop Attended (Total - {fcon ? fcon.length : ''})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Conference / Seminar/ Symposium / Workshops</th>
                    <th>Title</th>
                    <th>International / National/State/Regional</th>
                    <th>Financial support  from the College  (Rs.)</th>
                    <th>Programme outcome</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>File</th>
                </tr>
                {
                    fcon ? fcon.map((r,i)=>{
                        const {n,file,con,title,venue,level,financial_support,programme_outcome,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{con ? con : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{programme_outcome ? programme_outcome : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.9 Resource Person (Total - {frp ? frp.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Guest lecture/Conference/Seminar/Symposium/Workshop</th>
                    <th>Topic Presented</th>
                    <th>Name of the Event</th>
                    <th>National/International/State/Regional</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>File</th>
                </tr>
                {
                    frp ? frp.map((r,i)=>{
                        const {n,file,sem,topic,event,venue,level,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{sem ? sem : '-'}</td>
                                <td>{topic ? topic : '-'}</td>
                                <td>{event ? event : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.10 Financial support (Total - {ffs ? ffs.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Name of the professional body for which membership fee is provided</th>
                    <th>Amount of support (Rs.)</th>
                    <th>File</th>
                </tr>
                {
                    ffs ? ffs.map((r,i)=>{
                        const {n,file,f,amount_support} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{f ? f : '-'}</td>
                                <td>{amount_support ? amount_support : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.11 Professional development programmes (Total - {fdp ? fdp.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Training/FDP/FIP/orientation Programme </th>
                    <th>Title of the Programme</th>
                    <th>Financial support  from the College  (Rs.)</th>
                    <th>National/International/State/Regional</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>File</th>
                </tr>
                {
                    fdp ? fdp.map((r,i)=>{
                        const {n,file,training,title,venue,financial_support,date,level} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{training ? training : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.12 Undergone Online-Courses (Total - {foc ? foc.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Training/FDP/FIP/orientation Programme </th>
                    <th>Title of the Programme</th>
                    <th>Duration</th>
                    <th>Financial support  from the College  (Rs.)</th>
                    <th>National/International/State/Regional</th>
                    <th>File</th>
                </tr>
                {
                    foc ? foc.map((r,i)=>{
                        const {n,file,training,title,financial_support,level,duration} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{training ? training : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{duration ? duration : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{level ? level : '-'}</td>
                            <td>{file ? <a href={`https://localhost:3000/Uploads/${file}`}>{file}</a> : null}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.13 E-content developed (Total - {fe ? fe.length : '0'})</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Name of the module</th>
                    <th>Platform on which module is developed</th>
                    <th>Date of launching e – content</th>
                    <th>File</th>
                </tr>
                {
                    fe ? fe.map((r,i)=>{
                        const {n,file,module,platform,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{n ? n : '-'}</td>
                                <td>{module ? module : '-'}</td>
                                <td>{platform ? platform : '-'}</td>
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
                <p style={{color: '#0093E9'}}>Internal Quality Assurance Cell (IQAC)</p>
                <p>Department : {data ? data[0].department : null} - Staffs</p>
                {
                    msg ? 
                    <>
                        {msg === 'All' ? 
                            <p style={{color: '#0093E9'}}>Reports</p> :
                            <>
                                <p style={{fontSize: '14px'}}>Quaterly Report</p>
                                <p style={{color: '#0093E9'}}>{msg ? msg: null}</p>
                            </>
                        }
                    </> : null
                }
            </div>


            <div className='select'>
                <p><b>Filter by Period</b></p>
                <p className='msg' onClick={e=>setDrp(!drp)}>{pvalue ? pvalue : ''}<IoMdArrowDropdownCircle style={{color: '#0093E9'}} className={`${drp ? 'active' : ''}`} /></p>
                <div className={`${drp ? 'active' : ''}`} style={{backgroundColor: '#0093E9',
                backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'}}>
                <p onClick={e=>{callAboutPage();setMsg('All');toast.info("All",{autoClose:1000});setPvalue('All');setDrp(!drp)}}>All</p>
                <p onClick={e=>{call_period(`'2019-07-01' and '2019-09-30'`,'July - September(2019)');setMsg(`July (01/07/2019) to September (30/09/2019)`);setPvalue('July - September(2019)');setDrp(!drp)}}>July - September(2019)</p>
                <p onClick={e=>{call_period(`'2019-10-01' and '2019-12-31'`,'October - December(2019)');setMsg(`October (01/10/2019) to December (30/12/2019)`);setPvalue('October - December(2019)');setDrp(!drp)}}>October - December(2019)</p>
                <p onClick={e=>{call_period(`'2020-01-01' and '2020-03-31'`,'January - March(2020)');setMsg(`January (01/01/2020) to March (31/03/2020)`);setPvalue('January - March(2020)');setDrp(!drp)}}>January - March(2020)</p>
                <p onClick={e=>{call_period(`'2020-04-01' and '2020-06-30'`,'April - June(2020)');setMsg(`April (01/04/2020) to June (30/06/2020)`);setPvalue('April - June(2020)');setDrp(!drp)}}>April - June(2020)</p>

                <p onClick={e=>{call_period(`'2020-07-01' and '2020-09-30'`,'July - September(2020)');setMsg(`July (01/07/2020) to September (30/09/2020)`);setPvalue('July - September(2020)');setDrp(!drp)}}>July - September(2020)</p>
                <p onClick={e=>{call_period(`'2020-10-01' and '2020-12-31'`,'October - December(2020)');setMsg(`October (01/10/2020) to December (30/12/2020)`);setPvalue('October - December(2020)');setDrp(!drp)}}>October - December(2020)</p>
                <p onClick={e=>{call_period(`'2021-01-01' and '2021-03-31'`,'January - March(2021)');setMsg(`January (01/01/2021) to March (31/03/2021)`);setPvalue('January - March(2021)');setDrp(!drp)}}>January - March(2021)</p>
                <p onClick={e=>{call_period(`'2021-04-01' and '2021-06-30'`,'April - June(2021)');setMsg(`April (01/04/2021) to June (30/06/2021)`);setPvalue('April - June(2021)');setDrp(!drp)}}>April - June(2021)</p>

                <p onClick={e=>{call_period(`'2021-07-01' and '2021-09-30'`,'July - September(2021)');setMsg(`July (01/07/2021) to September (30/09/2021)`);setPvalue('July - September(2021)');setDrp(!drp)}}>July - September(2021)</p>
                <p onClick={e=>{call_period(`'2021-10-01' and '2021-12-31'`,'October - December(2021)');setMsg(`October (01/10/2021) to December (30/12/2021)`);setPvalue('October - December(2021)');setDrp(!drp)}}>October - December(2021)</p>
                <p onClick={e=>{call_period(`'2022-01-01' and '2022-03-31'`,'January - March(2022)');setMsg(`January (01/01/2022) to March (31/03/2022)`);setPvalue('January - March(2022)');setDrp(!drp)}}>January - March(2022)</p>
                <p onClick={e=>{call_period(`'2022-04-01' and '2022-06-30'`,'April - June(2022)');setMsg(`April (01/04/2022) to June (30/06/2022)`);setPvalue('April - June(2022)');setDrp(!drp)}}>April - June(2022)</p>
                </div>
            </div><br />

            <div className="tables">
                <div style={{display: 'flex',justifyContent: 'space-between',margin: '0 0 15px'}}>
                    <p style={{cursor:'pointer',color: '#0093E9'}} className="expall" onClick={e=>export_all()}><FaFileWord />Export All</p>
                    
                    <Link to="/super_admin" style={{color: "#ff7295", display:'flex',alignItems:'center'}}><IoMdArrowRoundBack />Back</Link>
                </div>
                <h3>Research</h3>
                
                {/* Research Projects */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field: 'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'no',title:'N/O',filterPlaceholder:'Filter by N/O'},
                            {field:'date_sanctioned',title:'Date Sanctioned',filterPlaceholder:'Filter by Date Sanctioned'},
                            {field:'amount_sanctioned',title:'Amount Sanctioned',filterPlaceholder:'Filter by Amount Sanctioned'},
                            {field:'amount_received',title:'Amount Received',filterPlaceholder:'Filter by Amount Received'},
                            {field:'funding_agency',title:'Funding Agency',filterPlaceholder:'Filter by Funding Agency'},
                            {field:'fileno',title:'Fileno',filterPlaceholder:'Filter by File No'},
                            {field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={rps} title={`Research Projects ( ${rps ? rps.length : '0'} )`} />
                        
                    }    
                </div>

                {/* Patents */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},exportFileName:'Ct',rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'field',title:'Field',filterPlaceholder:'Filter by Field'},
                            {field:'fileno',title:'File No',filterPlaceholder:'Filter by FileNo Sanctioned'},
                            {field:'date_awarded_patent',title:'Date of patent awarded',filterPlaceholder:'Filter by Date of patent awarded'},
                            {field:'providing_agency',title:'Providing Agency',filterPlaceholder:'Filter by Providing Agency'},
                            {field:'royalty_received',title:'Royalty Received',filterPlaceholder:'Filter by Royalty Received'},
                            {field:'country',title:'Country',filterPlaceholder:'Filter by Country'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={rpat} title={`Patents ( ${rpat ? rpat.length : '0'} )`}  />
                        
                    }    
                </div>

                {/* Awards for Innovation */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},exportFileName:'Ct',rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'award_category',title:'Award Category',filterPlaceholder:'Filter by Award Category'},
                            {field:'awardee_name',title:'Awardee Name',filterPlaceholder:'Filter by Awardee Name'},
                            {field:'designation',title:'Designation',filterPlaceholder:'Filter by Designation'},
                            {field:'awarding_agency',title:'Awarding Agency',filterPlaceholder:'Filter by Awarding Agency'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={rawd} title={`Awards for Innovation ( ${rawd ? rawd.length : '0'} )`}  />
                        
                    }    
                </div>

                {/* M.Phil/P.hd */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},exportFileName:'Ct',rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'deg',title:'Degree',filterPlaceholder:'Filter by Degree'},
                            {field:'title',title:'Title of Thesis',filterPlaceholder:'Filter by Title of thesis'},
                            {field:'external',title:'External',filterPlaceholder:'Filter by External'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={rdeg} title={`Ph.D/M.Phil ( ${rdeg ? rdeg.length : '0'} )`}  />
                        
                    }    
                </div>

                {/* Fellowship */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'fellowship',title:'Fellowship',filterPlaceholder:'Filter by Fellowship'},
                            {field:'date_sanctioned',title:'Date Sanctioned',filterPlaceholder:'Filter by Date Sanctioned'},
                            {field:'funding_agency',title:'Funding Agency',filterPlaceholder:'Filter by Funding Agency'},
                            {field:'sanctioned_amount',title:'Amount Sanctioned',filterPlaceholder:'Filter by Amount Sanctioned'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={rfel} title={`Fellowship ( ${rfel ? rfel.length : '0'} )`}  />
                        
                    }    
                </div>

                <h3>Collaboration</h3>

                {/* Collaborative Activities */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'activity',title:'Activity',filterPlaceholder:'Filter by Activity'},
                            {field:'participant',title:'Participant',filterPlaceholder:'Filter by Participant'},
                            {field:'financial_support',title:'Financial support',filterPlaceholder:'Filter by Financial support'},
                            {field:'period',title:'Period',filterPlaceholder:'Filter by Period'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={ca} title={`Collaborative Activities ( ${ca ? ca.length : '0'} )`}  />
                        
                    }    
                </div>

                {/* Linkages */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'partnering_agency',title:'Partnering Agency',filterPlaceholder:'Filter by Partnering Agency'},
                            {field:'period',title:'Period',filterPlaceholder:'Filter by Period'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={clink} title={`Linkages ( ${clink ? clink.length : '0'} )`}  />
                        
                    }    
                </div>

                {/* Mou */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'organization',title:'Organization',filterPlaceholder:'Filter by Organization'},
                            {field:'date_signed',title:'Date signed',filterPlaceholder:'Filter by Date signed'},
                            {field:'period',title:'Period',filterPlaceholder:'Filter by Period'},
                            {field:'participants',title:'Participants',filterPlaceholder:'Filter by Participants'},
                            {field:'purpose',title:'Purpose',filterPlaceholder:'Filter by Purpose'},
                            {field:'total',title:'Total no. of beneficiaries',filterPlaceholder:'Filter by total'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={cmou} title={`Mou's Signed ( ${cmou ? cmou.length : '0'} )`}  />
                        
                    }    
                </div>

                {/* Conference / Seminar / Symposium / Workshop organized */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'con_sem',title:'Type',filterPlaceholder:'Filter by Type'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'sponsoring_agency',title:'Sponsoring Agency',filterPlaceholder:'Filter by Sponsoring Agency'},
                            {field:'resource_person',title:'Resource Person',filterPlaceholder:'Filter by Resource Person'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'objective',title:'Objective',filterPlaceholder:'Filter by Objective'},
                            {field:'outcome',title:'Outcome',filterPlaceholder:'Filter by Outcome'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'total',title:'Total',filterPlaceholder:'Filter by Total'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={econ} title={`Conference / Seminar / Symposium / Workshop organized ( ${econ ? econ.length : '0'} )`}  />
                        
                    }    
                </div>

                {/* Guest Lectures */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'resource_person',title:'Resource Person',filterPlaceholder:'Filter by Resource Person'},
                            {field:'designation',title:'Designation',filterPlaceholder:'Filter by Designation'},
                            {field:'topic',title:'Topic',filterPlaceholder:'Filter by Topic'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'objective',title:'Objective',filterPlaceholder:'Filter by Objective'},
                            {field:'outcome',title:'Outcome',filterPlaceholder:'Filter by Outcome'},
                            {field:'total',title:'Total',filterPlaceholder:'Filter by Total'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={egl} title={`Guest Lectures ( ${egl ? egl.length : '0'} )`}  />
                        
                    }    
                </div>

                {/* Extension Activities */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'activities',title:'Activities Performed',filterPlaceholder:'Filter by Activities Performed'},
                            {field:'collaborations',title:'Collaborating Agency',filterPlaceholder:'Filter by Collaborating Agency'},
                            {field:'total',title:'Total',filterPlaceholder:'Filter by Total'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={eea} title={`Extension Activities ( ${eea ? eea.length : '0'} )`}  />
                        
                    }    
                </div>

                {/* Industrial Visits */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'classes',title:'Class',filterPlaceholder:'Filter by Class'},
                            {field:'total',title:'Total',filterPlaceholder:'Filter by Total'},
                            {field:'outcome',title:'Outcome',filterPlaceholder:'Filter by Outcome'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={eev} title={`Industrial Visits ( ${eev ? eev.length : '0'} )`}  />
                        
                    }    
                </div>

                {/* Evs Visits */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'place',title:'Place of visit',filterPlaceholder:'Filter by place'},
                            {field:'total',title:'Total no. Students',filterPlaceholder:'Filter by Total'},
                            {field:'activity',title:'Nature of activity',filterPlaceholder:'Filter by activity'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={eevs} title={`Evs Visits ( ${eevs ? eevs.length : '0'} )`}  />
                        
                    }    
                </div>

                {/* Departmental Activities */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'activity',title:'Activity',filterPlaceholder:'Filter by Activity'},
                            {field:'guest',title:'Guest',filterPlaceholder:'Filter by Guest'},
                            {field:'topic',title:'Topic',filterPlaceholder:'Filter by Topic'},
                            {field:'total',title:'Total no. Students',filterPlaceholder:'Filter by Total'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by venue'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={eda} title={`Departmental Activities ( ${eda ? eda.length : '0'} )`}  />
                        
                    }    
                </div>

                <h3>Consultancy Projects/Services</h3>

                {/* Projects Services */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'title',title:'Project Title',filterPlaceholder:'Filter by Project Title'},
                            {field:'no',title:'New/Ongoing',filterPlaceholder:'Filter by New/Ongoing'},
                            {field:'revenue_generated',title:'Revenue Generated',filterPlaceholder:'Filter by Revenue Generated'},
                            {field:'date_sanction',title:'Date sanction',filterPlaceholder:'Filter by Date sanction'},
                            {field:'sponsor',title:'Sponsors',filterPlaceholder:'Filter by Sponsors'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={cps} title={`Projects Services ( ${cps ? cps.length : '0'} )`}  />
                        
                    }    
                </div>

                <h3>Faculty Details</h3>

                {/* Honours */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'award_honour',title:'Award Honour ',filterPlaceholder:'Filter by Award Honour'},
                            {field:'details',title:'Details',filterPlaceholder:'Filter by Details'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fhnr} title={`Honours and Recognitions ( ${fhnr ? fhnr.length : '0'} )`}  />
                        
                    }    
                </div>

                {/* Qualifying in state/ national/ international level examinations*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'exam',title:'Exam ',filterPlaceholder:'Filter by Exam'},
                            {field:'exam_rollno',title:'Exam Rollno',filterPlaceholder:'Filter by Exam Rollno'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fexm} title={`Qualifying in state/ national/ international level examinations ( ${fexm ? fexm.length : '0'} )`}  />
                        
                    }    
                </div>

                {/*Books Published*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'book',title:'Book ',filterPlaceholder:'Filter by Book'},
                            {field:'publisher',title:'Publisher',filterPlaceholder:'Filter by Publisher'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'isbn_no',title:'ISBN No',filterPlaceholder:'Filter by ISBN No'},  {field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fbp} title={`Books Published ( ${fbp ? fbp.length : '0'} )`}  />
                        
                    }    
                </div>

                {/*Chapters Contributed*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'title',title:'Title ',filterPlaceholder:'Filter by Title'},
                            {field:'chapter',title:'Chapter',filterPlaceholder:'Filter by Chapter'},
                            {field:'editor',title:'Editor',filterPlaceholder:'Filter by Editor'},
                            {field:'publisher',title:'Publisher',filterPlaceholder:'Filter by Publisher'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'isbn_no',title:'ISBN No',filterPlaceholder:'Filter by ISBN No'},  {field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fcc} title={`Chapters Contributed ( ${fcc ? fcc.length : '0'} )`}  />
                        
                    }    
                </div>

                {/*Conferece Proceeding*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'con',title:'Type ',filterPlaceholder:'Filter by Type'},
                            {field:'publication',title:'Publication',filterPlaceholder:'Filter by Publication'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'isbn_no',title:'ISBN No',filterPlaceholder:'Filter by ISBN No'},  {field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fcp} title={`Conferece Proceeding ( ${fcp ? fcp.length : '0'} )`}  />
                        
                    }    
                </div>   

                {/*Paper Presentation*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'con',title:'Type ',filterPlaceholder:'Filter by Type'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'financial_support',title:'Financial Support',filterPlaceholder:'Filter by Financial Support'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},  
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fpp} title={`Paper Presentation ( ${fpp ? fpp.length : '0'} )`}  />
                        
                    }    
                </div>  

                {/*journal_publications*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'jou',title:'Journal',filterPlaceholder:'Filter by Journal'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'issn_no',title:'Issn No',filterPlaceholder:'Filter by Issn No'},
                            {field:'impact',title:'Impact',filterPlaceholder:'Filter by Impact'},
                            {field:'level',title:'level',filterPlaceholder:'Filter by level'},
                            {field:'sci',title:'Sci',filterPlaceholder:'Filter by Sci'},
                            {field:'volume',title:'Volume',filterPlaceholder:'Filter by Volume'},  {field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fjp} title={`Journal Publications ( ${fjp ? fjp.length : '0'} )`}  />
                        
                    }    
                </div>

                {/*conference*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'con',title:'Type',filterPlaceholder:'Filter by Type'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'financial_support',title:'Financial Support',filterPlaceholder:'Filter by Financial Support'},
                            {field:'programme_outcome',title:'Programme Outcome',filterPlaceholder:'Filter by Programme Outcome'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fcon} title={`Conference ( ${fcon ? fcon.length : '0'} )`}  />
                        
                    }    
                </div>

                {/*resource person*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'sem',title:'Type',filterPlaceholder:'Filter by Type'},
                            {field:'topic',title:'Topic',filterPlaceholder:'Filter by Topic'},
                            {field:'event',title:'Event',filterPlaceholder:'Filter by Event'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={frp} title={`Resource Person ( ${frp ? frp.length : '0'} )`} />
                        
                    }    
                </div>

                {/*Financial Support*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'f',title:'C',filterPlaceholder:'Filter by C'},
                            {field:'amount_support',title:'Amount Support',filterPlaceholder:'Filter by Amount Support'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={ffs} title={`Financial Support ( ${ffs ? ffs.length : '0'} )`} />
                        
                    }    
                </div>

                {/*Development Programmes*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'training',title:'Training',filterPlaceholder:'Filter by Training'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'financial_support',title:'Financial Support',filterPlaceholder:'Filter by Financial Support'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fdp} title={`Development Programmes ( ${fdp ? fdp.length : '0'} )`} />
                        
                    }    
                </div>

                {/*Online Courses*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'training',title:'Type',filterPlaceholder:'Filter by Type'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'duration',title:'Duration',filterPlaceholder:'Filter by Duration'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'financial_support',title:'Financial Support',filterPlaceholder:'Filter by Financial Support'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={foc} title={`Online Courses ( ${foc ? foc.length : '0'} )`} />
                        
                    }    
                </div>

                {/*E content*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#0093E9',
                            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
                            color: '#fff'
                        }}} columns={[
                            {field:'n',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'platform',title:'Platform',filterPlaceholder:'Filter by Platform'},
                            {field:'module',title:'Module',filterPlaceholder:'Filter by Module'},{field:'file',title:'File',render:rowData=><Link to={`/Uploads/${rowData.file}`} target='_blank'>{rowData.file}</Link>,filterPlaceholder:'Filter by File'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fe} title={`E - content ( ${fe ? fe.length : '0'} )`} />
                        
                    }    
                </div>                    
            </div>    
        </div>
    )
}

export default Adminlogin