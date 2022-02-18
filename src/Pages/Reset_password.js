import React,{useEffect,useState} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory, useParams } from 'react-router-dom'
import '../CSS/LS.css'
import {RiUser3Fill} from 'react-icons/ri'
import {AiFillLock} from 'react-icons/ai'
import {RiCloseCircleFill} from 'react-icons/ri'
import {AiFillCheckCircle} from 'react-icons/ai'
import {TiArrowSortedUp} from 'react-icons/ti'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Reset_password(){
    const history = useHistory()
    const {token} = useParams()
    const [uData,setUdata] = useState()
    const [msg,setMsg] = useState()
    const [ms,setMs] = useState()
    const [btnld,Setbtnld] = useState(false)

    const callAboutPage = async () => {
        try{
            const res = await fetch('/reset_password',{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const datas = await res.json()
            console.log(datas)
            setUdata(datas.rp)

            if(datas.rp[0].token != token){
                alert('The Link you have entered is not valid')
                history.push('/forget_password')
            }

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
                                Setbtnld(!btnld)
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
                                setMsg(data.error)
                                setMs(data.dd)
                                if(res.status === 400 || !data){
                                    Setbtnld(false)
                                    // history.push('/forget_password')
                                }
                                else{
                                    toast.success('Password Updated',{autoClose:1000})
                                    setSubmitting(false);
                                    resetForm()
                                    history.push('/signin')
                                }
                            }, 400);
                        }}
                    >
                        <Form method="PUT" className="form">
                            <div style={{textAlign:'center'}}>
                                {/* <h3>Internal Quality Assurance Cell - (IQAC)</h3><br /> */}
                                <h3>Reset Password</h3>
                            </div>

                            {msg ? <p className='err se'><RiCloseCircleFill />{msg}</p> : ''}
                            {ms ? <p className='suc se'><AiFillCheckCircle />{ms}</p> : ''}

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
                                {
                                    btnld ? 
                                    <button style={{pointerEvents: 'none'}}><i class="fa fa-spinner fa-spin"></i> Loading
                                    </button> : 

                                    <button type="submit">Submit <TiArrowSortedUp /></button>
                                }
                            </div>
                        </Form>
                    </Formik>         
                      
                    <p className='bt'>
                        <Link to={'/'}>Login ?</Link>
                    </p>                                   
                </div>
            </div>
        </>
    )
}

export default Reset_password