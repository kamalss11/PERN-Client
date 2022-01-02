import React,{useEffect,useState} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory } from 'react-router-dom'
import '../CSS/LS.css'
import Navbar from '../Components/Navbar'

function Forget_Password(){
    const [msg,setMsg] = useState()
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
            console.log(datas)

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }

            history.push('/dashboard')
        }catch(err){
            console.log(err)
        }
    }

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

    useEffect(() => {
        callAboutPage()
    },[])
    return(
        <>
            <Navbar/>
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
                        localStorage.setItem('email',values.email)
                        setTimeout(async () => {
                            const res = await fetch('/forget_password',{
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email : values.email
                                })
                            })

                            const data = await res.json()
                            setMsg(data)
                            console.log(data,'Signin')
                            if(res.status === 400 || !data){
                                window.alert(`${data.error}`)
                            }
                            else{
                                setSubmitting(false);
                                resetForm()
                            }
                        }, 400);
                    }}
                >
                    <Form method="POST" className="form">
                        <h3>Forget Password</h3>

                        <TextInput
                            name="email"
                            type="text"
                            placeholder="Enter your Email"
                        />

                        {/* <TextInput
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                        />

                        <TextInput
                            name="cpassword"
                            type="cpassword"
                            placeholder="Confirm Password"
                        /> */}

                        <div className="btn">
                            <button type="submit">Next</button>
                        </div>

                        <p className="ls"><Link to="/signin">Login ?</Link></p>
                        <p className="ls"><Link to="/">Register ?</Link></p>
                    </Form>
                </Formik>                                    
            </div>
        </>
    )
}

export default Forget_Password