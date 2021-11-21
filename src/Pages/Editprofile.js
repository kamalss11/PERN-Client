import React,{useState,useEffect} from "react";
import {Link,useHistory} from 'react-router-dom'
import { Formik,useField,Form } from 'formik'
import * as Yup from 'yup'
import Sidebar from "../Components/Sidebar";
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineLogout} from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'

function Editprofile(){
    const [uData,setUdata] = useState()
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

            const data = await res.json()
            setUdata(data.user)

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }catch(err){
            console.log(err)
            history.push('/signin')
        }
    }

    const TextInput = ({ label,...props }) => {
        const [field,meta] = useField(props)
        return(
            <div className="fields">
                {/* <label htmlFor={props.id || props.name}>{label}</label><br /> */}
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
            <select {...field} {...props} />
            {
                meta.touched && meta.error ?(
                    <p className="error">{meta.error}</p>
                ):null
            }
          </div>
        )
    }

    useEffect(() => {
        callAboutPage()
    },[])
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

                    <div className="pro-data" style={{padding:"20px"}}>
                        <Formik
                            initialValues = {{
                                name: `${uData ? uData[0].name : ''}`,
                                department: `${uData ? uData[0].department : ''}`,
                                password : '',
                                cpassword : '',
                                ppassword : '',
                                hashpassword : `${uData ? uData[0].password : ''}`
                            }}

                            enableReinitialize       

                            validationSchema = {
                                Yup.object({
                                    name: Yup.string()
                                        .min(5,'Name must be greater than 5 characters')
                                        .required('Required'),
                                    department: Yup.string()
                                    .oneOf(
                                    ['BCA','B.Sc(CS-A)','B.Sc(CS-B)','B.Sc(CT)','B.Sc(IT)','M.Sc(SS)','BDA','B.Voc(Networking and Mobile Application)'],
                                    'Invalid'
                                    )
                                    .required('Required')
                                })
                            }

                            onSubmit={(values, { setSubmitting,resetForm }) => {
                                setTimeout(async () => {
                                    const res = await fetch(`/dashboard/editprofile/${uData[0].user_id}`,{
                                        method: "PUT",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            name : values.name,
                                            password: values.password,
                                            cpassword: values.cpassword,
                                            ppassword: values.ppassword,
                                            hashpassword: values.hashpassword
                                        })
                                    })
        
                                    const data = await res.json()
                                    if(res.status === 422 || !data){
                                        window.alert(`${data.error}`)
                                    }
                                    else{
                                        setSubmitting(false);
                                        resetForm()
                                        alert("Profile Updated")
                                        history.push("/dashboard/profile")
                                    }
                                }, 400);
                            }}
                        >
                            <Form method="PUT" className="form">
                                <h3>Edit Profile</h3>
                                {/* <p className="resin">You have only option to edit your name</p> */}
                                <TextInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    label="Name"
                                    placeholder="Enter your name"
                                />

                                {/* <MySelect name="department">
                                    <option value="">--- Department ---</option>
                                    <option value="BCA">BCA</option>
                                    <option value="B.Sc(CS-A)">B.Sc(CS-A)</option>
                                    <option value="B.Sc(CS-B)">B.Sc(CS-B)</option>
                                    <option value="B.Sc(CT)">B.Sc(CT)</option>
                                    <option value="B.Sc(IT)">B.Sc(IT)</option>
                                    <option value="M.Sc(SS)">M.Sc(SS)</option>
                                    <option value="BDA">BDA</option>
                                    <option value="B.Voc(Networking and Mobile Application)">B.Voc(Networking and Mobile Application)</option>
                                </MySelect> */}

                                <div className="btn">
                                    <button type="submit">Update</button>
                                </div>
                            </Form>
                        </Formik>

                        <Formik
                            initialValues = {{
                                password: '',
                                cpassword: '',
                                ppassword: ''
                            }}

                            enableReinitialize       

                            validationSchema = {
                                Yup.object({
                                    password: Yup.string()
                                        .min(4,'Password must be greater than 4 characters')
                                        .required('Required'),

                                    cpassword: Yup.string()
                                        .oneOf(
                                        [Yup.ref('password')],
                                        'Both password needs to be same'
                                        ),

                                    ppassword: Yup.string()
                                        .min(4,'Password must be greater than 4 characters')
                                        .required('Required')
                                })
                            }

                            onSubmit={(values, { setSubmitting,resetForm }) => {
                                setTimeout(async () => {
                                    const res = await fetch(`/dashboard/editprofile/${uData[0].user_id}`,{
                                        method: "PUT",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            password : values.password,
                                            cpassword: values.cpassword,
                                            ppassword: values.ppassword,
                                            hashpassword: uData[0].password
                                        })
                                    })
        
                                    const data = await res.json()
                                    if(res.status === 422 || !data){
                                        window.alert(`${data.error}`)
                                    }
                                    else{
                                        setSubmitting(false);
                                        resetForm()
                                        alert("Password Updated")
                                        history.push("/logout")
                                    }
                                }, 400);
                            }}
                        >
                            <Form method="PUT" className="form" style={{margin:"50px 0 0"}}>
                                <h3>Change Password</h3>
                                <TextInput
                                    id="ppassword"
                                    name="ppassword"
                                    type="password"
                                    placeholder="Enter old password"
                                />

                                <TextInput
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter new password"
                                />

                                <TextInput 
                                    id="cpassword"
                                    name="cpassword"
                                    type="password"
                                    placeholder="Re-enter password"
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

export default Editprofile