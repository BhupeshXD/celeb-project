import Moment from "moment";
import { useState } from "react";
import { SlPencil } from 'react-icons/sl';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { RiArrowDropUpLine } from 'react-icons/ri';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LiaCheckSolid } from 'react-icons/lia';
import { RxCross1 } from 'react-icons/rx';
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
    onDelete(data.id)
    hideModal();
  };

  const onSubmitHandler = () => {
    const date = Moment(data.dob).date();
    const month = Moment(data.dob).month() + 1;
    onEdit({
      ...data,
      first: name,
      dob: `${age}-${month}-${date}`,
      gender: gender,
      country: country,
      description: description,
    });
  };


  return (
    <div className="item-container">
      <div className="item-header">
        <div className="profile-picture">
          <img src={data.picture} alt="img" />
        </div>
        {!edit && (
          <p className="name">
            {data.first}
          </p>
        )}
        {edit && (
          <input
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />)}

        <div onClick={() => setOpen((prevVal) => !prevVal)}>
          {open ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </div>
      </div>

      {open && (
        <>
          <div className="item-details">
            {!edit && (
              <div>
                <div className="details-row">
                  <div>Age : {age}</div>
                  <div>Gender : {data.gender}</div>
                  <div>Country {data.country}</div>
                </div>
                <div>Description {data.description}</div>
              </div>
            )}
            {edit && (
              <div>
                <div className="details-row">
                  <input
                    placeholder="Age"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    value={age}
                  />
                  <input
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    placeholder="Gender"
                    value={gender}
                  />
                  <input
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    placeholder="Country"
                    value={country}
                  />
                </div>

                <textarea
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  placeholder="Description"
                  name="description"
                  rows="10"
                  cols="30"
                  defaultValue={description}
                />
              </div>
            )}
          </div>
          {!edit && (
            <>
              <div className="editdelete-icon">
                <div onClick={showModal} className="clickable-div">
                  <RiDeleteBin6Line />
                </div>
                {isModalVisible && (
                  <ConfirmationModal onCancel={hideModal} onDelete={handleDelete} />
                )}
              
              <div
                onClick={() => {
                  onEdit(data.id);
                  setEdit((prevVal) => !prevVal);
                }}
              >
                <SlPencil />
              </div>
              </div>
            </>
          )}
          {edit && (

            <div className="edit-icons">
              <div onClick={() => setEdit(false)}><RxCross1 /></div>
              <div
                onClick={() => {
                  onSubmitHandler();
                  setEdit(false);
                }}
              >
                <LiaCheckSolid />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Item;
