import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'

function Edit_phd(){
    const [uData,setUdata] = useState()
    const [deg,setDeg] = useState()
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile/${uData ? uData[0].id : ''}`
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

            const d = await fetch(`/forms/research/deg/edit/${window.localStorage.getItem('edit')}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const de = await d.json()
            setDeg(de)

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
                    
                    <div className="fo">
                    <Formik
                        initialValues = {{
                            deg: `${deg ? deg[0].deg : ''}`,
                            guide_name: `${deg ? deg[0].guide_name : ''}`,
                            title: `${deg ? deg[0].title : ''}`,
                            external: `${deg ? deg[0].external : ''}`,
                            venue: `${deg ? deg[0].venue : ''}`,
                            date: `${deg ? deg[0].date : ''}`
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
                                const res = await fetch(`/forms/research/deg/edit}`,{
                                    method: "PUT",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        id : window.localStorage.getItem('edit'),
                                        deg: values.deg,
                                        guide_name: values.guide_name,
                                        title: values.title,
                                        external: values.external,
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
                            <h3>Edit Ph.D / M.Phil</h3>

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

export default Edit_phd