import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/apis';
import { changeLoggin } from '../../utils/redux/actionCreator';
import style from './style/LoginStyle.module.css';

function Login(props){
    const [res, setRes] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (e)=>{
        e.preventDefault();
        let formData = new FormData(e.target);
        let username = formData.get("username");
        let password = formData.get("password");

        loginUser(username, password).then((data)=>{
            if(data.success){
                dispatch(changeLoggin(true));
                navigate("/Layout", {replace: true});
            }else{
                setRes(data);
            }
        });
    }

    return (
        <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center text-dark mt-5">Login Form</h2>
        <div className="card my-5">

          <form className={`card-body ${style.cardbodyColor} p-lg-5`} onSubmit={(e)=>{onSubmit(e);}} >

            <div className="mb-3">
              <input type="text" name='username' className="form-control" id="Username" aria-describedby="emailHelp"
                placeholder="User Name"/>
            </div>
            <div className="mb-3">
              <input type="password" name='password' className="form-control" id="password" placeholder="password"/>
            </div>
            {res && !res.success && <span className='text-danger' >{res.message}</span>}
            <div className="text-center"><button type="submit" className={`btn btn-primary px-5 mb-5 w-100`} >Login</button></div>
            
          </form>
        </div>

      </div>
    </div>
  </div>
    )
}

export default Login;