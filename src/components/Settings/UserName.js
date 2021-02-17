import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export default function UserName(props) {
    const {
        user,
        setShowModal,
        setTitleModal,
        setContentModal,
        setReloadApp
    } = props;

    const onEdit = () => {
        setTitleModal("Update name");
        setContentModal(
            <ChangeDisplayNameForm
                displayName={user.displayName}
                setShowModal={setShowModal}
                setReloadApp={setReloadApp}
            />
        );
        setShowModal(true);
    };

    return (
        <div className="user-name">
            <h2>{user.displayName}</h2>
            <Button circular onClick={onEdit}>
                Update
      </Button>
        </div>
    );
}

function ChangeDisplayNameForm(props) {
    const { displayName, setShowModal, setReloadApp } = props;
    const [formData, setFormData] = useState({ displayName: displayName });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = () => {
        if (!formData.displayName || formData.displayName === displayName) {
            setShowModal(false);
        } else {
            setIsLoading(true);
            firebase
                .auth()
                .currentUser.updateProfile({ displayName: formData.displayName })
                .then(() => {
                    setReloadApp(prevState => !prevState);
                    toast.success("Name updated");
                    setIsLoading(false);
                    setShowModal(false);
                })
                .catch(() => {
                    toast.error("Error to update the name");
                    setIsLoading(false);
                });
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input
                    defaultValue={displayName}
                    onChange={e => setFormData({ displayName: e.target.value })}
                />
            </Form.Field>
            <Button type="submit" loading={isLoading}>
                Update Name
      </Button>
        </Form>
    );
}
