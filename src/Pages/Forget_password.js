import React,{useEffect,useState} from 'react'
import { Formik,Form,useField } from 'formik'
import * as Yup from 'yup'
import { Link,useHistory } from 'react-router-dom'
import '../CSS/LS.css'
import {RiUser3Fill} from 'react-icons/ri'
import {MdEmail} from 'react-icons/md'
import {RiCloseCircleFill} from 'react-icons/ri'
import {TiArrowSortedUp} from 'react-icons/ti'
import {AiFillCheckCircle} from 'react-icons/ai'


function Forget_Password(){
    const [msg,setMsg] = useState()
    const [btnld,Setbtnld] = useState(false)
    const [ms,setMs] = useState()
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
        }catch(err){
            console.log(err)
            history.push('/dashboard')
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
                            Setbtnld(!btnld)
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
                                setMsg(data.msg)
                                setMs(data.s)
                                console.log(data,'Signin')
                                if(res.status === 422 || !data){
                                    Setbtnld(false)
                                    resetForm(true)
                                }
                                else{
                                    setSubmitting(false);
                                    resetForm(true)
                                }
                            }, 400);
                        }}
                    >
                        <Form method="POST" className="form">
                            <div style={{textAlign:'center'}}>
                                {/* <h3>Internal Quality Assurance Cell - (IQAC)</h3><br /> */}
                                <h3>Forget Password</h3>
                            </div>

                            {msg ? <p className='err se'><RiCloseCircleFill />{msg}</p> : ''}
                            {ms ? <p className='suc se'><AiFillCheckCircle />{ms}</p> : ''}
                            
                            <TextInput icon={<MdEmail/>}
                                name="email"
                                type="text"
                                placeholder="Enter your Email"
                            />

                            <div className="btn">
                                {
                                    btnld ? 
                                    <button style={{pointerEvents: 'none'}}><i class="fa fa-spinner fa-spin"></i> Loading
                                    </button> : 

                                    <button type="submit">Next <TiArrowSortedUp />
                                    </button>
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

export default Forget_Password