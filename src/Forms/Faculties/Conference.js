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
import {IoSave} from 'react-icons/io5'
import 'react-toastify/dist/ReactToastify.css'
import {toast} from 'react-toastify'
toast.configure()

function Conference(){
    const [img,setimg] = useState()
    const [uData,setUdata] = useState()
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile`
    console.log(uData)
    const [sb,setSb] = useState(false)
    const history = useHistory()
    const [save,Setsave] = useState(false)

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
                        <h4 className='h'>Faculties</h4>
                    </div>

                    <div className="fo">
                    <Formik
                        initialValues = {{
                            con: '',
                            title: '',
                            venue: '',
                            level: '',
                            financial_support: '',
                            programme_outcome: '',
                            date: '',
                            image: '',
                            n:''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({     
                                con: Yup.string()
                                    .required('Required'),  
                                title: Yup.string(),                              
                                venue: Yup.string(),
                                level: Yup.string(),
                                financial_support: Yup.string(),
                                programme_outcome: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                let dat = new FormData()
                                console.log(img,values.date)
                                dat.append('image',img)
                                dat.append('n',values.n)
                                dat.append('con',values.con)
                                dat.append('title',values.title)
                                dat.append('venue',values.venue)
                                dat.append('level',values.level)
                                dat.append('financial_support',values.financial_support)
                                dat.append('programme_outcome',values.programme_outcome)
                                dat.append('date',values.date)
                                dat.append('department',uData[0].department)

                                Axios.post('http://localhost:3000/forms/faculty/conference',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    toast.success("Data Inserted",{autoClose:1000}),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="POST" className="form">
                            <h3>Conference / Seminar / Symposium / Workshop Attended</h3>

                            <TextInput
                                id="n"
                                name="n"
                                type="text"
                                label="Name of the faculty"
                            />

                            <MySelect name="con" label="Type">
                                <option value="">--Select--</option>
                                <option value="Conference">Conference</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Symposium">Symposium</option>
                                <option value="Workshops">Workshops</option>
                            </MySelect>

                            <TextInput
                                id="title"
                                name="title"
                                type="text"
                                label="Title of the paper"
                            />

                            <TextInput
                                id="venue"
                                name="venue"
                                type="text"
                                label="Venue"
                            />

                            <MySelect name="level" label="Level">
                                <option value="">--Level--</option>
                                <option value="National">National</option>
                                <option value="International">International</option>
                                <option value="Regional">Regional</option>
                                <option value="State">State</option>
                            </MySelect>

                            <TextInput
                                id="financial_support"
                                name="financial_support"
                                type="number"
                                label="Financial Support"
                            />

                            <TextInput
                                id="programme_outcome"
                                name="programme_outcome"
                                type="text"
                                label="Programme Outcome"
                            />

                            <div className='fields'>
                                <label htmlFor='file'>Upload File</label>

                                <input type="file" id='file' name='image' onChange={e=>setimg(e.target.files[0])}/>       
                            </div>

                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                label="Date of Happen"
                            />

                            <div className="btn">
                                {/* <button type="reset">Reset</button> */}
                                {
                                    save ? 
                                    <button style={{pointerEvents: 'none'}}>Save <i class="fa fa-spinner fa-spin"></i></button> : 
                                    <button onClick={e=>Setsave(!save)} type="submit">Save <IoSave/></button> 
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

export default Conference