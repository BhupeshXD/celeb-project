import Moment from "moment";
import { useState } from "react";
import { SlPencil } from "react-icons/sl";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaCheckSolid } from "react-icons/lia";
import { RxCross1 } from "react-icons/rx";
import ConfirmationModal from "./ConfirmationModal";

const Item = ({ data, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);
  const bornYear = Moment(data.dob).year();
  const currentYear = Moment().year();
  const [edit, setEdit] = useState(false);
  const [age, setAge] = useState(currentYear - bornYear);
  const [name, setName] = useState(data.first);
  const [country, setCountry] = useState(data.country);
  const [gender, setGender] = useState(data.gender);
  const [description, setDescription] = useState(data.description);
  const [isModalVisible, setModalVisible] = useState(false);

  
  const showModal = () => {
    setModalVisible(true);
  };


  const hideModal = () => {
    setModalVisible(false);
  };

  const handleDelete = () => {
    onDelete(data.id);
    hideModal();
  };

  const handleCountryChange = (e) => {
    const inputValue = e.target.value;
    
    if (/^[a-zA-Z]+$/.test(inputValue) || inputValue === "") {
      setCountry(inputValue);
    }
  };
    
   
  
  const onSubmitHandler = () => {
    const date = Moment(data.dob).date();
    const month = Moment(data.dob).month() + 1;

  
    
    

  if (!name || !age || !gender || !country || !description) {
      alert('Please fill in all the required fields.');
      return;
    }

    const userAge = currentYear - bornYear;

    if (userAge >= 18) {
      // Only allow editing if the user is an adult
      onEdit({
        ...data,
        first: name,
        dob: `${age}-${month}-${date}`,
        gender: gender,
        country: country,
        description: description,
      });
    } else {
      alert('You can only edit users who are adults.');
    }
  };

  return (
    <div className="item-container">
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div className="profile-picture">
          <img src={data.picture} alt="img" />
        </div>
        {!edit && (
          <div style={{ width: "150px" }}>
            <p style={{ fontSize: "25px", fontWeight: "600" }} className="name">
              {data.first}
            </p>
          </div>
        )}

        {edit && (
          <input
            
            style={{ height: "25px", width: "80px" }}
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        )}

        <div
          onClick={() => setOpen((prevVal) => !prevVal)}
          style={{ marginLeft: "auto" }}
        >
          {open ? (
            <RiArrowDropUpLine style={{ fontSize: "40px" }} />
          ) : (
            <RiArrowDropDownLine style={{ fontSize: "40px" }} />
          )}
        </div>
      </div>

      {open && (
        <>
          <div className="item-details">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "15px", fontWeight: 600 }}>Age</div>
                  {!edit && <div>{age}</div>}
                  {edit && (
                    <input
                      
                      type='number'
                      style={{ width: "80px" }}
                      placeholder="Age"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                      value={age}
                    />
                    
                  )}
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "15px", fontWeight: 600 }}>
                    Gender
                  </div>
                  {!edit && <div>{data.gender}</div>}
                  {edit && (
                    <select
                     
                      style={{ width: "80px" }}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      value={gender}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="rather not say">Rather Not say</option>
                      <option value="transgender">Transgender</option>
                    </select>
                  )}
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "15px", fontWeight: 600 }}>
                    Country
                  </div>
                  {!edit && <div>{data.country}</div>}
                  {edit && (
                    <input
                    
                      style={{ width: "80px" }}
                      onChange={handleCountryChange}
                      placeholder="Country"
                      value={country}
                    />
                  )}
                </div>
              </div>
              <div style={{ textAlign: "left", marginTop: "20px" }}>
                <div style={{ fontSize: "15px", fontWeight: 600 }}>
                  Description
                </div>
                {!edit && (
                  <div style={{ textAlign: "left" }}>{data.description}</div>
                )}
                {edit && (
                  <textarea
                  
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    style={{ width: "95%" }}
                    placeholder="Description"
                    name="description"
                    rows="10"
                    cols="30"
                    defaultValue={description}
                  />
                )}
              </div>
            </div>
          </div>

          <>
            <div className="editdelete-icon">
              {!edit && (
                <>
                  <div onClick={showModal} className="clickable-div">
                    <RiDeleteBin6Line />
                  </div>
                  {isModalVisible && (
                    <ConfirmationModal
                      onCancel={hideModal}
                      onDelete={handleDelete}
                    />
                  )}
                </>
              )}
              {edit && (
                <div onClick={() => setEdit(false)}>
                  <RxCross1 />
                </div>
              )}
              {!edit && (
                <>
                  <div
                    onClick={() => {
                      onEdit(data.id);
                      setEdit((prevVal) => !prevVal);
                    }}
                  >
                    <SlPencil />
                  </div>
                </>
              )}
              {edit && (
                <div
                  onClick={() => {
                    onSubmitHandler();
                    setEdit(false);
                  }}
                >
                  <LiaCheckSolid />
                </div>
              )}
            </div>
          </>

          {/* {edit && <div className="edit-icons"></div>} */}
        </>
      )}
    </div>
  );
};

export default Item;
