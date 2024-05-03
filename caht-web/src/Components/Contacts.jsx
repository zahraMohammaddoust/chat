import { useEffect, useState } from "react";
import {
  useIsLoading,
  useSetIsLoading,
} from "../Js/UseContext/LoaadingContext";
import { CallService, modalAlert } from "../Js/Script";
import Loading from "./Loading";
import "../Css/Contacts.css";
export default function Contacts() {
  const setIsLoading = useSetIsLoading();
  const IsLoading = useIsLoading();
  const [states, setStates] = useState({
    contacts: "",
  });
  useEffect(() => {
    var contacts = localStorage.getItem("contacts");
    if (!contacts) {
      getContactsByUserId().then((contactsList) => {
        if (contactsList.length == 0) {
          getUserContacts();
        } else {
          setStates((prevState) => ({ ...prevState, contacts: contactsList }));
        }
      });
    } else {
      setStates((prevState) => ({
        ...prevState,
        contacts: JSON.parse(contacts),
      }));
    }
  }, []);
  function getContactsByUserId() {
    return new Promise((resolve, reject) => {
      CallService("Contact/GetContactsByUserId", {}, "GET", setIsLoading, true)
        .then((response) => {
          localStorage.setItem("contacts", JSON.stringify(response));
          return resolve(response);
        })
        .catch((error) => {
          reject(
            modalAlert(
              error.message ||
                error ||
                "An unexpected error has occurred. Please contact software support"
            )
          );
        });
    });
  }
  function getUserContacts() {
    if ("contacts" in navigator) {
      navigator.contacts
        .select(["name", "phone"])
        .then((contacts) => {
          console.log(contacts);
          var data = {
            name: contacts.name,
            phone: contacts.phone,
          };
          CallService("Contact", data, "Post", setIsLoading, true)
            .then((response) => {
              setStates((prevState) => ({ ...prevState, contacts: response }));
            })
            .catch((error) => {
              modalAlert(
                error.message ||
                  error ||
                  "An unexpected error has occurred. Please contact software support"
              );
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Audience API is not supported in this browser.");
    }
  }
  return (
    // <div>
    //   {IsLoading && <Loading />}
    //   {console.log(states.contacts)}
    //   {states.contacts &&
    //     states.contacts.length > 0 &&
    //     states.contacts.map((contact,index) => {
    //       return (
    //         <div key={index}>
    //           <p>{contact.name}</p>
    //           <p>{contact.phone}</p>
    //         </div>
    //       );
    //     })}
    // </div>

    <div>
      {IsLoading && (
        <div className="loading">
          <Loading />
        </div>
      )}
      <div className="contact-list">
        {states.contacts &&
          states.contacts.length > 0 &&
          states.contacts.map((contact, index) => {
            return (
              <div key={index} className="contact-item">
                <p>{contact.name}</p>
                <p>{contact.phone}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
