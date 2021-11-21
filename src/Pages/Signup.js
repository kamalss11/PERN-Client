import React, { useEffect } from 'react'
import { Formik,Form,useField } from 'formik'
import {Link,useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import '../CSS/LS.css'
import Navbar from '../Components/Navbar'

function Signup(){
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

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }

            history.push('/dashboard')
        }catch(err){
            console.log(err)
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
    return(
        <div>
            <Navbar/>
            <div className="signUp">
                <Formik
                    initialValues = {{
                        name: '',
                        department: '',
                        email: '',
                        roll: '',
                        password: '',
                        confirm_Password: ''
                    }}
                    validationSchema = {
                        Yup.object({
                            name: Yup.string()
                                .min(5,'Name must be greater than 5 characters')
                                .required('Required'),
                            email: Yup.string()
                                .email('Invalid Email')
                                .required('Required'),
                            department: Yup.string()
                                .oneOf(
                                ['BCA','B.Sc(CS-A)','B.Sc(CS-B)','B.Sc(CT)','B.Sc(IT)','M.Sc(SS)','BDA','B.Voc(Networking and Mobile Application)'],
                                'Invalid'
                                )
                                .required('Required'),
                            roll: Yup.string()
                                .oneOf(
                                ['Staff','Student','IQAC'],
                                'Invalid'
                                )
                                .required('Required'),
                            password: Yup.string()
                                .min(4,'Password must be greater than 4 characters')
                                .required('Required'),
                            confirm_Password: Yup.string()
                                .oneOf(
                                [Yup.ref('password')],
                                'Both password needs to be same'
                                )
                        })
                    }

                    onSubmit={(values, { setSubmitting,resetForm }) => {
                        setTimeout(async () => {
                            const res = await fetch("/",{
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    name : values.name,
                                    department : values.department,
                                    email : values.email,
                                    roll : values.roll,
                                    password : values.password,
                                    cpassword : values.confirm_Password
                                })
                            })

                            const data = await res.json()
                            if(res.status === 422 || !data){
                                window.alert(`${data.error}`)
                            }
                            else{
                                window.alert("Registration Successfull")
                                setSubmitting(false);
                                resetForm()
                                history.push('/signin')
                            }
                        }, 400);
                    }}
                >
                    <Form method="POST" className="form">
                        <h3>SignUp</h3>
                        <TextInput
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                        />

                        <TextInput
                            name="email"
                            type="text"
                            placeholder="Enter your Email"
                        />

                        <MySelect name="department">
                            <option value="">--- Department ---</option>
                            <option value="BCA">BCA</option>
                            <option value="B.Sc(CS-A)">B.Sc(CS-A)</option>
                            <option value="B.Sc(CS-B)">B.Sc(CS-B)</option>
                            <option value="B.Sc(CT)">B.Sc(CT)</option>
                            <option value="B.Sc(IT)">B.Sc(IT)</option>
                            <option value="M.Sc(SS)">M.Sc(SS)</option>
                            <option value="BDA">BDA</option>
                            <option value="B.Voc(Networking and Mobile Application)">B.Voc(Networking and Mobile Application)</option>
                        </MySelect>

                        <MySelect name="roll">
                            <option value="">--- Roll ---</option>
                            <option value="Staff">Staff</option>
                            <option value="Student">Student</option>
                            <option value="IQAC">IQAC</option>
                        </MySelect>

                        <TextInput
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                        />

                        <TextInput
                            name="confirm_Password"
                            type="password"
                            placeholder="Re-enter Password"
                        />

                        <div className="btn">
                            <button type="submit">SignUp</button>
                        </div>

                        <p className="ls">Already have an account ? <Link to="/signin">Login</Link></p>
                    </Form>
                </Formik>                                    
            </div>
        </div>
    )
}

export default Signup