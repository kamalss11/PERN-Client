import React,{useEffect} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory } from 'react-router-dom'
import '../CSS/LS.css'
import Navbar from '../Components/Navbar'

function Signin(){
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
                        email: '',
                        password: ''
                    }}
                    
                    validationSchema = {
                        Yup.object({
                            email: Yup.string()
                                .email('Invalid Email')
                                .required('Required'),
                            password: Yup.string()
                                .min(4,'Password must be greater than 4 characters')
                                .required('Required')
                        })
                    }

                    onSubmit={(values, { setSubmitting,resetForm }) => {
                        setTimeout(async () => {
                            const res = await fetch('/signin',{
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email : values.email,
                                    password : values.password
                                })
                            })

                            const data = await res.json()
                            console.log(data,'Signin')
                            if(res.status === 400 || !data){
                                window.alert(`${data.error}`)
                            }
                            else{
                                window.alert("Logged in Successfull")
                                setSubmitting(false);
                                resetForm()
                                history.push('/dashboard')
                            }
                        }, 400);
                    }}
                >
                    <Form method="POST" className="form">
                        <h3>SignIn</h3>

                        <TextInput
                            name="email"
                            type="text"
                            placeholder="Enter your Email"
                        />

                        <TextInput
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                        />

                        <div className="btn">
                            <button type="submit">SignIn</button>
                        </div>

                        <p className="ls">Don't have an account ? <Link to="/">Register</Link></p>
                        <p className="ls"><Link to="/forget_password">Forget Password ?</Link></p>
                    </Form>
                </Formik>                                    
            </div>
        </>
    )
}

export default Signin