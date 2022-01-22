import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'
import Axios from 'axios'

function Edit_conference(){
    const [img,setimg] = useState()
    const [uData,setUdata] = useState()    
    const [con,setCon] = useState()
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile/${uData ? uData[0].user_id : ''}`
    console.log(uData)
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

            const c = await fetch(`/forms/events/conference/edit/${window.localStorage.getItem('edit')}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const co = await c.json()
            setCon(co)

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
            <Sidebar />
            <div className="about">
                <div className="content">
                    <div className="hdr">
                        <h3>Dashboard</h3>
                        <b onClick={()=>setMen(!men)}>
                            <p> <span>Hello,</span> {uData ? uData[0].name : ''}</p>
                            <ul className={men ? "men active" : "men"}>
                                <li><Link to="/dashboard/profile"><CgProfile />Profile</Link></li>
                                <li><Link to={editprofile}><RiLockPasswordLine />Change password</Link></li>
                                <li><Link to="/logout"><AiOutlineLogout />Logout</Link></li>
                            </ul>
                        </b>
                    </div>
                    
                    <div className='dprt'>
                        <h4>Internal Quality Assurance Cell (IQAC)</h4>
                        <h4>Department : {uData ? uData[0].department : null } - Staffs</h4>
                        <h4 className='h'>Events / Programmes Organized</h4>
                    </div>

                    <div className="fo">
                    <Formik
                        initialValues = {{
                            con_sem: `${con ? con[0].con_sem : ''}`,
                            title: `${con ? con[0].title : ''}`,
                            sponsoring_agency: `${con ? con[0].sponsoring_agency : ''}`,
                            resource_person: `${con ? con[0].resource_person : ''}`,
                            venue: `${con ? con[0].venue : ''}`,
                            objective: `${con ? con[0].objective : ''}`,
                            outcome: `${con ? con[0].outcome : ''}`,
                            level: `${con ? con[0].level : ''}`,
                            total: `${con ? con[0].total : ''}`,
                            date: `${con ? con[0].date : ''}`,
                            image: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({   
                                con_sem: Yup.string()
                                    .required('Required'),                                  
                                title: Yup.string()
                                    .required('Required'),
                                sponsoring_agency: Yup.string(),
                                resource_person: Yup.string(),
                                venue: Yup.string(),
                                objective: Yup.string(),
                                outcome: Yup.string(),
                                level: Yup.string(),
                                total: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }
                        
                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                let dat = new FormData()
                                console.log(img)
                                dat.append('image',img)
                                dat.append('id',con[0].id)
                                dat.append('con_sem',values.con_sem)
                                dat.append('title',values.title)
                                dat.append('sponsoring_agency',values.sponsoring_agency)
                                dat.append('resource_person',values.resource_person)
                                dat.append('venue',values.venue)
                                dat.append('objective',values.objective)
                                dat.append('outcome',values.outcome)
                                dat.append('level',values.level)
                                dat.append('total',values.total)
                                dat.append('date',values.date)

                                Axios.put('http://localhost:3000/forms/events/conference/edit',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    alert("Data Updated"),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit Conference / Seminar / Symposium / Workshop organized</h3>

                            <MySelect name="con_sem" label="Type">
                                <option value="">--Select--</option>
                                <option value="Conference">Conference</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Symposium">Symposium</option>
                                <option value="Workshop organized">Workshop organized</option>
                            </MySelect>

                            <TextInput
                                id="title"
                                name="title"
                                type="text"
                                label="Title"
                            />

                            <TextInput
                                id="sponsoring_agency"
                                name="sponsoring_agency"
                                type="text"
                                label="Sponsoring Agency"
                            />

                            <TextInput
                                id="resource_person"
                                name="resource_person"
                                type="text"
                                label="Resource Person designation/address"
                            />

                            <TextInput
                                id="venue"
                                name="venue"
                                type="text"
                                label="Venue"
                            />

                            <TextInput
                                id="objective"
                                name="objective"
                                type="text"
                                label="Objective of the Event"
                            />

                            <TextInput
                                id="outcome"
                                name="outcome"
                                type="text"
                                label="Outcome of the Event"
                            />

                            <MySelect name="level" label="Level">
                                <option value="">--Level--</option>
                                <option value="National">National</option>
                                <option value="International">International</option>
                                <option value="State">State</option>
                                <option value="Regional">Regional</option>
                            </MySelect>

                            <TextInput
                                id="total"
                                name="total"
                                type="text"
                                label="Total no. of Participants"
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
                                <button type="submit">Update</button>
                            </div>
                        </Form>
                    </Formik>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Edit_conference