import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate } from "../../utils/Api";
import alertErrors from "../../utils/AlertErrors";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export default function UserPassword(props) {
  const { setShowModal, setTitleModal, setContentModal } = props;

  const onEdit = () => {
    setTitleModal("Update Password");
    setContentModal(<ChangePasswordForm setShowModal={setShowModal} />);
    setShowModal(true);
  };

  return (
    <div className="user-password">
      <h3>Password: *** *** *** ***</h3>
      <Button circular onClick={onEdit}>
        Update
      </Button>
    </div>
  );
}

function ChangePasswordForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      toast.warning("The password not can be null.");
    } else if (formData.currentPassword === formData.newPassword) {
      toast.warning("The new password not can be equal to the current.");
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      toast.warning("The new password are not equal.");
    } else if (formData.newPassword.length < 6) {
      toast.warning("The password must be at least 6 characters long.");
    } else {
      setIsLoading(true);
      reauthenticate(formData.currentPassword)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updatePassword(formData.newPassword)
            .then(() => {
              toast.success("Password updated.");
              setIsLoading(false);
              setShowModal(false);
              firebase.auth().signOut();
            })
            .catch(err => {
              alertErrors(err?.code);
              setIsLoading(false);
            });
        })
        .catch(err => {
          alertErrors(err?.code);
          setIsLoading(false);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Password current"
          type={showPassword ? "text" : "password"}
          onChange={e =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="New password"
          type={showPassword ? "text" : "password"}
          onChange={e =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Repeat the new password"
          type={showPassword ? "text" : "password"}
          onChange={e =>
            setFormData({ ...formData, repeatNewPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Update password
      </Button>
    </Form>
  );
}
