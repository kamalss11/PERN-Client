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

function Phd(){
    const [img,setimg] = useState()
    const [uData,setUdata] = useState()
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile/${uData ? uData[0].id : ''}`
    console.log(uData)
    const history = useHistory()
    const [sb,setSb] = useState(false)

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
                        <h4 className='h'>Research</h4>
                    </div>

                    <div className="fo">
                    <Formik
                        initialValues = {{
                            deg: '',
                            guide_name: '',
                            title: '',
                            external: '',
                            venue: '',
                            date: '',
                            image: '',
                            n: ''
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
                                dat.append('n',values.n)
                                dat.append('deg',values.deg)
                                dat.append('guide_name',values.guide_name)
                                dat.append('title',values.title)
                                dat.append('external',values.external)
                                dat.append('awarding_agency',values.awarding_agency)
                                dat.append('venue',values.venue)
                                dat.append('date',values.date)
                                dat.append('department',uData[0].department)

                                Axios.post('http://localhost:3000/forms/research/deg',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    alert("Data Inserted"),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="POST" className="form">
                            <h3>Ph.D / M.Phil</h3>                            

                            <TextInput
                                id="n"
                                name="n"
                                type="text"
                                label="Name of the faculty"
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
                                <button type="submit">Save</button>
                            </div>
                        </Form>
                    </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Phd