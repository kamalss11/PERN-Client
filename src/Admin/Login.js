import React,{useEffect, useState} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory } from 'react-router-dom'
import '../CSS/LS.css'
import MaterialTable from 'material-table'
import { RiAdminFill } from 'react-icons/ri'

function Adminlogin(){
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
            datas.books_published.map((e)=>{
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
            admin.paper_presenntation.map((e)=>{
                pp.push(e)
            })
            setFpp(pp)

            // //journal publication
            let jp = []
            datas.journal_publications.map((e)=>{
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