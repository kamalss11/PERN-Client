import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'

function Edit_departmental(){
    const [uData,setUdata] = useState()
    const [dep,setDep] = useState()
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

            const d = await fetch(`/forms/events/departmental_activities/edit/${window.localStorage.getItem('edit')}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const de = await d.json()
            setDep(de)

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

                    <div className="fo">
                    <Formik
                        initialValues = {{
                            activity: `${dep ? dep[0].activity : ''}`,
                            guest: `${dep ? dep[0].guest : ''}`,
                            topic: `${dep ? dep[0].topic : ''}`,
                            total: `${dep ? dep[0].total : ''}`,
                            venue: `${dep ? dep[0].venue : ''}`,
                            date: `${dep ? dep[0].date : ''}`
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({   
                                activity: Yup.string()
                                    .required('Required'),                               
                                guest: Yup.string(),
                                topic: Yup.string(),
                                total: Yup.string(),
                                venue: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                const res = await fetch(`/forms/events/departmental_activities/edit`,{
                                    method: "PUT",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        id : window.localStorage.getItem('edit'),
                                        activity: values.activity,
                                        guest: values.guest,
                                        topic: values.topic,
                                        total: values.total,
                                        venue: values.venue,
                                        date: values.date
                                    })
                                })
    
                                const data = await res.json()
                                console.log(data)
                                if(res.status === 422 || !data){

                                    window.alert(`${data.error}`)
                                }
                                else{
                                    setSubmitting(false);
                                    resetForm()
                                    alert("Data Updated")
                                    window.localStorage.setItem('edit','')
                                    history.push("/dashboard")
                                }
                            }, 400);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit Any other Departmental Activities</h3>

                            <TextInput
                                id="activity"
                                name="activity"
                                type="text"
                                label="Name of the Activity"
                            />

                            <TextInput
                                id="guest"
                                name="guest"
                                type="text"
                                label="Chief Guest / Resource Person with Designation/Address"
                            />

                            <TextInput
                                id="topic"
                                name="topic"
                                type="text"
                                label="Topic"
                            />

                            <TextInput
                                id="total"
                                name="total"
                                type="text"
                                label="No. of Participants"
                            />

                            <TextInput
                                id="venue"
                                name="venue"
                                type="text"
                                label="Venue"
                            />

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

export default Edit_departmental