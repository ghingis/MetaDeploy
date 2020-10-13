import Avatar from '@salesforce/design-system-react/components/avatar';
import Button from '@salesforce/design-system-react/components/button';
import Dropdown from '@salesforce/design-system-react/components/menu-dropdown';
import DropdownTrigger from '@salesforce/design-system-react/components/menu-dropdown/button-trigger';
import i18n from 'i18next';
import * as React from 'react';

import { FetchOrgJobsSucceeded } from '@/store/org/actions';
import { User } from '@/store/user/reducer';

const Logout = ({
  user,
  doLogout,
}: {
  user: User;
  doLogout: () => Promise<FetchOrgJobsSucceeded>;
}) => (
  <Dropdown
    id="logout"
    options={[
      {
        label: user?.username,
        type: 'header',
      },
      { type: 'divider' },
      {
        label: i18n.t('Log Out'),
        leftIcon: {
          name: 'logout',
          category: 'utility',
        },
      },
    ]}
    onSelect={doLogout}
    menuPosition="relative"
    nubbinPosition="top right"
  >
    <DropdownTrigger>
      <Button variant="icon">
        <Avatar />
      </Button>
    </DropdownTrigger>
  </Dropdown>
);

export default Logout;
