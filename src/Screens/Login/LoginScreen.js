import React, { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Validation from '../../Common/Validation';
import { TextField } from '@mui/material';
import apiHelper from '../../Common/ApiHelper';
import { useNavigate } from 'react-router-dom';
import Path from '../../Common/Path';
import SendIcon from '@mui/icons-material/Send';
import Timer from '../../Component/Timer/Timer';
import './LoginScreen.css'; 

export default function LoginScreen({ Auth, setAuth }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [open, setOpen] = React.useState(true);
  const [LoginError, setLoginError] = useState([]);
  const [token, setToken] = useState();
  const [mute, setMute] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    otp: '',
  });
  const [IsSubmited, setIsSubmited] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Auth) {
      navigate(Path.dashBoard);
    } // eslint-disable-next-line
  }, []);

  const LoginHandler = async () => {
    try {
      setIsSubmited(true);
      const ValidationResult = Validation(user, 'login');

      if (ValidationResult?.length > 0) {
        setLoginError(ValidationResult);
        return;
      }
      setMute(true);
      setTimeout(() => {
        setMute(false);
      }, 10000);
      const result = await apiHelper.AdminLogin(user);
      console.log(result);
      if (result) {
        const Token = result.data.user.token;
        setToken(Token);
      }
    } catch (error) {
      setAuth(false);
      if (error.response && error.response.data) {
        if (
          error.response.status === 400 &&
          error.response.data.message === 'Validation Error'
        ) {
          setLoginError(error.response.data.ValidationResult);
          return;
        }
      }
    }
  };

  const OtpVerify = async () => {
    try {
      setIsSubmited(true);

      const ValidationResult = Validation(user, 'otpverify');

      if (ValidationResult?.length > 0) {
        setLoginError(ValidationResult);
        return;
      }
      const result = await apiHelper.OtpVerify(user);

      if (result) {
        localStorage.setItem('TOKEN', token);
        navigate(Path.dashBoard);
        setAuth(true);
      }
    } catch (error) {
      setAuth(false);
      if (error.response && error.response.data) {
        if (
          error.response.status === 400 &&
          error.response.data.message === 'Validation Error'
        ) {
          setLoginError(error.response.data.ValidationResult);
          return;
        }
      }
    }
  };

  return (
    <div className="login-container">
      <Dialog open={open} >
        <DialogTitle>
          <img
            src="https://www.oilpixel.com/ast/themes/oilpixel/images/logo.svg"
            alt="Logo"
            className="login-logo"
          />
        </DialogTitle>
        <DialogContent className="d-flex flex-column">
          <FormControl className="form-control-custom">
            <TextField
             sx={{mt:2}}
              type="email"
              label="Email"
              error={LoginError.some((x) => x.key === 'email')}
              helperText={LoginError.find((x) => x.key === 'email')?.message}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                if (IsSubmited) {
                  const ValidationResult = Validation(
                    { ...user, email: e.target.value },
                    'login'
                  );
                  setLoginError(ValidationResult);
                }
              }}
            />
          </FormControl>
          <FormControl className="form-control-custom">
            <TextField
             sx={{mt:2}}
              error={LoginError.some((x) => x.key === 'password')}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={LoginError.find((x) => x.key === 'password')?.message}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                if (IsSubmited) {
                  const ValidationResult = Validation(
                    { ...user, password: e.target.value },
                    'login'
                  );
                  setLoginError(ValidationResult);
                }
              }}
              label="Password"
            />
          </FormControl>

          <FormControl className="form-control-custom">
            <TextField
             sx={{mt:2}}
              label="OTP"
              variant="outlined"
              error={LoginError.some((x) => x.key === 'otp')}
              helperText={LoginError.find((x) => x.key === 'otp')?.message}
              onChange={(e) => {
                setUser({ ...user, otp: e.target.value });
                if (IsSubmited) {
                  const ValidationResult = Validation(
                    { ...user, otp: e.target.value },
                    'otpverify'
                  );
                  setLoginError(ValidationResult);
                }
              }}
            />
            <Timer mute={mute} setMute={setMute} />
            
            <button
            style={{
              marginTop:"20px"
            }}
              onClick={LoginHandler}
              disabled={mute}
              className="login-button"
              endIcon={<SendIcon />}
            >
              Send OTP
            </button>


          </FormControl>
        </DialogContent>
        <DialogActions>
          <button onClick={OtpVerify} className="login-button">
            Login
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
