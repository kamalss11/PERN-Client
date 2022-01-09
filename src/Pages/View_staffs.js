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


function Viewstaffs(){
    const [exp,setExp] = useState('exp')
    const [uData,setUdata] = useState()
    const [research_projects,Setresearch_projects] = useState()    
    const [patents,Setpatents] = useState()  
    const [awards_for_innovation,Setawards_for_innovation] = useState()  
    const [degree,Setdegree] = useState()    
    const [fellowship,Setfellowship] = useState()    
    const [collab_activ,Setcollab_activ] = useState()    
    const [linkages,Setlinkages] = useState()    
    const [mou,Setmou] = useState()    
    const [conference,Setconference] = useState()    
    const [guest_lectures,Setguest_lectures] = useState()    
    const [extension_activities,Setextension_activities] = useState()    
    const [industrial_visits,Setindustrial_visits] = useState()    
    const [evs,Setevs] = useState()    
    const [departmental_activities,Setdepartmental_activities] = useState()     
    const [projects_services,Setprojects_services] = useState()       
    const [honours,Sethonours] = useState()       
    const [exams,Setexams] = useState()       
    const [books_published,Setbooks_published] = useState()       
    const [chapters_contributed,Setchapters_contributed] = useState()   
    const [conference_proceeding,Setconference_proceeding] = useState()      
    const [paper_presentation,Setpaper_presentation] = useState()       
    const [journal_publications,Setjournal_publications] = useState()       
    const [fconference,Setfconference] = useState()       
    const [resource_person,Setresource_person] = useState()       
    const [financial_support,Setfinancial_support] = useState()       
    const [development_programmes,Setdevelopment_programmes] = useState()       
    const [online_courses,Setonline_courses] = useState()       
    const [e_content,Sete_content] = useState()    
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

                Setresearch_projects(s_admin.research_projects)
                Setpatents(s_admin.patents)
                Setawards_for_innovation(s_admin.awards_for_innovation)            
                Setdegree(s_admin.degree)
                Setfellowship(s_admin.fellowship)
                Setcollab_activ(s_admin.collab_activ)
                Setlinkages(s_admin.linkages)
                Setmou(s_admin.mou)
                Setconference(s_admin.conference)
                Setguest_lectures(s_admin.guest_lectures)
                Setextension_activities(s_admin.extension_activities)
                Setindustrial_visits(s_admin.industrial_visits)
                Setevs(s_admin.evs)
                Setdepartmental_activities(s_admin.departmental_activities)
                Setprojects_services(s_admin.projects_services)
                Sethonours(s_admin.honours)
                Setexams(s_admin.exams)
                Setbooks_published(s_admin.books_published)
                Setchapters_contributed(s_admin.chapters_contributed)
                Setconference_proceeding(s_admin.conference_proceeding)
                Setpaper_presentation(s_admin.paper_presentation)
                Setjournal_publications(s_admin.journal_publications)
                Setfconference(s_admin.fconference)
                Setresource_person(s_admin.resource_person)
                Setfinancial_support(s_admin.financial_support)
                Setdevelopment_programmes(s_admin.development_programmes)
                Setonline_courses(s_admin.online_courses)
                Sete_content(s_admin.e_content)
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
            const res = await fetch(`/period/${prd}/${uData[0].department}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const datas = await res.json()
            console.log(datas)

            Setresearch_projects(datas.research_projects)
            Setpatents(datas.patents)
            Setawards_for_innovation(datas.awards_for_innovation)            
            Setdegree(datas.degree)
            Setfellowship(datas.fellowship)
            Setcollab_activ(datas.collab_activ)
            Setlinkages(datas.linkages)
            Setmou(datas.mou)
            Setconference(datas.conference)
            Setguest_lectures(datas.guest_lectures)
            Setextension_activities(datas.extension_activities)
            Setindustrial_visits(datas.industrial_visits)
            Setevs(datas.evs)
            Setdepartmental_activities(datas.departmental_activities)
            Setprojects_services(datas.projects_services)
            Sethonours(datas.honours)
            Setexams(datas.exams)
            Setbooks_published(datas.books_published)
            Setchapters_contributed(datas.chapters_contributed)
            Setconference_proceeding(datas.conference_proceeding)
            Setpaper_presentation(datas.paper_presentation)
            Setjournal_publications(datas.journal_publications)
            Setfconference(datas.fconference)
            Setresource_person(datas.resource_person)
            Setfinancial_support(datas.financial_support)
            Setdevelopment_programmes(datas.development_programmes)
            Setonline_courses(datas.online_courses)
            Sete_content(datas.e_content)

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }catch(err){
            console.log(err)
            history.push('/signin')
        }
    }
    // Delete Research Projects
    const Rrp = async(id)=>{
        console.log(id)
        try{
            const res = await fetch(`/forms/research/research_projects/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Delete Patents
    const Rp = async(id)=>{
        try{
            const res = await fetch(`/forms/research/patents/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Awards for innovation
    const Rafi = async(id)=>{
        try{
            const res = await fetch(`/forms/research/awards_for_innovation/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // M.Phil /Ph.D
    const Rdeg = async(id)=>{
        try{
            const res = await fetch(`/forms/research/deg/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Fellowship
    const Rf = async(id)=>{
        try{
            const res = await fetch(`/forms/research/fellowship/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Collaborative Activities
    const Cca = async(id)=>{
        try{
            const res = await fetch(`/forms/collaborations/collab_activ/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Linkages
    const Cl = async(id)=>{
        try{
            const res = await fetch(`/forms/collaborations/linkages/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Mou
    const Cm = async(id)=>{
        try{
            const res = await fetch(`/forms/collaborations/mou/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Conference
    const Ec = async(id)=>{
        try{
            const res = await fetch(`/forms/events/conference/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Guest Lectures
    const Egl = async(id)=>{
        try{
            const res = await fetch(`/forms/events/guest_lectures/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Extension Activities
    const Eea = async(id)=>{
        try{
            const res = await fetch(`/forms/events/extension_activities/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Industrial Visits
    const Eiv = async(id)=>{
        try{
            const res = await fetch(`/forms/events/industrial_visits/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Evs
    const Eevs = async(id)=>{
        try{
            const res = await fetch(`/forms/events/evs/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Departmental Activities
    const Eda = async(id)=>{
        try{
            const res = await fetch(`/forms/events/departmental_activities/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Proejcts Services
    const Cps = async(id)=>{
        try{
            const res = await fetch(`/forms/consultancy/projects_services/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Honours
    const Fh = async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/honours/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Exams
    const Fe = async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/exams/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Books Published
    const Fbp = async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/books_published/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Chapters contributed
    const Fcc = async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/chapters_contributed/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Conference Proceeding
    const Fcp = async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/conference_proceeding/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Paper Presentation
    const Fpp = async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/paper_presentation/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Journal Publications
    const Fjp = async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/journal_publications/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Conference
    const Fcon= async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/conference/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Resource Person
    const Frp= async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/resource_person/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Financial Support
    const Ffs= async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/financial_support/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    // Development Programmes
    const Fdp= async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/development_programmes/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    const Foc= async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/online_courses/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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

    const Fec= async(id)=>{
        try{
            const res = await fetch(`/forms/faculty/e_content/delete/${id}`,{
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email : `${uData.email}`
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
            <Sidebar exp={exp} />

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
                                            <h3>Department : {uData ? uData[0].department : null} - Staffs</h3>
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
                                        <h3>Research</h3>
    
                                        <h4>1.1 Research Projects</h4>  
                                        {research_projects ? research_projects.map((r,i)=>
                                        { const {title,no,file,amount_sanctioned,fileno,amount_received,date_sanctioned,funding_agency,id,date} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Title of the project :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Newly Sanctioned / Ongoing :</b> {no ? no : 'NIL'}</p>
                                                    <p><b>Sanctioned Amount :</b> {amount_sanctioned ? amount_sanctioned : 'NIL'}</p>
                                                    <p><b>File No./Grant No. :</b> {fileno ? fileno : 'NIL'}</p>
                                                    <p><b>Amount Received :</b> {amount_received ? amount_received : 'NIL'}</p>
                                                    <p><b>Date of Sanction :</b> {date_sanctioned ? date_sanctioned : 'NIL'}</p>
                                                    <p><b>Funding Agency :</b> {funding_agency ? funding_agency : 'NIL'}</p>
                                                    <p><b>Date of Happened :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/research/research_projects/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button onClick={e=>Rrp(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Patents */}
    
                                        <h4>1.2 Patents</h4>  
                                        {patents ? patents.map((r,i)=>{
                                        const {title,field,fileno,date_awarded_patent,royalty_received,providing_agency,country,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Title of the Patent :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Patent Field :</b> {field ? field : 'NIL'}</p>
                                                    <p><b>Patent No. / File No. :</b> {fileno ? fileno : 'NIL'}</p>
                                                    <p><b>Date of awarded of patent :</b> {date_awarded_patent ? date_awarded_patent : 'NIL'}</p>
                                                    <p><b>Royalty Received :</b> {royalty_received ? royalty_received : 'NIL'}</p>
                                                    <p><b>Providing Agency :</b> {providing_agency ? providing_agency : 'NIL'}</p>
                                                    <p><b>India / Abroad :</b> {country ? country : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/research/patents/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button onClick={e=>Rp(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Awards for Innovation */}
    
                                        <h4>1.3 Awards for Innovation</h4>  
                                        {awards_for_innovation ? awards_for_innovation.map((r,i)=>{
                                        const {awardee_name,designation,award_category,title,awarding_agency,venue,level,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Title of the innovation :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Award Category :</b> {award_category ? award_category : 'NIL'}</p>
                                                    <p><b>Name of the awardee :</b> {awardee_name ? awardee_name : 'NIL'}</p>
                                                    <p><b>Designation :</b> {designation ? designation : 'NIL'}</p>
                                                    <p><b>Awarding Agency :</b> {awarding_agency ? awarding_agency : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/research/awards_for_innovation/edit`} onClick={e=>window.localStorage.setItem("edit",id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button onClick={e=>Rafi(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Ph.D / M.Phil */}
    
                                        <h4>1.4 Ph.D / M.Phil</h4>  
                                        {degree ? degree.map((r,i)=>{
                                        const {deg,guide_name,title,external,venue,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Degree :</b> {deg ? deg : 'NIL'}</p>
                                                    <p><b>Guide's Name :</b> {guide_name ? guide_name : 'NIL'}</p>
                                                    <p><b>Title of the thesis :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>External's Name,Designation and Address :</b> {external ? external : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/research/deg/edit`} onClick={e=>window.localStorage.setItem("edit",id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button onClick={e=>Rdeg(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Fellowships */}
    
                                        <h4>1.5 Fellowship</h4>  
                                        {fellowship ? fellowship.map((r,i)=>{
                                        const {fellowship,date_sanctioned,funding_agency,sanctioned_amount,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Fellowship :</b> {fellowship ? fellowship : 'NIL'}</p>
                                                    <p><b>Date of Sanction :</b> {date_sanctioned ? date_sanctioned : 'NIL'}</p>
                                                    <p><b>Funding Agency :</b> {funding_agency ? funding_agency : 'NIL'}</p>
                                                    <p><b>Sanctioned Amount :</b> {sanctioned_amount ? sanctioned_amount : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p>
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/research/fellowship/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>Rf(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
                                    </div>
    
                                    <div className="research">
                                        <h3>Collaborations</h3>
    
                                        {/* Collaborative Activities */}
    
                                        <h4>2.1 Collaborative Activities</h4>  
                                        {collab_activ ? collab_activ.map((r,i)=>{
                                        const {activity,participant,financial_support,period,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the activity :</b> {activity ? activity : 'NIL'}</p>
                                                    <p><b>Participant :</b> {participant ? participant : 'NIL'}</p>
                                                    <p><b>Financial Support :</b> {financial_support ? financial_support : 'NIL'}</p>
                                                    <p><b>Period :</b> {period ? period : 'NIL'}</p>
                                                    <p><b>Date :</b> {date ? date : 'NIL'}</p> 
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/collaborations/collaborative_activities/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
    
                                                        <button id={id} onClick={e=>Cca(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Linkages */}
    
                                        <h4>2.2 Linkages </h4>  
                                        {linkages ? linkages.map((r,i)=>{
                                        const {title,partnering_agency,period,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Nature and title of the Linkage :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Partnering Agency :</b> {partnering_agency ? partnering_agency : 'NIL'}</p>
                                                    <p><b>Period :</b> {period ? period : 'NIL'}</p>
                                                    <p><b>Date :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/collaborations/linkages/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>Cl(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* MoU(s) Signed */}
    
                                        <h4>2.3 MoU(s) Signed </h4>  
                                        {mou ? mou.map((r,i)=>{
                                        const {organization,date_signed,period,participants,purpose,total,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Organization :</b> {organization ? organization : 'NIL'}</p>
                                                    <p><b>Date Signed :</b> {date_signed ? date_signed : 'NIL'}</p>
                                                    <p><b>Period :</b> {period ? period : 'NIL'}</p>
                                                    <p><b>Participants (Students and Faculty) :</b> {participants ? participants : 'NIL'}</p>
                                                    <p><b>Purpose :</b> {purpose ? purpose : 'NIL'}</p>
                                                    <p><b>Total No. of Beneficiaries :</b> {total ? total : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/collaborations/mou/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>Cm(id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )
                                        }): <p className="no">No datas</p>}
                                    </div>
    
                                    <div className="research">
                                        <h3>Events/Programmes/Visits Organized</h3>
    
                                        {/* Conference */}
    
                                        <h4>3.1 Conference / Seminar / Symposium / Workshop organized</h4> 
                                        {conference ? conference.map((r,i)=>{
                                        const {con_sem,title,sponsoring_agency,resource_person,venue,objective,outcome,level,total,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Type :</b> {con_sem ? con_sem : 'NIL'}</p>
                                                    <p><b>Title :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Sponsoring Agency :</b> {sponsoring_agency ? sponsoring_agency : 'NIL'}</p>
                                                    <p><b>Resource Person designation/address  :</b> {resource_person ? resource_person : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Objective of the Event :</b> {objective ? objective : 'NIL'}</p>
                                                    <p><b>Outcome of the Event :</b> {outcome ? outcome : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Total no. of Participants :</b> {total ? total : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/events/conference/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>Ec(id)}>Delete</button>
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Guest Lectures */}
    
                                        <h4>3.2 Guest Lectures</h4> 
                                        {guest_lectures ? guest_lectures.map((r,i)=>{
                                        const {resource_person,designation,topic,venue,objective,outcome,total,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the Resource Person :</b> {resource_person ? resource_person : 'NIL'}</p>
                                                    <p><b>Designation / Address :</b> {designation ? designation : 'NIL'}</p>
                                                    <p><b>Topic :</b> {topic ? topic : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Objective of the Event :</b> {objective ? objective : 'NIL'}</p>
                                                    <p><b>Outcome of the Event :</b> {outcome ? outcome : 'NIL'}</p>
                                                    <p><b>Total no. of Participants :</b> {total ? total : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/events/guest_lectures/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>Egl(id)}>Delete</button>
                                                    </div>
                                                </div>
    
                                                
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Extension Activities */}
    
                                        <h4>3.3 Extension Activities</h4> 
                                        {extension_activities ? extension_activities.map((r,i)=>{
                                        const {activities,collaborations,venue,total,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Activities Performed :</b> {activities ? activities : 'NIL'}</p>
                                                    <p><b>Collaborating agency :</b> {collaborations ? collaborations : 'NIL'}</p>
                                                    <p><b>Total no. of Students :</b> {total ? total : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/events/extension_activities/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Eea(id)}}>Delete</button>
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}                                    
    
                                        {/* Industrial Visits */}
    
                                        <h4>3.4 Industrial Visits</h4> 
                                        {industrial_visits ? industrial_visits.map((r,i)=>{
                                        const {classes,date,address,total,outcome,id,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Class :</b> {classes ? classes : 'NIL'}</p>
                                                    <p><b>Industry visited with Address :</b> {address ? address : 'NIL'}</p>
                                                    <p><b>Total no. of Beneficiaries :</b> {total ? total : 'NIL'}</p>
                                                    <p><b>Programme Outcome :</b> {outcome ? outcome : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/events/industrial_visits/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>Eiv(id)}>Delete</button>
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Environmental Science (EVS) Visit */}
    
                                        <h4>3.5 Environmental Science (EVS) Visit</h4> 
                                        {evs ? evs.map((r,i)=>{
                                        const {date,place,total,activity,id,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Place of Visit with Address :</b> {place ? place : 'NIL'}</p>
                                                    <p><b>Total no. of Students :</b> {total ? total : 'NIL'}</p>
                                                    <p><b>Nature of Activity :</b> {activity ? activity : 'NIL'}</p>
                                                    <p><b>Date of happen :</b> {date ? date: 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/events/evs/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Eevs(id)}}>Delete</button>
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Other Departmental Activities */}
    
                                        <h4>3.6 Other Departmental Activities</h4> 
                                        {departmental_activities ? departmental_activities.map((r,i)=>{
                                        const {activity,guest,topic,total,venue,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the Activity :</b> {activity ? activity : 'NIL'}</p>
                                                    <p><b>Guest with Designation/Address :</b> {guest ? guest : 'NIL'}</p>
                                                    <p><b>Topic :</b> {topic ? topic : 'NIL'}</p>
                                                    <p><b>No. of Participants :</b> {total ? total : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/events/departmental_activities/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Eda(id)}}>Delete</button>
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}
                                    </div>
    
                                    <div className="research">
                                        <h3>Consultancy Projects/Services</h3>
    
                                        {/* Projects Services */}
    
                                        <h4>4.1 Projects Services</h4> 
                                        {projects_services ? projects_services.map((r,i)=>{
                                        const {title,no,revenue_generated,date_sanction,sponsor,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Project Title :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>New/Ongoing :</b> {no ? no : 'NIL'}</p>
                                                    <p><b>Revenue Generated :</b> {revenue_generated ? revenue_generated : 'NIL'}</p>
                                                    <p><b>Date of Sanction :</b> {date_sanction ? date_sanction : 'NIL'}</p>
                                                    <p><b>Sponsoring / Consultancy Agency :</b> {sponsor ? sponsor : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/consultancy/projects_services/edit`}onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Cps(id)}}>Delete</button>
                                                    </div>
                                                </div>
    
                                                
                                            )
                                        }): <p className="no">No datas</p>}
                                    </div>
    
                                    <div className="research">
                                        <h3>Faculty Details</h3>
    
                                        {/* Honours and Recognitions */}
    
                                        <h4>5.1 Honours and Recognitions</h4> 
                                        {honours ? honours.map((r,i)=>{
                                        const {award_honour,details,venue,level,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Award / Honour Received :</b> {award_honour ? award_honour : 'NIL'}</p>
                                                    <p><b>Details :</b> {details ? details : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/honours/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Fh(id)}}>Delete</button>
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Exams */}
    
                                        <h4>5.2 Qualifying in State/ National/ International level examinations</h4> 
                                        {exams ? exams.map((r,i)=>{
                                        const {exam,exam_rollno,date,id,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Examination Qualified :</b> {exam ? exam : 'NIL'}</p>
                                                    <p><b>Examination Rollno / Registration Number :</b> {exam_rollno ? exam_rollno : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/exams/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Fe(id)}}>Delete</button>
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Books Published */}
    
                                        <h4>5.3 Books Published</h4> 
                                        {books_published ? books_published.map((r,i)=>{
                                        const {name,publisher,level,isbn_no,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the Book :</b> {name ? name : 'NIL'}</p>
                                                    <p><b>Publisher :</b> {publisher ? publisher : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>ISBN No. :</b> {isbn_no ? isbn_no : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/books_published/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Fbp(id)}}>Delete</button>
                                                    </div>
                                                </div>
    
                                                
                                            )
                                        }): <p className="no">No datas</p>}
                                        
                                        {/* Chapters Contributed */}
    
                                        <h4>5.4 Chapters Contributed</h4> 
                                        {chapters_contributed ? chapters_contributed.map((r,i)=>{
                                        const {title,chapter,editor,publisher,level,isbn_no,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Title of the Book :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Title of the Chapter :</b> {chapter ? chapter : 'NIL'}</p>
                                                    <p><b>Editor :</b> {editor ? editor : 'NIL'}</p>
                                                    <p><b>Publisher :</b> {publisher ? publisher : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>ISBN No. :</b> {isbn_no ? isbn_no : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/chapters_contributed/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Fcc(id)}}>Delete</button>
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Conference Proceeding */}
    
                                        <h4>5.5 Conference Proceeding</h4> 
                                        {conference_proceeding ? conference_proceeding.map((r,i)=>{
                                        const {con,publication,level,isbn_no,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the Conference :</b> {con ? con : 'NIL'}</p>
                                                    <p><b>Publication in Conference :</b> {publication ? publication : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>ISBN No. :</b> {isbn_no ? isbn_no : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/conference_proceeding/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Fcp(id)}}>Delete</button>
                                                    </div>
                                                </div>
    
                                                
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Paper Presentation */}
    
                                        <h4>5.6 Paper Presentation</h4> 
                                        {paper_presentation ? paper_presentation.map((r,i)=>{
                                        const {con,title,financial_support,venue,level,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Type :</b> {con ? con : 'NIL'}</p>
                                                    <p><b>Title of the paper :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Financial Support from college :</b> {financial_support ? financial_support : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/paper_presentation/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Fpp(id)}}>Delete</button>
                                                    </div>
                                                </div>                                           
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Journal Publication */}
    
                                        <h4>5.7 Journal Publication</h4> 
                                        {journal_publications ? journal_publications.map((r,i)=>{
                                        const {title,jou,issn_no,volume,sci,impact,level,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Title of the paper :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Name of the Journal :</b> {jou ? jou : 'NIL'}</p>
                                                    <p><b>ISSN No. and Dol :</b> {issn_no ? issn_no : 'NIL'}</p>
                                                    <p><b>Volume No.,Issue,Page No. :</b> {volume ? volume : 'NIL'}</p>
                                                    <p><b>SCI/SCIE/Scopus Indexed/UGC Recognized :</b> {sci ? sci : 'NIL'}</p>
                                                    <p><b>Impact Factor. :</b> {impact ? impact : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/journal_publications/edit`}><button id={id} onClick={e=>window.localStorage.setItem('edit',id)}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Fjp(id)}}>Delete</button>
                                                    </div>
                                                </div>
    
                                                
                                            )
                                        }): <p className="no">No datas</p>}
                                        
                                        {/* Conference / Seminar / Symposium / Workshop Attended */}
    
                                        <h4>5.8 Conference / Seminar / Symposium / Workshop Attended</h4> 
                                        {fconference ? fconference.map((r,i)=>{
                                        const {con,title,venue,level,financial_support,programme_outcome,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Type :</b> {con ? con : 'NIL'}</p>
                                                    <p><b>Title of the paper :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Financial Support :</b> {financial_support ? financial_support : 'NIL'}</p>
                                                    <p><b>Programme Outcome :</b> {programme_outcome ? programme_outcome : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/conference/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Fcon(id)}}>Delete</button>
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* As a Resource Person */}
    
                                        <h4>5.9 As a Resource Person</h4> 
                                        {resource_person ? resource_person.map((r,i)=>{
                                        const {sem,topic,event,venue,level,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Type :</b> {sem ? sem : 'NIL'}</p>
                                                    <p><b>Topic Presented :</b> {topic ? topic : 'NIL'}</p>
                                                    <p><b>Name of the Event :</b> {event ? event : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/resource_person/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Frp(id)}}>Delete</button>
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Financial Support */}
    
                                        <h4>5.10 Financial Support</h4> 
                                        {financial_support ? financial_support.map((r,i)=>{
                                        const {f,amount_support,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Professional body for membership fee is provided :</b> {f ? f : 'NIL'}</p>
                                                    <p><b>Amount of support :</b> {amount_support ? amount_support : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/financial_support/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Ffs(id)}}>Delete</button>
                                                        
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Professional Development Programmes */}
    
                                        <h4>5.11 Professional Development Programmes</h4> 
                                        {development_programmes ? development_programmes.map((r,i)=>{
                                        const {training,title,venue,financial_support,level,id,date,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Type :</b> {training ? training : 'NIL'}</p>
                                                    <p><b>Title of the programme :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Venue :</b> {venue ? venue : 'NIL'}</p>
                                                    <p><b>Financial Support from College :</b> {financial_support ? financial_support : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/development_programmes/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Fdp(id)}}>Delete</button>
                                                    </div>
                                                </div>                                           
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* Online Courses */}
    
                                        <h4>5.12 Online Courses</h4> 
                                        {online_courses ? online_courses.map((r,i)=>{
                                        const {training,title,date,financial_support,level,id,duration,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Type :</b> {training ? training : 'NIL'}</p>
                                                    <p><b>Title of the programme :</b> {title ? title : 'NIL'}</p>
                                                    <p><b>Duration :</b> {duration ? duration : 'NIL'}</p>
                                                    <p><b>Financial Support from College :</b> {financial_support ? financial_support : 'NIL'}</p>
                                                    <p><b>Level :</b> {level ? level : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/online_courses/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Foc(id)}}>Delete</button>
                                                    </div>
                                                </div>                                            
                                            )
                                        }): <p className="no">No datas</p>}
    
                                        {/* E_Content */}
    
                                        <h4>5.13 E-Content</h4> 
                                        {e_content ? e_content.map((r,i)=>{
                                        const {module,platform,date,id,file} = r
                                            return(
                                                <div key={i} className="research_projects">
                                                    <p><b>Name of the module :</b> {module ? module : 'NIL'}</p>
                                                    <p><b>Platform on which module is developed :</b> {platform ? platform : 'NIL'}</p>
                                                    <p><b>Date of Happen :</b> {date ? date : 'NIL'}</p>
                                                    <p><b>File Uploaded :</b> { file ? <a href={`/Uploads/${file}`} target='_blank' type='application/pdf'>{file}</a> : 'NIL'}</p> 
                                                    <div className="btn">
                                                        <Link className="edit" to={`/forms/faculty/e_content/edit`} onClick={e=>window.localStorage.setItem('edit',id)}><button id={id}>Edit</button></Link>
                                                        
                                                        <button id={id} onClick={e=>{Fec(id)}}>Delete</button>
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

export default Viewstaffs