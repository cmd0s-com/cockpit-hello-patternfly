
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { 
  EmptyState, 
  EmptyStateIcon, 
  Title, 
  EmptyStateBody, 
  Button,
  PageSection 
} from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageSection>
      <EmptyState>
        <EmptyStateIcon icon={ExclamationCircleIcon} />
        <Title headingLevel="h1" size="lg">404 - Page not found</Title>
        <EmptyStateBody>
          The page you are looking for could not be found.
        </EmptyStateBody>
        <Button variant="primary" component="a" href="/">
          Return to Dashboard
        </Button>
      </EmptyState>
    </PageSection>
  );
};

export default NotFound;
