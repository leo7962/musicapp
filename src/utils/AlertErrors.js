import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function alertErrors(type) {
  switch (type) {
    case "auth/wrong-password":
      toast.warning("The password is wrong");
      break;
    case "auth/email-already-in-use":
      toast.warning("The email already in use");
      break;
    default:
      toast.warning("Error from the server");
      break;
  }
}
