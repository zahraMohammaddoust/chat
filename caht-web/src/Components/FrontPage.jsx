import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { useNavigate } from "react-router-dom";
import Conversations from "./Conversations";
export default function FrontPage() {
  const navigate = useNavigate();
  return (
    <div>
      <ContactPhoneIcon
        onClick={() => {
          navigate(process.env.PUBLIC_URL + "/Contacts");
        }}
      />
      <Conversations/>
    </div>
  );
}
