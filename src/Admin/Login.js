import React,{useEffect, useState} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory } from 'react-router-dom'
import '../CSS/LS.css'
import MaterialTable from 'material-table'
import {FaFileWord} from 'react-icons/fa'
import { RiAdminFill } from 'react-icons/ri'

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

    const [data,setData] = useState()
    const editprofile = `/dashboard/editprofile/${data ? data[0].user_id : ''}`
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

            if(datas.user[0].roll != 'IQAC'){
                history.push('/dashboard')
            }

            const ad = await fetch(`/admin/${datas.user[0].department}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            })

            const admin = await ad.json()
            console.log(admin)

            // Research Projects
            let rp =[]
            admin.research_projects.map((e)=>{
                rp.push(e)
            })
            setRps(rp)

            // // Patents
            let rpa =[]
            admin.patents.map((e)=>{
                rpa.push(e)
            })
            setRpat(rpa)

            // // Awards for Innovation
            let raw =[]
            admin.awards_for_innovation.map((e)=>{
                raw.push(e)
            })
            setRawd(raw)

            // // Degree
            let rde =[]
            admin.degree.map((e)=>{
                rde.push(e)
            })
            setRdeg(rde)

            // // Fellowship
            let rf =[]
            admin.fellowship.map((e)=>{
                rf.push(e)
            })
            setRfel(rf)

            // // Collaborative Activities
            let cca =[]
            admin.collab_activ.map((e)=>{
                cca.push(e)
            })
            setCca(cca)

            // //Linkages
            let li = []
            admin.linkages.map((e)=>{
                li.push(e)
            })
            setClink(li)

            // //mou
            let mou = []
            admin.mou.map((e)=>{
                mou.push(e)
            })
            setCmou(mou)

            // //conference
            let con = []
            admin.conference.map((e)=>{
                con.push(e)
            })
            setEcon(con)

            // //guestlectures
            let gl = []
            admin.guest_lectures.map((e)=>{
                gl.push(e)
            })
            setEgl(gl)

            // //extension activities
            let ea = []
            admin.extension_activities.map((e)=>{
                ea.push(e)
            })
            setEea(ea)

            // //industrial visits
            let ev = []
            admin.industrial_visits.map((e)=>{
                ev.push(e)
            })
            setEev(ev)

            // //evs visits
            let evs = []
            admin.evs.map((e)=>{
                evs.push(e)
            })
            setEevs(evs)

            // //departmental activities
            let da = []
            admin.departmental_activities.map((e)=>{
                da.push(e)
            })
            setEda(da)

            // //projects services
            let ps = []
            admin.projects_services.map((e)=>{
                ps.push(e)
            })
            setCps(ps)

            // //honours
            let hnr = []
            admin.honours.map((e)=>{
                hnr.push(e)
            })
            setFhnr(hnr)

            // //exams
            let exm = []
            admin.exams.map((e)=>{
                exm.push(e)
            })
            setFexm(exm)
            
            // //books published
            let bp = []
            admin.books_published.map((e)=>{
                bp.push(e)
            })
            setFbp(bp)

            // //chapters contributed
            let cc = []
            admin.chapters_contributed.map((e)=>{
                cc.push(e)
            })
            setFcc(cc)

            // //conference proceeding
            let cp = []
            admin.conference_proceeding.map((e)=>{
                cp.push(e)
            })
            setFcp(cp)

            // //paper presentation
            let pp = []
            admin.paper_presentation.map((e)=>{
                pp.push(e)
            })
            setFpp(pp)

            // //journal publication
            let jp = []
            admin.journal_publications.map((e)=>{
                jp.push(e)
            })
            setFjp(jp)

            // //con
            let fco = []
            admin.fconference.map((e)=>{
                fco.push(e)
            })
            setFcon(fco)

            // //resource person
            let frp = []
            admin.resource_person.map((e)=>{
                frp.push(e)
            })
            setFrp(frp)

            // //financial support
            let ffs = []
            admin.financial_support.map((e)=>{
                ffs.push(e)
            })
            setFfs(ffs)

            // //development programmes
            let fdp = []
            admin.development_programmes.map((e)=>{
                fdp.push(e)
            })
            setFdp(fdp)

            // //online_courses
            let foc = []
            admin.online_courses.map((e)=>{
                foc.push(e)
            })
            setFoc(foc)

            // //e_content
            let fe = []
            admin.e_content.map((e)=>{
                fe.push(e)
            })
            setFe(fe)
            
            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }catch(err){
            console.log(err)
        }
    }

    const qur = (year,mn1,mn2,mn3)=>{
        //Research Projects
        let rpss = []
        data.map((e)=>{
            e.forms.research.research_projects.map((e)=>{
                var date = e.date.split('-')
                if((date[0]==year) && (date[1]== mn1|| date[1]==mn2 || date[1]==mn3)){
                    rpss.push(e)
                }
            })
        })
        setRps(rpss)

        //Patents
        let rpa = []
        data.map((e)=>{
            e.forms.research.patents.map((e)=>{
                var date = e.date.split('-')
                if((date[0]==year) && (date[1]== mn1|| date[1]==mn2 || date[1]==mn3)){
                    rpa.push(e)
                }
            })
        })
        setRpat(rpa)

        //Awards for Innovation
        let raw = []
        data.map((e)=>{
            e.forms.research.awards_for_innovation.map((e)=>{
                var date = e.date.split('-')
                if((date[0]==year) && (date[1]== mn1|| date[1]==mn2 || date[1]==mn3)){
                    raw.push(e)
                }
            })
        })
        setRawd(raw)

        //Degree
        let d = []
        data.map((e)=>{
            e.forms.research.deg.map((e)=>{
                var date = e.date.split('-')
                if((date[0]==year) && (date[1]== mn1|| date[1]==mn2 || date[1]==mn3)){
                    d.push(e)
                }
            })
        })
        setRdeg(d)

        //Fellowship
        let fe = []
        data.map((e)=>{
            e.forms.research.fellowship.map((e)=>{
                var date = e.date.split('-')
                if((date[0]==year) && (date[1]== mn1|| date[1]==mn2 || date[1]==mn3)){
                    fe.push(e)
                }
            })
        })
        setRfel(fe)

        //Collaborative Activities
        let ca = []
        data.map((e)=>{
            e.forms.collaboration.collaborative_activities.map((e)=>{
                var date = e.date.split('-')
                if((date[0]==year) && (date[1]== mn1|| date[1]==mn2 || date[1]==mn3)){
                    ca.push(e)
                }
            })
        })
        setCca(ca)

        //Linkages
        let lin = []
        data.map((e)=>{
            e.forms.collaboration.linkages.map((e)=>{
                var date = e.date.split('-')
                if((date[0]==year) && (date[1]== mn1|| date[1]==mn2 || date[1]==mn3)){
                    lin.push(e)
                }
            })
        })
        setClink(lin)

        //Mou
        let mou = []
        data.map((e)=>{
            e.forms.collaboration.mou.map((e)=>{
                var date = e.date.split('-')
                if((date[0]==year) && (date[1]== mn1|| date[1]==mn2 || date[1]==mn3)){
                    mou.push(e)
                }
            })
        })
        setCmou(mou)

    }

    const prd = (year,mnf,mnt)=>{
        let rpss = []
        data.map((e)=>{
            e.forms.research.research_projects.map((e)=>{
                var date = e.date.split('-')
                for(let i=mnf;i<=mnt;i++){
                    if((date[0]==year) && (date[1]== i)){
                        rpss.push(e)
                    }
                }
            })
        })
        setRps(rpss)
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
            <div class="WordSection1">
                <h1>IQAC Report of {data ? data[0].department : ''}</h1>
                <h2>RESEARCH </h2>
                <h4>1.1 Research Projects</h4>
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
                </tr>
                {
                    rps ? rps.map((r,i)=>
                    { const {name,title,no,amount_sanctioned,fileno,amount_received,date_sanctioned,funding_agency} = r
                    return(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{name ? name : '-'}</td>
                            <td>{title ? title : '-'}</td>
                            <td>{no ? no : '-'}</td>
                            <td>{amount_sanctioned ? amount_sanctioned : '-'}</td>
                            <td>{fileno ? fileno : '-'}</td>
                            <td>{amount_received ? amount_received : '-'}</td>
                            <td>{funding_agency ? funding_agency : '-'}</td>
                            <td>{date_sanctioned ? date_sanctioned : '-'}</td>
                        </tr>
                    )
                    }):null
                }
                </tbody>
                </table>
                
                <h4>1.2 Patents</h4>
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
                </tr>
                {
                    rpat ? rpat.map((r,i)=>{
                        const {title,field,fileno,date_awarded_patent,royalty_received,providing_agency,country,name} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{field ? field : '-'}</td>
                                <td>{fileno ? fileno : '-'}</td>
                                <td>{date_awarded_patent ? date_awarded_patent : '-'}</td>
                                <td>{royalty_received ? royalty_received : '-'}</td>
                                <td>{providing_agency ? providing_agency : '-'}</td>
                                <td>{country ? country : '-'}</td>
                            </tr>
                        )
                    }):null
                }
                </tbody>
                </table>

                <h4>1.3 Awards for Innovation</h4>
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
                </tr>
                {
                    rawd ? rawd.map((r,i)=>{
                    const {awardee_name,designation,award_category,title,awarding_agency,venue,level,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{award_category ? award_category : '-'}</td>
                                <td>{awardee_name ? awardee_name : '-'}</td>
                                <td>{designation ? designation : '-'}</td>
                                <td>{awarding_agency ? awarding_agency : '-'}</td>
                                <td>{date? date : '-'}</td>
                                <td>{venue? venue : '-'}</td>
                                <td>{level ? level : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>     

                <h4>1.4 Ph. D/M. Phil awarded during the period</h4>
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
                </tr>
                {
                    rdeg ? rdeg.map((r,i)=>{
                        const {deg,guide_name,title,external,venue,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{deg? deg : '-'}</td>
                                <td>{guide_name ? guide_name : '-'}</td>
                                <td>{title? title : '-'}</td>
                                <td>{external ? external : '-'}</td>
                                <td>{date? date : '-'}</td>
                                <td>{venue? venue : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>           

                <h4>1.5 National/International Fellowship</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the Faculty Member</th>
                    <th>National/International Fellowship</th>
                    <th>Date of Sanction</th>
                    <th>Funding Agency</th>
                    <th>Sanctioned Amount </th>
                </tr>
                {
                    rfel ? rfel.map((r,i)=>{
                        const {fellowship,date_sanctioned,funding_agency,sanctioned_amount,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{fellowship? fellowship : '-'}</td>
                                <td>{date_sanctioned? date_sanctioned : '-'}</td>
                                <td>{funding_agency ? funding_agency : '-'}</td>
                                <td>{sanctioned_amount ? sanctioned_amount : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>   

                <h2>COLLABORATIONS</h2>

                <h4>2.1 Number of Collaborative activities</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Nature of Activity</th>
                    <th>Participant</th>
                    <th>Source of financial support</th>
                    <th>Period(from – to)</th>
                </tr>
                {
                    ca ? ca.map((r,i)=>{
                        const {activity,participant,financial_support,period,name
                            } = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{activity? activity : '-'}</td>
                                <td>{participant? participant : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{period ? period : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>  

                <h4>2.2 Linkages</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Nature and Title  of the Linkage</th>
                    <th>Partnering agency</th>
                    <th>Period(from – to)</th>
                </tr>
                {
                    clink ? clink.map((r,i)=>{
                        const {title,partnering_agency,period,name} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{title? title : '-'}</td>
                                <td>{partnering_agency? partnering_agency : '-'}</td>
                                <td>{period ? period : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>  

                <h4>2.3 MoU(s) Signed</h4>
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
                </tr>
                {
                    cmou ? cmou.map((r,i)=>{
                        const {organization,date_signed,period,participants,purpose,total,name} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{organization? organization : '-'}</td>
                                <td>{date_signed? date_signed : '-'}</td>
                                <td>{period ? period : '-'}</td>
                                <td>{participants ? participants : '-'}</td>
                                <td>{purpose ? purpose : '-'}</td>
                                <td>{total ? total : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table> 

                <h2>EVENTS/PROGRAMMES/VISITS ORGANIZED</h2>

                <h4>3.1 Conference / Seminar / Symposium / Workshop organized</h4>
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
                </tr>
                {
                    econ ? econ.map((r,i)=>{
                        const {con_sem,title,sponsoring_agency,resource_person,venue,objective,outcome,level,total,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
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
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table> 

                <h4>3.2 Guest Lectures organized</h4>
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
                </tr>
                {
                    egl ? egl.map((r,i)=>{
                        const {resource_person,designation,topic,venue,objective,outcome,total,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{resource_person ? resource_person : '-'}</td>
                                <td>{designation ? designation : '-'}</td>
                                <td>{topic ? topic : '-'}</td>
                                <td>{objective ? objective : '-'}</td>
                                <td>{outcome ? outcome : '-'}</td>
                                <td>{total ? total : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>3.3 Extension Activities</h4>
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
                </tr>
                {
                    eea ? eea.map((r,i)=>{
                        const {activities,collaborations,venue,total,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{activities ? activities : '-'}</td>
                                <td>{collaborations ? collaborations : '-'}</td>
                                <td>{total ? total : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>3.4 Industrial Visits</h4>
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
                </tr>
                {
                    eev ? eev.map((r,i)=>{
                        const {classes,date,address,total,outcome,name} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{classes ? classes : '-'}</td>
                                <td>{address ? address : '-'}</td>
                                <td>{total ? total : '-'}</td>
                                <td>{outcome ? outcome : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>3.5 Environmental Science (EVS) visit</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Nature of Activity</th>
                    <th>Place of Visit with Address</th>
                    <th>Total  No. of Students</th>
                    <th>Date</th>
                </tr>
                {
                    eevs ? eevs.map((r,i)=>{
                        const {date,place,total,activity,name} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{activity ? activity : '-'}</td>
                                <td>{place ? place : '-'}</td>
                                <td>{total ? total : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>3.6 Any other departmental activities</h4>
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
                </tr>
                {
                    eda ? eda.map((r,i)=>{
                        const {activity,guest,topic,total,venue,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{activity ? activity : '-'}</td>
                                <td>{guest ? guest : '-'}</td>
                                <td>{topic ? topic : '-'}</td>
                                <td>{total ? total : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h2>CONSULTANCY PROJECTS / SERVICES</h2>

                <h4>4.1 Consultancy Projects / Services</h4>
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
                </tr>
                {
                    cps ? cps.map((r,i)=>{
                        const {title,no,revenue_generated,date_sanction,sponsor,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{no ? no : '-'}</td>
                                <td>{revenue_generated ? revenue_generated : '-'}</td>
                                <td>{date_sanction ? date_sanction : '-'}</td>
                                <td>{sponsor ? sponsor : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h2>FACULTY DETAILS </h2>

                <h4>5.1 Honours and Recognitions received by Teachers</h4>
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
                </tr>
                {
                    fhnr ? fhnr.map((r,i)=>{
                        const {award_honour,details,venue,level,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{award_honour ? award_honour : '-'}</td>
                                <td>{details ? details : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.2 Qualifying in state/ national/ international level examinations</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>exam,</th>
                    <th>exam_rollno,</th>
                    <th>date</th>           
                </tr>
                {
                    fexm ? fexm.map((r,i)=>{
                        const {exam,exam_rollno,date,name} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{exam ? exam : `-`}</td>
                                <td>{exam_rollno ? exam_rollno : `-`}</td>
                                <td>{date ? date : `-`}</td> 
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.3 Books Published</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Name of the Book</th>
                    <th>Publisher</th>
                    <th>International/National</th>
                    <th>ISBN No.</th>
                </tr>
                {
                    fbp ? fbp.map((r,i)=>{
                        const {book,publisher,level,isbn_no,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{book ? book : '-'}</td>
                                <td>{publisher ? publisher : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{isbn_no ? isbn_no : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.4 Chapters Contributed</h4>
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
                </tr>
                {
                    fcc ? fcc.map((r,i)=>{
                        const {title,chapter,editor,publisher,level,isbn_no,name} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{chapter ? chapter : '-'}</td>
                                <td>{editor ? editor : '-'}</td>
                                <td>{publisher ? publisher : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{isbn_no ? isbn_no : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.5 Conference Proceeding</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Name of the Conference</th>
                    <th>Publication in Conference (give details)</th>
                    <th>International/National</th>
                    <th>Page No. & ISBN No.</th>
                </tr>
                {
                    fcp ? fcp.map((r,i)=>{
                        const {con,publication,level,isbn_no,name} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{con ? con : '-'}</td>
                                <td>{publication ? publication : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{isbn_no ? isbn_no : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.6 Paper Presentation</h4>
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
                </tr>
                {
                   fpp ?fpp.map((r,i)=>{
                        const {con,title,financial_support,venue,level,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{con ? con : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                                <td>{level ? level : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.7 Journal Publications</h4>
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
                </tr>
                {
                    fjp ? fjp.map((r,i)=>{
                        const {title,jou,issn_no,volume,sci,impact,level,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{jou ? jou : '-'}</td>
                                <td>{issn_no ? issn_no : '-'}</td>
                                <td>{volume ? volume : '-'}</td>
                                <td>{sci ? sci : '-'}</td>
                                <td>{impact ? impact : '-'}</td>
                                <td>{level ? level : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.8 Conference / Seminar / Symposium / Workshop Attended</h4>
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
                </tr>
                {
                    fcon ? fcon.map((r,i)=>{
                        const {con,title,venue,level,financial_support,programme_outcome,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{con ? con : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{programme_outcome ? programme_outcome : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.9 Resource Person</h4>
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
                </tr>
                {
                    frp ? frp.map((r,i)=>{
                        const {sem,topic,event,venue,level,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{sem ? sem : '-'}</td>
                                <td>{topic ? topic : '-'}</td>
                                <td>{event ? event : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.10 Financial support</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Name of the professional body for which membership fee is provided</th>
                    <th>Amount of support (Rs.)</th>
                </tr>
                {
                    ffs ? ffs.map((r,i)=>{
                        const {f,amount_support,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{f ? f : '-'}</td>
                                <td>{amount_support ? amount_support : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.11 Professional development programmes</h4>
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
                </tr>
                {
                    fdp ? fdp.map((r,i)=>{
                        const {training,title,venue,financial_support,level,name,date} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{training ? training : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{level ? level : '-'}</td>
                                <td>{date ? date : '-'}</td>
                                <td>{venue ? venue : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.12 Undergone Online-Courses</h4>
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
                </tr>
                {
                    foc ? foc.map((r,i)=>{
                        const {training,title,date,financial_support,level,name,duration} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{training ? training : '-'}</td>
                                <td>{title ? title : '-'}</td>
                                <td>{duration ? duration : '-'}</td>
                                <td>{financial_support ? financial_support : '-'}</td>
                                <td>{level ? level : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>

                <h4>5.13 E-content developed</h4>
                <table>
                <tbody>
                <tr>
                    <th>S.No</th>
                    <th>Name of the faculty</th>
                    <th>Name of the module</th>
                    <th>Platform on which module is developed</th>
                    <th>Date of launching e – content</th>
                </tr>
                {
                    fe ? fe.map((r,i)=>{
                        const {module,platform,date,name} = r
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{name ? name : '-'}</td>
                                <td>{module ? module : '-'}</td>
                                <td>{platform ? platform : '-'}</td>
                                <td>{date ? date : '-'}</td>
                            </tr>
                        )
                    }): null
                }
                </tbody>
                </table>
            </div>
            </div>
            {/* Quaterly */}

            <Formik
                initialValues = {{
                    from: '',
                }}

                enableReinitialize       

                validationSchema = {
                    Yup.object({                                     
                        from:Yup.string().required('Required')
                    })
                }

                onSubmit={(values, { setSubmitting,resetForm }) => {
                    setTimeout(async () => {
                        if(values.from == 'July-Sep(2021)'){
                            qur('2021','07','08','09')
                        }

                        if(values.from == 'Oct-Dec(2021)'){
                            qur('2021','10','11','12')
                        }

                        }, 400);
                    }}
                >
                <Form method="POST" className="form">
                    <MySelect name="from">
                        <option value="">---Filter by Quaterly---</option>
                        <option value="July-Sep(2021)">July-Sep(2021)</option>
                        <option value="Oct-Dec(2021)">Oct-Dec(2021)</option>
                    </MySelect>

                    <div className="btn">
                        <button type="submit">Filter</button>
                    </div>
                </Form>
            </Formik>

            {/* Periodic */}
            <Formik
                initialValues = {{
                    year: '',
                    from: '',
                    to: ''
                }}

                enableReinitialize       

                validationSchema = {
                    Yup.object({       
                        year:Yup.string().required('Required'),
                        from:Yup.string().required('Required'),
                        to:Yup.string().required('Required')
                    })
                }

                onSubmit={(values, { setSubmitting,resetForm }) => {
                    setTimeout(async () => {
                        if(values.year == '2021'){
                            prd('2021',`${values.from}`,`${values.to}`)
                        }
                    }, 400);
                    }}
                >
                <Form method="POST" className="form">
                    <MySelect name="year">
                        <option value="">--Year--</option>
                        <option value="2021">2021</option>
                    </MySelect>

                    <MySelect name="from">
                        <option value="">--Start Month--</option>
                        <option value="01">January</option>
                        <option value="02">Febuary</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </MySelect>

                    <MySelect name="to">
                        <option value="">--End Month--</option>
                        <option value="01">January</option>
                        <option value="02">Febuary</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </MySelect>

                    <div className="btn">
                        <button type="submit">Filter</button>
                    </div>
                </Form>
            </Formik>

            <div className="tables">
                <p className="expall" onClick={e=>export_all()}><FaFileWord />Export All</p>

                <h3>Research</h3>
                
                {/* Research Projects */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'no',title:'N/O',filterPlaceholder:'Filter by N/O'},
                            {field:'date_sanctioned',title:'Date Sanctioned',filterPlaceholder:'Filter by Date Sanctioned'},
                            {field:'amount_sanctioned',title:'Amount Sanctioned',filterPlaceholder:'Filter by Amount Sanctioned'},
                            {field:'amount_received',title:'Amount Received',filterPlaceholder:'Filter by Amount Received'},
                            {field:'funding_agency',title:'Funding Agency',filterPlaceholder:'Filter by Funding Agency'},
                            {field:'fileno',title:'Fileno',filterPlaceholder:'Filter by File No'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={rps} title="Research Projects" />
                        
                    }    
                </div>

                {/* Patents */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},exportFileName:'Ct',rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'field',title:'Field',filterPlaceholder:'Filter by Field'},
                            {field:'fileno',title:'File No',filterPlaceholder:'Filter by FileNo Sanctioned'},
                            {field:'date_awarded_patent',title:'Date of patent awarded',filterPlaceholder:'Filter by Date of patent awarded'},
                            {field:'providing_agency',title:'Providing Agency',filterPlaceholder:'Filter by Providing Agency'},
                            {field:'royalty_received',title:'Royalty Received',filterPlaceholder:'Filter by Royalty Received'},
                            {field:'country',title:'Country',filterPlaceholder:'Filter by Country'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={rpat} title="Patents"  />
                        
                    }    
                </div>

                {/* Awards for Innovation */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},exportFileName:'Ct',rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'award_category',title:'Award Category',filterPlaceholder:'Filter by Award Category'},
                            {field:'awardee_name',title:'Awardee Name',filterPlaceholder:'Filter by Awardee Name'},
                            {field:'designation',title:'Designation',filterPlaceholder:'Filter by Designation'},
                            {field:'awarding_agency',title:'Awarding Agency',filterPlaceholder:'Filter by Awarding Agency'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={rawd} title="Awards for Innovation"  />
                        
                    }    
                </div>

                {/* M.Phil/P.hd */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},exportFileName:'Ct',rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'deg',title:'Degree',filterPlaceholder:'Filter by Degree'},
                            {field:'title',title:'Title of Thesis',filterPlaceholder:'Filter by Title of thesis'},
                            {field:'external',title:'External',filterPlaceholder:'Filter by External'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={rdeg} title="Ph.D/M.Phil"  />
                        
                    }    
                </div>

                {/* Fellowship */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'fellowship',title:'Fellowship',filterPlaceholder:'Filter by Fellowship'},
                            {field:'date_sanctioned',title:'Date Sanctioned',filterPlaceholder:'Filter by Date Sanctioned'},
                            {field:'funding_agency',title:'Funding Agency',filterPlaceholder:'Filter by Funding Agency'},
                            {field:'sanctioned_amount',title:'Amount Sanctioned',filterPlaceholder:'Filter by Amount Sanctioned'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={rfel} title="Fellowship"  />
                        
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
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'activity',title:'Activity',filterPlaceholder:'Filter by Activity'},
                            {field:'participant',title:'Participant',filterPlaceholder:'Filter by Participant'},
                            {field:'financial_support',title:'Financial support',filterPlaceholder:'Filter by Financial support'},
                            {field:'period',title:'Period',filterPlaceholder:'Filter by Period'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={ca} title="Collaborative Activities"  />
                        
                    }    
                </div>

                {/* Linkages */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'partnering_agency',title:'Partnering Agency',filterPlaceholder:'Filter by Partnering Agency'},
                            {field:'period',title:'Period',filterPlaceholder:'Filter by Period'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={clink} title="Linkages"  />
                        
                    }    
                </div>

                {/* Mou */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'organization',title:'Organization',filterPlaceholder:'Filter by Organization'},
                            {field:'date_signed',title:'Date signed',filterPlaceholder:'Filter by Date signed'},
                            {field:'period',title:'Period',filterPlaceholder:'Filter by Period'},
                            {field:'participants',title:'Participants',filterPlaceholder:'Filter by Participants'},
                            {field:'purpose',title:'Purpose',filterPlaceholder:'Filter by Purpose'},
                            {field:'total',title:'Total no. of beneficiaries',filterPlaceholder:'Filter by total'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={cmou} title="Mou's Signed"  />
                        
                    }    
                </div>

                {/* Conference / Seminar / Symposium / Workshop organized */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'con_sem',title:'Type',filterPlaceholder:'Filter by Type'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'sponsoring_agency',title:'Sponsoring Agency',filterPlaceholder:'Filter by Sponsoring Agency'},
                            {field:'resource_person',title:'Resource Person',filterPlaceholder:'Filter by Resource Person'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'objective',title:'Objective',filterPlaceholder:'Filter by Objective'},
                            {field:'outcome',title:'Outcome',filterPlaceholder:'Filter by Outcome'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'total',title:'Total',filterPlaceholder:'Filter by Total'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={econ} title="Conference / Seminar / Symposium / Workshop organized"  />
                        
                    }    
                </div>

                {/* Guest Lectures */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'resource_person',title:'Resource Person',filterPlaceholder:'Filter by Resource Person'},
                            {field:'designation',title:'Designation',filterPlaceholder:'Filter by Designation'},
                            {field:'topic',title:'Topic',filterPlaceholder:'Filter by Topic'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'objective',title:'Objective',filterPlaceholder:'Filter by Objective'},
                            {field:'outcome',title:'Outcome',filterPlaceholder:'Filter by Outcome'},
                            {field:'total',title:'Total',filterPlaceholder:'Filter by Total'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={egl} title="Guest Lectures"  />
                        
                    }    
                </div>

                {/* Extension Activities */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'activities',title:'Activities Performed',filterPlaceholder:'Filter by Activities Performed'},
                            {field:'collaborations',title:'Collaborating Agency',filterPlaceholder:'Filter by Collaborating Agency'},
                            {field:'total',title:'Total',filterPlaceholder:'Filter by Total'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={eea} title="Extension Activities"  />
                        
                    }    
                </div>

                {/* Industrial Visits */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'classes',title:'Class',filterPlaceholder:'Filter by Class'},
                            {field:'total',title:'Total',filterPlaceholder:'Filter by Total'},
                            {field:'outcome',title:'Outcome',filterPlaceholder:'Filter by Outcome'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={eev} title="Industrial Visits"  />
                        
                    }    
                </div>

                {/* Evs Visits */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'place',title:'Place of visit',filterPlaceholder:'Filter by place'},
                            {field:'total',title:'Total no. Students',filterPlaceholder:'Filter by Total'},
                            {field:'activity',title:'Nature of activity',filterPlaceholder:'Filter by activity'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={eevs} title="Evs Visits"  />
                        
                    }    
                </div>

                {/* Departmental Activities */}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'activity',title:'Activity',filterPlaceholder:'Filter by Activity'},
                            {field:'guest',title:'Guest',filterPlaceholder:'Filter by Guest'},
                            {field:'topic',title:'Topic',filterPlaceholder:'Filter by Topic'},
                            {field:'total',title:'Total no. Students',filterPlaceholder:'Filter by Total'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by venue'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={eda} title="Departmental Activities"  />
                        
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
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'title',title:'Project Title',filterPlaceholder:'Filter by Project Title'},
                            {field:'no',title:'New/Ongoing',filterPlaceholder:'Filter by New/Ongoing'},
                            {field:'revenue_generated',title:'Revenue Generated',filterPlaceholder:'Filter by Revenue Generated'},
                            {field:'date_sanction',title:'Date sanction',filterPlaceholder:'Filter by Date sanction'},
                            {field:'sponsor',title:'Sponsors',filterPlaceholder:'Filter by Sponsors'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={cps} title="Projects Services"  />
                        
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
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'award_honour',title:'Award Honour ',filterPlaceholder:'Filter by Award Honour'},
                            {field:'details',title:'Details',filterPlaceholder:'Filter by Details'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fhnr} title="Honours and Recognitions"  />
                        
                    }    
                </div>

                {/* Qualifying in state/ national/ international level examinations*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'exam',title:'Exam ',filterPlaceholder:'Filter by Exam'},
                            {field:'exam_rollno',title:'Exam Rollno',filterPlaceholder:'Filter by Exam Rollno'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fexm} title="Qualifying in state/ national/ international level examinations"  />
                        
                    }    
                </div>

                {/*Books Published*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'book',title:'Book ',filterPlaceholder:'Filter by Book'},
                            {field:'publisher',title:'Publisher',filterPlaceholder:'Filter by Publisher'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'isbn_no',title:'ISBN No',filterPlaceholder:'Filter by ISBN No'},  
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fbp} title="Books Published"  />
                        
                    }    
                </div>

                {/*Chapters Contributed*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'title',title:'Title ',filterPlaceholder:'Filter by Title'},
                            {field:'chapter',title:'Chapter',filterPlaceholder:'Filter by Chapter'},
                            {field:'editor',title:'Editor',filterPlaceholder:'Filter by Editor'},
                            {field:'publisher',title:'Publisher',filterPlaceholder:'Filter by Publisher'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'isbn_no',title:'ISBN No',filterPlaceholder:'Filter by ISBN No'},  
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fcc} title="Chapters Contributed"  />
                        
                    }    
                </div>

                {/*Conferece Proceeding*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'con',title:'Type ',filterPlaceholder:'Filter by Type'},
                            {field:'publication',title:'Publication',filterPlaceholder:'Filter by Publication'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'isbn_no',title:'ISBN No',filterPlaceholder:'Filter by ISBN No'},  
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fcp} title="Conferece Proceeding"  />
                        
                    }    
                </div>   

                {/*Paper Presentation*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'con',title:'Type ',filterPlaceholder:'Filter by Type'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'financial_support',title:'Financial Support',filterPlaceholder:'Filter by Financial Support'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},  
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fpp} title="Paper Presentation"  />
                        
                    }    
                </div>  

                {/*journal_publications*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'jou',title:'Journal',filterPlaceholder:'Filter by Journal'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'issn_no',title:'Issn No',filterPlaceholder:'Filter by Issn No'},
                            {field:'impact',title:'Impact',filterPlaceholder:'Filter by Impact'},
                            {field:'level',title:'level',filterPlaceholder:'Filter by level'},
                            {field:'sci',title:'Sci',filterPlaceholder:'Filter by Sci'},
                            {field:'volume',title:'Volume',filterPlaceholder:'Filter by Volume'},  
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fjp} title="Journal Publications"  />
                        
                    }    
                </div>

                {/*conference*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'con',title:'Type',filterPlaceholder:'Filter by Type'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'financial_support',title:'Financial Support',filterPlaceholder:'Filter by Financial Support'},
                            {field:'programme_outcome',title:'Programme Outcome',filterPlaceholder:'Filter by Programme Outcome'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fcon} title="Conference"  />
                        
                    }    
                </div>

                {/*resource person*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'sem',title:'Type',filterPlaceholder:'Filter by Type'},
                            {field:'topic',title:'Topic',filterPlaceholder:'Filter by Topic'},
                            {field:'event',title:'Event',filterPlaceholder:'Filter by Event'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={frp} title="Resource Person" />
                        
                    }    
                </div>

                {/*Financial Support*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'f',title:'C',filterPlaceholder:'Filter by C'},
                            {field:'amount_support',title:'Amount Support',filterPlaceholder:'Filter by Amount Support'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={ffs} title="Financial Support" />
                        
                    }    
                </div>

                {/*Development Programmes*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'training',title:'Training',filterPlaceholder:'Filter by Training'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'venue',title:'Venue',filterPlaceholder:'Filter by Venue'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'financial_support',title:'Financial Support',filterPlaceholder:'Filter by Financial Support'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fdp} title="Development Programmes" />
                        
                    }    
                </div>

                {/*Online Courses*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'training',title:'Type',filterPlaceholder:'Filter by Type'},
                            {field:'title',title:'Title',filterPlaceholder:'Filter by Title'},
                            {field:'duration',title:'Duration',filterPlaceholder:'Filter by Duration'},
                            {field:'level',title:'Level',filterPlaceholder:'Filter by Level'},
                            {field:'financial_support',title:'Financial Support',filterPlaceholder:'Filter by Financial Support'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={foc} title="Online Courses" />
                        
                    }    
                </div>

                {/*E content*/}
                <div className="table">
                    {
                        <MaterialTable options={{filtering:true,paging:true,pageSize:3,pageSizeOptions:[2,3,5,10,15,20,25],paginationType:'stepped',showFirstLastPageButtons:false,exportButton:{csv:true,pdf:true,excel:true},rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#fff'
                        }}} columns={[
                            {field:'name',title:'Name',filterPlaceholder:'Filter by Name'},
                            {field:'platform',title:'Platform',filterPlaceholder:'Filter by Platform'},
                            {field:'module',title:'Module',filterPlaceholder:'Filter by Module'},
                            {field:'date',title:'Date',filterPlaceholder:'Filter by Date'}
                        ]} data={fe} title="E content" />
                        
                    }    
                </div>                    
            </div>    
        </div>
    )
}

export default Adminlogin