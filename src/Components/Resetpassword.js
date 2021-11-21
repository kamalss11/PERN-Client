import React,{useEffect} from "react";
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import '../CSS/LS.css'
import Navbar from "./Navbar";


function Resetpassword(){
    const history = useHistory()
    const callAboutPage = async () => {
        try{
            const res = await fetch('/resetpassword',{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const datas = await res.json()
            console.log(datas)


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
                {/* <label htmlFor={props.id || props.name}>{label}</label> */}
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
            <Navbar /> 
            <div className="signUp">
                <Formik
                    initialValues = {{
                        email: ''
                    }}
                    
                    validationSchema = {
                        Yup.object({
                            email: Yup.string()
                                .email('Invalid Email')
                                .required('Required')
                        })
                    }

                    onSubmit={(values, { setSubmitting,resetForm }) => {
                        setTimeout(async () => {
                            alert(JSON.stringify(values, null, 2));
                            const res = await fetch("/resetpassword",{
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email : values.email
                                })
                            })

                            const data = await res.json()
                            console.log(data)
                            if(res.status === 422 || !data){
                                window.alert(`${data.error}`)
                            }
                            else{
                                console.log(data)
                                window.alert("Mail sent successfully")
                                setSubmitting(false);
                                resetForm()
                            }
                        }, 400);
                    }}
                >
                    <Form method="POST" className="form">
                        <TextInput
                            name="email"
                            type="text"
                            placeholder="Enter your Email"
                        />

                        <div className="btn">
                            <button type="submit">Reset Password</button>
                        </div>
                    </Form>
                </Formik>   
            </div>    
        </>
    )
}

export default Resetpassword