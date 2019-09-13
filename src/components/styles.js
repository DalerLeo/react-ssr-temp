const styles = `
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  25% { -webkit-transform: rotate(120deg); }
  50% { -webkit-transform: rotate(270deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg);}
  25% { transform: rotate(120deg);}
  50% { transform: rotate(270deg);}
  100% { transform: rotate(360deg); }
}

@keyframes spin-off {
  from { transform: rotate(0deg);}
  to { transform: rotate(360deg);}
}

@-webkit-keyframes opacityAnim {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

@keyframes opacityAnim {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

@keyframes rollUpFadeIn {
  from {margin-top: 20px; opacity: 0.2}
  to {margin-top: 0; opacity: 1}
}
@keyframes slideDownFadeIn {
  from {margin-left: -41px; opacity: 0}
  to {margin-left: 0; opacity: 1}
}
@keyframes slideRightFadeIn {
  from {margin-right: -41px; opacity: 0}
  to {margin-right: 0; opacity: 1}
}

.navigation {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  color: #000;
  display: flex;
  position: relative;
  background: #eef1f6;
  font-weight: normal;
  justify-content: space-between;
  -ms-justify-content: space-between;
  -moz-justify-content: space-between;
  -webkit-justify-content: space-between;
}

.navigation:before {
  top: 0;
  width: 100%;
  right: 100%;
  bottom: 0;
  content: "";
  position: absolute;
  background: inherit;
}

.navigation:after {
  top: 0;
  left: 100%;
  width: 100%;
  bottom: 0;
  content: "";
  position: absolute;
  background: inherit;
}

.button {
  color: #7848b7;
  cursor: pointer;
  transition: all 300ms;
  white-space: nowrap;
  font-weight: 500;
  line-height: 38px;
  margin-left: 43px;
  -ms-transition: all 300ms;
  -moz-transition: all 300ms;
  -webkit-transition: all 300ms;
}

.button:hover {
  color: #7848b7;
}

.addButtons {
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  align-items: center;
  -ms-align-items: center;
  -moz-align-items: center;
  -webkit-align-items: center;
}

.ant-calendar-picker-container {
    font-family: 'Montserrat', sans-serif
}

.ant-input {
    font-family: 'Montserrat', sans-serif
}

`

export default styles
