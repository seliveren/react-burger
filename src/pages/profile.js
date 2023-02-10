import React from "react";
import AppHeader from "../components/app-header/app-header";
import ProfileMenu from "../components/profile-menu/profile-menu";
import ProfileForm from "../components/profile-form/profile-form";
import ProfileStyles from "./profile.module.css";


const ProfilePage = () => {

  return (
    <>
      <AppHeader/>
      <div className={ProfileStyles.container}>
        <ProfileMenu/>
        <ProfileForm/>
      </div>
    </>
  );

}

export default ProfilePage;