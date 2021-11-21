import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'

function Edit_journal(){
    const [uData,setUdata] = useState()
    const [jou,setJou] = useState()
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
            setUdata(datas)

            const mo = await fetch(`/forms/faculty/journal_publications/edit/${window.localStorage.getItem('edit')}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })            
            
            const m = await mo.json()
            setJou(m)

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
                            title: `${jou ? jou[0].title : ''}`,
                            jou: `${jou ? jou[0].jou : ''}`,
                            issn_no: `${jou ? jou[0].issn_no : ''}`,
                            volume: `${jou ? jou[0].volume : ''}`,
                            sci: `${jou ? jou[0].sci : ''}`,
                            impact: `${jou ? jou[0].impact : ''}`,
                            level: `${jou ? jou[0].level : ''}`,
                            date: `${jou ? jou[0].date : ''}`
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({  
                                title: Yup.string()
                                    .required('Required'),                                   
                                jou: Yup.string(),
                                issn_no: Yup.string(),
                                volume: Yup.string(),
                                sci: Yup.string(),
                                impact: Yup.string(),
                                level: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                const res = await fetch(`/forms/faculty/journal_publications/edit`,{
                                    method: "PUT",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        id : window.localStorage.getItem('edit'),
                                        title: values.title,
                                        jou: values.jou,
                                        issn_no: values.issn_no,
                                        volume: values.volume,
                                        sci: values.sci,
                                        impact: values.impact,
                                        level: values.level,
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
                            <h3>Edit Journal Publications</h3>

                            <TextInput
                                id="title"
                                name="title"
                                type="text"
                                label="Title of the paper"
                            />

                            <TextInput
                                id="jou"
                                name="jou"
                                type="text"
                                label="Name of the Journal"
                            />

                            <TextInput
                                id="issn_no"
                                name="issn_no"
                                type="text"
                                label="ISSN No. and Dol"
                            />

                            <TextInput
                                id="volume"
                                name="volume"
                                type="text"
                                label="Volume No.,Issue,Page No."
                            />

                            <TextInput
                                id="sci"
                                name="sci"
                                type="text"
                                label="SCI/SCIE/Scopus Indexed/UGC Recognized"
                            />

                            <TextInput
                                id="impact"
                                name="impact"
                                type="text"
                                label="Impact Factor"
                            />

                            <MySelect name="level" label="Level">
                                <option value="">--Level--</option>
                                <option value="National">National</option>
                                <option value="International">International</option>
                            </MySelect>

                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                label="Dat of Happen"
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

export default Edit_journal