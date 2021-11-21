import React, { useEffect,useState } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import {CgProfile} from 'react-icons/cg'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import Sidebar from '../../Components/Sidebar'

function Edit_mou(){
    const [uData,setUdata] = useState()
    const [mou,setMou] = useState()
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

            const mo = await fetch(`/forms/collaborations/mou/edit/${window.localStorage.getItem('edit')}`,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const m = await mo.json()
            setMou(m)

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
                            organization: `${mou ? mou[0].organization : ''}`,
                            date_signed: `${mou ? mou[0].date_signed : ''}`,
                            period: `${mou ? mou[0].period : ''}`,
                            participants: `${mou ? mou[0].participants : ''}`,
                            purpose: `${mou ? mou[0].purpose : ''}`,
                            total: `${mou ? mou[0].total : ''}`,
                            date: `${mou ? mou[0].date : ''}`
                        }}

                        enableReinitialize       

                        validationSchema = {
                            Yup.object({                                     
                                organization: Yup.string()
                                    .required('Required'),
                                date_signed: Yup.string(),
                                period: Yup.string(),
                                participants: Yup.string(),
                                purpose: Yup.string(),
                                total: Yup.string(),
                                date: Yup.date().required('Required')
                            })
                        }

                        onSubmit={(values, { setSubmitting,resetForm }) => {
                            setTimeout(async () => {
                                const res = await fetch(`/forms/collaborations/mou/edit`,{
                                    method: "PUT",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        id : window.localStorage.getItem('edit'),
                                        organization: values.organization,
                                        date_signed: values.date_signed,
                                        period: values.period,
                                        participants: values.participants,
                                        purpose: values.purpose,
                                        total: values.total,
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
                            <h3>Edit MoU(s) Signed</h3>

                            <TextInput
                                id="organization"
                                name="organization"
                                type="text"
                                label="Organization"
                            />

                            <TextInput
                                id="date_signed"
                                name="date_signed"
                                type="text"
                                label="Date Signed"
                            />

                            <TextInput
                                id="period"
                                name="period"
                                type="text"
                                label="Period (from - to)"
                            />

                            <TextInput
                                id="participants"
                                name="participants"
                                type="text"
                                label="Participants (No. of Students and No. of Faculty)"
                            />

                            <TextInput
                                id="purpose"
                                name="purpose"
                                type="text"
                                label="Purpose"
                            /> 

                            <TextInput
                                id="total"
                                name="total"
                                type="text"
                                label="Total No. of Beneficiaries"
                            />    

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

export default Edit_mou