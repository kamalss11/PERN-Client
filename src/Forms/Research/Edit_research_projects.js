import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'

function Edit_research_projects(){
    const [uData,setUdata] = useState()
    const [rp,setRp] = useState()
    const [men,setMen] = useState(false)
    const editprofile = `/dashboard/editprofile/${uData ? uData._id : ''}`
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

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }

            const rps = await fetch(`/forms/research/research_projects/edit/${window.localStorage.getItem('edit')}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const r = await rps.json()
            console.log(r)
            setRp(r)
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
                            title: `${rp ? rp[0].title : ''}`,
                            no: `${rp ? rp[0].no : ''}`,
                            amount_sanctioned: `${rp ? rp[0].amount_sanctioned : ''}`,
                            fileno: `${rp ? rp[0].fileno : ''}`,
                            amount_received: `${rp ? rp[0].amount_received : ''}`,
                            date_sanctioned: `${rp ? rp[0].date_sanctioned : ''}`,
                            funding_agency: `${rp ? rp[0].funding_agency : ''}`,
                            date: `${rp ? rp[0].date: ''}`
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({
                                title: Yup.string()
                                    .required('Required'),
                                no: Yup.string()
                                    .oneOf(
                                    ['Newly Sanctioned','Ongoing'],
                                    'Invalid'
                                    ),
                                amount_sanctioned: Yup.string(),
                                fileno: Yup.string(),
                                amount_received: Yup.string(),
                                date_sanctioned: Yup.string(),
                                funding_agency: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                const res = await fetch(`/forms/research/research_projects/edit`,{
                                    method: "PUT",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        id: `${window.localStorage.getItem('edit')}`,
                                        title: values.title,
                                        no: values.no,
                                        amount_sanctioned: values.amount_sanctioned,
                                        fileno: values.fileno,
                                        amount_received: values.amount_received,
                                        date_sanctioned: values.date_sanctioned,
                                        funding_agency: values.funding_agency,
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
                                    window.localStorage.setItem('edit','')
                                    alert("Profile Updated")
                                    history.push("/dashboard")
                                }
                            }, 400);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <h3>Edit Research Projects</h3>
                            <TextInput
                                id="tite"
                                name="title"
                                type="text"
                                label="Title of the project"
                                // placeholder="Title of the project"
                            />

                            <MySelect name="no" label="Newly Sanctioned / Ongoing">
                                <option value="">--Newly Sanctioned / Ongoing--</option>
                                <option value="Newly Sanctioned">Newly Sanctioned</option>
                                <option value="Ongoing">Ongoing</option>
                            </MySelect>

                            <TextInput
                                id="amount_sanctioned"
                                name="amount_sanctioned"
                                type="text"
                                label="Sanctioned Amount (Rs.)"
                                // placeholder="Sanctioned Amount (Rs.)"
                            />

                            <TextInput
                                id="fileno"
                                name="fileno"
                                type="text"
                                label="File No./Grant No."
                            />

                            <TextInput
                                id="amount_received"
                                name="amount_received"
                                type="text"
                                label="Amount Received"
                            />      

                            <TextInput
                                id="date_sanctioned"
                                name="date_sanctioned"
                                type="date"
                                label="Date of Sanction"
                            />     

                            <TextInput
                                id="funding_agency"
                                name="funding_agency"
                                type="text"
                                label="Funding Agency"
                            />     

                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                label="Date Happened"
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

export default Edit_research_projects