import React from "react";
import ProfileMenu from "../../components/profile-menu/profile-menu";
import ProfileForm from "../../components/profile-form/profile-form";
import ProfileStyles from "./profile.module.css";


const ProfilePage = () => {

  return (
    <>
      <div className={ProfileStyles.container}>
        <ProfileMenu/>
        <ProfileForm/>
      </div>
    </>
  );

}

export default ProfilePage;