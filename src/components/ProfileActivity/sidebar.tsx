import React from 'react';
import { ProfileDetails } from '../ProfileDetails';
import { SupportedCharities } from '../SupportedCharities';
import { CorporateSponsors } from '../CorporateSponsors';
import { ProfileCarousel } from '../ProfileCarousel';

const ProfileSidebar = (props: any) => {
    return (
        <div className="col-lg-5 left-sidebar">
            <ProfileDetails />
            <SupportedCharities />
            <CorporateSponsors />
            <ProfileCarousel />
        </div>
    )
}

export default ProfileSidebar;