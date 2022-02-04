import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory, useLocation} from 'react-router-dom'
import * as Yup from 'yup'
import {CgMenuRight} from 'react-icons/cg'
import {FaUserCircle} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'
import Axios from 'axios'

function Edit_lectures(){
    const location = useLocation()
    const [img,setimg] = useState()
    const [uData,setUdata] = useState()
    const [men,setMen] = useState(false)
    const [lec,setLec] = useState()
    const editprofile = `/dashboard/editprofile`
    console.log(uData)
    const [sb,setSb] = useState(false)
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

            if(!location.state){
                history.push('/dashboard/view_staffs')
            }
            else{
                const rps = await fetch(`/forms/guest_lectures/edit/${location.state.id}`,{
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    credentials: 'include'
                })
    
                const r = await rps.json()
                console.log(r)
                setLec(r)
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
                        <h4 className='h'>Events / Programmes Organized</h4>
                    </div>

                    <div className="fo">
                    <Formik
                        initialValues = {{
                            n: `${lec ? lec[0].n : ''}`,
                            resource_person: `${lec ? lec[0].resource_person : ''}`,
                            designation: `${lec ? lec[0].designation : ''}`,
                            topic: `${lec ? lec[0].topic : ''}`,
                            venue: `${lec ? lec[0].venue : ''}`,
                            objective: `${lec ? lec[0].objective : ''}`,
                            outcome: `${lec ? lec[0].outcome : ''}`,
                            total: `${lec ? lec[0].total : ''}`,
                            date: `${lec ? lec[0].date: ''}`,
                            image: ''
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({   
                                resource_person: Yup.string()
                                    .required('Required'),                                  
                                designation: Yup.string(),
                                topic: Yup.string(),
                                venue: Yup.string(),
                                objective: Yup.string(),
                                outcome: Yup.string(),
                                total: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }
                        
                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                let dat = new FormData()
                                console.log(img)
                                dat.append('image',img)
                                dat.append('id',lec[0].id)
                                dat.append('n',values.n)
                                dat.append('resource_person',values.resource_person)
                                dat.append('designation',values.designation)
                                dat.append('topic',values.topic)
                                dat.append('venue',values.venue)
                                dat.append('objective',values.objective)
                                dat.append('outcome',values.outcome)
                                dat.append('total',values.total)
                                dat.append('date',values.date)

                                Axios.put('http://localhost:3000/forms/events/guest_lectures/edit',dat)
                                .then(res => console.log(res),setSubmitting(false),
                                    resetForm(),
                                    alert("Data Updated"),
                                    history.push("/dashboard/view_staffs"))
                                .catch(err => console.log(err))
                            }, 400);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit Guest Lectures organized</h3>

                            <TextInput
                                id="n"
                                name="n"
                                type="text"
                                label="Name of the faculty"
                            />

                            <TextInput
                                id="resource_person"
                                name="resource_person"
                                type="text"
                                label="Name of the Resource Person"
                            />

                            <TextInput
                                id="designation"
                                name="designation"
                                type="text"
                                label="Designation / Address"
                            />

                            <TextInput
                                id="topic"
                                name="topic"
                                type="text"
                                label="Topic"
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

export default Edit_lectures