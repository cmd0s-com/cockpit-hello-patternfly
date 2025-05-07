
import React, { ReactNode } from 'react';
import { 
  Brand, 
  Masthead, 
  MastheadBrand, 
  MastheadContent,
  MastheadMain, 
  Page, 
  PageSidebar, 
  PageSidebarBody,
  Nav, 
  NavItem, 
  NavList
} from '@patternfly/react-core';

interface CockpitLayoutProps {
  children: ReactNode;
}

const CockpitLayout = ({ children }: CockpitLayoutProps) => {
  return (
    <Page
      header={
        <Masthead>
          <MastheadMain>
            <MastheadBrand>
              <Brand src="https://cockpit-project.org/images/site/cockpit-logo.svg" alt="Cockpit Logo" style={{ height: '30px' }} />
            </MastheadBrand>
          </MastheadMain>
          <MastheadContent>Cockpit Hello World Plugin</MastheadContent>
        </Masthead>
      }
      sidebar={
        <PageSidebar>
          <PageSidebarBody>
            <Nav>
              <NavList>
                <NavItem isActive={true}>Dashboard</NavItem>
                <NavItem>Documentation</NavItem>
              </NavList>
            </Nav>
          </PageSidebarBody>
        </PageSidebar>
      }
    >
      {children}
    </Page>
  );
};

export default CockpitLayout;
