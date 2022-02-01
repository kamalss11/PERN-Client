import React,{useEffect,useState} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory } from 'react-router-dom'
import '../CSS/LS.css'
import Navbar from '../Components/Navbar'

function Reset_password(){
    const history = useHistory()
    const [uData,setUdata] = useState()

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
            setUdata(datas.user)

            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }catch(err){
            history.push('/dashboard')
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
                        npassword : '',
                        confirm_Password : ''
                    }}
                    
                    validationSchema = {
                        Yup.object({
                            npassword: Yup.string()
                                .min(4,'Password must be greater than 4 characters')
                                .required('Required'),
                            confirm_Password: Yup.string()
                                .oneOf(
                                [Yup.ref('npassword')],
                                'Both password needs to be same'
                                )
                        })
                    }

                    enableReinitialize

                    onSubmit={(values, { setSubmitting,resetForm }) => {
                        setTimeout(async () => {
                            const res = await fetch('/reset_password',{
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email : window.localStorage.getItem('email'),
                                    pass : values.npassword,
                                    cpass : values.confirm_Password
                                })
                            })

                            const data = await res.json()
                            console.log(data)
                            if(res.status === 400 || !data){
                                window.alert(`${data.error}`)
                            }
                            else{
                                window.localStorage.setItem('email','')
                                setSubmitting(false);
                                resetForm()
                                // history.push('/signin')
                            }
                        }, 400);
                    }}
                >
                    <Form method="PUT" className="form">
                        <h3>Forget Password</h3>

                        <TextInput
                            name="npassword"
                            type="password"
                            placeholder="Enter New Password"
                        />

                        <TextInput
                            name="confirm_Password"
                            type="password"
                            placeholder="Confirm Password"
                        />

                        <div className="btn">
                            <button type="submit">Submit</button>
                        </div>

                        <p className="ls"><Link to="/signin">Login ?</Link></p>
                        <p className="ls"><Link to="/">Register ?</Link></p>
                    </Form>
                </Formik>                                    
            </div>
        </>
    )
}

export default Reset_password