import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgMenuRight} from 'react-icons/cg'
import {FaUserCircle} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'
import Axios from 'axios'
import { useLocation } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
toast.configure()

function Edit_compet(){
    const location = useLocation()
    const [ppr,setPpr] = useState()
    const [uData,setUdata] = useState()
    const [men,setMen] = useState(false)
    const [img,setimg] = useState()
    const editprofile = `/dashboard/editprofile`
    console.log(uData)
    const [sb,setSb] = useState(false)
    const [up,Setup] = useState(false)
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
            setUdata(datas.user)

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }

            if(!location.state){
                history.push('/dashboard/view_staffs')
            }
            else{
                const rps = await fetch(`/forms/s_competition/edit/${location.state.id}`,{
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
    
                const r = await rps.json()
                console.log(r)
                setPpr(r)
            }
        }catch(err){
            console.log(err)
            history.push('/signin')
        }
    }

    useEffect(() => {
        callAboutPage()
    },[])

    const TextInput = ({ label,...props }) => {
        const [field,meta] = useField(props)
        return(
            <div className="fields">
                <label htmlFor={props.id || props.name}>{label}</label>
                <input {...field} {...props}></input>
                {
                    meta.touched && meta.error ?(
                        <p className="error">{meta.error}</p>
                    ):null
                }
            </div>
        )
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
    return(
        <>
        <Sidebar sb={sb} set={setSb} />
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

                    <div className='dprt'>
                        <h4>Internal Quality Assurance Cell (IQAC)</h4>
                        <h4>Department : {uData ? uData[0].department : null } - Students</h4>
                        <h4 className='h'>Students Details</h4>
                    </div>
                    
                    <div className="fo">
                    <Formik
                        initialValues = {{
                            roll_no: `${ppr ? ppr[0].roll_no : null}`,
                            n_event: `${ppr ? ppr[0].n_event : null}`,
                            n_con: `${ppr ? ppr[0].n_con : null}`,
                            date: `${ppr ? ppr[0].date : null}`,
                            n: `${ppr ? ppr[0].n : null}`,
                            award: `${ppr ? ppr[0].award : null}`,
                            sponsoring_agency: `${ppr ? ppr[0].sponsoring_agency : null}`,
                            financial_support: `${ppr ? ppr[0].financial_support : null}`,
                            venue: `${ppr ? ppr[0].venue : null}`,
                            level : `${ppr ? ppr[0].level : null}`,
                            image: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({
                                n: Yup.string()
                                        .required('Required'),
                                roll_no: Yup.string()
                                    .required('Required'),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {  
                                let dat = new FormData()
                                dat.append('image',img)
                                dat.append('id',ppr[0].id)
                                dat.append('n',values.n)
                                dat.append('roll_no',values.roll_no)
                                dat.append('n_event',values.n_event)
                                dat.append('n_con',values.n_con)
                                dat.append('sponsoring_agency',values.sponsoring_agency)
                                dat.append('award',values.award)
                                dat.append('date',values.date)
                                dat.append('venue',values.venue)
                                dat.append('level',values.level)

                                Axios.put('http://localhost:3000/forms/student/s_competition/edit',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    toast.success("Data Updated",{autoClose: 1000}),
                                    history.push("/dashboard/view_students"))
                                .catch(err => console.log(err))
                            },600)
                        }}
                    >
                        <Form method="PUT" encType='multipart/form-data' className="form">
                            <h3>Edit Participation in Competition/Others</h3>                            

                            <TextInput
                                id="n"
                                name="n"
                                type="text"
                                label="Name of the Student"
                            />
                            
                            <TextInput
                                id="roll_no"
                                name="roll_no"
                                type="text"
                                label="Roll Number"
                            />
    
                            <TextInput
                                id="n_event"
                                name="n_event"
                                type="text"
                                label="Name of the Event"
                            />
    
                            <TextInput
                                id="n_con"
                                name="n_con"
                                type="text"
                                label="Name of the Conference"
                            />
    
                            <TextInput
                                id="sponsoring_agency"
                                name="sponsoring_agency"
                                type="text"
                                label="Sponsoring Agency"
                            />
                            
                            <MySelect name="poster" label="Oral/Paper Presentation">
                                <option value="">--Oral/Paper Presentation--</option>
                                <option value="Oral">Oral</option>
                                <option value="Paper Presentation">Paper Presentation</option>
                            </MySelect>
    
                            <TextInput
                                id="awards"
                                name="awards"
                                type="text"
                                label="Awards/Medals/Price Received"
                            />

                            <MySelect name="level" label="International/National/State/Regional">
                                <option value="">--International/National/State/Regional--</option>
                                <option value="International">International</option>
                                <option value="National">National</option>
                                <option value="National">State</option>
                                <option value="National">Regional</option>
                            </MySelect>

                            <TextInput
                                id="venue"
                                name="venue"
                                type="text"
                                label="Venue"
                            />

                            <div className='fields'>
                                <label htmlFor='file'>Upload New File or it will replace with old file</label>

                                <input type="file" id='file' name='image' onChange={e=>setimg(e.target.files[0])}/>       
                            </div> 

                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                label="Date of Happen"
                            />                   

                            <div className="btn">
                                {
                                    up ? 
                                    <button style={{pointerEvents: 'none'}}>Update <i class="fa fa-spinner fa-spin"></i></button> : 
                                    <button onClick={e=>Setup(!up)} type="submit">Update <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></button>
                                }
                            </div>
                        </Form>
                    </Formik>
                </div>
                </div>
            </div>
        </>
    )
}

export default Edit_compet