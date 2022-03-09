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

function Edit_awards(){
    const location = useLocation()
    const [img,setimg] = useState()
    const [uData,setUdata] = useState()
    const [awd,setAwd] = useState()
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
                const rps = await fetch(`/forms/awards_for_innovation/edit/${location.state.id}`,{
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
    
                const r = await rps.json()
                console.log(r)
                setAwd(r)
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
                            n: `${awd ? awd[0].n : ''}`,
                            awardee_name: `${awd ? awd[0].awardee_name : ''}`,
                            designation: `${awd ? awd[0].designation : ''}`,
                            award_category: `${awd ? awd[0].award_category : ''}`,
                            title: `${awd ? awd[0].title : ''}`,
                            awarding_agency: `${awd ? awd[0].awarding_agency : ''}`,
                            venue: `${awd ? awd[0].venue : ''}`,
                            level: `${awd ? awd[0].level : ''}`,
                            date: `${awd ? awd[0].date : ''}`,
                            image: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({
                                awardee_name: Yup.string(),
                                designation: Yup.string(),                                       
                                award_category: Yup.string(),
                                title: Yup.string()
                                    .required('Required'),
                                awarding_agency: Yup.string(),
                                venue: Yup.string(),
                                level: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                let dat = new FormData()
                                console.log(img)
                                dat.append('image',img)
                                dat.append('n',values.n)
                                dat.append('id',awd[0].id)
                                dat.append('awardee_name',values.awardee_name)
                                dat.append('designation',values.designation)
                                dat.append('award_category',values.award_category)
                                dat.append('title',values.title)
                                dat.append('awarding_agency',values.awarding_agency)
                                dat.append('venue',values.venue)
                                dat.append('level',values.level)
                                dat.append('date',values.date)

                                Axios.put('http://localhost:3000/forms/research/awards_for_innovation/edit',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    toast.success("Data Updated",{autoClose: 1000}),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit Awards for Innovation</h3>

                            <TextInput
                                id="n"
                                name="n"
                                type="text"
                                label="Name of the Faculty"
                                // placeholder="Title of the project"
                            />
                            <TextInput
                                id="title"
                                name="title"
                                type="text"
                                label="Title of the innovation"
                            />

                            <TextInput
                                id="award_category"
                                name="award_category"
                                type="text"
                                label="Award Category"
                            />

                            <TextInput
                                id="awardee_name"
                                name="awardee_name"
                                type="text"
                                label="Name of the awardee"
                            />

                            <TextInput
                                id="designation"
                                name="designation"
                                type="text"
                                label="Designation"
                            />

                            <TextInput
                                id="awarding_agency"
                                name="awarding_agency"
                                type="text"
                                label="Awarding Agency"
                            />         

                            <TextInput
                                id="venue"
                                name="venue"
                                type="text"
                                label="Venue"
                            />    

                            <MySelect name="level" label="Level">
                                <option value="">--Level--</option>
                                <option value="Regional">Regional</option>
                                <option value="State">State</option>
                                <option value="National">National</option>
                                <option value="International">International</option>
                            </MySelect>  

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

export default Edit_awards