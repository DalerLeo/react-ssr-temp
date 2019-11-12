import React, {useState} from 'react';
import styled from 'styled-components'
import TopHeader from 'components/UI/Header/TopHeader'
import Logo from 'icons/Logo'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const SignInStyled = styled.div`
    display: flex;
    justify-content: center;
    background-color: #2EBB8A;
    padding: 20px 0;
`
const Enter = styled.div`
    display: block;
    margin-top: 100px;
    color: #222121;
    font-size: 36px;
    font-wight: bold;
    text-align: center;
    margin-left: -23.5%;
`
const PhoneNumber = styled.div`
    margin-top: 50px;
    display: block;
    text-align: center;
    margin-left: -21%;
`
const InputWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    margin-left: -12%;
`
const InputNumber = styled.div`
    font-size: 15px;
    line-height: 1.67;
    color: #8492B0;
    padding: 10px 15px;
    background-color: #f1f3f9;
    border: solid 1px #e4e5ec;
    border-right: none;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
`
const InputMessage = styled.input`
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
    font-size: 15px;
    line-height: 1.67;
    color: #222121;
    border: none;
    outline: 0;
    padding: 10px;
    width: 150%;
    ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
`
function LoginForm() {
    const [form, setValues] = useState({
      phoneNumber: ''
    });
  
    const printValues = e => {
      e.preventDefault();
    };
    
    const updateField = e => {
      setValues({
        ...form,
        [e.target.name]: e.target.value
      });
    };
    
    console.warn(form.phoneNumber)
    if(form.phoneNumber.length == 9){
        console.warn('doneee')
    }
    return (
      <form onChange={printValues}>
          <InputMessage 
            name="phoneNumber"
            type="number" 
            placeholder="Введите номер телефона" 
            value={form.username} 
            onChange={updateField}/>
      </form>
    );
  }

const SignIn = (props) => {
    return (
        <div>
        {/* <TopHeader /> */}
            <Container>
                <SignInStyled>
                    <Logo />
                </SignInStyled>
                <Enter>
                    Вход
                </Enter>
                <PhoneNumber>
                    Номер телефона
                </PhoneNumber>
                <InputWrapper>
                    <InputNumber>
                        +998
                    </InputNumber>
                    <LoginForm />
                </InputWrapper>
            </Container>
        </div>
    );
}
 
export default SignIn;