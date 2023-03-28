import React from "react";

const AddMember = () => {
  return (
    <div class="login__page">
      <img class="background__img" src="/images/background__img_2.png" />
      <div class="logo__wrapper">
        <img src="/images/logo.png" alt="SMVS" />
      </div>
      <div class="login__form">
        <form class="form__wrapper">
          <div class="top__header__form">
            <div class="img__wrapper">
              <img src="/images/logo.png" alt="SMVS" />
            </div>
            <div class="cn__wrapper">
              <h1 class="title">Add Member</h1>
              <p class="text">
                Please fill up below form in order to add member
              </p>
            </div>
          </div>
          <div class="form__contant">
            <div class="double__group">
              <div class="form__group">
                <label class="label">First Name</label>
                <input type="email" name="" placeholder="Enter first name" />
              </div>
              <div class="form__group">
                <label class="label">Last Name</label>
                <input type="password" name="" placeholder="Enter last name" />
              </div>
            </div>
            <div class="form__group">
              <label class="label">Email</label>
              <input type="password" name="" placeholder="Enter your email" />
            </div>
            <div class="form__group">
              <label class="label">Phone</label>
              <input type="password" name="" placeholder="Enter your phone" />
            </div>
            <div class="form__group">
              <label class="label">Assign To</label>
              <select name="">
                <option value="">Dhruv Patel</option>
                <option value="">Dhruv Duliya</option>
                <option value="">Mitul Jadav</option>
                <option value="">Monil Vaishnav</option>
              </select>
            </div>
            <div class="rem__sub__wrapper">
              <div class="submit__wrapper">
                <input
                  class="submit__btn"
                  type="submit"
                  name=""
                  value="+ Add"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <img class="nagar__img" src="/images/building__img.png" alt="" />
    </div>
  );
};

export default AddMember;
