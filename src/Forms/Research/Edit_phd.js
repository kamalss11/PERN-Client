import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory,useLocation} from 'react-router-dom'
import * as Yup from 'yup'
import {CgMenuRight} from 'react-icons/cg'
import {FaUserCircle} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'
import Axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
toast.configure()

function Edit_phd(){
    const location = useLocation()
    const [img,setimg] = useState()
    const [uData,setUdata] = useState()
    const [deg,setDeg] = useState()
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile`
    console.log(uData)
    const [sb,setSb] = useState(false)
    const history = useHistory()
    const [up,Setup] = useState(false)

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

            if(!location.state){
                history.push('/dashboard/view_staffs')
            }
            else{
                const rps = await fetch(`/forms/degree/edit/${location.state.id}`,{
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
    
                const r = await rps.json()
                console.log(r)
                setDeg(r)
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
                        <h4>Department : {uData ? uData[0].department : null } - Staffs</h4>
                        <h4 className='h'>Research</h4>
                    </div>
                    
                    <div className="fo">
                    <Formik
                        initialValues = {{
                            n: `${deg ? deg[0].n : ''}`,
                            deg: `${deg ? deg[0].deg : ''}`,
                            guide_name: `${deg ? deg[0].guide_name : ''}`,
                            title: `${deg ? deg[0].title : ''}`,
                            external: `${deg ? deg[0].external : ''}`,
                            venue: `${deg ? deg[0].venue : ''}`,
                            date: `${deg ? deg[0].date : ''}`,
                            image: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({
                                deg: Yup.string()
                                    .required('Required'),
                                guide_name: Yup.string(),                                       
                                title: Yup.string(),
                                external: Yup.string(),
                                venue: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                let dat = new FormData()
                                console.log(img)
                                dat.append('image',img)
                                dat.append('id',deg[0].id)
                                dat.append('n',values.n)
                                dat.append('deg',values.deg)
                                dat.append('guide_name',values.guide_name)
                                dat.append('title',values.title)
                                dat.append('external',values.external)
                                dat.append('awarding_agency',values.awarding_agency)
                                dat.append('venue',values.venue)
                                dat.append('date',values.date)
                                dat.append('department',uData[0].department)

                                Axios.put('http://localhost:3000/forms/research/deg/edit',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    toast.success("Data Updated",{autoClose: 1000}),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit Ph.D / M.Phil</h3>
                            
                            <TextInput
                                id="n"
                                name="n"
                                type="text"
                                label="Name of the Faculty"
                                // placeholder="Title of the project"
                            />

                            <MySelect name="deg" label="Degree">
                                <option value="">--Degree--</option>
                                <option value="Ph.D">Ph.D</option>
                                <option value="M.Phil">M.Phil</option>
                            </MySelect> 

                            <TextInput
                                id="guide_name"
                                name="guide_name"
                                type="text"
                                label="Guide's Name"
                            />

                            <TextInput
                                id="title"
                                name="title"
                                type="text"
                                label="Title of the thesis"
                            />

                            <TextInput
                                id="external"
                                name="external"
                                type="text"
                                label="External's Name,Designation and Address"
                            />         

                            <TextInput
                                id="venue"
                                name="venue"
                                type="text"
                                label="Venue of Viva"
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

export default Edit_phd