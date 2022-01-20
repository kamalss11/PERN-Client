import React,{useEffect,useState} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory } from 'react-router-dom'
import '../CSS/LS.css'
import {RiUser3Fill} from 'react-icons/ri'
import {AiFillLock} from 'react-icons/ai'

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
            <>
                <div className="fields">
                    <div>
                        {props.icon}
                        <input {...field}{...props}></input>
                        <label htmlFor={props.id || props.name}>{label}</label>
                    </div>
                    {
                        meta.touched && meta.error ?(
                            <p className="error">{meta.error}</p>
                        ):null
                    }
                </div>
            </>
        )
    }


    useEffect(() => {
        callAboutPage()
    },[])
    return(
        <>
            <div className='bg1'>
                <nav>
                    <h2 className='logo'>IQAC</h2>
                    <Link to='/signin'><RiUser3Fill />SignIn</Link>
                </nav>

                <div className='wel'>
                    <h3>Welcome !</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
                </div>
            </div>
            
            <div className='bg2'>
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
                            <div style={{textAlign:'center'}}>
                                {/* <h3>Internal Quality Assurance Cell - (IQAC)</h3><br /> */}
                                <h3>Reset Password</h3>
                            </div>

                            <TextInput icon={<AiFillLock />}
                                name="npassword"
                                type="password"
                                placeholder="Enter New Password"
                            />

                            <TextInput icon={<AiFillLock />}
                                name="confirm_Password"
                                type="password"
                                placeholder="Confirm Password"
                            />

                            <div className="btn">
                                <button type="submit">Submit</button>
                            </div>

                            <p className="ls"><Link to="/signin">Login ?</Link></p>
                        </Form>
                    </Formik>                                    
                </div>
            </div>
        </>
    )
}

export default Reset_password