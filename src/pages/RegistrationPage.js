import React from 'react';
import { Col,Button, FormGroup, Label } from 'reactstrap';
import { browserHistory} from 'react-router';
import { connect } from 'react-redux';
import localizedTexts from '../text_localization/LocalizedStrings';
import api from '../api.js';
import { openModal } from '../actions/openModal';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';



class RegistrationPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          emailValue: '',
          usernameValue: '',
          passwordValue: '',
          nameValue: '',
          surnameValue: '',
          birthdayValue: moment().format('DD/MM/YYYY'),
          phoneValue: '',
          verifyPasswordValue: '',
          startDate: moment(),
          isAdult: false,
          passwordIsCorrect: false,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleYear = this.handleYear.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
  }

  handleSubmit(e,values) {

      this.handleYear(this.state.birthdayValue);
      this.handlePassword(this.state.verifyPasswordValue);
      if((this.state.isAdult)&&(this.state.passwordIsCorrect)){


      api.post('/registrations/', {
        "registration": {
          "login": this.state.usernameValue,
          "password": this.state.passwordValue,
          "verifyPassword": this.state.verifyPasswordValue,
          "firstName": this.state.nameValue,
          "lastName": this.state.surnameValue,
          "email": this.state.emailValue,
          "phoneNumber": this.state.phoneValue,
          "birthday": moment(this.state.birthdayValue).format("DD/MM/YYYY"),
        }

      }).then(response => {
            browserHistory.push('/');
            this.props.openModal({
              name: 'alert',
              data: {
                type: "success",
                message: localizedTexts.registration.registrationSuccess
              }
            });
      }).catch(function(response) {
          console.log('error');
      });

    }
  }

  handleYear(date){
    var a = moment();
    var b = moment(date);
    if( a.diff(b, 'years', true)<=18){
      this.props.openModal({
        name: 'alert',
        data: {
          type: "danger",
          message: "Není vám 18 let!"
        }
      });

    }else{
      this.setState({isAdult: true});
    }
    console.log(a.diff(b, 'years', true));
  }

  handleChange(date) {
    this.setState({
      birthdayValue: date,
      startDate: date,
    });
    this.handleYear(date);
  }

  handlePassword(value){
    if(this.state.passwordValue.length===value.length){
      if(this.state.passwordValue!==value){
        this.props.openModal({
          name: 'alert',
          data: {
            type: "danger",
            message: "Heslo není stejné!"
          }
        });
      }else{
        this.setState({passwordIsCorrect:true});
      }
    }else{
      this.props.openModal({
        name: 'alert',
        data: {
          type: "danger",
          message: "Heslo není stejně dlouhé!"
        }
      });
    }

  }

  render() {
    return (
      <div>
        <br></br>
        <h1 className="text-center">Registrace</h1>
        <br></br>
        <br></br>
        <Col sm={{ size: 6, push: 2, pull: 2, offset: 1 }}>
          <AvForm onValidSubmit={this.handleSubmit}>

            <AvGroup row>
              <Label for="email" sm={3}>{localizedTexts.registration.email}</Label>
              <Col sm={9}>
                <AvInput name="email" type="email" id="email" placeholder="Zadejte email" onChange={event => this.setState({emailValue: event.target.value})} required />
              </Col>
              <AvFeedback>Špatně zadaný email!</AvFeedback>
            </AvGroup>

            <AvGroup row>
              <Label for="username" sm={3}>{localizedTexts.registration.username}</Label>
              <Col sm={9}>
                <AvInput name="username" type="text" id="username" placeholder="Zadejte uživatelské jméno" minLength="5" onChange={event => this.setState({usernameValue: event.target.value})} required />
              </Col>
              <AvFeedback>Špatně zadané uživatelské jméno!</AvFeedback>
            </AvGroup>

            <AvGroup row>
              <Label for="password" sm={3}>{localizedTexts.registration.password}</Label>
                <Col sm={9}>
                    <AvInput type="password" name="password" id="password" placeholder="Zadejte heslo" minLength="5" onChange={event => this.setState({passwordValue: event.target.value})} required/>
                </Col>
                <AvFeedback>Špatně zadané heslo!(musí být dlouhé min. 5 znaků)</AvFeedback>
            </AvGroup>

            <AvGroup row>
              <Label for="verifyPassword" sm={3}>{localizedTexts.registration.verifyPassword}</Label>
                <Col sm={9}>
                    <AvInput type="password" name="verifyPassword" id="verifyPassword" placeholder="Znovu zadejte heslo" minLength="5" onChange={event => this.setState({verifyPasswordValue: event.target.value})} required/>
                </Col>
                <AvFeedback>Špatně zadané heslo!(musí být dlouhé min. 5 znaků)</AvFeedback>
            </AvGroup>

            <AvGroup row>
              <Label for="first_name" sm={3}>{localizedTexts.registration.firstname}</Label>
              <Col sm={9}>
                <AvInput name="first_name" type="text" id="first_name" placeholder="Zadejte křestní jméno"  onChange={event => this.setState({nameValue: event.target.value})} required />
              </Col>
              <AvFeedback>Špatně zadané jméno!</AvFeedback>
            </AvGroup>

            <AvGroup row>
              <Label for="last_name" sm={3}>{localizedTexts.registration.lastname}</Label>
              <Col sm={9}>
                <AvInput name="last_name" type="text" id="last_name" placeholder="Zadejte příjmení"  onChange={event => this.setState({surnameValue: event.target.value})} required />
              </Col>
              <AvFeedback>Špatně zadané příjmení!</AvFeedback>
            </AvGroup>

            <FormGroup row>
              <Label for="birthdate" sm={3}>{localizedTexts.registration.birthdate}</Label>
                <Col sm={9}>
                  <DatePicker  dateFormat="DD/MM/YYYY" selected={this.state.startDate} onChange={this.handleChange} />
                </Col>
            </FormGroup>

            <AvGroup row>
              <Label for="phone_number" sm={3}>{localizedTexts.registration.phone}</Label>
              <Col sm={9}>
                <AvInput name="phone_number" type="text" id="phone_number" minLength="13" maxLength="13" pattern="^[+420]\d{12}" placeholder="Zadejte telefon ve tvaru +420123456789"  onChange={event => this.setState({phoneValue: event.target.value})} required />
              </Col>
              <AvFeedback>Špatně zadané telefonní číslo!</AvFeedback>
            </AvGroup>

            <FormGroup>
              <Button>{localizedTexts.registration.register}</Button>
            </FormGroup>

          </AvForm>
        </Col>
      </div>

    );
  }

}


export default connect(null, {
  openModal
})(RegistrationPage);
