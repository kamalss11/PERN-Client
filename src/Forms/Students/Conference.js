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
    const [uData,setUdata] = useState()
    const [men,setMen] = useState(false)
    const [img,setimg] = useState()
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
                        <h4>Department : {uData ? uData[0].department : null } - Students</h4>
                        <h4 className='h'>Students Details</h4>
                    </div>
                    
                    <div className="fo">
                    <Formik
                        initialValues = {{
                            roll_no: '',
                            con: '',
                            n_con: '',
                            date: '',
                            n: '',
                            award: '',
                            sponsoring_agency: '',
                            poster: '',
                            venue: '',
                            level : '',
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
                                dat.append('n',values.n)
                                dat.append('roll_no',values.roll_no)
                                dat.append('con',values.con)
                                dat.append('n_con',values.n_con)
                                dat.append('sponsoring_agency',values.sponsoring_agency)
                                dat.append('poster',values.poster)
                                dat.append('award',values.award)
                                dat.append('date',values.date)
                                dat.append('venue',values.venue)
                                dat.append('level',values.level)
                                dat.append('department',uData[0].department)

                                Axios.post('http://localhost:3000/forms/student/s_conference',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    toast.success("Data Inserted",{autoClose:1000}),
                                    history.push("/dashboard/view_students"))
                                .catch(err => console.log(err))
                            },600)
                        }}
                    >
                        <Form method="POST" encType='multipart/form-data' className="form">
                            <h3>Participation in Workshop/Seminar/Conference/Symposium</h3>                            

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

                            <MySelect name="con" label="Conference/Workshop/Seminar/ Symposium">
                                <option value="">--Conference/Workshop/Seminar/ Symposium--</option>
                                <option value="Conference">Conference</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Symposium">Symposium</option>
                            </MySelect>
    
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