import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import localizedTexts from '../text_localization/LocalizedStrings';

export default class RegistrationPage extends React.Component {

  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="username">{localizedTexts.registration.username}</Label>
            <Input type="text" name="username" id="username" />
          </FormGroup>
          <FormGroup>
            <Label for="password">{localizedTexts.registration.password}</Label>
            <Input type="password" name="password" id="password" />
          </FormGroup>
          <FormGroup>
            <Label for="first_name">{localizedTexts.registration.firstname}</Label>
            <Input type="text" name="first_name" id="first_name" />
          </FormGroup>
          <FormGroup>
            <Label for="¨last_name">{localizedTexts.registration.lastname}</Label>
            <Input type="text" name="¨last_name" id="last_name" />
          </FormGroup>
          <FormGroup>
            <Label for="birthdate">{localizedTexts.registration.birthdate}</Label>
            <Input type="text" name="birthdate" id="birthdate" />
          </FormGroup>
          <FormGroup>
            <Label for="phone_number">{localizedTexts.registration.phone}</Label>
            <Input type="text" name="phone_number" id="phone_number" />
          </FormGroup>
          <FormGroup>
            <Label for="email">{localizedTexts.registration.email}</Label>
            <Input type="email" name="email" id="email" />
          </FormGroup>
          <FormGroup>
            <Label for="security_question">{localizedTexts.registration.question}</Label>
            <Input type="text" name="security_question" id="security_question" />
          </FormGroup>
          <FormGroup>
            <Label for="security_answer">{localizedTexts.registration.answer}</Label>
            <Input type="text" name="security_answer" id="security_answer" />
          </FormGroup>
          <Button type="submit">{localizedTexts.registration.register}</Button>
        </Form>
      </div>
    );
  }

}
